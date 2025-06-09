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
exports.ForumInteractionConnection = exports.ForumInteractionEdge = exports.ForumInteraction = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const ForumQuestion_1 = require("./ForumQuestion");
let ForumInteraction = class ForumInteraction extends IModelCampusData_1.IModelCampusData {
};
exports.ForumInteraction = ForumInteraction;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ForumInteraction.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Index)("index_forumQuestionId"),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ForumInteraction.prototype, "forumQuestionId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ForumQuestion_1.ForumQuestion, { nullable: true }),
    __metadata("design:type", ForumQuestion_1.ForumQuestion)
], ForumInteraction.prototype, "forumQuestion", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ForumInteraction.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], ForumInteraction.prototype, "schoolYear", void 0);
exports.ForumInteraction = ForumInteraction = __decorate([
    (0, typeorm_1.Index)("index_full", ["schoolYearId", "campusId", "schoolId", "forumQuestionId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The ForumInteraction model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], ForumInteraction);
let ForumInteractionEdge = class ForumInteractionEdge extends (0, relaySpecs_1.EdgeType)('ForumInteraction', ForumInteraction) {
};
exports.ForumInteractionEdge = ForumInteractionEdge;
exports.ForumInteractionEdge = ForumInteractionEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ForumInteractionEdge);
let ForumInteractionConnection = class ForumInteractionConnection extends (0, relaySpecs_1.ConnectionType)('ForumInteraction', ForumInteractionEdge) {
};
exports.ForumInteractionConnection = ForumInteractionConnection;
exports.ForumInteractionConnection = ForumInteractionConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ForumInteractionConnection);
