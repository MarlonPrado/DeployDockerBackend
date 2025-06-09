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
exports.CursosConnection = exports.CursosEdge = exports.Cursos = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let Cursos = class Cursos extends IModelData_1.IModelData {
};
exports.Cursos = Cursos;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cursos.prototype, "dane", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cursos.prototype, "consecutivo", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cursos.prototype, "jornada", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cursos.prototype, "grado_cod", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cursos.prototype, "grupo", void 0);
exports.Cursos = Cursos = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The Cursos model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], Cursos);
let CursosEdge = class CursosEdge extends (0, relaySpecs_1.EdgeType)('Cursos', Cursos) {
};
exports.CursosEdge = CursosEdge;
exports.CursosEdge = CursosEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], CursosEdge);
let CursosConnection = class CursosConnection extends (0, relaySpecs_1.ConnectionType)('Cursos', CursosEdge) {
};
exports.CursosConnection = CursosConnection;
exports.CursosConnection = CursosConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], CursosConnection);
