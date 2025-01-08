import { login, signup, verifysignup } from "../../services/auth";
import { asyncThunk } from "../../lib/thunk";

export const userSignup = asyncThunk("auth/signup", signup);
export const userLogin = asyncThunk("auth/login", login);
export const userVerifySignup = asyncThunk("auth/verifySignup", verifysignup);
