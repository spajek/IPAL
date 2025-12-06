"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import {
  Container,
  Title,
  Table,
  Pagination,
  Loader,
  Center,
  Badge,
  Text,
  Stack,
  Select,
  Group,
  Alert,
  LoadingOverlay,
  Box,
  Button,
} from "@mantine/core";
import { IconAlertCircle, IconArrowRight } from "@tabler/icons-react";
import { ApiResponse, fakeFetchUstawy } from "@/mocks/sejmMock";

function UstawyTableContent({
  publisher,
  year,
  page,
  limit,
  onPageChange,
  isPendingTransition,
}: {
  publisher: string;
  year: string;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  isPendingTransition: boolean;
}) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);

    fakeFetchUstawy(publisher, year, page, limit)
      .then((res) => {
        if (mounted) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          console.error(err);
          setError("Wystąpił błąd podczas pobierania danych.");
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [publisher, year, page, limit]);

  if (isLoading && !data) {
    return (
      <Center py={60}>
        <Stack align="center">
          <Loader size="lg" />
          <Text size="xs" c="dimmed">
            Pobieranie danych (Mock API)...
          </Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Błąd" color="red">
        {error}
      </Alert>
    );
  }

  const { items: ustawy = [], totalCount = 0 } = data || {};
  const totalPages = Math.ceil(totalCount / limit);

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("obowiązuj")) return "green";
    if (statusLower.includes("uchylon")) return "red";
    return "blue";
  };

  const rows = ustawy.map((ustawa) => (
    <Table.Tr key={ustawa.ELI}>
      <Table.Td>
        <Text size="sm" fw={500}>
          {ustawa.displayAddress}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" style={{ whiteSpace: "normal" }}>
          {ustawa.title}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(ustawa.status)} variant="light">
          {ustawa.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" style={{ whiteSpace: "nowrap" }}>
          {ustawa.announcementDate}
        </Text>
      </Table.Td>
      <Table.Td>
        <Button
          component={Link}
          href={`/ustawy/${ustawa.ELI}`}
          variant="light"
          size="xs"
          rightSection={<IconArrowRight size={14} />}
        >
          Szczegóły
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isPendingTransition || isLoading}
        zIndex={100}
        overlayProps={{ blur: 1 }}
      />

      <Text size="sm" c="dimmed" mb="sm">
        Znaleziono {totalCount} aktów prawnych • Strona {page} z {totalPages}
      </Text>

      <Table.ScrollContainer minWidth={800}>
        <Table
          striped
          highlightOnHover
          withTableBorder
          withRowBorders
          verticalSpacing="sm"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Pozycja</Table.Th>
              <Table.Th w={400}>Tytuł</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Data ogłoszenia</Table.Th>
              <Table.Th>Akcja</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Center py="xl">
                    <Text c="dimmed">Brak danych</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {totalPages > 1 && (
        <Center mt="md">
          <Pagination
            value={page}
            onChange={onPageChange}
            total={totalPages}
            siblings={1}
            disabled={isPendingTransition || isLoading}
          />
        </Center>
      )}
    </Box>
  );
}

export default function SejmUstawyPage() {
  const [publisher, setPublisher] = useState("DU");
  const [year, setYear] = useState("2025");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [isPending, startTransition] = useTransition();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );

  const handlePageChange = (val: number) => {
    startTransition(() => setPage(val));
  };

  const handleFilterChange = (setter: (val: string) => void, val: string) => {
    startTransition(() => {
      setter(val);
      setPage(1);
    });
  };

  return (
    <Container fluid py="xl">
      <Stack gap="lg">
        <Title order={1}>Ustawy RP (Mock Data)</Title>
        <Group>
          <Select
            label="Dziennik"
            value={publisher}
            onChange={(val) => handleFilterChange(setPublisher, val || "DU")}
            data={[
              { value: "DU", label: "Dziennik Ustaw (Dz.U.)" },
              { value: "MP", label: "Monitor Polski (M.P.)" },
            ]}
            w={250}
          />
          <Select
            label="Rok"
            value={year}
            onChange={(val) => handleFilterChange(setYear, val || "2025")}
            data={years}
            w={150}
          />
        </Group>

        <UstawyTableContent
          publisher={publisher}
          year={year}
          page={page}
          limit={limit}
          onPageChange={handlePageChange}
          isPendingTransition={isPending}
        />
      </Stack>
    </Container>
  );
}
