import { LocalStorageApi } from "../lib/helpers/local-storage.helpers.ts";
import { randomHelper } from "../lib/helpers/random.helper.ts";
import type { ServiceDTO } from "./types/services.types.ts";
import { sleep } from "../lib/helpers/sleep.helpers.ts";

export const ServicesApi = {
  fetchServices: async () => {
    await sleep();

    return LocalStorageApi.getServices();
  },

  findServices: async (search: string) => {
    await sleep();

    const services = LocalStorageApi.getServices();

    return services.filter(
      (service) => !service.name.toLowerCase().search(search.toLowerCase())
    );
  },

  createService: async (service: ServiceDTO) => {
    await sleep();

    const prevServices = LocalStorageApi.getServices();
    const nextServices = [...prevServices, service];

    const response = randomHelper(service);

    if (response !== "error") {
      LocalStorageApi.setServices(nextServices);
    }

    return response;
  },

  updateService: async (nextService: ServiceDTO) => {
    await sleep();

    const prevServices = LocalStorageApi.getServices();
    const nextServices = prevServices.map((service) =>
      service.id === nextService.id ? nextService : service
    );

    const response = randomHelper(nextService);

    if (response !== "error") {
      LocalStorageApi.setServices(nextServices);
    }

    return response;
  },

  deleteService: async (serviceId: string) => {
    await sleep();

    const prevServices = LocalStorageApi.getServices();
    const nextServices = prevServices.filter(
      (service) => service.id !== serviceId
    );

    const response = randomHelper("success");

    if (response !== "error") {
      LocalStorageApi.setServices(nextServices);
    }

    return response;
  },
};
