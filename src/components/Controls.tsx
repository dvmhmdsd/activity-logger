import {
  CloseButton,
  Field,
  Input,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { clsx } from "clsx";
import { ExportIcon, FilterIcon, LiveIcon } from "./icons";
import debounce from "debounce";
import { EventFilters } from "@/interfaces/EventFilters.interface";
import { ChangeEvent, useState } from "react";

export const Controls = ({
  searchEvents,
  filterEvents,
  getLiveUpdates,
  exportToCsv,
  isLiveEnabled,
}: {
  searchEvents: (val: string) => void;
  filterEvents: (filters: EventFilters) => void;
  getLiveUpdates: () => void;
  exportToCsv: () => void;
  isLiveEnabled: boolean;
}) => {
  const search = (e: ChangeEvent<HTMLInputElement>) =>
    searchEvents(e.target.value);
  const debouncedSearch = debounce(search, 500);
  const [filters, setFilters] = useState<EventFilters>({});

  const applyFilters = () => {
    filterEvents(filters);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-gray py-7 px-5 pb-0 rounded-t-2xl flex w-full sticky top-0">
      <Field className="basis-5/6">
        <Input
          className={clsx(
            "block w-full rounded-s-lg border-inputBorder border p-3 bg-gray placeholder-placeholder placeholder-opacity-90 text-sm h-11",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          onChange={debouncedSearch}
          placeholder="Search name, target or action..."
        />
      </Field>
      <Popover className="relative">
        <PopoverButton className="border border-inputBorder border-l-0 p-3 py-1.5 text-controlsBtn h-11 flex items-center justify-center gap-1 uppercase grow-0 hover:bg-inputBorder">
          <FilterIcon /> <p className="text-xs">Filter</p>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom"
          className="flex flex-col bg-white w-2/5 p-6 rounded-lg shadow-lg absolute top-14 right-0 z-10 gap-3"
        >
          <Input
            name="actor_id"
            type="text"
            className="block w-full rounded-s-lg border-inputBorder border p-3"
            placeholder="Enter actor_id..."
            onChange={handleFilterChange}
          />
          <Input
            name="action_id"
            type="text"
            className="block w-full rounded-s-lg border-inputBorder border p-3"
            placeholder="Enter action_id..."
            onChange={handleFilterChange}
          />
          <Input
            name="target_id"
            type="text"
            className="block w-full rounded-s-lg border-inputBorder border p-3"
            placeholder="Enter target_id..."
            onChange={handleFilterChange}
          />
          <Input
            name="name"
            type="text"
            className="block w-full rounded-s-lg border-inputBorder border p-3"
            placeholder="Enter name..."
            onChange={handleFilterChange}
          />

          <CloseButton
            className="bg-th text-white uppercase p-3 rounded-lg"
            onClick={applyFilters}
          >
            Apply
          </CloseButton>
        </PopoverPanel>
      </Popover>
      <button
        onClick={exportToCsv}
        className="border border-inputBorder border-l-0 p-3 py-1.5 text-controlsBtn h-11 flex items-center justify-center gap-1 uppercase grow-0 hover:bg-inputBorder"
      >
        <ExportIcon /> <p className="text-xs">Export</p>
      </button>
      <button
        onClick={getLiveUpdates}
        className="border border-inputBorder border-l-0 p-3 py-1.5 text-controlsBtn h-11 flex items-center justify-center gap-1 rounded-e-lg uppercase grow-0 hover:bg-inputBorder"
      >
        <LiveIcon active={isLiveEnabled} /> <p className="text-xs">Live</p>
      </button>
    </section>
  );
};
