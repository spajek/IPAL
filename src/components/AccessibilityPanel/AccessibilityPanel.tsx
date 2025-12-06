"use client";

import {
  ActionIcon,
  Group,
  Tooltip,
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
} from "@mantine/core";
import {
  IconEye,
  IconEyeOff,
  IconMinus,
  IconPlus,
  IconTypography,
  IconSun,
  IconMoon,
  IconLogin,
} from "@tabler/icons-react";
import { useAccessibility } from "../../context/AccessibilityContext";
import Link from "next/link";
import cx from "clsx";
import classes from "./ThemeToggleIcons.module.css";

export default function AccessibilityPanel() {
  const {
    highContrast,
    toggleHighContrast,
    increaseFont,
    decreaseFont,
    fontSizePercent,
  } = useAccessibility();

  const { setColorScheme } = useMantineColorScheme();

  const colorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const themeTooltipLabel = highContrast
    ? "Opcja niedostępna w trybie wysokiego kontrastu"
    : colorScheme === "dark"
    ? "Włącz jasny motyw"
    : "Włącz ciemny motyw";

  return (
    <Group gap="xs">
      <Tooltip label={themeTooltipLabel}>
        <span style={{ cursor: highContrast ? "not-allowed" : "pointer" }}>
          <ActionIcon
            onClick={() =>
              setColorScheme(colorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="lg"
            aria-label="Przełącz motyw jasny/ciemny"
            disabled={highContrast}
            style={{ pointerEvents: highContrast ? "none" : "auto" }}
          >
            <IconSun className={cx(classes.icon, classes.light)} />
            <IconMoon className={cx(classes.icon, classes.dark)} />
          </ActionIcon>
        </span>
      </Tooltip>

      <Tooltip
        label={
          highContrast
            ? "Wyłącz wysoki kontrast"
            : "Włącz wysoki kontrast (czarno-żółty)"
        }
      >
        <ActionIcon
          onClick={toggleHighContrast}
          variant={highContrast ? "filled" : "default"}
          color={highContrast ? "yellow" : undefined}
          c={highContrast ? "black" : undefined}
          size="lg"
          aria-label={
            highContrast ? "Wyłącz wysoki kontrast" : "Włącz wysoki kontrast"
          }
          style={highContrast ? { border: "2px solid yellow" } : {}}
        >
          {highContrast ? <IconEyeOff size={20} /> : <IconEye size={20} />}
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Zmniejsz tekst">
        <ActionIcon
          onClick={decreaseFont}
          variant="default"
          size="lg"
          aria-label="Zmniejsz rozmiar tekstu"
          disabled={fontSizePercent <= 80}
        >
          <IconMinus size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={`Rozmiar tekstu: ${fontSizePercent}%`}>
        <ActionIcon variant="transparent" size="lg" aria-hidden tabIndex={-1}>
          <IconTypography size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Powiększ tekst">
        <ActionIcon
          onClick={increaseFont}
          variant="default"
          size="lg"
          aria-label="Powiększ rozmiar tekstu"
          disabled={fontSizePercent >= 150}
        >
          <IconPlus size={20} />
        </ActionIcon>
      </Tooltip>

      <Link href="/login" style={{ textDecoration: "none" }}>
        <Button
          leftSection={<IconLogin size={18} />}
          variant="filled"
          size="sm"
        >
          Logowanie
        </Button>
      </Link>
    </Group>
  );
}
