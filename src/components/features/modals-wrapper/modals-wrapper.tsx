import type { FC } from "react";

import { ServiceDeleteModal } from "./modals/service-delete-modal/service-delete-modal.tsx";
import { useModalsWrapperStore } from "../../../store/use-modals-wrapper-store.store.ts";
import { ServiceEditModal } from "./modals/service-edit-modal/service-edit-modal.tsx";

export const ModalsWrapper: FC = () => {
  const { modalId } = useModalsWrapperStore();

  return (
    <>
      {modalId === "edit-service-id" && <ServiceEditModal />}
      {modalId === "delete-service-id" && <ServiceDeleteModal />}
    </>
  );
};
