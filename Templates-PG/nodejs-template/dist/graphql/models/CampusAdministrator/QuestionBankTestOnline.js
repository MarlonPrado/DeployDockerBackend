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
exports.QuestionBankTestOnlineConnection = exports.QuestionBankTestOnlineEdge = exports.QuestionBankTestOnline = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicAsignature_1 = require("../SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../SchoolAdministrator/AcademicGrade");
const Teacher_1 = require("./Teacher");
let QuestionBankTestOnline = class QuestionBankTestOnline extends IModelCampusData_1.IModelCampusData {
};
exports.QuestionBankTestOnline = QuestionBankTestOnline;
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionBankTestOnline.prototype, "academicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignature_1.AcademicAsignature)
], QuestionBankTestOnline.prototype, "academicAsignature", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicGradeId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionBankTestOnline.prototype, "academicGradeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicGrade_1.AcademicGrade)
], QuestionBankTestOnline.prototype, "academicGrade", void 0);
__decorate([
    (0, typeorm_1.Index)("index_teacherId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionBankTestOnline.prototype, "teacherId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Teacher_1.Teacher)
], QuestionBankTestOnline.prototype, "teacher", void 0);
exports.QuestionBankTestOnline = QuestionBankTestOnline = __decorate([
    (0, typeorm_1.Index)("index_full", ["academicAsignatureId", "academicGradeId", "teacherId", "campusId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The QuestionBankTestOnline model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], QuestionBankTestOnline);
let QuestionBankTestOnlineEdge = class QuestionBankTestOnlineEdge extends (0, relaySpecs_1.EdgeType)('QuestionBankTestOnline', QuestionBankTestOnline) {
};
exports.QuestionBankTestOnlineEdge = QuestionBankTestOnlineEdge;
exports.QuestionBankTestOnlineEdge = QuestionBankTestOnlineEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], QuestionBankTestOnlineEdge);
let QuestionBankTestOnlineConnection = class QuestionBankTestOnlineConnection extends (0, relaySpecs_1.ConnectionType)('QuestionBankTestOnline', QuestionBankTestOnlineEdge) {
};
exports.QuestionBankTestOnlineConnection = QuestionBankTestOnlineConnection;
exports.QuestionBankTestOnlineConnection = QuestionBankTestOnlineConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], QuestionBankTestOnlineConnection);
