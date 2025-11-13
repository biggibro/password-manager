import { type FC, useId } from "react";
import cn from "classnames";

import s from "./radio-button-ui.module.scss";

interface Props {
  label: string;

  checked: boolean;
  onChange: (checked: boolean) => void;

  disabled?: boolean;
}

export const RadioButtonUI: FC<Props> = (props) => {
  const { label, checked, onChange, disabled } = props;

  const id = useId();

  return (
    <label className={cn([s.container, disabled && s.disabled])}>
      <input
        className={s.input}
        type="radio"
        checked={checked}
        onChange={(event) => onChange(event.currentTarget.checked)}
        disabled={disabled}
        id={id}
      />
      <div className={s.label}>{label}</div>
    </label>
  );
};
