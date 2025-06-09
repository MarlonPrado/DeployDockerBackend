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
exports.PerformanceLevelConnection = exports.PerformanceLevelEdge = exports.PerformanceLevel = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const PerformanceLevelCategory_1 = require("../../enums/PerformanceLevelCategory");
const PerformanceLevelCategoryGrade_1 = require("../../enums/PerformanceLevelCategoryGrade");
const PerformanceLevelType_1 = require("../../enums/PerformanceLevelType");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Campus_1 = require("../GeneralAdministrator/Campus");
const GeneralPerformanceLevel_1 = require("../GeneralAdministrator/GeneralPerformanceLevel");
const AcademicGrade_1 = require("./AcademicGrade");
const SchoolYear_1 = require("./SchoolYear");
let PerformanceLevel = class PerformanceLevel extends IModelSchoolData_1.IModelSchoolData {
};
exports.PerformanceLevel = PerformanceLevel;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PerformanceLevel.prototype, "minimumScore", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PerformanceLevel.prototype, "topScore", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "abbreviation", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "colorHex", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], PerformanceLevel.prototype, "isFinal", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], PerformanceLevel.prototype, "isRecovery", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevelType_1.PerformanceLevelType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevelCategory_1.PerformanceLevelCategory, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "categoryGrade", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalPerformanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "generalPerformanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralPerformanceLevel_1.GeneralPerformanceLevel)
], PerformanceLevel.prototype, "generalPerformanceLevel", void 0);
__decorate([
    (0, typeorm_1.Index)("index_campusId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], PerformanceLevel.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Campus_1.Campus], { nullable: true }),
    __metadata("design:type", Array)
], PerformanceLevel.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradesId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], PerformanceLevel.prototype, "academicGradesId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [AcademicGrade_1.AcademicGrade], { nullable: true }),
    __metadata("design:type", Array)
], PerformanceLevel.prototype, "academicGrades", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], PerformanceLevel.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], PerformanceLevel.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PerformanceLevel.prototype, "entityBaseId", void 0);
exports.PerformanceLevel = PerformanceLevel = __decorate([
    (0, typeorm_1.Index)("index_full_campusId", ["generalPerformanceLevelId", "campusId", "schoolId", "schoolYearId"]),
    (0, typeorm_1.Index)("index_full_academicGradesId", ["generalPerformanceLevelId", "academicGradesId", "schoolId", "schoolYearId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The PerformanceLevel model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], PerformanceLevel);
let PerformanceLevelEdge = class PerformanceLevelEdge extends (0, relaySpecs_1.EdgeType)('PerformanceLevel', PerformanceLevel) {
};
exports.PerformanceLevelEdge = PerformanceLevelEdge;
exports.PerformanceLevelEdge = PerformanceLevelEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], PerformanceLevelEdge);
let PerformanceLevelConnection = class PerformanceLevelConnection extends (0, relaySpecs_1.ConnectionType)('PerformanceLevel', PerformanceLevelEdge) {
};
exports.PerformanceLevelConnection = PerformanceLevelConnection;
exports.PerformanceLevelConnection = PerformanceLevelConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], PerformanceLevelConnection);
