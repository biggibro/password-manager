import { type FC, useState } from "react";

import type { ServiceDTO } from "../../../../../api/types/services.types.ts";
import { ServicesApi } from "../../../../../api/services.api.ts";
import { ModalUI } from "../../../../ui/modal-ui/modal-ui.tsx";

interface Props {
  onClose: () => void;

  service: ServiceDTO;
}

export const ServiceDeleteModal: FC<Props> = (props) => {
  const { onClose, service } = props;

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    const response = await ServicesApi.deleteService(service.id);
    setLoading(false);

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
      title={`Удалить "${service.name}" ?`}
      open
      titleSubmit="Удалить"
      onSubmit={onSubmit}
      titleClose="Отмена"
      onClose={onClose}
      disabledSubmit={loading}
      error={error}
    />
  );
};
