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
exports.StudentBehaviourConnection = exports.StudentBehaviourEdge = exports.StudentBehaviour = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const Course_1 = require("./Course");
let StudentBehaviour = class StudentBehaviour extends IModelCampusData_1.IModelCampusData {
};
exports.StudentBehaviour = StudentBehaviour;
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentBehaviour.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], StudentBehaviour.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentBehaviour.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], StudentBehaviour.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentBehaviour.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], StudentBehaviour.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentBehaviour.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentBehaviour.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], StudentBehaviour.prototype, "performanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentBehaviour.prototype, "observation", void 0);
exports.StudentBehaviour = StudentBehaviour = __decorate([
    (0, typeorm_1.Index)("index_full", ["courseId", "academicPeriodId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The StudentBehaviour model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], StudentBehaviour);
let StudentBehaviourEdge = class StudentBehaviourEdge extends (0, relaySpecs_1.EdgeType)('StudentBehaviour', StudentBehaviour) {
};
exports.StudentBehaviourEdge = StudentBehaviourEdge;
exports.StudentBehaviourEdge = StudentBehaviourEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentBehaviourEdge);
let StudentBehaviourConnection = class StudentBehaviourConnection extends (0, relaySpecs_1.ConnectionType)('StudentBehaviour', StudentBehaviourEdge) {
};
exports.StudentBehaviourConnection = StudentBehaviourConnection;
exports.StudentBehaviourConnection = StudentBehaviourConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentBehaviourConnection);
