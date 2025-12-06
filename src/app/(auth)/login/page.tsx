"use client";

import {
  Container,
  Paper,
  ThemeIcon,
  Group,
  Box,
  Text,
  Badge,
  Stack,
  Title,
  SimpleGrid,
  BackgroundImage,
  Button,
  Overlay,
  Anchor,
} from "@mantine/core";
import Link from "next/link";
import {
  IconBuildingBank,
  IconDeviceMobile,
  IconFingerprint,
  IconShieldCheck,
  IconStarsFilled,
} from "@tabler/icons-react";

type Provider = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge?: string;
  onClick: () => void;
};

const providers: Provider[] = [
  {
    id: "mobywatel",
    title: "Aplikacja mObywatel",
    subtitle: "Zaloguj się za pomocą aplikacji mObywatel",
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconDeviceMobile />
      </ThemeIcon>
    ),
    badge: "Polecane",
    onClick: () => console.log("logowanie z mObywatel"),
  },
  {
    id: "pz",
    title: "Profil Zaufany",
    subtitle: "Zaloguj się przy użyciu Profilu Zaufanego",
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconShieldCheck />
      </ThemeIcon>
    ),
    onClick: () => console.log("logowanie z Profil Zaufany"),
  },
  {
    id: "be",
    title: "Bankowość elektroniczna",
    subtitle: "Zaloguj się za pomocą swojego banku",
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconBuildingBank />
      </ThemeIcon>
    ),
    badge: "Polecane",
    onClick: () => console.log("logowanie z Bankowość elektroniczna"),
  },
  {
    id: "edowod",
    title: "E-dowód",
    subtitle: "Użyj dowodu osobistego lub czytnika NFC",
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconFingerprint />
      </ThemeIcon>
    ),
    badge: "Polecane",
    onClick: () => console.log("logowanie z E-dowód"),
  },
  {
    id: "eid",
    title: "Use eID",
    subtitle: "Use your National eID to access online services",
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconStarsFilled />
      </ThemeIcon>
    ),
    badge: "Polecane",
    onClick: () => console.log("logowanie z eID"),
  },
];

function LoginButton({ provider }: { provider: Provider }) {
  return (
    <Paper
      withBorder
      p="sm"
      component="button"
      onClick={provider.onClick}
      style={{ cursor: "pointer", width: "100%", textAlign: "left" }}
    >
      <Group align="flex-start">
        {provider.icon}

        <Box>
          <Group>
            <Text>{provider.title}</Text>
            {provider.badge && <Badge tt="none">{provider.badge}</Badge>}
          </Group>

          <Text size="sm" c="dimmed">
            {provider.subtitle}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
}

export default function LoginPage() {
  return (
    <Container
      fluid
      h="100vh"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: "min(6vw, 48px)",
      }}
    >
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} w="100%" spacing="xl">
        <Box>
          <Title order={1} size="lg" mb={"md"}>
            Logowanie do <Anchor component={Link} href="/" c="blue" td="underline">IPAL</Anchor>
          </Title>
          <Stack gap={"xs"}>
            {providers.map((p) => (
              <LoginButton key={p.id} provider={p} />
            ))}
          </Stack>
        </Box>
        <BackgroundImage
          src="https://emerging-europe.com/wp-content/uploads/2023/03/bigstock-administrative-center-in-warsa-468491209-990x556.jpg"
          h="100%"
          style={{ position: "relative", minHeight: 360, overflow: "hidden" }}
        >
          <Overlay
            gradient="linear-gradient(120deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.6) 100%)"
            zIndex={1}
          />
          <Container
            ta="center"
            h="100%"
            py="xl"
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "md",
            }}
          >
            <Title order={2} size="xl" c="white">
              Bądź na bieżąco z najnowszymi ustawami
            </Title>
            <Text c="white" size="md">
              Otrzymuj podsumowania AI, alerty o zmianach i jasne streszczenia,
              aby szybko zrozumieć, co naprawdę się zmienia.
            </Text>
            <Group justify="center">
              <Button variant="white" color="dark" size="md">
                Dowiedz się więcej
              </Button>
            </Group>
          </Container>
        </BackgroundImage>
      </SimpleGrid>
    </Container>
  );
}
