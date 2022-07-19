const isRefreshSessionKeyGetter = (s: string) => `isRefreshSessionKey_${s}`;
export const isRefreshSessionKeySetter = (s: string, val: string) =>
  sessionStorage.setItem(isRefreshSessionKeyGetter(s), val);
