import { type FC, useState } from "react";
import cn from "classnames";

import { generatePassword } from "../../../../../lib/helpers/generate-password/generate-password.helper.ts";
import { RadioButtonUI } from "../../../../ui/radio-button-ui/radio-button-ui.tsx";
import { generateId } from "../../../../../lib/helpers/generate-id.helper.ts";
import type { ServiceDTO } from "../../../../../api/types/services.types.ts";
import { CheckBoxUI } from "../../../../ui/check-box-ui/check-box-ui.tsx";
import { ButtonUI } from "../../../../ui/button-ui/button-ui.tsx";
import { ServicesApi } from "../../../../../api/services.api.ts";
import { ModalUI } from "../../../../ui/modal-ui/modal-ui.tsx";
import { InputUI } from "../../../../ui/input-ui/input-ui.tsx";

import s from "./service-edit-modal.module.scss";

interface Props {
  onClose: () => void;

  service?: ServiceDTO;
}

export const ServiceEditModal: FC<Props> = (props) => {
  const { onClose, service } = props;

  const [name, setName] = useState(service?.name || "");
  const [symbols, setSymbols] = useState("");
  const [password, setPassword] = useState(service?.password || "");
  const [lengthPassword, setLengthPassword] = useState(5);
  const [registry, setRegistry] = useState<"upper" | "lower" | "random">(
    "upper"
  );
  const [hasLetter, setHasLetter] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [hasSpecialSymbol, setHasSpecialSymbol] = useState(false);
  const [withoutRules, setWithoutRules] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const disabledSubmit = !password.trim() || !name.trim() || loading;
  const disabledGenerateButton =
    !name.trim() ||
    (!hasLetter && !hasDigit && !hasSpecialSymbol && !withoutRules);

  const title = service ? "Редактирование" : "Создание";
  const titleSubmit = service ? "Сохранить" : "Создать";

  const onGeneratePassword = () => {
    const generatedPassword = generatePassword({
      lengthPassword,
      hasDigit,
      hasLetter,
      hasSpecialSymbol,
      symbols,
      withoutRules,
      registry,
    });

    setPassword(generatedPassword);
  };

  const onSubmit = async () => {
    setLoading(true);

    if (service) {
      const response = await ServicesApi.updateService({
        id: service.id,
        name,
        password,
      });

      if (response !== "error") {
        onClose();
      } else {
        setError(
          `При редакитровании сервиса "${service.name}" возникла ошибка.\nПовторите попытку.`
        );
      }
    } else {
      const response = await ServicesApi.createService({
        id: generateId(),
        name,
        password,
      });

      if (response !== "error") {
        onClose();
      } else {
        setError(
          `При создании сервиса "${name}" возникла ошибка.\nПовторите попытку.`
        );
      }
    }

    setLoading(false);
  };

  return (
    <ModalUI
      title={title}
      content={
        <div className={s.content}>
          <InputUI
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            label="Сервис"
            placeholder="Сервис"
            fullWidth
          />

          <InputUI
            value={lengthPassword}
            onChange={(event) => {
              setLengthPassword(Number(event.currentTarget.value));
              setSymbols("");
            }}
            label="Длина пароля"
            placeholder="Длина пароля"
            fullWidth
            min={1}
            max={16}
            type="number"
          />

          <InputUI
            value={symbols}
            label="Ваш набор символов"
            placeholder="Ваш набор символов"
            onChange={(event) => setSymbols(event.currentTarget.value)}
            maxLength={lengthPassword}
            disabled={!withoutRules}
            fullWidth
          />

          <CheckBoxUI
            label="Использование букв"
            checked={hasLetter}
            onChange={(checked) => setHasLetter(checked)}
            disabled={withoutRules}
          />
          <CheckBoxUI
            label="Использование цифр"
            checked={hasDigit}
            onChange={(checked) => setHasDigit(checked)}
            disabled={withoutRules}
          />
          <CheckBoxUI
            label="Использование спецсимволов"
            checked={hasSpecialSymbol}
            onChange={(checked) => setHasSpecialSymbol(checked)}
            disabled={withoutRules}
          />

          <div className={s.group}>
            <div className={cn([s.label, withoutRules && s.disabled])}>
              Регистр
            </div>
            <RadioButtonUI
              label="Вернхий"
              checked={registry === "upper"}
              onChange={() => setRegistry("upper")}
              disabled={withoutRules || !hasLetter}
            />
            <RadioButtonUI
              label="Нижний"
              checked={registry === "lower"}
              onChange={() => setRegistry("lower")}
              disabled={withoutRules || !hasLetter}
            />
            <RadioButtonUI
              label="Случайный"
              checked={registry === "random"}
              onChange={() => setRegistry("random")}
              disabled={withoutRules || !hasLetter}
            />
          </div>

          <CheckBoxUI
            label="Мой набор символов"
            checked={withoutRules}
            onChange={(checked) => setWithoutRules(checked)}
          />

          <InputUI
            value={password}
            label="Пароль"
            placeholder="Пароль"
            disabled
            fullWidth
          />

          <ButtonUI
            title="Генерировать"
            onCLick={onGeneratePassword}
            disabled={disabledGenerateButton}
            fullWidth
          />
        </div>
      }
      open
      titleSubmit={titleSubmit}
      onSubmit={onSubmit}
      titleClose="Отмена"
      onClose={onClose}
      disabledSubmit={disabledSubmit}
      error={error}
    />
  );
};
