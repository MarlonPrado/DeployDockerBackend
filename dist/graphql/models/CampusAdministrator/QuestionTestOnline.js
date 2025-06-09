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
exports.QuestionTestOnlineConnection = exports.QuestionTestOnlineEdge = exports.QuestionTestOnline = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const QuestionTypeTestOnline_1 = require("../../enums/QuestionTypeTestOnline");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const QuestionCategoryTestOnline_1 = require("./QuestionCategoryTestOnline");
let QuestionTestOnline = class QuestionTestOnline extends IModelCampusData_1.IModelCampusData {
};
exports.QuestionTestOnline = QuestionTestOnline;
__decorate([
    (0, typeorm_1.Index)("index_questionCategoryTestOnlineId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionTestOnline.prototype, "questionCategoryTestOnlineId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", QuestionCategoryTestOnline_1.QuestionCategoryTestOnline)
], QuestionTestOnline.prototype, "questionCategoryTestOnline", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => QuestionTypeTestOnline_1.QuestionTypeTestOnline, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionTestOnline.prototype, "questionType", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionTestOnline.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionTestOnline.prototype, "statement", void 0);
exports.QuestionTestOnline = QuestionTestOnline = __decorate([
    (0, typeorm_1.Index)("index_full", ["questionCategoryTestOnlineId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The QuestionTestOnline model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], QuestionTestOnline);
let QuestionTestOnlineEdge = class QuestionTestOnlineEdge extends (0, relaySpecs_1.EdgeType)('QuestionTestOnline', QuestionTestOnline) {
};
exports.QuestionTestOnlineEdge = QuestionTestOnlineEdge;
exports.QuestionTestOnlineEdge = QuestionTestOnlineEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], QuestionTestOnlineEdge);
let QuestionTestOnlineConnection = class QuestionTestOnlineConnection extends (0, relaySpecs_1.ConnectionType)('QuestionTestOnline', QuestionTestOnlineEdge) {
};
exports.QuestionTestOnlineConnection = QuestionTestOnlineConnection;
exports.QuestionTestOnlineConnection = QuestionTestOnlineConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], QuestionTestOnlineConnection);
