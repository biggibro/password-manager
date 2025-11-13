export const randomHelper = <T>(data: T): T | "error" => {
  return Math.random() > 0.5 ? data : "error";
};
