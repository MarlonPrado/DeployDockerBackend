"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveTimeMiddleware = void 0;
const ResolveTimeMiddleware = async ({ info }, next) => {
    const start = Date.now();
    await next();
    const resolveTime = Date.now() - start;
    console.log(`Resolve Time: ${info.parentType.name}.${info.fieldName} [${resolveTime} ms]`);
};
exports.ResolveTimeMiddleware = ResolveTimeMiddleware;
