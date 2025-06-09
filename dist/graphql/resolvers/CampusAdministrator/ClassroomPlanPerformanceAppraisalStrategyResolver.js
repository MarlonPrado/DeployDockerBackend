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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomPlanPerformanceAppraisalStrategyResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const ClassroomPlanPerformanceAppraisalStrategy_1 = require("../../models/CampusAdministrator/ClassroomPlanPerformanceAppraisalStrategy");
const EvaluativeComponent_1 = require("../../models/SchoolAdministrator/EvaluativeComponent");
let ClassroomPlanPerformanceAppraisalStrategyResolver = class ClassroomPlanPerformanceAppraisalStrategyResolver {
    constructor() {
        this.repositoryEvaluativeComponent = DataSource_1.EvaluativeComponentRepository;
    }
    async evaluativeComponent(data) {
        let id = data.evaluativeComponentId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryEvaluativeComponent.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.ClassroomPlanPerformanceAppraisalStrategyResolver = ClassroomPlanPerformanceAppraisalStrategyResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvaluativeComponent_1.EvaluativeComponent),
    __metadata("design:type", Object)
], ClassroomPlanPerformanceAppraisalStrategyResolver.prototype, "repositoryEvaluativeComponent", void 0);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => EvaluativeComponent_1.EvaluativeComponent, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClassroomPlanPerformanceAppraisalStrategy_1.ClassroomPlanPerformanceAppraisalStrategy]),
    __metadata("design:returntype", Promise)
], ClassroomPlanPerformanceAppraisalStrategyResolver.prototype, "evaluativeComponent", null);
exports.ClassroomPlanPerformanceAppraisalStrategyResolver = ClassroomPlanPerformanceAppraisalStrategyResolver = __decorate([
    (0, type_graphql_1.Resolver)(ClassroomPlanPerformanceAppraisalStrategy_1.ClassroomPlanPerformanceAppraisalStrategy)
], ClassroomPlanPerformanceAppraisalStrategyResolver);
