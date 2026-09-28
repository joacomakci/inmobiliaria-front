export enum PropertyType {
  CASA = 'casa',
  DEPARTAMENTO = 'departamento',
  TERRENO = 'terreno',
  LOCAL = 'local',
  OFICINA = 'oficina',
}

export enum PropertyOperation {
  VENTA = 'venta',
  ALQUILER = 'alquiler',
}

export enum PropertyStatus {
  DISPONIBLE = 'disponible',
  RESERVADA = 'reservada',
  VENDIDA = 'vendida',
  ALQUILADA = 'alquilada',
}

export interface PropertyImage {
  id: string;
  url: string;
  order: number;
}

export interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: PropertyType;
  operation: PropertyOperation;
  price: number;
  currency: string;
  address: string;
  city: string;
  neighborhood?: string;
  areaM2?: number;
  rooms?: number;
  bathrooms?: number;
  status: PropertyStatus;
  featured: boolean;
  agent: Agent;
  images: PropertyImage[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}