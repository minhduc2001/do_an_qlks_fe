import store from "@/redux/store";
import { fetcher } from "./Fetcher";

export interface ILoginBody {
  email: string;
  password: string;
}

export enum EGender {
  Male,
  Female,
  Other,
}

export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface ILoginRes {
  id?: number;
  email?: string;
  name?: string;
  address?: string;
  phone?: string;
  role?: "ROLE_ADMIN" | "ROLE_RECEPTIONIST" | "ROLE_ACCOUNTANT";
  accessToken?: string;
  active?: true;
  avatar?: string;
  first_login?: boolean;
}

export interface IUserUpdate {
  username: string;
  address: string;
  phone: string;
  cccd: string;
  gender: EGender;
  id?: number;
}

function login(data: ILoginBody): Promise<ILoginRes> {
  return fetcher(
    { url: "auth/login", method: "post", data },
    { isXWWWForm: true }
  );
}

function getMe(): Promise<IUserUpdate> {
  return fetcher({ url: "auth/get-me", method: "get" });
}

function register(data: IRegisterBody): Promise<ILoginRes> {
  return fetcher(
    { url: "auth/register", method: "post", data },
    { isXWWWForm: true }
  );
}

function getAuthToken(): string | undefined {
  const { user } = store.getState();
  return user.accessToken;
}

function isLogin(): boolean {
  return !!getAuthToken();
}

function isFirstLogin() {
  const { user } = store.getState();
  return user?.first_login;
}

function updateUser(data: {
  id: number;
  data: IUserUpdate;
}): Promise<IUserUpdate> {
  return fetcher({ url: "user/" + data.id, method: "put", data: data.data });
}

export default {
  login,
  isLogin,
  register,
  isFirstLogin,
  getMe,
  updateUser,
};
