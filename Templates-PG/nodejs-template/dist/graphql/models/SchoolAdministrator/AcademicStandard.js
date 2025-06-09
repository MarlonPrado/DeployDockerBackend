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
exports.AcademicStandardConnection = exports.AcademicStandardEdge = exports.AcademicStandard = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralAcademicStandard_1 = require("../GeneralAdministrator/GeneralAcademicStandard");
const AcademicAsignature_1 = require("./AcademicAsignature");
const AcademicGrade_1 = require("./AcademicGrade");
let AcademicStandard = class AcademicStandard extends IModelSchoolData_1.IModelSchoolData {
};
exports.AcademicStandard = AcademicStandard;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicStandard.prototype, "standard", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicStandardId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicStandard.prototype, "generalAcademicStandardId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicStandard_1.GeneralAcademicStandard)
], AcademicStandard.prototype, "generalAcademicStandard", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicStandard.prototype, "academicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignature_1.AcademicAsignature)
], AcademicStandard.prototype, "academicAsignature", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicStandard.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicGrade_1.AcademicGrade)
], AcademicStandard.prototype, "academicGrade", void 0);
exports.AcademicStandard = AcademicStandard = __decorate([
    (0, typeorm_1.Index)("index_full", ["generalAcademicStandardId", "academicAsignatureId", "academicGradeId", "schoolId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicStandard model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], AcademicStandard);
let AcademicStandardEdge = class AcademicStandardEdge extends (0, relaySpecs_1.EdgeType)('AcademicStandard', AcademicStandard) {
};
exports.AcademicStandardEdge = AcademicStandardEdge;
exports.AcademicStandardEdge = AcademicStandardEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicStandardEdge);
let AcademicStandardConnection = class AcademicStandardConnection extends (0, relaySpecs_1.ConnectionType)('AcademicStandard', AcademicStandardEdge) {
};
exports.AcademicStandardConnection = AcademicStandardConnection;
exports.AcademicStandardConnection = AcademicStandardConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicStandardConnection);
