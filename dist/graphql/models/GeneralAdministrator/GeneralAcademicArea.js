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
exports.GeneralAcademicAreaConnection = exports.GeneralAcademicAreaEdge = exports.GeneralAcademicArea = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let GeneralAcademicArea = class GeneralAcademicArea extends IModelData_1.IModelData {
};
exports.GeneralAcademicArea = GeneralAcademicArea;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], GeneralAcademicArea.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], GeneralAcademicArea.prototype, "hasStandard", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], GeneralAcademicArea.prototype, "hasDba", void 0);
exports.GeneralAcademicArea = GeneralAcademicArea = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The GeneralAcademicArea model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], GeneralAcademicArea);
let GeneralAcademicAreaEdge = class GeneralAcademicAreaEdge extends (0, relaySpecs_1.EdgeType)('GeneralAcademicArea', GeneralAcademicArea) {
};
exports.GeneralAcademicAreaEdge = GeneralAcademicAreaEdge;
exports.GeneralAcademicAreaEdge = GeneralAcademicAreaEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralAcademicAreaEdge);
let GeneralAcademicAreaConnection = class GeneralAcademicAreaConnection extends (0, relaySpecs_1.ConnectionType)('GeneralAcademicArea', GeneralAcademicAreaEdge) {
};
exports.GeneralAcademicAreaConnection = GeneralAcademicAreaConnection;
exports.GeneralAcademicAreaConnection = GeneralAcademicAreaConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], GeneralAcademicAreaConnection);
