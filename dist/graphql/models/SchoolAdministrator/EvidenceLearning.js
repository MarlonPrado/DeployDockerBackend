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
exports.EvidenceLearningConnection = exports.EvidenceLearningEdge = exports.EvidenceLearning = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Learning_1 = require("./Learning");
let EvidenceLearning = class EvidenceLearning extends IModelSchoolData_1.IModelSchoolData {
};
exports.EvidenceLearning = EvidenceLearning;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EvidenceLearning.prototype, "statement", void 0);
__decorate([
    (0, typeorm_1.Index)("index_learningId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EvidenceLearning.prototype, "learningId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Learning_1.Learning)
], EvidenceLearning.prototype, "learning", void 0);
exports.EvidenceLearning = EvidenceLearning = __decorate([
    (0, typeorm_1.Index)("index_full", ["learningId", "schoolId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The EvidenceLearning model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], EvidenceLearning);
let EvidenceLearningEdge = class EvidenceLearningEdge extends (0, relaySpecs_1.EdgeType)('EvidenceLearning', EvidenceLearning) {
};
exports.EvidenceLearningEdge = EvidenceLearningEdge;
exports.EvidenceLearningEdge = EvidenceLearningEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], EvidenceLearningEdge);
let EvidenceLearningConnection = class EvidenceLearningConnection extends (0, relaySpecs_1.ConnectionType)('EvidenceLearning', EvidenceLearningEdge) {
};
exports.EvidenceLearningConnection = EvidenceLearningConnection;
exports.EvidenceLearningConnection = EvidenceLearningConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], EvidenceLearningConnection);
