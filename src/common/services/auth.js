export const getAccessToken = () => localStorage.getItem('accessToken');

export const getRoles = () => localStorage.getItem('roles');

export const saveAccessToken = (accessToken) => localStorage.setItem('accessToken', accessToken);

export const saveRoles = (roles) => localStorage.setItem('roles', roles);

export const removeAccessToken = () => localStorage.removeItem('accessToken');

export const removeRoles = () => localStorage.removeItem('roles');
