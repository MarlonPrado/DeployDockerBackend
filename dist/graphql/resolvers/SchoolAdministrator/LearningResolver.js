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
exports.LearningResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewLearning_1 = require("../../inputs/SchoolAdministrator/NewLearning");
const GeneralBasicLearningRight_1 = require("../../models/GeneralAdministrator/GeneralBasicLearningRight");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const AcademicPeriod_1 = require("../../models/SchoolAdministrator/AcademicPeriod");
const AcademicStandard_1 = require("../../models/SchoolAdministrator/AcademicStandard");
const EvidenceLearning_1 = require("../../models/SchoolAdministrator/EvidenceLearning");
const Learning_1 = require("../../models/SchoolAdministrator/Learning");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let LearningResolver = class LearningResolver {
    constructor() {
        this.repository = DataSource_1.LearningRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryGeneralBasicLearningRight = DataSource_1.GeneralBasicLearningRightRepository;
        this.repositoryAcademicStandard = DataSource_1.AcademicStandardRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositoryAcademicPeriod = DataSource_1.AcademicPeriodRepository;
        this.repositoryEvidenceLearning = DataSource_1.EvidenceLearningRepository;
    }
    async getLearning(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllLearning(args, allData, orderCreated, schoolId, academicPeriodsId, academicAsignatureId, academicGradeId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (academicAsignatureId && academicGradeId && academicPeriodsId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            academicAsignatureId,
                            academicGradeId,
                            academicPeriodsId: { $in: academicPeriodsId },
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (academicAsignatureId && academicGradeId) {
                        result = await this.repository.findBy({
                            where: { schoolId, academicAsignatureId, academicGradeId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        if (academicAsignatureId) {
                            result = await this.repository.findBy({
                                where: { schoolId, academicAsignatureId },
                                order: { createdAt: 'DESC' },
                            });
                        }
                        else {
                            result = await this.repository.findBy({
                                where: { schoolId, academicGradeId },
                                order: { createdAt: 'DESC' },
                            });
                        }
                    }
                }
            }
            else {
                if (academicAsignatureId && academicGradeId && academicPeriodsId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            academicAsignatureId,
                            academicGradeId,
                            academicPeriodsId: { $in: academicPeriodsId },
                        },
                    });
                }
                else {
                    if (academicAsignatureId && academicGradeId) {
                        result = await this.repository.findBy({
                            where: { schoolId, academicAsignatureId, academicGradeId },
                        });
                    }
                    else {
                        if (academicAsignatureId) {
                            result = await this.repository.findBy({
                                where: { schoolId, academicAsignatureId },
                            });
                        }
                        else {
                            result = await this.repository.findBy({
                                where: { schoolId, academicGradeId },
                            });
                        }
                    }
                }
            }
        }
        else {
            if (orderCreated) {
                if (academicAsignatureId && academicGradeId && academicPeriodsId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            academicAsignatureId,
                            academicGradeId,
                            academicPeriodsId: { $in: academicPeriodsId },
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (academicAsignatureId && academicGradeId) {
                        result = await this.repository.findBy({
                            where: { schoolId, academicAsignatureId, academicGradeId, active: true },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        if (academicAsignatureId) {
                            result = await this.repository.findBy({
                                where: { schoolId, academicAsignatureId, active: true },
                                order: { createdAt: 'DESC' },
                            });
                        }
                        else {
                            result = await this.repository.findBy({
                                where: { schoolId, academicGradeId, active: true },
                                order: { createdAt: 'DESC' },
                            });
                        }
                    }
                }
            }
            else {
                if (academicAsignatureId && academicGradeId && academicPeriodsId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            academicAsignatureId,
                            academicGradeId,
                            academicPeriodsId: { $in: academicPeriodsId },
                            active: true,
                        },
                    });
                }
                else {
                    if (academicAsignatureId && academicGradeId) {
                        result = await this.repository.findBy({
                            where: { schoolId, academicAsignatureId, academicGradeId, active: true },
                        });
                    }
                    else {
                        if (academicAsignatureId) {
                            result = await this.repository.findBy({
                                where: { schoolId, academicAsignatureId, active: true },
                            });
                        }
                        else {
                            result = await this.repository.findBy({
                                where: { schoolId, academicGradeId, active: true },
                            });
                        }
                    }
                }
            }
        }
        let resultConn = new Learning_1.LearningConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createLearning(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateLearning(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveLearning(active, id, context) {
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
    async deleteLearning(id, context) {
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
    async generalBasicLearningRight(data) {
        let id = data.generalBasicLearningRightId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralBasicLearningRight.findOneBy(id);
            return result;
        }
        return null;
    }
    async academicAsignature(data) {
        let id = data.academicAsignatureId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicAsignature.findOneBy(id);
            return result;
        }
        return null;
    }
    async academicStandard(data) {
        let id = data.academicStandardId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicStandard.findOneBy(id);
            return result;
        }
        return null;
    }
    async academicGrade(data) {
        let id = data.academicGradeId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicGrade.findOneBy(id);
            return result;
        }
        return null;
    }
    async academicPeriods(data) {
        let ids = data.academicPeriodsId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryAcademicPeriod.findBy({
                where: { _id: { $in: dataIds } },
            });
            return result;
        }
        return null;
    }
    async school(data) {
        let id = data.schoolId;
        if (id !== null && id !== undefined) {
            const result = await this.repositorySchool.findOneBy(id);
            return result;
        }
        return null;
    }
    async evidenceLearnings(data) {
        const result = await this.repositoryEvidenceLearning.findBy({
            where: { learningId: data.id.toString() },
        });
        return result;
    }
};
exports.LearningResolver = LearningResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Learning_1.Learning),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralBasicLearningRight_1.GeneralBasicLearningRight),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repositoryGeneralBasicLearningRight", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicStandard_1.AcademicStandard),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repositoryAcademicStandard", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicPeriod_1.AcademicPeriod),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repositoryAcademicPeriod", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvidenceLearning_1.EvidenceLearning),
    __metadata("design:type", Object)
], LearningResolver.prototype, "repositoryEvidenceLearning", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => Learning_1.Learning, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "getLearning", null);
__decorate([
    (0, type_graphql_1.Query)(() => Learning_1.LearningConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('academicPeriodsId', () => [String], { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('academicAsignatureId', () => String, { nullable: true })),
    __param(6, (0, type_graphql_1.Arg)('academicGradeId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean, String, Array, String, String]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "getAllLearning", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Learning_1.Learning),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewLearning_1.NewLearning, Object]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "createLearning", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Learning_1.Learning),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewLearning_1.NewLearning, String, Object]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "updateLearning", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "changeActiveLearning", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "deleteLearning", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralBasicLearningRight_1.GeneralBasicLearningRight, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "generalBasicLearningRight", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicAsignature_1.AcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "academicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicStandard_1.AcademicStandard, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "academicStandard", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicGrade_1.AcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "academicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [AcademicPeriod_1.AcademicPeriod], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "academicPeriods", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [EvidenceLearning_1.EvidenceLearning], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Learning_1.Learning]),
    __metadata("design:returntype", Promise)
], LearningResolver.prototype, "evidenceLearnings", null);
exports.LearningResolver = LearningResolver = __decorate([
    (0, type_graphql_1.Resolver)(Learning_1.Learning)
], LearningResolver);
