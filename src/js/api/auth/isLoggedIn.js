import { token } from "../../utils/storage.mjs";

export function isLoggedIn() {
  return token;
}
