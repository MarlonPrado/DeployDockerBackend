"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gateway_1 = require("@apollo/gateway");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const nax_ipware_1 = require("@fullerstack/nax-ipware");
const apollo_federation_upload_1 = __importDefault(require("@profusion/apollo-federation-upload"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_jwt_1 = require("express-jwt");
const fs = __importStar(require("fs"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const middleware_1 = require("graphql-voyager/middleware");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const config_1 = require("./config");
require("reflect-metadata");
const cluster = require('node:cluster');
const expressHealthApi = require('express-health-api');
const numCPUs = process_1.env.NODE_ENV === 'development' ? 1 : 1;
const jwt = require('jsonwebtoken');
var httpsOptions = {
    key: fs.readFileSync(path_1.default.join('ssl', 'vivecolegios', 'private.key')),
    cert: fs.readFileSync(path_1.default.join('ssl', 'vivecolegios', 'certificate.crt')),
    ca: fs.readFileSync(path_1.default.join('ssl', 'vivecolegios', 'ca_bundle.crt')),
    requestCert: false,
};
async function app() {
    try {
        const gateway = new gateway_1.ApolloGateway({
            supergraphSdl: new gateway_1.IntrospectAndCompose({
                subgraphs: [{ name: 'servers', url: 'http://localhost:4001/graphql' }],
            }),
            buildService({ url }) {
                return new apollo_federation_upload_1.default({
                    url,
                    willSendRequest({ request, context }) {
                        var _a, _b;
                        let user = null;
                        if (((_a = context === null || context === void 0 ? void 0 : context.token) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            user = jwt.decode((_b = context === null || context === void 0 ? void 0 : context.token) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', ''));
                        }
                        request.http.headers.set('user', user ? JSON.stringify(user) : null);
                        let requestdata = Object.assign(Object.assign({}, context), { user: user });
                        request.http.headers.set('requestdata', requestdata);
                    },
                });
            },
        });
        const configExpressStatusMonitor = {
            title: 'Express Status ViveColegios',
            theme: 'default.css',
            path: '/status',
            spans: [
                {
                    interval: 1,
                    retention: 60,
                },
                {
                    interval: 5,
                    retention: 60,
                },
                {
                    interval: 15,
                    retention: 60,
                },
            ],
            chartVisibility: {
                cpu: true,
                mem: true,
                load: true,
                eventLoop: true,
                heap: true,
                responseTime: true,
                rps: true,
                statusCodes: true,
            },
            healthChecks: [
                {
                    protocol: 'http',
                    host: 'localhost',
                    path: `/healthcheck-${config_1.SERVER_NAME_APP}`,
                    port: `${config_1.SERVER_PORT_APP}`,
                },
            ],
        };
        const ipware = new nax_ipware_1.Ipware();
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const httpsServer = https_1.default.createServer(httpsOptions, app);
        const server = new server_1.ApolloServer({
            gateway,
            includeStacktraceInErrorResponses: true,
            introspection: true,
            plugins: [
                process.env.NODE_ENV === 'production'
                    ? (0, default_1.ApolloServerPluginLandingPageProductionDefault)({ footer: false })
                    : (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ footer: false }),
                (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            ],
            formatError: (err) => {
                var _a, _b, _c;
                console.error('GraphQL Error', err);
                const errorReport = {
                    message: err.message,
                    locations: err.locations,
                    path: err.path,
                    stacktrace: ((_b = (_a = err.extensions) === null || _a === void 0 ? void 0 : _a.exception) === null || _b === void 0 ? void 0 : _b.stacktrace) || [],
                    code: (_c = err.extensions) === null || _c === void 0 ? void 0 : _c.code,
                };
                console.error('GraphQL Error', errorReport);
                if (errorReport.code == 'INTERNAL_SERVER_ERROR') {
                    return {
                        message: 'Oops! Something went wrong! :(',
                        code: errorReport.code,
                    };
                }
                return errorReport;
            },
        });
        await server.start();
        app.use(require('express-status-monitor')(configExpressStatusMonitor));
        app.use((0, morgan_1.default)('common'));
        app.use((0, cors_1.default)());
        app.use(expressHealthApi({ apiPath: '/health' }));
        app.use('/voyager', (0, middleware_1.express)({ endpointUrl: '/graphql' }));
        app.use((0, graphql_upload_minimal_1.graphqlUploadExpress)({ maxFileSize: 1000000000, maxFiles: 10 }));
        app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../public')));
        app.use(express_1.default.json());
        app.use((0, express_jwt_1.expressjwt)({
            secret: 'f1BtnWgD3VKY',
            algorithms: ['HS256'],
            credentialsRequired: false,
        }));
        app.use(function (req, res, next) {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        });
        app.use((0, express4_1.expressMiddleware)(server, {
            context: async ({ req, res }) => ({
                headers: req.headers,
                token: req.headers['authorization'],
                ip: JSON.stringify(req.ip),
                geo: geoip_lite_1.default.lookup((req === null || req === void 0 ? void 0 : req.ip) ? req === null || req === void 0 ? void 0 : req.ip : ''),
                browser: req.headers['user-agent'],
                language: req.headers['accept-language'],
                ipware: ipware.getClientIP(req),
                ipwarePublic: ipware.getClientIP(req, { publicOnly: true }),
            }),
        }));
        await new Promise((resolve) => {
            httpServer.listen({ port: config_1.GATEWAY_HTTP_PORT_APP }, () => {
                console.log(`🚀 Server ready and listening at ==> http://vivecolegios.nortedesantander.gov.co:${config_1.GATEWAY_HTTP_PORT_APP}`);
                console.log(`Worker ${process.pid} started`);
            });
            httpsServer.listen({ port: config_1.GATEWAY_HTTPS_PORT_APP }, () => {
                console.log(`🚀 Server ready and listening at ==> https://vivecolegios.nortedesantander.gov.co:${config_1.GATEWAY_HTTPS_PORT_APP}`);
                console.log(`Worker ${process.pid} started`);
            });
        });
    }
    catch (err) {
        console.error(err);
    }
}
if (cluster.isMaster) {
    console.log(`Master Gateway ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    app();
}
