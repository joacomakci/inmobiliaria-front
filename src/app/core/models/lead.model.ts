export interface CreateLead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
}