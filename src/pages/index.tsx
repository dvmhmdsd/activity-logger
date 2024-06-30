import { Controls } from "@/components/Controls";
import { Events } from "@/components/Events";
import { LoadMore } from "@/components/LoadMore";
import { useEvents } from "@/hooks/useEvents";
import { EventObject } from "@/interfaces/Event.interface";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    events,
    isLoading,
    filterEvents,
    searchEvents,
    loadMore,
    toggleLiveUpdates,
    isLive,
    exportToCSV,
  } = useEvents();

  const exportToCsv = () => {
    exportToCSV(events!);
  };

  const getLiveUpdates = () => {
    toggleLiveUpdates();
  };

  const handleLoadMoreClick = () => {
    loadMore();
  };

  return (
    <main
      className={`container mx-auto rounded-2xl rounded-b-2xl h-12 overflow-y-auto relative  ${inter.className}`}
    >
      <Controls
        isLiveEnabled={isLive}
        filterEvents={filterEvents}
        searchEvents={searchEvents}
        exportToCsv={exportToCsv}
        getLiveUpdates={getLiveUpdates}
      />
      <Events events={events ?? []} isLoading={isLoading} />
      <LoadMore loadMore={handleLoadMoreClick} />
    </main>
  );
}
