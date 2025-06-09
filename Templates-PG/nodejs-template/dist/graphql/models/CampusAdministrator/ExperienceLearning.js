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
exports.ExperienceLearningConnection = exports.ExperienceLearningEdge = exports.ExperienceLearning = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ExperienceLearningType_1 = require("../../enums/ExperienceLearningType");
const ExperienceRecoveryPlanType_1 = require("../../enums/ExperienceRecoveryPlanType");
const ExperienceType_1 = require("../../enums/ExperienceType");
const NavigationMethodTestOnline_1 = require("../../enums/NavigationMethodTestOnline");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const EvaluativeComponent_1 = require("../SchoolAdministrator/EvaluativeComponent");
const EvidenceLearning_1 = require("../SchoolAdministrator/EvidenceLearning");
const Learning_1 = require("../SchoolAdministrator/Learning");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
const ExperienceLearningPerformanceLevel_1 = require("./ExperienceLearningPerformanceLevel");
let ExperienceLearning = class ExperienceLearning extends IModelCampusData_1.IModelCampusData {
};
exports.ExperienceLearning = ExperienceLearning;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], ExperienceLearning.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ExperienceType_1.ExperienceType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "experienceType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ExperienceLearningType_1.ExperienceLearningType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "experienceLearningType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ExperienceRecoveryPlanType_1.ExperienceRecoveryPlanType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "experienceRecoveryPlanType", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ExperienceLearning.prototype, "dateDelivery", void 0);
__decorate([
    (0, typeorm_1.Index)("index_learningsId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ExperienceLearning.prototype, "learningsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Learning_1.Learning], { nullable: true }),
    __metadata("design:type", Array)
], ExperienceLearning.prototype, "learnigs", void 0);
__decorate([
    (0, typeorm_1.Index)("index_evidenceLearningsId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ExperienceLearning.prototype, "evidenceLearningsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [EvidenceLearning_1.EvidenceLearning], { nullable: true }),
    __metadata("design:type", Array)
], ExperienceLearning.prototype, "evidenceLearnings", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], ExperienceLearning.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_evaluativeComponentsId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ExperienceLearning.prototype, "evaluativeComponentsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [EvaluativeComponent_1.EvaluativeComponent], { nullable: true }),
    __metadata("design:type", EvaluativeComponent_1.EvaluativeComponent)
], ExperienceLearning.prototype, "evaluativeComponents", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], ExperienceLearning.prototype, "onlineDelivery", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "criteria", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ExperienceLearningPerformanceLevel_1.ExperienceLearningPerformanceLevel], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ExperienceLearning.prototype, "experienceLearningPerformanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ExperienceLearning.prototype, "openTestDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ExperienceLearning.prototype, "closeTestDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => NavigationMethodTestOnline_1.NavigationMethodTestOnline, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearning.prototype, "navigationMethod", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], ExperienceLearning.prototype, "shuffleQuestions", void 0);
exports.ExperienceLearning = ExperienceLearning = __decorate([
    (0, typeorm_1.Index)("index_full_evidenceLearnings", ["academicAsignatureCourseId", "evidenceLearningsId", "academicPeriodId", "campusId"]),
    (0, typeorm_1.Index)("index_full_learnings", ["academicAsignatureCourseId", "learningsId", "academicPeriodId", "campusId"]),
    (0, typeorm_1.Index)("index_full_evaluativeComponents", ["academicAsignatureCourseId", "academicPeriodId", "evaluativeComponentsId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The ExperienceLearning model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], ExperienceLearning);
let ExperienceLearningEdge = class ExperienceLearningEdge extends (0, relaySpecs_1.EdgeType)('ExperienceLearning', ExperienceLearning) {
};
exports.ExperienceLearningEdge = ExperienceLearningEdge;
exports.ExperienceLearningEdge = ExperienceLearningEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningEdge);
let ExperienceLearningConnection = class ExperienceLearningConnection extends (0, relaySpecs_1.ConnectionType)('ExperienceLearning', ExperienceLearningEdge) {
};
exports.ExperienceLearningConnection = ExperienceLearningConnection;
exports.ExperienceLearningConnection = ExperienceLearningConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningConnection);
