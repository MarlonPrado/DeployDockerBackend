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
exports.GeneralAcademicStandardConnection = exports.GeneralAcademicStandardEdge = exports.GeneralAcademicStandard = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralAcademicAsignature_1 = require("./GeneralAcademicAsignature");
const GeneralAcademicCycle_1 = require("./GeneralAcademicCycle");
let GeneralAcademicStandard = class GeneralAcademicStandard extends IModelData_1.IModelData {
};
exports.GeneralAcademicStandard = GeneralAcademicStandard;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicStandard.prototype, "standard", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicStandard.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicStandard.prototype, "subtype", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicStandard.prototype, "generalAcademicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicAsignature_1.GeneralAcademicAsignature)
], GeneralAcademicStandard.prototype, "generalAcademicAsignature", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicCycleId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicStandard.prototype, "generalAcademicCycleId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicCycle_1.GeneralAcademicCycle)
], GeneralAcademicStandard.prototype, "generalAcademicCycle", void 0);
exports.GeneralAcademicStandard = GeneralAcademicStandard = __decorate([
    (0, typeorm_1.Index)("index_full", ["generalAcademicAsignatureId", "generalAcademicCycleId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The GeneralAcademicStandard model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], GeneralAcademicStandard);
let GeneralAcademicStandardEdge = class GeneralAcademicStandardEdge extends (0, relaySpecs_1.EdgeType)('GeneralAcademicStandard', GeneralAcademicStandard) {
};
exports.GeneralAcademicStandardEdge = GeneralAcademicStandardEdge;
exports.GeneralAcademicStandardEdge = GeneralAcademicStandardEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralAcademicStandardEdge);
let GeneralAcademicStandardConnection = class GeneralAcademicStandardConnection extends (0, relaySpecs_1.ConnectionType)('GeneralAcademicStandard', GeneralAcademicStandardEdge) {
};
exports.GeneralAcademicStandardConnection = GeneralAcademicStandardConnection;
exports.GeneralAcademicStandardConnection = GeneralAcademicStandardConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralAcademicStandardConnection);
