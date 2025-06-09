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
exports.EducationLevelConnection = exports.EducationLevelEdge = exports.EducationLevel = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYear_1 = require("./SchoolYear");
let EducationLevel = class EducationLevel extends IModelSchoolData_1.IModelSchoolData {
};
exports.EducationLevel = EducationLevel;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EducationLevel.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EducationLevel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EducationLevel.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], EducationLevel.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EducationLevel.prototype, "entityBaseId", void 0);
exports.EducationLevel = EducationLevel = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The EducationLevel model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)("index_full", ["schoolYearId", "schoolId"])
], EducationLevel);
let EducationLevelEdge = class EducationLevelEdge extends (0, relaySpecs_1.EdgeType)('EducationLevel', EducationLevel) {
};
exports.EducationLevelEdge = EducationLevelEdge;
exports.EducationLevelEdge = EducationLevelEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], EducationLevelEdge);
let EducationLevelConnection = class EducationLevelConnection extends (0, relaySpecs_1.ConnectionType)('EducationLevel', EducationLevelEdge) {
};
exports.EducationLevelConnection = EducationLevelConnection;
exports.EducationLevelConnection = EducationLevelConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], EducationLevelConnection);
