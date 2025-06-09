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
exports.FrecuentQuestionConnection = exports.FrecuentQuestionEdge = exports.FrecuentQuestion = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Role_1 = require("./Role");
let FrecuentQuestion = class FrecuentQuestion extends IModelData_1.IModelData {
};
exports.FrecuentQuestion = FrecuentQuestion;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FrecuentQuestion.prototype, "question", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FrecuentQuestion.prototype, "response", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FrecuentQuestion.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Index)("index_rolesId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], FrecuentQuestion.prototype, "rolesId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Role_1.Role], { nullable: true }),
    __metadata("design:type", Array)
], FrecuentQuestion.prototype, "roles", void 0);
exports.FrecuentQuestion = FrecuentQuestion = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The FrecuentQuestion model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], FrecuentQuestion);
let FrecuentQuestionEdge = class FrecuentQuestionEdge extends (0, relaySpecs_1.EdgeType)('FrecuentQuestion', FrecuentQuestion) {
};
exports.FrecuentQuestionEdge = FrecuentQuestionEdge;
exports.FrecuentQuestionEdge = FrecuentQuestionEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], FrecuentQuestionEdge);
let FrecuentQuestionConnection = class FrecuentQuestionConnection extends (0, relaySpecs_1.ConnectionType)('FrecuentQuestion', FrecuentQuestionEdge) {
};
exports.FrecuentQuestionConnection = FrecuentQuestionConnection;
exports.FrecuentQuestionConnection = FrecuentQuestionConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], FrecuentQuestionConnection);
