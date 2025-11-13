import { type FC, useState } from "react";

import { useModalsWrapperStore } from "../../../../../store/use-modals-wrapper-store.store.ts";
import { useServicesStore } from "../../../../../store/use-services-store.store.ts";
import { ModalUI } from "../../../../ui/modal-ui/modal-ui.tsx";

export const ServiceDeleteModal: FC = () => {
  const { setModalId, service } = useModalsWrapperStore();
  const { deleteService, loading } = useServicesStore();

  const [error, setError] = useState("");

  const onClose = () => {
    setModalId("");
  };

  const onSubmit = async () => {
    if (!service) {
      return;
    }

    const response = await deleteService(service.id);

    if (response !== "error") {
      onClose();
    } else {
      setError(
        `При удалении сервиса "${service.name}" возникла ошибка.\nПовторите попытку.`
      );
    }
  };

  return (
    <ModalUI
      title={`Удалить "${service?.name}" ?`}
      titleSubmit="Удалить"
      onSubmit={onSubmit}
      titleClose="Отмена"
      onClose={onClose}
      disabledSubmit={loading}
      error={error}
    />
  );
};
