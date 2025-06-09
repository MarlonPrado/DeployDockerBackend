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
exports.StudentYearBehaviourConnection = exports.StudentYearBehaviourEdge = exports.StudentYearBehaviour = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const PerformanceLevel_1 = require("../SchoolAdministrator/PerformanceLevel");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const Course_1 = require("./Course");
let StudentYearBehaviour = class StudentYearBehaviour extends IModelCampusData_1.IModelCampusData {
};
exports.StudentYearBehaviour = StudentYearBehaviour;
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentYearBehaviour.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], StudentYearBehaviour.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentYearBehaviour.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], StudentYearBehaviour.prototype, "schoolYear", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentYearBehaviour.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], StudentYearBehaviour.prototype, "student", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentYearBehaviour.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_performanceLevelId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentYearBehaviour.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __metadata("design:type", PerformanceLevel_1.PerformanceLevel)
], StudentYearBehaviour.prototype, "performanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentYearBehaviour.prototype, "observation", void 0);
exports.StudentYearBehaviour = StudentYearBehaviour = __decorate([
    (0, typeorm_1.Index)("index_full", ["courseId", "schoolYearId", "studentId", "performanceLevelId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The StudentYearBehaviour model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], StudentYearBehaviour);
let StudentYearBehaviourEdge = class StudentYearBehaviourEdge extends (0, relaySpecs_1.EdgeType)('StudentYearBehaviour', StudentYearBehaviour) {
};
exports.StudentYearBehaviourEdge = StudentYearBehaviourEdge;
exports.StudentYearBehaviourEdge = StudentYearBehaviourEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentYearBehaviourEdge);
let StudentYearBehaviourConnection = class StudentYearBehaviourConnection extends (0, relaySpecs_1.ConnectionType)('StudentYearBehaviour', StudentYearBehaviourEdge) {
};
exports.StudentYearBehaviourConnection = StudentYearBehaviourConnection;
exports.StudentYearBehaviourConnection = StudentYearBehaviourConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentYearBehaviourConnection);
