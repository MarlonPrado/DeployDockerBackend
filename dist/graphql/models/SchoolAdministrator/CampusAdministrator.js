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
exports.CampusAdministratorConnection = exports.CampusAdministratorEdge = exports.CampusAdministrator = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Campus_1 = require("../GeneralAdministrator/Campus");
const School_1 = require("../GeneralAdministrator/School");
const User_1 = require("../GeneralAdministrator/User");
let CampusAdministrator = class CampusAdministrator extends IModelData_1.IModelData {
};
exports.CampusAdministrator = CampusAdministrator;
__decorate([
    (0, typeorm_1.Index)("index_schoolId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], CampusAdministrator.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [School_1.School], { nullable: true }),
    __metadata("design:type", Array)
], CampusAdministrator.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Index)("index_campusId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], CampusAdministrator.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Campus_1.Campus], { nullable: true }),
    __metadata("design:type", Array)
], CampusAdministrator.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Index)("index_userId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CampusAdministrator.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", User_1.User)
], CampusAdministrator.prototype, "user", void 0);
exports.CampusAdministrator = CampusAdministrator = __decorate([
    (0, typeorm_1.Index)("index_full_school", ["schoolId", "userId"]),
    (0, typeorm_1.Index)("index_full_campus", ["campusId", "userId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The CampusAdministrator model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], CampusAdministrator);
let CampusAdministratorEdge = class CampusAdministratorEdge extends (0, relaySpecs_1.EdgeType)('CampusAdministrator', CampusAdministrator) {
};
exports.CampusAdministratorEdge = CampusAdministratorEdge;
exports.CampusAdministratorEdge = CampusAdministratorEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], CampusAdministratorEdge);
let CampusAdministratorConnection = class CampusAdministratorConnection extends (0, relaySpecs_1.ConnectionType)('CampusAdministrator', CampusAdministratorEdge) {
};
exports.CampusAdministratorConnection = CampusAdministratorConnection;
exports.CampusAdministratorConnection = CampusAdministratorConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], CampusAdministratorConnection);
