"use client";

import {
  Container,
  Tabs,
  TextInput,
  Box,
  SimpleGrid,
  Card,
  Text,
  Badge,
  Group,
  Button,
  Title,
  rem,
  Skeleton,
  ThemeIcon,
  Modal,
  Stack,
  Rating,
  ActionIcon,
  Progress,
} from "@mantine/core";
import {
  IconSearch,
  IconGavel,
  IconMessageCircle,
  IconFileText,
  IconArrowRight,
  IconCalendar,
  IconBuilding,
  IconUsers,
  IconStar,
  IconMessage,
  IconEye,
  IconClock,
  IconMapPin,
  IconVideo,
  IconBrain,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fakeFetchUstawy, Act } from "../../mocks/sejmMock";
import {
  preConsultationProjects,
  consultationProjects,
  PreConsultationProject,
} from "../../mocks/prekonsultacjeMock";
import { Comments } from "../Comments/Comments";
import { ProjectRating } from "../ProjectRating/ProjectRating";
import { AICommentsAnalysis } from "../AIAnalysis/AICommentsAnalysis";
import classes from "./HomeCards.module.css";

export default function HomeCards() {
  const [activeTab, setActiveTab] = useState<string | null>("ustawy");
  const [data, setData] = useState<Act[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] =
    useState<PreConsultationProject | null>(null);
  const [prekonsultacjeData, setPrekonsultacjeData] = useState(
    preConsultationProjects
  );
  const [konsultacjeData] = useState(consultationProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Act[]>([]);
  const [filteredPrekonsultacje, setFilteredPrekonsultacje] = useState(
    preConsultationProjects
  );
  const [filteredKonsultacje, setFilteredKonsultacje] =
    useState(consultationProjects);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fakeFetchUstawy("DU", "2025", 1, 12);
        setData(response.items);
        setFilteredData(response.items);
      } catch (error) {
        console.error("Błąd pobierania danych", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  // Funkcja wyszukiwania
  useEffect(() => {
    const query = searchQuery.toLowerCase();

    if (!query) {
      setFilteredData(data);
      setFilteredPrekonsultacje(prekonsultacjeData);
      setFilteredKonsultacje(konsultacjeData);
      return;
    }

    // Filtrowanie ustaw
    const filteredUstawy = data.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.ELI.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    );

    // Filtrowanie prekonsultacji
    const filteredPrek = prekonsultacjeData.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.institution.toLowerCase().includes(query)
    );

    // Filtrowanie konsultacji
    const filteredKons = konsultacjeData.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.institution.toLowerCase().includes(query)
    );

    setFilteredData(filteredUstawy);
    setFilteredPrekonsultacje(filteredPrek);
    setFilteredKonsultacje(filteredKons);
  }, [searchQuery, data, prekonsultacjeData, konsultacjeData]);

  const handleAddComment = (
    projectId: string,
    content: string,
    rating: number
  ) => {
    const newComment = {
      id: `${projectId}-${Date.now()}`,
      author: "Bieżący użytkownik",
      content,
      date: new Date().toISOString(),
      rating: rating || undefined,
    };

    setPrekonsultacjeData((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              comments: [...project.comments, newComment],
              ratingsCount: rating
                ? project.ratingsCount + 1
                : project.ratingsCount,
              averageRating: rating
                ? (project.averageRating * project.ratingsCount + rating) /
                  (project.ratingsCount + 1)
                : project.averageRating,
            }
          : project
      )
    );

    if (selectedProject?.id === projectId) {
      setSelectedProject((prev) =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, newComment],
              ratingsCount: rating ? prev.ratingsCount + 1 : prev.ratingsCount,
              averageRating: rating
                ? (prev.averageRating * prev.ratingsCount + rating) /
                  (prev.ratingsCount + 1)
                : prev.averageRating,
            }
          : null
      );
    }
  };

  const handleRateProject = (
    projectId: string,
    rating: number,
    review?: string
  ) => {
    if (review) {
      handleAddComment(projectId, review, rating);
    } else {
      setPrekonsultacjeData((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? {
                ...project,
                ratingsCount: project.ratingsCount + 1,
                averageRating:
                  (project.averageRating * project.ratingsCount + rating) /
                  (project.ratingsCount + 1),
              }
            : project
        )
      );
    }
  };

  return (
    <Container size="lg" py="xl">
      <Box ta={"center"} mb={"xl"}>
        <Title order={1} mb="md" style={{ fontSize: rem(36) }}>
          Śledź prawo, zanim Cię zaskoczy
        </Title>
        <Text c="dimmed" mb="xl" size="lg" maw={600} mx="auto">
          Przeszukuj bazy ustaw, konsultacji i projektów w jednym miejscu.
        </Text>

        <TextInput
          placeholder="Czego szukasz? Np. prawo budowlane, druk 123..."
          size="xl"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          leftSection={
            <IconSearch
              style={{ width: rem(22), height: rem(22) }}
              stroke={1.5}
            />
          }
          styles={{
            input: {
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid var(--mantine-color-gray-3)",
            },
          }}
        />
      </Box>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="default"
        keepMounted={false}
      >
        <Tabs.List grow mb="lg">
          <Tabs.Tab
            value="konsultacje"
            leftSection={<IconMessageCircle size={18} />}
          >
            Konsultacje (Aktywne)
          </Tabs.Tab>
          <Tabs.Tab value="ustawy" leftSection={<IconGavel size={18} />}>
            Nowe Ustawy
          </Tabs.Tab>
          <Tabs.Tab
            value="prekonsultacje"
            leftSection={<IconFileText size={18} />}
          >
            Prekonsultacje
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ustawy">
          <DashboardGrid
            data={filteredData}
            loading={loading}
            type="ustawy"
            searchQuery={searchQuery}
          />
        </Tabs.Panel>

        <Tabs.Panel value="konsultacje">
          <KonsultacjeGrid
            data={filteredKonsultacje}
            loading={false}
            searchQuery={searchQuery}
          />
        </Tabs.Panel>

        <Tabs.Panel value="prekonsultacje">
          <PrekonsultacjeGrid
            data={filteredPrekonsultacje}
            loading={false}
            onProjectClick={setSelectedProject}
            searchQuery={searchQuery}
          />
        </Tabs.Panel>
      </Tabs>

      <Group justify="center" mt="xl">
        <Button
          variant="subtle"
          rightSection={<IconArrowRight size={16} />}
          component={Link}
          href={`/${activeTab}`}
        >
          Zobacz wszystkie {activeTab}
        </Button>
      </Group>

      {/* Modal szczegółów prekonsultacji */}
      <Modal
        opened={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="xl"
      >
        {selectedProject && (
          <Tabs defaultValue="details">
            <Tabs.List>
              <Tabs.Tab
                value="details"
                leftSection={<IconFileText size={16} />}
              >
                Szczegóły
              </Tabs.Tab>
              <Tabs.Tab
                value="comments"
                leftSection={<IconMessage size={16} />}
              >
                Komentarze ({selectedProject.comments.length})
              </Tabs.Tab>
              <Tabs.Tab value="rating" leftSection={<IconStar size={16} />}>
                Oceny
              </Tabs.Tab>
              <Tabs.Tab
                value="ai-analysis"
                leftSection={<IconBrain size={16} />}
              >
                Analiza AI
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="details" pt="md">
              <Stack gap="md">
                <Group>
                  <Badge
                    color={
                      selectedProject.status === "active"
                        ? "green"
                        : selectedProject.status === "draft"
                        ? "yellow"
                        : "gray"
                    }
                    variant="light"
                  >
                    {selectedProject.status === "active"
                      ? "Aktywne"
                      : selectedProject.status === "draft"
                      ? "Projekt"
                      : "Zakończone"}
                  </Badge>
                  <Badge variant="outline">{selectedProject.category}</Badge>
                </Group>

                <Text>{selectedProject.description}</Text>

                <Group>
                  <Group gap="xs">
                    <IconBuilding size={16} />
                    <Text size="sm">{selectedProject.institution}</Text>
                  </Group>
                  <Group gap="xs">
                    <IconCalendar size={16} />
                    <Text size="sm">
                      Do:{" "}
                      {new Date(selectedProject.deadline).toLocaleDateString(
                        "pl-PL"
                      )}
                    </Text>
                  </Group>
                </Group>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="comments" pt="md">
              <Comments
                comments={selectedProject.comments}
                onAddComment={(content, rating) =>
                  handleAddComment(selectedProject.id, content, rating)
                }
              />
            </Tabs.Panel>

            <Tabs.Panel value="rating" pt="md">
              <ProjectRating
                averageRating={selectedProject.averageRating}
                ratingsCount={selectedProject.ratingsCount}
                onRate={(rating, review) =>
                  handleRateProject(selectedProject.id, rating, review)
                }
              />
            </Tabs.Panel>

            <Tabs.Panel value="ai-analysis" pt="md">
              <AICommentsAnalysis
                comments={selectedProject.comments}
                projectId={selectedProject.id}
                projectTitle={selectedProject.title}
              />
            </Tabs.Panel>
          </Tabs>
        )}
      </Modal>
    </Container>
  );
}

