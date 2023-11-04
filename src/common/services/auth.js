export const getAccessToken = () => localStorage.getItem('accessToken');

export const saveAccessToken = (accessToken) => localStorage.setItem('accessToken', accessToken);

export const removeAccessToken = () => localStorage.removeItem('accessToken');
