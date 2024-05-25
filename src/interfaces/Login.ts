export interface AdministratorLoginResponseType {
  name: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequestType {
  email: string;
  password: string;
}
