import { NextApiRequest, NextApiResponse } from "next";
import EventsDataAccess from "../_data-access/events";

const accessTokens = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vaGFtaWQgU2FhZCIsImlhdCI6MTYyMzkwMzMwMH0.F3dWfj2vQWUfyfVObAqzWi3TL7twGhU8N7XaMhF9UeE",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhbGVzIFJvYmVydCIsImlhdCI6MTYyMzkwMzMwMH0.LtjQ3FyF97UxH5J51Bp-2X2Yn3Zn1Cg0WUM0jDcWOBk",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vZHVsZSBTYWxleSIsImlhdCI6MTYyMzkwMzMwMH0.8ZtPjV3zFwp8lMm-_m6j4KtYw1oJ0dn4xR7qzbyciVQ",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmkgU2FhZCIsImlhdCI6MTYyMzkwMzMwMH0.PT6cQp0eRdZiOFu2i2HrEYIOg4n-Ks8JdKlmTzW_jfI",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlJlcXVlc3QgU2FsZSIsImlhdCI6MTYyMzkwMzMwMH0.YhYzXZjL3BdVZP1osjVhY7v5Vd8mZv9QgXw3RY5kE6E",
];

const dataAccess = new EventsDataAccess();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.headers.connector === "3rd party") {
    const token = req.headers.authorization?.split(" ")[1];
    if (!accessTokens.includes(token as string)) {
      return res.status(401).json({ message: "Invalid access token" });
    }
  }

  if (req.method === "POST") {
    const { event, error } = await dataAccess.create({ data: req.body });
    if (error) {
      return res.status(400).json({ message: error });
    }

    return res.status(201).json(event);
  }

  if (req.method === "GET" && req.query.lastCreatedAt) {
    const events = await dataAccess.pollingForNewEvents(
      req.query.lastCreatedAt.toString()
    );
    return res.status(200).json(events);
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
