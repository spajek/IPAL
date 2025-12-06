import React from "react";
import Link from "next/link";
import { Container, Title, Button } from "@mantine/core";
import { fakeFetchActDetails } from "@/mocks/sejmMock";
import ActDetailsView from "./ActDetailsView";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function UstawaDetailsPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params);

  const act = await fakeFetchActDetails(id);

  if (!act) {
    return (
      <Container py="xl">
        <Title order={3} c="red">
          Nie znaleziono ustawy o identyfikatorze: {id}
        </Title>
        <Button component={Link} href="/ustawy" mt="md" variant="subtle">
          ← Wróć do listy
        </Button>
      </Container>
    );
  }

  return <ActDetailsView act={act} />;
}
