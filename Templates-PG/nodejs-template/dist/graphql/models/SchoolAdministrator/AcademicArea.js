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
exports.AcademicAreaConnection = exports.AcademicAreaEdge = exports.AcademicArea = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralAcademicArea_1 = require("../GeneralAdministrator/GeneralAcademicArea");
const AcademicGrade_1 = require("./AcademicGrade");
const SchoolYear_1 = require("./SchoolYear");
let AcademicArea = class AcademicArea extends IModelSchoolData_1.IModelSchoolData {
};
exports.AcademicArea = AcademicArea;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicArea.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicArea.prototype, "abbreviation", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicAreaId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicArea.prototype, "generalAcademicAreaId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicArea_1.GeneralAcademicArea)
], AcademicArea.prototype, "generalAcademicArea", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradeId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], AcademicArea.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [AcademicGrade_1.AcademicGrade], { nullable: true }),
    __metadata("design:type", Array)
], AcademicArea.prototype, "academicGrade", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicArea.prototype, "order", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], AcademicArea.prototype, "isAverage", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicArea.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicArea.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicArea.prototype, "entityBaseId", void 0);
exports.AcademicArea = AcademicArea = __decorate([
    (0, typeorm_1.Index)("index_full", ["generalAcademicAreaId", "academicGradeId", "schoolId", "schoolYearId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicArea model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], AcademicArea);
let AcademicAreaEdge = class AcademicAreaEdge extends (0, relaySpecs_1.EdgeType)('AcademicArea', AcademicArea) {
};
exports.AcademicAreaEdge = AcademicAreaEdge;
exports.AcademicAreaEdge = AcademicAreaEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAreaEdge);
let AcademicAreaConnection = class AcademicAreaConnection extends (0, relaySpecs_1.ConnectionType)('AcademicArea', AcademicAreaEdge) {
};
exports.AcademicAreaConnection = AcademicAreaConnection;
exports.AcademicAreaConnection = AcademicAreaConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAreaConnection);
