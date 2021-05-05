// eslint-disable-next-line @typescript-eslint/no-var-requires
const responseTime = require('koa-response-time');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerUi = require('swagger-ui-koa');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const validator = require('node-input-validator');

import winston from 'winston';
import jwt from 'koa-jwt';

import overrideValidator from './middleware/validation';
import responseHandler from './middleware/responseHandler';
import errorHandler from './middleware/errorHandler';
import requestId from './middleware/requestId';
import logging from './middleware/logging';
import options from './middleware/options';

import { config } from './config';
// import { router } from './router';
import { unprotectedRouter } from './router/unprotectedRoutes';
import { protectedRouter } from './router/protectedRoutes';

import { logger } from './component/logger';

// import sentry from '../component/sentry';
// import { getLogLevelForStatus } from './lib/logger';

import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import cors from '@koa/cors';

import Koa from 'koa';

const app: Koa = new Koa();

// centralized error handling
// app.on('error', (err: Error, ctx: Koa.DefaultContext): void => {
//     sentry.captureException(err, {req: ctx.request, extra: ctx, level: getLogLevelForStatus(ctx.status)});
// });

// Validation middleware -> adds ctx.validate
// app.use(validator.koa());
// app.use(overrideValidator());

// Provides important security headers to make your app more secure
// app.use(helmet());

// Enable cors with default options
app.use(cors(config.cors));

// Enable bodyParser with default options
// app.use(bodyParser(config.bodyParser));
app.use(bodyParser());

// Adds an X-Request-Id response header with a unique request ID value
// app.use(requestId());

// Adds an X-Response-Time header with a query execution time value
// app.use(responseTime());

// Console debug logging
// app.use(logging());
// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

// handler
// app.use(responseHandler());
// app.use(errorHandler());

app.use(swaggerUi.serve);

// app.use(compress());
// app.use(options());

// routers
// app.use(router.routes()).use(router.allowedMethods());

// these routes are NOT protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
// do not protect swagger-json and swagger-html endpoints
app.use(jwt({ secret: config.jwtSecret }).unless({ path: [/^\/swagger-/] }));

// These routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

export default app;
