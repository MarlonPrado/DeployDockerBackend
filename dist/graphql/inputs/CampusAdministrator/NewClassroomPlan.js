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
exports.NewClassroomPlan = void 0;
const type_graphql_1 = require("type-graphql");
const NewClassroomPlanExpectedPerformance_1 = require("./NewClassroomPlanExpectedPerformance");
const NewClassroomPlanMethodologicalRoute_1 = require("./NewClassroomPlanMethodologicalRoute");
const NewClassroomPlanPerformanceAppraisalStrategy_1 = require("./NewClassroomPlanPerformanceAppraisalStrategy");
let NewClassroomPlan = class NewClassroomPlan {
};
exports.NewClassroomPlan = NewClassroomPlan;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewClassroomPlan.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], NewClassroomPlan.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], NewClassroomPlan.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewClassroomPlan.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewClassroomPlan.prototype, "academicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewClassroomPlan.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewClassroomPlan.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewClassroomPlan.prototype, "learningsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewClassroomPlan.prototype, "academicStandardsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewClassroomPlan.prototype, "generalBasicLearningRightsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [NewClassroomPlanExpectedPerformance_1.NewClassroomPlanExpectedPerformance], { nullable: true }),
    __metadata("design:type", Array)
], NewClassroomPlan.prototype, "classroomPlanExpectedPerformances", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [NewClassroomPlanPerformanceAppraisalStrategy_1.NewClassroomPlanPerformanceAppraisalStrategy], { nullable: true }),
    __metadata("design:type", Array)
], NewClassroomPlan.prototype, "classroomPlanPerformanceAppraisalStrategies", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [NewClassroomPlanMethodologicalRoute_1.NewClassroomPlanMethodologicalRoute], { nullable: true }),
    __metadata("design:type", Array)
], NewClassroomPlan.prototype, "classroomPlanMethodologicalRoutes", void 0);
exports.NewClassroomPlan = NewClassroomPlan = __decorate([
    (0, type_graphql_1.InputType)()
], NewClassroomPlan);
