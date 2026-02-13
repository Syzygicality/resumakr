export interface BaseUser {
  _id: string;
  name?: string;
  email?: string;
  creation_date: Date;
  onboarded: boolean;
}