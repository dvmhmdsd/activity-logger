import { EventObject } from "@/interfaces/Event.interface";
import { Prisma } from "@prisma/client";

export function useEventDetails(event: EventObject) {
  if (!event) return { structuredEventData: [] };
  const getMetadataFields = (metadata: Prisma.JsonValue | null) => {
    if (!metadata) return [];
    return Object.entries(metadata).map(([key, value]) => ({
      name: key,
      value,
    }));
  };

  const eventData = [
    {
      title: "actor",
      fields: [
        { name: "name", value: event.actor_name },
        { name: "id", value: event.actor_id },
      ],
    },
    {
      title: "action",
      fields: [
        { name: "name", value: event.action_name },
        { name: "object", value: event.action_object },
        { name: "id", value: event.action_id },
      ],
    },
    {
      title: "date",
      fields: [
        {
          name: "readable",
          value: new Intl.DateTimeFormat("en-us", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(event.occurred_at)),
        },
      ],
    },
    {
      title: "target",
      fields: [
        { name: "name", value: event.target_name },
        { name: "id", value: event.target_id },
      ],
    },
    {
      title: "other",
      fields: [
        { name: "group", value: event.group },
        { name: "object", value: event.object },
        { name: "location", value: event.location },
      ],
    },
    {
      title: "metadata",
      fields: [...getMetadataFields(event.metadata)],
    },
  ];

  return { structuredEventData: eventData };
}
