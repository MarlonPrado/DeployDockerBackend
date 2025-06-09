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
exports.SchoolAdministratorConnection = exports.SchoolAdministratorEdge = exports.SchoolAdministrator = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Campus_1 = require("./Campus");
const School_1 = require("./School");
const User_1 = require("./User");
let SchoolAdministrator = class SchoolAdministrator extends IModelData_1.IModelData {
};
exports.SchoolAdministrator = SchoolAdministrator;
__decorate([
    (0, typeorm_1.Index)("index_schoolId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], SchoolAdministrator.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [School_1.School], { nullable: true }),
    __metadata("design:type", Array)
], SchoolAdministrator.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Index)("index_campusId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], SchoolAdministrator.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Campus_1.Campus], { nullable: true }),
    __metadata("design:type", Array)
], SchoolAdministrator.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Index)("index_userId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SchoolAdministrator.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", User_1.User)
], SchoolAdministrator.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], SchoolAdministrator.prototype, "support", void 0);
exports.SchoolAdministrator = SchoolAdministrator = __decorate([
    (0, typeorm_1.Index)("index_full_school", ["schoolId", "userId"]),
    (0, typeorm_1.Index)("index_full_campus", ["campusId", "userId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The SchoolAdministrator model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], SchoolAdministrator);
let SchoolAdministratorEdge = class SchoolAdministratorEdge extends (0, relaySpecs_1.EdgeType)('SchoolAdministrator', SchoolAdministrator) {
};
exports.SchoolAdministratorEdge = SchoolAdministratorEdge;
exports.SchoolAdministratorEdge = SchoolAdministratorEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], SchoolAdministratorEdge);
let SchoolAdministratorConnection = class SchoolAdministratorConnection extends (0, relaySpecs_1.ConnectionType)('SchoolAdministrator', SchoolAdministratorEdge) {
};
exports.SchoolAdministratorConnection = SchoolAdministratorConnection;
exports.SchoolAdministratorConnection = SchoolAdministratorConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], SchoolAdministratorConnection);
