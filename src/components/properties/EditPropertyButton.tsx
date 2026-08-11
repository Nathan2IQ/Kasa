"use client";

import { useAuth } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface EditPropertyButtonProps {
  propertyId: string;
  hostId?: number;
}

export default function EditPropertyButton({
  propertyId,
  hostId,
}: EditPropertyButtonProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Ne pas afficher le bouton si l'utilisateur n'est pas connecté
  if (isLoading || !user) {
    return null;
  }

  // Afficher le bouton seulement si l'utilisateur est le propriétaire ou admin
  const canEdit = user.role === "admin" || String(user.id) === String(hostId);

  if (!canEdit) {
    return null;
  }

  return (
    <button
      onClick={() => router.push(`/properties/${propertyId}/edit`)}
      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-[#99331A] text-white hover:bg-[#7A2815] transition-colors"
    >
      <FontAwesomeIcon icon={faPenToSquare} className="h-4 w-4" />
      Modifier l&apos;annonce
    </button>
  );
}
