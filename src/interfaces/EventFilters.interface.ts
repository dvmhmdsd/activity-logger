import { Prisma } from "@prisma/client";

export interface EventFilters {
  page?: number;
  limit?: number;
  search?: string;
  actor_id?: string;
  target_id?: string;
  action_id?: string;
  name?: string;
  OR?: Prisma.EventWhereInput[];
}
