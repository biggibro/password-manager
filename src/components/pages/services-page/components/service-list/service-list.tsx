import { type FC } from "react";

import { ServiceListItem } from "./components/service-list-item/service-list-item.tsx";
import type { ServiceDTO } from "../../../../../api/types/services.types.ts";

import s from "./service-list.module.scss";

interface Props {
  services: ServiceDTO[];

  setServices: (services: ServiceDTO[]) => void;

  loading?: boolean;
}

export const ServiceList: FC<Props> = (props) => {
  const { services, setServices, loading } = props;

  const empty = !services.length && !loading;
  const notEmpty = !loading && !!services.length;

  return (
    <div className={s.container}>
      {loading && "Загрузка..."}

      {empty && "Список пуст или совпадений не найдено"}

      {notEmpty &&
        services.map((service, index) => (
          <ServiceListItem
            service={service}
            setServices={setServices}
            index={index + 1}
            key={index}
          />
        ))}
    </div>
  );
};
