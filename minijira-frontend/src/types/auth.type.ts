export interface RegisterDto {
  name: string;
  password: string;
  email: string;
  avatarUrl?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export type AuthenticationType = {
  user: UserType;
  accessToken: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
};
