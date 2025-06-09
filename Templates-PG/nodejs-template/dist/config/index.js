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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_NAME_APP = exports.GATEWAY_HTTPS_PORT_APP = exports.GATEWAY_HTTP_PORT_APP = exports.SERVER_PORT_APP = exports.adminApiKeyToken = exports.publicApiKeyToke = exports.authJwtSecret = exports.defaultUserPassword = exports.defaultAdminPassword = exports.dbPort = exports.dbName = exports.dbHost = exports.dbPassword = exports.dbUser = exports.cors = exports.port = exports.dev = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case 'test':
        path = `${__dirname}/../../.env`;
        break;
    case 'production':
        path = `${__dirname}/../../.env`;
        break;
    default:
        path = `${__dirname}/../../.env`;
}
dotenv.config({ path: path });
exports.dev = process.env.NODE_ENV !== 'production';
exports.port = process.env.PORT || 4000;
exports.cors = process.env.CORS;
exports.dbUser = process.env.DB_USER || 'db_user_vivecolegios';
exports.dbPassword = process.env.DB_PASSWORD || 'db_user_vivecolegios2021';
exports.dbHost = process.env.DB_HOST || 'cluster0.lsyav.mongodb.net';
exports.dbName = process.env.DB_NAME || 'app_db_vivecolegios';
exports.dbPort = 27017;
exports.defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
exports.defaultUserPassword = process.env.DEFAULT_USER_PASSWORD;
exports.authJwtSecret = process.env.AUTH_JWT_SECRET;
exports.publicApiKeyToke = process.env.PUBLIC_API_KEY_TOKEN;
exports.adminApiKeyToken = process.env.ADMIN_API_KEY_TOKEN;
exports.SERVER_PORT_APP = 4001;
exports.GATEWAY_HTTP_PORT_APP = 4000;
exports.GATEWAY_HTTPS_PORT_APP = 4100;
exports.SERVER_NAME_APP = 'Vive Colegios 3.0';
