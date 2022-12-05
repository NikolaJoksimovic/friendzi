import { useCookies } from "react-cookie";
export function useMyCookies() {
  const [cookies, setCookie, removeCookie] = useCookies("user-cookies");
  return [cookies, setCookie, removeCookie];
}
