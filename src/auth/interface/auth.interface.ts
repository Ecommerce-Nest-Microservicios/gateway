export interface IAuth {
  id: string;
  name: string;
  email: string;
}

export interface IAuthData {
  user: IAuth;
  token: string;
}
export interface IVerifyPayload {
  token: string;
}
export interface IAuthClientResponse {
  ok: boolean;
  message: string;
  data: IAuthData;
}
