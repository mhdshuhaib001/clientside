export const getToken = (): string | null => {
  const token = localStorage.getItem('accessToken');
  return token;
};

export const getSellerToken = (): string | null => {
  const sellerToken = localStorage.getItem('sellerToken');
  return sellerToken;
};

export const getAdminToken = (): string | null => {
  const adminToken = localStorage.getItem('adminToken');
  return adminToken;
};

export const getRefreshToken =(): string|null =>{
  const refreshToken = localStorage.getItem('refreshToken')
  return refreshToken
}