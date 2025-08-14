export type SupportedLocale = "fr" /*| "en"*/;

export type SupportedLanguage<K extends SupportedLocale> = {
    locale: K;
    label: string;
};

export type SupportedLanguages = {
    [K in SupportedLocale]: SupportedLanguage<K>;
};
