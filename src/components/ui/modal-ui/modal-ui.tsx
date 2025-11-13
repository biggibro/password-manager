import type { FC, ReactNode } from "react";

import { ButtonUI } from "../button-ui/button-ui.tsx";

import s from "./modal-ui.module.scss";

interface Props {
  title: string;
  content?: ReactNode;

  open: boolean;

  titleSubmit: string;
  onSubmit: () => void;
  disabledSubmit?: boolean;

  titleClose: string;
  onClose: () => void;

  error?: string;
}

export const ModalUI: FC<Props> = (props) => {
  const {
    open,

    onClose,
    onSubmit,
    disabledSubmit,

    content,

    title,
    titleSubmit,
    titleClose,

    error,
  } = props;

  if (!open) {
    return null;
  }

  return (
    <div className={s.container}>
      <div className={s.modal}>
        <div className={s.header}>{title}</div>

        {content && <div className={s.content}>{content}</div>}

        {error && <div className={s.error}>{error}</div>}

        <div className={s.footer}>
          <ButtonUI title={titleClose} onCLick={onClose} />
          <ButtonUI
            title={titleSubmit}
            onCLick={onSubmit}
            disabled={disabledSubmit}
          />
        </div>
      </div>
    </div>
  );
};
