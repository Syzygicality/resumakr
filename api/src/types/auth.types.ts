export interface BaseUser {
  _id: string;
  name?: string;
  email?: string;
  creation_date: Date;
  onboarded: boolean;
}

export interface CallbackQuery {
  code: string;
}

export interface IdToken {
  sub: string;
  name: string;
  email: string;
}