import { MD3LightTheme } from "react-native-paper"

export const colors = {
  primary: "#2196F3",
  accent: "#FF9800",
  background: "#F5F5F5",
  surface: "#FFFFFF",
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#BDBDBD",
  },
  border: "#E0E0E0",
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
}

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: "bold" as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold" as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
    lineHeight: 16,
  },
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.accent,
    background: colors.background,
    surface: colors.surface,
    onSurface: colors.text.primary,
    onBackground: colors.text.primary,
  },
}
