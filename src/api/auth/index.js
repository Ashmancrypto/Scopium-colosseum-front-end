import { AuthService } from "./auth.service";
import { BACKEND_URL } from "../../contexts/contractsOnSolana/contracts/constants";

export const authService = new AuthService(`https://launch.scopium.com/api/auth`);