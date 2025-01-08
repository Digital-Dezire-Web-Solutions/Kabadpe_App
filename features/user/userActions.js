import { getUser } from "../../services/user";
import { asyncThunk } from "../../lib/thunk";

export const userFetch = asyncThunk("user/getUser", getUser);
