export interface Act {
  ELI: string;
  title: string;
  year: number;
  pos: number;
  status: string;
  type: string;
  publisher: string;
  displayAddress: string;
  announcementDate: string;
}

export interface LegislativeStage {
  stepNumber: number;
  name: string;
  date?: string;
  isCompleted: boolean;
}

export interface ActDetails extends Act {
  stages: LegislativeStage[];
}

export interface ApiResponse {
  totalCount: number;
  count: number;
  offset: number;
  items: Act[];
}

const STAGES_TEMPLATE: LegislativeStage[] = [
  { stepNumber: 1, name: "Zgłoszenia lobbingowe", isCompleted: true },
  { stepNumber: 2, name: "Uzgodnienia", date: "05-12-2025", isCompleted: true },
  {
    stepNumber: 3,
    name: "Konsultacje publiczne",
    date: "05-12-2025",
    isCompleted: true,
  },
  { stepNumber: 4, name: "Opiniowanie", date: "05-12-2025", isCompleted: true },
  {
    stepNumber: 5,
    name: "Komitet Rady Ministrów do Spraw Cyfryzacji",
    isCompleted: true,
  },
  {
    stepNumber: 6,
    name: "Komitet Społeczny Rady Ministrów",
    isCompleted: false,
  },
  {
    stepNumber: 7,
    name: "Komitet Ekonomiczny Rady Ministrów",
    isCompleted: false,
  },
  { stepNumber: 8, name: "Stały Komitet Rady Ministrów", isCompleted: false },
  { stepNumber: 9, name: "Komisja Prawnicza", isCompleted: false },
  { stepNumber: 10, name: "Notyfikacja", isCompleted: false },
  {
    stepNumber: 11,
    name: "Skierowanie projektu do podpisu ministra",
    isCompleted: false,
  },
  {
    stepNumber: 12,
    name: "Skierowanie aktu do ogłoszenia",
    isCompleted: false,
  },
];

const MOCK_ACTS_DB: Act[] = Array.from({ length: 100 }).map((_, index) => {
  const year = 2025;
  const pos = index + 1;
  const id = `${year}-${pos}`;

  return {
    ELI: id,
    title: `Ustawa z dnia 5 grudnia ${year} r. o zmianie ustawy o sztucznej inteligencji oraz niektórych innych ustaw (Mock #${pos})`,
    year: year,
    pos: pos,
    status: index % 4 === 0 ? "Obowiązujący" : "Oczekujący",
    type: "Ustawa",
    publisher: "DU",
    displayAddress: `Dz.U. ${year} poz. ${pos}`,
    announcementDate: "2025-12-05",
  };
});

export async function fakeFetchUstawy(
  publisher: string,
  year: string,
  page: number,
  limit: number
): Promise<ApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const filtered = MOCK_ACTS_DB.filter(
    (item) => item.publisher === publisher && item.year.toString() === year
  );

  const offset = (page - 1) * limit;
  const paginatedItems = filtered.slice(offset, offset + limit);

  return {
    totalCount: filtered.length,
    count: paginatedItems.length,
    offset: offset,
    items: paginatedItems,
  };
}

export async function fakeFetchActDetails(
  eliId: string
): Promise<ActDetails | null> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const act = MOCK_ACTS_DB.find((item) => item.ELI === eliId);
  if (!act) return null;

  const randomProgress = Math.floor(Math.random() * 12) + 1;

  const dynamicStages = STAGES_TEMPLATE.map((stage) => ({
    ...stage,
    isCompleted: stage.stepNumber <= randomProgress,
    date: stage.stepNumber <= randomProgress ? "05-12-2025" : undefined,
  }));

  return {
    ...act,
    stages: dynamicStages,
  };
}
