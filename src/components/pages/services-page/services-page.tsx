import { type FC, useEffect, useState } from "react";

import { ServiceList } from "./components/service-list/service-list.tsx";

import { useModalsWrapperStore } from "../../../store/use-modals-wrapper-store.store.ts";
import { useServicesStore } from "../../../store/use-services-store.store.ts";
import { ButtonUI } from "../../ui/button-ui/button-ui.tsx";
import { InputUI } from "../../ui/input-ui/input-ui.tsx";

import s from "./services-page.module.scss";

export const ServicesPage: FC = () => {
  const { setModalId } = useModalsWrapperStore();
  const { services, loading, fetchServices, findServices } = useServicesStore();

  const [search, setSearch] = useState("");

  const onOpenModal = () => {
    setModalId("edit-service-id");
  };

  const onSearch = async (value: string) => {
    setSearch(value);

    await findServices(value);
  };

  useEffect(() => {
    void fetchServices();
  }, []);

  return (
    <div className={s.container}>
      <div className={s.title}>Список (Сервис / Пароль)</div>

      <div className={s.actions}>
        <InputUI
          value={search}
          onChange={(event) => onSearch(event.currentTarget.value)}
          placeholder={loading ? "Загрузка.." : "Поиск по названию"}
        />
        <ButtonUI title="Создать" onCLick={onOpenModal} />
      </div>

      <ServiceList services={services} loading={loading} />
    </div>
  );
};
