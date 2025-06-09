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
exports.AcademicAsignatureCourseConnection = exports.AcademicAsignatureCourseEdge = exports.AcademicAsignatureCourse = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicAsignature_1 = require("../SchoolAdministrator/AcademicAsignature");
const GradeAssignment_1 = require("../SchoolAdministrator/GradeAssignment");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const Course_1 = require("./Course");
const Teacher_1 = require("./Teacher");
let AcademicAsignatureCourse = class AcademicAsignatureCourse extends IModelCampusData_1.IModelCampusData {
};
exports.AcademicAsignatureCourse = AcademicAsignatureCourse;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAsignatureCourse.prototype, "hourlyIntensity", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourse.prototype, "academicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignature_1.AcademicAsignature)
], AcademicAsignatureCourse.prototype, "academicAsignature", void 0);
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourse.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], AcademicAsignatureCourse.prototype, "course", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AcademicAsignatureCourse.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Index)("index_teacherId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourse.prototype, "teacherId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Teacher_1.Teacher)
], AcademicAsignatureCourse.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.Index)("index_gradeAssignmentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourse.prototype, "gradeAssignmentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GradeAssignment_1.GradeAssignment)
], AcademicAsignatureCourse.prototype, "gradeAssignment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourse.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AcademicAsignatureCourse.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AcademicAsignatureCourse.prototype, "entityBaseId", void 0);
exports.AcademicAsignatureCourse = AcademicAsignatureCourse = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAsignatureId", "courseId", "teacherId", "gradeAssignmentId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AcademicAsignatureCourse model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AcademicAsignatureCourse);
let AcademicAsignatureCourseEdge = class AcademicAsignatureCourseEdge extends (0, relaySpecs_1.EdgeType)('AcademicAsignatureCourse', AcademicAsignatureCourse) {
};
exports.AcademicAsignatureCourseEdge = AcademicAsignatureCourseEdge;
exports.AcademicAsignatureCourseEdge = AcademicAsignatureCourseEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureCourseEdge);
let AcademicAsignatureCourseConnection = class AcademicAsignatureCourseConnection extends (0, relaySpecs_1.ConnectionType)('AcademicAsignatureCourse', AcademicAsignatureCourseEdge) {
};
exports.AcademicAsignatureCourseConnection = AcademicAsignatureCourseConnection;
exports.AcademicAsignatureCourseConnection = AcademicAsignatureCourseConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AcademicAsignatureCourseConnection);
