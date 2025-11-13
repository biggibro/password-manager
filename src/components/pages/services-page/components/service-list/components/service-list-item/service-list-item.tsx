import { type FC, useState } from "react";

import { ServiceDeleteModal } from "../../../../../../features/layout/modals/service-delete-modal/service-delete-modal.tsx";
import { ServiceEditModal } from "../../../../../../features/layout/modals/service-edit-modal/service-edit-modal.tsx";
import type { ServiceDTO } from "../../../../../../../api/types/services.types.ts";
import { Separator } from "../../../../../../features/separator/separator.tsx";
import { ButtonUI } from "../../../../../../ui/button-ui/button-ui.tsx";
import { ServicesApi } from "../../../../../../../api/services.api.ts";

import s from "./service-list-item.module.scss";

interface Props {
  service: ServiceDTO;

  setServices: (services: ServiceDTO[]) => void;

  index: number;
}

export const ServiceListItem: FC<Props> = (props) => {
  const { service, setServices, index } = props;

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const titleShowPasswordButton = showPassword ? "Скрыть" : "Показать пароль";

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onClipboardPassword = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  const onOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const onCloseEditModal = async () => {
    const nextService = await ServicesApi.fetchServices();

    setServices(nextService);

    setOpenEditModal(false);
  };

  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const onCloseDeleteModal = async () => {
    const nextService = await ServicesApi.fetchServices();

    setServices(nextService);

    setOpenDeleteModal(false);
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

      <Separator light />

      {openEditModal && (
        <ServiceEditModal onClose={onCloseEditModal} service={service} />
      )}

      {openDeleteModal && (
        <ServiceDeleteModal onClose={onCloseDeleteModal} service={service} />
      )}
    </>
  );
};
