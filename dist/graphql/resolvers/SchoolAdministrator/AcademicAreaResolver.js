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
exports.AcademicAreaResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewAcademicArea_1 = require("../../inputs/SchoolAdministrator/NewAcademicArea");
const GeneralAcademicArea_1 = require("../../models/GeneralAdministrator/GeneralAcademicArea");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicArea_1 = require("../../models/SchoolAdministrator/AcademicArea");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicAsignatureResolver_1 = require("./AcademicAsignatureResolver");
let AcademicAreaResolver = class AcademicAreaResolver {
    constructor() {
        this.repository = DataSource_1.AcademicAreaRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryGeneralAcademicArea = DataSource_1.GeneralAcademicAreaRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.academicAsignatureResolver = new AcademicAsignatureResolver_1.AcademicAsignatureResolver();
    }
    async getAcademicArea(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAcademicArea(args, allData, orderCreated, schoolId, schoolYearId) {
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
        }
        let resultConn = new AcademicArea_1.AcademicAreaConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicArea(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAcademicArea(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicArea(active, id, context) {
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
    async deleteAcademicArea(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async updateAcademicAreaAcademicAsignatureSchoolYearId(schoolId, schoolYearId) {
        var _a;
        let results = await this.repository.findBy({ where: { schoolId, schoolYearId } });
        for (let result of results) {
            let datas = await this.repositoryAcademicAsignature.findBy({
                where: { academicAreaId: (_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString() },
            });
            for (let data of datas) {
                result = await this.repositoryAcademicAsignature.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(data.id.toString()) }, data), { version: (data === null || data === void 0 ? void 0 : data.version) + 1, schoolYearId: schoolYearId.toString() }));
            }
        }
        return true;
    }
    async importAcademicAreaSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId, asignature) {
        var _a, _b, _c;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let academicGradesId = [];
            if (result === null || result === void 0 ? void 0 : result.academicGradeId) {
                for (let academicGradeId of result === null || result === void 0 ? void 0 : result.academicGradeId) {
                    let academicGradeNew;
                    let academicGradeOld = await this.repositoryAcademicGrade.findOneBy(academicGradeId);
                    if (academicGradeOld) {
                        academicGradeNew = await this.repositoryAcademicGrade.findBy({
                            where: { entityBaseId: academicGradeId, schoolYearId: newSchoolYearId },
                        });
                        if ((academicGradeNew === null || academicGradeNew === void 0 ? void 0 : academicGradeNew.length) > 0) {
                            academicGradesId.push((_b = (_a = academicGradeNew[0]) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString());
                        }
                    }
                }
            }
            const model = await this.repository.create({
                generalAcademicAreaId: result.generalAcademicAreaId,
                name: result.name,
                abbreviation: result.abbreviation,
                academicGradeId: academicGradesId,
                schoolId: result.schoolId,
                isAverage: result.isAverage,
                order: result.order,
                createdByUserId: result.createdByUserId,
                updatedByUserId: result.updatedByUserId,
                active: result === null || result === void 0 ? void 0 : result.active,
                version: 0,
                schoolYearId: newSchoolYearId.toString(),
                entityBaseId: (_c = result === null || result === void 0 ? void 0 : result.id) === null || _c === void 0 ? void 0 : _c.toString(),
            });
            let resultSave = await this.repository.save(model);
            console.log('asignatureResolver');
            if (asignature) {
                await this.academicAsignatureResolver.importAcademicAsignatureSchoolYearId(schoolId, result.id.toString(), resultSave.id.toString(), newSchoolYearId.toString());
            }
        }
        return true;
    }
    async fixAllAcademicAreaSchoolAndSchoolYear() {
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
                if (result === null || result === void 0 ? void 0 : result.schoolId) {
                    let schoolId;
                    let school = await this.repositorySchool.findOneBy(result === null || result === void 0 ? void 0 : result.schoolId);
                    if (school) {
                        schoolId = (_b = school === null || school === void 0 ? void 0 : school.id) === null || _b === void 0 ? void 0 : _b.toString();
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
exports.AcademicAreaResolver = AcademicAreaResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicArea_1.AcademicArea),
    __metadata("design:type", Object)
], AcademicAreaResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], AcademicAreaResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicAreaResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicArea_1.GeneralAcademicArea),
    __metadata("design:type", Object)
], AcademicAreaResolver.prototype, "repositoryGeneralAcademicArea", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], AcademicAreaResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], AcademicAreaResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], AcademicAreaResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicArea_1.AcademicArea, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "getAcademicArea", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicArea_1.AcademicAreaConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "getAllAcademicArea", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicArea_1.AcademicArea),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicArea_1.NewAcademicArea, Object]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "createAcademicArea", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicArea_1.AcademicArea),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicArea_1.NewAcademicArea, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "updateAcademicArea", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "changeActiveAcademicArea", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "deleteAcademicArea", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "updateAcademicAreaAcademicAsignatureSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldSchoolYearId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('asignature', () => Boolean)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String, Boolean]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "importAcademicAreaSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "fixAllAcademicAreaSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicArea_1.AcademicArea]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicArea_1.AcademicArea]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicArea_1.GeneralAcademicArea, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicArea_1.AcademicArea]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "generalAcademicArea", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicArea_1.AcademicArea]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicArea_1.AcademicArea]),
    __metadata("design:returntype", Promise)
], AcademicAreaResolver.prototype, "schoolYear", null);
exports.AcademicAreaResolver = AcademicAreaResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicArea_1.AcademicArea)
], AcademicAreaResolver);
