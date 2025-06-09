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
exports.PerformanceLevelResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const PerformanceLevelCategory_1 = require("../../enums/PerformanceLevelCategory");
const PerformanceLevelCategoryGrade_1 = require("../../enums/PerformanceLevelCategoryGrade");
const PerformanceLevelType_1 = require("../../enums/PerformanceLevelType");
const NewPerformanceLevel_1 = require("../../inputs/SchoolAdministrator/NewPerformanceLevel");
const AcademicAsignatureCourse_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourse");
const Course_1 = require("../../models/CampusAdministrator/Course");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const GeneralPerformanceLevel_1 = require("../../models/GeneralAdministrator/GeneralPerformanceLevel");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const PerformanceLevel_1 = require("../../models/SchoolAdministrator/PerformanceLevel");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicGrade_1 = require("./../../models/SchoolAdministrator/AcademicGrade");
let PerformanceLevelResolver = class PerformanceLevelResolver {
    constructor() {
        this.repository = DataSource_1.PerformanceLevelRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryGeneralPerformanceLevel = DataSource_1.GeneralPerformanceLevelRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryAcademicAsignatureCourse = DataSource_1.AcademicAsignatureCourseRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
    }
    async getPerformanceLevel(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllPerformanceLevel(args, allData, orderCreated, schoolId, schoolYearId) {
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
        let resultConn = new PerformanceLevel_1.PerformanceLevelConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllPerformanceLevelAcademicAsignatureCourse(args, academicAsignatureCourseId) {
        var _a, _b, _c, _d;
        let result = [];
        let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
        if (academicAsignatureCourse) {
            let course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            if (course) {
                let schoolYear = await this.repositorySchoolYear.findOneBy(course.schoolYearId);
                let campus = await this.repositoryCampus.findOneBy(course.campusId);
                if (campus) {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: [course.campusId] },
                            academicGradesId: { $in: [course.academicGradeId] },
                            schoolId: campus.schoolId,
                            schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                            active: true,
                        },
                        order: { order: 1 },
                    });
                    if (result.length === 0) {
                        result = await this.repository.findBy({
                            where: {
                                campusId: { $in: [course.campusId] },
                                schoolId: campus.schoolId,
                                schoolYearId: (_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _b === void 0 ? void 0 : _b.toString(),
                                active: true,
                            },
                            order: { order: 1 },
                        });
                        if (result.length === 0) {
                            result = await this.repository.findBy({
                                where: {
                                    academicGradesId: { $in: [course.academicGradeId] },
                                    schoolId: campus.schoolId,
                                    schoolYearId: (_c = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _c === void 0 ? void 0 : _c.toString(),
                                    active: true,
                                },
                                order: { order: 1 },
                            });
                            if (result.length === 0) {
                                result = await this.repository.findBy({
                                    where: {
                                        schoolId: campus.schoolId,
                                        schoolYearId: (_d = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _d === void 0 ? void 0 : _d.toString(),
                                        active: true,
                                    },
                                    order: { order: 1 },
                                });
                            }
                        }
                    }
                }
            }
        }
        let resultConn = new PerformanceLevel_1.PerformanceLevelConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllPerformanceLevelAcademicAsignatureCourseFinal(args, academicAsignatureCourseId) {
        var _a, _b, _c, _d;
        let result = [];
        let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
        if (academicAsignatureCourse) {
            let course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            if (course) {
                let schoolYear = await this.repositorySchoolYear.findOneBy(course.schoolYearId);
                let campus = await this.repositoryCampus.findOneBy(course.campusId);
                if (campus) {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: [course.campusId] },
                            academicGradesId: { $in: [course.academicGradeId] },
                            schoolId: campus.schoolId,
                            schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                            isFinal: true,
                            active: true,
                        },
                        order: { order: 1 },
                    });
                    if (result.length === 0) {
                        result = await this.repository.findBy({
                            where: {
                                campusId: { $in: [course.campusId] },
                                schoolId: campus.schoolId,
                                schoolYearId: (_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _b === void 0 ? void 0 : _b.toString(),
                                isFinal: true,
                                active: true,
                            },
                            order: { order: 1 },
                        });
                        if (result.length === 0) {
                            result = await this.repository.findBy({
                                where: {
                                    academicGradesId: { $in: [course.academicGradeId] },
                                    schoolId: campus.schoolId,
                                    schoolYearId: (_c = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _c === void 0 ? void 0 : _c.toString(),
                                    isFinal: true,
                                    active: true,
                                },
                                order: { order: 1 },
                            });
                            if (result.length === 0) {
                                result = await this.repository.findBy({
                                    where: {
                                        schoolId: campus.schoolId,
                                        schoolYearId: (_d = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _d === void 0 ? void 0 : _d.toString(),
                                        isFinal: true,
                                        active: true,
                                    },
                                    order: { order: 1 },
                                });
                            }
                        }
                    }
                }
            }
        }
        let resultConn = new PerformanceLevel_1.PerformanceLevelConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllPerformanceLevelAcademicCourse(args, courseId) {
        var _a, _b, _c, _d;
        let result = [];
        if (courseId) {
            let course = await this.repositoryCourse.findOneBy(courseId);
            if (course) {
                let schoolYear = await this.repositorySchoolYear.findOneBy(course.schoolYearId);
                let campus = await this.repositoryCampus.findOneBy(course.campusId);
                if (campus) {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: [course.campusId] },
                            academicGradesId: { $in: [course.academicGradeId] },
                            schoolId: campus.schoolId,
                            schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                    if (result.length === 0) {
                        result = await this.repository.findBy({
                            where: {
                                campusId: { $in: [course.campusId] },
                                schoolId: campus.schoolId,
                                schoolYearId: (_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _b === void 0 ? void 0 : _b.toString(),
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                        if (result.length === 0) {
                            result = await this.repository.findBy({
                                where: {
                                    academicGradesId: { $in: [course.academicGradeId] },
                                    schoolId: campus.schoolId,
                                    schoolYearId: (_c = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _c === void 0 ? void 0 : _c.toString(),
                                    active: true,
                                },
                                order: { createdAt: 'DESC' },
                            });
                            if (result.length === 0) {
                                result = await this.repository.findBy({
                                    where: {
                                        schoolId: campus.schoolId,
                                        schoolYearId: (_d = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _d === void 0 ? void 0 : _d.toString(),
                                        active: true,
                                    },
                                    order: { createdAt: 'DESC' },
                                });
                            }
                        }
                    }
                }
            }
        }
        let resultConn = new PerformanceLevel_1.PerformanceLevelConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllPerformanceLevelAcademicCourseFinal(args, courseId) {
        var _a, _b, _c, _d;
        let result = [];
        if (courseId) {
            let course = await this.repositoryCourse.findOneBy(courseId);
            if (course) {
                let schoolYear = await this.repositorySchoolYear.findOneBy(course.schoolYearId);
                let campus = await this.repositoryCampus.findOneBy(course.campusId);
                if (campus) {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: [course.campusId] },
                            academicGradesId: { $in: [course.academicGradeId] },
                            schoolId: campus.schoolId,
                            schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                            isFinal: true,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                    if (result.length === 0) {
                        result = await this.repository.findBy({
                            where: {
                                campusId: { $in: [course.campusId] },
                                schoolId: campus.schoolId,
                                schoolYearId: (_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _b === void 0 ? void 0 : _b.toString(),
                                isFinal: true,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                        if (result.length === 0) {
                            result = await this.repository.findBy({
                                where: {
                                    academicGradesId: { $in: [course.academicGradeId] },
                                    schoolId: campus.schoolId,
                                    schoolYearId: (_c = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _c === void 0 ? void 0 : _c.toString(),
                                    isFinal: true,
                                    active: true,
                                },
                                order: { createdAt: 'DESC' },
                            });
                            if (result.length === 0) {
                                result = await this.repository.findBy({
                                    where: {
                                        schoolId: campus.schoolId,
                                        schoolYearId: (_d = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _d === void 0 ? void 0 : _d.toString(),
                                        isFinal: true,
                                        active: true,
                                    },
                                    order: { createdAt: 'DESC' },
                                });
                            }
                        }
                    }
                }
            }
        }
        let resultConn = new PerformanceLevel_1.PerformanceLevelConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createPerformanceLevel(data, context) {
        var _a, _b, _c, _d;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        if ((dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.type) == PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE) {
            dataProcess.minimumScore = undefined;
            dataProcess.topScore = undefined;
        }
        if ((dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.campusId) && ((_c = dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.campusId) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            dataProcess.category = PerformanceLevelCategory_1.PerformanceLevelCategory.CAMPUS;
        }
        else {
            dataProcess.category = PerformanceLevelCategory_1.PerformanceLevelCategory.SCHOOL;
        }
        if ((dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.academicGradesId) && ((_d = dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.academicGradesId) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            dataProcess.categoryGrade = PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade.SPECIFIC;
        }
        else {
            dataProcess.categoryGrade = PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade.ALL;
        }
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updatePerformanceLevel(data, id, context) {
        var _a, _b, _c, _d;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        if ((dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.type) == PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE) {
            dataProcess.minimumScore = undefined;
            dataProcess.topScore = undefined;
        }
        if ((dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.campusId) && ((_c = dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.campusId) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            dataProcess.category = PerformanceLevelCategory_1.PerformanceLevelCategory.CAMPUS;
        }
        else {
            dataProcess.category = PerformanceLevelCategory_1.PerformanceLevelCategory.SCHOOL;
        }
        if ((dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.academicGradesId) && ((_d = dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.academicGradesId) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            dataProcess.categoryGrade = PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade.SPECIFIC;
        }
        else {
            dataProcess.categoryGrade = PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade.ALL;
        }
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActivePerformanceLevel(active, id, context) {
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
    async deletePerformanceLevel(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async importPerformanceLevelSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId) {
        var _a, _b, _c;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let academicGradesId = [];
            if (result === null || result === void 0 ? void 0 : result.academicGradesId) {
                for (let academicGradeId of result === null || result === void 0 ? void 0 : result.academicGradesId) {
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
                name: result.name,
                minimumScore: result.minimumScore,
                topScore: result.topScore,
                abbreviation: result.abbreviation,
                colorHex: result.colorHex,
                isFinal: result.isFinal,
                isRecovery: result.isRecovery,
                type: result.type,
                category: result.category,
                categoryGrade: result.categoryGrade,
                generalPerformanceLevelId: result.generalPerformanceLevelId,
                campusId: result.campusId,
                academicGradesId: academicGradesId,
                schoolId: result.schoolId,
                order: result.order,
                createdByUserId: result.createdByUserId,
                updatedByUserId: result.updatedByUserId,
                active: result === null || result === void 0 ? void 0 : result.active,
                version: 0,
                schoolYearId: newSchoolYearId.toString(),
                entityBaseId: (_c = result === null || result === void 0 ? void 0 : result.id) === null || _c === void 0 ? void 0 : _c.toString(),
            });
            let resultSave = await this.repository.save(model);
        }
        return true;
    }
    async fixAllPerformanceLevelSchoolAndSchoolYear() {
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
    async generalPerformanceLevel(data) {
        let id = data.generalPerformanceLevelId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralPerformanceLevel.findOneBy(id);
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
    async campus(data) {
        let ids = data.campusId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryCampus.findBy({ where: { _id: { $in: dataIds } } });
            return result;
        }
        return null;
    }
    async academicGrades(data) {
        let ids = data.academicGradesId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryAcademicGrade.findBy({
                where: { _id: { $in: dataIds } },
            });
            return result;
        }
        return null;
    }
};
exports.PerformanceLevelResolver = PerformanceLevelResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PerformanceLevel_1.PerformanceLevel),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralPerformanceLevel_1.GeneralPerformanceLevel),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repositoryGeneralPerformanceLevel", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repositoryAcademicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], PerformanceLevelResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "getPerformanceLevel", null);
__decorate([
    (0, type_graphql_1.Query)(() => PerformanceLevel_1.PerformanceLevelConnection),
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
], PerformanceLevelResolver.prototype, "getAllPerformanceLevel", null);
__decorate([
    (0, type_graphql_1.Query)(() => PerformanceLevel_1.PerformanceLevelConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "getAllPerformanceLevelAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => PerformanceLevel_1.PerformanceLevelConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "getAllPerformanceLevelAcademicAsignatureCourseFinal", null);
__decorate([
    (0, type_graphql_1.Query)(() => PerformanceLevel_1.PerformanceLevelConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('courseId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "getAllPerformanceLevelAcademicCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => PerformanceLevel_1.PerformanceLevelConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('courseId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "getAllPerformanceLevelAcademicCourseFinal", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => PerformanceLevel_1.PerformanceLevel),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewPerformanceLevel_1.NewPerformanceLevel, Object]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "createPerformanceLevel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => PerformanceLevel_1.PerformanceLevel),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewPerformanceLevel_1.NewPerformanceLevel, String, Object]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "updatePerformanceLevel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "changeActivePerformanceLevel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "deletePerformanceLevel", null);
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
], PerformanceLevelResolver.prototype, "importPerformanceLevelSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "fixAllPerformanceLevelSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PerformanceLevel_1.PerformanceLevel]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PerformanceLevel_1.PerformanceLevel]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralPerformanceLevel_1.GeneralPerformanceLevel, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PerformanceLevel_1.PerformanceLevel]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "generalPerformanceLevel", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PerformanceLevel_1.PerformanceLevel]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PerformanceLevel_1.PerformanceLevel]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "schoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [Campus_1.Campus], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PerformanceLevel_1.PerformanceLevel]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [AcademicGrade_1.AcademicGrade], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PerformanceLevel_1.PerformanceLevel]),
    __metadata("design:returntype", Promise)
], PerformanceLevelResolver.prototype, "academicGrades", null);
exports.PerformanceLevelResolver = PerformanceLevelResolver = __decorate([
    (0, type_graphql_1.Resolver)(PerformanceLevel_1.PerformanceLevel)
], PerformanceLevelResolver);
