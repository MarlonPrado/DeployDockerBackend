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
exports.NewAcademicAsignatureCoursePeriodValuation = void 0;
const type_graphql_1 = require("type-graphql");
const ValuationType_1 = require("../../enums/ValuationType");
let NewAcademicAsignatureCoursePeriodValuation = class NewAcademicAsignatureCoursePeriodValuation {
};
exports.NewAcademicAsignatureCoursePeriodValuation = NewAcademicAsignatureCoursePeriodValuation;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewAcademicAsignatureCoursePeriodValuation.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewAcademicAsignatureCoursePeriodValuation.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewAcademicAsignatureCoursePeriodValuation.prototype, "studentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NewAcademicAsignatureCoursePeriodValuation.prototype, "assessment", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewAcademicAsignatureCoursePeriodValuation.prototype, "performanceLevelId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ValuationType_1.ValuationType, { nullable: true }),
    __metadata("design:type", String)
], NewAcademicAsignatureCoursePeriodValuation.prototype, "valuationType", void 0);
exports.NewAcademicAsignatureCoursePeriodValuation = NewAcademicAsignatureCoursePeriodValuation = __decorate([
    (0, type_graphql_1.InputType)()
], NewAcademicAsignatureCoursePeriodValuation);
