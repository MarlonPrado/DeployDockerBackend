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
exports.NotificationConnection = exports.NotificationEdge = exports.Notification = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const User_1 = require("./User");
let Notification = class Notification extends IModelData_1.IModelData {
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "dateSend", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Notification.prototype, "dateRead", void 0);
exports.Notification = Notification = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The Notification model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], Notification);
let NotificationEdge = class NotificationEdge extends (0, relaySpecs_1.EdgeType)('Notification', Notification) {
};
exports.NotificationEdge = NotificationEdge;
exports.NotificationEdge = NotificationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], NotificationEdge);
let NotificationConnection = class NotificationConnection extends (0, relaySpecs_1.ConnectionType)('Notification', NotificationEdge) {
};
exports.NotificationConnection = NotificationConnection;
exports.NotificationConnection = NotificationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], NotificationConnection);
