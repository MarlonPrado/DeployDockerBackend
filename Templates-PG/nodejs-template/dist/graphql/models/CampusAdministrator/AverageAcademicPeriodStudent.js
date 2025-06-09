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
exports.AverageAcademicPeriodStudentConnection = exports.AverageAcademicPeriodStudentEdge = exports.AverageAcademicPeriodStudent = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const Course_1 = require("./Course");
let AverageAcademicPeriodStudent = class AverageAcademicPeriodStudent extends IModelCampusData_1.IModelCampusData {
};
exports.AverageAcademicPeriodStudent = AverageAcademicPeriodStudent;
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicPeriodStudent.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], AverageAcademicPeriodStudent.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicPeriodStudent.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], AverageAcademicPeriodStudent.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicPeriodStudent.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], AverageAcademicPeriodStudent.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AverageAcademicPeriodStudent.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicPeriodStudent.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], AverageAcademicPeriodStudent.prototype, "performanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AverageAcademicPeriodStudent.prototype, "score", void 0);
exports.AverageAcademicPeriodStudent = AverageAcademicPeriodStudent = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicPeriodId", "courseId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AverageAcademicPeriodStudent model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AverageAcademicPeriodStudent);
let AverageAcademicPeriodStudentEdge = class AverageAcademicPeriodStudentEdge extends (0, relaySpecs_1.EdgeType)('AverageAcademicPeriodStudent', AverageAcademicPeriodStudent) {
};
exports.AverageAcademicPeriodStudentEdge = AverageAcademicPeriodStudentEdge;
exports.AverageAcademicPeriodStudentEdge = AverageAcademicPeriodStudentEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AverageAcademicPeriodStudentEdge);
let AverageAcademicPeriodStudentConnection = class AverageAcademicPeriodStudentConnection extends (0, relaySpecs_1.ConnectionType)('AverageAcademicPeriodStudent', AverageAcademicPeriodStudentEdge) {
};
exports.AverageAcademicPeriodStudentConnection = AverageAcademicPeriodStudentConnection;
exports.AverageAcademicPeriodStudentConnection = AverageAcademicPeriodStudentConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AverageAcademicPeriodStudentConnection);
