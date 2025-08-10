import { AuthService } from "./auth.service";
import { BACKEND_URL } from "../../contexts/contractsOnSolana/contracts/constants";

export const authService = new AuthService(`${BACKEND_URL}/api/auth`);