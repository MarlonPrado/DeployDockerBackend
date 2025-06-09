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
exports.SchoolYearResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const AcademicHourResolver_1 = require("./../CampusAdministrator/AcademicHourResolver");
const CourseResolver_1 = require("./../CampusAdministrator/CourseResolver");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const EvaluativeComponentType_1 = require("../../enums/EvaluativeComponentType");
const PerformanceLevelCategory_1 = require("../../enums/PerformanceLevelCategory");
const PerformanceLevelCategoryGrade_1 = require("../../enums/PerformanceLevelCategoryGrade");
const PerformanceLevelType_1 = require("../../enums/PerformanceLevelType");
const NewSchoolYear_1 = require("../../inputs/SchoolAdministrator/NewSchoolYear");
const AcademicDay_1 = require("../../models/CampusAdministrator/AcademicDay");
const Teacher_1 = require("../../models/CampusAdministrator/Teacher");
const School_1 = require("../../models/GeneralAdministrator/School");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicArea_1 = require("../../models/SchoolAdministrator/AcademicArea");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const AcademicPeriod_1 = require("../../models/SchoolAdministrator/AcademicPeriod");
const EducationLevel_1 = require("../../models/SchoolAdministrator/EducationLevel");
const EvaluativeComponent_1 = require("../../models/SchoolAdministrator/EvaluativeComponent");
const GradeAssignment_1 = require("../../models/SchoolAdministrator/GradeAssignment");
const Modality_1 = require("../../models/SchoolAdministrator/Modality");
const PerformanceLevel_1 = require("../../models/SchoolAdministrator/PerformanceLevel");
const SchoolConfiguration_1 = require("../../models/SchoolAdministrator/SchoolConfiguration");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const AcademicAsignatureCourseResolver_1 = require("../CampusAdministrator/AcademicAsignatureCourseResolver");
const AcademicDayResolver_1 = require("../CampusAdministrator/AcademicDayResolver");
const TeacherResolver_1 = require("../CampusAdministrator/TeacherResolver");
const StudentResolver_1 = require("../GeneralAdministrator/StudentResolver");
const AcademicAreaResolver_1 = require("./AcademicAreaResolver");
const AcademicAsignatureResolver_1 = require("./AcademicAsignatureResolver");
const AcademicGradeResolver_1 = require("./AcademicGradeResolver");
const AcademicPeriodResolver_1 = require("./AcademicPeriodResolver");
const EducationLevelResolver_1 = require("./EducationLevelResolver");
const EvaluativeComponentResolver_1 = require("./EvaluativeComponentResolver");
const GradeAssignmentResolver_1 = require("./GradeAssignmentResolver");
const ModalityResolver_1 = require("./ModalityResolver");
const PerformanceLevelResolver_1 = require("./PerformanceLevelResolver");
const SchoolConfigurationResolver_1 = require("./SchoolConfigurationResolver");
const SpecialtyResolver_1 = require("./SpecialtyResolver");
let SchoolYearResolver = class SchoolYearResolver {
    constructor() {
        this.repository = DataSource_1.SchoolYearRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositoryAcademicPeriod = DataSource_1.AcademicPeriodRepository;
        this.repositoryEducationLevel = DataSource_1.EducationLevelRepository;
        this.repositoryPerformanceLevel = DataSource_1.PerformanceLevelRepository;
        this.repositoryEvaluativeComponent = DataSource_1.EvaluativeComponentRepository;
        this.repositoryAcademicArea = DataSource_1.AcademicAreaRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryAcademicDay = DataSource_1.AcademicDayRepository;
        this.repositoryModality = DataSource_1.ModalityRepository;
        this.repositoryGradeAssignment = DataSource_1.GradeAssignmentRepository;
        this.repositorySchoolConfiguration = DataSource_1.SchoolConfigurationRepository;
        this.repositoryTeacher = DataSource_1.TeacherRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.academicDayResolver = new AcademicDayResolver_1.AcademicDayResolver();
        this.academicHourResolver = new AcademicHourResolver_1.AcademicHourResolver();
        this.studentResolver = new StudentResolver_1.StudentResolver();
        this.academicPeriodResolver = new AcademicPeriodResolver_1.AcademicPeriodResolver();
        this.educationLevelResolver = new EducationLevelResolver_1.EducationLevelResolver();
        this.performanceLevelResolver = new PerformanceLevelResolver_1.PerformanceLevelResolver();
        this.evaluativeComponentResolver = new EvaluativeComponentResolver_1.EvaluativeComponentResolver();
        this.modalityResolver = new ModalityResolver_1.ModalityResolver();
        this.specialtyResolver = new SpecialtyResolver_1.SpecialtyResolver();
        this.academicAreaResolver = new AcademicAreaResolver_1.AcademicAreaResolver();
        this.academicAsignatureResolver = new AcademicAsignatureResolver_1.AcademicAsignatureResolver();
        this.academicGradeResolver = new AcademicGradeResolver_1.AcademicGradeResolver();
        this.courseResolver = new CourseResolver_1.CourseResolver();
        this.gradeAssignmentResolver = new GradeAssignmentResolver_1.GradeAssignmentResolver();
        this.schoolConfigurationResolver = new SchoolConfigurationResolver_1.SchoolConfigurationResolver();
        this.academicAsignatureCourseResolver = new AcademicAsignatureCourseResolver_1.AcademicAsignatureCourseResolver();
        this.teacherResolver = new TeacherResolver_1.TeacherResolver();
    }
    async getSchoolYear(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllSchoolYear(args, allData, orderCreated, schoolId) {
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
        let resultConn = new SchoolYear_1.SchoolYearConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createSchoolYear(data, context) {
        var _a, _b, _c;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        if (result === null || result === void 0 ? void 0 : result.schoolYearImportId) {
            this.importDataSchoolActiveOldYear((result === null || result === void 0 ? void 0 : result.schoolId) + '', result === null || result === void 0 ? void 0 : result.schoolYearImportId, (_c = result === null || result === void 0 ? void 0 : result.id) === null || _c === void 0 ? void 0 : _c.toString());
        }
        return result;
    }
    async updateSchoolYear(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveSchoolYear(active, id, context) {
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
    async deleteSchoolYear(id, context) {
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
    async schoolYearImport(data) {
        let id = data.schoolYearImportId;
        if (id !== null && id !== undefined) {
            const result = await this.repository.findOneBy(id);
            return result;
        }
        return null;
    }
    async importDataSchoolActiveOldYear(schoolId, schoolYearOldId, schoolYearNewId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
        let dataSchoolYearOld = await this.repository.findOneBy(schoolYearOldId);
        let dataSchoolYearNew = await this.repository.findOneBy(schoolYearNewId);
        if (dataSchoolYearOld) {
            let schoolYear = dataSchoolYearOld;
            if (dataSchoolYearNew) {
                let newSchoolYear = dataSchoolYearNew;
                let dataSchoolConfigurationNew = await this.repositorySchoolConfiguration.findBy({
                    where: { schoolId: schoolId, schoolYearId: (_a = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _a === void 0 ? void 0 : _a.toString() },
                });
                console.log('School Configuration New: ', dataSchoolConfigurationNew === null || dataSchoolConfigurationNew === void 0 ? void 0 : dataSchoolConfigurationNew.length);
                if (dataSchoolConfigurationNew.length == 0) {
                    await this.schoolConfigurationResolver.importSchoolConfigurationSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString());
                }
                if ((_b = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _b === void 0 ? void 0 : _b.academicPeriod) {
                    let dataAcademicPeriodsNew = await this.repositoryAcademicPeriod.findBy({
                        where: {
                            schoolId: schoolId,
                            schoolYearId: (_c = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _c === void 0 ? void 0 : _c.toString(),
                        },
                    });
                    console.log('Academic Periods New: ', dataAcademicPeriodsNew === null || dataAcademicPeriodsNew === void 0 ? void 0 : dataAcademicPeriodsNew.length);
                    if (dataAcademicPeriodsNew.length == 0) {
                        await this.academicPeriodResolver.importAcademicPeriodSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString());
                    }
                }
                if ((_d = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _d === void 0 ? void 0 : _d.educationLevel) {
                    let dataEducationLevelNew = await this.repositoryEducationLevel.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_e = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _e === void 0 ? void 0 : _e.toString() },
                    });
                    console.log('Education Level New: ', dataEducationLevelNew === null || dataEducationLevelNew === void 0 ? void 0 : dataEducationLevelNew.length);
                    if (dataEducationLevelNew.length == 0) {
                        await this.educationLevelResolver.importEducationLevelSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString());
                    }
                }
                if ((_f = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _f === void 0 ? void 0 : _f.academicDay) {
                    let dataAcademicDayNew = await this.repositoryAcademicDay.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_g = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _g === void 0 ? void 0 : _g.toString() },
                    });
                    console.log('Academic Day New: ', dataAcademicDayNew === null || dataAcademicDayNew === void 0 ? void 0 : dataAcademicDayNew.length);
                    if (dataAcademicDayNew.length == 0) {
                        await this.academicDayResolver.importAcademicDaySchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString(), ((_h = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _h === void 0 ? void 0 : _h.academicHour)
                            ? (_j = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _j === void 0 ? void 0 : _j.academicHour
                            : false);
                    }
                }
                if ((_k = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _k === void 0 ? void 0 : _k.modality) {
                    let dataModalityNew = await this.repositoryModality.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_l = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _l === void 0 ? void 0 : _l.toString() },
                    });
                    console.log('Modality New: ', dataModalityNew === null || dataModalityNew === void 0 ? void 0 : dataModalityNew.length);
                    if (dataModalityNew.length == 0) {
                        await this.modalityResolver.importModalitySchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString(), ((_m = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _m === void 0 ? void 0 : _m.speciality)
                            ? (_o = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _o === void 0 ? void 0 : _o.speciality
                            : false);
                    }
                }
                if ((_p = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _p === void 0 ? void 0 : _p.grade) {
                    let dataAcademicGradeNew = await this.repositoryAcademicGrade.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_q = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _q === void 0 ? void 0 : _q.toString() },
                    });
                    console.log('Academic Grade New: ', dataAcademicGradeNew === null || dataAcademicGradeNew === void 0 ? void 0 : dataAcademicGradeNew.length);
                    if ((dataAcademicGradeNew === null || dataAcademicGradeNew === void 0 ? void 0 : dataAcademicGradeNew.length) == 0) {
                        await this.academicGradeResolver.importAcademicGradeSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString(), ((_r = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _r === void 0 ? void 0 : _r.course)
                            ? (_s = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _s === void 0 ? void 0 : _s.course
                            : false);
                    }
                }
                if ((_t = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _t === void 0 ? void 0 : _t.performanceLevel) {
                    let dataPerformanceLevelNew = await this.repositoryPerformanceLevel.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_u = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _u === void 0 ? void 0 : _u.toString() },
                    });
                    console.log('Performance Level New: ', dataPerformanceLevelNew === null || dataPerformanceLevelNew === void 0 ? void 0 : dataPerformanceLevelNew.length);
                    if ((dataPerformanceLevelNew === null || dataPerformanceLevelNew === void 0 ? void 0 : dataPerformanceLevelNew.length) == 0) {
                        await this.performanceLevelResolver.importPerformanceLevelSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString());
                    }
                }
                if ((_v = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _v === void 0 ? void 0 : _v.area) {
                    let dataAcademicAreaNew = await this.repositoryAcademicArea.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_w = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _w === void 0 ? void 0 : _w.toString() },
                    });
                    console.log('Academic Area New: ', dataAcademicAreaNew === null || dataAcademicAreaNew === void 0 ? void 0 : dataAcademicAreaNew.length);
                    if ((dataAcademicAreaNew === null || dataAcademicAreaNew === void 0 ? void 0 : dataAcademicAreaNew.length) == 0) {
                        await this.academicAreaResolver.importAcademicAreaSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString(), ((_x = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _x === void 0 ? void 0 : _x.asignature)
                            ? (_y = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _y === void 0 ? void 0 : _y.asignature
                            : false);
                    }
                }
                if ((_z = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _z === void 0 ? void 0 : _z.evaluativeComponent) {
                    let dataEvaluativeComponentNew = await this.repositoryEvaluativeComponent.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_0 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _0 === void 0 ? void 0 : _0.toString() },
                    });
                    console.log('Evaluative Component New: ', dataEvaluativeComponentNew === null || dataEvaluativeComponentNew === void 0 ? void 0 : dataEvaluativeComponentNew.length);
                    if ((dataEvaluativeComponentNew === null || dataEvaluativeComponentNew === void 0 ? void 0 : dataEvaluativeComponentNew.length) == 0) {
                        await this.evaluativeComponentResolver.importEvaluativeComponentSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString());
                    }
                }
                if ((_1 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _1 === void 0 ? void 0 : _1.gradeAssignment) {
                    let dataGradeAssignmentNew = await this.repositoryGradeAssignment.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_2 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _2 === void 0 ? void 0 : _2.toString() },
                    });
                    console.log('Grade Assigment New: ', dataGradeAssignmentNew === null || dataGradeAssignmentNew === void 0 ? void 0 : dataGradeAssignmentNew.length);
                    if ((dataGradeAssignmentNew === null || dataGradeAssignmentNew === void 0 ? void 0 : dataGradeAssignmentNew.length) == 0) {
                        await this.gradeAssignmentResolver.importGradeAssignmentSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString(), ((_3 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _3 === void 0 ? void 0 : _3.academicAsignatureCourse)
                            ? (_4 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _4 === void 0 ? void 0 : _4.academicAsignatureCourse
                            : false);
                    }
                }
                if ((_5 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _5 === void 0 ? void 0 : _5.teacher) {
                    let dataTeacherNew = await this.repositoryTeacher.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_6 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _6 === void 0 ? void 0 : _6.toString() },
                    });
                    console.log('Teacher New: ', dataTeacherNew === null || dataTeacherNew === void 0 ? void 0 : dataTeacherNew.length);
                    if ((dataTeacherNew === null || dataTeacherNew === void 0 ? void 0 : dataTeacherNew.length) == 0) {
                        await this.teacherResolver.importTeacherSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString());
                    }
                }
                if (((_7 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _7 === void 0 ? void 0 : _7.studentPromoted) ||
                    ((_8 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _8 === void 0 ? void 0 : _8.studentNoPromoted)) {
                    let dataStudentNew = await this.repositoryStudent.findBy({
                        where: { schoolId: schoolId, schoolYearId: (_9 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.id) === null || _9 === void 0 ? void 0 : _9.toString() },
                    });
                    console.log('Student New: ', dataStudentNew === null || dataStudentNew === void 0 ? void 0 : dataStudentNew.length);
                    if ((dataStudentNew === null || dataStudentNew === void 0 ? void 0 : dataStudentNew.length) == 0) {
                        await this.studentResolver.importStudentSchoolYearId(schoolId, schoolYear.id.toString(), newSchoolYear.id.toString(), ((_10 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _10 === void 0 ? void 0 : _10.studentPromoted)
                            ? (_11 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _11 === void 0 ? void 0 : _11.studentPromoted
                            : false, ((_12 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _12 === void 0 ? void 0 : _12.studentNoPromoted)
                            ? (_13 = newSchoolYear === null || newSchoolYear === void 0 ? void 0 : newSchoolYear.schoolYearImportOptions) === null || _13 === void 0 ? void 0 : _13.studentNoPromoted
                            : false);
                    }
                }
                console.log('Step: Final');
            }
        }
        else {
        }
        return true;
    }
    async fixSchoolIdAndSchoolYearId() {
        await this.educationLevelResolver.fixAllEducationLevelSchoolAndSchoolYear();
        await this.academicDayResolver.fixAllAcademicDaySchoolAndSchoolYear();
        await this.academicHourResolver.fixAllAcademicHourSchoolAndSchoolYear();
        await this.modalityResolver.fixAllModalitySchoolAndSchoolYear();
        await this.specialtyResolver.fixAllSpecialtySchoolAndSchoolYear();
        await this.academicGradeResolver.fixAllAcademicGradeSchoolAndSchoolYear();
        await this.courseResolver.fixAllCourseSchoolAndSchoolYear();
        await this.performanceLevelResolver.fixAllPerformanceLevelSchoolAndSchoolYear();
        await this.academicAreaResolver.fixAllAcademicAreaSchoolAndSchoolYear();
        await this.academicAsignatureResolver.fixAllAcademicAsignatureSchoolAndSchoolYear();
        await this.evaluativeComponentResolver.fixAllEvaluativeComponentSchoolAndSchoolYear();
        await this.gradeAssignmentResolver.fixAllGradeAssignmentSchoolAndSchoolYear();
        await this.academicAsignatureCourseResolver.fixAllAcademicAsignatureCourseSchoolAndSchoolYear();
        await this.teacherResolver.fixAllTeacherSchoolAndSchoolYear();
        await this.studentResolver.fixAllSudentSchoolAndSchoolYear();
        let dataSchoolYears = await this.repository.findBy({
            where: {
                schoolYearImportId: { $ne: null },
            },
        });
        console.log(dataSchoolYears === null || dataSchoolYears === void 0 ? void 0 : dataSchoolYears.length);
        return true;
    }
    async createSchoolYearsCode() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88;
        let dataSchoolCreate = [
            '254003002278',
            '254003000364',
            '254003000062',
            '254003000445',
            '254003000046',
            '254003000381',
            '254003002359',
            '154003000823',
            '254003000330',
            '254003000526',
            '154003001668',
            '254051000821',
            '254099000289',
            '254109000177',
            '254109000096',
            '154128000680',
            '154128000019',
            '254172000233',
            '254172000039',
            '254174000371',
            '254206000149',
            '154206000012',
            '254206001030',
            '254206000041',
            '254206000157',
            '154206000021',
            '254206001196',
            '254206001102',
            '254223000691',
            '254245000776',
            '254245000270',
            '154245000607',
            '254245000041',
            '254245001292',
            '254810000629',
            '254670000488',
            '254670000445',
            '154670001056',
            '254810000106',
            '254261000166',
            '254261000476',
            '154261000099',
            '254261000484',
            '154313000033',
            '254313000054',
            '254344000338',
            '254344000133',
            '254344000290',
            '154344000465',
            '254385000270',
            '254385000121',
            '254398000490',
            '254398000368',
            '254398000724',
            '254398000121',
            '254398000732',
            '154377000207',
            '154405000986',
            '354405000098',
            '254874000363',
            '254874000568',
            '154418000331',
            '154480000118',
            '254480000066',
            '254480000139',
            '154498000018',
            '154498000085',
            '254498000721',
            '154498001944',
            '254498000705',
            '254498000144',
            '154498001928',
            '154498000069',
            '154498002223',
            '254498000209',
            '154518000753',
            '154518000273',
            '254001004761',
            '154660000698',
            '254660000200',
            '254670000798',
            '254670000470',
            '254670000364',
            '254670001301',
            '254720001677',
            '254720000034',
            '254720000930',
            '254743000104',
            '254800000582',
            '254800000108',
            '154810003020',
            '254810000696',
            '254810000386',
            '254810002265',
            '254810000165',
            '254810002061',
            '254810001013',
            '254820000759',
            '254820000368',
            '254820000384',
            '254820000856',
            '254820000848',
            '254874000070',
        ];
        let dataSchool = await this.repositorySchool.findBy({
            where: { daneCode: { $in: dataSchoolCreate } },
        });
        let countSchools = dataSchool === null || dataSchool === void 0 ? void 0 : dataSchool.length;
        let countNoYears = 0;
        console.log('SCHOOLS: ', countSchools);
        for (let school of dataSchool) {
            if (school === null || school === void 0 ? void 0 : school.active) {
                console.log('SCHOOL: ', school === null || school === void 0 ? void 0 : school.daneCode);
                let schoolYear = await this.repository.findBy({
                    where: { schoolYear: 2024, schoolId: (_a = school === null || school === void 0 ? void 0 : school.id) === null || _a === void 0 ? void 0 : _a.toString() },
                });
                console.log('SCHOOL YEARS: ', schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.length);
                if ((schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.length) == 0) {
                    countNoYears++;
                    const model = await this.repository.create({
                        schoolYear: 2024,
                        startDate: new Date(2024, 0, 1),
                        endDate: new Date(2024, 11, 31),
                        schoolId: (_b = school === null || school === void 0 ? void 0 : school.id) === null || _b === void 0 ? void 0 : _b.toString(),
                        active: true,
                        version: 0,
                    });
                    let resultSchoolYear = await this.repository.save(model);
                    if (resultSchoolYear != null) {
                        const modelAcademicPeriod1 = await this.repositoryAcademicPeriod.create({
                            name: 'Primer Periodo',
                            startDate: new Date(2024, 0, 1),
                            endDate: new Date(2024, 3, 30),
                            startDateRecovery: new Date(2024, 0, 1),
                            endDateRecovery: new Date(2024, 3, 30),
                            weight: 33,
                            order: 1,
                            schoolId: (_c = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _c === void 0 ? void 0 : _c.toString(),
                            schoolYearId: (_d = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _d === void 0 ? void 0 : _d.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicPeriod1 = await this.repositoryAcademicPeriod.save(modelAcademicPeriod1);
                        const modelAcademicPeriod2 = await this.repositoryAcademicPeriod.create({
                            name: 'Segundo Periodo',
                            startDate: new Date(2024, 4, 1),
                            endDate: new Date(2024, 7, 31),
                            startDateRecovery: new Date(2024, 4, 1),
                            endDateRecovery: new Date(2024, 7, 31),
                            weight: 33,
                            order: 2,
                            schoolId: (_e = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _e === void 0 ? void 0 : _e.toString(),
                            schoolYearId: (_f = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _f === void 0 ? void 0 : _f.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicPeriod2 = await this.repositoryAcademicPeriod.save(modelAcademicPeriod2);
                        const modelAcademicPeriod3 = await this.repositoryAcademicPeriod.create({
                            name: 'Tercer Periodo',
                            startDate: new Date(2024, 8, 1),
                            endDate: new Date(2024, 11, 31),
                            startDateRecovery: new Date(2024, 8, 1),
                            endDateRecovery: new Date(2024, 11, 31),
                            weight: 34,
                            order: 3,
                            schoolId: (_g = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _g === void 0 ? void 0 : _g.toString(),
                            schoolYearId: (_h = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _h === void 0 ? void 0 : _h.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicPeriod3 = await this.repositoryAcademicPeriod.save(modelAcademicPeriod3);
                        const modelPerformanceLevel1 = await this.repositoryPerformanceLevel.create({
                            name: 'Bajo',
                            minimumScore: 0.0,
                            topScore: 3.0,
                            isFinal: true,
                            isRecovery: true,
                            type: PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE,
                            category: PerformanceLevelCategory_1.PerformanceLevelCategory.SCHOOL,
                            categoryGrade: PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade.ALL,
                            generalPerformanceLevelId: '60e45535e0ca01f690a7b78f',
                            campusId: [],
                            academicGradesId: [],
                            order: 1,
                            schoolId: (_j = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _j === void 0 ? void 0 : _j.toString(),
                            schoolYearId: (_k = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _k === void 0 ? void 0 : _k.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultPerfomanceLevel1 = await this.repositoryPerformanceLevel.save(modelPerformanceLevel1);
                        const modelPerformanceLevel2 = await this.repositoryPerformanceLevel.create({
                            name: 'Basico',
                            minimumScore: 3.0,
                            topScore: 4.0,
                            isFinal: true,
                            isRecovery: false,
                            type: PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE,
                            category: PerformanceLevelCategory_1.PerformanceLevelCategory.SCHOOL,
                            categoryGrade: PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade.ALL,
                            generalPerformanceLevelId: '60e4552fe0ca01f690a7b78e',
                            campusId: [],
                            academicGradesId: [],
                            order: 2,
                            schoolId: (_l = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _l === void 0 ? void 0 : _l.toString(),
                            schoolYearId: (_m = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _m === void 0 ? void 0 : _m.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultPerfomanceLevel2 = await this.repositoryPerformanceLevel.save(modelPerformanceLevel2);
                        const modelPerformanceLevel3 = await this.repositoryPerformanceLevel.create({
                            name: 'Alto',
                            minimumScore: 4.0,
                            topScore: 4.5,
                            isFinal: true,
                            isRecovery: false,
                            type: PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE,
                            category: PerformanceLevelCategory_1.PerformanceLevelCategory.SCHOOL,
                            categoryGrade: PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade.ALL,
                            generalPerformanceLevelId: '60e45524e0ca01f690a7b78d',
                            campusId: [],
                            academicGradesId: [],
                            order: 3,
                            schoolId: (_o = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _o === void 0 ? void 0 : _o.toString(),
                            schoolYearId: (_p = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _p === void 0 ? void 0 : _p.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultPerfomanceLevel3 = await this.repositoryPerformanceLevel.save(modelPerformanceLevel3);
                        const modelPerformanceLevel4 = await this.repositoryPerformanceLevel.create({
                            name: 'Superior',
                            minimumScore: 4.5,
                            topScore: 5.0,
                            isFinal: true,
                            isRecovery: false,
                            type: PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE,
                            category: PerformanceLevelCategory_1.PerformanceLevelCategory.SCHOOL,
                            categoryGrade: PerformanceLevelCategoryGrade_1.PerformanceLevelCategoryGrade.ALL,
                            generalPerformanceLevelId: '61fb01496770295e7c3775d1',
                            campusId: [],
                            academicGradesId: [],
                            order: 4,
                            schoolId: (_q = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _q === void 0 ? void 0 : _q.toString(),
                            schoolYearId: (_r = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _r === void 0 ? void 0 : _r.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultPerfomanceLevel4 = await this.repositoryPerformanceLevel.save(modelPerformanceLevel4);
                        const modelEvaluativeComponent1 = await this.repositoryEvaluativeComponent.create({
                            name: 'Ser',
                            weight: 25,
                            type: EvaluativeComponentType_1.EvaluativeComponentType.GENERAL,
                            academicAreasId: [],
                            academicAsignaturesId: [],
                            schoolId: (_s = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _s === void 0 ? void 0 : _s.toString(),
                            schoolYearId: (_t = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _t === void 0 ? void 0 : _t.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultEvaluativeComponent1 = await this.repositoryEvaluativeComponent.save(modelEvaluativeComponent1);
                        const modelEvaluativeComponent2 = await this.repositoryEvaluativeComponent.create({
                            name: 'Saber',
                            weight: 25,
                            type: EvaluativeComponentType_1.EvaluativeComponentType.GENERAL,
                            academicAreasId: [],
                            academicAsignaturesId: [],
                            schoolId: (_u = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _u === void 0 ? void 0 : _u.toString(),
                            schoolYearId: (_v = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _v === void 0 ? void 0 : _v.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultEvaluativeComponent2 = await this.repositoryEvaluativeComponent.save(modelEvaluativeComponent2);
                        const modelEvaluativeComponent3 = await this.repositoryEvaluativeComponent.create({
                            name: 'Hacer',
                            weight: 25,
                            type: EvaluativeComponentType_1.EvaluativeComponentType.GENERAL,
                            academicAreasId: [],
                            academicAsignaturesId: [],
                            schoolId: (_w = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _w === void 0 ? void 0 : _w.toString(),
                            schoolYearId: (_x = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _x === void 0 ? void 0 : _x.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultEvaluativeComponent3 = await this.repositoryEvaluativeComponent.save(modelEvaluativeComponent3);
                        const modelEvaluativeComponent4 = await this.repositoryEvaluativeComponent.create({
                            name: 'Convivir',
                            weight: 25,
                            type: EvaluativeComponentType_1.EvaluativeComponentType.GENERAL,
                            academicAreasId: [],
                            academicAsignaturesId: [],
                            schoolId: (_y = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _y === void 0 ? void 0 : _y.toString(),
                            schoolYearId: (_z = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _z === void 0 ? void 0 : _z.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultEvaluativeComponent4 = await this.repositoryEvaluativeComponent.save(modelEvaluativeComponent4);
                        const modelEducationLevel1 = await this.repositoryEducationLevel.create({
                            name: 'Preescolar',
                            schoolId: (_0 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _0 === void 0 ? void 0 : _0.toString(),
                            schoolYearId: (_1 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _1 === void 0 ? void 0 : _1.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultEducationLevel1 = await this.repositoryEducationLevel.save(modelEducationLevel1);
                        if (resultEducationLevel1 != null) {
                            const modelAcademicGrade1 = await this.repositoryAcademicGrade.create({
                                name: 'Transición',
                                educationLevelId: (_2 = resultEducationLevel1 === null || resultEducationLevel1 === void 0 ? void 0 : resultEducationLevel1.id) === null || _2 === void 0 ? void 0 : _2.toString(),
                                generalAcademicCycleId: '627ded8db3635b55532fbcf6',
                                generalAcademicGradeId: '627deedcb3635b55532fbd00',
                                schoolId: (_3 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _3 === void 0 ? void 0 : _3.toString(),
                                schoolYearId: (_4 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _4 === void 0 ? void 0 : _4.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade1 = await this.repositoryAcademicGrade.save(modelAcademicGrade1);
                        }
                        const modelEducationLevel2 = await this.repositoryEducationLevel.create({
                            name: 'Basica Primaria',
                            schoolId: (_5 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _5 === void 0 ? void 0 : _5.toString(),
                            schoolYearId: (_6 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _6 === void 0 ? void 0 : _6.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultEducationLevel2 = await this.repositoryEducationLevel.save(modelEducationLevel2);
                        if (modelEducationLevel2 != null) {
                            const modelAcademicGrade2 = await this.repositoryAcademicGrade.create({
                                name: 'Primero',
                                educationLevelId: (_7 = resultEducationLevel2 === null || resultEducationLevel2 === void 0 ? void 0 : resultEducationLevel2.id) === null || _7 === void 0 ? void 0 : _7.toString(),
                                generalAcademicCycleId: '60e447f2e0ca01f690a7b78c',
                                generalAcademicGradeId: '6256093f78f3395f6ca958eb',
                                schoolId: (_8 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _8 === void 0 ? void 0 : _8.toString(),
                                schoolYearId: (_9 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _9 === void 0 ? void 0 : _9.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade2 = await this.repositoryAcademicGrade.save(modelAcademicGrade2);
                            const modelAcademicGrade3 = await this.repositoryAcademicGrade.create({
                                name: 'Segundo',
                                educationLevelId: (_10 = resultEducationLevel2 === null || resultEducationLevel2 === void 0 ? void 0 : resultEducationLevel2.id) === null || _10 === void 0 ? void 0 : _10.toString(),
                                generalAcademicCycleId: '60e447f2e0ca01f690a7b78c',
                                generalAcademicGradeId: '62560c9078f3395f6ca958f4',
                                schoolId: (_11 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _11 === void 0 ? void 0 : _11.toString(),
                                schoolYearId: (_12 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _12 === void 0 ? void 0 : _12.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade3 = await this.repositoryAcademicGrade.save(modelAcademicGrade3);
                            const modelAcademicGrade4 = await this.repositoryAcademicGrade.create({
                                name: 'Tercero',
                                educationLevelId: (_13 = resultEducationLevel2 === null || resultEducationLevel2 === void 0 ? void 0 : resultEducationLevel2.id) === null || _13 === void 0 ? void 0 : _13.toString(),
                                generalAcademicCycleId: '60e447f2e0ca01f690a7b78c',
                                generalAcademicGradeId: '62560c9678f3395f6ca958f5',
                                schoolId: (_14 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _14 === void 0 ? void 0 : _14.toString(),
                                schoolYearId: (_15 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _15 === void 0 ? void 0 : _15.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade4 = await this.repositoryAcademicGrade.save(modelAcademicGrade4);
                            const modelAcademicGrade5 = await this.repositoryAcademicGrade.create({
                                name: 'Cuarto',
                                educationLevelId: (_16 = resultEducationLevel2 === null || resultEducationLevel2 === void 0 ? void 0 : resultEducationLevel2.id) === null || _16 === void 0 ? void 0 : _16.toString(),
                                generalAcademicCycleId: '62560c8778f3395f6ca958f3',
                                generalAcademicGradeId: '62560c9b78f3395f6ca958f6',
                                schoolId: (_17 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _17 === void 0 ? void 0 : _17.toString(),
                                schoolYearId: (_18 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _18 === void 0 ? void 0 : _18.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade5 = await this.repositoryAcademicGrade.save(modelAcademicGrade5);
                            const modelAcademicGrade6 = await this.repositoryAcademicGrade.create({
                                name: 'Quinto',
                                educationLevelId: (_19 = resultEducationLevel2 === null || resultEducationLevel2 === void 0 ? void 0 : resultEducationLevel2.id) === null || _19 === void 0 ? void 0 : _19.toString(),
                                generalAcademicCycleId: '62560c8778f3395f6ca958f3',
                                generalAcademicGradeId: '62560ca278f3395f6ca958f7',
                                schoolId: (_20 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _20 === void 0 ? void 0 : _20.toString(),
                                schoolYearId: (_21 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _21 === void 0 ? void 0 : _21.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade6 = await this.repositoryAcademicGrade.save(modelAcademicGrade6);
                        }
                        const modelEducationLevel3 = await this.repositoryEducationLevel.create({
                            name: 'Basica Secundaria',
                            schoolId: (_22 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _22 === void 0 ? void 0 : _22.toString(),
                            schoolYearId: (_23 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _23 === void 0 ? void 0 : _23.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultEducationLevel3 = await this.repositoryEducationLevel.save(modelEducationLevel3);
                        if (modelEducationLevel3 != null) {
                            const modelAcademicGrade7 = await this.repositoryAcademicGrade.create({
                                name: 'Sexto',
                                educationLevelId: (_24 = modelEducationLevel3 === null || modelEducationLevel3 === void 0 ? void 0 : modelEducationLevel3.id) === null || _24 === void 0 ? void 0 : _24.toString(),
                                generalAcademicCycleId: '627ded9bb3635b55532fbcf7',
                                generalAcademicGradeId: '627dee7eb3635b55532fbcfa',
                                schoolId: (_25 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _25 === void 0 ? void 0 : _25.toString(),
                                schoolYearId: (_26 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _26 === void 0 ? void 0 : _26.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade7 = await this.repositoryAcademicGrade.save(modelAcademicGrade7);
                            const modelAcademicGrade8 = await this.repositoryAcademicGrade.create({
                                name: 'Septimo',
                                educationLevelId: (_27 = modelEducationLevel3 === null || modelEducationLevel3 === void 0 ? void 0 : modelEducationLevel3.id) === null || _27 === void 0 ? void 0 : _27.toString(),
                                generalAcademicCycleId: '627ded9bb3635b55532fbcf7',
                                generalAcademicGradeId: '627dee88b3635b55532fbcfb',
                                schoolId: (_28 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _28 === void 0 ? void 0 : _28.toString(),
                                schoolYearId: (_29 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _29 === void 0 ? void 0 : _29.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade8 = await this.repositoryAcademicGrade.save(modelAcademicGrade8);
                            const modelAcademicGrade9 = await this.repositoryAcademicGrade.create({
                                name: 'Octavo',
                                educationLevelId: (_30 = modelEducationLevel3 === null || modelEducationLevel3 === void 0 ? void 0 : modelEducationLevel3.id) === null || _30 === void 0 ? void 0 : _30.toString(),
                                generalAcademicCycleId: '627deda6b3635b55532fbcf8',
                                generalAcademicGradeId: '627dee90b3635b55532fbcfc',
                                schoolId: (_31 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _31 === void 0 ? void 0 : _31.toString(),
                                schoolYearId: (_32 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _32 === void 0 ? void 0 : _32.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade9 = await this.repositoryAcademicGrade.save(modelAcademicGrade9);
                            const modelAcademicGrade10 = await this.repositoryAcademicGrade.create({
                                name: 'Noveno',
                                educationLevelId: (_33 = modelEducationLevel3 === null || modelEducationLevel3 === void 0 ? void 0 : modelEducationLevel3.id) === null || _33 === void 0 ? void 0 : _33.toString(),
                                generalAcademicCycleId: '627deda6b3635b55532fbcf8',
                                generalAcademicGradeId: '627dee97b3635b55532fbcfd',
                                schoolId: (_34 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _34 === void 0 ? void 0 : _34.toString(),
                                schoolYearId: (_35 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _35 === void 0 ? void 0 : _35.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade10 = await this.repositoryAcademicGrade.save(modelAcademicGrade10);
                        }
                        const modelEducationLevel4 = await this.repositoryEducationLevel.create({
                            name: 'Media',
                            schoolId: (_36 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _36 === void 0 ? void 0 : _36.toString(),
                            schoolYearId: (_37 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _37 === void 0 ? void 0 : _37.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultEducationLevel4 = await this.repositoryEducationLevel.save(modelEducationLevel4);
                        if (resultEducationLevel4 != null) {
                            const modelAcademicGrade11 = await this.repositoryAcademicGrade.create({
                                name: 'Décimo',
                                educationLevelId: (_38 = resultEducationLevel4 === null || resultEducationLevel4 === void 0 ? void 0 : resultEducationLevel4.id) === null || _38 === void 0 ? void 0 : _38.toString(),
                                generalAcademicCycleId: '627dedb1b3635b55532fbcf9',
                                generalAcademicGradeId: '627deeb4b3635b55532fbcfe',
                                schoolId: (_39 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _39 === void 0 ? void 0 : _39.toString(),
                                schoolYearId: (_40 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _40 === void 0 ? void 0 : _40.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade11 = await this.repositoryAcademicGrade.save(modelAcademicGrade11);
                            const modelAcademicGrade12 = await this.repositoryAcademicGrade.create({
                                name: 'Undecimo',
                                educationLevelId: (_41 = resultEducationLevel4 === null || resultEducationLevel4 === void 0 ? void 0 : resultEducationLevel4.id) === null || _41 === void 0 ? void 0 : _41.toString(),
                                generalAcademicCycleId: '627dedb1b3635b55532fbcf9',
                                generalAcademicGradeId: '627deebcb3635b55532fbcff',
                                schoolId: (_42 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _42 === void 0 ? void 0 : _42.toString(),
                                schoolYearId: (_43 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _43 === void 0 ? void 0 : _43.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicGrade12 = await this.repositoryAcademicGrade.save(modelAcademicGrade12);
                        }
                        const modelAcademicArea1 = await this.repositoryAcademicArea.create({
                            name: 'Tecnologia e informatica',
                            abbreviation: 'TI',
                            order: 1,
                            generalAcademicAreaId: '627df0a4b3635b55532fbd08',
                            isAverage: true,
                            schoolId: (_44 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _44 === void 0 ? void 0 : _44.toString(),
                            schoolYearId: (_45 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _45 === void 0 ? void 0 : _45.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea1 = await this.repositoryAcademicArea.save(modelAcademicArea1);
                        if (resultAcademicArea1 != null) {
                            const modelAcademcAsignature1 = await this.repositoryAcademicAsignature.create({
                                name: 'Tecnologia e informatica',
                                abbreviation: 'TI',
                                generalAcademicAsignatureId: '62a69f1fd2b1e26bc0ac47d9',
                                order: 1,
                                academicAreaId: (_46 = resultAcademicArea1 === null || resultAcademicArea1 === void 0 ? void 0 : resultAcademicArea1.id) === null || _46 === void 0 ? void 0 : _46.toString(),
                                schoolId: (_47 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _47 === void 0 ? void 0 : _47.toString(),
                                schoolYearId: (_48 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _48 === void 0 ? void 0 : _48.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature1 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature1);
                        }
                        const modelAcademicArea2 = await this.repositoryAcademicArea.create({
                            name: 'Matematicas',
                            abbreviation: 'MAT',
                            order: 2,
                            generalAcademicAreaId: '627df09ab3635b55532fbd07',
                            isAverage: true,
                            schoolId: (_49 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _49 === void 0 ? void 0 : _49.toString(),
                            schoolYearId: (_50 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _50 === void 0 ? void 0 : _50.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea2 = await this.repositoryAcademicArea.save(modelAcademicArea2);
                        if (resultAcademicArea2 != null) {
                            const modelAcademcAsignature2 = await this.repositoryAcademicAsignature.create({
                                name: 'Matematicas',
                                abbreviation: 'MAT',
                                generalAcademicAsignatureId: '62a69f18d2b1e26bc0ac47d8',
                                order: 1,
                                academicAreaId: (_51 = resultAcademicArea2 === null || resultAcademicArea2 === void 0 ? void 0 : resultAcademicArea2.id) === null || _51 === void 0 ? void 0 : _51.toString(),
                                schoolId: (_52 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _52 === void 0 ? void 0 : _52.toString(),
                                schoolYearId: (_53 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _53 === void 0 ? void 0 : _53.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature2 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature2);
                        }
                        const modelAcademicArea3 = await this.repositoryAcademicArea.create({
                            name: 'Humanidades, lengua castellana e idiomas extranjeros',
                            abbreviation: 'HUM',
                            order: 3,
                            generalAcademicAreaId: '627df092b3635b55532fbd06',
                            isAverage: true,
                            schoolId: (_54 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _54 === void 0 ? void 0 : _54.toString(),
                            schoolYearId: (_55 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _55 === void 0 ? void 0 : _55.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea3 = await this.repositoryAcademicArea.save(modelAcademicArea3);
                        if (resultAcademicArea3 != null) {
                            const modelAcademcAsignature3 = await this.repositoryAcademicAsignature.create({
                                name: 'Humanidades, lengua castellana e idiomas extranjeros',
                                abbreviation: 'HUM',
                                generalAcademicAsignatureId: '62983cd789faf55804843310',
                                order: 1,
                                academicAreaId: (_56 = resultAcademicArea3 === null || resultAcademicArea3 === void 0 ? void 0 : resultAcademicArea3.id) === null || _56 === void 0 ? void 0 : _56.toString(),
                                schoolId: (_57 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _57 === void 0 ? void 0 : _57.toString(),
                                schoolYearId: (_58 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _58 === void 0 ? void 0 : _58.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature3 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature3);
                        }
                        const modelAcademicArea4 = await this.repositoryAcademicArea.create({
                            name: 'Educacion religiosa',
                            abbreviation: 'REL',
                            order: 4,
                            generalAcademicAreaId: '627df08bb3635b55532fbd05',
                            isAverage: true,
                            schoolId: (_59 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _59 === void 0 ? void 0 : _59.toString(),
                            schoolYearId: (_60 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _60 === void 0 ? void 0 : _60.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea4 = await this.repositoryAcademicArea.save(modelAcademicArea4);
                        if (resultAcademicArea4 != null) {
                            const modelAcademcAsignature4 = await this.repositoryAcademicAsignature.create({
                                name: 'Educacion religiosa',
                                abbreviation: 'REL',
                                generalAcademicAsignatureId: '62a69f0ed2b1e26bc0ac47d7',
                                order: 1,
                                academicAreaId: (_61 = resultAcademicArea4 === null || resultAcademicArea4 === void 0 ? void 0 : resultAcademicArea4.id) === null || _61 === void 0 ? void 0 : _61.toString(),
                                schoolId: (_62 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _62 === void 0 ? void 0 : _62.toString(),
                                schoolYearId: (_63 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _63 === void 0 ? void 0 : _63.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature4 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature4);
                        }
                        const modelAcademicArea5 = await this.repositoryAcademicArea.create({
                            name: 'Educacion fisica, recreacion y deportes',
                            abbreviation: 'EDF',
                            order: 5,
                            generalAcademicAreaId: '627df082b3635b55532fbd04',
                            isAverage: true,
                            schoolId: (_64 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _64 === void 0 ? void 0 : _64.toString(),
                            schoolYearId: (_65 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _65 === void 0 ? void 0 : _65.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea5 = await this.repositoryAcademicArea.save(modelAcademicArea5);
                        if (resultAcademicArea5 != null) {
                            const modelAcademcAsignature5 = await this.repositoryAcademicAsignature.create({
                                name: 'Educacion fisica, recreacion y deportes',
                                abbreviation: 'EDF',
                                generalAcademicAsignatureId: '62a69f08d2b1e26bc0ac47d6',
                                order: 1,
                                academicAreaId: (_66 = resultAcademicArea5 === null || resultAcademicArea5 === void 0 ? void 0 : resultAcademicArea5.id) === null || _66 === void 0 ? void 0 : _66.toString(),
                                schoolId: (_67 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _67 === void 0 ? void 0 : _67.toString(),
                                schoolYearId: (_68 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _68 === void 0 ? void 0 : _68.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature5 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature5);
                        }
                        const modelAcademicArea6 = await this.repositoryAcademicArea.create({
                            name: 'Educacion etica y en valores humanos',
                            abbreviation: 'EDE',
                            order: 6,
                            generalAcademicAreaId: '627df079b3635b55532fbd03',
                            isAverage: true,
                            schoolId: (_69 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _69 === void 0 ? void 0 : _69.toString(),
                            schoolYearId: (_70 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _70 === void 0 ? void 0 : _70.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea6 = await this.repositoryAcademicArea.save(modelAcademicArea6);
                        if (resultAcademicArea6 != null) {
                            const modelAcademcAsignature6 = await this.repositoryAcademicAsignature.create({
                                name: 'Educacion etica y en valores humanos',
                                abbreviation: 'EDE',
                                generalAcademicAsignatureId: '62a69f01d2b1e26bc0ac47d5',
                                order: 1,
                                academicAreaId: (_71 = resultAcademicArea6 === null || resultAcademicArea6 === void 0 ? void 0 : resultAcademicArea6.id) === null || _71 === void 0 ? void 0 : _71.toString(),
                                schoolId: (_72 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _72 === void 0 ? void 0 : _72.toString(),
                                schoolYearId: (_73 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _73 === void 0 ? void 0 : _73.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature6 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature6);
                        }
                        const modelAcademicArea7 = await this.repositoryAcademicArea.create({
                            name: 'Educacion artistica y cultural',
                            abbreviation: 'EDA',
                            order: 7,
                            generalAcademicAreaId: '627df071b3635b55532fbd02',
                            isAverage: true,
                            schoolId: (_74 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _74 === void 0 ? void 0 : _74.toString(),
                            schoolYearId: (_75 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _75 === void 0 ? void 0 : _75.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea7 = await this.repositoryAcademicArea.save(modelAcademicArea7);
                        if (resultAcademicArea7 != null) {
                            const modelAcademcAsignature7 = await this.repositoryAcademicAsignature.create({
                                name: 'Educacion artistica y cultural',
                                abbreviation: 'EDA',
                                generalAcademicAsignatureId: '62a69ef8d2b1e26bc0ac47d4',
                                order: 1,
                                academicAreaId: (_76 = resultAcademicArea7 === null || resultAcademicArea7 === void 0 ? void 0 : resultAcademicArea7.id) === null || _76 === void 0 ? void 0 : _76.toString(),
                                schoolId: (_77 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _77 === void 0 ? void 0 : _77.toString(),
                                schoolYearId: (_78 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _78 === void 0 ? void 0 : _78.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature7 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature7);
                        }
                        const modelAcademicArea8 = await this.repositoryAcademicArea.create({
                            name: 'Ciencias sociales, historia, geografia, constitucion politica y democracia',
                            abbreviation: 'CSO',
                            order: 8,
                            generalAcademicAreaId: '627df069b3635b55532fbd01',
                            isAverage: true,
                            schoolId: (_79 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _79 === void 0 ? void 0 : _79.toString(),
                            schoolYearId: (_80 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _80 === void 0 ? void 0 : _80.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea8 = await this.repositoryAcademicArea.save(modelAcademicArea8);
                        if (resultAcademicArea8 != null) {
                            const modelAcademcAsignature8 = await this.repositoryAcademicAsignature.create({
                                name: 'Ciencias sociales, historia, geografia, constitucion politica y democracia',
                                abbreviation: 'CSO',
                                generalAcademicAsignatureId: '62a69ef1d2b1e26bc0ac47d3',
                                order: 1,
                                academicAreaId: (_81 = resultAcademicArea8 === null || resultAcademicArea8 === void 0 ? void 0 : resultAcademicArea8.id) === null || _81 === void 0 ? void 0 : _81.toString(),
                                schoolId: (_82 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _82 === void 0 ? void 0 : _82.toString(),
                                schoolYearId: (_83 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _83 === void 0 ? void 0 : _83.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature8 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature8);
                        }
                        const modelAcademicArea9 = await this.repositoryAcademicArea.create({
                            name: 'Ciencias naturales y educacion ambiental',
                            abbreviation: 'CNA',
                            order: 9,
                            generalAcademicAreaId: '6256099d78f3395f6ca958ef',
                            isAverage: true,
                            schoolId: (_84 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _84 === void 0 ? void 0 : _84.toString(),
                            schoolYearId: (_85 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _85 === void 0 ? void 0 : _85.toString(),
                            active: true,
                            version: 0,
                        });
                        let resultAcademicArea9 = await this.repositoryAcademicArea.save(modelAcademicArea9);
                        if (resultAcademicArea9 != null) {
                            const modelAcademcAsignature9 = await this.repositoryAcademicAsignature.create({
                                name: 'Ciencias naturales y educacion ambiental',
                                abbreviation: 'CNA',
                                generalAcademicAsignatureId: '60e3d85be0ca01f690a7b78a',
                                order: 1,
                                academicAreaId: (_86 = resultAcademicArea9 === null || resultAcademicArea9 === void 0 ? void 0 : resultAcademicArea9.id) === null || _86 === void 0 ? void 0 : _86.toString(),
                                schoolId: (_87 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.schoolId) === null || _87 === void 0 ? void 0 : _87.toString(),
                                schoolYearId: (_88 = resultSchoolYear === null || resultSchoolYear === void 0 ? void 0 : resultSchoolYear.id) === null || _88 === void 0 ? void 0 : _88.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultAcademicAsignature9 = await this.repositoryAcademicAsignature.save(modelAcademcAsignature9);
                        }
                    }
                }
                else {
                }
            }
        }
        console.log('SCHOOLNOYEARS: ', countNoYears);
        return true;
    }
};
exports.SchoolYearResolver = SchoolYearResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicPeriod_1.AcademicPeriod),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryAcademicPeriod", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EducationLevel_1.EducationLevel),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryEducationLevel", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PerformanceLevel_1.PerformanceLevel),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryPerformanceLevel", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvaluativeComponent_1.EvaluativeComponent),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryEvaluativeComponent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicArea_1.AcademicArea),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryAcademicArea", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicDay_1.AcademicDay),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryAcademicDay", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Modality_1.Modality),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryModality", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GradeAssignment_1.GradeAssignment),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryGradeAssignment", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolConfiguration_1.SchoolConfiguration),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositorySchoolConfiguration", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Teacher_1.Teacher),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryTeacher", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], SchoolYearResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "getSchoolYear", null);
__decorate([
    (0, type_graphql_1.Query)(() => SchoolYear_1.SchoolYearConnection),
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
], SchoolYearResolver.prototype, "getAllSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SchoolYear_1.SchoolYear),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewSchoolYear_1.NewSchoolYear, Object]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "createSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SchoolYear_1.SchoolYear),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewSchoolYear_1.NewSchoolYear, String, Object]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "updateSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "changeActiveSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "deleteSchoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolYear_1.SchoolYear]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolYear_1.SchoolYear]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolYear_1.SchoolYear]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolYear_1.SchoolYear]),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "schoolYearImport", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "fixSchoolIdAndSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchoolYearResolver.prototype, "createSchoolYearsCode", null);
exports.SchoolYearResolver = SchoolYearResolver = __decorate([
    (0, type_graphql_1.Resolver)(SchoolYear_1.SchoolYear)
], SchoolYearResolver);
