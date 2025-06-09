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
exports.GeneralAcademicGradeResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewGeneralAcademicGrade_1 = require("../../inputs/GeneralAdministrator/NewGeneralAcademicGrade");
const GeneralAcademicCycle_1 = require("../../models/GeneralAdministrator/GeneralAcademicCycle");
const GeneralAcademicGrade_1 = require("../../models/GeneralAdministrator/GeneralAcademicGrade");
const User_1 = require("../../models/GeneralAdministrator/User");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let GeneralAcademicGradeResolver = class GeneralAcademicGradeResolver {
    constructor() {
        this.repository = DataSource_1.GeneralAcademicGradeRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryGeneralAcademicCycle = DataSource_1.GeneralAcademicCycleRepository;
    }
    async getGeneralAcademicGrade(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllGeneralAcademicGrade(args, allData, orderCreated) {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.find();
            }
        }
        else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
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
                });
            }
        }
        let resultConn = new GeneralAcademicGrade_1.GeneralAcademicGradeConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createGeneralAcademicGrade(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateGeneralAcademicGrade(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveGeneralAcademicGrade(active, id, context) {
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
    async deleteGeneralAcademicGrade(id, context) {
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
    async generalAcademicCycle(data) {
        let id = data.generalAcademicCycleId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralAcademicCycle.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.GeneralAcademicGradeResolver = GeneralAcademicGradeResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicGrade_1.GeneralAcademicGrade),
    __metadata("design:type", Object)
], GeneralAcademicGradeResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], GeneralAcademicGradeResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicCycle_1.GeneralAcademicCycle),
    __metadata("design:type", Object)
], GeneralAcademicGradeResolver.prototype, "repositoryGeneralAcademicCycle", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => GeneralAcademicGrade_1.GeneralAcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "getGeneralAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Query)(() => GeneralAcademicGrade_1.GeneralAcademicGradeConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "getAllGeneralAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GeneralAcademicGrade_1.GeneralAcademicGrade),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGeneralAcademicGrade_1.NewGeneralAcademicGrade, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "createGeneralAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GeneralAcademicGrade_1.GeneralAcademicGrade),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGeneralAcademicGrade_1.NewGeneralAcademicGrade, String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "updateGeneralAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "changeActiveGeneralAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "deleteGeneralAcademicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicGrade_1.GeneralAcademicGrade]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicGrade_1.GeneralAcademicGrade]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicCycle_1.GeneralAcademicCycle, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneralAcademicGrade_1.GeneralAcademicGrade]),
    __metadata("design:returntype", Promise)
], GeneralAcademicGradeResolver.prototype, "generalAcademicCycle", null);
exports.GeneralAcademicGradeResolver = GeneralAcademicGradeResolver = __decorate([
    (0, type_graphql_1.Resolver)(GeneralAcademicGrade_1.GeneralAcademicGrade)
], GeneralAcademicGradeResolver);
