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
exports.AverageAcademicPeriodCourseConnection = exports.AverageAcademicPeriodCourseEdge = exports.AverageAcademicPeriodCourse = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const Course_1 = require("./Course");
let AverageAcademicPeriodCourse = class AverageAcademicPeriodCourse extends IModelCampusData_1.IModelCampusData {
};
exports.AverageAcademicPeriodCourse = AverageAcademicPeriodCourse;
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicPeriodCourse.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], AverageAcademicPeriodCourse.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicPeriodCourse.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], AverageAcademicPeriodCourse.prototype, "course", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], AverageAcademicPeriodCourse.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AverageAcademicPeriodCourse.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], AverageAcademicPeriodCourse.prototype, "performanceLevel", void 0);
exports.AverageAcademicPeriodCourse = AverageAcademicPeriodCourse = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicPeriodId", "courseId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The AverageAcademicPeriodCourse model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], AverageAcademicPeriodCourse);
let AverageAcademicPeriodCourseEdge = class AverageAcademicPeriodCourseEdge extends (0, relaySpecs_1.EdgeType)('AverageAcademicPeriodCourse', AverageAcademicPeriodCourse) {
};
exports.AverageAcademicPeriodCourseEdge = AverageAcademicPeriodCourseEdge;
exports.AverageAcademicPeriodCourseEdge = AverageAcademicPeriodCourseEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], AverageAcademicPeriodCourseEdge);
let AverageAcademicPeriodCourseConnection = class AverageAcademicPeriodCourseConnection extends (0, relaySpecs_1.ConnectionType)('AverageAcademicPeriodCourse', AverageAcademicPeriodCourseEdge) {
};
exports.AverageAcademicPeriodCourseConnection = AverageAcademicPeriodCourseConnection;
exports.AverageAcademicPeriodCourseConnection = AverageAcademicPeriodCourseConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], AverageAcademicPeriodCourseConnection);
