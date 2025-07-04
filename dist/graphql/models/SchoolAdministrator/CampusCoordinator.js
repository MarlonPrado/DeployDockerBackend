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
exports.CampusCoordinatorConnection = exports.CampusCoordinatorEdge = exports.CampusCoordinator = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const School_1 = require("../GeneralAdministrator/School");
const User_1 = require("../GeneralAdministrator/User");
const Campus_1 = require("./../GeneralAdministrator/Campus");
let CampusCoordinator = class CampusCoordinator extends IModelData_1.IModelData {
};
exports.CampusCoordinator = CampusCoordinator;
__decorate([
    (0, typeorm_1.Index)("index_schoolId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], CampusCoordinator.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [School_1.School], { nullable: true }),
    __metadata("design:type", Array)
], CampusCoordinator.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Index)("index_campusId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], CampusCoordinator.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Campus_1.Campus], { nullable: true }),
    __metadata("design:type", Array)
], CampusCoordinator.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Index)("index_userId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CampusCoordinator.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", User_1.User)
], CampusCoordinator.prototype, "user", void 0);
exports.CampusCoordinator = CampusCoordinator = __decorate([
    (0, typeorm_1.Index)("index_full_school", ["schoolId", "userId"]),
    (0, typeorm_1.Index)("index_full_campus", ["campusId", "userId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The CampusCoordinator model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], CampusCoordinator);
let CampusCoordinatorEdge = class CampusCoordinatorEdge extends (0, relaySpecs_1.EdgeType)('CampusCoordinator', CampusCoordinator) {
};
exports.CampusCoordinatorEdge = CampusCoordinatorEdge;
exports.CampusCoordinatorEdge = CampusCoordinatorEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], CampusCoordinatorEdge);
let CampusCoordinatorConnection = class CampusCoordinatorConnection extends (0, relaySpecs_1.ConnectionType)('CampusCoordinator', CampusCoordinatorEdge) {
};
exports.CampusCoordinatorConnection = CampusCoordinatorConnection;
exports.CampusCoordinatorConnection = CampusCoordinatorConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], CampusCoordinatorConnection);
