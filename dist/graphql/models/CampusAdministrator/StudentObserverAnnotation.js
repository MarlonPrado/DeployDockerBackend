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
exports.StudentObserverAnnotationConnection = exports.StudentObserverAnnotationEdge = exports.StudentObserverAnnotation = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Student_1 = require("../GeneralAdministrator/Student");
const AcademicPeriod_1 = require("../SchoolAdministrator/AcademicPeriod");
const ObserverAnnotationType_1 = require("../SchoolAdministrator/ObserverAnnotationType");
const Course_1 = require("./Course");
let StudentObserverAnnotation = class StudentObserverAnnotation extends IModelCampusData_1.IModelCampusData {
};
exports.StudentObserverAnnotation = StudentObserverAnnotation;
__decorate([
    (0, typeorm_1.Index)("index_courseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentObserverAnnotation.prototype, "courseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Course_1.Course)
], StudentObserverAnnotation.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicPeriodId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentObserverAnnotation.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], StudentObserverAnnotation.prototype, "academicPeriod", void 0);
__decorate([
    (0, typeorm_1.Index)("index_studentId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentObserverAnnotation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Student_1.Student)
], StudentObserverAnnotation.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.Index)("index_observerAnnotationTypeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentObserverAnnotation.prototype, "observerAnnotationTypeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", ObserverAnnotationType_1.ObserverAnnotationType)
], StudentObserverAnnotation.prototype, "observerAnnotationType", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentObserverAnnotation.prototype, "observation", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StudentObserverAnnotation.prototype, "commitment", void 0);
exports.StudentObserverAnnotation = StudentObserverAnnotation = __decorate([
    (0, typeorm_1.Index)("index_full", ["courseId", "academicPeriodId", "studentId", "observerAnnotationTypeId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The StudentObserverAnnotation model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], StudentObserverAnnotation);
let StudentObserverAnnotationEdge = class StudentObserverAnnotationEdge extends (0, relaySpecs_1.EdgeType)('StudentObserverAnnotation', StudentObserverAnnotation) {
};
exports.StudentObserverAnnotationEdge = StudentObserverAnnotationEdge;
exports.StudentObserverAnnotationEdge = StudentObserverAnnotationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentObserverAnnotationEdge);
let StudentObserverAnnotationConnection = class StudentObserverAnnotationConnection extends (0, relaySpecs_1.ConnectionType)('StudentObserverAnnotation', StudentObserverAnnotationEdge) {
};
exports.StudentObserverAnnotationConnection = StudentObserverAnnotationConnection;
exports.StudentObserverAnnotationConnection = StudentObserverAnnotationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], StudentObserverAnnotationConnection);
