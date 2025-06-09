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
exports.ExperienceLearningCoEvaluationValuationConnection = exports.ExperienceLearningCoEvaluationValuationEdge = exports.ExperienceLearningCoEvaluationValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const ExperienceLearning_1 = require("./ExperienceLearning");
let ExperienceLearningCoEvaluationValuation = class ExperienceLearningCoEvaluationValuation extends IModelCampusData_1.IModelCampusData {
};
exports.ExperienceLearningCoEvaluationValuation = ExperienceLearningCoEvaluationValuation;
__decorate([
    (0, typeorm_1.Index)("index_experienceLearningId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningCoEvaluationValuation.prototype, "experienceLearningId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", ExperienceLearning_1.ExperienceLearning)
], ExperienceLearningCoEvaluationValuation.prototype, "experienceLearning", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningCoEvaluationValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], ExperienceLearningCoEvaluationValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ExperienceLearningCoEvaluationValuation.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningCoEvaluationValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], ExperienceLearningCoEvaluationValuation.prototype, "performanceLevel", void 0);
exports.ExperienceLearningCoEvaluationValuation = ExperienceLearningCoEvaluationValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["experienceLearningId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({
        description: 'The ExperienceLearningCoEvaluationValuation model',
        implements: IModelCampusData_1.IModelCampusData,
    }),
    (0, typeorm_1.Entity)()
], ExperienceLearningCoEvaluationValuation);
let ExperienceLearningCoEvaluationValuationEdge = class ExperienceLearningCoEvaluationValuationEdge extends (0, relaySpecs_1.EdgeType)('ExperienceLearningCoEvaluationValuation', ExperienceLearningCoEvaluationValuation) {
};
exports.ExperienceLearningCoEvaluationValuationEdge = ExperienceLearningCoEvaluationValuationEdge;
exports.ExperienceLearningCoEvaluationValuationEdge = ExperienceLearningCoEvaluationValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningCoEvaluationValuationEdge);
let ExperienceLearningCoEvaluationValuationConnection = class ExperienceLearningCoEvaluationValuationConnection extends (0, relaySpecs_1.ConnectionType)('ExperienceLearningCoEvaluationValuation', ExperienceLearningCoEvaluationValuationEdge) {
};
exports.ExperienceLearningCoEvaluationValuationConnection = ExperienceLearningCoEvaluationValuationConnection;
exports.ExperienceLearningCoEvaluationValuationConnection = ExperienceLearningCoEvaluationValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningCoEvaluationValuationConnection);
