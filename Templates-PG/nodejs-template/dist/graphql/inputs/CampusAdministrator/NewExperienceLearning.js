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
exports.NewExperienceLearning = void 0;
const type_graphql_1 = require("type-graphql");
const ExperienceLearningType_1 = require("../../enums/ExperienceLearningType");
const ExperienceType_1 = require("../../enums/ExperienceType");
const NavigationMethodTestOnline_1 = require("../../enums/NavigationMethodTestOnline");
const NewExperienceLearningPerformanceLevel_1 = require("./NewExperienceLearningPerformanceLevel");
let NewExperienceLearning = class NewExperienceLearning {
};
exports.NewExperienceLearning = NewExperienceLearning;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "campusId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "academicAsignatureCourseId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ExperienceType_1.ExperienceType, { nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "experienceType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => ExperienceLearningType_1.ExperienceLearningType, { nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "experienceLearningType", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], NewExperienceLearning.prototype, "dateDelivery", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewExperienceLearning.prototype, "learningsId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewExperienceLearning.prototype, "evidenceLearningsId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "academicPeriodId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], NewExperienceLearning.prototype, "evaluativeComponentsId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], NewExperienceLearning.prototype, "onlineDelivery", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "criteria", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [NewExperienceLearningPerformanceLevel_1.NewExperienceLearningPerformanceLevel], { nullable: true }),
    __metadata("design:type", Array)
], NewExperienceLearning.prototype, "experienceLearningPerformanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], NewExperienceLearning.prototype, "openTestDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], NewExperienceLearning.prototype, "closeTestDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => NavigationMethodTestOnline_1.NavigationMethodTestOnline, { nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearning.prototype, "navigationMethod", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], NewExperienceLearning.prototype, "shuffleQuestions", void 0);
exports.NewExperienceLearning = NewExperienceLearning = __decorate([
    (0, type_graphql_1.InputType)()
], NewExperienceLearning);
