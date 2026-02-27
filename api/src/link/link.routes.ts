import * as linkController from "./link.controllers";

import { FastifyInstance } from "fastify";

export default async function linkRoutes(app: FastifyInstance) {
    app.addHook("preHandler", app.requireAuth());
    app.get("/all", linkController.listLinks);
    app.get("/:id", linkController.retrieveLink);
    app.patch("/:id", linkController.updateLink);
    app.delete("contact/:id", linkController.destroyContactLink);
}