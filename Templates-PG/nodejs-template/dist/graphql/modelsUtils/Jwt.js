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
exports.Jwt = void 0;
const type_graphql_1 = require("type-graphql");
const Teacher_1 = require("../models/CampusAdministrator/Teacher");
const AuditLogin_1 = require("../models/GeneralAdministrator/AuditLogin");
const Campus_1 = require("../models/GeneralAdministrator/Campus");
const Menu_1 = require("../models/GeneralAdministrator/Menu");
const Role_1 = require("../models/GeneralAdministrator/Role");
const School_1 = require("../models/GeneralAdministrator/School");
const Student_1 = require("../models/GeneralAdministrator/Student");
let Jwt = class Jwt {
};
exports.Jwt = Jwt;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Jwt.prototype, "jwt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Jwt.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Jwt.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Jwt.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Jwt.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Jwt.prototype, "profilePhoto", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [School_1.School], { nullable: true }),
    __metadata("design:type", Array)
], Jwt.prototype, "schools", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Campus_1.Campus], { nullable: true }),
    __metadata("design:type", Array)
], Jwt.prototype, "campus", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Role_1.Role)
], Jwt.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Menu_1.Menu], { nullable: true }),
    __metadata("design:type", Array)
], Jwt.prototype, "roleMenus", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], Jwt.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Teacher_1.Teacher)
], Jwt.prototype, "teacher", void 0);
__decorate([
    (0, type_graphql_1.Field)((_type) => [Student_1.Student], { nullable: true }),
    __metadata("design:type", Array)
], Jwt.prototype, "students", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AuditLogin_1.AuditLogin)
], Jwt.prototype, "lastLogin", void 0);
exports.Jwt = Jwt = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The User model' })
], Jwt);
