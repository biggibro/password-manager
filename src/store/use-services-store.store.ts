import { create } from "zustand";

import { LocalStorageApi } from "../lib/helpers/local-storage.helpers.ts";
import type { ServiceDTO } from "../api/types/services.types.ts";
import { randomHelper } from "../lib/helpers/random.helper.ts";
import { sleep } from "../lib/helpers/sleep.helpers.ts";

interface ServicesStoreStoreState {
  services: ServiceDTO[];

  loading: boolean;
}

interface ServicesStoreStoreActions {
  fetchServices: () => Promise<ServiceDTO[]>;
  findServices: (search: string) => Promise<ServiceDTO[]>;

  createService: (newService: ServiceDTO) => Promise<ServiceDTO | "error">;
  updateService: (newService: ServiceDTO) => Promise<ServiceDTO | "error">;

  deleteService: (serviceId: string) => Promise<"success" | "error">;
}

const initialState: ServicesStoreStoreState = {
  services: [],

  loading: false,
};

export const useServicesStore = create<
  ServicesStoreStoreState & ServicesStoreStoreActions
>((setStore) => ({
  ...initialState,

  fetchServices: async () => {
    setStore({ loading: true });

    await sleep();
    const response = LocalStorageApi.getServices();
    setStore({ services: response });

    setStore({ loading: false });

    return response;
  },

  findServices: async (search) => {
    setStore({ loading: true });

    await sleep();

    const response = LocalStorageApi.getServices();
    const findServices = response.filter(
      (service) => !service.name.toLowerCase().search(search.toLowerCase())
    );

    setStore({ services: findServices });
    setStore({ loading: false });

    return search ? findServices : response;
  },

  createService: async (newService) => {
    setStore({ loading: true });

    await sleep();

    const prevServices = LocalStorageApi.getServices();

    const response = randomHelper(newService);

    if (response !== "error") {
      const nextServices = [...prevServices, newService];

      setStore({ services: nextServices });
      LocalStorageApi.setServices(nextServices);
    }

    setStore({ loading: false });

    return response;
  },

  updateService: async (newService) => {
    setStore({ loading: true });

    await sleep();

    const prevServices = LocalStorageApi.getServices();

    const response = randomHelper(newService);

    if (response !== "error") {
      const nextServices = prevServices.map((service) =>
        service.id === newService.id ? newService : service
      );

      setStore({ services: nextServices });
      LocalStorageApi.setServices(nextServices);
    }

    setStore({ loading: false });

    return response;
  },

  deleteService: async (serviceId) => {
    setStore({ loading: true });

    await sleep();

    const prevServices = LocalStorageApi.getServices();

    const response = randomHelper("success");

    if (response !== "error") {
      const nextServices = prevServices.filter(
        (service) => service.id !== serviceId
      );

      setStore({ services: nextServices });
      LocalStorageApi.setServices(nextServices);
    }

    setStore({ loading: false });

    return response;
  },
}));
