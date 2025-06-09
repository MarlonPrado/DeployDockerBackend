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
exports.CampusConnection = exports.CampusEdge = exports.Campus = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const School_1 = require("./School");
let Campus = class Campus extends IModelData_1.IModelData {
};
exports.Campus = Campus;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "daneCodeCampus", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "consecutive", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Campus.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", School_1.School)
], Campus.prototype, "school", void 0);
exports.Campus = Campus = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The Campus model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], Campus);
let CampusEdge = class CampusEdge extends (0, relaySpecs_1.EdgeType)('Campus', Campus) {
};
exports.CampusEdge = CampusEdge;
exports.CampusEdge = CampusEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], CampusEdge);
let CampusConnection = class CampusConnection extends (0, relaySpecs_1.ConnectionType)('Campus', CampusEdge) {
};
exports.CampusConnection = CampusConnection;
exports.CampusConnection = CampusConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], CampusConnection);
