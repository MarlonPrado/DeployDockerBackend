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
exports.AcademicGradeResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewAcademicGrade_1 = require("../../inputs/SchoolAdministrator/NewAcademicGrade");
const GeneralAcademicCycle_1 = require("../../models/GeneralAdministrator/GeneralAcademicCycle");
const GeneralAcademicGrade_1 = require("../../models/GeneralAdministrator/GeneralAcademicGrade");
const School_1 = require("../../models/GeneralAdministrator/School");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const EducationLevel_1 = require("../../models/SchoolAdministrator/EducationLevel");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const Specialty_1 = require("../../models/SchoolAdministrator/Specialty");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const CourseResolver_1 = require("../CampusAdministrator/CourseResolver");
let AcademicGradeResolver = class AcademicGradeResolver {
    constructor() {
        this.repository = DataSource_1.AcademicGradeRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryEducationLevel = DataSource_1.EducationLevelRepository;
        this.repositorySpecialty = DataSource_1.SpecialtyRepository;
        this.repositoryGeneralAcademicCycle = DataSource_1.GeneralAcademicCycleRepository;
        this.repositoryGeneralAcademicGrade = DataSource_1.GeneralAcademicGradeRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.courseResolver = new CourseResolver_1.CourseResolver();
    }
    async getAcademicGrade(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAcademicGrade(args, allData, orderCreated, schoolId, schoolYearId) {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: { schoolId, schoolYearId },
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
        let resultConn = new AcademicGrade_1.AcademicGradeConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicGrade(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAcademicGrade(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicGrade(active, id, context) {
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
    async importAcademicGradeSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId, course) {
        var _a, _b, _c;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let educationLevelNew;
            let educationLevelOld = await this.repositoryEducationLevel.findOneBy(result === null || result === void 0 ? void 0 : result.educationLevelId);
            if (educationLevelOld) {
                educationLevelNew = await this.repositoryEducationLevel.findBy({
                    where: { entityBaseId: result === null || result === void 0 ? void 0 : result.educationLevelId, schoolYearId: newSchoolYearId },
                });
            }
            const model = await this.repository.create({
                name: result.name,
                educationLevelId: (educationLevelNew === null || educationLevelNew === void 0 ? void 0 : educationLevelNew.length) > 0 ? (_b = (_a = educationLevelNew[0]) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString() : null,
                specialtyId: result.specialtyId,
                generalAcademicCycleId: result.generalAcademicCycleId,
                generalAcademicGradeId: result.generalAcademicGradeId,
                schoolId: result.schoolId,
                createdByUserId: result.createdByUserId,
                updatedByUserId: result.updatedByUserId,
                active: result === null || result === void 0 ? void 0 : result.active,
                version: 0,
                schoolYearId: newSchoolYearId.toString(),
                entityBaseId: (_c = result === null || result === void 0 ? void 0 : result.id) === null || _c === void 0 ? void 0 : _c.toString(),
            });
            let resultSave = await this.repository.save(model);
            console.log('courseResolver');
            if (course) {
                await this.courseResolver.importCourseSchoolYearId(schoolId, result.id.toString(), resultSave.id.toString(), newSchoolYearId.toString());
            }
        }
        return true;
    }
    async fixAllAcademicGradeSchoolAndSchoolYear() {
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
    async deleteAcademicGrade(id, context) {
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
    async educationLevel(data) {
        let id = data.educationLevelId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryEducationLevel.findOneBy(id);
            return result;
        }
        return null;
    }
    async specialty(data) {
        let id = data.specialtyId;
        if (id !== null && id !== undefined) {
            const result = await this.repositorySpecialty.findOneBy(id);
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
    async generalAcademicGrade(data) {
        let id = data.generalAcademicGradeId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralAcademicGrade.findOneBy(id);
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
    async countStudent(data) {
        var _a;
        let id = data.schoolId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryStudent.findBy({
                where: {
                    academicGradeId: (_a = data === null || data === void 0 ? void 0 : data.id) === null || _a === void 0 ? void 0 : _a.toString(),
                },
            });
            return result === null || result === void 0 ? void 0 : result.length;
        }
        return 0;
    }
};
exports.AcademicGradeResolver = AcademicGradeResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EducationLevel_1.EducationLevel),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repositoryEducationLevel", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Specialty_1.Specialty),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repositorySpecialty", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicCycle_1.GeneralAcademicCycle),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repositoryGeneralAcademicCycle", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicGrade_1.GeneralAcademicGrade),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repositoryGeneralAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], AcademicGradeResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicGrade_1.AcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "getAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicGrade_1.AcademicGradeConnection),
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
], AcademicGradeResolver.prototype, "getAllAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicGrade_1.AcademicGrade),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicGrade_1.NewAcademicGrade, Object]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "createAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicGrade_1.AcademicGrade),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicGrade_1.NewAcademicGrade, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "updateAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "changeActiveAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldSchoolYearId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('course', () => Boolean)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String, Boolean]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "importAcademicGradeSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "fixAllAcademicGradeSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "deleteAcademicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => EducationLevel_1.EducationLevel, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "educationLevel", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Specialty_1.Specialty, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "specialty", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicCycle_1.GeneralAcademicCycle, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "generalAcademicCycle", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicGrade_1.GeneralAcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "generalAcademicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "schoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Number, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicGrade_1.AcademicGrade]),
    __metadata("design:returntype", Promise)
], AcademicGradeResolver.prototype, "countStudent", null);
exports.AcademicGradeResolver = AcademicGradeResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicGrade_1.AcademicGrade)
], AcademicGradeResolver);
