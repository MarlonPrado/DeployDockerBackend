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
exports.AcademicDayResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const Day_1 = require("../../enums/Day");
const NewAcademicDay_1 = require("../../inputs/CampusAdministrator/NewAcademicDay");
const AcademicDay_1 = require("../../models/CampusAdministrator/AcademicDay");
const Jornadas_1 = require("../../models/Data/Jornadas");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicHourResolver_1 = require("./AcademicHourResolver");
let AcademicDayResolver = class AcademicDayResolver {
    constructor() {
        this.repository = DataSource_1.AcademicDayRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryJornadas = DataSource_1.JornadasRepository;
        this.academicHourResolver = new AcademicHourResolver_1.AcademicHourResolver();
    }
    async getAcademicDay(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAcademicDay(args, allData, orderCreated, campusId, schoolId, schoolYearId) {
        let result;
        let campusDataIds = [];
        if (schoolId) {
            const campusData = await this.repositoryCampus.findBy({ schoolId, active: true });
            campusData.forEach((campus) => {
                campusDataIds.push(campus.id.toString());
            });
        }
        else {
            campusDataIds.push(campusId);
        }
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        campusId: { $in: campusDataIds },
                        schoolYearId,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        campusId: { $in: campusDataIds },
                        schoolYearId,
                    },
                });
            }
        }
        else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        campusId: { $in: campusDataIds },
                        schoolYearId,
                        active: true,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        campusId: { $in: campusDataIds },
                        schoolYearId,
                        active: true,
                    },
                });
            }
        }
        let resultConn = new AcademicDay_1.AcademicDayConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllAcademicDayCampus(args, allData, orderCreated, campusId, schoolId, schoolYearId) {
        let result;
        let campusDataIds = [];
        campusDataIds.push(campusId);
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        campusId: { $in: campusDataIds },
                        schoolYearId,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        campusId: { $in: campusDataIds },
                        schoolYearId,
                    },
                });
            }
        }
        else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        campusId: { $in: campusDataIds },
                        schoolYearId,
                        active: true,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        campusId: { $in: campusDataIds },
                        schoolYearId,
                        active: true,
                    },
                });
            }
        }
        let resultConn = new AcademicDay_1.AcademicDayConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicDay(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAllAcademicDaySchoolId(schoolId) {
        let results;
        let campusDataIds = [];
        if (schoolId) {
            const campusData = await this.repositoryCampus.findBy({ schoolId, active: true });
            campusData.forEach((campus) => {
                campusDataIds.push(campus.id.toString());
            });
        }
        results = await this.repository.findBy({
            where: {
                campusId: { $in: campusDataIds },
            },
            order: { createdAt: 'DESC' },
        });
        for (let data of results) {
            let result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(data.id.toString()) }, data), { version: (data === null || data === void 0 ? void 0 : data.version) + 1, schoolId: schoolId.toString() }));
        }
        return true;
    }
    async createAllInitialsAcademicDay(schoolId, schoolYearId) {
        var _a;
        let school = await this.repositorySchool.findOneBy(schoolId);
        let schoolYear = await this.repositorySchoolYear.findOneBy(schoolYearId);
        let count = 0;
        let dataSaveBulk = [];
        if (school && schoolYear) {
            let data = await this.repositoryJornadas.findBy({
                where: { dane: school.daneCode },
            });
            for (let jornada of data) {
                if (jornada.jornada && jornada.consecutivo && jornada.dane) {
                    if (jornada.jornada.length > 1 &&
                        jornada.consecutivo.length > 1 &&
                        jornada.dane.length > 1) {
                        let campus = await this.repositoryCampus.findBy({
                            where: { consecutive: jornada.consecutivo },
                        });
                        if (campus.length === 1) {
                            let academicDay = await this.repository.findBy({
                                where: {
                                    campusId: campus[0].id.toString(),
                                    nameSIMAT: jornada.jornada,
                                    schoolYearId,
                                },
                            });
                            if (academicDay.length === 0) {
                                const model = {
                                    name: jornada.jornada,
                                    nameSIMAT: jornada.jornada,
                                    day: [Day_1.Day.MONDAY, Day_1.Day.TUESDAY, Day_1.Day.WEDNESDAY, Day_1.Day.THURSDAY, Day_1.Day.FRIDAY],
                                    campusId: campus[0].id.toString(),
                                    schoolId: school.id.toString(),
                                    schoolYearId: schoolYear.id.toString(),
                                    active: true,
                                    version: 0,
                                };
                                dataSaveBulk.push({ insertOne: { document: Object.assign({}, model) } });
                                count += 1;
                            }
                            else {
                                let resultAcademicDay = await this.repository.save(Object.assign(Object.assign({}, academicDay[0]), { _id: new mongodb_1.ObjectId(academicDay[0].id.toString()), version: ((_a = academicDay[0]) === null || _a === void 0 ? void 0 : _a.version) + 1, schoolId: school.id.toString() }));
                            }
                        }
                    }
                }
            }
        }
        if (dataSaveBulk.length > 0) {
            let result = await this.repository.bulkWrite(dataSaveBulk);
        }
        return true;
    }
    async updateAcademicDay(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicDay(active, id, context) {
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
    async deleteAcademicDay(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async fixAllAcademicDaySchoolAndSchoolYear() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
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
                            console.log('school -: ', number);
                            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_f = result === null || result === void 0 ? void 0 : result.id) === null || _f === void 0 ? void 0 : _f.toString()) }, result), { active: false, version: -1 }));
                        }
                    }
                    else {
                        console.log('school -: ', number);
                        result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_g = result === null || result === void 0 ? void 0 : result.id) === null || _g === void 0 ? void 0 : _g.toString()) }, result), { active: false, version: -1 }));
                    }
                }
                else {
                    console.log('school -: ', number);
                    result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_h = result === null || result === void 0 ? void 0 : result.id) === null || _h === void 0 ? void 0 : _h.toString()) }, result), { active: false, version: -1 }));
                }
            }
        }
        return true;
    }
    async importAcademicDaySchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId, academicHour) {
        var _a, _b;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let modelEntityBase = await this.repository.findBy({
                where: { entityBaseId: (_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString(), schoolYearId: newSchoolYearId.toString() },
            });
            let resultSave;
            if ((modelEntityBase === null || modelEntityBase === void 0 ? void 0 : modelEntityBase.length) < 1) {
                const model = await this.repository.create({
                    name: result.name,
                    nameSIMAT: result.nameSIMAT,
                    day: result.day,
                    schoolId: result.schoolId,
                    campusId: result.campusId,
                    createdByUserId: result.createdByUserId,
                    updatedByUserId: result.updatedByUserId,
                    active: result === null || result === void 0 ? void 0 : result.active,
                    version: 0,
                    schoolYearId: newSchoolYearId.toString(),
                    entityBaseId: (_b = result === null || result === void 0 ? void 0 : result.id) === null || _b === void 0 ? void 0 : _b.toString(),
                });
                resultSave = await this.repository.save(model);
            }
            else {
                resultSave = modelEntityBase[0];
            }
            console.log('academicHourResolver');
            if (academicHour) {
                await this.academicHourResolver.importAcademicHourSchoolYearId(schoolId, result.id.toString(), resultSave.id.toString(), newSchoolYearId.toString());
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
exports.AcademicDayResolver = AcademicDayResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicDay_1.AcademicDay),
    __metadata("design:type", Object)
], AcademicDayResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicDayResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], AcademicDayResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], AcademicDayResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], AcademicDayResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Jornadas_1.Jornadas),
    __metadata("design:type", Object)
], AcademicDayResolver.prototype, "repositoryJornadas", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicDay_1.AcademicDay, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "getAcademicDay", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicDay_1.AcademicDayConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('campusId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('schoolId', () => String, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "getAllAcademicDay", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicDay_1.AcademicDayConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('campusId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('schoolId', () => String, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "getAllAcademicDayCampus", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicDay_1.AcademicDay),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicDay_1.NewAcademicDay, Object]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "createAcademicDay", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "updateAllAcademicDaySchoolId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId')),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "createAllInitialsAcademicDay", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicDay_1.AcademicDay),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicDay_1.NewAcademicDay, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "updateAcademicDay", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "changeActiveAcademicDay", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "deleteAcademicDay", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "fixAllAcademicDaySchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldSchoolYearId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('academicHour', () => Boolean)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String, Boolean]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "importAcademicDaySchoolYearId", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicDay_1.AcademicDay]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicDay_1.AcademicDay]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicDay_1.AcademicDay]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicDay_1.AcademicDay]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicDay_1.AcademicDay]),
    __metadata("design:returntype", Promise)
], AcademicDayResolver.prototype, "schoolYear", null);
exports.AcademicDayResolver = AcademicDayResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicDay_1.AcademicDay)
], AcademicDayResolver);
