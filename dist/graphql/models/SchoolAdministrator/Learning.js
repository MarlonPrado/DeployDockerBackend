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
exports.LearningConnection = exports.LearningEdge = exports.Learning = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralBasicLearningRight_1 = require("../GeneralAdministrator/GeneralBasicLearningRight");
const AcademicAsignature_1 = require("./AcademicAsignature");
const AcademicGrade_1 = require("./AcademicGrade");
const AcademicPeriod_1 = require("./AcademicPeriod");
const AcademicStandard_1 = require("./AcademicStandard");
let Learning = class Learning extends IModelSchoolData_1.IModelSchoolData {
    ;
};
exports.Learning = Learning;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Learning.prototype, "statement", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Learning.prototype, "academicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignature_1.AcademicAsignature)
], Learning.prototype, "academicAsignature", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalBasicLearningRightId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Learning.prototype, "generalBasicLearningRightId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralBasicLearningRight_1.GeneralBasicLearningRight)
], Learning.prototype, "generalBasicLearningRight", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicStandardId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Learning.prototype, "academicStandardId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicStandard_1.AcademicStandard)
], Learning.prototype, "academicStandard", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Learning.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicGrade_1.AcademicGrade)
], Learning.prototype, "academicGrade", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodsId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], Learning.prototype, "academicPeriodsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [AcademicPeriod_1.AcademicPeriod], { nullable: true }),
    __metadata("design:type", Array)
], Learning.prototype, "academicPeriods", void 0);
exports.Learning = Learning = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAsignatureId", "generalBasicLearningRightId", "academicStandardId", "academicGradeId", "academicPeriodsId", "schoolId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The Learning model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], Learning);
let LearningEdge = class LearningEdge extends (0, relaySpecs_1.EdgeType)('Learning', Learning) {
};
exports.LearningEdge = LearningEdge;
exports.LearningEdge = LearningEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], LearningEdge);
let LearningConnection = class LearningConnection extends (0, relaySpecs_1.ConnectionType)('Learning', LearningEdge) {
};
exports.LearningConnection = LearningConnection;
exports.LearningConnection = LearningConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], LearningConnection);
