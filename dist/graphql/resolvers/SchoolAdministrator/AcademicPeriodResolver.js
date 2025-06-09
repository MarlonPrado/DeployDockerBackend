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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicPeriodResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const moment_1 = __importDefault(require("moment"));
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewAcademicPeriod_1 = require("../../inputs/SchoolAdministrator/NewAcademicPeriod");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicPeriod_1 = require("../../models/SchoolAdministrator/AcademicPeriod");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let AcademicPeriodResolver = class AcademicPeriodResolver {
    constructor() {
        this.repository = DataSource_1.AcademicPeriodRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
    }
    async getAcademicPeriod(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getCurrentAcademicPeriod(schoolId) {
        const currentDate = new Date();
        let result = null;
        const currentYear = await this.repositorySchoolYear.findBy({
            where: {
                schoolId,
                active: true,
                startDate: { $lte: currentDate },
                endDate: { $gte: currentDate },
            },
        });
        if (currentYear.length > 0) {
            const currentAcademicPeriod = await this.repository.findBy({
                where: {
                    schoolYearId: currentYear[0].id.toString(),
                    startDate: { $lte: currentDate },
                    endDate: { $gte: currentDate },
                },
            });
            if (currentAcademicPeriod) {
                result = currentAcademicPeriod[0];
            }
        }
        return result;
    }
    async getAcademicPeriodSchoolYear(args, schoolId, schoolYearId) {
        let result = await this.repository.findBy({
            where: {
                schoolYearId: schoolYearId,
                schoolId: schoolId,
                active: true,
            },
            order: { order: 1 },
        });
        let resultConn = new AcademicPeriod_1.AcademicPeriodConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllAcademicPeriod(args, allData, orderCreated, schoolId, orderCustom, schoolYearId) {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        schoolYearId,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({ where: { schoolId, schoolYearId } });
            }
            if (orderCustom) {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        schoolYearId,
                    },
                    order: { order: 1 },
                });
            }
        }
        else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        schoolYearId,
                        active: true,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        schoolYearId,
                        active: true,
                    },
                });
            }
            if (orderCustom) {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        schoolYearId,
                        active: true,
                    },
                    order: { order: 1 },
                });
            }
        }
        let resultConn = new AcademicPeriod_1.AcademicPeriodConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicPeriod(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAcademicPeriod(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicPeriod(active, id, context) {
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
    async deleteAcademicPeriod(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async importAcademicPeriodSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        let schoolYear = await this.repositorySchoolYear.findOneBy(newSchoolYearId);
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let modelEntityBase = await this.repository.findBy({
                where: { entityBaseId: (_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString(), schoolYearId: newSchoolYearId.toString() },
            });
            if ((modelEntityBase === null || modelEntityBase === void 0 ? void 0 : modelEntityBase.length) < 1) {
                let startDate = result.startDate;
                let endDate = result.endDate;
                let endDateRecovery = result.endDateRecovery;
                let startDateRecovery = result.startDateRecovery;
                startDate === null || startDate === void 0 ? void 0 : startDate.setFullYear(((_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.startDate) === null || _b === void 0 ? void 0 : _b.getFullYear()) ? (_c = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.startDate) === null || _c === void 0 ? void 0 : _c.getFullYear() : 0);
                endDate === null || endDate === void 0 ? void 0 : endDate.setFullYear(((_d = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.startDate) === null || _d === void 0 ? void 0 : _d.getFullYear()) ? (_e = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.startDate) === null || _e === void 0 ? void 0 : _e.getFullYear() : 0);
                endDateRecovery === null || endDateRecovery === void 0 ? void 0 : endDateRecovery.setFullYear(((_f = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.startDate) === null || _f === void 0 ? void 0 : _f.getFullYear()) ? (_g = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.startDate) === null || _g === void 0 ? void 0 : _g.getFullYear() : 0);
                startDateRecovery === null || startDateRecovery === void 0 ? void 0 : startDateRecovery.setFullYear(((_h = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.startDate) === null || _h === void 0 ? void 0 : _h.getFullYear()) ? (_j = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.startDate) === null || _j === void 0 ? void 0 : _j.getFullYear() : 0);
                const model = await this.repository.create({
                    name: result.name,
                    schoolId: result.schoolId,
                    weight: result.weight,
                    order: result.order,
                    startDate: startDate,
                    endDate: endDate,
                    endDateRecovery: endDateRecovery,
                    startDateRecovery: startDateRecovery,
                    createdByUserId: result.createdByUserId,
                    updatedByUserId: result.updatedByUserId,
                    active: result === null || result === void 0 ? void 0 : result.active,
                    version: 0,
                    schoolYearId: newSchoolYearId.toString(),
                    entityBaseId: (_k = result === null || result === void 0 ? void 0 : result.id) === null || _k === void 0 ? void 0 : _k.toString(),
                });
                let resultSave = await this.repository.save(model);
            }
        }
        return true;
    }
    async updateEndPeriod() {
        var _a;
        let results = await this.repository.find();
        for (let result of results) {
            let endDateAux = new Date(result === null || result === void 0 ? void 0 : result.endDate);
            endDateAux = (0, moment_1.default)(endDateAux).hour(23).minute(59).second(59).toDate();
            let endDateRecoveryAux = new Date(result === null || result === void 0 ? void 0 : result.endDateRecovery);
            endDateRecoveryAux = (0, moment_1.default)(endDateRecoveryAux).hour(23).minute(59).second(59).toDate();
            await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString()) }, result), { endDate: endDateAux, endDateRecovery: endDateRecoveryAux, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
        }
        return true;
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
    async schoolYear(data) {
        let id = data.schoolYearId;
        if (id !== null && id !== undefined) {
            const result = await this.repositorySchoolYear.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.AcademicPeriodResolver = AcademicPeriodResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicPeriod_1.AcademicPeriod),
    __metadata("design:type", Object)
], AcademicPeriodResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicPeriodResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], AcademicPeriodResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], AcademicPeriodResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicPeriod_1.AcademicPeriod, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "getAcademicPeriod", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicPeriod_1.AcademicPeriod, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "getCurrentAcademicPeriod", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicPeriod_1.AcademicPeriodConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs, String, String]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "getAcademicPeriodSchoolYear", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicPeriod_1.AcademicPeriodConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('orderCustom', () => Boolean, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        Boolean,
        String]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "getAllAcademicPeriod", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicPeriod_1.AcademicPeriod),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicPeriod_1.NewAcademicPeriod, Object]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "createAcademicPeriod", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicPeriod_1.AcademicPeriod),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicPeriod_1.NewAcademicPeriod, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "updateAcademicPeriod", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "changeActiveAcademicPeriod", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "deleteAcademicPeriod", null);
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
], AcademicPeriodResolver.prototype, "importAcademicPeriodSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "updateEndPeriod", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicPeriod_1.AcademicPeriod]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicPeriod_1.AcademicPeriod]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicPeriod_1.AcademicPeriod]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicPeriod_1.AcademicPeriod]),
    __metadata("design:returntype", Promise)
], AcademicPeriodResolver.prototype, "schoolYear", null);
exports.AcademicPeriodResolver = AcademicPeriodResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicPeriod_1.AcademicPeriod)
], AcademicPeriodResolver);
