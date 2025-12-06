import "@mantine/core/styles.css";
import "./globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  createTheme,
} from "@mantine/core";
import { AccessibilityProvider } from "../context/AccessibilityContext";

export const metadata = {
  title: "IPAL - Interaktywny Portal Analiz Legislacyjnych",
  description: "Portal analiz legislacyjnych zgodny z WCAG 2.1. Śledź prawo, konsultacje i prekonsultacje w jednym miejscu.",
  icons: {
    icon: '/icon.svg',
  },
};

const theme = createTheme({
  primaryColor: "dark",
  defaultRadius: "xs",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AccessibilityProvider>{children}</AccessibilityProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
