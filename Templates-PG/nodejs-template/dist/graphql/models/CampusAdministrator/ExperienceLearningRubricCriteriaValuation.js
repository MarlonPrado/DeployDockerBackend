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
exports.ExperienceLearningRubricCriteriaValuationConnection = exports.ExperienceLearningRubricCriteriaValuationEdge = exports.ExperienceLearningRubricCriteriaValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const ExperienceLearningRubricCriteria_1 = require("./ExperienceLearningRubricCriteria");
let ExperienceLearningRubricCriteriaValuation = class ExperienceLearningRubricCriteriaValuation extends IModelCampusData_1.IModelCampusData {
};
exports.ExperienceLearningRubricCriteriaValuation = ExperienceLearningRubricCriteriaValuation;
__decorate([
    (0, typeorm_1.Index)("index_experienceLearningRubricCriteriaId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricCriteriaValuation.prototype, "experienceLearningRubricCriteriaId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria)
], ExperienceLearningRubricCriteriaValuation.prototype, "experienceLearningRubricCriteria", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricCriteriaValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], ExperienceLearningRubricCriteriaValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ExperienceLearningRubricCriteriaValuation.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricCriteriaValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], ExperienceLearningRubricCriteriaValuation.prototype, "performanceLevel", void 0);
exports.ExperienceLearningRubricCriteriaValuation = ExperienceLearningRubricCriteriaValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["experienceLearningRubricCriteriaId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({
        description: 'The ExperienceLearningRubricCriteriaValuation model',
        implements: IModelCampusData_1.IModelCampusData,
    }),
    (0, typeorm_1.Entity)()
], ExperienceLearningRubricCriteriaValuation);
let ExperienceLearningRubricCriteriaValuationEdge = class ExperienceLearningRubricCriteriaValuationEdge extends (0, relaySpecs_1.EdgeType)('ExperienceLearningRubricCriteriaValuation', ExperienceLearningRubricCriteriaValuation) {
};
exports.ExperienceLearningRubricCriteriaValuationEdge = ExperienceLearningRubricCriteriaValuationEdge;
exports.ExperienceLearningRubricCriteriaValuationEdge = ExperienceLearningRubricCriteriaValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningRubricCriteriaValuationEdge);
let ExperienceLearningRubricCriteriaValuationConnection = class ExperienceLearningRubricCriteriaValuationConnection extends (0, relaySpecs_1.ConnectionType)('ExperienceLearningRubricCriteriaValuation', ExperienceLearningRubricCriteriaValuationEdge) {
};
exports.ExperienceLearningRubricCriteriaValuationConnection = ExperienceLearningRubricCriteriaValuationConnection;
exports.ExperienceLearningRubricCriteriaValuationConnection = ExperienceLearningRubricCriteriaValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningRubricCriteriaValuationConnection);
