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
exports.EmailConnection = exports.EmailEdge = exports.Email = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const User_1 = require("./User");
let Email = class Email extends IModelData_1.IModelData {
};
exports.Email = Email;
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Email.prototype, "to", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Email.prototype, "toId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Email.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Email.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Email.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Email.prototype, "dateSend", void 0);
exports.Email = Email = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The Email model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], Email);
let EmailEdge = class EmailEdge extends (0, relaySpecs_1.EdgeType)('Email', Email) {
};
exports.EmailEdge = EmailEdge;
exports.EmailEdge = EmailEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], EmailEdge);
let EmailConnection = class EmailConnection extends (0, relaySpecs_1.ConnectionType)('Email', EmailEdge) {
};
exports.EmailConnection = EmailConnection;
exports.EmailConnection = EmailConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], EmailConnection);