function DashboardGrid({
  data,
  loading,
  type,
  searchQuery,
}: {
  data: Act[];
  loading: boolean;
  type: string;
  searchQuery?: string;
}) {
  if (loading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={220} />
          ))}
      </SimpleGrid>
    );
  }

  if (data.length === 0 && searchQuery) {
    return (
      <Box ta="center" py="xl">
        <Text size="lg" c="dimmed">
          Nie znaleziono wyników dla "{searchQuery}"
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          Spróbuj użyć innych słów kluczowych
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {data.slice(0, 6).map((item) => (
        <Card key={item.ELI} padding="lg" withBorder className={classes.card}>
          <Group justify="space-between" mb="xs">
            <Badge
              color={
                type === "konsultacje"
                  ? "green"
                  : item.status === "Obowiązujący"
                  ? "blue"
                  : "yellow"
              }
              tt={"none"}
              variant="dot"
            >
              {type === "konsultacje" ? "Trwają" : item.status}
            </Badge>
            <Group gap={4}>
              <IconCalendar size={14} />
              <Text size="xs" c="dimmed">
                {item.announcementDate}
              </Text>
            </Group>
          </Group>

          <Text
            fw={600}
            mt="xs"
            lineClamp={3}
            style={{ flexGrow: 1 }}
            mb={"xl"}
          >
            {item.title}
          </Text>

          <Button
            component={Link}
            href={`/ustawy/${item.ELI}`}
            variant="default"
            fullWidth
            rightSection={<IconArrowRight size={16} />}
          >
            Szczegóły
          </Button>
        </Card>
      ))}
    </SimpleGrid>
  );
}

