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
exports.NewPerformanceLevel = void 0;
const type_graphql_1 = require("type-graphql");
const PerformanceLevelCategory_1 = require("../../enums/PerformanceLevelCategory");
const PerformanceLevelCategoryGrade_1 = require("../../enums/PerformanceLevelCategoryGrade");
const PerformanceLevelType_1 = require("../../enums/PerformanceLevelType");
let NewPerformanceLevel = class NewPerformanceLevel {
};
exports.NewPerformanceLevel = NewPerformanceLevel;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NewPerformanceLevel.prototype, "minimumScore", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NewPerformanceLevel.prototype, "topScore", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "abbreviation", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "colorHex", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], NewPerformanceLevel.prototype, "isFinal", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], NewPerformanceLevel.prototype, "isRecovery", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevelType_1.PerformanceLevelType, { nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "generalPerformanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevelCategory_1.PerformanceLevelCategory, { nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade, { nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "categoryGrade", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewPerformanceLevel.prototype, "academicGradesId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewPerformanceLevel.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "schoolId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NewPerformanceLevel.prototype, "order", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewPerformanceLevel.prototype, "schoolYearId", void 0);
exports.NewPerformanceLevel = NewPerformanceLevel = __decorate([
    (0, type_graphql_1.InputType)()
], NewPerformanceLevel);
