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
exports.GeneralAcademicGradeConnection = exports.GeneralAcademicGradeEdge = exports.GeneralAcademicGrade = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralAcademicCycle_1 = require("./GeneralAcademicCycle");
let GeneralAcademicGrade = class GeneralAcademicGrade extends IModelData_1.IModelData {
};
exports.GeneralAcademicGrade = GeneralAcademicGrade;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicGrade.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicCycleId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicGrade.prototype, "generalAcademicCycleId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicCycle_1.GeneralAcademicCycle)
], GeneralAcademicGrade.prototype, "generalAcademicCycle", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicGrade.prototype, "nextGeneralAcademicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicGrade.prototype, "previousGeneralAcademicGradeId", void 0);
exports.GeneralAcademicGrade = GeneralAcademicGrade = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The GeneralAcademicGrade model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], GeneralAcademicGrade);
let GeneralAcademicGradeEdge = class GeneralAcademicGradeEdge extends (0, relaySpecs_1.EdgeType)('GeneralAcademicGrade', GeneralAcademicGrade) {
};
exports.GeneralAcademicGradeEdge = GeneralAcademicGradeEdge;
exports.GeneralAcademicGradeEdge = GeneralAcademicGradeEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralAcademicGradeEdge);
let GeneralAcademicGradeConnection = class GeneralAcademicGradeConnection extends (0, relaySpecs_1.ConnectionType)('GeneralAcademicGrade', GeneralAcademicGradeEdge) {
};
exports.GeneralAcademicGradeConnection = GeneralAcademicGradeConnection;
exports.GeneralAcademicGradeConnection = GeneralAcademicGradeConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralAcademicGradeConnection);
