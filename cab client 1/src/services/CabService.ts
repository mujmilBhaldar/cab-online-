import { API, endpoints } from "../api";
import CabModel from "../shared/models/CabModel";
class CabService {
  static createCab(Cab: FormData) {
    return API.post(endpoints.api.cabs.create, Cab);
  }
  static updateCab(id: any, cab: FormData) {
    return API.put(endpoints.api.cabs.update + id, cab);
  }
  static deleteCab(id: string) {
    return API.delete(endpoints.api.cabs.delete + id);
  }
  static getSingleCab(id: string) {
    return API.get(endpoints.api.cabs.getOne + id);
  }
  static getAllCab() {
    return API.get(endpoints.api.cabs.getAll);
  }
}

export default CabService;
