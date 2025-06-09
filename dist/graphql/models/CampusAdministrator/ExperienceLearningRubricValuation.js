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
exports.ExperienceLearningRubricValuationConnection = exports.ExperienceLearningRubricValuationEdge = exports.ExperienceLearningRubricValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const ExperienceLearning_1 = require("./ExperienceLearning");
let ExperienceLearningRubricValuation = class ExperienceLearningRubricValuation extends IModelCampusData_1.IModelCampusData {
};
exports.ExperienceLearningRubricValuation = ExperienceLearningRubricValuation;
__decorate([
    (0, typeorm_1.Index)("index_experienceLearningId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricValuation.prototype, "experienceLearningId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", ExperienceLearning_1.ExperienceLearning)
], ExperienceLearningRubricValuation.prototype, "experienceLearning", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], ExperienceLearningRubricValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ExperienceLearningRubricValuation.prototype, "assessment", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricValuation.prototype, "observations", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ExperienceLearningRubricValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], ExperienceLearningRubricValuation.prototype, "performanceLevel", void 0);
exports.ExperienceLearningRubricValuation = ExperienceLearningRubricValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["experienceLearningId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({
        description: 'The ExperienceLearningRubricValuation model',
        implements: IModelCampusData_1.IModelCampusData,
    }),
    (0, typeorm_1.Entity)()
], ExperienceLearningRubricValuation);
let ExperienceLearningRubricValuationEdge = class ExperienceLearningRubricValuationEdge extends (0, relaySpecs_1.EdgeType)('ExperienceLearningRubricValuation', ExperienceLearningRubricValuation) {
};
exports.ExperienceLearningRubricValuationEdge = ExperienceLearningRubricValuationEdge;
exports.ExperienceLearningRubricValuationEdge = ExperienceLearningRubricValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningRubricValuationEdge);
let ExperienceLearningRubricValuationConnection = class ExperienceLearningRubricValuationConnection extends (0, relaySpecs_1.ConnectionType)('ExperienceLearningRubricValuation', ExperienceLearningRubricValuationEdge) {
};
exports.ExperienceLearningRubricValuationConnection = ExperienceLearningRubricValuationConnection;
exports.ExperienceLearningRubricValuationConnection = ExperienceLearningRubricValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExperienceLearningRubricValuationConnection);
