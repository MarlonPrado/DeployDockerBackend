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
exports.AcademicAreaCoursePeriodValuationConnection = exports.AcademicAreaCoursePeriodValuationEdge = exports.AcademicAreaCoursePeriodValuation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ValuationType_1 = require("../../enums/ValuationType");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicArea_1 = require("../SchoolAdministrator/AcademicArea");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
let AcademicAreaCoursePeriodValuation = class AcademicAreaCoursePeriodValuation extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicAreaCoursePeriodValuation = AcademicAreaCoursePeriodValuation;
__decorate([
    (0, typeorm_1.Index)("index_academicAreaId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCoursePeriodValuation.prototype, "academicAreaId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicArea_1.AcademicArea)
], AcademicAreaCoursePeriodValuation.prototype, "academicArea", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCoursePeriodValuation.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], AcademicAreaCoursePeriodValuation.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCoursePeriodValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], AcademicAreaCoursePeriodValuation.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAreaCoursePeriodValuation.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCoursePeriodValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], AcademicAreaCoursePeriodValuation.prototype, "performanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ValuationType_1.ValuationType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAreaCoursePeriodValuation.prototype, "valuationType", void 0);
exports.AcademicAreaCoursePeriodValuation = AcademicAreaCoursePeriodValuation = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAreaId", "academicPeriodId", "studentId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicAreaCoursePeriodValuation model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicAreaCoursePeriodValuation);
let AcademicAreaCoursePeriodValuationEdge = class AcademicAreaCoursePeriodValuationEdge extends (0, relaySpecs_1.EdgeType)('AcademicAreaCoursePeriodValuation', AcademicAreaCoursePeriodValuation) {
};
exports.AcademicAreaCoursePeriodValuationEdge = AcademicAreaCoursePeriodValuationEdge;
exports.AcademicAreaCoursePeriodValuationEdge = AcademicAreaCoursePeriodValuationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAreaCoursePeriodValuationEdge);
let AcademicAreaCoursePeriodValuationConnection = class AcademicAreaCoursePeriodValuationConnection extends (0, relaySpecs_1.ConnectionType)('AcademicAreaCoursePeriodValuation', AcademicAreaCoursePeriodValuationEdge) {
};
exports.AcademicAreaCoursePeriodValuationConnection = AcademicAreaCoursePeriodValuationConnection;
exports.AcademicAreaCoursePeriodValuationConnection = AcademicAreaCoursePeriodValuationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAreaCoursePeriodValuationConnection);
