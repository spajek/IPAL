"use client";

import Link from "next/link";
import {
  Container,
  Title,
  Text,
  Timeline,
  Badge,
  Group,
  Button,
  Tabs,
  Stack
} from "@mantine/core";
import { IconCheck, IconArrowLeft, IconFileText, IconBrain } from "@tabler/icons-react";
import { ActDetails } from "@/mocks/sejmMock";
import { AISummary } from "../../../../components/AISummary/AISummary";

interface ActDetailsViewProps {
  act: ActDetails;
}

export default function ActDetailsView({ act }: ActDetailsViewProps) {
  const activeIndex = act.stages.filter((s) => s.isCompleted).length - 1;

  return (
    <Container size="md" py="xl">
      <Button
        component={Link}
        href="/ustawy"
        variant="subtle"
        size="sm"
        mb="md"
        leftSection={<IconArrowLeft size={16} />}
      >
        Powrót do listy
      </Button>

      <Group justify="space-between" mb="xs">
        <Badge
          size="lg"
          color={act.status === "Obowiązujący" ? "green" : "blue"}
        >
          {act.status}
        </Badge>
        <Text c="dimmed" size="sm">
          {act.displayAddress}
        </Text>
      </Group>

      <Title order={2} mb="md" lh={1.3}>
        {act.title}
      </Title>

      <Group gap="xl" mt="md">
        <div>
          <Text size="xs" c="dimmed">
            Data ogłoszenia
          </Text>
          <Text fw={500}>{act.announcementDate}</Text>
        </div>
        <div>
          <Text size="xs" c="dimmed">
            Typ aktu
          </Text>
          <Text fw={500}>{act.type}</Text>
        </div>
      </Group>

      <Tabs defaultValue="timeline" mt="xl">
        <Tabs.List>
          <Tabs.Tab value="timeline" leftSection={<IconFileText size={16} />}>
            Ścieżka Legislacyjna
          </Tabs.Tab>
          <Tabs.Tab value="ai-summary" leftSection={<IconBrain size={16} />}>
            Streszczenie AI
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="timeline" pt="md">
          <Stack gap="md">
            <Title order={3}>Ścieżka Legislacyjna</Title>
            
            <Timeline active={activeIndex} bulletSize={32}>
              {act.stages.map((stage) => (
                <Timeline.Item
                  key={stage.stepNumber}
                  bullet={
                    stage.isCompleted ? (
                      <IconCheck size={18} />
                    ) : (
                      <Text size="xs" fw={700}>
                        {stage.stepNumber}
                      </Text>
                    )
                  }
                  title={
                    <Text
                      fw={600}
                      size="sm"
                      c={stage.isCompleted ? "dark" : "dimmed"}
                    >
                      {stage.name}
                    </Text>
                  }
                >
                  {stage.date && (
                    <Text size="xs" c="dimmed" mt={4}>
                      Data ostatniej modyfikacji:{" "}
                      <Text span fw={500} c="dark">
                        {stage.date}
                      </Text>
                    </Text>
                  )}

                  {!stage.isCompleted && stage.stepNumber === activeIndex + 2 && (
                    <Text size="xs" c="orange" mt={4}>
                      Oczekuje na rozpoczęcie
                    </Text>
                  )}
                </Timeline.Item>
              ))}
            </Timeline>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="ai-summary" pt="md">
          <AISummary
            type="ustawa"
            title={act.title}
            description={act.title}
            status={act.status}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
