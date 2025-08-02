import Cookies from "js-cookie";

export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem('token');
    Cookies.remove('currentUser');
  };

  return { logout };
};