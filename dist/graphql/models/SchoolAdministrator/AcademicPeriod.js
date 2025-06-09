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
exports.AcademicPeriodConnection = exports.AcademicPeriodEdge = exports.AcademicPeriod = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYear_1 = require("./SchoolYear");
let AcademicPeriod = class AcademicPeriod extends IModelSchoolData_1.IModelSchoolData {
};
exports.AcademicPeriod = AcademicPeriod;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicPeriod.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicPeriod.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicPeriod.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AcademicPeriod.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AcademicPeriod.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AcademicPeriod.prototype, "startDateRecovery", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], AcademicPeriod.prototype, "endDateRecovery", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicPeriod.prototype, "weight", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicPeriod.prototype, "order", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicPeriod.prototype, "entityBaseId", void 0);
exports.AcademicPeriod = AcademicPeriod = __decorate([
    (0, typeorm_1.Index)("index_full", ["schoolYearId", "schoolId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicPeriod model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], AcademicPeriod);
let AcademicPeriodEdge = class AcademicPeriodEdge extends (0, relaySpecs_1.EdgeType)('AcademicPeriod', AcademicPeriod) {
};
exports.AcademicPeriodEdge = AcademicPeriodEdge;
exports.AcademicPeriodEdge = AcademicPeriodEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicPeriodEdge);
let AcademicPeriodConnection = class AcademicPeriodConnection extends (0, relaySpecs_1.ConnectionType)('AcademicPeriod', AcademicPeriodEdge) {
};
exports.AcademicPeriodConnection = AcademicPeriodConnection;
exports.AcademicPeriodConnection = AcademicPeriodConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicPeriodConnection);
