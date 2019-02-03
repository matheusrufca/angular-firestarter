import { User } from "src/app/core/auth.service";

export enum LoginProvider {
  Google = "Google",
}

export interface LoginAction {
  loginAction: () => Promise<User>;
}

export type ProviderActionMap = { [key in keyof typeof LoginProvider]: LoginAction };
