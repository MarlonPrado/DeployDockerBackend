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
exports.NewExperienceLearningRubricCriteria = void 0;
const type_graphql_1 = require("type-graphql");
const NewExperienceLearningRubricCriteriaPerformanceLevel_1 = require("./NewExperienceLearningRubricCriteriaPerformanceLevel");
let NewExperienceLearningRubricCriteria = class NewExperienceLearningRubricCriteria {
};
exports.NewExperienceLearningRubricCriteria = NewExperienceLearningRubricCriteria;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearningRubricCriteria.prototype, "experienceLearningId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearningRubricCriteria.prototype, "evidenceLearningId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], NewExperienceLearningRubricCriteria.prototype, "weight", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewExperienceLearningRubricCriteria.prototype, "criteria", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [NewExperienceLearningRubricCriteriaPerformanceLevel_1.NewExperienceLearningRubricCriteriaPerformanceLevel], { nullable: true }),
    __metadata("design:type", Array)
], NewExperienceLearningRubricCriteria.prototype, "experienceLearningRubricCriteriaPerformanceLevel", void 0);
exports.NewExperienceLearningRubricCriteria = NewExperienceLearningRubricCriteria = __decorate([
    (0, type_graphql_1.InputType)()
], NewExperienceLearningRubricCriteria);
