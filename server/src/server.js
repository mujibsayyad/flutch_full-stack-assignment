import "dotenv/config";
import http from "http";

import app from "./app.js";
import connectToDB from "./lib/mongodb.js";

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectToDB();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
})();
