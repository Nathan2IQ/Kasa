export interface Property {
  id: string;
  title: string;
  cover: string;
  price_per_night: number;
  pictures: string[];
  description: string;
  host_id: string;
  host_name?: string;
  host_picture?: string;
  rating_avg?: number;
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
