export const API_URLS = {
  products: 'https://functions.poehali.dev/eff79a9f-9388-437b-a9dd-85e18840d99a',
  reviews: 'https://functions.poehali.dev/f9490e4b-346c-465d-b5c2-d101081b3ca8',
  leads: 'https://functions.poehali.dev/3f969505-2a94-4648-ab89-bb91c6440e45',
  adminAuth: 'https://functions.poehali.dev/7b13986e-d2d5-4375-aa34-b6f3dd219f94',
};

export const getAdminToken = () => localStorage.getItem('admin_token');

export const setAdminToken = (token: string) => localStorage.setItem('admin_token', token);

export const clearAdminToken = () => localStorage.removeItem('admin_token');

export const authHeaders = (): Record<string, string> => {
  const token = getAdminToken();
  return token ? { 'X-Auth-Token': token } : {};
};
