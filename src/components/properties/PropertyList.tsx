import type { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Aucun logement disponible</p>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
}
