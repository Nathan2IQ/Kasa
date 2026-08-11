"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/api/auth";
import {
  getAvailableEquipments,
  getAvailableTags,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "@/lib/api/properties.api";
import Image from "next/image";

const FALLBACK_TAGS = [
  "Appartement",
  "Studio",
  "Maison",
  "Loft",
  "Duplex",
  "Villa",
];

interface FormData {
  title: string;
  description: string;
  location: string;
  postalCode: string;
  coverImage: string;
  pictures: string[];
  equipments: string[];
  tags: string[];
  price_per_night: string;
}

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const { user, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customTag, setCustomTag] = useState("");
  const [availableEquipments, setAvailableEquipments] = useState<string[]>([]);
  const [presetTags, setPresetTags] = useState<string[]>(FALLBACK_TAGS);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: "",
    postalCode: "",
    coverImage: "",
    pictures: [],
    equipments: [],
    tags: [],
    price_per_night: "",
  });

  // Charger les données de la propriété
  useEffect(() => {
    async function loadProperty() {
      try {
        const property = await getPropertyById(propertyId);

        // Si la propriété n'existe pas, rediriger vers 404
        if (!property) {
          router.push("/not-found");
          return;
        }

        // Vérifier que l'utilisateur est bien le propriétaire
        if (
          user &&
          String(property.host?.id) !== String(user.id) &&
          user.role !== "admin"
        ) {
          router.push(`/properties/${propertyId}`);
          return;
        }

        // Extraire le code postal de la location
        const locationParts = property.location?.split(" - ") || [];
        const location = locationParts[0] || "";
        const postalCode = locationParts[1] || "";

        setFormData({
          title: property.title || "",
          description: property.description || "",
          location,
          postalCode,
          coverImage: property.cover || "",
          pictures: property.pictures || [],
          equipments: property.equipments || [],
          tags: property.tags || [],
          price_per_night: property.price_per_night?.toString() || "80",
        });
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
        setError("Impossible de charger la propriété");
      }
    }

    if (user && !isLoading) {
      loadProperty();
    }
  }, [propertyId, user, isLoading, router]);

  // Charger les équipements et tags disponibles
  useEffect(() => {
    async function loadOptions() {
      try {
        const [equipments, tags] = await Promise.all([
          getAvailableEquipments(),
          getAvailableTags(),
        ]);
        setAvailableEquipments(equipments);
        if (tags.length > 0) {
          setPresetTags(tags);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des options:", err);
      } finally {
        setIsLoadingData(false);
      }
    }
    loadOptions();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const token = localStorage.getItem("auth_token");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/uploads/image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de l'upload");
    }

    const result = await response.json();
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}${result.url}`;
  };

  const handleCoverImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handlePicturesSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        pictures: [...prev.pictures, url],
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const toggleEquipment = (equipment: string) => {
    setFormData((prev) => ({
      ...prev,
      equipments: prev.equipments.includes(equipment)
        ? prev.equipments.filter((e) => e !== equipment)
        : [...prev.equipments, equipment],
    }));
  };

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const addCustomTag = () => {
    if (customTag.trim() && !formData.tags.includes(customTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, customTag.trim()],
      }));
      setCustomTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const removePicture = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      pictures: prev.pictures.filter((p) => p !== url),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const fullLocation = formData.postalCode
        ? `${formData.location} - ${formData.postalCode}`
        : formData.location;

      const payload = {
        title: formData.title,
        description: formData.description,
        location: fullLocation,
        cover: formData.coverImage,
        pictures: formData.pictures,
        equipments: formData.equipments,
        tags: formData.tags,
        price_per_night: parseInt(formData.price_per_night) || 80,
      };

      await updateProperty(propertyId, payload);
      router.push(`/properties/${propertyId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la modification",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProperty(propertyId);
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la suppression",
      );
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (!isLoading && user && user.role !== "owner" && user.role !== "admin") {
    return (
      <ProtectedRoute>
        <main className="flex-1 px-8 py-12 min-h-screen">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-12">
              <div className="text-6xl mb-6">🔒</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Accès réservé aux propriétaires
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Vous ne pouvez modifier que vos propres annonces.
              </p>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="bg-[#99331A] text-white px-8 py-3 rounded-md hover:bg-[#7A2815] transition-colors cursor-pointer"
              >
                Retour à l&apos;accueil
              </button>
            </div>
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <main className="flex-1 px-8 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-900 bg-[#F5F5F5] py-2 px-4 rounded-xl flex items-center gap-2 cursor-pointer"
            >
              ← Retour
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Modifier la propriété
            </h1>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors cursor-pointer"
              >
                Supprimer
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#99331A] text-white px-6 py-2 rounded-md hover:bg-[#7A2815] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "En cours..." : "Enregistrer"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* COLONNE GAUCHE */}
              <div>
                <div className="bg-white py-10 px-20 mb-10 rounded-lg shadow-sm">
                  {/* Titre */}
                  <div className="mb-5">
                    <label
                      htmlFor="title"
                      className="block text-xl font-medium text-gray-900 mb-2"
                    >
                      Titre de la propriété
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#99331A] focus:border-[#99331A] outline-none"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-5">
                    <label
                      htmlFor="description"
                      className="block text-xl font-medium text-gray-900 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#99331A] focus:border-[#99331A] outline-none resize-none"
                    ></textarea>
                  </div>

                  {/* Code postal */}
                  <div className="mb-5">
                    <label
                      htmlFor="postalCode"
                      className="block text-xl font-medium text-gray-900 mb-2"
                    >
                      Code postal
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#99331A] focus:border-[#99331A] outline-none"
                    />
                  </div>

                  {/* Localisation */}
                  <div className="mb-5">
                    <label
                      htmlFor="location"
                      className="block text-xl font-medium text-gray-900 mb-2"
                    >
                      Localisation
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#99331A] focus:border-[#99331A] outline-none"
                    />
                  </div>

                  {/* Prix par nuit */}
                  <div className="mb-5">
                    <label
                      htmlFor="price_per_night"
                      className="block text-xl font-medium text-gray-900 mb-2"
                    >
                      Prix par nuit (€)
                    </label>
                    <input
                      type="number"
                      id="price_per_night"
                      name="price_per_night"
                      required
                      min="1"
                      value={formData.price_per_night}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#99331A] focus:border-[#99331A] outline-none"
                    />
                  </div>
                </div>

                {/* Équipements */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      Équipements
                    </h3>
                    {isLoadingData ? (
                      <p className="text-gray-500 text-sm">
                        Chargement des équipements...
                      </p>
                    ) : availableEquipments.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        Aucun équipement disponible
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                        {availableEquipments.map((equipment) => (
                          <label
                            key={equipment}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.equipments.includes(equipment)}
                              onChange={() => toggleEquipment(equipment)}
                              className="w-4 h-4 text-[#99331A] focus:ring-[#99331A] border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">
                              {equipment}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* COLONNE DROITE */}
              <div>
                {/* Images */}
                <div className="mb-6 bg-white p-6 rounded-lg shadow-sm space-y-4">
                  {/* Image de couverture */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-2">
                      Image de couverture
                    </label>
                    {formData.coverImage ? (
                      <div className="relative">
                        <div className="w-full h-48 relative rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={formData.coverImage}
                            alt="Aperçu"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, coverImage: "" }))
                          }
                          className="absolute top-2 right-2 w-8 h-8 bg-[#99331A] text-white rounded-md hover:bg-[#7A2815] transition-colors flex items-center justify-center cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          id="coverImageFile"
                          accept="image/*"
                          onChange={handleCoverImageSelect}
                          className="hidden"
                          disabled={isUploadingImage}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("coverImageFile")?.click()
                          }
                          disabled={isUploadingImage}
                          className="w-10 h-10 bg-[#99331A] text-white rounded-md hover:bg-[#7A2815] transition-colors flex items-center justify-center mx-auto text-xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {isUploadingImage ? "⟳" : "+"}
                        </button>
                        <p className="text-sm text-gray-500 mt-2">
                          {isUploadingImage
                            ? "Upload en cours..."
                            : "Ajouter une image"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Images du logement */}
                  <div>
                    <label className="block text-xl font-medium text-gray-900 mb-2">
                      Images du logement
                    </label>
                    {formData.pictures.length > 0 && (
                      <div className="space-y-2 mb-2">
                        {formData.pictures.map((url, index) => (
                          <div
                            key={index}
                            className="relative h-32 rounded-lg overflow-hidden bg-gray-100"
                          >
                            <Image
                              src={url}
                              alt={`Photo ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <button
                              type="button"
                              onClick={() => removePicture(url)}
                              className="absolute top-2 right-2 w-8 h-8 bg-[#99331A] text-white rounded-md hover:bg-[#7A2815] transition-colors flex items-center justify-center cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        id="picturesFile"
                        accept="image/*"
                        onChange={handlePicturesSelect}
                        className="hidden"
                        disabled={isUploadingImage}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("picturesFile")?.click()
                        }
                        disabled={isUploadingImage}
                        className="w-10 h-10 bg-[#99331A] text-white rounded-md hover:bg-[#7A2815] transition-colors flex items-center justify-center mx-auto text-xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isUploadingImage ? "⟳" : "+"}
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        {isUploadingImage
                          ? "Upload en cours..."
                          : "Ajouter une image"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Catégories */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">
                    Catégories
                  </h3>

                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5 border-b-2 border-gray-200 pb-4">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm border border-[#99331A]"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-gray-500 hover:text-[#99331A] transition-colors cursor-pointer"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {!isLoadingData && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {presetTags
                        .filter((tag) => !formData.tags.includes(tag))
                        .map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm border border-gray-200 transition-colors cursor-pointer"
                          >
                            {tag}
                          </button>
                        ))}
                    </div>
                  )}

                  <div className="pt-4">
                    <label className="block text-xl font-medium text-gray-900 mb-2">
                      Ajouter une catégorie personnalisée
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#99331A] focus:border-[#99331A] outline-none"
                        placeholder="Nouveau tag"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCustomTag();
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addCustomTag}
                      disabled={!customTag.trim()}
                      className="mt-3 text-sm text-[#99331A] hover:underline disabled:text-gray-400 disabled:no-underline cursor-pointer"
                    >
                      +Ajouter un tag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Confirmer la suppression
            </h2>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action
              est irréversible.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
