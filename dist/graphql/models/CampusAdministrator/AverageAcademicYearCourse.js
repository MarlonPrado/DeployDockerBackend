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
exports.AverageAcademicYearCourseConnection = exports.AverageAcademicYearCourseEdge = exports.AverageAcademicYearCourse = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const Course_1 = require("./Course");
let AverageAcademicYearCourse = class AverageAcademicYearCourse extends IModelCampusData_1.IModelCampusData {
};
exports.AverageAcademicYearCourse = AverageAcademicYearCourse;
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicYearCourse.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], AverageAcademicYearCourse.prototype, "schoolYear", void 0);
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicYearCourse.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], AverageAcademicYearCourse.prototype, "course", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AverageAcademicYearCourse.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicYearCourse.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], AverageAcademicYearCourse.prototype, "performanceLevel", void 0);
exports.AverageAcademicYearCourse = AverageAcademicYearCourse = __decorate([
    (0, typeorm_1.Index)("index_full", ["schoolYearId", "courseId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AverageAcademicYearCourse model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AverageAcademicYearCourse);
let AverageAcademicYearCourseEdge = class AverageAcademicYearCourseEdge extends (0, relaySpecs_1.EdgeType)('AverageAcademicYearCourse', AverageAcademicYearCourse) {
};
exports.AverageAcademicYearCourseEdge = AverageAcademicYearCourseEdge;
exports.AverageAcademicYearCourseEdge = AverageAcademicYearCourseEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AverageAcademicYearCourseEdge);
let AverageAcademicYearCourseConnection = class AverageAcademicYearCourseConnection extends (0, relaySpecs_1.ConnectionType)('AverageAcademicYearCourse', AverageAcademicYearCourseEdge) {
};
exports.AverageAcademicYearCourseConnection = AverageAcademicYearCourseConnection;
exports.AverageAcademicYearCourseConnection = AverageAcademicYearCourseConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AverageAcademicYearCourseConnection);
