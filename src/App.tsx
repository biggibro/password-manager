import type { FC } from "react";

import { ServicesPage } from "./components/pages/services-page/services-page.tsx";
import { Layout } from "./components/features/layout/layout.tsx";

export const App: FC = () => (
  <Layout>
    <ServicesPage />
  </Layout>
);
