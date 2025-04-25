export interface Contact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  department: string;
  designation: string;
  createdAt?: Date;
  profilePic?: string; 
  socialMediaLinks: {
    twitter: string;
    linkedin: string;
  },
  discussion: string;
  identificationNumber: string;
previousVisits?: { date: Date; purpose: string }[];
}
