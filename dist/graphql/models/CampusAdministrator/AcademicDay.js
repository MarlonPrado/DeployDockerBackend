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
exports.AcademicDayConnection = exports.AcademicDayEdge = exports.AcademicDay = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Day_1 = require("../../enums/Day");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
let AcademicDay = class AcademicDay extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicDay = AcademicDay;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicDay.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicDay.prototype, "nameSIMAT", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Day_1.Day], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], AcademicDay.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicDay.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicDay.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicDay.prototype, "entityBaseId", void 0);
exports.AcademicDay = AcademicDay = __decorate([
    (0, typeorm_1.Index)("index_full", ["schoolYearId", "campusId", "schoolId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicDay model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicDay);
let AcademicDayEdge = class AcademicDayEdge extends (0, relaySpecs_1.EdgeType)('AcademicDay', AcademicDay) {
};
exports.AcademicDayEdge = AcademicDayEdge;
exports.AcademicDayEdge = AcademicDayEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicDayEdge);
let AcademicDayConnection = class AcademicDayConnection extends (0, relaySpecs_1.ConnectionType)('AcademicDay', AcademicDayEdge) {
};
exports.AcademicDayConnection = AcademicDayConnection;
exports.AcademicDayConnection = AcademicDayConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicDayConnection);
