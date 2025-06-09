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
exports.GeneralAcademicAsignatureConnection = exports.GeneralAcademicAsignatureEdge = exports.GeneralAcademicAsignature = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const GeneralAcademicArea_1 = require("./GeneralAcademicArea");
let GeneralAcademicAsignature = class GeneralAcademicAsignature extends IModelData_1.IModelData {
};
exports.GeneralAcademicAsignature = GeneralAcademicAsignature;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicAsignature.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)("index_generalAcademicAreaId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicAsignature.prototype, "generalAcademicAreaId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", GeneralAcademicArea_1.GeneralAcademicArea)
], GeneralAcademicAsignature.prototype, "generalAcademicArea", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], GeneralAcademicAsignature.prototype, "hasStandard", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], GeneralAcademicAsignature.prototype, "hasDba", void 0);
exports.GeneralAcademicAsignature = GeneralAcademicAsignature = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The GeneralAcademicAsignature model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], GeneralAcademicAsignature);
let GeneralAcademicAsignatureEdge = class GeneralAcademicAsignatureEdge extends (0, relaySpecs_1.EdgeType)('GeneralAcademicAsignature', GeneralAcademicAsignature) {
};
exports.GeneralAcademicAsignatureEdge = GeneralAcademicAsignatureEdge;
exports.GeneralAcademicAsignatureEdge = GeneralAcademicAsignatureEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralAcademicAsignatureEdge);
let GeneralAcademicAsignatureConnection = class GeneralAcademicAsignatureConnection extends (0, relaySpecs_1.ConnectionType)('GeneralAcademicAsignature', GeneralAcademicAsignatureEdge) {
};
exports.GeneralAcademicAsignatureConnection = GeneralAcademicAsignatureConnection;
exports.GeneralAcademicAsignatureConnection = GeneralAcademicAsignatureConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralAcademicAsignatureConnection);
