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
exports.SyncOfflineConnection = exports.SyncOfflineEdge = exports.SyncOffline = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelSchoolData_1 = require("../../interfaces/IModelSchoolData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicPeriod_1 = require("./AcademicPeriod");
const SchoolYear_1 = require("./SchoolYear");
const SyncOfflineDescription_1 = require("./objectType/SyncOfflineDescription");
let SyncOffline = class SyncOffline extends IModelSchoolData_1.IModelSchoolData {
};
exports.SyncOffline = SyncOffline;
__decorate([
    (0, typeorm_1.Index)('index_schoolYearId'),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SyncOffline.prototype, "schoolYearId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", SchoolYear_1.SchoolYear)
], SyncOffline.prototype, "schoolYear", void 0);
__decorate([
    (0, typeorm_1.Index)('index_academicPeriodId'),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SyncOffline.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", AcademicPeriod_1.AcademicPeriod)
], SyncOffline.prototype, "academicPeriod", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [SyncOfflineDescription_1.SyncOfflineDescription], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], SyncOffline.prototype, "syncOfflineDescriptions", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], SyncOffline.prototype, "startDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], SyncOffline.prototype, "endDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], SyncOffline.prototype, "finish", void 0);
exports.SyncOffline = SyncOffline = __decorate([
    (0, typeorm_1.Index)('index_full', ['schoolId', 'schoolYearId']),
    (0, type_graphql_1.ObjectType)({ description: 'The SyncOffline model', implements: IModelSchoolData_1.IModelSchoolData }),
    (0, typeorm_1.Entity)()
], SyncOffline);
let SyncOfflineEdge = class SyncOfflineEdge extends (0, relaySpecs_1.EdgeType)('SyncOffline', SyncOffline) {
};
exports.SyncOfflineEdge = SyncOfflineEdge;
exports.SyncOfflineEdge = SyncOfflineEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], SyncOfflineEdge);
let SyncOfflineConnection = class SyncOfflineConnection extends (0, relaySpecs_1.ConnectionType)('SyncOffline', SyncOfflineEdge) {
};
exports.SyncOfflineConnection = SyncOfflineConnection;
exports.SyncOfflineConnection = SyncOfflineConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], SyncOfflineConnection);
