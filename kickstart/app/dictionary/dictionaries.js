import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  bn: () => import("./bn.json").then((module) => module.default),
  fi: () => import("./fi.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (locale === "en" || locale === "bn" || locale === "fi")
    return dictionaries[locale]();
  else return dictionaries["en"]();
};
