export function getCookieValue(name: string) {
  if (typeof document === 'undefined') {
    return null;
  }

  const item = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith(`${name}=`));

  if (!item) {
    return null;
  }

  return decodeURIComponent(item.split('=').slice(1).join('='));
}
