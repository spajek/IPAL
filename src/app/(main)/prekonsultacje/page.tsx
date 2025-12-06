'use client';

import { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Card,
  Badge,
  Group,
  Stack,
  Button,
  Select,
  TextInput,
  Grid,
  Modal,
  Tabs,
  Paper,
  ActionIcon,
  Tooltip,
  Divider,
  Rating
} from '@mantine/core';
import {
  IconSearch,
  IconCalendar,
  IconBuilding,
  IconFileText,
  IconUsers,
  IconStar,
  IconMessage,
  IconFilter,
  IconEye,
  IconDownload,
  IconBrain,
  IconFileDescription
} from '@tabler/icons-react';
import { preConsultationProjects, PreConsultationProject, Comment } from '../../../mocks/prekonsultacjeMock';
import { Comments } from '../../../components/Comments/Comments';
import { ProjectRating } from '../../../components/ProjectRating/ProjectRating';
import { AICommentsAnalysis } from '../../../components/AIAnalysis/AICommentsAnalysis';
import { AISummary } from '../../../components/AISummary/AISummary';

export default function PrekonsultacjePage() {
  const [projects, setProjects] = useState(preConsultationProjects);
  const [selectedProject, setSelectedProject] = useState<PreConsultationProject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'draft': return 'yellow';
      case 'closed': return 'gray';
      default: return 'blue';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktywne';
      case 'draft': return 'Projekt';
      case 'closed': return 'Zakończone';
      default: return status;
    }
  };

  const handleAddComment = (projectId: string, content: string, rating: number) => {
    const newComment: Comment = {
      id: `${projectId}-${Date.now()}`,
      author: 'Bieżący użytkownik',
      content,
      date: new Date().toISOString(),
      rating: rating || undefined
    };

    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            comments: [...project.comments, newComment],
            ratingsCount: rating ? project.ratingsCount + 1 : project.ratingsCount,
            averageRating: rating ? 
              ((project.averageRating * project.ratingsCount) + rating) / (project.ratingsCount + 1) :
              project.averageRating
          }
        : project
    ));

    if (selectedProject?.id === projectId) {
      setSelectedProject(prev => prev ? {
        ...prev,
        comments: [...prev.comments, newComment],
        ratingsCount: rating ? prev.ratingsCount + 1 : prev.ratingsCount,
        averageRating: rating ? 
          ((prev.averageRating * prev.ratingsCount) + rating) / (prev.ratingsCount + 1) :
          prev.averageRating
      } : null);
    }
  };

  const handleRateProject = (projectId: string, rating: number, review?: string) => {
    if (review) {
      handleAddComment(projectId, review, rating);
    } else {
      setProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { 
              ...project,
              ratingsCount: project.ratingsCount + 1,
              averageRating: ((project.averageRating * project.ratingsCount) + rating) / (project.ratingsCount + 1)
            }
          : project
      ));
    }
  };

  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">Prekonsultacje projektów legislacyjnych</Title>
          <Text size="lg" c="dimmed">
            Uczestniczenie w prekonsultacjach projektów ustaw i rozporządzeń. 
            Podziel się swoją opinią i ocen projekty przed ich oficjalnym wdrożeniem.
          </Text>
        </div>

        <Paper p="md" shadow="sm" radius="md">
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                placeholder="Szukaj projektów..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                placeholder="Status"
                leftSection={<IconFilter size={16} />}
                data={[
                  { value: 'all', label: 'Wszystkie' },
                  { value: 'active', label: 'Aktywne' },
                  { value: 'draft', label: 'Projekty' },
                  { value: 'closed', label: 'Zakończone' }
                ]}
                value={filterStatus}
                onChange={(value) => setFilterStatus(value || 'all')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                placeholder="Kategoria"
                leftSection={<IconFilter size={16} />}
                data={[
                  { value: 'all', label: 'Wszystkie kategorie' },
                  ...categories.map(cat => ({ value: cat, label: cat }))
                ]}
                value={filterCategory}
                onChange={(value) => setFilterCategory(value || 'all')}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        <Grid>
          {filteredProjects.map((project) => (
            <Grid.Col key={project.id} span={{ base: 12, md: 6, lg: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                <Stack justify="space-between" h="100%">
                  <div>
                    <Group justify="space-between" mb="xs">
                      <Badge
                        color={getStatusColor(project.status)}
                        variant="light"
                      >
                        {getStatusLabel(project.status)}
                      </Badge>
                      <Badge variant="outline">{project.category}</Badge>
                    </Group>

                    <Text fw={600} size="lg" mb="xs" lineClamp={2}>
                      {project.title}
                    </Text>

                    <Text size="sm" c="dimmed" mb="md" lineClamp={3}>
                      {project.description}
                    </Text>

                    <Stack gap="xs" mb="md">
                      <Group gap="xs">
                        <IconBuilding size={16} />
                        <Text size="sm">{project.institution}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconCalendar size={16} />
                        <Text size="sm">
                          Do: {new Date(project.deadline).toLocaleDateString('pl-PL')}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconStar size={16} />
                        <Rating value={project.averageRating} readOnly size="sm" />
                        <Text size="sm">({project.ratingsCount})</Text>
                      </Group>
                      <Group gap="xs">
                        <IconMessage size={16} />
                        <Text size="sm">{project.comments.length} komentarzy</Text>
                      </Group>
                <Group gap="xs">
                  <IconFileText size={16} />
                  <Text size="sm">{project.documentsCount} dokumentów</Text>
                </Group>
                {project.comments.length > 0 && (
                  <Group gap="xs">
                    <IconBrain size={16} />
                    <Text size="sm" c="blue">Analiza AI dostępna</Text>
                  </Group>
                )}
              </Stack>
            </div>                  <Button
                    variant="light"
                    fullWidth
                    leftSection={<IconEye size={16} />}
                    onClick={() => setSelectedProject(project)}
                  >
                    Zobacz szczegóły
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {filteredProjects.length === 0 && (
          <Paper p="xl" ta="center">
            <Text c="dimmed" size="lg">
              Nie znaleziono projektów spełniających kryteria wyszukiwania.
            </Text>
          </Paper>
        )}
      </Stack>

      <Modal
        opened={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="xl"
        scrollAreaComponent={undefined}
      >
        {selectedProject && (
          <Tabs defaultValue="details">
            <Tabs.List>
              <Tabs.Tab value="details" leftSection={<IconFileText size={16} />}>
                Szczegóły
              </Tabs.Tab>
              <Tabs.Tab value="comments" leftSection={<IconMessage size={16} />}>
                Komentarze ({selectedProject.comments.length})
              </Tabs.Tab>
              <Tabs.Tab value="rating" leftSection={<IconStar size={16} />}>
                Oceny
              </Tabs.Tab>
              <Tabs.Tab value="ai-analysis" leftSection={<IconBrain size={16} />}>
                Analiza AI
              </Tabs.Tab>
              <Tabs.Tab value="document-summary" leftSection={<IconFileDescription size={16} />}>
                Streszczenie dokumentu AI
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="details" pt="md">
              <Stack gap="md">
                <Group>
                  <Badge color={getStatusColor(selectedProject.status)} variant="light">
                    {getStatusLabel(selectedProject.status)}
                  </Badge>
                  <Badge variant="outline">{selectedProject.category}</Badge>
                </Group>

                <Text>{selectedProject.description}</Text>

                <Grid>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={600}>Instytucja:</Text>
                    <Text size="sm">{selectedProject.institution}</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={600}>Termin:</Text>
                    <Text size="sm">{new Date(selectedProject.deadline).toLocaleDateString('pl-PL')}</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={600}>Data utworzenia:</Text>
                    <Text size="sm">{new Date(selectedProject.createdAt).toLocaleDateString('pl-PL')}</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={600}>Dokumenty:</Text>
                    <Group gap="xs">
                      <Text size="sm">{selectedProject.documentsCount} plików</Text>
                      <ActionIcon variant="subtle" size="sm">
                        <IconDownload size={14} />
                      </ActionIcon>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="comments" pt="md">
              <Comments
                comments={selectedProject.comments}
                onAddComment={(content, rating) => handleAddComment(selectedProject.id, content, rating)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="rating" pt="md">
              <ProjectRating
                averageRating={selectedProject.averageRating}
                ratingsCount={selectedProject.ratingsCount}
                onRate={(rating, review) => handleRateProject(selectedProject.id, rating, review)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="ai-analysis" pt="md">
              <AICommentsAnalysis
                comments={selectedProject.comments}
                projectId={selectedProject.id}
                projectTitle={selectedProject.title}
              />
            </Tabs.Panel>

            <Tabs.Panel value="document-summary" pt="md">
              <AISummary
                type="prekonsultacja"
                title={selectedProject.title}
                description={selectedProject.description}
                content=""
              />
            </Tabs.Panel>
          </Tabs>
        )}
      </Modal>
    </Container>
  );
}
