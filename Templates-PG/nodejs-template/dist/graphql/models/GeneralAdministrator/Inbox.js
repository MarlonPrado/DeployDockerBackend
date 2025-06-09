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
exports.InboxConnection = exports.InboxEdge = exports.Inbox = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const User_1 = require("./User");
let Inbox = class Inbox extends IModelData_1.IModelData {
};
exports.Inbox = Inbox;
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Inbox.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Inbox.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Inbox.prototype, "from", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Inbox.prototype, "fromId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Inbox.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Inbox.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Inbox.prototype, "dateSend", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Inbox.prototype, "dateRead", void 0);
exports.Inbox = Inbox = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The Inbox model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], Inbox);
let InboxEdge = class InboxEdge extends (0, relaySpecs_1.EdgeType)('Inbox', Inbox) {
};
exports.InboxEdge = InboxEdge;
exports.InboxEdge = InboxEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], InboxEdge);
let InboxConnection = class InboxConnection extends (0, relaySpecs_1.ConnectionType)('Inbox', InboxEdge) {
};
exports.InboxConnection = InboxConnection;
exports.InboxConnection = InboxConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], InboxConnection);
