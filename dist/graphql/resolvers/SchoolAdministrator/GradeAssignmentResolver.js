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
exports.GradeAssignmentResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewGradeAssignment_1 = require("../../inputs/SchoolAdministrator/NewGradeAssignment");
const AcademicAsignatureCourse_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourse");
const Course_1 = require("../../models/CampusAdministrator/Course");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const GradeAssignment_1 = require("../../models/SchoolAdministrator/GradeAssignment");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicAsignatureCourseResolver_1 = require("../CampusAdministrator/AcademicAsignatureCourseResolver");
const AcademicGrade_1 = require("./../../models/SchoolAdministrator/AcademicGrade");
let GradeAssignmentResolver = class GradeAssignmentResolver {
    constructor() {
        this.repository = DataSource_1.GradeAssignmentRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositoryAcademicAsignatureCourse = DataSource_1.AcademicAsignatureCourseRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.academicAsignatureCourseResolver = new AcademicAsignatureCourseResolver_1.AcademicAsignatureCourseResolver();
    }
    async getGradeAssignment(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllGradeAssignment(args, allData, orderCreated, schoolId, academicAsignatureId, academicGradeId) {
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
                            schoolId,
                            academicAsignatureId,
                            academicGradeId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (academicAsignatureId) {
                        result = await this.repository.findBy({
                            where: {
                                schoolId,
                                academicAsignatureId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                schoolId,
                                academicGradeId,
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
                            schoolId,
                            academicAsignatureId,
                            academicGradeId,
                            active: true,
                        },
                    });
                }
                else {
                    if (academicAsignatureId) {
                        result = await this.repository.findBy({
                            where: {
                                schoolId,
                                academicAsignatureId,
                                active: true,
                            },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                schoolId,
                                academicGradeId,
                                active: true,
                            },
                        });
                    }
                }
            }
        }
        let resultConn = new GradeAssignment_1.GradeAssignmentConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllGradeAssignmentNotAssignedInCourse(args, courseId) {
        let course = await this.repositoryCourse.findOneBy(courseId);
        let result = [];
        if (course) {
            let academicAsignatureCourseAsignatureIds = [];
            let academicAsignaturesCourseAsignature = await this.repositoryAcademicAsignatureCourse.findBy({
                where: {
                    courseId,
                    active: true,
                },
            });
            academicAsignaturesCourseAsignature.forEach((academicAsignatureCourseAsignature) => {
                academicAsignatureCourseAsignatureIds.push(academicAsignatureCourseAsignature.academicAsignatureId);
            });
            result = await this.repository.findBy({
                where: {
                    academicGradeId: course.academicGradeId,
                    academicAsignatureId: { $nin: academicAsignatureCourseAsignatureIds },
                    active: true,
                },
            });
        }
        let resultConn = new GradeAssignment_1.GradeAssignmentConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createGradeAssignment(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        let courses = await this.repositoryCourse.findBy({
            where: {
                academicGradeId: result === null || result === void 0 ? void 0 : result.academicGradeId,
                schoolYearId: result === null || result === void 0 ? void 0 : result.schoolYearId,
            },
        });
        if (courses) {
            for (let course of courses) {
                let repositoryAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findBy({
                    where: {
                        academicAsignatureId: result === null || result === void 0 ? void 0 : result.academicAsignatureId,
                        courseId: course === null || course === void 0 ? void 0 : course.id.toString(),
                        schoolYearId: result === null || result === void 0 ? void 0 : result.schoolYearId,
                    },
                });
                if (repositoryAcademicAsignatureCourse.length === 0) {
                    const modelAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.create({
                        hourlyIntensity: result === null || result === void 0 ? void 0 : result.minHourlyIntensity,
                        academicAsignatureId: result === null || result === void 0 ? void 0 : result.academicAsignatureId,
                        courseId: course === null || course === void 0 ? void 0 : course.id.toString(),
                        gradeAssignmentId: result === null || result === void 0 ? void 0 : result.id.toString(),
                        schoolYearId: result === null || result === void 0 ? void 0 : result.schoolYearId,
                        active: true,
                        version: 0,
                        createdByUserId,
                    });
                    let resultAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.save(modelAcademicAsignatureCourse);
                }
            }
        }
        return result;
    }
    async updateGradeAssignment(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveGradeAssignment(active, id, context) {
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
    async importGradeAssignmentSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId, academicAsignatureCourse) {
        var _a, _b, _c, _d, _e;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let academicGradeNew;
            let academicGradeOld = await this.repositoryAcademicGrade.findOneBy(result === null || result === void 0 ? void 0 : result.academicGradeId);
            if (academicGradeOld) {
                academicGradeNew = await this.repositoryAcademicGrade.findBy({
                    where: { entityBaseId: result === null || result === void 0 ? void 0 : result.academicGradeId, schoolYearId: newSchoolYearId },
                });
            }
            let academicAsignatureNew;
            let academicAsignatureOld = await this.repositoryAcademicAsignature.findOneBy(result === null || result === void 0 ? void 0 : result.academicAsignatureId);
            if (academicAsignatureOld) {
                academicAsignatureNew = await this.repositoryAcademicAsignature.findBy({
                    where: { entityBaseId: result === null || result === void 0 ? void 0 : result.academicAsignatureId, schoolYearId: newSchoolYearId },
                });
            }
            const model = await this.repository.create({
                minHourlyIntensity: result.minHourlyIntensity,
                maxHourlyIntensity: result.maxHourlyIntensity,
                academicGradeId: (academicGradeNew === null || academicGradeNew === void 0 ? void 0 : academicGradeNew.length) > 0 ? (_b = (_a = academicGradeNew[0]) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString() : null,
                academicAsignatureId: (academicAsignatureNew === null || academicAsignatureNew === void 0 ? void 0 : academicAsignatureNew.length) > 0 ? (_d = (_c = academicAsignatureNew[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString() : null,
                schoolId: result.schoolId,
                createdByUserId: result.createdByUserId,
                updatedByUserId: result.updatedByUserId,
                active: result === null || result === void 0 ? void 0 : result.active,
                version: 0,
                schoolYearId: newSchoolYearId.toString(),
                entityBaseId: (_e = result === null || result === void 0 ? void 0 : result.id) === null || _e === void 0 ? void 0 : _e.toString(),
            });
            let resultSave = await this.repository.save(model);
            console.log('academicAsignatureCourseResolver');
            if (academicAsignatureCourse) {
                await this.academicAsignatureCourseResolver.importAcademicAsignatureSchoolYearId(schoolId, result.id.toString(), resultSave.id.toString(), newSchoolYearId.toString());
            }
        }
        return true;
    }
    async fixAllGradeAssignmentSchoolAndSchoolYear() {
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
                    if (result === null || result === void 0 ? void 0 : result.academicGradeId) {
                        let academicGrade = await this.repositoryAcademicGrade.findOneBy(result === null || result === void 0 ? void 0 : result.academicGradeId);
                        if (academicGrade && (academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.schoolId) && (academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.schoolYearId)) {
                            console.log('school 1: ', number);
                            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_h = result === null || result === void 0 ? void 0 : result.id) === null || _h === void 0 ? void 0 : _h.toString()) }, result), { schoolId: academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.schoolId, schoolYearId: academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.schoolYearId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
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
    async deleteGradeAssignment(id, context) {
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
    async academicGrade(data) {
        let id = data.academicGradeId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicGrade.findOneBy(id);
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
    async school(data) {
        let id = data.schoolId;
        if (id !== null && id !== undefined) {
            const result = await this.repositorySchool.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.GradeAssignmentResolver = GradeAssignmentResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GradeAssignment_1.GradeAssignment),
    __metadata("design:type", Object)
], GradeAssignmentResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], GradeAssignmentResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], GradeAssignmentResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], GradeAssignmentResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], GradeAssignmentResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __metadata("design:type", Object)
], GradeAssignmentResolver.prototype, "repositoryAcademicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], GradeAssignmentResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], GradeAssignmentResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => GradeAssignment_1.GradeAssignment, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "getGradeAssignment", null);
__decorate([
    (0, type_graphql_1.Query)(() => GradeAssignment_1.GradeAssignmentConnection),
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
], GradeAssignmentResolver.prototype, "getAllGradeAssignment", null);
__decorate([
    (0, type_graphql_1.Query)(() => GradeAssignment_1.GradeAssignmentConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('courseId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs, String]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "getAllGradeAssignmentNotAssignedInCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GradeAssignment_1.GradeAssignment),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGradeAssignment_1.NewGradeAssignment, Object]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "createGradeAssignment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => GradeAssignment_1.GradeAssignment),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewGradeAssignment_1.NewGradeAssignment, String, Object]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "updateGradeAssignment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "changeActiveGradeAssignment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldSchoolYearId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('academicAsignatureCourse', () => Boolean)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String, Boolean]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "importGradeAssignmentSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "fixAllGradeAssignmentSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "deleteGradeAssignment", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GradeAssignment_1.GradeAssignment]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GradeAssignment_1.GradeAssignment]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicGrade_1.AcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GradeAssignment_1.GradeAssignment]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "academicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicAsignature_1.AcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GradeAssignment_1.GradeAssignment]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "academicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GradeAssignment_1.GradeAssignment]),
    __metadata("design:returntype", Promise)
], GradeAssignmentResolver.prototype, "school", null);
exports.GradeAssignmentResolver = GradeAssignmentResolver = __decorate([
    (0, type_graphql_1.Resolver)(GradeAssignment_1.GradeAssignment)
], GradeAssignmentResolver);
