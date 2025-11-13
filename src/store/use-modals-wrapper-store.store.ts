import { create } from "zustand";
import type { ServiceDTO } from "../api/types/services.types.ts";

interface ModalsWrapperStoreState {
  modalId: "edit-service-id" | "delete-service-id" | "";

  service?: ServiceDTO;
}

interface ModalsWrapperStoreActions {
  setModalId: (modalId: "edit-service-id" | "delete-service-id" | "") => void;

  setService: (service: ServiceDTO) => void;
}

const initialState: ModalsWrapperStoreState = {
  modalId: "",
  service: undefined,
};

export const useModalsWrapperStore = create<
  ModalsWrapperStoreState & ModalsWrapperStoreActions
>((setStore) => ({
  ...initialState,

  setModalId: (modalId) => {
    setStore({ modalId });

    if (!modalId) {
      setStore({ ...initialState });
    }
  },

  setService: (service) => {
    setStore({ service });
  },
}));
