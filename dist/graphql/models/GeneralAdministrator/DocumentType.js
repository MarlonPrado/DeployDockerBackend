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
exports.DocumentTypeConnection = exports.DocumentTypeEdge = exports.DocumentType = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let DocumentType = class DocumentType extends IModelData_1.IModelData {
};
exports.DocumentType = DocumentType;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentType.prototype, "code", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentType.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentType.prototype, "description", void 0);
exports.DocumentType = DocumentType = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The Document Type model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], DocumentType);
let DocumentTypeEdge = class DocumentTypeEdge extends (0, relaySpecs_1.EdgeType)('DocumentType', DocumentType) {
};
exports.DocumentTypeEdge = DocumentTypeEdge;
exports.DocumentTypeEdge = DocumentTypeEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], DocumentTypeEdge);
let DocumentTypeConnection = class DocumentTypeConnection extends (0, relaySpecs_1.ConnectionType)('DocumentType', DocumentTypeEdge) {
};
exports.DocumentTypeConnection = DocumentTypeConnection;
exports.DocumentTypeConnection = DocumentTypeConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], DocumentTypeConnection);
