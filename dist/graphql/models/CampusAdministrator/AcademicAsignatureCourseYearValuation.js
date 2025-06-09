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
exports.AcademicAsignatureCourseYearValuationConnection = exports.AcademicAsignatureCourseYearValuationEdge = exports.AcademicAsignatureCourseYearValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ValuationType_1 = require("../../enums/ValuationType");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
let AcademicAsignatureCourseYearValuation = class AcademicAsignatureCourseYearValuation extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicAsignatureCourseYearValuation = AcademicAsignatureCourseYearValuation;
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourseYearValuation.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], AcademicAsignatureCourseYearValuation.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourseYearValuation.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicAsignatureCourseYearValuation.prototype, "schoolYear", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourseYearValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], AcademicAsignatureCourseYearValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAsignatureCourseYearValuation.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourseYearValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], AcademicAsignatureCourseYearValuation.prototype, "performanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ValuationType_1.ValuationType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourseYearValuation.prototype, "valuationType", void 0);
exports.AcademicAsignatureCourseYearValuation = AcademicAsignatureCourseYearValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAsignatureCourseId", "schoolYearId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicAsignatureCourseYearValuation model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicAsignatureCourseYearValuation);
let AcademicAsignatureCourseYearValuationEdge = class AcademicAsignatureCourseYearValuationEdge extends (0, relaySpecs_1.EdgeType)('AcademicAsignatureCourseYearValuation', AcademicAsignatureCourseYearValuation) {
};
exports.AcademicAsignatureCourseYearValuationEdge = AcademicAsignatureCourseYearValuationEdge;
exports.AcademicAsignatureCourseYearValuationEdge = AcademicAsignatureCourseYearValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureCourseYearValuationEdge);
let AcademicAsignatureCourseYearValuationConnection = class AcademicAsignatureCourseYearValuationConnection extends (0, relaySpecs_1.ConnectionType)('AcademicAsignatureCourseYearValuation', AcademicAsignatureCourseYearValuationEdge) {
};
exports.AcademicAsignatureCourseYearValuationConnection = AcademicAsignatureCourseYearValuationConnection;
exports.AcademicAsignatureCourseYearValuationConnection = AcademicAsignatureCourseYearValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureCourseYearValuationConnection);
