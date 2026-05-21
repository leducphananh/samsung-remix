import { getCookieValue } from '@/utils/cookie.util';

const DEFAULT_COOKIE_NAME = 'auth_token';

export function getTokenFromCookies() {
  const cookieName =
    process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || DEFAULT_COOKIE_NAME;
  return getCookieValue(cookieName);
}
