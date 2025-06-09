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
exports.ClassroomPlanPerformanceAppraisalStrategy = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const EvaluativeComponent_1 = require("../SchoolAdministrator/EvaluativeComponent");
let ClassroomPlanPerformanceAppraisalStrategy = class ClassroomPlanPerformanceAppraisalStrategy {
};
exports.ClassroomPlanPerformanceAppraisalStrategy = ClassroomPlanPerformanceAppraisalStrategy;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClassroomPlanPerformanceAppraisalStrategy.prototype, "evaluativeComponentId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", EvaluativeComponent_1.EvaluativeComponent)
], ClassroomPlanPerformanceAppraisalStrategy.prototype, "evaluativeComponent", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ClassroomPlanPerformanceAppraisalStrategy.prototype, "description", void 0);
exports.ClassroomPlanPerformanceAppraisalStrategy = ClassroomPlanPerformanceAppraisalStrategy = __decorate([
    (0, type_graphql_1.ObjectType)({ description: 'The ClassroomPlanPerformanceAppraisalStrategy model' })
], ClassroomPlanPerformanceAppraisalStrategy);
