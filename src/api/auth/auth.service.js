import axios from "axios"
import { jwtDecode } from "jwt-decode";

export class AuthService {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = async (walletAddr) => {
    // console.log('DEBUG: Sending login request with walletAddr:', walletAddr);
    return this.instance
      .post("/login", {
        walletAddr
      })
      .then((res) => {
        // console.log('DEBUG: Login response received:', res.data);
        const decodedToken = jwtDecode(res.data.token.replace("Bearer ", ""))
        // console.log('DEBUG: Decoded token:', decodedToken);
        localStorage.setItem('token', res.data.token.replace("Bearer ", ""))

        return {
          userId: decodedToken.userId,
          username: decodedToken.username,
          avatar: decodedToken.avatar,
          exp: decodedToken.exp,
          iat: decodedToken.iat,
          accessToken: res.data.token.replace("Bearer ", "")
        }
      })
      .catch((error) => {
        // console.error('DEBUG: Login error:', error.response?.data || error.message);
        throw error;
      });
  };

}
