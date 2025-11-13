import { type FC, useEffect } from "react";
import cn from "classnames";

import { generatePassword } from "../../../../../../../lib/helpers/generate-password/generate-password.helper.ts";
import { useServiceEditStoreStore } from "../../../../../../../store/use-service-edit-store.store.ts";
import { useModalsWrapperStore } from "../../../../../../../store/use-modals-wrapper-store.store.ts";
import { RadioButtonUI } from "../../../../../../ui/radio-button-ui/radio-button-ui.tsx";
import { CheckBoxUI } from "../../../../../../ui/check-box-ui/check-box-ui.tsx";
import { ButtonUI } from "../../../../../../ui/button-ui/button-ui.tsx";
import { InputUI } from "../../../../../../ui/input-ui/input-ui.tsx";

import s from "./service-edit-modal-content.module.scss";

export const ServiceEditModalContent: FC = () => {
  const { service } = useModalsWrapperStore();

  const {
    name,
    password,

    symbols,
    lengthPassword,
    registry,
    hasLetter,
    hasDigit,
    hasSpecialSymbol,
    withoutRules,

    setName,
    setPassword,

    setSymbols,
    setLengthPassword,
    setRegistry,
    setHasLetter,
    setHasDigit,
    setHasSpecialSymbol,
    setWithoutRules,
  } = useServiceEditStoreStore();

  const disabledGenerateButton =
    !name.trim() ||
    (!hasLetter && !hasDigit && !hasSpecialSymbol && !withoutRules);

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

  useEffect(() => {
    setName(service?.name || "");
    setPassword(service?.password || "");
  }, []);

  return (
    <div className={s.container}>
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
        <div className={cn([s.label, withoutRules && s.disabled])}>Регистр</div>
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
  );
};
