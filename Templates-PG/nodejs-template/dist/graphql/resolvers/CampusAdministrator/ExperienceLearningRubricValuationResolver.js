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
exports.ExperienceLearningRubricValuationResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const ExperienceLearningType_1 = require("../../enums/ExperienceLearningType");
const NewExperienceLearningRubricValuation_1 = require("../../inputs/CampusAdministrator/NewExperienceLearningRubricValuation");
const ExperienceLearning_1 = require("../../models/CampusAdministrator/ExperienceLearning");
const ExperienceLearningRubricCriteria_1 = require("../../models/CampusAdministrator/ExperienceLearningRubricCriteria");
const ExperienceLearningRubricCriteriaValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningRubricCriteriaValuation");
const ExperienceLearningRubricValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningRubricValuation");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const PerformanceLevel_1 = require("../../models/SchoolAdministrator/PerformanceLevel");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const PerformanceLevelResolver_1 = require("../SchoolAdministrator/PerformanceLevelResolver");
const ExperienceLearningResolver_1 = require("./ExperienceLearningResolver");
let ExperienceLearningRubricValuationResolver = class ExperienceLearningRubricValuationResolver {
    constructor() {
        this.repository = DataSource_1.ExperienceLearningRubricValuationRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryExperienceLearning = DataSource_1.ExperienceLearningRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.repositoryExperienceLearningRubricCriteriaValuation = DataSource_1.ExperienceLearningRubricCriteriaValuationRepository;
        this.repositoryExperienceLearningRubricCriteria = DataSource_1.ExperienceLearningRubricCriteriaRepository;
        this.repositoryPerformanceLevel = DataSource_1.PerformanceLevelRepository;
        this.experienceLearningResolver = new ExperienceLearningResolver_1.ExperienceLearningResolver();
        this.performanceLevelResolver = new PerformanceLevelResolver_1.PerformanceLevelResolver();
    }
    async getExperienceLearningRubricValuation(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllExperienceLearningRubricValuation(args, allData, orderCreated, experienceLearningId) {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        experienceLearningId,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        experienceLearningId,
                    },
                });
            }
        }
        else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        experienceLearningId,
                        active: true,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        experienceLearningId,
                        active: true,
                    },
                });
            }
        }
        let resultConn = new ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuationConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createExperienceLearningRubricValuation(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAssessmentExperienceLearningRubricValuation(id, context) {
        var _a, _b, _c, _d, _e;
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        let experienceLearningRubricCriterias = await this.repositoryExperienceLearningRubricCriteria.findBy({
            experienceLearningId: result === null || result === void 0 ? void 0 : result.experienceLearningId,
            active: true,
        });
        let assessment = 0;
        let perf = null;
        let performanceLevelId = undefined;
        for (let experienceLearningRubricCriteria of experienceLearningRubricCriterias) {
            let experienceLearningRubricCriteriaValuations = await this.repositoryExperienceLearningRubricCriteriaValuation.findBy({
                where: {
                    experienceLearningRubricCriteriaId: experienceLearningRubricCriteria === null || experienceLearningRubricCriteria === void 0 ? void 0 : experienceLearningRubricCriteria.id.toString(),
                    active: true,
                    studentId: result === null || result === void 0 ? void 0 : result.studentId,
                },
            });
            if (experienceLearningRubricCriteriaValuations.length > 0) {
                if (experienceLearningRubricCriteria &&
                    experienceLearningRubricCriteria.weight &&
                    experienceLearningRubricCriteriaValuations[0].assessment) {
                    let assessmentWeight = (experienceLearningRubricCriteria.weight *
                        experienceLearningRubricCriteriaValuations[0].assessment) /
                        100;
                    assessment += assessmentWeight;
                    let experienceLearning = await this.repositoryExperienceLearning.findOneBy(result === null || result === void 0 ? void 0 : result.experienceLearningId);
                    if (experienceLearning) {
                        let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourse({}, experienceLearning.academicAsignatureCourseId + "");
                        perf = (_c = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _c === void 0 ? void 0 : _c.find((c) => {
                            return assessment < c.node.topScore && assessment >= c.node.minimumScore;
                        });
                        if (perf === undefined) {
                            perf = (_d = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _d === void 0 ? void 0 : _d.find((c) => {
                                return assessment <= c.node.topScore && assessment > c.node.minimumScore;
                            });
                        }
                        if (perf && ((_e = perf === null || perf === void 0 ? void 0 : perf.node) === null || _e === void 0 ? void 0 : _e.id)) {
                            performanceLevelId = perf.node.id;
                        }
                    }
                }
            }
        }
        result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), { assessment,
            performanceLevelId, version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        const experienceLearning = await this.repositoryExperienceLearning.findOneBy(result === null || result === void 0 ? void 0 : result.experienceLearningId);
        if ((experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.academicAsignatureCourseId) && (experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.academicPeriodId) && (result === null || result === void 0 ? void 0 : result.studentId)) {
            this.experienceLearningResolver.createAcademicAsignatureCoursePeriodValuationStudent(experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.academicAsignatureCourseId, experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.academicPeriodId, (result === null || result === void 0 ? void 0 : result.studentId) + "", ExperienceLearningType_1.ExperienceLearningType === null || ExperienceLearningType_1.ExperienceLearningType === void 0 ? void 0 : ExperienceLearningType_1.ExperienceLearningType.NORMAL);
        }
        return result;
    }
    async updateExperienceLearningRubricValuation(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveExperienceLearningRubricValuation(active, id, context) {
        var _a, _b;
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), { active: active, version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        if (result.id) {
            return true;
        }
        else {
            return false;
        }
    }
    async deleteExperienceLearningRubricValuation(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async createdByUser(data) {
        let id = data.createdByUserId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryUser.findOneBy(id);
            return result;
        }
        return null;
    }
    async updatedByUser(data) {
        let id = data.updatedByUserId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryUser.findOneBy(id);
            return result;
        }
        return null;
    }
    async campus(data) {
        let id = data.campusId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryCampus.findOneBy(id);
            return result;
        }
        return null;
    }
    async experienceLearning(data) {
        let id = data.experienceLearningId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryExperienceLearning.findOneBy(id);
            return result;
        }
        return null;
    }
    async student(data) {
        let id = data.studentId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryStudent.findOneBy(id);
            return result;
        }
        return null;
    }
    async performanceLevel(data) {
        let id = data.performanceLevelId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryPerformanceLevel.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.ExperienceLearningRubricValuationResolver = ExperienceLearningRubricValuationResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation),
    __metadata("design:type", Object)
], ExperienceLearningRubricValuationResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], ExperienceLearningRubricValuationResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], ExperienceLearningRubricValuationResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearning_1.ExperienceLearning),
    __metadata("design:type", Object)
], ExperienceLearningRubricValuationResolver.prototype, "repositoryExperienceLearning", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], ExperienceLearningRubricValuationResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningRubricCriteriaValuation_1.ExperienceLearningRubricCriteriaValuation),
    __metadata("design:type", Object)
], ExperienceLearningRubricValuationResolver.prototype, "repositoryExperienceLearningRubricCriteriaValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria),
    __metadata("design:type", Object)
], ExperienceLearningRubricValuationResolver.prototype, "repositoryExperienceLearningRubricCriteria", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PerformanceLevel_1.PerformanceLevel),
    __metadata("design:type", Object)
], ExperienceLearningRubricValuationResolver.prototype, "repositoryPerformanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "getExperienceLearningRubricValuation", null);
__decorate([
    (0, type_graphql_1.Query)(() => ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuationConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('experienceLearningId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "getAllExperienceLearningRubricValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewExperienceLearningRubricValuation_1.NewExperienceLearningRubricValuation, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "createExperienceLearningRubricValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "updateAssessmentExperienceLearningRubricValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewExperienceLearningRubricValuation_1.NewExperienceLearningRubricValuation, String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "updateExperienceLearningRubricValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "changeActiveExperienceLearningRubricValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "deleteExperienceLearningRubricValuation", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => ExperienceLearning_1.ExperienceLearning, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "experienceLearning", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Student_1.Student, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "student", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricValuationResolver.prototype, "performanceLevel", null);
exports.ExperienceLearningRubricValuationResolver = ExperienceLearningRubricValuationResolver = __decorate([
    (0, type_graphql_1.Resolver)(ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation)
], ExperienceLearningRubricValuationResolver);
