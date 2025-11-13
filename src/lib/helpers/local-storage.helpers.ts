import type { ServiceDTO } from "../../api/types/services.types.ts";
import { localStorageMyServiceKey } from "../constants/local-storage.constants.ts";

export const LocalStorageApi = {
  getServices: (): ServiceDTO[] => {
    const jsonServices = localStorage.getItem(localStorageMyServiceKey);

    if (jsonServices) {
      return (JSON.parse(jsonServices) as ServiceDTO[]) || [];
    } else {
      return [];
    }
  },

  setServices: (services: ServiceDTO[]) => {
    const stringifyServices = JSON.stringify(services);

    localStorage.setItem(localStorageMyServiceKey, stringifyServices);
  },
};
