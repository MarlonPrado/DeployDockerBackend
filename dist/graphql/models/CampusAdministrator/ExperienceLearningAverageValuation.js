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
exports.ExperienceLearningAverageValuationConnection = exports.ExperienceLearningAverageValuationEdge = exports.ExperienceLearningAverageValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ExperienceLearningType_1 = require("../../enums/ExperienceLearningType");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const EvaluativeComponent_1 = require("../SchoolAdministrator/EvaluativeComponent");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
let ExperienceLearningAverageValuation = class ExperienceLearningAverageValuation extends IModelCampusData_1.IModelCampusData {
};
exports.ExperienceLearningAverageValuation = ExperienceLearningAverageValuation;
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningAverageValuation.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], ExperienceLearningAverageValuation.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningAverageValuation.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], ExperienceLearningAverageValuation.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningAverageValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], ExperienceLearningAverageValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ExperienceLearningAverageValuation.prototype, "average", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ExperienceLearningType_1.ExperienceLearningType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningAverageValuation.prototype, "experienceLearningType", void 0);
__decorate([
    (0, typeorm_1.Index)("index_evaluativeComponentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningAverageValuation.prototype, "evaluativeComponentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", EvaluativeComponent_1.EvaluativeComponent)
], ExperienceLearningAverageValuation.prototype, "evaluativeComponent", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningAverageValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], ExperienceLearningAverageValuation.prototype, "performanceLevel", void 0);
exports.ExperienceLearningAverageValuation = ExperienceLearningAverageValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAsignatureCourseId", "academicPeriodId", "studentId", "evaluativeComponentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({
        description: 'The ExperienceLearningAverageValuation model',
        implements: IModelCampusData_1.IModelCampusData,
    }),
    (0, typeorm_1.Entity)()
], ExperienceLearningAverageValuation);
let ExperienceLearningAverageValuationEdge = class ExperienceLearningAverageValuationEdge extends (0, relaySpecs_1.EdgeType)('ExperienceLearningAverageValuation', ExperienceLearningAverageValuation) {
};
exports.ExperienceLearningAverageValuationEdge = ExperienceLearningAverageValuationEdge;
exports.ExperienceLearningAverageValuationEdge = ExperienceLearningAverageValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningAverageValuationEdge);
let ExperienceLearningAverageValuationConnection = class ExperienceLearningAverageValuationConnection extends (0, relaySpecs_1.ConnectionType)('ExperienceLearningAverageValuation', ExperienceLearningAverageValuationEdge) {
};
exports.ExperienceLearningAverageValuationConnection = ExperienceLearningAverageValuationConnection;
exports.ExperienceLearningAverageValuationConnection = ExperienceLearningAverageValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningAverageValuationConnection);
