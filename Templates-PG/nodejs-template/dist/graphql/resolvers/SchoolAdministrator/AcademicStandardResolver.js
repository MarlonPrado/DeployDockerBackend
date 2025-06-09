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
exports.AcademicStandardResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewAcademicStandard_1 = require("../../inputs/SchoolAdministrator/NewAcademicStandard");
const GeneralAcademicStandard_1 = require("../../models/GeneralAdministrator/GeneralAcademicStandard");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const AcademicStandard_1 = require("../../models/SchoolAdministrator/AcademicStandard");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let AcademicStandardResolver = class AcademicStandardResolver {
    constructor() {
        this.repository = DataSource_1.AcademicStandardRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryGeneralAcademicStandard = DataSource_1.GeneralAcademicStandardRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
    }
    async getAcademicStandard(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAcademicStandard(args, allData, orderCreated, schoolId, academicAsignatureId, academicGradeId) {
        let result;
        if (allData) {
            if (orderCreated) {
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
        else {
            if (orderCreated) {
                if (academicAsignatureId && academicGradeId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId, academicAsignatureId, academicGradeId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (academicAsignatureId) {
                        result = await this.repository.findBy({
                            where: {
                                schoolId, academicAsignatureId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                schoolId, academicGradeId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (academicAsignatureId && academicGradeId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId, academicAsignatureId, academicGradeId,
                            active: true,
                        },
                    });
                }
                else {
                    if (academicAsignatureId) {
                        result = await this.repository.findBy({
                            where: {
                                schoolId, academicAsignatureId,
                                active: true,
                            },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                schoolId, academicGradeId,
                                active: true,
                            },
                        });
                    }
                }
            }
        }
        let resultConn = new AcademicStandard_1.AcademicStandardConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicStandard(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAcademicStandard(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicStandard(active, id, context) {
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
    async deleteAcademicStandard(id, context) {
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
    async generalAcademicStandard(data) {
        let id = data.generalAcademicStandardId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralAcademicStandard.findOneBy(id);
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
    async academicGrade(data) {
        let id = data.academicGradeId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicGrade.findOneBy(id);
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
};
exports.AcademicStandardResolver = AcademicStandardResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicStandard_1.AcademicStandard),
    __metadata("design:type", Object)
], AcademicStandardResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicStandardResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicStandard_1.GeneralAcademicStandard),
    __metadata("design:type", Object)
], AcademicStandardResolver.prototype, "repositoryGeneralAcademicStandard", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], AcademicStandardResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], AcademicStandardResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], AcademicStandardResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicStandard_1.AcademicStandard, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "getAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicStandard_1.AcademicStandardConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('academicAsignatureId', () => String, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('academicGradeId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String, String, String]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "getAllAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicStandard_1.AcademicStandard),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicStandard_1.NewAcademicStandard, Object]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "createAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicStandard_1.AcademicStandard),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicStandard_1.NewAcademicStandard, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "updateAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "changeActiveAcademicStandard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "deleteAcademicStandard", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicStandard_1.AcademicStandard]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicStandard_1.AcademicStandard]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicStandard_1.GeneralAcademicStandard, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicStandard_1.AcademicStandard]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "generalAcademicStandard", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicAsignature_1.AcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicStandard_1.AcademicStandard]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "academicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicGrade_1.AcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicStandard_1.AcademicStandard]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "academicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicStandard_1.AcademicStandard]),
    __metadata("design:returntype", Promise)
], AcademicStandardResolver.prototype, "school", null);
exports.AcademicStandardResolver = AcademicStandardResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicStandard_1.AcademicStandard)
], AcademicStandardResolver);
