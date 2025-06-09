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
exports.GeneralBasicLearningRightConnection = exports.GeneralBasicLearningRightEdge = exports.GeneralBasicLearningRight = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralAcademicAsignature_1 = require("./GeneralAcademicAsignature");
const GeneralAcademicGrade_1 = require("./GeneralAcademicGrade");
let GeneralBasicLearningRight = class GeneralBasicLearningRight extends IModelData_1.IModelData {
};
exports.GeneralBasicLearningRight = GeneralBasicLearningRight;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralBasicLearningRight.prototype, "dba", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralBasicLearningRight.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralBasicLearningRight.prototype, "generalAcademicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicAsignature_1.GeneralAcademicAsignature)
], GeneralBasicLearningRight.prototype, "generalAcademicAsignature", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicGradeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralBasicLearningRight.prototype, "generalAcademicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicGrade_1.GeneralAcademicGrade)
], GeneralBasicLearningRight.prototype, "generalAcademicGrade", void 0);
exports.GeneralBasicLearningRight = GeneralBasicLearningRight = __decorate([
    (0, typeorm_1.Index)("index_full", ["generalAcademicAsignatureId", "generalAcademicGradeId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The GeneralBasicLearningRight model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], GeneralBasicLearningRight);
let GeneralBasicLearningRightEdge = class GeneralBasicLearningRightEdge extends (0, relaySpecs_1.EdgeType)('GeneralBasicLearningRight', GeneralBasicLearningRight) {
};
exports.GeneralBasicLearningRightEdge = GeneralBasicLearningRightEdge;
exports.GeneralBasicLearningRightEdge = GeneralBasicLearningRightEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralBasicLearningRightEdge);
let GeneralBasicLearningRightConnection = class GeneralBasicLearningRightConnection extends (0, relaySpecs_1.ConnectionType)('GeneralBasicLearningRight', GeneralBasicLearningRightEdge) {
};
exports.GeneralBasicLearningRightConnection = GeneralBasicLearningRightConnection;
exports.GeneralBasicLearningRightConnection = GeneralBasicLearningRightConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralBasicLearningRightConnection);
