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
exports.SpecialtyConnection = exports.SpecialtyEdge = exports.Specialty = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Modality_1 = require("./Modality");
const SchoolYear_1 = require("./SchoolYear");
let Specialty = class Specialty extends IModelSchoolData_1.IModelSchoolData {
};
exports.Specialty = Specialty;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Specialty.prototype, "code", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Specialty.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)("index_modality"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Specialty.prototype, "modalityId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Modality_1.Modality)
], Specialty.prototype, "modality", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Specialty.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], Specialty.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Specialty.prototype, "entityBaseId", void 0);
exports.Specialty = Specialty = __decorate([
    (0, typeorm_1.Index)("index_full", ["modalityId", "schoolId", "schoolYearId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The Specialty model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], Specialty);
let SpecialtyEdge = class SpecialtyEdge extends (0, relaySpecs_1.EdgeType)('Specialty', Specialty) {
};
exports.SpecialtyEdge = SpecialtyEdge;
exports.SpecialtyEdge = SpecialtyEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], SpecialtyEdge);
let SpecialtyConnection = class SpecialtyConnection extends (0, relaySpecs_1.ConnectionType)('Specialty', SpecialtyEdge) {
};
exports.SpecialtyConnection = SpecialtyConnection;
exports.SpecialtyConnection = SpecialtyConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], SpecialtyConnection);
