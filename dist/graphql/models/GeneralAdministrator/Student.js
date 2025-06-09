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
exports.StudentConnection = exports.StudentEdge = exports.Student = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Course_1 = require("../CampusAdministrator/Course");
const AcademicGrade_1 = require("../SchoolAdministrator/AcademicGrade");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const Campus_1 = require("./Campus");
const School_1 = require("./School");
const User_1 = require("./User");
let Student = class Student extends IModelData_1.IModelData {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.Index)("index_schoolId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], Student.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [School_1.School], { nullable: true }),
    __metadata("design:type", Array)
], Student.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Index)("index_campusId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], Student.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Campus_1.Campus], { nullable: true }),
    __metadata("design:type", Array)
], Student.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicGrade_1.AcademicGrade)
], Student.prototype, "academicGrade", void 0);
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], Student.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Index)("index_userId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", User_1.User)
], Student.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Student.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], Student.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Student.prototype, "entityBaseId", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Index)("index_full_school", ["schoolId", "academicGradeId", "courseId", "userId", "schoolYearId"]),
    (0, typeorm_1.Index)("index_full_campus", ["campusId", "academicGradeId", "courseId", "userId", "schoolYearId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The Student model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], Student);
let StudentEdge = class StudentEdge extends (0, relaySpecs_1.EdgeType)('Student', Student) {
};
exports.StudentEdge = StudentEdge;
exports.StudentEdge = StudentEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentEdge);
let StudentConnection = class StudentConnection extends (0, relaySpecs_1.ConnectionType)('Student', StudentEdge) {
};
exports.StudentConnection = StudentConnection;
exports.StudentConnection = StudentConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentConnection);
