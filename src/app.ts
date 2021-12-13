import fastify, { FastifyInstance } from "fastify";
import { router } from "./routes";

const app: FastifyInstance = fastify()

router(app)
// import Router from "./routes";
// Router(app)
// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export = app; 
