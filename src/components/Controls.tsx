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

export const Controls = () => {
  return (
    <section className="bg-gray py-7 px-5 pb-0 rounded-t-2xl flex w-full sticky top-0">
      <Field className="basis-5/6">
        <Input
          className={clsx(
            "block w-full rounded-s-lg border-inputBorder border p-3 bg-gray text-white placeholder-placeholder placeholder-opacity-90 text-sm h-11",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
          placeholder="Search name, target or action..."
        />
      </Field>
      <button>
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
              name="full_name"
              type="text"
              className="block w-full rounded-s-lg border-inputBorder border p-3"
              placeholder="Enter actor_id..."
            />
            <Input
              name="full_name"
              type="text"
              className="block w-full rounded-s-lg border-inputBorder border p-3"
              placeholder="Enter action_id..."
            />
            <Input
              name="full_name"
              type="text"
              className="block w-full rounded-s-lg border-inputBorder border p-3"
              placeholder="Enter name..."
            />

            <CloseButton className="bg-th text-white uppercase p-3 rounded-lg">
              Apply
            </CloseButton>
          </PopoverPanel>
        </Popover>
      </button>
      <button className="border border-inputBorder border-l-0 p-3 py-1.5 text-controlsBtn h-11 flex items-center justify-center gap-1 uppercase grow-0 hover:bg-inputBorder">
        <ExportIcon /> <p className="text-xs">Export</p>
      </button>
      <button className="border border-inputBorder border-l-0 p-3 py-1.5 text-controlsBtn h-11 flex items-center justify-center gap-1 rounded-e-lg uppercase grow-0 hover:bg-inputBorder">
        <LiveIcon active={false} /> <p className="text-xs">Live</p>
      </button>
    </section>
  );
};
