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
    return this.instance
      .post("/login", {
        walletAddr
      })
      .then((res) => {
        const decodedToken = jwtDecode(res.data.token.replace("Bearer ", ""))
        localStorage.setItem('token', res.data.token.replace("Bearer ", ""))

        return {
          userId: decodedToken.userId,
          username: decodedToken.username,
          avatar: decodedToken.avatar,
          exp: decodedToken.exp,
          iat: decodedToken.iat,
          accessToken: res.data.token.replace("Bearer ", "")
        }
      });
  };

}