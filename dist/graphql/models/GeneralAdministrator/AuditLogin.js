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
exports.AuditLoginConnection = exports.AuditLoginEdge = exports.AuditLogin = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const User_1 = require("./User");
let AuditLogin = class AuditLogin extends IModelData_1.IModelData {
};
exports.AuditLogin = AuditLogin;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", User_1.User)
], AuditLogin.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Index)("index_userId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogin.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogin.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogin.prototype, "ip", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogin.prototype, "geo", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogin.prototype, "browser", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogin.prototype, "language", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogin.prototype, "ipware", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogin.prototype, "ipwarePublic", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], AuditLogin.prototype, "auth", void 0);
exports.AuditLogin = AuditLogin = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The AuditLogin model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], AuditLogin);
let AuditLoginEdge = class AuditLoginEdge extends (0, relaySpecs_1.EdgeType)('AuditLogin', AuditLogin) {
};
exports.AuditLoginEdge = AuditLoginEdge;
exports.AuditLoginEdge = AuditLoginEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AuditLoginEdge);
let AuditLoginConnection = class AuditLoginConnection extends (0, relaySpecs_1.ConnectionType)('AuditLogin', AuditLoginEdge) {
};
exports.AuditLoginConnection = AuditLoginConnection;
exports.AuditLoginConnection = AuditLoginConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AuditLoginConnection);
