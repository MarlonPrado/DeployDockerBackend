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
exports.ExperienceLearningRubricCriteriaConnection = exports.ExperienceLearningRubricCriteriaEdge = exports.ExperienceLearningRubricCriteria = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const EvidenceLearning_1 = require("../SchoolAdministrator/EvidenceLearning");
const ExperienceLearning_1 = require("./ExperienceLearning");
const ExperienceLearningRubricCriteriaPerformanceLevel_1 = require("./ExperienceLearningRubricCriteriaPerformanceLevel");
let ExperienceLearningRubricCriteria = class ExperienceLearningRubricCriteria extends IModelCampusData_1.IModelCampusData {
};
exports.ExperienceLearningRubricCriteria = ExperienceLearningRubricCriteria;
__decorate([
    (0, typeorm_1.Index)("index_experienceLearningId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricCriteria.prototype, "experienceLearningId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", ExperienceLearning_1.ExperienceLearning)
], ExperienceLearningRubricCriteria.prototype, "experienceLearning", void 0);
__decorate([
    (0, typeorm_1.Index)("index_evidenceLearningId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricCriteria.prototype, "evidenceLearningId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => EvidenceLearning_1.EvidenceLearning, { nullable: true }),
    __metadata("design:type", EvidenceLearning_1.EvidenceLearning)
], ExperienceLearningRubricCriteria.prototype, "evidenceLearnig", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ExperienceLearningRubricCriteria.prototype, "weight", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricCriteria.prototype, "criteria", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ExperienceLearningRubricCriteriaPerformanceLevel_1.ExperienceLearningRubricCriteriaPerformanceLevel], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], ExperienceLearningRubricCriteria.prototype, "experienceLearningRubricCriteriaPerformanceLevel", void 0);
exports.ExperienceLearningRubricCriteria = ExperienceLearningRubricCriteria = __decorate([
    (0, typeorm_1.Index)("index_full", ["experienceLearningId", "evidenceLearningId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The ExperienceLearningRubricCriteria model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], ExperienceLearningRubricCriteria);
let ExperienceLearningRubricCriteriaEdge = class ExperienceLearningRubricCriteriaEdge extends (0, relaySpecs_1.EdgeType)('ExperienceLearningRubricCriteria', ExperienceLearningRubricCriteria) {
};
exports.ExperienceLearningRubricCriteriaEdge = ExperienceLearningRubricCriteriaEdge;
exports.ExperienceLearningRubricCriteriaEdge = ExperienceLearningRubricCriteriaEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningRubricCriteriaEdge);
let ExperienceLearningRubricCriteriaConnection = class ExperienceLearningRubricCriteriaConnection extends (0, relaySpecs_1.ConnectionType)('ExperienceLearningRubricCriteria', ExperienceLearningRubricCriteriaEdge) {
};
exports.ExperienceLearningRubricCriteriaConnection = ExperienceLearningRubricCriteriaConnection;
exports.ExperienceLearningRubricCriteriaConnection = ExperienceLearningRubricCriteriaConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningRubricCriteriaConnection);
