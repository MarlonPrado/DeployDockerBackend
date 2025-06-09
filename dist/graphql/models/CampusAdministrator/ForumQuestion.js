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
exports.ForumQuestionConnection = exports.ForumQuestionEdge = exports.ForumQuestion = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const Forum_1 = require("./Forum");
let ForumQuestion = class ForumQuestion extends IModelCampusData_1.IModelCampusData {
};
exports.ForumQuestion = ForumQuestion;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ForumQuestion.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ForumQuestion.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ForumQuestion.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Index)("index_forumId"),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ForumQuestion.prototype, "forumId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Forum_1.Forum, { nullable: true }),
    __metadata("design:type", Forum_1.Forum)
], ForumQuestion.prototype, "forum", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ForumQuestion.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], ForumQuestion.prototype, "schoolYear", void 0);
exports.ForumQuestion = ForumQuestion = __decorate([
    (0, typeorm_1.Index)("index_full", ["schoolYearId", "campusId", "schoolId", "forumId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The ForumQuestionQuestion model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], ForumQuestion);
let ForumQuestionEdge = class ForumQuestionEdge extends (0, relaySpecs_1.EdgeType)('ForumQuestion', ForumQuestion) {
};
exports.ForumQuestionEdge = ForumQuestionEdge;
exports.ForumQuestionEdge = ForumQuestionEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ForumQuestionEdge);
let ForumQuestionConnection = class ForumQuestionConnection extends (0, relaySpecs_1.ConnectionType)('ForumQuestion', ForumQuestionEdge) {
};
exports.ForumQuestionConnection = ForumQuestionConnection;
exports.ForumQuestionConnection = ForumQuestionConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ForumQuestionConnection);
