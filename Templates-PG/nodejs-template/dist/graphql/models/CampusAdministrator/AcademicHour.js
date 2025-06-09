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
exports.AcademicHourConnection = exports.AcademicHourEdge = exports.AcademicHour = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const AcademicDay_1 = require("./AcademicDay");
let AcademicHour = class AcademicHour extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicHour = AcademicHour;
__decorate([
    (0, typeorm_1.Index)("index_academicDayId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicHour.prototype, "academicDayId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicDay_1.AcademicDay)
], AcademicHour.prototype, "academicDay", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicHour.prototype, "startTime", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicHour.prototype, "endTime", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicHour.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicHour.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicHour.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicHour.prototype, "entityBaseId", void 0);
exports.AcademicHour = AcademicHour = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicDayId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicHour model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicHour);
let AcademicHourEdge = class AcademicHourEdge extends (0, relaySpecs_1.EdgeType)('AcademicHour', AcademicHour) {
};
exports.AcademicHourEdge = AcademicHourEdge;
exports.AcademicHourEdge = AcademicHourEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicHourEdge);
let AcademicHourConnection = class AcademicHourConnection extends (0, relaySpecs_1.ConnectionType)('AcademicHour', AcademicHourEdge) {
};
exports.AcademicHourConnection = AcademicHourConnection;
exports.AcademicHourConnection = AcademicHourConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicHourConnection);
