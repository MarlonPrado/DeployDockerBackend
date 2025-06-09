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
exports.ForumConnection = exports.ForumEdge = exports.Forum = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelCampusData_1 = require("../../interfaces/IModelCampusData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const SchoolYear_1 = require("../SchoolAdministrator/SchoolYear");
const AcademicAsignatureCourse_1 = require("./AcademicAsignatureCourse");
let Forum = class Forum extends IModelCampusData_1.IModelCampusData {
};
exports.Forum = Forum;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Forum.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Forum.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Forum.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Index)("index_academicAsignatureCourseId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Forum.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], Forum.prototype, "academicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolYearId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Forum.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], Forum.prototype, "schoolYear", void 0);
exports.Forum = Forum = __decorate([
    (0, typeorm_1.Index)("index_full", ["schoolYearId", "campusId", "schoolId", "academicAsignatureCourseId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The Forum model', implements: IModelCampusData_1.IModelCampusData }),
    (0, typeorm_1.Entity)()
], Forum);
let ForumEdge = class ForumEdge extends (0, relaySpecs_1.EdgeType)('Forum', Forum) {
};
exports.ForumEdge = ForumEdge;
exports.ForumEdge = ForumEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], ForumEdge);
let ForumConnection = class ForumConnection extends (0, relaySpecs_1.ConnectionType)('Forum', ForumEdge) {
};
exports.ForumConnection = ForumConnection;
exports.ForumConnection = ForumConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], ForumConnection);
