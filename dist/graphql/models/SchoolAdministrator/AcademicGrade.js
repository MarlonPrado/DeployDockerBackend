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
exports.AcademicGradeConnection = exports.AcademicGradeEdge = exports.AcademicGrade = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralAcademicCycle_1 = require("../GeneralAdministrator/GeneralAcademicCycle");
const GeneralAcademicGrade_1 = require("../GeneralAdministrator/GeneralAcademicGrade");
const EducationLevel_1 = require("./EducationLevel");
const SchoolYear_1 = require("./SchoolYear");
const Specialty_1 = require("./Specialty");
let AcademicGrade = class AcademicGrade extends IModelSchoolData_1.IModelSchoolData {
};
exports.AcademicGrade = AcademicGrade;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicGrade.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)("index_educationLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicGrade.prototype, "educationLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", EducationLevel_1.EducationLevel)
], AcademicGrade.prototype, "educationLevel", void 0);
__decorate([
    (0, typeorm_1.Index)("index_specialtyId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicGrade.prototype, "specialtyId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Specialty_1.Specialty)
], AcademicGrade.prototype, "specialty", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicCycleId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicGrade.prototype, "generalAcademicCycleId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicCycle_1.GeneralAcademicCycle)
], AcademicGrade.prototype, "generalAcademicCycle", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicGradeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicGrade.prototype, "generalAcademicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicGrade_1.GeneralAcademicGrade)
], AcademicGrade.prototype, "generalAcademicGrade", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicGrade.prototype, "countStudent", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicGrade.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicGrade.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicGrade.prototype, "entityBaseId", void 0);
exports.AcademicGrade = AcademicGrade = __decorate([
    (0, typeorm_1.Index)("index_full", ["educationLevelId", "specialtyId", "generalAcademicCycleId", "generalAcademicGradeId", "schoolId", "schoolYearId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicGrade model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], AcademicGrade);
let AcademicGradeEdge = class AcademicGradeEdge extends (0, relaySpecs_1.EdgeType)('AcademicGrade', AcademicGrade) {
};
exports.AcademicGradeEdge = AcademicGradeEdge;
exports.AcademicGradeEdge = AcademicGradeEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicGradeEdge);
let AcademicGradeConnection = class AcademicGradeConnection extends (0, relaySpecs_1.ConnectionType)('AcademicGrade', AcademicGradeEdge) {
};
exports.AcademicGradeConnection = AcademicGradeConnection;
exports.AcademicGradeConnection = AcademicGradeConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicGradeConnection);
