import { VercelRequest, VercelResponse } from "@vercel/node";
import * as rt from "runtypes";
import axios from "axios";

const telemetryEndpoint = "https://pet-bluegill-84.hasura.app/api/rest";

const RecordEventMessage = rt.Record({
  id: rt.String,
  sessionId: rt.Optional(rt.String),
  payload: rt.Dictionary(rt.Unknown),
});
type RecordEventMessage = rt.Static<typeof RecordEventMessage>;

const TelemetryRequest = rt.Union(
  rt.Record({
    method: rt.Literal("start-session"),
  }),
  rt.Record({
    method: rt.Literal("record-event"),
    data: RecordEventMessage,
  })
);
type TelemetryRequest = rt.Static<typeof TelemetryRequest>;

const makeTelemetryRequest = async (path: string, body: unknown) => {
  try {
    const { data } = await axios.post(telemetryEndpoint + path, body);
    return data;
  } catch (err) {
    console.error(`Error making telemetry request to ${path}`, err);
    throw err;
  }
};

const newSession = async (req: VercelRequest): Promise<string> => {
  const userAgent = req.headers["user-agent"];
  const ip = req.headers["x-real-ip"] ?? req.socket.remoteAddress;
  const country = req.headers["x-vercel-ip-country"];
  const regionCode = req.headers["x-vercel-ip-country-region"];
  const city = req.headers["x-vercel-ip-city"];

  const {
    insert_session_one: { id: sessionId },
  } = await makeTelemetryRequest("/sessions/anonymous", {
    type: "exo",
    userAgent,
    country,
    regionCode,
    city,
    ipPrefix: ip,
  });

  return sessionId;
};

const startSession = async (req: VercelRequest, res: VercelResponse) => {
  const sessionId = await newSession(req);
  res.status(200).json({ sessionId });
};

const recordEvent = async (
  req: VercelRequest,
  res: VercelResponse,
  data: RecordEventMessage
) => {
  let { id, payload, sessionId } = data;
  if (sessionId == null) {
    sessionId = await newSession(req);
  }

  await makeTelemetryRequest("/events", {
    sessionId,
    eventDefinitionId: id,
    value: JSON.stringify(payload),
  });
  res.status(200).send("");
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(406).send("");
    return;
  }

  let body: TelemetryRequest;
  try {
    body = TelemetryRequest.check(req.body);
  } catch (err: unknown) {
    res.status(400).send(err);
    return
  }

  switch (body.method) {
    case "record-event":
      return recordEvent(req, res, body.data);
    case "start-session":
      return startSession(req, res);
  }
}
