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
exports.ClassroomPlanConnection = exports.ClassroomPlanEdge = exports.ClassroomPlan = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralBasicLearningRight_1 = require("../GeneralAdministrator/GeneralBasicLearningRight");
const AcademicAsignature_1 = require("../SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../SchoolAdministrator/AcademicGrade");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const AcademicStandard_1 = require("../SchoolAdministrator/AcademicStandard");
const Learning_1 = require("../SchoolAdministrator/Learning");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
const ClassroomPlanExpectedPerformance_1 = require("./ClassroomPlanExpectedPerformance");
const ClassroomPlanMethodologicalRoute_1 = require("./ClassroomPlanMethodologicalRoute");
const ClassroomPlanPerformanceAppraisalStrategy_1 = require("./ClassroomPlanPerformanceAppraisalStrategy");
let ClassroomPlan = class ClassroomPlan extends IModelCampusData_1.IModelCampusData {
};
exports.ClassroomPlan = ClassroomPlan;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ClassroomPlan.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ClassroomPlan.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClassroomPlan.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], ClassroomPlan.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClassroomPlan.prototype, "academicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignature_1.AcademicAsignature)
], ClassroomPlan.prototype, "academicAsignature", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClassroomPlan.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicGrade_1.AcademicGrade)
], ClassroomPlan.prototype, "academicGrade", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClassroomPlan.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], ClassroomPlan.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_1.Index)("index_learningsId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ClassroomPlan.prototype, "learningsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Learning_1.Learning], { nullable: true }),
    __metadata("design:type", Array)
], ClassroomPlan.prototype, "learnigs", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicStandardsId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ClassroomPlan.prototype, "academicStandardsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [AcademicStandard_1.AcademicStandard], { nullable: true }),
    __metadata("design:type", Array)
], ClassroomPlan.prototype, "academicStandards", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalBasicLearningRightsId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ClassroomPlan.prototype, "generalBasicLearningRightsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [GeneralBasicLearningRight_1.GeneralBasicLearningRight], { nullable: true }),
    __metadata("design:type", GeneralBasicLearningRight_1.GeneralBasicLearningRight)
], ClassroomPlan.prototype, "generalBasicLearningRights", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ClassroomPlanExpectedPerformance_1.ClassroomPlanExpectedPerformance], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ClassroomPlan.prototype, "classroomPlanExpectedPerformances", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ClassroomPlanPerformanceAppraisalStrategy_1.ClassroomPlanPerformanceAppraisalStrategy], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ClassroomPlan.prototype, "classroomPlanPerformanceAppraisalStrategies", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ClassroomPlanMethodologicalRoute_1.ClassroomPlanMethodologicalRoute], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ClassroomPlan.prototype, "classroomPlanMethodologicalRoutes", void 0);
exports.ClassroomPlan = ClassroomPlan = __decorate([
    (0, typeorm_1.Index)("index_full_academicStandards", ["academicPeriodId", "academicAsignatureId", "academicGradeId", "academicAsignatureCourseId", "academicStandardsId", "campusId"]),
    (0, typeorm_1.Index)("index_full_learnings", ["academicPeriodId", "academicAsignatureId", "academicGradeId", "academicAsignatureCourseId", "learningsId", "campusId"]),
    (0, typeorm_1.Index)("index_full_generalBasicLearningRights", ["academicPeriodId", "academicAsignatureId", "academicGradeId", "academicAsignatureCourseId", "generalBasicLearningRightsId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The ClassroomPlan model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], ClassroomPlan);
let ClassroomPlanEdge = class ClassroomPlanEdge extends (0, relaySpecs_1.EdgeType)('ClassroomPlan', ClassroomPlan) {
};
exports.ClassroomPlanEdge = ClassroomPlanEdge;
exports.ClassroomPlanEdge = ClassroomPlanEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ClassroomPlanEdge);
let ClassroomPlanConnection = class ClassroomPlanConnection extends (0, relaySpecs_1.ConnectionType)('ClassroomPlan', ClassroomPlanEdge) {
};
exports.ClassroomPlanConnection = ClassroomPlanConnection;
exports.ClassroomPlanConnection = ClassroomPlanConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ClassroomPlanConnection);
