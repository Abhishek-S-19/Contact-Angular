export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  department: string;
  designation: string;
  createdAt?: Date;
  profilePic?: string; // URL or base64 string
  purposeOfVisit: string;
  identificationNumber: string;
}
