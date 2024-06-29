import { EventObject } from "@/interfaces/Event.interface";
import { EventFilters } from "@/interfaces/EventFilters.interface";
import { loadEvents } from "@/services/events";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

export function useEvents() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<EventFilters>({});
  const [isLive, setIsLive] = useState(false);

  const getQueryFilters = () => {
    return Object.entries(filters)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };
  const getKey = (pageIndex: number, previousPageData: EventObject[]) => {
    if (previousPageData && !previousPageData.length) return null;
    pageIndex++;
    return `/api/events?page=${pageIndex}&search=${search}&${getQueryFilters()}`;
  };
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
  }, [isLive, data, setSize, mutate]);

  const searchEvents = (val: string) => {
    setSearch(val);
    setSize(1);
  };

  const filterEvents = (filters: EventFilters) => {
    setFilters(filters);
    setSize(1);
  };

  const loadMore = () => {
    setSize(size + 1);
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
  };
}
