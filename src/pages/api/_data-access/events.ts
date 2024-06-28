import { EventFilters } from "@/interfaces/EventFilters.interface";
import { EventInput } from "@/interfaces/EventInput.interface";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { EventValidator } from "../_validators/event.validator";
import { EventObject } from "@/interfaces/Event.interface";

export default class EventsDataAccess {
  private prisma: PrismaClient;
  private validator: EventValidator;

  constructor() {
    this.prisma = new PrismaClient();
    this.validator = new EventValidator();
  }

  async pollingForNewEvents(lastCreatedAt: string) {
    return await this.prisma.event.findMany({
      where: { occurred_at: { gt: lastCreatedAt } },
      orderBy: { occurred_at: "desc" },
    });
  }

  async create(body: NextApiRequest["body"]): Promise<{
    event?: EventObject | null;
    error?: string | null;
  }> {
    try {
      this.validator.create(body.data);

      const event = this.restructureEvent(body.data);
      const createdEvent = await this.prisma.event.create({ data: event });

      return { event: createdEvent, error: null };
    } catch (error: any) {
      console.log(error);
      return { event: null, error: error.message };
    }
  }

  private restructureEvent(event: EventInput): Prisma.EventCreateInput {
    const newEvent = {
      ...event,
      action_id: event.action.id,
      action_name: event.action.name,
      action_object: event.action.object,
      action: undefined,
    };

    delete newEvent.action;

    return newEvent;
  }

  async findMany({
    page = 1,
    limit = 10,
    search,
    actor_id,
    target_id,
    action_id,
    name,
  }: EventFilters) {
    const filters = this.buildFilters({
      actor_id,
      target_id,
      action_id,
      name,
      search,
    });
    return this.prisma.event.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: +limit,
      orderBy: { occurred_at: "desc" },
    });
  }

  private buildFilters({
    actor_id,
    target_id,
    action_id,
    name,
    search,
  }: EventFilters) {
    const filters: EventFilters = {};
    if (actor_id) filters.actor_id = actor_id;
    if (target_id) filters.target_id = target_id;
    if (action_id) filters.action_id = action_id;
    if (name)
      filters.OR = [
        { actor_name: { contains: name } },
        { action_name: { contains: name } },
        { target_name: { contains: name } },
      ];
    if (search)
      filters.OR = [
        { actor_name: { contains: search } },
        { action_name: { contains: search } },
        { target_name: { contains: search } },
      ];
    return filters;
  }
}
