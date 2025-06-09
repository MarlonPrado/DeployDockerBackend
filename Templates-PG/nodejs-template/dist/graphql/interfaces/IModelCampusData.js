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
exports.IModelCampusData = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Campus_1 = require("../models/GeneralAdministrator/Campus");
const School_1 = require("../models/GeneralAdministrator/School");
let IModelCampusData = class IModelCampusData {
};
exports.IModelCampusData = IModelCampusData;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.ObjectIdColumn)(),
    __metadata("design:type", String)
], IModelCampusData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)("index_campusId"),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IModelCampusData.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Campus_1.Campus, { nullable: true }),
    __metadata("design:type", Campus_1.Campus)
], IModelCampusData.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Index)("index_schoolId"),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IModelCampusData.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => School_1.School, { nullable: true }),
    __metadata("design:type", School_1.School)
], IModelCampusData.prototype, "school", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], IModelCampusData.prototype, "active", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'number', default: 0 }),
    __metadata("design:type", Number)
], IModelCampusData.prototype, "version", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], IModelCampusData.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], IModelCampusData.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IModelCampusData.prototype, "createdByUserId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], IModelCampusData.prototype, "updatedByUserId", void 0);
exports.IModelCampusData = IModelCampusData = __decorate([
    (0, type_graphql_1.InterfaceType)()
], IModelCampusData);
