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
exports.GradeAssignmentConnection = exports.GradeAssignmentEdge = exports.GradeAssignment = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicAsignature_1 = require("./AcademicAsignature");
const AcademicGrade_1 = require("./AcademicGrade");
const SchoolYear_1 = require("./SchoolYear");
let GradeAssignment = class GradeAssignment extends IModelSchoolData_1.IModelSchoolData {
};
exports.GradeAssignment = GradeAssignment;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], GradeAssignment.prototype, "minHourlyIntensity", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], GradeAssignment.prototype, "maxHourlyIntensity", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GradeAssignment.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicGrade_1.AcademicGrade)
], GradeAssignment.prototype, "academicGrade", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GradeAssignment.prototype, "academicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignature_1.AcademicAsignature)
], GradeAssignment.prototype, "academicAsignature", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GradeAssignment.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], GradeAssignment.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GradeAssignment.prototype, "entityBaseId", void 0);
exports.GradeAssignment = GradeAssignment = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicGradeId", "academicAsignatureId", "schoolId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The GradeAssignment model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], GradeAssignment);
let GradeAssignmentEdge = class GradeAssignmentEdge extends (0, relaySpecs_1.EdgeType)('GradeAssignment', GradeAssignment) {
};
exports.GradeAssignmentEdge = GradeAssignmentEdge;
exports.GradeAssignmentEdge = GradeAssignmentEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], GradeAssignmentEdge);
let GradeAssignmentConnection = class GradeAssignmentConnection extends (0, relaySpecs_1.ConnectionType)('GradeAssignment', GradeAssignmentEdge) {
};
exports.GradeAssignmentConnection = GradeAssignmentConnection;
exports.GradeAssignmentConnection = GradeAssignmentConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], GradeAssignmentConnection);
