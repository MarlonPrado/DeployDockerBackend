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
exports.PlantaDocenteConnection = exports.PlantaDocenteEdge = exports.PlantaDocente = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let PlantaDocente = class PlantaDocente extends IModelData_1.IModelData {
};
exports.PlantaDocente = PlantaDocente;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "documento", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "empleado", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "cargo", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "municipio", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "school_id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "sede_dane", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "fechanacimiento", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "sexo", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "telefono", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlantaDocente.prototype, "direccion", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], PlantaDocente.prototype, "procesado", void 0);
exports.PlantaDocente = PlantaDocente = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The PlantaDocente model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], PlantaDocente);
let PlantaDocenteEdge = class PlantaDocenteEdge extends (0, relaySpecs_1.EdgeType)('PlantaDocente', PlantaDocente) {
};
exports.PlantaDocenteEdge = PlantaDocenteEdge;
exports.PlantaDocenteEdge = PlantaDocenteEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], PlantaDocenteEdge);
let PlantaDocenteConnection = class PlantaDocenteConnection extends (0, relaySpecs_1.ConnectionType)('PlantaDocente', PlantaDocenteEdge) {
};
exports.PlantaDocenteConnection = PlantaDocenteConnection;
exports.PlantaDocenteConnection = PlantaDocenteConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], PlantaDocenteConnection);
