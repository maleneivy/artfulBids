import { token } from "../../utils/storage.mjs";

export function isLoggedIn() {
  return Boolean(token);
}
console.log(token);
