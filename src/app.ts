import fastify from "fastify";
import { router } from "./routes";

const app: any = fastify()

router(app)
// import Router from "./routes";
// Router(app)
// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export = app; 
