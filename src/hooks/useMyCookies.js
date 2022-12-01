import { useCookies } from "react-cookie";
export function useMyCookies(key) {
  const [cookies, setCookie, removeCookie] = useCookies([key]);
  return [cookies, setCookie, removeCookie];
}
