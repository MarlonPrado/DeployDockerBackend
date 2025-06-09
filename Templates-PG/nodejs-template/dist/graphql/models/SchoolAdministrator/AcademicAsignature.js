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
exports.AcademicAsignatureConnection = exports.AcademicAsignatureEdge = exports.AcademicAsignature = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralAcademicAsignature_1 = require("../GeneralAdministrator/GeneralAcademicAsignature");
const AcademicArea_1 = require("./AcademicArea");
const AcademicGrade_1 = require("./AcademicGrade");
const SchoolYear_1 = require("./SchoolYear");
let AcademicAsignature = class AcademicAsignature extends IModelSchoolData_1.IModelSchoolData {
};
exports.AcademicAsignature = AcademicAsignature;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignature.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignature.prototype, "abbreviation", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignature.prototype, "code", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAsignature.prototype, "minWeight", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAsignature.prototype, "maxWeight", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAreaId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignature.prototype, "academicAreaId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicArea_1.AcademicArea)
], AcademicAsignature.prototype, "academicArea", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradeId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], AcademicAsignature.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [AcademicGrade_1.AcademicGrade], { nullable: true }),
    __metadata("design:type", Array)
], AcademicAsignature.prototype, "academicGrade", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignature.prototype, "generalAcademicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicAsignature_1.GeneralAcademicAsignature)
], AcademicAsignature.prototype, "generalAcademicAsignature", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAsignature.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignature.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicAsignature.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignature.prototype, "entityBaseId", void 0);
exports.AcademicAsignature = AcademicAsignature = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAreaId", "academicGradeId", "generalAcademicAsignatureId", "schoolId", "schoolYearId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicAsignature model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], AcademicAsignature);
let AcademicAsignatureEdge = class AcademicAsignatureEdge extends (0, relaySpecs_1.EdgeType)('AcademicAsignature', AcademicAsignature) {
};
exports.AcademicAsignatureEdge = AcademicAsignatureEdge;
exports.AcademicAsignatureEdge = AcademicAsignatureEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureEdge);
let AcademicAsignatureConnection = class AcademicAsignatureConnection extends (0, relaySpecs_1.ConnectionType)('AcademicAsignature', AcademicAsignatureEdge) {
};
exports.AcademicAsignatureConnection = AcademicAsignatureConnection;
exports.AcademicAsignatureConnection = AcademicAsignatureConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureConnection);
