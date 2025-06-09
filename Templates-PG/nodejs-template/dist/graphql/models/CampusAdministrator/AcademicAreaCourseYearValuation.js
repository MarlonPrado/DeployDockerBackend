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
exports.AcademicAreaCourseYearValuationConnection = exports.AcademicAreaCourseYearValuationEdge = exports.AcademicAreaCourseYearValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ValuationType_1 = require("../../enums/ValuationType");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicArea_1 = require("../SchoolAdministrator/AcademicArea");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
let AcademicAreaCourseYearValuation = class AcademicAreaCourseYearValuation extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicAreaCourseYearValuation = AcademicAreaCourseYearValuation;
__decorate([
    (0, typeorm_1.Index)("index_academicAreaId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCourseYearValuation.prototype, "academicAreaId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicArea_1.AcademicArea)
], AcademicAreaCourseYearValuation.prototype, "academicArea", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCourseYearValuation.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicAreaCourseYearValuation.prototype, "schoolYear", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCourseYearValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], AcademicAreaCourseYearValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAreaCourseYearValuation.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCourseYearValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], AcademicAreaCourseYearValuation.prototype, "performanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ValuationType_1.ValuationType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCourseYearValuation.prototype, "valuationType", void 0);
exports.AcademicAreaCourseYearValuation = AcademicAreaCourseYearValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAreaId", "schoolYearId", "studentId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicAreaCourseYearValuation model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicAreaCourseYearValuation);
let AcademicAreaCourseYearValuationEdge = class AcademicAreaCourseYearValuationEdge extends (0, relaySpecs_1.EdgeType)('AcademicAreaCourseYearValuation', AcademicAreaCourseYearValuation) {
};
exports.AcademicAreaCourseYearValuationEdge = AcademicAreaCourseYearValuationEdge;
exports.AcademicAreaCourseYearValuationEdge = AcademicAreaCourseYearValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAreaCourseYearValuationEdge);
let AcademicAreaCourseYearValuationConnection = class AcademicAreaCourseYearValuationConnection extends (0, relaySpecs_1.ConnectionType)('AcademicAreaCourseYearValuation', AcademicAreaCourseYearValuationEdge) {
};
exports.AcademicAreaCourseYearValuationConnection = AcademicAreaCourseYearValuationConnection;
exports.AcademicAreaCourseYearValuationConnection = AcademicAreaCourseYearValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAreaCourseYearValuationConnection);
