import { EventObject } from "@/interfaces/Event.interface";
import { ForwardIcon } from "./icons";
import { useCallback, useState } from "react";
import { EventDetails } from "./EventDetails";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

export const Events = ({ events }: { events: EventObject[] }) => {
  const [activeEvent, setActiveEvent] = useState<EventObject | null>();
  const colorArr = ["first", "second", "third"];

  const closeDialog = useCallback(() => {
    setActiveEvent(null);
  }, []);

  const getRandomColor = () => {
    return colorArr[Math.floor(Math.random() * colorArr.length)];
  };

  return (
    <>
      <article>
        <header className="flex gap-7 bg-gray uppercase text-th font-semibold sticky top-[72px]">
          <p className="p-5 py-3 w-4/12">actor</p>
          <p className="p-5 py-3 w-4/12">action</p>
          <p className="p-5 py-3 w-3/12">date</p>
          <p className="p-5 w-1/12"></p>
        </header>
        <main className="border-x border-boxBorder h-3/4 w-[calc(100% - 2px)]">
          {events.length ? (
            events.map((event) => (
              <>
                <section
                  key={event.id}
                  className="flex cursor-pointer hover:bg-gray mt-[2px]"
                  onClick={() => {
                    setActiveEvent(event);
                  }}
                >
                  <p className="p-5 w-4/12 text-nowrap whitespace-nowrap text-ellipsis overflow-hidden">
                    <span
                      className={`uppercase mr-2 avatar-${getRandomColor()} rounded-[calc(50%)] w-6 h-6 p-1 text-xs text-center inline-block text-white`}
                    >
                      {event.action_name[0]}
                    </span>
                    {event.actor_name}
                  </p>
                  <p className="p-5 w-4/12 text-nowrap whitespace-nowrap text-ellipsis overflow-hidden">
                    {event.action_name}
                  </p>
                  <p className="p-5 w-3/12 text-nowrap whitespace-nowrap text-ellipsis overflow-hidden">
                    {new Date(event.occurred_at).toLocaleDateString()}
                  </p>
                  <p className="p-5 w-1/12 text-right flex justify-end">
                    <ForwardIcon />
                  </p>
                </section>
                <LoadingPlaceholder />
              </>
            ))
          ) : (
            <EmptyPlaceholder />
          )}
        </main>
      </article>
      {<EventDetails event={activeEvent!} onClose={closeDialog} />}
    </>
  );
};

const EmptyPlaceholder = () => (
  <section className="flex justify-center items-center h-full py-36 font-semibold text-xl text-controlsBtn">
    <p>No events</p>
  </section>
);
