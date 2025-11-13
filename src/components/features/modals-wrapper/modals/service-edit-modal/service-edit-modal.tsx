import { type FC, useState } from "react";

import { ServiceEditModalContent } from "./components/service-edit-modal-content/service-edit-modal-content.tsx";
import { useServiceEditStoreStore } from "../../../../../store/use-service-edit-store.store.ts";
import { useModalsWrapperStore } from "../../../../../store/use-modals-wrapper-store.store.ts";
import { useServicesStore } from "../../../../../store/use-services-store.store.ts";
import { generateId } from "../../../../../lib/helpers/generate-id.helper.ts";
import { ModalUI } from "../../../../ui/modal-ui/modal-ui.tsx";

export const ServiceEditModal: FC = () => {
  const { setModalId, service } = useModalsWrapperStore();
  const { updateService, createService, loading } = useServicesStore();

  const {
    name,
    password,

    resetServiceEditForm,
  } = useServiceEditStoreStore();

  const [error, setError] = useState("");

  const disabledSubmit = !password.trim() || !name.trim() || loading;

  const title = service ? "Редактирование" : "Создание";
  const titleSubmit = service ? "Сохранить" : "Создать";

  const onClose = () => {
    setModalId("");
    resetServiceEditForm();
  };

  const onUpdate = async () => {
    if (!service) {
      return;
    }

    const response = await updateService({
      id: service.id,
      name,
      password,
    });

    if (response !== "error") {
      onClose();
    } else {
      setError(
        `При редакитровании сервиса "${service.name}" возникла ошибка.\nПовторите попытку.`
      );
    }
  };

  const onCreate = async () => {
    const response = await createService({
      id: generateId(),
      name,
      password,
    });

    if (response !== "error") {
      onClose();
    } else {
      setError(
        `При создании сервиса "${name}" возникла ошибка.\nПовторите попытку.`
      );
    }
  };

  const onSubmit = async () => {
    if (service) {
      await onUpdate();
    } else {
      await onCreate();
    }
  };

  return (
    <ModalUI
      title={title}
      content={<ServiceEditModalContent />}
      titleSubmit={titleSubmit}
      onSubmit={onSubmit}
      titleClose="Отмена"
      onClose={onClose}
      disabledSubmit={disabledSubmit}
      error={error}
    />
  );
};
