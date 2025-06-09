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
exports.ExperienceLearningTraditionalValuationConnection = exports.ExperienceLearningTraditionalValuationEdge = exports.ExperienceLearningTraditionalValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const ExperienceLearning_1 = require("./ExperienceLearning");
let ExperienceLearningTraditionalValuation = class ExperienceLearningTraditionalValuation extends IModelCampusData_1.IModelCampusData {
};
exports.ExperienceLearningTraditionalValuation = ExperienceLearningTraditionalValuation;
__decorate([
    (0, typeorm_1.Index)("index_experienceLearningId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningTraditionalValuation.prototype, "experienceLearningId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", ExperienceLearning_1.ExperienceLearning)
], ExperienceLearningTraditionalValuation.prototype, "experienceLearning", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningTraditionalValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], ExperienceLearningTraditionalValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ExperienceLearningTraditionalValuation.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningTraditionalValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], ExperienceLearningTraditionalValuation.prototype, "performanceLevel", void 0);
exports.ExperienceLearningTraditionalValuation = ExperienceLearningTraditionalValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["experienceLearningId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({
        description: 'The ExperienceLearningTraditionalValuation model',
        implements: IModelCampusData_1.IModelCampusData,
    }),
    (0, typeorm_1.Entity)()
], ExperienceLearningTraditionalValuation);
let ExperienceLearningTraditionalValuationEdge = class ExperienceLearningTraditionalValuationEdge extends (0, relaySpecs_1.EdgeType)('ExperienceLearningTraditionalValuation', ExperienceLearningTraditionalValuation) {
};
exports.ExperienceLearningTraditionalValuationEdge = ExperienceLearningTraditionalValuationEdge;
exports.ExperienceLearningTraditionalValuationEdge = ExperienceLearningTraditionalValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningTraditionalValuationEdge);
let ExperienceLearningTraditionalValuationConnection = class ExperienceLearningTraditionalValuationConnection extends (0, relaySpecs_1.ConnectionType)('ExperienceLearningTraditionalValuation', ExperienceLearningTraditionalValuationEdge) {
};
exports.ExperienceLearningTraditionalValuationConnection = ExperienceLearningTraditionalValuationConnection;
exports.ExperienceLearningTraditionalValuationConnection = ExperienceLearningTraditionalValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningTraditionalValuationConnection);
