import { type ChangeEvent, type FC, useId } from "react";
import cn from "classnames";

import s from "./input-ui.module.scss";

interface Props {
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  placeholder?: string;
  disabled?: boolean;

  fullWidth?: boolean;
  label?: string;

  type?: "text" | "number";

  maxLength?: number;

  min?: number;
  max?: number;
}

export const InputUI: FC<Props> = (props) => {
  const {
    placeholder,
    onChange,
    value,
    disabled,
    fullWidth,
    label,
    type = "text",
    maxLength,
    min,
    max,
  } = props;

  const id = useId();

  return (
    <div
      className={cn([
        s.container,
        disabled && s.disabled,
        fullWidth && s.fullWidth,
      ])}
    >
      {label && <div className={s.label}>{label}</div>}
      <input
        value={value}
        onChange={onChange}
        className={cn([s.input])}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
        disabled={disabled}
        type={type}
        id={id}
      />
    </div>
  );
};
