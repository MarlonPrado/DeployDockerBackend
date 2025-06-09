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
exports.AcademicAsignatureCourseResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const ExperienceLearningType_1 = require("../../enums/ExperienceLearningType");
const NewAcademicAsignatureCourse_1 = require("../../inputs/CampusAdministrator/NewAcademicAsignatureCourse");
const AcademicAsignatureCourse_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourse");
const Course_1 = require("../../models/CampusAdministrator/Course");
const ExperienceLearning_1 = require("../../models/CampusAdministrator/ExperienceLearning");
const Teacher_1 = require("../../models/CampusAdministrator/Teacher");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const GradeAssignment_1 = require("../../models/SchoolAdministrator/GradeAssignment");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let AcademicAsignatureCourseResolver = class AcademicAsignatureCourseResolver {
    constructor() {
        this.repository = DataSource_1.AcademicAsignatureCourseRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
        this.repositoryTeacher = DataSource_1.TeacherRepository;
        this.repositoryExperienceLearning = DataSource_1.ExperienceLearningRepository;
        this.repositoryGradeAssignment = DataSource_1.GradeAssignmentRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
    }
    async getAcademicAsignatureCourse(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAcademicAsignatureCourse(args, allData, orderCreated, campusId, courseId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (campusId && courseId) {
                    result = await this.repository.findBy({
                        where: { campusId, courseId },
                        order: { order: 'DESC' },
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
                            where: { courseId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (campusId && courseId) {
                    result = await this.repository.findBy({
                        where: { campusId, courseId },
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
                            where: { courseId },
                        });
                    }
                }
            }
        }
        else {
            if (orderCreated) {
                if (campusId && courseId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            courseId,
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
                                courseId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (campusId && courseId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            courseId,
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
                                courseId,
                                active: true,
                            },
                        });
                    }
                }
            }
        }
        let resultConn = new AcademicAsignatureCourse_1.AcademicAsignatureCourseConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllAcademicAsignatureCourseByCourse(args, allData, orderCreated, courseId) {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: { courseId },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: { courseId },
                });
            }
        }
        else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        courseId,
                        active: true,
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        courseId,
                        active: true,
                    },
                });
            }
        }
        let resultConn = new AcademicAsignatureCourse_1.AcademicAsignatureCourseConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllAcademicAsignatureCourseTeacher(args, teacherId, schoolYearId) {
        let result;
        result = await this.repository.findBy({
            where: {
                teacherId,
                schoolYearId,
                active: true,
            },
        });
        let resultConn = new AcademicAsignatureCourse_1.AcademicAsignatureCourseConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicAsignatureCourse(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAcademicAsignatureCourse(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicAsignatureCourse(active, id, context) {
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
    async importAcademicAsignatureSchoolYearId(schoolId, oldGradeAssignmentId, newGradeAssignmentId, newSchoolYearId) {
        var _a, _b, _c, _d, _e;
        let results = await this.repository.findBy({
            where: { schoolId, gradeAssignmentId: oldGradeAssignmentId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let courseNew;
            let courseOld = await this.repositoryCourse.findOneBy(result === null || result === void 0 ? void 0 : result.courseId);
            if (courseOld) {
                courseNew = await this.repositoryCourse.findBy({
                    where: { entityBaseId: result === null || result === void 0 ? void 0 : result.courseId, schoolYearId: newSchoolYearId },
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
                hourlyIntensity: result.hourlyIntensity,
                academicAsignatureId: (academicAsignatureNew === null || academicAsignatureNew === void 0 ? void 0 : academicAsignatureNew.length) > 0 ? (_b = (_a = academicAsignatureNew[0]) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString() : null,
                courseId: (courseNew === null || courseNew === void 0 ? void 0 : courseNew.length) > 0 ? (_d = (_c = courseNew[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString() : null,
                weight: result.weight,
                gradeAssignmentId: newGradeAssignmentId.toString(),
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
    async fixAllAcademicAsignatureCourseSchoolAndSchoolYear() {
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
                    if (result === null || result === void 0 ? void 0 : result.courseId) {
                        let course = await this.repositoryCourse.findOneBy(result === null || result === void 0 ? void 0 : result.courseId);
                        if (course && (course === null || course === void 0 ? void 0 : course.schoolId) && (course === null || course === void 0 ? void 0 : course.schoolYearId)) {
                            console.log('school 1: ', number);
                            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_h = result === null || result === void 0 ? void 0 : result.id) === null || _h === void 0 ? void 0 : _h.toString()) }, result), { schoolId: course === null || course === void 0 ? void 0 : course.schoolId, schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
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
    async deleteAcademicAsignatureCourse(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async getAllExperienceLearningAcademicPeriodEvaluativeComponentAcademicAsignatureCourse(id, academicPeriodId, evaluativeComponentId, experienceLearningType) {
        const result = await this.repositoryExperienceLearning.findBy({
            where: {
                academicAsignatureCourseId: id,
                academicPeriodId,
                evaluativeComponentsId: { $in: [evaluativeComponentId] },
                experienceLearningType,
                active: true,
            },
            order: { createdAt: 'ASC' },
        });
        return result;
    }
    async updateAcademicAsignatureCourseHourltIntensity(data, id, context) {
        var _a, _b, _c;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        let min = null;
        let max = null;
        const gradeAssignment = await this.repositoryGradeAssignment.findOneBy(result === null || result === void 0 ? void 0 : result.gradeAssignmentId);
        const academicAsignatureCourses = await this.repository.findBy({
            where: {
                gradeAssignmentId: result === null || result === void 0 ? void 0 : result.gradeAssignmentId,
                active: true,
            },
        });
        if (academicAsignatureCourses && gradeAssignment) {
            for (let academicAsignatureCourse of academicAsignatureCourses) {
                if (academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity) {
                    if (min == null && (academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity)) {
                        min = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity;
                    }
                    if (min != null && (academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity) < min) {
                        min = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity;
                    }
                    if (max == null && (academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity)) {
                        max = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity;
                    }
                    if (max != null && (academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity) > max) {
                        max = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.hourlyIntensity;
                    }
                }
            }
        }
        let resultGradeAssignment = await this.repositoryGradeAssignment.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_c = gradeAssignment === null || gradeAssignment === void 0 ? void 0 : gradeAssignment.id) === null || _c === void 0 ? void 0 : _c.toString()) }, gradeAssignment), { minHourlyIntensity: min ? min : 0, maxHourlyIntensity: max ? max : 0, version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
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
    async academicAsignature(data) {
        let id = data.academicAsignatureId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicAsignature.findOneBy(id);
            return result;
        }
        return null;
    }
    async course(data) {
        let id = data.courseId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryCourse.findOneBy(id);
            return result;
        }
        return null;
    }
    async teacher(data) {
        let id = data.teacherId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryTeacher.findOneBy(id);
            return result;
        }
        return null;
    }
    async gradeAssignment(data) {
        let id = data.gradeAssignmentId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGradeAssignment.findOneBy(id);
            return result;
        }
        return null;
    }
    async fixAcademicAsignatureCourseTeacherV2(teacherId, schoolYearId) {
        var _a, _b;
        let result;
        result = await this.repository.findBy({
            where: {
                teacherId,
                schoolYearId,
                active: true,
            },
        });
        for (let dataAcademic of result) {
            let course = await this.repositoryCourse.findOneBy((_a = dataAcademic === null || dataAcademic === void 0 ? void 0 : dataAcademic.courseId) === null || _a === void 0 ? void 0 : _a.toString());
            if (course == null) {
                console.log('inactivando');
                let resultUpdate = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_b = dataAcademic === null || dataAcademic === void 0 ? void 0 : dataAcademic.id) === null || _b === void 0 ? void 0 : _b.toString()) }, dataAcademic), { version: (dataAcademic === null || dataAcademic === void 0 ? void 0 : dataAcademic.version) + 1, active: false }));
            }
        }
        return true;
    }
};
exports.AcademicAsignatureCourseResolver = AcademicAsignatureCourseResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Teacher_1.Teacher),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositoryTeacher", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearning_1.ExperienceLearning),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositoryExperienceLearning", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GradeAssignment_1.GradeAssignment),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositoryGradeAssignment", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], AcademicAsignatureCourseResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAsignatureCourse_1.AcademicAsignatureCourse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "getAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAsignatureCourse_1.AcademicAsignatureCourseConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('campusId', () => String, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('courseId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "getAllAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAsignatureCourse_1.AcademicAsignatureCourseConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('courseId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "getAllAcademicAsignatureCourseByCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAsignatureCourse_1.AcademicAsignatureCourseConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('teacherId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "getAllAcademicAsignatureCourseTeacher", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicAsignatureCourse_1.NewAcademicAsignatureCourse, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "createAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicAsignatureCourse_1.NewAcademicAsignatureCourse, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "updateAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "changeActiveAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldGradeAssignmentId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newGradeAssignmentId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "importAcademicAsignatureSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "fixAllAcademicAsignatureCourseSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "deleteAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ExperienceLearning_1.ExperienceLearning], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('evaluativeComponentId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "getAllExperienceLearningAcademicPeriodEvaluativeComponentAcademicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicAsignatureCourse_1.NewAcademicAsignatureCourse, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "updateAcademicAsignatureCourseHourltIntensity", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignatureCourse_1.AcademicAsignatureCourse]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignatureCourse_1.AcademicAsignatureCourse]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignatureCourse_1.AcademicAsignatureCourse]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicAsignature_1.AcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignatureCourse_1.AcademicAsignatureCourse]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "academicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Course_1.Course, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignatureCourse_1.AcademicAsignatureCourse]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "course", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Teacher_1.Teacher, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignatureCourse_1.AcademicAsignatureCourse]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "teacher", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GradeAssignment_1.GradeAssignment, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignatureCourse_1.AcademicAsignatureCourse]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "gradeAssignment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('teacherId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureCourseResolver.prototype, "fixAcademicAsignatureCourseTeacherV2", null);
exports.AcademicAsignatureCourseResolver = AcademicAsignatureCourseResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicAsignatureCourse_1.AcademicAsignatureCourse)
], AcademicAsignatureCourseResolver);
