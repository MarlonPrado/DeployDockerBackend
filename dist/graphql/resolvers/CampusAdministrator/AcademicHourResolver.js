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
exports.AcademicHourResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewAcademicHour_1 = require("../../inputs/CampusAdministrator/NewAcademicHour");
const AcademicDay_1 = require("../../models/CampusAdministrator/AcademicDay");
const AcademicHour_1 = require("../../models/CampusAdministrator/AcademicHour");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let AcademicHourResolver = class AcademicHourResolver {
    constructor() {
        this.repository = DataSource_1.AcademicHourRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicDay = DataSource_1.AcademicDayRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
    }
    async getAcademicHour(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAcademicHour(args, allData, orderCreated, campusId, academicDayId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (campusId && academicDayId) {
                    result = await this.repository.findBy({
                        where: { campusId, academicDayId },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (campusId) {
                        result = await this.repository.findBy({
                            where: { campusId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: { academicDayId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (campusId && academicDayId) {
                    result = await this.repository.findBy({
                        where: { campusId, academicDayId },
                    });
                }
                else {
                    if (campusId) {
                        result = await this.repository.findBy({
                            where: { campusId },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: { academicDayId },
                        });
                    }
                }
            }
        }
        else {
            if (orderCreated) {
                if (campusId && academicDayId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicDayId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (campusId) {
                        result = await this.repository.findBy({
                            where: {
                                campusId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                academicDayId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (campusId && academicDayId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicDayId,
                            active: true,
                        },
                    });
                }
                else {
                    if (campusId) {
                        result = await this.repository.findBy({
                            where: {
                                campusId,
                                active: true,
                            },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                academicDayId,
                                active: true,
                            },
                        });
                    }
                }
            }
        }
        let resultConn = new AcademicHour_1.AcademicHourConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicHour(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAcademicHour(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicHour(active, id, context) {
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
    async deleteAcademicHour(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async fixAllAcademicHourSchoolAndSchoolYear() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let results = await this.repository.findBy({
            where: {
                $or: [
                    {
                        schoolId: null,
                    },
                    { schoolYearId: null },
                ],
            },
            order: { createdAt: 'DESC' },
        });
        console.log(results === null || results === void 0 ? void 0 : results.length);
        let number = 0;
        for (let result of results) {
            number++;
            if (result === null || result === void 0 ? void 0 : result.schoolYearId) {
                console.log('schoolYearId: ', number);
                let schoolYear = await this.repositorySchoolYear.findOneBy(result === null || result === void 0 ? void 0 : result.schoolYearId);
                if (schoolYear) {
                    result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString()) }, result), { schoolId: schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.schoolId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
                }
            }
            else {
                if ((result === null || result === void 0 ? void 0 : result.schoolId) || (result === null || result === void 0 ? void 0 : result.campusId)) {
                    let schoolId;
                    if (result === null || result === void 0 ? void 0 : result.schoolId) {
                        let school = await this.repositorySchool.findOneBy(result === null || result === void 0 ? void 0 : result.schoolId);
                        if (school) {
                            schoolId = (_b = school === null || school === void 0 ? void 0 : school.id) === null || _b === void 0 ? void 0 : _b.toString();
                        }
                    }
                    else {
                        if (result === null || result === void 0 ? void 0 : result.campusId) {
                            let campus = await this.repositoryCampus.findOneBy(result === null || result === void 0 ? void 0 : result.campusId);
                            if (campus) {
                                schoolId = campus === null || campus === void 0 ? void 0 : campus.schoolId;
                            }
                        }
                    }
                    if (schoolId) {
                        console.log('schoolYears: ', number);
                        let schoolYears = await this.repositorySchoolYear.findBy({
                            where: { schoolId: schoolId },
                        });
                        console.log('schoolYears length: ', schoolYears === null || schoolYears === void 0 ? void 0 : schoolYears.length);
                        if (schoolYears && (schoolYears === null || schoolYears === void 0 ? void 0 : schoolYears.length) === 1) {
                            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_c = result === null || result === void 0 ? void 0 : result.id) === null || _c === void 0 ? void 0 : _c.toString()) }, result), { schoolId: schoolId, schoolYearId: (_e = (_d = schoolYears[0]) === null || _d === void 0 ? void 0 : _d.id) === null || _e === void 0 ? void 0 : _e.toString(), version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
                        }
                        else {
                            console.log('school -1: ', number);
                            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_f = result === null || result === void 0 ? void 0 : result.id) === null || _f === void 0 ? void 0 : _f.toString()) }, result), { active: false, version: -1 }));
                        }
                    }
                    else {
                        console.log('school -2: ', number);
                        result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_g = result === null || result === void 0 ? void 0 : result.id) === null || _g === void 0 ? void 0 : _g.toString()) }, result), { active: false, version: -1 }));
                    }
                }
                else {
                    if (result === null || result === void 0 ? void 0 : result.academicDayId) {
                        let academicDay = await this.repositoryAcademicDay.findOneBy(result === null || result === void 0 ? void 0 : result.academicDayId);
                        if (academicDay && (academicDay === null || academicDay === void 0 ? void 0 : academicDay.schoolId) && (academicDay === null || academicDay === void 0 ? void 0 : academicDay.schoolYearId)) {
                            console.log('school 1: ', number);
                            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_h = result === null || result === void 0 ? void 0 : result.id) === null || _h === void 0 ? void 0 : _h.toString()) }, result), { schoolId: academicDay === null || academicDay === void 0 ? void 0 : academicDay.schoolId, schoolYearId: academicDay === null || academicDay === void 0 ? void 0 : academicDay.schoolYearId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
                        }
                    }
                    else {
                        console.log('school -3: ', number);
                        result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_j = result === null || result === void 0 ? void 0 : result.id) === null || _j === void 0 ? void 0 : _j.toString()) }, result), { active: false, version: -1 }));
                    }
                }
            }
        }
        return true;
    }
    async importAcademicHourSchoolYearId(schoolId, oldAcademicDayId, newAcademicDayId, newSchoolYearId) {
        var _a, _b;
        let results = await this.repository.findBy({
            where: { schoolId, academicDayId: oldAcademicDayId },
        });
        console.log('schoolId', schoolId);
        console.log('academicDayId', oldAcademicDayId);
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let modelEntityBase = await this.repository.findBy({
                where: { entityBaseId: (_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString(), schoolYearId: newSchoolYearId.toString() },
            });
            if ((modelEntityBase === null || modelEntityBase === void 0 ? void 0 : modelEntityBase.length) < 1) {
                const model = await this.repository.create({
                    academicDayId: newAcademicDayId + '',
                    startTime: result.startTime,
                    endTime: result.endTime,
                    order: result.order,
                    campusId: result.campusId,
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
    async academicDay(data) {
        let id = data.academicDayId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicDay.findOneBy(id);
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
exports.AcademicHourResolver = AcademicHourResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicHour_1.AcademicHour),
    __metadata("design:type", Object)
], AcademicHourResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicHourResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], AcademicHourResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicDay_1.AcademicDay),
    __metadata("design:type", Object)
], AcademicHourResolver.prototype, "repositoryAcademicDay", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], AcademicHourResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], AcademicHourResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicHour_1.AcademicHour, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "getAcademicHour", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicHour_1.AcademicHourConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('campusId', () => String, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('academicDayId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "getAllAcademicHour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicHour_1.AcademicHour),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicHour_1.NewAcademicHour, Object]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "createAcademicHour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicHour_1.AcademicHour),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicHour_1.NewAcademicHour, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "updateAcademicHour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "changeActiveAcademicHour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "deleteAcademicHour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "fixAllAcademicHourSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldAcademicDayId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newAcademicDayId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "importAcademicHourSchoolYearId", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicHour_1.AcademicHour]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicHour_1.AcademicHour]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicHour_1.AcademicHour]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicDay_1.AcademicDay, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicHour_1.AcademicHour]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "academicDay", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicHour_1.AcademicHour]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicHour_1.AcademicHour]),
    __metadata("design:returntype", Promise)
], AcademicHourResolver.prototype, "schoolYear", null);
exports.AcademicHourResolver = AcademicHourResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicHour_1.AcademicHour)
], AcademicHourResolver);
