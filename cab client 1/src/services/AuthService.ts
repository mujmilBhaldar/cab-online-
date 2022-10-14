import { API, endpoints } from "../api";
import UserModel from "../shared/models/UserModel";
class AuthService {
  static userLogin(user: UserModel) {
    return API.post(endpoints.api.auth.userLogin, user).then((response) => {
      const token = response.headers["x-token"];
      if (token) sessionStorage.setItem("token", token);
      return response;
    });
  }

  static validateToken(token: any) {
    if (!token) token = sessionStorage.getItem("token");
    if (token) {
      return API.post(endpoints.api.auth.validateToken, { token });
    } else {
      return Promise.reject({ message: "Invalid token" });
    }
  }

  static validateCustomerByMobile(mobile: string) {
    return API.post(endpoints.api.auth.validateCustomer + mobile, { mobile });
  }

  static passwordResetLink(email: string) {
    return API.post(endpoints.api.auth.passwordResetLink, { email });
  }
}

export default AuthService;
