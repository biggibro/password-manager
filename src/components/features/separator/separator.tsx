import type { FC } from "react";
import cn from "classnames";

import s from "./separator.module.scss";

interface Props {
  light?: boolean;
}

export const Separator: FC<Props> = (props) => {
  const { light } = props;

  return (
    <div className={cn([s.container, light && s.light])}>
      <div className={s.line} />
    </div>
  );
};
