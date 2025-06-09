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
exports.ExperienceLearningRubricCriteriaResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewExperienceLearningRubricCriteria_1 = require("../../inputs/CampusAdministrator/NewExperienceLearningRubricCriteria");
const ExperienceLearning_1 = require("../../models/CampusAdministrator/ExperienceLearning");
const ExperienceLearningRubricCriteria_1 = require("../../models/CampusAdministrator/ExperienceLearningRubricCriteria");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const User_1 = require("../../models/GeneralAdministrator/User");
const EvidenceLearning_1 = require("../../models/SchoolAdministrator/EvidenceLearning");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let ExperienceLearningRubricCriteriaResolver = class ExperienceLearningRubricCriteriaResolver {
    constructor() {
        this.repository = DataSource_1.ExperienceLearningRubricCriteriaRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryExperienceLearning = DataSource_1.ExperienceLearningRepository;
        this.repositoryEvidenceLearning = DataSource_1.EvidenceLearningRepository;
    }
    async getExperienceLearningRubricCriteria(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllExperienceLearningRubricCriteria(args, allData, orderCreated, experienceLearningId) {
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
        let resultConn = new ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteriaConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createExperienceLearningRubricCriteria(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateExperienceLearningRubricCriteria(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveExperienceLearningRubricCriteria(active, id, context) {
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
    async deleteExperienceLearningRubricCriteria(id, context) {
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
    async evidenceLearnig(data) {
        let id = data.evidenceLearningId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryEvidenceLearning.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.ExperienceLearningRubricCriteriaResolver = ExperienceLearningRubricCriteriaResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria),
    __metadata("design:type", Object)
], ExperienceLearningRubricCriteriaResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], ExperienceLearningRubricCriteriaResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], ExperienceLearningRubricCriteriaResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearning_1.ExperienceLearning),
    __metadata("design:type", Object)
], ExperienceLearningRubricCriteriaResolver.prototype, "repositoryExperienceLearning", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvidenceLearning_1.EvidenceLearning),
    __metadata("design:type", Object)
], ExperienceLearningRubricCriteriaResolver.prototype, "repositoryEvidenceLearning", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "getExperienceLearningRubricCriteria", null);
__decorate([
    (0, type_graphql_1.Query)(() => ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteriaConnection),
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
], ExperienceLearningRubricCriteriaResolver.prototype, "getAllExperienceLearningRubricCriteria", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewExperienceLearningRubricCriteria_1.NewExperienceLearningRubricCriteria, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "createExperienceLearningRubricCriteria", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewExperienceLearningRubricCriteria_1.NewExperienceLearningRubricCriteria, String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "updateExperienceLearningRubricCriteria", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "changeActiveExperienceLearningRubricCriteria", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "deleteExperienceLearningRubricCriteria", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => ExperienceLearning_1.ExperienceLearning, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "experienceLearning", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => EvidenceLearning_1.EvidenceLearning, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria]),
    __metadata("design:returntype", Promise)
], ExperienceLearningRubricCriteriaResolver.prototype, "evidenceLearnig", null);
exports.ExperienceLearningRubricCriteriaResolver = ExperienceLearningRubricCriteriaResolver = __decorate([
    (0, type_graphql_1.Resolver)(ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria)
], ExperienceLearningRubricCriteriaResolver);
