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
exports.TeacherConnection = exports.TeacherEdge = exports.Teacher = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Campus_1 = require("../GeneralAdministrator/Campus");
const School_1 = require("../GeneralAdministrator/School");
const User_1 = require("../GeneralAdministrator/User");
const AcademicAsignature_1 = require("../SchoolAdministrator/AcademicAsignature");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
let Teacher = class Teacher extends IModelData_1.IModelData {
};
exports.Teacher = Teacher;
__decorate([
    (0, typeorm_1.Index)("index_schoolId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], Teacher.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [School_1.School], { nullable: true }),
    __metadata("design:type", Array)
], Teacher.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Index)("index_campusId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], Teacher.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Campus_1.Campus], { nullable: true }),
    __metadata("design:type", Array)
], Teacher.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Index)("index_userId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", User_1.User)
], Teacher.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], Teacher.prototype, "academicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [AcademicAsignature_1.AcademicAsignature], { nullable: true }),
    __metadata("design:type", Array)
], Teacher.prototype, "academicAsignature", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "attentionSchedule", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => SchoolYear_1.SchoolYear, { nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], Teacher.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Teacher.prototype, "entityBaseId", void 0);
exports.Teacher = Teacher = __decorate([
    (0, typeorm_1.Index)("index_full_school", ["schoolId", "userId", "academicAsignatureId", "schoolYearId"]),
    (0, typeorm_1.Index)("index_full_campus", ["campusId", "userId", "academicAsignatureId", "schoolYearId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The Teacher model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], Teacher);
let TeacherEdge = class TeacherEdge extends (0, relaySpecs_1.EdgeType)('Teacher', Teacher) {
};
exports.TeacherEdge = TeacherEdge;
exports.TeacherEdge = TeacherEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], TeacherEdge);
let TeacherConnection = class TeacherConnection extends (0, relaySpecs_1.ConnectionType)('Teacher', TeacherEdge) {
};
exports.TeacherConnection = TeacherConnection;
exports.TeacherConnection = TeacherConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], TeacherConnection);
