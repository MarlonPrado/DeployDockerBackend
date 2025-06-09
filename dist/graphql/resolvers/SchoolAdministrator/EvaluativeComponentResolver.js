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
exports.EvaluativeComponentResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewEvaluativeComponent_1 = require("../../inputs/SchoolAdministrator/NewEvaluativeComponent");
const AcademicAsignatureCourse_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourse");
const Course_1 = require("../../models/CampusAdministrator/Course");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicArea_1 = require("../../models/SchoolAdministrator/AcademicArea");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const EvaluativeComponent_1 = require("../../models/SchoolAdministrator/EvaluativeComponent");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let EvaluativeComponentResolver = class EvaluativeComponentResolver {
    constructor() {
        this.repository = DataSource_1.EvaluativeComponentRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryAcademicArea = DataSource_1.AcademicAreaRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicAsignatureCourse = DataSource_1.AcademicAsignatureCourseRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
    }
    async getEvaluativeComponent(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllEvaluativeComponent(args, allData, orderCreated, schoolId, academicAsignatureId, schoolYearId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (academicAsignatureId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            schoolYearId,
                            academicAsignatureId: { $in: [academicAsignatureId] },
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: { schoolId, schoolYearId },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (academicAsignatureId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            schoolYearId,
                            academicAsignatureId: { $in: [academicAsignatureId] },
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: { schoolId, schoolYearId },
                    });
                }
            }
        }
        else {
            if (orderCreated) {
                if (academicAsignatureId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            schoolYearId,
                            academicAsignatureId: { $in: [academicAsignatureId] },
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
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (academicAsignatureId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            schoolYearId,
                            academicAsignatureId: { $in: [academicAsignatureId] },
                            active: true,
                        },
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
        }
        let resultConn = new EvaluativeComponent_1.EvaluativeComponentConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllEvaluativeComponentAcademicAsignatureCourse(args, academicAsignatureCourseId) {
        var _a, _b, _c;
        let result = [];
        let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
        if (academicAsignatureCourse) {
            let course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(academicAsignatureCourse.academicAsignatureId);
            if (course && academicAsignature) {
                let schoolYear = await this.repositorySchoolYear.findOneBy(course.schoolYearId);
                let campus = await this.repositoryCampus.findOneBy(course.campusId);
                if (campus) {
                    result = await this.repository.findBy({
                        where: {
                            academicAsignaturesId: { $in: [academicAsignature.id.toString()] },
                            schoolId: campus.schoolId,
                            schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                    if (result.length === 0) {
                        result = await this.repository.findBy({
                            where: {
                                academicAreasId: { $in: [academicAsignature.academicAreaId] },
                                schoolId: campus.schoolId,
                                schoolYearId: (_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _b === void 0 ? void 0 : _b.toString(),
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                        if (result.length === 0) {
                            result = await this.repository.findBy({
                                where: {
                                    schoolId: campus.schoolId,
                                    schoolYearId: (_c = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _c === void 0 ? void 0 : _c.toString(),
                                    active: true,
                                },
                                order: { createdAt: 'DESC' },
                            });
                        }
                    }
                }
            }
        }
        let resultConn = new EvaluativeComponent_1.EvaluativeComponentConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createEvaluativeComponent(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateEvaluativeComponent(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveEvaluativeComponent(active, id, context) {
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
    async deleteEvaluativeComponent(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async importEvaluativeComponentSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId) {
        var _a, _b, _c, _d, _e;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let academicAreasId = [];
            if (result === null || result === void 0 ? void 0 : result.academicAreasId) {
                for (let academicAreaId of result === null || result === void 0 ? void 0 : result.academicAreasId) {
                    let academicAreaNew;
                    let academicAreaOld = await this.repositoryAcademicArea.findOneBy(academicAreaId);
                    if (academicAreaOld) {
                        academicAreaNew = await this.repositoryAcademicArea.findBy({
                            where: { entityBaseId: academicAreaId, schoolYearId: newSchoolYearId },
                        });
                        if ((academicAreaNew === null || academicAreaNew === void 0 ? void 0 : academicAreaNew.length) > 0) {
                            academicAreasId.push((_b = (_a = academicAreaNew[0]) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString());
                        }
                    }
                }
            }
            let academicAsignaturesId = [];
            if (result === null || result === void 0 ? void 0 : result.academicAsignaturesId) {
                for (let academicAsignatureId of result === null || result === void 0 ? void 0 : result.academicAsignaturesId) {
                    let academicAsignatureNew;
                    let academicAsignatureOld = await this.repositoryAcademicArea.findOneBy(academicAsignatureId);
                    if (academicAsignatureOld) {
                        academicAsignatureNew = await this.repositoryAcademicArea.findBy({
                            where: { entityBaseId: academicAsignatureId, schoolYearId: newSchoolYearId },
                        });
                        if ((academicAsignatureNew === null || academicAsignatureNew === void 0 ? void 0 : academicAsignatureNew.length) > 0) {
                            academicAsignaturesId.push((_d = (_c = academicAsignatureNew[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString());
                        }
                    }
                }
            }
            const model = await this.repository.create({
                name: result.name,
                weight: result.weight,
                type: result.type,
                academicAreasId: academicAreasId,
                academicAsignaturesId: academicAsignaturesId,
                schoolId: result.schoolId,
                createdByUserId: result.createdByUserId,
                updatedByUserId: result.updatedByUserId,
                active: result === null || result === void 0 ? void 0 : result.active,
                version: 0,
                schoolYearId: newSchoolYearId.toString(),
                entityBaseId: (_e = result === null || result === void 0 ? void 0 : result.id) === null || _e === void 0 ? void 0 : _e.toString(),
            });
            let resultSave = await this.repository.save(model);
        }
        return true;
    }
    async fixAllEvaluativeComponentSchoolAndSchoolYear() {
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
    async academicAsignatures(data) {
        let ids = data.academicAsignaturesId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryAcademicAsignature.findBy({
                where: { _id: { $in: dataIds } },
            });
            return result;
        }
        return null;
    }
    async academicAreas(data) {
        let ids = data.academicAreasId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryAcademicArea.findBy({ where: { _id: { $in: dataIds } } });
            return result;
        }
        return null;
    }
};
exports.EvaluativeComponentResolver = EvaluativeComponentResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvaluativeComponent_1.EvaluativeComponent),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicArea_1.AcademicArea),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repositoryAcademicArea", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repositoryAcademicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], EvaluativeComponentResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => EvaluativeComponent_1.EvaluativeComponent, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "getEvaluativeComponent", null);
__decorate([
    (0, type_graphql_1.Query)(() => EvaluativeComponent_1.EvaluativeComponentConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('academicAsignatureId', () => String, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "getAllEvaluativeComponent", null);
__decorate([
    (0, type_graphql_1.Query)(() => EvaluativeComponent_1.EvaluativeComponentConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "getAllEvaluativeComponentAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => EvaluativeComponent_1.EvaluativeComponent),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewEvaluativeComponent_1.NewEvaluativeComponent, Object]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "createEvaluativeComponent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => EvaluativeComponent_1.EvaluativeComponent),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewEvaluativeComponent_1.NewEvaluativeComponent, String, Object]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "updateEvaluativeComponent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "changeActiveEvaluativeComponent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "deleteEvaluativeComponent", null);
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
], EvaluativeComponentResolver.prototype, "importEvaluativeComponentSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "fixAllEvaluativeComponentSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EvaluativeComponent_1.EvaluativeComponent]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EvaluativeComponent_1.EvaluativeComponent]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EvaluativeComponent_1.EvaluativeComponent]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EvaluativeComponent_1.EvaluativeComponent]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "schoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [AcademicAsignature_1.AcademicAsignature], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EvaluativeComponent_1.EvaluativeComponent]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "academicAsignatures", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [AcademicArea_1.AcademicArea], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EvaluativeComponent_1.EvaluativeComponent]),
    __metadata("design:returntype", Promise)
], EvaluativeComponentResolver.prototype, "academicAreas", null);
exports.EvaluativeComponentResolver = EvaluativeComponentResolver = __decorate([
    (0, type_graphql_1.Resolver)(EvaluativeComponent_1.EvaluativeComponent)
], EvaluativeComponentResolver);
