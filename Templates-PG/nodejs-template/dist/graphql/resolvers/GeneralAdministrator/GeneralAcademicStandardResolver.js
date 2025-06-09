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
exports.GeneralAcademicStandardResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewGeneralAcademicStandard_1 = require("../../inputs/GeneralAdministrator/NewGeneralAcademicStandard");
const GeneralAcademicAsignature_1 = require("../../models/GeneralAdministrator/GeneralAcademicAsignature");
const GeneralAcademicCycle_1 = require("../../models/GeneralAdministrator/GeneralAcademicCycle");
const GeneralAcademicStandard_1 = require("../../models/GeneralAdministrator/GeneralAcademicStandard");
const User_1 = require("../../models/GeneralAdministrator/User");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let GeneralAcademicStandardResolver = class GeneralAcademicStandardResolver {
    constructor() {
        this.repository = DataSource_1.GeneralAcademicStandardRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryGeneralAcademicAsignature = DataSource_1.GeneralAcademicAsignatureRepository;
        this.repositoryGeneralAcademicCycle = DataSource_1.GeneralAcademicCycleRepository;
    }
    async getGeneralAcademicStandard(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllGeneralAcademicStandard(args, allData, orderCreated, generalAcademicAsignatureId, generalAcademicCycleId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (generalAcademicAsignatureId && generalAcademicCycleId) {
                    result = await this.repository.findBy({
                        where: { generalAcademicAsignatureId, generalAcademicCycleId },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (generalAcademicAsignatureId) {
                        result = await this.repository.findBy({
                            where: { generalAcademicAsignatureId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: { generalAcademicCycleId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (generalAcademicAsignatureId && generalAcademicCycleId) {
                    result = await this.repository.findBy({
                        where: { generalAcademicAsignatureId, generalAcademicCycleId },
                    });
                }
                else {
                    if (generalAcademicAsignatureId) {
                        result = await this.repository.findBy({
                            where: { generalAcademicAsignatureId },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: { generalAcademicCycleId },
                        });
                    }
                }
            }
        }
        else {
            if (orderCreated) {
                if (generalAcademicAsignatureId && generalAcademicCycleId) {
                    result = await this.repository.findBy({
                        where: {
                            generalAcademicAsignatureId, generalAcademicCycleId, active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (generalAcademicAsignatureId) {
                        result = await this.repository.findBy({
                            where: {
                                generalAcademicAsignatureId, active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                generalAcademicCycleId, active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (generalAcademicAsignatureId && generalAcademicCycleId) {
                    result = await this.repository.findBy({
                        where: {
                            generalAcademicAsignatureId, generalAcademicCycleId, active: true,
                        },
                    });
                }
                else {
                    if (generalAcademicAsignatureId) {
                        result = await this.repository.findBy({
                            where: {
                                generalAcademicAsignatureId, active: true,
                            },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                generalAcademicCycleId, active: true,
                            },
                        });
                    }
                }
            }
        }
        let resultConn = new GeneralAcademicStandard_1.GeneralAcademicStandardConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createGeneralAcademicStandard(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateGeneralAcademicStandard(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveGeneralAcademicStandard(active, id, context) {
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
    async deleteGeneralAcademicStandard(id, context) {
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
    async generalAcademicAsignature(data) {
        let id = data.generalAcademicAsignatureId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralAcademicAsignature.findOneBy(id);
            return result;
        }
        return null;
    }
    async generalAcademicCycle(data) {
        let id = data.generalAcademicCycleId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralAcademicCycle.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.GeneralAcademicStandardResolver = GeneralAcademicStandardResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicStandard_1.GeneralAcademicStandard),
    __metadata("design:type", Object)
], GeneralAcademicStandardResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], GeneralAcademicStandardResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicAsignature_1.GeneralAcademicAsignature),
    __metadata("design:type", Object)
], GeneralAcademicStandardResolver.prototype, "repositoryGeneralAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicCycle_1.GeneralAcademicCycle),
    __metadata("design:type", Object)
], GeneralAcademicStandardResolver.prototype, "repositoryGeneralAcademicCycle", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => GeneralAcademicStandard_1.GeneralAcademicStandard, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "getGeneralAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Query)(() => GeneralAcademicStandard_1.GeneralAcademicStandardConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('generalAcademicAsignatureId', () => String, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('generalAcademicCycleId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean, String, String]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "getAllGeneralAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GeneralAcademicStandard_1.GeneralAcademicStandard),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGeneralAcademicStandard_1.NewGeneralAcademicStandard, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "createGeneralAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GeneralAcademicStandard_1.GeneralAcademicStandard),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGeneralAcademicStandard_1.NewGeneralAcademicStandard, String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "updateGeneralAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "changeActiveGeneralAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "deleteGeneralAcademicStandard", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicStandard_1.GeneralAcademicStandard]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicStandard_1.GeneralAcademicStandard]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicAsignature_1.GeneralAcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicStandard_1.GeneralAcademicStandard]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "generalAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicCycle_1.GeneralAcademicCycle, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicStandard_1.GeneralAcademicStandard]),
    __metadata("design:returntype", Promise)
], GeneralAcademicStandardResolver.prototype, "generalAcademicCycle", null);
exports.GeneralAcademicStandardResolver = GeneralAcademicStandardResolver = __decorate([
    (0, type_graphql_1.Resolver)(GeneralAcademicStandard_1.GeneralAcademicStandard)
], GeneralAcademicStandardResolver);