function PrekonsultacjeGrid({
  data,
  loading,
  onProjectClick,
  searchQuery,
}: {
  data: PreConsultationProject[];
  loading: boolean;
  onProjectClick: (project: PreConsultationProject) => void;
  searchQuery?: string;
}) {
  if (loading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={280} />
          ))}
      </SimpleGrid>
    );
  }

  const displayData = data.slice(0, 6);

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {displayData.map((project) => (
        <Card key={project.id} padding="lg" withBorder className={classes.card}>
          <Stack justify="space-between" style={{ height: "100%" }}>
            <div>
              <Group justify="space-between" mb="xs">
                <Badge
                  color={
                    project.status === "active"
                      ? "green"
                      : project.status === "draft"
                      ? "yellow"
                      : "gray"
                  }
                  variant="light"
                >
                  {project.status === "active"
                    ? "Aktywne"
                    : project.status === "draft"
                    ? "Projekt"
                    : "Zakończone"}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </Group>

              <Text fw={600} size="md" mb="xs" lineClamp={2}>
                {project.title}
              </Text>

              <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                {project.description}
              </Text>

              <Stack gap="xs" mb="md">
                <Group gap="xs">
                  <IconBuilding size={14} />
                  <Text size="xs">{project.institution}</Text>
                </Group>
                <Group gap="xs">
                  <IconCalendar size={14} />
                  <Text size="xs">
                    Do: {new Date(project.deadline).toLocaleDateString("pl-PL")}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconStar size={14} />
                  <Rating value={project.averageRating} readOnly size="xs" />
                  <Text size="xs">({project.ratingsCount})</Text>
                </Group>
                <Group gap="xs">
                  <IconMessage size={14} />
                  <Text size="xs">{project.comments.length} komentarzy</Text>
                </Group>
                {project.comments.length > 0 && (
                  <Group gap="xs">
                    <IconBrain size={14} />
                    <Text size="xs" c="blue">
                      Analiza AI
                    </Text>
                  </Group>
                )}
              </Stack>
            </div>

            <Button
              variant="default"
              fullWidth
              leftSection={<IconEye size={16} />}
              onClick={() => onProjectClick(project)}
            >
              Zobacz szczegóły
            </Button>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}

function KonsultacjeGrid({
  data,
  loading,
  searchQuery,
}: {
  data: any[];
  loading: boolean;
  searchQuery?: string;
}) {
  if (loading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={280} />
          ))}
      </SimpleGrid>
    );
  }

  const displayData = data.slice(0, 6);

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {displayData.map((project) => (
        <Card key={project.id} padding="lg" withBorder className={classes.card}>
          <Stack justify="space-between" style={{ height: "100%" }}>
            <div>
              <Group justify="space-between" mb="xs">
                <Badge
                  color={
                    project.status === "active"
                      ? "green"
                      : project.status === "planned"
                      ? "blue"
                      : "gray"
                  }
                  variant="light"
                  size="lg"
                >
                  {project.status === "active"
                    ? "Trwające"
                    : project.status === "planned"
                    ? "Planowane"
                    : "Zakończone"}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </Group>

              <Text fw={600} size="md" mb="xs" lineClamp={2}>
                {project.title}
              </Text>

              <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                {project.description}
              </Text>

              <Stack gap="xs" mb="md">
                <Group gap="xs">
                  <IconBuilding size={14} />
                  <Text size="xs">{project.institution}</Text>
                </Group>
                <Group gap="xs">
                  <IconCalendar size={14} />
                  <Text size="xs">
                    Do: {new Date(project.deadline).toLocaleDateString("pl-PL")}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconUsers size={14} />
                  <Text size="xs">{project.participantsCount} uczestników</Text>
                </Group>
                <Group gap="xs">
                  <IconClock size={14} />
                  <Text size="xs">{project.meetingsCount} spotkań</Text>
                </Group>
              </Stack>

              {project.status === "active" && (
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="xs" fw={500}>
                      Postęp konsultacji
                    </Text>
                    <Text size="xs" c="dimmed">
                      65%
                    </Text>
                  </Group>
                  <Progress value={65} color="green" size="sm" mb="md" />
                </div>
              )}
            </div>

            <Button
              variant="default"
              fullWidth
              leftSection={<IconEye size={16} />}
              component={Link}
              href={`/konsultacje#${project.id}`}
            >
              Zobacz szczegóły
            </Button>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
