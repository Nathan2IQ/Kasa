export interface Property {
  id: string;
  title: string;
  cover: string;
  price_per_night: number;
  pictures: string[];
  description: string;
  host: {
    id: number;
    name: string;
    picture?: string;
  };
  rating_avg?: number;
  ratings_count?: number;
  location: string;
  equipments: string[];
  tags: string[];
}

export interface PropertyListItem {
  id: string;
  title: string;
  cover: string;
  location: string;
  price_per_night: number;
  rating_avg?: number;
}
