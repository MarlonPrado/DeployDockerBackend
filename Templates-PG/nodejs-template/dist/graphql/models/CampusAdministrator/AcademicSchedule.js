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
exports.AcademicScheduleConnection = exports.AcademicScheduleEdge = exports.AcademicSchedule = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Day_1 = require("../../enums/Day");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
const AcademicHour_1 = require("./AcademicHour");
const Course_1 = require("./Course");
const Teacher_1 = require("./Teacher");
let AcademicSchedule = class AcademicSchedule extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicSchedule = AcademicSchedule;
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicSchedule.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], AcademicSchedule.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicSchedule.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], AcademicSchedule.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Index)("index_teacherId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicSchedule.prototype, "teacherId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Teacher_1.Teacher)
], AcademicSchedule.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.Index)("index_startAcademicHourId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicSchedule.prototype, "startAcademicHourId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicHour_1.AcademicHour)
], AcademicSchedule.prototype, "startAcademicHour", void 0);
__decorate([
    (0, typeorm_1.Index)("index_endAcademicHourId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicSchedule.prototype, "endAcademicHourId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicHour_1.AcademicHour)
], AcademicSchedule.prototype, "endAcademicHour", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicSchedule.prototype, "day", void 0);
exports.AcademicSchedule = AcademicSchedule = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAsignatureCourseId", "courseId", "teacherId", "startAcademicHourId", "endAcademicHourId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicSchedule model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicSchedule);
let AcademicScheduleEdge = class AcademicScheduleEdge extends (0, relaySpecs_1.EdgeType)('AcademicSchedule', AcademicSchedule) {
};
exports.AcademicScheduleEdge = AcademicScheduleEdge;
exports.AcademicScheduleEdge = AcademicScheduleEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicScheduleEdge);
let AcademicScheduleConnection = class AcademicScheduleConnection extends (0, relaySpecs_1.ConnectionType)('AcademicSchedule', AcademicScheduleEdge) {
};
exports.AcademicScheduleConnection = AcademicScheduleConnection;
exports.AcademicScheduleConnection = AcademicScheduleConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicScheduleConnection);
