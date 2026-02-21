import { 
    linkListController, 
    linkRetrieveController, 
    linkUpdateController, 
    linkDestroyController 
} from "../controllers/link.controllers";

import { FastifyInstance } from "fastify";

export default async function linkRoutes(app: FastifyInstance) {
    app.addHook("preHandler", app.requireAuth());
    app.get("/all", linkListController);
    app.get("/:id", linkRetrieveController);
    app.patch("/:id", linkUpdateController);
    app.delete("/:id", linkDestroyController);
}