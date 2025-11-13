import { type FC, useState } from "react";

import { useModalsWrapperStore } from "../../../../../../../store/use-modals-wrapper-store.store.ts";
import type { ServiceDTO } from "../../../../../../../api/types/services.types.ts";
import { ButtonUI } from "../../../../../../ui/button-ui/button-ui.tsx";

import s from "./service-list-item.module.scss";

interface Props {
  service: ServiceDTO;

  index: number;
}

export const ServiceListItem: FC<Props> = (props) => {
  const { service, index } = props;

  const { setModalId, setService } = useModalsWrapperStore();

  const [showPassword, setShowPassword] = useState(false);

  const titleShowPasswordButton = showPassword ? "Скрыть" : "Показать пароль";

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onClipboardPassword = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  const onOpenEditModal = () => {
    setModalId("edit-service-id");
    setService(service);
  };

  const onOpenDeleteModal = () => {
    setModalId("delete-service-id");
    setService(service);
  };

  return (
    <>
      <div className={s.container}>
        <div>
          {index}. {service.name} |{" "}
          {showPassword ? service.password : "*********"}
        </div>
        <div className={s.actions}>
          <ButtonUI
            title={titleShowPasswordButton}
            onCLick={toggleShowPassword}
          />
          <ButtonUI
            title="Копировать пароль"
            onCLick={() => onClipboardPassword(service.password)}
          />
          <ButtonUI title="Редактировать" onCLick={onOpenEditModal} />
          <ButtonUI title="Удалить" onCLick={onOpenDeleteModal} />
        </div>
      </div>
    </>
  );
};
