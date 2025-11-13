import { type FC, useState } from "react";

import { ServiceEditModal } from "../../features/layout/modals/service-edit-modal/service-edit-modal.tsx";
import { ServiceList } from "./components/service-list/service-list.tsx";
import { useFetchServices } from "./hooks/use-fetch-services.hook.ts";
import { ServicesApi } from "../../../api/services.api.ts";

import { Separator } from "../../features/separator/separator.tsx";
import { ButtonUI } from "../../ui/button-ui/button-ui.tsx";
import { InputUI } from "../../ui/input-ui/input-ui.tsx";

import s from "./services-page.module.scss";

export const ServicesPage: FC = () => {
  const { services, setServices, loading, setLoading } = useFetchServices();

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");

  const onSearch = async (value: string) => {
    setSearch(value);

    setLoading(true);
    const findServices = await ServicesApi.findServices(value);
    setLoading(false);
    setServices(findServices);
  };

  const onCloseEditModal = async () => {
    const nextService = await ServicesApi.fetchServices();

    setServices(nextService);

    setOpenModal(false);
  };

  return (
    <>
      <div className={s.container}>
        <div className={s.title}>Список (Сервис / Пароль)</div>

        <Separator />

        <div className={s.actions}>
          <InputUI
            value={search}
            onChange={(event) => onSearch(event.currentTarget.value)}
            placeholder={loading ? "Загрузка.." : "Поиск по названию"}
          />
          <ButtonUI title="Создать" onCLick={() => setOpenModal(true)} />
        </div>

        <Separator />

        <ServiceList
          services={services}
          setServices={setServices}
          loading={loading}
        />
      </div>

      {openModal && <ServiceEditModal onClose={onCloseEditModal} />}
    </>
  );
};
