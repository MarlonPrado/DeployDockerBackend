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
exports.SchoolConfigurationConnection = exports.SchoolConfigurationEdge = exports.SchoolConfiguration = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYear_1 = require("./SchoolYear");
let SchoolConfiguration = class SchoolConfiguration extends IModelSchoolData_1.IModelSchoolData {
};
exports.SchoolConfiguration = SchoolConfiguration;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SchoolConfiguration.prototype, "code", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SchoolConfiguration.prototype, "valueNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SchoolConfiguration.prototype, "valueString", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SchoolConfiguration.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], SchoolConfiguration.prototype, "schoolYear", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SchoolConfiguration.prototype, "entityBaseId", void 0);
exports.SchoolConfiguration = SchoolConfiguration = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The SchoolConfiguration model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], SchoolConfiguration);
let SchoolConfigurationEdge = class SchoolConfigurationEdge extends (0, relaySpecs_1.EdgeType)('SchoolConfiguration', SchoolConfiguration) {
};
exports.SchoolConfigurationEdge = SchoolConfigurationEdge;
exports.SchoolConfigurationEdge = SchoolConfigurationEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], SchoolConfigurationEdge);
let SchoolConfigurationConnection = class SchoolConfigurationConnection extends (0, relaySpecs_1.ConnectionType)('SchoolConfiguration', SchoolConfigurationEdge) {
};
exports.SchoolConfigurationConnection = SchoolConfigurationConnection;
exports.SchoolConfigurationConnection = SchoolConfigurationConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], SchoolConfigurationConnection);
