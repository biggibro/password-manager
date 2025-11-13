import type { FC } from "react";
import cn from "classnames";

import s from "./button-ui.module.scss";

interface Props {
  title: string;

  onCLick: () => void;

  disabled?: boolean;
  fullWidth?: boolean;
}

export const ButtonUI: FC<Props> = (props) => {
  const { title, onCLick, disabled, fullWidth } = props;

  return (
    <button
      className={cn([
        s.container,
        disabled && s.disabled,
        fullWidth && s.fullWidth,
      ])}
      onClick={onCLick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
