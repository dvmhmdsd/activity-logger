import { EventObject } from "@/interfaces/Event.interface";
import { EventFilters } from "@/interfaces/EventFilters.interface";
import { loadEvents } from "@/services/events";
import { useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { Parser } from "json2csv";
import { saveAs } from "file-saver";

export function useEvents() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<EventFilters>({});
  const [isLive, setIsLive] = useState(false);

  const getQueryFilters = useCallback(() => {
    return Object.entries(filters)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }, [filters]);

  const getKey = useCallback(
    (pageIndex: number, previousPageData: EventObject[]) => {
      if (previousPageData && !previousPageData.length) return null;
      pageIndex++;
      return `/api/events?page=${pageIndex}&search=${search}&${getQueryFilters()}`;
    },
    [search, getQueryFilters]
  );

  const { data, error, isLoading, size, setSize, isValidating, mutate } =
    useSWRInfinite<EventObject[]>(getKey, loadEvents, {
      revalidateFirstPage: false,
    });

  useEffect(() => {
    let interval: any;
    if (isLive) {
      interval = setInterval(async () => {
        const lastCreatedAt = data?.[0]?.[0]?.occurred_at || "";
        const res = await fetch(`/api/events?lastCreatedAt=${lastCreatedAt}`);
        const newEvents = await res.json();
        if (newEvents.length) {
          mutate();
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isLive, data, mutate]);

  const searchEvents = useCallback(
    (val: string) => {
      setSearch(val);
      setSize(1);
    },
    [setSize]
  );

  const filterEvents = useCallback(
    (filters: EventFilters) => {
      setFilters(filters);
      setSize(1);
    },
    [setSize]
  );

  const loadMore = useCallback(() => {
    setSize(size + 1);
  }, [size, setSize]);

  const exportToCSV = (events: EventObject[]) => {
    const fields = [
      "id",
      "actor_name",
      "action_name",
      "target_name",
      "location",
      "group",
      "object",
      "occurred_at",
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(events);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "events.csv");
  };

  return {
    events: data?.flat(),
    error,
    isLoading: isLoading || isValidating,
    loadMore,
    searchEvents,
    filterEvents,
    toggleLiveUpdates: () => setIsLive(!isLive),
    isLive,
    exportToCSV,
  };
}
