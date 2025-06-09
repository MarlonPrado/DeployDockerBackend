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
exports.AcademicAsignatureCoursePeriodValuationConnection = exports.AcademicAsignatureCoursePeriodValuationEdge = exports.AcademicAsignatureCoursePeriodValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ValuationType_1 = require("../../enums/ValuationType");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
let AcademicAsignatureCoursePeriodValuation = class AcademicAsignatureCoursePeriodValuation extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicAsignatureCoursePeriodValuation = AcademicAsignatureCoursePeriodValuation;
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodValuation.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], AcademicAsignatureCoursePeriodValuation.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodValuation.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], AcademicAsignatureCoursePeriodValuation.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], AcademicAsignatureCoursePeriodValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAsignatureCoursePeriodValuation.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], AcademicAsignatureCoursePeriodValuation.prototype, "performanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ValuationType_1.ValuationType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodValuation.prototype, "valuationType", void 0);
exports.AcademicAsignatureCoursePeriodValuation = AcademicAsignatureCoursePeriodValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAsignatureCourseId", "academicPeriodId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicAsignatureCoursePeriodValuation model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicAsignatureCoursePeriodValuation);
let AcademicAsignatureCoursePeriodValuationEdge = class AcademicAsignatureCoursePeriodValuationEdge extends (0, relaySpecs_1.EdgeType)('AcademicAsignatureCoursePeriodValuation', AcademicAsignatureCoursePeriodValuation) {
};
exports.AcademicAsignatureCoursePeriodValuationEdge = AcademicAsignatureCoursePeriodValuationEdge;
exports.AcademicAsignatureCoursePeriodValuationEdge = AcademicAsignatureCoursePeriodValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureCoursePeriodValuationEdge);
let AcademicAsignatureCoursePeriodValuationConnection = class AcademicAsignatureCoursePeriodValuationConnection extends (0, relaySpecs_1.ConnectionType)('AcademicAsignatureCoursePeriodValuation', AcademicAsignatureCoursePeriodValuationEdge) {
};
exports.AcademicAsignatureCoursePeriodValuationConnection = AcademicAsignatureCoursePeriodValuationConnection;
exports.AcademicAsignatureCoursePeriodValuationConnection = AcademicAsignatureCoursePeriodValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureCoursePeriodValuationConnection);
