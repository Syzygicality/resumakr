import * as keyController from "./key.controllers";

import { FastifyInstance } from "fastify";

export default async function keyRoutes(app: FastifyInstance) {
    app.get("/status", keyController.retrieveKeyStatus);
    app.post("", keyController.createKey)
}