import { useEffect, useState } from "react";

import type { ServiceDTO } from "../../../../api/types/services.types.ts";
import { ServicesApi } from "../../../../api/services.api.ts";

export const useFetchServices = () => {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const initialFetch = async () => {
    setLoading(true);
    const nextServices = await ServicesApi.fetchServices();
    setLoading(false);

    setServices(nextServices);
  };

  useEffect(() => {
    void initialFetch();
  }, []);

  return {
    services,
    setServices,

    loading,
    setLoading,
  };
};
