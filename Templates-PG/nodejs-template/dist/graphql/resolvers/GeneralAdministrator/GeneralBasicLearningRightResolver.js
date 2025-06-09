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
exports.GeneralBasicLearningRightResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewGeneralBasicLearningRight_1 = require("../../inputs/GeneralAdministrator/NewGeneralBasicLearningRight");
const GeneralAcademicAsignature_1 = require("../../models/GeneralAdministrator/GeneralAcademicAsignature");
const GeneralAcademicGrade_1 = require("../../models/GeneralAdministrator/GeneralAcademicGrade");
const GeneralBasicLearningRight_1 = require("../../models/GeneralAdministrator/GeneralBasicLearningRight");
const User_1 = require("../../models/GeneralAdministrator/User");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let GeneralBasicLearningRightResolver = class GeneralBasicLearningRightResolver {
    constructor() {
        this.repository = DataSource_1.GeneralBasicLearningRightRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryGeneralAcademicAsignature = DataSource_1.GeneralAcademicAsignatureRepository;
        this.repositoryGeneralAcademicGrade = DataSource_1.GeneralAcademicGradeRepository;
    }
    async getGeneralBasicLearningRight(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllGeneralBasicLearningRight(args, allData, orderCreated, generalAcademicAsignatureId, generalAcademicGradeId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (generalAcademicAsignatureId && generalAcademicGradeId) {
                    result = await this.repository.findBy({
                        where: { generalAcademicAsignatureId, generalAcademicGradeId },
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
                            where: { generalAcademicGradeId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (generalAcademicAsignatureId && generalAcademicGradeId) {
                    result = await this.repository.findBy({
                        where: { generalAcademicAsignatureId, generalAcademicGradeId },
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
                            where: { generalAcademicGradeId },
                        });
                    }
                }
            }
        }
        else {
            if (orderCreated) {
                if (generalAcademicAsignatureId && generalAcademicGradeId) {
                    result = await this.repository.findBy({
                        where: {
                            generalAcademicAsignatureId, generalAcademicGradeId, active: true,
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
                                generalAcademicGradeId, active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (generalAcademicAsignatureId && generalAcademicGradeId) {
                    result = await this.repository.findBy({
                        where: {
                            generalAcademicAsignatureId, generalAcademicGradeId, active: true,
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
                                generalAcademicGradeId, active: true,
                            },
                        });
                    }
                }
            }
        }
        let resultConn = new GeneralBasicLearningRight_1.GeneralBasicLearningRightConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createGeneralBasicLearningRight(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateGeneralBasicLearningRight(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveGeneralBasicLearningRight(active, id, context) {
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
    async deleteGeneralBasicLearningRight(id, context) {
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
    async generalAcademicGrade(data) {
        let id = data.generalAcademicGradeId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralAcademicGrade.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.GeneralBasicLearningRightResolver = GeneralBasicLearningRightResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralBasicLearningRight_1.GeneralBasicLearningRight),
    __metadata("design:type", Object)
], GeneralBasicLearningRightResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], GeneralBasicLearningRightResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicAsignature_1.GeneralAcademicAsignature),
    __metadata("design:type", Object)
], GeneralBasicLearningRightResolver.prototype, "repositoryGeneralAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicGrade_1.GeneralAcademicGrade),
    __metadata("design:type", Object)
], GeneralBasicLearningRightResolver.prototype, "repositoryGeneralAcademicGrade", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => GeneralBasicLearningRight_1.GeneralBasicLearningRight, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "getGeneralBasicLearningRight", null);
__decorate([
    (0, type_graphql_1.Query)(() => GeneralBasicLearningRight_1.GeneralBasicLearningRightConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('generalAcademicAsignatureId', () => String, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('generalAcademicGradeId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean, String, String]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "getAllGeneralBasicLearningRight", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GeneralBasicLearningRight_1.GeneralBasicLearningRight),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGeneralBasicLearningRight_1.NewGeneralBasicLearningRight, Object]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "createGeneralBasicLearningRight", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GeneralBasicLearningRight_1.GeneralBasicLearningRight),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGeneralBasicLearningRight_1.NewGeneralBasicLearningRight, String, Object]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "updateGeneralBasicLearningRight", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "changeActiveGeneralBasicLearningRight", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "deleteGeneralBasicLearningRight", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralBasicLearningRight_1.GeneralBasicLearningRight]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralBasicLearningRight_1.GeneralBasicLearningRight]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicAsignature_1.GeneralAcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralBasicLearningRight_1.GeneralBasicLearningRight]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "generalAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicGrade_1.GeneralAcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralBasicLearningRight_1.GeneralBasicLearningRight]),
    __metadata("design:returntype", Promise)
], GeneralBasicLearningRightResolver.prototype, "generalAcademicGrade", null);
exports.GeneralBasicLearningRightResolver = GeneralBasicLearningRightResolver = __decorate([
    (0, type_graphql_1.Resolver)(GeneralBasicLearningRight_1.GeneralBasicLearningRight)
], GeneralBasicLearningRightResolver);
