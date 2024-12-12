// types/word.ts

enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export type UserResponse = {
  id: string;
  email: string;
  name: string;
  role: string;
  gender: string;
  address: string;
  dob: string; // ISO 8601 date format (e.g., "2024-11-26")
  mobileNumber: string;
  noPassword: boolean;
  image: string;
  createdAt: string; // ISO 8601 date-time format (e.g., "2024-11-26T10:00:00Z")
};