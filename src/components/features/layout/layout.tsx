import type { FC, PropsWithChildren } from "react";

import { ModalsWrapper } from "../modals-wrapper/modals-wrapper.tsx";

import s from "./layout.module.scss";

export const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <div className={s.container}>
        <div className={s.title}>Менеджер паролей</div>
        {children}
      </div>

      <ModalsWrapper />
    </>
  );
};
