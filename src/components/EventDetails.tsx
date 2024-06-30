import { useEventDetails } from "@/hooks/useEventDetails";
import { EventObject } from "@/interfaces/Event.interface";
import { Dialog, DialogPanel } from "@headlessui/react";

export const EventDetails = ({
  event,
  onClose,
}: {
  event: EventObject;
  onClose: () => void;
}) => {
  const { structuredEventData } = useEventDetails(event);

  return (
    <Dialog
      open={!!event}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-5/6 max-w-4xl max-h-64 overflow-auto rounded-xl border border-detailsBorder bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <section className="grid grid-cols-3 gap-4 justify-between">
              {structuredEventData.map((data) => (
                <div key={data.title} className="">
                  {!!data.fields.length && (
                    <>
                      <h2 className="text-detailsHeader uppercase mb-4">
                        {data.title}
                      </h2>
                      <div className="flex flex-col">
                        {data.fields.map((field) => (
                          <div key={field.name} className="flex py-2">
                            <p className="text-detailsLabel capitalize w-1/4 mr-2">
                              {field.name}
                            </p>
                            <p className="text-detailsText w-3/4 pl-6">{field.value}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </section>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
