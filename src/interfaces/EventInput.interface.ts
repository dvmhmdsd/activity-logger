import { Prisma } from "@prisma/client";

export interface EventInput {
  id: string;
  object: string;
  actor_id: string;
  actor_name: string;
  group: string;
  action: Action;
  target_id: string;
  target_name: string;
  location: string;
  occurred_at: string;
  metadata: typeof Prisma.JsonNull;
}

interface Action {
  id: string;
  name: string;
  object: string;
}
