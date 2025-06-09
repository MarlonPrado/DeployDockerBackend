"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAccessMiddleware = void 0;
const typedi_1 = require("typedi");
let LogAccessMiddleware = class LogAccessMiddleware {
    constructor() { }
    async use({ context, info }, next) {
        var _a, _b, _c;
        console.log(`Logging access: ${(_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id} - ${(_c = context === null || context === void 0 ? void 0 : context.user) === null || _c === void 0 ? void 0 : _c.sub} -> ${info.parentType.name}.${info.fieldName}`);
        return next();
    }
};
exports.LogAccessMiddleware = LogAccessMiddleware;
exports.LogAccessMiddleware = LogAccessMiddleware = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], LogAccessMiddleware);
