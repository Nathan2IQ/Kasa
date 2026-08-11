"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/api/auth";
import {
  getAvailableEquipments,
  getAvailableTags,
} from "@/lib/api/properties.api";
import Image from "next/image";

// Catégories prédéfinies de base (fallback si l'API échoue)
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
  hostName: string;
  hostPicture: string;
  equipments: string[];
  tags: string[];
  price_per_night: string;
}

export default function NewPropertyPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customTag, setCustomTag] = useState("");
  const [availableEquipments, setAvailableEquipments] = useState<string[]>([]);
  const [presetTags, setPresetTags] = useState<string[]>(FALLBACK_TAGS);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: "",
    postalCode: "",
    coverImage: "",
    pictures: [],
    hostName: user ? `${user.firstName} ${user.lastName}` : "",
    hostPicture: user?.picture || "",
    equipments: [],
    tags: [],
    price_per_night: "",
  });

  // Vérifier que l'utilisateur a le bon rôle (owner ou admin)
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role !== "owner" && user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  // Charger les équipements et tags disponibles depuis l'API
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
        // En cas d'erreur, on garde les valeurs par défaut
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

  // Upload une image vers le serveur
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

  // Gérer la sélection de l'image de couverture
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
      // Réinitialiser l'input pour permettre de sélectionner le même fichier
      e.target.value = "";
    }
  };

  // Gérer la sélection des photos du logement
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
      // Réinitialiser l'input pour permettre de sélectionner le même fichier
      e.target.value = "";
    }
  };

  // Gérer la sélection de la photo de profil
  const handleHostPictureSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, hostPicture: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setIsUploadingImage(false);
      // Réinitialiser l'input pour permettre de sélectionner le même fichier
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
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Non authentifié");
      }

      // Construire la location complète
      const fullLocation = formData.postalCode
        ? `${formData.location} - ${formData.postalCode}`
        : formData.location;

      const payload = {
        title: formData.title,
        description: formData.description,
        location: fullLocation,
        cover: formData.coverImage,
        pictures: formData.pictures,
        host_id: user?.id, // Lier à l'utilisateur connecté
        host: {
          name: formData.hostName,
          picture: formData.hostPicture || null,
        },
        equipments: formData.equipments,
        tags: formData.tags,
        price_per_night: parseInt(formData.price_per_night) || 80,
      };

      console.log("Payload envoyé au backend:", payload);
      console.log("User ID:", user?.id);
      console.log("Nombre d'images:", payload.pictures.length);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/properties`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création");
      }

      const createdProperty = await response.json();
      console.log("Propriété créée:", createdProperty);
      router.push(`/properties/${createdProperty.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Afficher un message pour les utilisateurs non autorisés
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
                Cette page est réservée aux utilisateurs ayant un compte
                propriétaire. Seuls les propriétaires peuvent ajouter de
                nouveaux logements sur la plateforme.
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
      <main className="flex-1 px-4 md:px-8 py-6 md:py-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header avec titre et bouton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-900 bg-[#F5F5F5] py-2 px-4 rounded-xl flex items-center gap-2 cursor-pointer"
            >
              ← Retour
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6 relative">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              Ajouter une propriété
            </h1>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#99331A] text-white px-6 py-2 rounded-md hover:bg-[#7A2815] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "En cours..." : "Ajouter"}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              {/* COLONNE GAUCHE */}
              <div>
                <div className="bg-white py-6 md:py-10 px-4 md:px-10 lg:px-20 mb-6 md:mb-10 rounded-lg shadow-sm">
                  {/* Titre de la propriété */}
                  <div className="mb-4 md:mb-5">
                    <label
                      htmlFor="title"
                      className="block text-base md:text-xl font-medium text-gray-900 mb-2"
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
                      placeholder="Ex : Appartement cosy au cœur de paris"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4 md:mb-5">
                    <label
                      htmlFor="description"
                      className="block text-base md:text-xl font-medium text-gray-900  mb-2"
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
                      placeholder="Décrivez votre propriété en détail..."
                    ></textarea>
                  </div>

                  {/* Code postal */}
                  <div className="mb-4 md:mb-5">
                    <label
                      htmlFor="postalCode"
                      className="block text-base md:text-xl font-medium text-gray-900  mb-2"
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
                      placeholder=""
                    />
                  </div>

                  {/* Localisation */}
                  <div className="mb-4 md:mb-5">
                    <label
                      htmlFor="location"
                      className="block text-base md:text-xl font-medium text-gray-900  mb-2"
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
                      placeholder=""
                    />
                  </div>

                  {/* Prix par nuit */}
                  <div className="mb-4 md:mb-5">
                    <label
                      htmlFor="price_per_night"
                      className="block text-base md:text-xl font-medium text-gray-900  mb-2"
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
                      placeholder="80"
                    />
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg shadow-sm">
                    {/* Équipements */}
                    <div className="p-4 md:p-6 rounded-lg shadow-sm">
                      <h3 className="text-base md:text-xl font-medium text-gray-900 mb-2">
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
                                checked={formData.equipments.includes(
                                  equipment,
                                )}
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
              </div>

              {/* COLONNE DROITE */}
              <div>
                {/* Image de couverture */}
                <div className="mb-4 md:mb-6 bg-white p-4 md:p-6 rounded-lg shadow-sm space-y-4">
                  <div>
                    <label
                      htmlFor="coverImageFile"
                      className="block text-base md:text-xl font-medium text-gray-900 mb-2"
                    >
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
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
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

                  {/* Image du logement */}
                  <div>
                    <label
                      htmlFor="picturesFile"
                      className="block text-base md:text-xl font-medium text-gray-900 mb-2"
                    >
                      Image du logement
                    </label>
                    {formData.pictures.length > 0 ? (
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
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
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
                    ) : null}
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

                {/* Nom de l'hôte */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm space-y-4 mb-6 md:mb-10">
                  <div>
                    <label
                      htmlFor="hostName"
                      className="block text-base md:text-xl font-medium text-gray-900 mb-2"
                    >
                      Nom de l&apos;hôte
                    </label>
                    <input
                      type="text"
                      id="hostName"
                      name="hostName"
                      required
                      value={formData.hostName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#99331A] focus:border-[#99331A] outline-none"
                      placeholder=""
                    />
                  </div>

                  {/* Photo de profil */}
                  <div>
                    <label
                      htmlFor="hostPictureFile"
                      className="block text-base md:text-xl font-medium text-gray-900 mb-2"
                    >
                      Photo de profil
                    </label>
                    {formData.hostPicture ? (
                      <div className="relative w-24 h-24 mx-auto">
                        <div className="w-full h-full relative rounded-full overflow-hidden bg-gray-100">
                          <Image
                            src={formData.hostPicture}
                            alt="Aperçu hôte"
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                            unoptimized
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              hostPicture: "",
                            }))
                          }
                          className="absolute -top-1 -right-1 w-8 h-8 bg-[#99331A] text-white rounded-full hover:bg-[#7A2815] transition-colors flex items-center justify-center cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          id="hostPictureFile"
                          accept="image/*"
                          onChange={handleHostPictureSelect}
                          className="hidden"
                          disabled={isUploadingImage}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("hostPictureFile")?.click()
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
                </div>

                {/* Catégories */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <div>
                    <h3 className="text-base md:text-xl font-medium text-gray-900 mb-4">
                      Catégories
                    </h3>

                    {/* Tags sélectionnés */}
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

                    {/* Tags disponibles */}
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

                    {/* Ajouter une catégorie personnalisée */}
                    <div className="pt-4">
                      <label
                        htmlFor="customTag"
                        className="block text-base md:text-xl font-medium text-gray-900 mb-2"
                      >
                        Ajouter une catégorie personnalisée
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="customTag"
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
            </div>
          </form>
        </div>
      </main>
    </ProtectedRoute>
  );
}
