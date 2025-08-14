export type SupportedThemeLabel = "light" | "dark";

export type SupportedTheme<K extends SupportedThemeLabel> = {
    label: K;
};

export type SupportedThemes = {
    [K in SupportedThemeLabel]: SupportedTheme<K>;
};
