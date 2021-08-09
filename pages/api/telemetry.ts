const axios = require("axios");

const telemetryEndpoint = "https://pet-bluegill-84.hasura.app/api/rest";

const makeTelemetryRequest = async (path: string, body: unknown) => {
  try {
    const { data } = await axios.post(telemetryEndpoint + path, body);
    return data;
  } catch (err) {
    console.error(`Error making telemetry request to ${path}`, err);
    throw err;
  }
};

const newSession = async (req): Promise<string> => {
  const userAgent = req.headers["user-agent"];
  const ip = req.headers["x-real-ip"] ?? req.connection.remoteAddress;
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

const startSession = async (req, res) => {
  const sessionId = await newSession(req);
  res.status(200).json({ sessionId });
};

const recordEvent = async (req, res, data) => {
  if (data === undefined) {
    res.status(400).send('expected "data"');
    return;
  }

  let { id, payload, sessionId } = data;
  if (id === undefined || payload === undefined) {
    res.status(400).send('record-event expects "id" and "payload"');
    return;
  }

  if (sessionId == null) {
    sessionId = await newSession(req);
  }

  await makeTelemetryRequest('/events', {
    sessionId,
    eventDefinitionId: id,
    value: JSON.stringify(payload),
  })
  res.status(200).send();
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(406).send();
    return;
  }

  if (req.body === null || typeof req.body !== "object") {
    res.status(400).send("expected request body");
    return;
  }

  const { method, data } = req.body;
  if (method === undefined) {
    res.status(400).send('expected "method"');
    return;
  }

  switch (method) {
    case "record-event":
      return recordEvent(req, res, data);
    case "start-session":
      return startSession(req, res);
  }

  res.status(400).send();
}
