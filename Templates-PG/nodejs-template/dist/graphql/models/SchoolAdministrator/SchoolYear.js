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
exports.SchoolYearConnection = exports.SchoolYearEdge = exports.SchoolYear = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYearImportOptions_1 = require("./SchoolYearImportOptions");
let SchoolYear = class SchoolYear extends IModelSchoolData_1.IModelSchoolData {
};
exports.SchoolYear = SchoolYear;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SchoolYear.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], SchoolYear.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], SchoolYear.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SchoolYear.prototype, "folioNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SchoolYear.prototype, "schoolYearImportId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", SchoolYearImportOptions_1.SchoolYearImportOptions)
], SchoolYear.prototype, "schoolYearImportOptions", void 0);
exports.SchoolYear = SchoolYear = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The SchoolYear model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], SchoolYear);
let SchoolYearEdge = class SchoolYearEdge extends (0, relaySpecs_1.EdgeType)('SchoolYear', SchoolYear) {
};
exports.SchoolYearEdge = SchoolYearEdge;
exports.SchoolYearEdge = SchoolYearEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], SchoolYearEdge);
let SchoolYearConnection = class SchoolYearConnection extends (0, relaySpecs_1.ConnectionType)('SchoolYear', SchoolYearEdge) {
};
exports.SchoolYearConnection = SchoolYearConnection;
exports.SchoolYearConnection = SchoolYearConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], SchoolYearConnection);
