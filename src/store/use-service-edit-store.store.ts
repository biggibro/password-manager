import { create } from "zustand";

type RegistryType = "upper" | "lower" | "random";

interface ServiceEditStoreState {
  name: string;
  password: string;

  symbols: string;
  lengthPassword: number;
  registry: RegistryType;
  hasLetter: boolean;
  hasDigit: boolean;
  hasSpecialSymbol: boolean;

  withoutRules: boolean;
}

interface ServiceEditStoreActions {
  setName: (name: string) => void;
  setPassword: (password: string) => void;

  setSymbols: (symbols: string) => void;
  setLengthPassword: (lengthPassword: number) => void;
  setRegistry: (registry: RegistryType) => void;

  setHasLetter: (hasLetter: boolean) => void;
  setHasDigit: (hasDigit: boolean) => void;
  setHasSpecialSymbol: (hasSpecialSymbol: boolean) => void;

  setWithoutRules: (withoutRules: boolean) => void;

  resetServiceEditForm: () => void;
}

const initialState: ServiceEditStoreState = {
  name: "",
  password: "",

  symbols: "",
  lengthPassword: 5,
  registry: "lower",
  hasLetter: false,
  hasDigit: false,
  hasSpecialSymbol: false,

  withoutRules: false,
};

export const useServiceEditStoreStore = create<
  ServiceEditStoreState & ServiceEditStoreActions
>((setState) => ({
  ...initialState,

  setName: (name) => setState({ name }),
  setPassword: (password) => setState({ password }),

  setSymbols: (symbols) => setState({ symbols }),
  setLengthPassword: (lengthPassword) => setState({ lengthPassword }),
  setRegistry: (registry) => setState({ registry }),

  setHasLetter: (hasLetter) => setState({ hasLetter }),
  setHasDigit: (hasDigit) => setState({ hasDigit }),
  setHasSpecialSymbol: (hasSpecialSymbol) => setState({ hasSpecialSymbol }),

  setWithoutRules: (withoutRules) => setState({ withoutRules }),

  resetServiceEditForm: () => setState({ ...initialState }),
}));
