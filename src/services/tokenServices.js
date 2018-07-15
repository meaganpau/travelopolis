export const setToken = token => {
    localStorage.setItem('token', token);
  };
  
export const getToken = tokenName => localStorage.getItem(tokenName);

export const removeToken = tokenName => {
localStorage.removeItem(tokenName)
};
  