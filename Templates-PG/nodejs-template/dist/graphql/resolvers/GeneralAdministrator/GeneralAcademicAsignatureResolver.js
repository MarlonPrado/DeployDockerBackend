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
exports.GeneralAcademicAsignatureResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewGeneralAcademicAsignature_1 = require("../../inputs/GeneralAdministrator/NewGeneralAcademicAsignature");
const GeneralAcademicArea_1 = require("../../models/GeneralAdministrator/GeneralAcademicArea");
const GeneralAcademicAsignature_1 = require("../../models/GeneralAdministrator/GeneralAcademicAsignature");
const User_1 = require("../../models/GeneralAdministrator/User");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let GeneralAcademicAsignatureResolver = class GeneralAcademicAsignatureResolver {
    constructor() {
        this.repository = DataSource_1.GeneralAcademicAsignatureRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryGeneralAcademicArea = DataSource_1.GeneralAcademicAreaRepository;
    }
    async getGeneralAcademicAsignature(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllGeneralAcademicAsignature(args, allData, orderCreated, generalAcademicAreaId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (generalAcademicAreaId) {
                    result = await this.repository.findBy({
                        where: { generalAcademicAreaId },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (generalAcademicAreaId) {
                    result = await this.repository.findBy({
                        where: { generalAcademicAreaId },
                    });
                }
                else {
                    result = await this.repository.findBy({});
                }
            }
        }
        else {
            if (orderCreated) {
                if (generalAcademicAreaId) {
                    result = await this.repository.findBy({
                        where: {
                            generalAcademicAreaId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (generalAcademicAreaId) {
                    result = await this.repository.findBy({
                        where: {
                            generalAcademicAreaId,
                            active: true,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new GeneralAcademicAsignature_1.GeneralAcademicAsignatureConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createGeneralAcademicAsignature(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateGeneralAcademicAsignature(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveGeneralAcademicAsignature(active, id, context) {
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
    async deleteGeneralAcademicAsignature(id, context) {
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
    async generalAcademicArea(data) {
        let id = data.generalAcademicAreaId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralAcademicArea.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.GeneralAcademicAsignatureResolver = GeneralAcademicAsignatureResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicAsignature_1.GeneralAcademicAsignature),
    __metadata("design:type", Object)
], GeneralAcademicAsignatureResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], GeneralAcademicAsignatureResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicArea_1.GeneralAcademicArea),
    __metadata("design:type", Object)
], GeneralAcademicAsignatureResolver.prototype, "repositoryGeneralAcademicArea", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => GeneralAcademicAsignature_1.GeneralAcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "getGeneralAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Query)(() => GeneralAcademicAsignature_1.GeneralAcademicAsignatureConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('generalAcademicAreaId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean, String]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "getAllGeneralAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GeneralAcademicAsignature_1.GeneralAcademicAsignature),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGeneralAcademicAsignature_1.NewGeneralAcademicAsignature, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "createGeneralAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GeneralAcademicAsignature_1.GeneralAcademicAsignature),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGeneralAcademicAsignature_1.NewGeneralAcademicAsignature, String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "updateGeneralAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "changeActiveGeneralAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "deleteGeneralAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicAsignature_1.GeneralAcademicAsignature]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicAsignature_1.GeneralAcademicAsignature]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicArea_1.GeneralAcademicArea, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicAsignature_1.GeneralAcademicAsignature]),
    __metadata("design:returntype", Promise)
], GeneralAcademicAsignatureResolver.prototype, "generalAcademicArea", null);
exports.GeneralAcademicAsignatureResolver = GeneralAcademicAsignatureResolver = __decorate([
    (0, type_graphql_1.Resolver)(GeneralAcademicAsignature_1.GeneralAcademicAsignature)
], GeneralAcademicAsignatureResolver);
