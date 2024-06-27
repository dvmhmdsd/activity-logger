import { NextApiRequest, NextApiResponse } from "next";
import EventsDataAccess from "../_data-access/events";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const dataAccess = new EventsDataAccess();

  if (req.method === "POST") {
    const { event, error } = await dataAccess.create({ data: req.body });
    if (error) {
      return res.status(400).json({ message: error });
    }

    return res.status(201).json(event);
  }

  if (req.method === "GET") {
    const {
      page = "1",
      limit = "10",
      search,
      actor_id,
      target_id,
      action_id,
      name,
    } = req.query;
    const events = await dataAccess.findMany({
      page: +page,
      limit: +limit,
      search: search?.toString(),
      actor_id: actor_id?.toString(),
      target_id: target_id?.toString(),
      action_id: action_id?.toString(),
      name: name?.toString(),
    });

    return res.status(200).json(events);
  }

  res.status(405).json({ message: "Method not allowed" });
};

export default handler;
