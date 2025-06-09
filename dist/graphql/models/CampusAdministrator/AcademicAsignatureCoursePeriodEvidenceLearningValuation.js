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
exports.AcademicAsignatureCoursePeriodEvidenceLearningValuationConnection = exports.AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge = exports.AcademicAsignatureCoursePeriodEvidenceLearningValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const EvidenceLearning_1 = require("../SchoolAdministrator/EvidenceLearning");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
let AcademicAsignatureCoursePeriodEvidenceLearningValuation = class AcademicAsignatureCoursePeriodEvidenceLearningValuation extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicAsignatureCoursePeriodEvidenceLearningValuation = AcademicAsignatureCoursePeriodEvidenceLearningValuation;
__decorate([
    (0, typeorm_1.Index)("index_evidenceLearningId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "evidenceLearningId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => EvidenceLearning_1.EvidenceLearning, { nullable: true }),
    __metadata("design:type", EvidenceLearning_1.EvidenceLearning)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "evidenceLearning", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], AcademicAsignatureCoursePeriodEvidenceLearningValuation.prototype, "performanceLevel", void 0);
exports.AcademicAsignatureCoursePeriodEvidenceLearningValuation = AcademicAsignatureCoursePeriodEvidenceLearningValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["evidenceLearningId", "academicAsignatureCourseId", "academicPeriodId", "studentId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicAsignatureCoursePeriodEvidenceLearningValuation model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicAsignatureCoursePeriodEvidenceLearningValuation);
let AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge = class AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge extends (0, relaySpecs_1.EdgeType)('AcademicAsignatureCoursePeriodEvidenceLearningValuation', AcademicAsignatureCoursePeriodEvidenceLearningValuation) {
};
exports.AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge = AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge;
exports.AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge = AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge);
let AcademicAsignatureCoursePeriodEvidenceLearningValuationConnection = class AcademicAsignatureCoursePeriodEvidenceLearningValuationConnection extends (0, relaySpecs_1.ConnectionType)('AcademicAsignatureCoursePeriodEvidenceLearningValuation', AcademicAsignatureCoursePeriodEvidenceLearningValuationEdge) {
};
exports.AcademicAsignatureCoursePeriodEvidenceLearningValuationConnection = AcademicAsignatureCoursePeriodEvidenceLearningValuationConnection;
exports.AcademicAsignatureCoursePeriodEvidenceLearningValuationConnection = AcademicAsignatureCoursePeriodEvidenceLearningValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureCoursePeriodEvidenceLearningValuationConnection);
