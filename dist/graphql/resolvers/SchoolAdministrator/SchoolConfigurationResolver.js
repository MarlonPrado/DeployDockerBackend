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
exports.SchoolConfigurationResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewSchoolConfiguration_1 = require("../../inputs/SchoolAdministrator/NewSchoolConfiguration");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const SchoolConfiguration_1 = require("../../models/SchoolAdministrator/SchoolConfiguration");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let SchoolConfigurationResolver = class SchoolConfigurationResolver {
    constructor() {
        this.repository = DataSource_1.SchoolConfigurationRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
    }
    async getSchoolConfiguration(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllSchoolConfiguration(args, allData, orderCreated, schoolId) {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: { schoolId },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({ where: { schoolId } });
            }
        }
        else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        active: true,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        active: true,
                    },
                });
            }
        }
        let resultConn = new SchoolConfiguration_1.SchoolConfigurationConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createSchoolConfiguration(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateSchoolConfiguration(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveSchoolConfiguration(active, id, context) {
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
    async createCodeSchoolConfigurations(code, valueNumber, valueString) {
        let schools = await this.repositorySchool.find();
        for (let school of schools) {
            let create = true;
            let schoolConfigurations = await this.repository.findBy({
                active: true,
                schoolId: school.id.toString(),
            });
            if ((schoolConfigurations === null || schoolConfigurations === void 0 ? void 0 : schoolConfigurations.length) > 0) {
                for (let schoolConfiguration of schoolConfigurations) {
                    if ((schoolConfiguration === null || schoolConfiguration === void 0 ? void 0 : schoolConfiguration.code) === code) {
                        create = false;
                    }
                }
            }
            if (create) {
                const model = await this.repository.create({
                    code,
                    valueNumber,
                    valueString,
                    schoolId: school.id.toString(),
                    active: true,
                    version: 0,
                });
                let result = await this.repository.save(model);
            }
        }
        return true;
    }
    async importSchoolConfigurationSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId) {
        var _a, _b;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let modelEntityBase = await this.repository.findBy({
                where: { entityBaseId: (_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString(), schoolYearId: newSchoolYearId.toString() },
            });
            if ((modelEntityBase === null || modelEntityBase === void 0 ? void 0 : modelEntityBase.length) < 1) {
                const model = await this.repository.create({
                    code: result.code,
                    valueNumber: result.valueNumber,
                    valueString: result.valueString,
                    schoolId: result.schoolId,
                    createdByUserId: result.createdByUserId,
                    updatedByUserId: result.updatedByUserId,
                    active: result === null || result === void 0 ? void 0 : result.active,
                    version: 0,
                    schoolYearId: newSchoolYearId.toString(),
                    entityBaseId: (_b = result === null || result === void 0 ? void 0 : result.id) === null || _b === void 0 ? void 0 : _b.toString(),
                });
                let resultSave = await this.repository.save(model);
            }
        }
        return true;
    }
    async deleteSchoolConfiguration(id, context) {
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
    async school(data) {
        let id = data.schoolId;
        if (id !== null && id !== undefined) {
            const result = await this.repositorySchool.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.SchoolConfigurationResolver = SchoolConfigurationResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolConfiguration_1.SchoolConfiguration),
    __metadata("design:type", Object)
], SchoolConfigurationResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], SchoolConfigurationResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], SchoolConfigurationResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => SchoolConfiguration_1.SchoolConfiguration, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "getSchoolConfiguration", null);
__decorate([
    (0, type_graphql_1.Query)(() => SchoolConfiguration_1.SchoolConfigurationConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "getAllSchoolConfiguration", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SchoolConfiguration_1.SchoolConfiguration),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewSchoolConfiguration_1.NewSchoolConfiguration, Object]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "createSchoolConfiguration", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SchoolConfiguration_1.SchoolConfiguration),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewSchoolConfiguration_1.NewSchoolConfiguration, String, Object]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "updateSchoolConfiguration", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "changeActiveSchoolConfiguration", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('code', () => String)),
    __param(1, (0, type_graphql_1.Arg)('valueNumber', () => Number)),
    __param(2, (0, type_graphql_1.Arg)('valueString', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "createCodeSchoolConfigurations", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldSchoolYearId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "importSchoolConfigurationSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "deleteSchoolConfiguration", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolConfiguration_1.SchoolConfiguration]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolConfiguration_1.SchoolConfiguration]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolConfiguration_1.SchoolConfiguration]),
    __metadata("design:returntype", Promise)
], SchoolConfigurationResolver.prototype, "school", null);
exports.SchoolConfigurationResolver = SchoolConfigurationResolver = __decorate([
    (0, type_graphql_1.Resolver)(SchoolConfiguration_1.SchoolConfiguration)
], SchoolConfigurationResolver);
