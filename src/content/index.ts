export type Locale = "en" | "pt";

export const dictionaries = {
  en: () => import("./en").then((module) => module.en),
  pt: () => import("./pt").then((module) => module.pt),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
