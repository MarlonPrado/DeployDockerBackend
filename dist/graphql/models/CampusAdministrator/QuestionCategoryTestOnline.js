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
exports.QuestionCategoryTestOnlineConnection = exports.QuestionCategoryTestOnlineEdge = exports.QuestionCategoryTestOnline = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const QuestionBankTestOnline_1 = require("./QuestionBankTestOnline");
let QuestionCategoryTestOnline = class QuestionCategoryTestOnline extends IModelCampusData_1.IModelCampusData {
};
exports.QuestionCategoryTestOnline = QuestionCategoryTestOnline;
__decorate([
    (0, typeorm_1.Index)("index_questionBankTestOnlineId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionCategoryTestOnline.prototype, "questionBankTestOnlineId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", QuestionBankTestOnline_1.QuestionBankTestOnline)
], QuestionCategoryTestOnline.prototype, "questionBankTestOnline", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionCategoryTestOnline.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionCategoryTestOnline.prototype, "description", void 0);
exports.QuestionCategoryTestOnline = QuestionCategoryTestOnline = __decorate([
    (0, typeorm_1.Index)("index_full", ["questionBankTestOnlineId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The QuestionCategoryTestOnline model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], QuestionCategoryTestOnline);
let QuestionCategoryTestOnlineEdge = class QuestionCategoryTestOnlineEdge extends (0, relaySpecs_1.EdgeType)('QuestionCategoryTestOnline', QuestionCategoryTestOnline) {
};
exports.QuestionCategoryTestOnlineEdge = QuestionCategoryTestOnlineEdge;
exports.QuestionCategoryTestOnlineEdge = QuestionCategoryTestOnlineEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], QuestionCategoryTestOnlineEdge);
let QuestionCategoryTestOnlineConnection = class QuestionCategoryTestOnlineConnection extends (0, relaySpecs_1.ConnectionType)('QuestionCategoryTestOnline', QuestionCategoryTestOnlineEdge) {
};
exports.QuestionCategoryTestOnlineConnection = QuestionCategoryTestOnlineConnection;
exports.QuestionCategoryTestOnlineConnection = QuestionCategoryTestOnlineConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], QuestionCategoryTestOnlineConnection);
