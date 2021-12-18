import fastify, { FastifyInstance } from "fastify";
import { router } from "./routes";

const app: FastifyInstance = fastify()

router(app)

export = app; 
