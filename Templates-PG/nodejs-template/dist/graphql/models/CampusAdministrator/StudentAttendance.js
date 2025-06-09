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
exports.StudentAttendanceConnection = exports.StudentAttendanceEdge = exports.StudentAttendance = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
let StudentAttendance = class StudentAttendance extends IModelCampusData_1.IModelCampusData {
};
exports.StudentAttendance = StudentAttendance;
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentAttendance.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], StudentAttendance.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentAttendance.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], StudentAttendance.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentAttendance.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], StudentAttendance.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], StudentAttendance.prototype, "day", void 0);
exports.StudentAttendance = StudentAttendance = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAsignatureCourseId", "academicPeriodId", "studentId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The StudentAttendance model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], StudentAttendance);
let StudentAttendanceEdge = class StudentAttendanceEdge extends (0, relaySpecs_1.EdgeType)('StudentAttendance', StudentAttendance) {
};
exports.StudentAttendanceEdge = StudentAttendanceEdge;
exports.StudentAttendanceEdge = StudentAttendanceEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentAttendanceEdge);
let StudentAttendanceConnection = class StudentAttendanceConnection extends (0, relaySpecs_1.ConnectionType)('StudentAttendance', StudentAttendanceEdge) {
};
exports.StudentAttendanceConnection = StudentAttendanceConnection;
exports.StudentAttendanceConnection = StudentAttendanceConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentAttendanceConnection);
