import { API, endpoints } from "../api";
import UserModel from "../shared/models/UserModel";
class CustomerService {
  static createCustomer(customer: UserModel) {
    return API.post(endpoints.api.customers.create, customer);
  }
  static updateCustomer(id: string, customer: UserModel) {
    return API.put(endpoints.api.customers.update + id);
  }
  static deleteCustomer(id: string) {
    return API.delete(endpoints.api.customers.delete + id);
  }
  static getSingleCustomer(query: string) {
    return API.get(`${endpoints.api.customers.getOne}?${query}`);
  }
  static getAllCustomer() {
    return API.get(endpoints.api.customers.getAll);
  }
}

export default CustomerService;
