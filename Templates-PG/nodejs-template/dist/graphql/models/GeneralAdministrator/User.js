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
exports.UserConnection = exports.UserEdge = exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const DocumentType_1 = require("./DocumentType");
const Gender_1 = require("./Gender");
const Role_1 = require("./Role");
const School_1 = require("./School");
let User = class User {
};
exports.User = User;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'number', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "version", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "createdByUserId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "updatedByUserId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User, { nullable: true }),
    __metadata("design:type", User)
], User.prototype, "createdByUser", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User, { nullable: true }),
    __metadata("design:type", User)
], User.prototype, "updatedByUser", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Index)("index_username"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Gender_1.Gender, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)((_type) => Gender_1.Gender, { nullable: true }),
    __metadata("design:type", Gender_1.Gender)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Index)("index_genderId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "genderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DocumentType_1.DocumentType, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)((_type) => DocumentType_1.DocumentType, { nullable: true }),
    __metadata("design:type", DocumentType_1.DocumentType)
], User.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Index)("index_documentTypeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "documentTypeId", void 0);
__decorate([
    (0, typeorm_1.Index)("index_documentNumber"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "documentNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profilePhoto", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "signaturePhoto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_1.Role, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)(() => Role_1.Role, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Index)("index_roleId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolId"),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => School_1.School, { nullable: true }),
    __metadata("design:type", School_1.School)
], User.prototype, "school", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Index)("index_full", ["username", "genderId", "documentTypeId", "roleId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The User model' }),
    (0, typeorm_1.Entity)()
], User);
let UserEdge = class UserEdge extends (0, relaySpecs_1.EdgeType)('User', User) {
};
exports.UserEdge = UserEdge;
exports.UserEdge = UserEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserEdge);
let UserConnection = class UserConnection extends (0, relaySpecs_1.ConnectionType)('User', UserEdge) {
};
exports.UserConnection = UserConnection;
exports.UserConnection = UserConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserConnection);
