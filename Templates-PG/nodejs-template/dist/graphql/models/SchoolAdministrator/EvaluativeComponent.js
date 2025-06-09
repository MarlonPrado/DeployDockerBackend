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
exports.EvaluativeComponentConnection = exports.EvaluativeComponentEdge = exports.EvaluativeComponent = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const EvaluativeComponentType_1 = require("../../enums/EvaluativeComponentType");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicArea_1 = require("./AcademicArea");
const AcademicAsignature_1 = require("./AcademicAsignature");
const SchoolYear_1 = require("./SchoolYear");
let EvaluativeComponent = class EvaluativeComponent extends IModelSchoolData_1.IModelSchoolData {
};
exports.EvaluativeComponent = EvaluativeComponent;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EvaluativeComponent.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EvaluativeComponent.prototype, "weight", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => EvaluativeComponentType_1.EvaluativeComponentType, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EvaluativeComponent.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignaturesId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], EvaluativeComponent.prototype, "academicAsignaturesId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [AcademicAsignature_1.AcademicAsignature], { nullable: true }),
    __metadata("design:type", Array)
], EvaluativeComponent.prototype, "academicAsignatures", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAreasId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], EvaluativeComponent.prototype, "academicAreasId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [AcademicArea_1.AcademicArea], { nullable: true }),
    __metadata("design:type", Array)
], EvaluativeComponent.prototype, "academicAreas", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EvaluativeComponent.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], EvaluativeComponent.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EvaluativeComponent.prototype, "entityBaseId", void 0);
exports.EvaluativeComponent = EvaluativeComponent = __decorate([
    (0, typeorm_1.Index)("index_full_academicAsignatures", ["academicAsignaturesId", "schoolId", "schoolYearId"]),
    (0, typeorm_1.Index)("index_full_academicAreas", ["academicAreasId", "schoolId", "schoolYearId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The EvaluativeComponent model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], EvaluativeComponent);
let EvaluativeComponentEdge = class EvaluativeComponentEdge extends (0, relaySpecs_1.EdgeType)('EvaluativeComponent', EvaluativeComponent) {
};
exports.EvaluativeComponentEdge = EvaluativeComponentEdge;
exports.EvaluativeComponentEdge = EvaluativeComponentEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], EvaluativeComponentEdge);
let EvaluativeComponentConnection = class EvaluativeComponentConnection extends (0, relaySpecs_1.ConnectionType)('EvaluativeComponent', EvaluativeComponentEdge) {
};
exports.EvaluativeComponentConnection = EvaluativeComponentConnection;
exports.EvaluativeComponentConnection = EvaluativeComponentConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], EvaluativeComponentConnection);
