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
exports.ClassroomPlanExpectedPerformanceResolver = void 0;
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const ClassroomPlanExpectedPerformance_1 = require("../../models/CampusAdministrator/ClassroomPlanExpectedPerformance");
const EvaluativeComponent_1 = require("../../models/SchoolAdministrator/EvaluativeComponent");
const EvidenceLearning_1 = require("../../models/SchoolAdministrator/EvidenceLearning");
let ClassroomPlanExpectedPerformanceResolver = class ClassroomPlanExpectedPerformanceResolver {
    constructor() {
        this.repositoryEvaluativeComponent = DataSource_1.EvaluativeComponentRepository;
        this.repositoryEvidenceLearning = DataSource_1.EvidenceLearningRepository;
    }
    async evaluativeComponent(data) {
        let id = data.evaluativeComponentId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryEvaluativeComponent.findOneBy(id);
            return result;
        }
        return null;
    }
    async evidenceLearnings(data) {
        let ids = data.evidenceLearningsId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryEvidenceLearning.findBy({ where: { _id: { $in: dataIds } } });
            return result;
        }
        return null;
    }
};
exports.ClassroomPlanExpectedPerformanceResolver = ClassroomPlanExpectedPerformanceResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvaluativeComponent_1.EvaluativeComponent),
    __metadata("design:type", Object)
], ClassroomPlanExpectedPerformanceResolver.prototype, "repositoryEvaluativeComponent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvidenceLearning_1.EvidenceLearning),
    __metadata("design:type", Object)
], ClassroomPlanExpectedPerformanceResolver.prototype, "repositoryEvidenceLearning", void 0);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => EvaluativeComponent_1.EvaluativeComponent, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClassroomPlanExpectedPerformance_1.ClassroomPlanExpectedPerformance]),
    __metadata("design:returntype", Promise)
], ClassroomPlanExpectedPerformanceResolver.prototype, "evaluativeComponent", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [EvidenceLearning_1.EvidenceLearning], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClassroomPlanExpectedPerformance_1.ClassroomPlanExpectedPerformance]),
    __metadata("design:returntype", Promise)
], ClassroomPlanExpectedPerformanceResolver.prototype, "evidenceLearnings", null);
exports.ClassroomPlanExpectedPerformanceResolver = ClassroomPlanExpectedPerformanceResolver = __decorate([
    (0, type_graphql_1.Resolver)(ClassroomPlanExpectedPerformance_1.ClassroomPlanExpectedPerformance)
], ClassroomPlanExpectedPerformanceResolver);
