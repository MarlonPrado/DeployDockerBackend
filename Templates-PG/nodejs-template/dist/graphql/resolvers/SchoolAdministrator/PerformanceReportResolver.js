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
exports.PerformanceReportResolver = void 0;
const mongodb_1 = require("mongodb");
const puppeteer_report_1 = __importDefault(require("puppeteer-report"));
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const fs_extra_1 = __importDefault(require("fs-extra"));
const handlebars_1 = __importDefault(require("handlebars"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const DataSource_1 = require("../../../servers/DataSource");
const PerformanceLevelType_1 = require("../../enums/PerformanceLevelType");
const ValuationType_1 = require("../../enums/ValuationType");
const AcademicAreaCoursePeriodValuation_1 = require("../../models/CampusAdministrator/AcademicAreaCoursePeriodValuation");
const AcademicAreaCourseYearValuation_1 = require("../../models/CampusAdministrator/AcademicAreaCourseYearValuation");
const AcademicAsignatureCourse_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourse");
const AcademicAsignatureCoursePeriodValuation_1 = require("../../models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation");
const AcademicAsignatureCourseYearValuation_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourseYearValuation");
const AcademicDay_1 = require("../../models/CampusAdministrator/AcademicDay");
const AverageAcademicPeriodCourse_1 = require("../../models/CampusAdministrator/AverageAcademicPeriodCourse");
const AverageAcademicPeriodStudent_1 = require("../../models/CampusAdministrator/AverageAcademicPeriodStudent");
const Course_1 = require("../../models/CampusAdministrator/Course");
const ExperienceLearning_1 = require("../../models/CampusAdministrator/ExperienceLearning");
const StudentBehaviour_1 = require("../../models/CampusAdministrator/StudentBehaviour");
const Teacher_1 = require("../../models/CampusAdministrator/Teacher");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicArea_1 = require("../../models/SchoolAdministrator/AcademicArea");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const AcademicPeriod_1 = require("../../models/SchoolAdministrator/AcademicPeriod");
const EvidenceLearning_1 = require("../../models/SchoolAdministrator/EvidenceLearning");
const Learning_1 = require("../../models/SchoolAdministrator/Learning");
const PerformanceLevel_1 = require("../../models/SchoolAdministrator/PerformanceLevel");
const SchoolConfiguration_1 = require("../../models/SchoolAdministrator/SchoolConfiguration");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const PerformanceLevelResolver_1 = require("./PerformanceLevelResolver");
const path_1 = __importDefault(require("path"));
const merge = require('easy-pdf-merge');
let PerformanceReportResolver = class PerformanceReportResolver {
    constructor() {
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryAcademicAsignatureCourse = DataSource_1.AcademicAsignatureCourseRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
        this.repositoryTeacher = DataSource_1.TeacherRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryAcademicDay = DataSource_1.AcademicDayRepository;
        this.repositoryAcademicPeriod = DataSource_1.AcademicPeriodRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryAcademicArea = DataSource_1.AcademicAreaRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryAcademicAsignatureCoursePeriodValuation = DataSource_1.AcademicAsignatureCoursePeriodValuationRepository;
        this.repositoryAcademicAreaCoursePeriodValuation = DataSource_1.AcademicAreaCoursePeriodValuationRepository;
        this.repositoryAcademicAsignatureCourseYearValuation = DataSource_1.AcademicAsignatureCourseYearValuationRepository;
        this.repositoryAcademicAreaCourseYearValuation = DataSource_1.AcademicAreaCourseYearValuationRepository;
        this.repositoryPerformanceLevel = DataSource_1.PerformanceLevelRepository;
        this.repositoryAverageAcademicPeriodStudent = DataSource_1.AverageAcademicPeriodStudentRepository;
        this.repositoryAverageAcademicPeriodCourse = DataSource_1.AverageAcademicPeriodCourseRepository;
        this.repositoryLearning = DataSource_1.LearningRepository;
        this.repositoryEvidenceLearning = DataSource_1.EvidenceLearningRepository;
        this.repositoryExperienceLearning = DataSource_1.ExperienceLearningRepository;
        this.repositorySchoolConfiguration = DataSource_1.SchoolConfigurationRepository;
        this.repositoryStudentBehaviour = DataSource_1.StudentBehaviourRepository;
        this.performanceLevelResolver = new PerformanceLevelResolver_1.PerformanceLevelResolver();
    }
    async generatePerformanceReportCourse(id, schoolId, schoolYearId, academicPeriodId, studentId, format, context) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126;
        let data = {};
        let course = await this.repositoryCourse.findOneBy(id);
        if (course) {
            let campus = await this.repositoryCampus.findOneBy(course === null || course === void 0 ? void 0 : course.campusId);
            let school = await this.repositorySchool.findOneBy(schoolId);
            let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'COUNT_DIGITS_PERFORMANCE_LEVEL', active: true },
            });
            let schoolConfigurationCountDigitsAverageStudent = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'COUNT_DIGITS_AVERAGE_STUDENT', active: true },
            });
            let schoolConfigurationCountDigitsAverageCourse = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'COUNT_DIGITS_AVERAGE_COURSE', active: true },
            });
            let schoolConfigurationTypeLearningsDisplay = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_TYPE_LEARNINGS_DISPLAY', active: true },
            });
            let schoolConfigurationTypeEvidenceLearningsDisplay = await this.repositorySchoolConfiguration.findBy({
                where: {
                    schoolId,
                    code: 'REPORT_PERFORMANCE_TYPE_EVIDENCE_LEARNINGS_DISPLAY',
                    active: true,
                },
            });
            let schoolConfigurationTypeDisplayDetails = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_TYPE_DISPLAY_DETAILS', active: true },
            });
            let schoolConfigurationReportPerformanceType = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_TYPE', active: true },
            });
            let schoolConfigurationReportPerformanceSignatureType = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_SIGNATURE_TYPE', active: true },
            });
            let schoolConfigurationReportPerformanceBehaviourStudent = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_BEHAVIOUR_STUDENT', active: true },
            });
            let schoolConfigurationReportPerformanceBehaviourStudentType = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_BEHAVIOUR_STUDENT_TYPE', active: true },
            });
            let schoolConfigurationReportPerformanceAreaAsignatureType = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_AREA_ASIGNATURE_TYPE', active: true },
            });
            let schoolConfigurationReportPerformanceTitleSignatureTeacherCourse = await this.repositorySchoolConfiguration.findBy({
                where: {
                    schoolId,
                    code: 'REPORT_PERFORMANCE_TITLE_SIGNATURE_TEACHER_COURSE',
                    active: true,
                },
            });
            let schoolConfigurationReportPerformanceTitleSignaturePrincipal = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_TITLE_SIGNATURE_PRINCIPAL', active: true },
            });
            let schoolConfigurationReportPerformanceShowFinalValuation = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_SHOW_FINAL_VALUATION', active: true },
            });
            let schoolConfigurationReportPerformanceShowRecoverylValuation = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId, code: 'REPORT_PERFORMANCE_SHOW_RECOVERY_VALUATION', active: true },
            });
            let academicGrade = await this.repositoryAcademicGrade.findOneBy(course === null || course === void 0 ? void 0 : course.academicGradeId);
            let titular = await this.repositoryTeacher.findOneBy(course === null || course === void 0 ? void 0 : course.teacherId);
            let titularUser = await this.repositoryUser.findOneBy(titular === null || titular === void 0 ? void 0 : titular.userId);
            let academicDay = await this.repositoryAcademicDay.findOneBy(course === null || course === void 0 ? void 0 : course.academicDayId);
            let schoolYear = await this.repositorySchoolYear.findOneBy(course === null || course === void 0 ? void 0 : course.schoolYearId);
            let academicPeriods = await this.repositoryAcademicPeriod.findBy({
                where: {
                    schoolYearId: schoolYearId,
                    schoolId: schoolId,
                    active: true,
                },
                order: { order: 1 },
            });
            let academicPeriod = await this.repositoryAcademicPeriod.findOneBy(academicPeriodId);
            let academicAsignaturesCourse = await this.repositoryAcademicAsignatureCourse.findBy({
                where: { courseId: (_a = course === null || course === void 0 ? void 0 : course.id) === null || _a === void 0 ? void 0 : _a.toString() },
            });
            if ((academicAsignaturesCourse === null || academicAsignaturesCourse === void 0 ? void 0 : academicAsignaturesCourse.length) > 0) {
                data = Object.assign(Object.assign({}, data), { schoolPrincipalSignature: school === null || school === void 0 ? void 0 : school.textPrincipalSignature });
                data = Object.assign(Object.assign({}, data), { imgPrincipalSignature: (school === null || school === void 0 ? void 0 : school.imgPrincipalSignature)
                        ? school === null || school === void 0 ? void 0 : school.imgPrincipalSignature
                        : '*' });
                data = Object.assign(Object.assign({}, data), { imgSecretarySignature: (school === null || school === void 0 ? void 0 : school.imgSecretarySignature)
                        ? school === null || school === void 0 ? void 0 : school.imgSecretarySignature
                        : '*' });
                data = Object.assign(Object.assign({}, data), { schoolName: school === null || school === void 0 ? void 0 : school.name });
                data = Object.assign(Object.assign({}, data), { schoolResolution: school === null || school === void 0 ? void 0 : school.textResolution });
                data = Object.assign(Object.assign({}, data), { schoolAddress: school === null || school === void 0 ? void 0 : school.textAddress });
                data = Object.assign(Object.assign({}, data), { schoolDaneNit: school === null || school === void 0 ? void 0 : school.textDaneNit });
                data = Object.assign(Object.assign({}, data), { schoolLogo: school === null || school === void 0 ? void 0 : school.logo });
                data = Object.assign(Object.assign({}, data), { studentAcademicGradeName: academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.name });
                data = Object.assign(Object.assign({}, data), { studentAcademicCourseName: course === null || course === void 0 ? void 0 : course.name });
                data = Object.assign(Object.assign({}, data), { campusName: campus === null || campus === void 0 ? void 0 : campus.name });
                data = Object.assign(Object.assign({}, data), { titular: (titularUser === null || titularUser === void 0 ? void 0 : titularUser.name) + ' ' + (titularUser === null || titularUser === void 0 ? void 0 : titularUser.lastName) });
                data = Object.assign(Object.assign({}, data), { imgTitularSignature: (titularUser === null || titularUser === void 0 ? void 0 : titularUser.signaturePhoto) ? titularUser === null || titularUser === void 0 ? void 0 : titularUser.signaturePhoto : '*' });
                data = Object.assign(Object.assign({}, data), { studentAcademicDayName: academicDay === null || academicDay === void 0 ? void 0 : academicDay.name });
                data = Object.assign(Object.assign({}, data), { academicPeriodName: academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.name });
                data = Object.assign(Object.assign({}, data), { schoolYear: schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.schoolYear });
                data = Object.assign(Object.assign({}, data), { academicPeriodId: (_b = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _b === void 0 ? void 0 : _b.toString() });
                let areasAux = [];
                let asignaturesAux = [];
                let performanceLevelType = null;
                if ((academicAsignaturesCourse === null || academicAsignaturesCourse === void 0 ? void 0 : academicAsignaturesCourse.length) > 0) {
                    let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, ((_d = (_c = academicAsignaturesCourse[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString()) + '');
                    if (performanceLevels) {
                        performanceLevelType = (_f = (_e = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _e === void 0 ? void 0 : _e.node) === null || _f === void 0 ? void 0 : _f.type;
                        data = Object.assign(Object.assign({}, data), { performanceLevelType: performanceLevelType });
                    }
                }
                for (let asignatureCourse of academicAsignaturesCourse) {
                    let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId);
                    let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
                    if (academicArea !== null) {
                        asignaturesAux.push(academicAsignature);
                        areasAux.push(academicArea);
                    }
                }
                const ids = areasAux.map((o) => { var _a; return (_a = o.id) === null || _a === void 0 ? void 0 : _a.toString(); });
                const count = {};
                ids.forEach((element) => {
                    count[element] = (count[element] || 0) + 1;
                });
                const filtered = areasAux.filter(({ id }, index) => !ids.includes(id === null || id === void 0 ? void 0 : id.toString(), index + 1));
                for (let filter of filtered) {
                    filter.count = count[filter === null || filter === void 0 ? void 0 : filter.id];
                }
                let ultimateOrderAcademicPeriod = 0;
                let ultimateAcademicPeriod = null;
                academicPeriods.map((academicPeriod) => {
                    if (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.order) {
                        if ((academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.order) > ultimateOrderAcademicPeriod) {
                            ultimateOrderAcademicPeriod = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.order;
                            ultimateAcademicPeriod = academicPeriod;
                        }
                    }
                });
                let academicPeriodsData = [];
                academicPeriods.map((academicPeriod) => {
                    var _a;
                    let academicPeriodData = {
                        name: academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.name,
                        id: (_a = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _a === void 0 ? void 0 : _a.toString(),
                        order: academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.order,
                    };
                    academicPeriodsData.push(academicPeriodData);
                });
                let academicPeriodData = { name: 'FINAL', id: 'FINAL', order: 99 };
                academicPeriodsData.push(academicPeriodData);
                data = Object.assign(Object.assign({}, data), { academicPeriods: academicPeriodsData });
                data = Object.assign(Object.assign({}, data), { academicPeriodsCount: `3fr repeat(${academicPeriodsData === null || academicPeriodsData === void 0 ? void 0 : academicPeriodsData.length}, 1fr);` });
                let studentsId = course === null || course === void 0 ? void 0 : course.studentsId;
                if (studentId !== null && (studentId === null || studentId === void 0 ? void 0 : studentId.length) > 0) {
                    studentsId = [studentId];
                }
                else {
                    let studentsAux = studentsId;
                    if (studentsAux) {
                        let studentsIds = [];
                        for (let studentId of studentsAux) {
                            studentsIds === null || studentsIds === void 0 ? void 0 : studentsIds.push(new mongodb_1.ObjectId(studentId.toString()));
                        }
                        let students = await this.repositoryStudent.findBy({
                            where: { _id: { $in: studentsIds } },
                            order: { code: 1 },
                        });
                        studentsId = [];
                        for (let student of students) {
                            studentsId.push((_g = student === null || student === void 0 ? void 0 : student.id) === null || _g === void 0 ? void 0 : _g.toString());
                        }
                    }
                }
                areasAux = filtered.sort(this.compareOrderAcademicArea);
                let areas = [];
                let typeDisplayDetails = 'EVIDENCE_LEARNING';
                if ((schoolConfigurationTypeDisplayDetails === null || schoolConfigurationTypeDisplayDetails === void 0 ? void 0 : schoolConfigurationTypeDisplayDetails.length) > 0) {
                    typeDisplayDetails = ((_h = schoolConfigurationTypeDisplayDetails[0]) === null || _h === void 0 ? void 0 : _h.valueString)
                        ? (_j = schoolConfigurationTypeDisplayDetails[0]) === null || _j === void 0 ? void 0 : _j.valueString
                        : 'EVIDENCE_LEARNING';
                }
                let typeEvidenceLearningsDisplay = 'SPECIFIC';
                if ((schoolConfigurationTypeEvidenceLearningsDisplay === null || schoolConfigurationTypeEvidenceLearningsDisplay === void 0 ? void 0 : schoolConfigurationTypeEvidenceLearningsDisplay.length) > 0) {
                    typeEvidenceLearningsDisplay = ((_k = schoolConfigurationTypeEvidenceLearningsDisplay[0]) === null || _k === void 0 ? void 0 : _k.valueString)
                        ? (_l = schoolConfigurationTypeEvidenceLearningsDisplay[0]) === null || _l === void 0 ? void 0 : _l.valueString
                        : 'SPECIFIC';
                }
                let typeLearningsDisplay = 'SPECIFIC';
                if ((schoolConfigurationTypeLearningsDisplay === null || schoolConfigurationTypeLearningsDisplay === void 0 ? void 0 : schoolConfigurationTypeLearningsDisplay.length) > 0) {
                    typeLearningsDisplay = ((_m = schoolConfigurationTypeLearningsDisplay[0]) === null || _m === void 0 ? void 0 : _m.valueString)
                        ? (_o = schoolConfigurationTypeLearningsDisplay[0]) === null || _o === void 0 ? void 0 : _o.valueString
                        : 'SPECIFIC';
                }
                let reportPerformanceType = 'DETAILS';
                if ((schoolConfigurationReportPerformanceType === null || schoolConfigurationReportPerformanceType === void 0 ? void 0 : schoolConfigurationReportPerformanceType.length) > 0) {
                    reportPerformanceType = ((_p = schoolConfigurationReportPerformanceType[0]) === null || _p === void 0 ? void 0 : _p.valueString)
                        ? (_q = schoolConfigurationReportPerformanceType[0]) === null || _q === void 0 ? void 0 : _q.valueString
                        : 'DETAILS';
                }
                let countDigitsPerformanceLevel = 2;
                if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                    countDigitsPerformanceLevel = ((_r = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _r === void 0 ? void 0 : _r.valueNumber)
                        ? (_s = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _s === void 0 ? void 0 : _s.valueNumber
                        : 2;
                }
                let countDigitsAverageStudent = 2;
                if ((schoolConfigurationCountDigitsAverageStudent === null || schoolConfigurationCountDigitsAverageStudent === void 0 ? void 0 : schoolConfigurationCountDigitsAverageStudent.length) > 0) {
                    countDigitsAverageStudent = ((_t = schoolConfigurationCountDigitsAverageStudent[0]) === null || _t === void 0 ? void 0 : _t.valueNumber)
                        ? (_u = schoolConfigurationCountDigitsAverageStudent[0]) === null || _u === void 0 ? void 0 : _u.valueNumber
                        : 2;
                }
                let countDigitsAverageCourse = 2;
                if ((schoolConfigurationCountDigitsAverageCourse === null || schoolConfigurationCountDigitsAverageCourse === void 0 ? void 0 : schoolConfigurationCountDigitsAverageCourse.length) > 0) {
                    countDigitsAverageCourse = ((_v = schoolConfigurationCountDigitsAverageCourse[0]) === null || _v === void 0 ? void 0 : _v.valueNumber)
                        ? (_w = schoolConfigurationCountDigitsAverageCourse[0]) === null || _w === void 0 ? void 0 : _w.valueNumber
                        : 2;
                }
                let reportPerformanceSignatureType = 'TEACHER_COURSE';
                if ((schoolConfigurationReportPerformanceSignatureType === null || schoolConfigurationReportPerformanceSignatureType === void 0 ? void 0 : schoolConfigurationReportPerformanceSignatureType.length) > 0) {
                    reportPerformanceSignatureType = ((_x = schoolConfigurationReportPerformanceSignatureType[0]) === null || _x === void 0 ? void 0 : _x.valueString)
                        ? (_y = schoolConfigurationReportPerformanceSignatureType[0]) === null || _y === void 0 ? void 0 : _y.valueString
                        : 'TEACHER_COURSE';
                }
                let reportPerformanceBehaviourStudent = 'DISPLAY';
                if ((schoolConfigurationReportPerformanceBehaviourStudent === null || schoolConfigurationReportPerformanceBehaviourStudent === void 0 ? void 0 : schoolConfigurationReportPerformanceBehaviourStudent.length) > 0) {
                    reportPerformanceBehaviourStudent =
                        ((_z = schoolConfigurationReportPerformanceBehaviourStudent[0]) === null || _z === void 0 ? void 0 : _z.valueString)
                            ? (_0 = schoolConfigurationReportPerformanceBehaviourStudent[0]) === null || _0 === void 0 ? void 0 : _0.valueString
                            : 'DISPLAY';
                }
                let reportPerformanceBehaviourStudentType = 'QUALITATIVE';
                if ((schoolConfigurationReportPerformanceBehaviourStudentType === null || schoolConfigurationReportPerformanceBehaviourStudentType === void 0 ? void 0 : schoolConfigurationReportPerformanceBehaviourStudentType.length) > 0) {
                    reportPerformanceBehaviourStudentType =
                        ((_1 = schoolConfigurationReportPerformanceBehaviourStudentType[0]) === null || _1 === void 0 ? void 0 : _1.valueString)
                            ? (_2 = schoolConfigurationReportPerformanceBehaviourStudentType[0]) === null || _2 === void 0 ? void 0 : _2.valueString
                            : 'QUALITATIVE';
                }
                let reportPerformanceAreaAsignatureType = 'AREA_ASIGNATURE';
                if ((schoolConfigurationReportPerformanceAreaAsignatureType === null || schoolConfigurationReportPerformanceAreaAsignatureType === void 0 ? void 0 : schoolConfigurationReportPerformanceAreaAsignatureType.length) > 0) {
                    reportPerformanceAreaAsignatureType =
                        ((_3 = schoolConfigurationReportPerformanceAreaAsignatureType[0]) === null || _3 === void 0 ? void 0 : _3.valueString)
                            ? (_4 = schoolConfigurationReportPerformanceAreaAsignatureType[0]) === null || _4 === void 0 ? void 0 : _4.valueString
                            : 'AREA_ASIGNATURE';
                }
                let reportPerformanceTitleSignatureTeacherCourse = 'Titular';
                if ((schoolConfigurationReportPerformanceTitleSignatureTeacherCourse === null || schoolConfigurationReportPerformanceTitleSignatureTeacherCourse === void 0 ? void 0 : schoolConfigurationReportPerformanceTitleSignatureTeacherCourse.length) > 0) {
                    reportPerformanceTitleSignatureTeacherCourse =
                        ((_5 = schoolConfigurationReportPerformanceTitleSignatureTeacherCourse[0]) === null || _5 === void 0 ? void 0 : _5.valueString)
                            ? (_6 = schoolConfigurationReportPerformanceTitleSignatureTeacherCourse[0]) === null || _6 === void 0 ? void 0 : _6.valueString
                            : 'Titular';
                }
                let reportPerformanceTitleSignaturePrincipal = 'Rector';
                if ((schoolConfigurationReportPerformanceTitleSignaturePrincipal === null || schoolConfigurationReportPerformanceTitleSignaturePrincipal === void 0 ? void 0 : schoolConfigurationReportPerformanceTitleSignaturePrincipal.length) > 0) {
                    reportPerformanceTitleSignaturePrincipal =
                        ((_7 = schoolConfigurationReportPerformanceTitleSignaturePrincipal[0]) === null || _7 === void 0 ? void 0 : _7.valueString)
                            ? (_8 = schoolConfigurationReportPerformanceTitleSignaturePrincipal[0]) === null || _8 === void 0 ? void 0 : _8.valueString
                            : 'Rector';
                }
                let reportPerformanceShowFinalValuation = 'NO';
                if ((schoolConfigurationReportPerformanceShowFinalValuation === null || schoolConfigurationReportPerformanceShowFinalValuation === void 0 ? void 0 : schoolConfigurationReportPerformanceShowFinalValuation.length) > 0) {
                    reportPerformanceShowFinalValuation =
                        ((_9 = schoolConfigurationReportPerformanceShowFinalValuation[0]) === null || _9 === void 0 ? void 0 : _9.valueString)
                            ? (_10 = schoolConfigurationReportPerformanceShowFinalValuation[0]) === null || _10 === void 0 ? void 0 : _10.valueString
                            : 'NO';
                }
                let reportPerformanceShowRecoverylValuation = 'NO';
                if ((schoolConfigurationReportPerformanceShowRecoverylValuation === null || schoolConfigurationReportPerformanceShowRecoverylValuation === void 0 ? void 0 : schoolConfigurationReportPerformanceShowRecoverylValuation.length) > 0) {
                    reportPerformanceShowRecoverylValuation =
                        ((_11 = schoolConfigurationReportPerformanceShowRecoverylValuation[0]) === null || _11 === void 0 ? void 0 : _11.valueString)
                            ? (_12 = schoolConfigurationReportPerformanceShowRecoverylValuation[0]) === null || _12 === void 0 ? void 0 : _12.valueString
                            : 'NO';
                }
                data = Object.assign(Object.assign({}, data), { reportPerformanceTitleSignatureTeacherCourse: reportPerformanceTitleSignatureTeacherCourse });
                data = Object.assign(Object.assign({}, data), { reportPerformanceTitleSignaturePrincipal: reportPerformanceTitleSignaturePrincipal });
                data = Object.assign(Object.assign({}, data), { reportPerformanceAreaAsignatureType: reportPerformanceAreaAsignatureType });
                data = Object.assign(Object.assign({}, data), { reportPerformanceBehaviourStudent: reportPerformanceBehaviourStudent });
                data = Object.assign(Object.assign({}, data), { reportPerformanceBehaviourStudentType: reportPerformanceBehaviourStudentType });
                data = Object.assign(Object.assign({}, data), { reportPerformanceSignatureType: reportPerformanceSignatureType });
                data = Object.assign(Object.assign({}, data), { countDigitsAverageCourse: countDigitsAverageCourse });
                data = Object.assign(Object.assign({}, data), { countDigitsPerformanceLevel: countDigitsPerformanceLevel });
                data = Object.assign(Object.assign({}, data), { countDigitsAverageStudent: countDigitsAverageStudent });
                data = Object.assign(Object.assign({}, data), { typeDisplayDetails: typeDisplayDetails });
                data = Object.assign(Object.assign({}, data), { typeEvidenceLearningsDisplay: typeEvidenceLearningsDisplay });
                data = Object.assign(Object.assign({}, data), { typeLearningsDisplay: typeLearningsDisplay });
                data = Object.assign(Object.assign({}, data), { reportPerformanceType: reportPerformanceType });
                for (let area of areasAux) {
                    let asignaturesAreaData = [];
                    for (let asignature of asignaturesAux) {
                        if ((asignature === null || asignature === void 0 ? void 0 : asignature.academicAreaId) === ((_13 = area === null || area === void 0 ? void 0 : area.id) === null || _13 === void 0 ? void 0 : _13.toString())) {
                            let evidencesIdAux = [];
                            let learningsIdAux = [];
                            let evidenceLearnings = [];
                            let learnings = [];
                            if (reportPerformanceType == 'DETAILS') {
                                switch (typeDisplayDetails) {
                                    case 'EVIDENCE_LEARNING':
                                        switch (typeEvidenceLearningsDisplay) {
                                            case 'ALL':
                                                let learnigs = await this.repositoryLearning.findBy({
                                                    where: {
                                                        academicAsignatureId: (_14 = asignature === null || asignature === void 0 ? void 0 : asignature.id) === null || _14 === void 0 ? void 0 : _14.toString(),
                                                        academicPeriodsId: { $in: [(_15 = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _15 === void 0 ? void 0 : _15.toString()] },
                                                        academicGradeId: course === null || course === void 0 ? void 0 : course.academicGradeId,
                                                        active: true,
                                                    },
                                                });
                                                for (let learning of learnigs) {
                                                    let evidenceLearningAux = await this.repositoryEvidenceLearning.findBy({
                                                        where: {
                                                            learningId: (_16 = learning === null || learning === void 0 ? void 0 : learning.id) === null || _16 === void 0 ? void 0 : _16.toString(),
                                                            active: true,
                                                        },
                                                    });
                                                    for (let evidenceLearning of evidenceLearningAux) {
                                                        evidenceLearnings.push(evidenceLearning);
                                                    }
                                                }
                                                break;
                                            case 'SPECIFIC':
                                                for (let asignatureCourse of academicAsignaturesCourse) {
                                                    if ((asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId) == ((_17 = asignature === null || asignature === void 0 ? void 0 : asignature.id) === null || _17 === void 0 ? void 0 : _17.toString())) {
                                                        let experienceLearnings = await this.repositoryExperienceLearning.findBy({
                                                            where: {
                                                                academicPeriodId: (_18 = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _18 === void 0 ? void 0 : _18.toString(),
                                                                academicAsignatureCourseId: (_19 = asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.id) === null || _19 === void 0 ? void 0 : _19.toString(),
                                                                active: true,
                                                            },
                                                        });
                                                        for (let experienceLearning of experienceLearnings) {
                                                            if ((experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.evidenceLearningsId) &&
                                                                ((_20 = experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.evidenceLearningsId) === null || _20 === void 0 ? void 0 : _20.length) > 0) {
                                                                for (let evidence of experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.evidenceLearningsId) {
                                                                    evidencesIdAux.push(evidence);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                evidencesIdAux = evidencesIdAux.filter((ele, pos) => evidencesIdAux.indexOf(ele) == pos);
                                                let evidencesId = [];
                                                for (let evidenceId of evidencesIdAux) {
                                                    evidencesId === null || evidencesId === void 0 ? void 0 : evidencesId.push(new mongodb_1.ObjectId(evidenceId.toString()));
                                                }
                                                evidenceLearnings = await this.repositoryEvidenceLearning.findBy({
                                                    where: { _id: { $in: evidencesId } },
                                                });
                                                break;
                                        }
                                        break;
                                    case 'LEARNING':
                                        switch (typeLearningsDisplay) {
                                            case 'ALL':
                                                let learnigsAux = await this.repositoryLearning.findBy({
                                                    where: {
                                                        academicAsignatureId: (_21 = asignature === null || asignature === void 0 ? void 0 : asignature.id) === null || _21 === void 0 ? void 0 : _21.toString(),
                                                        academicPeriodsId: { $in: [(_22 = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _22 === void 0 ? void 0 : _22.toString()] },
                                                        academicGradeId: course === null || course === void 0 ? void 0 : course.academicGradeId,
                                                        active: true,
                                                    },
                                                });
                                                for (let learning of learnigsAux) {
                                                    learnings.push(learning);
                                                }
                                                break;
                                            case 'SPECIFIC':
                                                for (let asignatureCourse of academicAsignaturesCourse) {
                                                    if ((asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId) == ((_23 = asignature === null || asignature === void 0 ? void 0 : asignature.id) === null || _23 === void 0 ? void 0 : _23.toString())) {
                                                        let experienceLearnings = await this.repositoryExperienceLearning.findBy({
                                                            where: {
                                                                academicPeriodId: (_24 = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _24 === void 0 ? void 0 : _24.toString(),
                                                                academicAsignatureCourseId: (_25 = asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.id) === null || _25 === void 0 ? void 0 : _25.toString(),
                                                                active: true,
                                                            },
                                                        });
                                                        for (let experienceLearning of experienceLearnings) {
                                                            if ((experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.learningsId) &&
                                                                ((_26 = experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.learningsId) === null || _26 === void 0 ? void 0 : _26.length) > 0) {
                                                                for (let learning of experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.learningsId) {
                                                                    learningsIdAux.push(learning);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                learningsIdAux = learningsIdAux.filter((ele, pos) => learningsIdAux.indexOf(ele) == pos);
                                                let learningsId = [];
                                                for (let learningId of learningsIdAux) {
                                                    learningsId === null || learningsId === void 0 ? void 0 : learningsId.push(new mongodb_1.ObjectId(learningId.toString()));
                                                }
                                                learnings = await this.repositoryLearning.findBy({
                                                    where: { _id: { $in: learningsId } },
                                                });
                                                break;
                                        }
                                        break;
                                }
                            }
                            let hourlyIntensity = 0;
                            for (let asignatureCourse of academicAsignaturesCourse) {
                                if ((asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId) == ((_27 = asignature === null || asignature === void 0 ? void 0 : asignature.id) === null || _27 === void 0 ? void 0 : _27.toString())) {
                                    hourlyIntensity = (asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.hourlyIntensity)
                                        ? asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.hourlyIntensity
                                        : 0;
                                }
                            }
                            let asignaturesData = {
                                name: asignature === null || asignature === void 0 ? void 0 : asignature.name,
                                id: (_28 = asignature === null || asignature === void 0 ? void 0 : asignature.id) === null || _28 === void 0 ? void 0 : _28.toString(),
                                academicPeriods: academicPeriodsData,
                                evidenceLearnings: evidenceLearnings,
                                learnings: learnings,
                                ihs: hourlyIntensity,
                            };
                            asignaturesAreaData.push(asignaturesData);
                        }
                    }
                    let areaData = {
                        name: area === null || area === void 0 ? void 0 : area.name,
                        id: (_29 = area === null || area === void 0 ? void 0 : area.id) === null || _29 === void 0 ? void 0 : _29.toString(),
                        asignatures: asignaturesAreaData,
                        academicPeriods: academicPeriodsData,
                    };
                    areas.push(areaData);
                }
                data = Object.assign(Object.assign({}, data), { areas: areas });
                let averageAcademicPeriodCourseList = await this.repositoryAverageAcademicPeriodCourse.findBy({
                    where: {
                        courseId: id,
                        academicPeriodId,
                    },
                });
                switch (performanceLevelType) {
                    case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                        if (((_30 = averageAcademicPeriodCourseList[0]) === null || _30 === void 0 ? void 0 : _30.performanceLevelId) != null) {
                            let performanceLevel = await this.repositoryPerformanceLevel.findOneBy((_31 = averageAcademicPeriodCourseList[0]) === null || _31 === void 0 ? void 0 : _31.performanceLevelId);
                            data = Object.assign(Object.assign({}, data), { promCourse: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name });
                        }
                        else {
                            data = Object.assign(Object.assign({}, data), { promCourse: '' });
                        }
                        break;
                    case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                        data = Object.assign(Object.assign({}, data), { promCourse: (_33 = (_32 = averageAcademicPeriodCourseList[0]) === null || _32 === void 0 ? void 0 : _32.assessment) === null || _33 === void 0 ? void 0 : _33.toFixed(countDigitsAverageCourse) });
                        break;
                }
                let urls = [];
                if (studentsId) {
                    let promisesGeneratePDF = [];
                    for (let studentId of studentsId) {
                        let dataPDF = Object.assign({}, data);
                        let student = await this.repositoryStudent.findOneBy(studentId + '');
                        let studentUser = await this.repositoryUser.findOneBy(student === null || student === void 0 ? void 0 : student.userId);
                        dataPDF = Object.assign(Object.assign({}, dataPDF), { studentName: (studentUser === null || studentUser === void 0 ? void 0 : studentUser.name) + ' ' + (studentUser === null || studentUser === void 0 ? void 0 : studentUser.lastName) });
                        dataPDF = Object.assign(Object.assign({}, dataPDF), { studentDocumentNumber: studentUser === null || studentUser === void 0 ? void 0 : studentUser.documentNumber });
                        let averageAcademicPeriodStudentList = await this.repositoryAverageAcademicPeriodStudent.findBy({
                            where: {
                                courseId: id,
                                academicPeriodId,
                                studentId,
                            },
                        });
                        switch (performanceLevelType) {
                            case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                if (((_34 = averageAcademicPeriodStudentList[0]) === null || _34 === void 0 ? void 0 : _34.performanceLevelId) != null) {
                                    let performanceLevel = await this.repositoryPerformanceLevel.findOneBy((_35 = averageAcademicPeriodStudentList[0]) === null || _35 === void 0 ? void 0 : _35.performanceLevelId);
                                    dataPDF = Object.assign(Object.assign({}, dataPDF), { promStudent: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name });
                                }
                                else {
                                    dataPDF = Object.assign(Object.assign({}, dataPDF), { promStudent: '' });
                                }
                                break;
                            case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                dataPDF = Object.assign(Object.assign({}, dataPDF), { promStudent: (_37 = (_36 = averageAcademicPeriodStudentList[0]) === null || _36 === void 0 ? void 0 : _36.assessment) === null || _37 === void 0 ? void 0 : _37.toFixed(countDigitsAverageStudent) });
                                break;
                        }
                        dataPDF = Object.assign(Object.assign({}, dataPDF), { puestoEstudiante: (_38 = averageAcademicPeriodStudentList[0]) === null || _38 === void 0 ? void 0 : _38.score });
                        let notesAsignatures = [];
                        for (let asignatureCourse of academicAsignaturesCourse) {
                            let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId);
                            let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
                            let teacherAsignatureCourse = await this.repositoryTeacher.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.teacherId);
                            let teacherUserAsignatureCourse = await this.repositoryUser.findOneBy(teacherAsignatureCourse === null || teacherAsignatureCourse === void 0 ? void 0 : teacherAsignatureCourse.userId);
                            for (let period of academicPeriods) {
                                if ((period === null || period === void 0 ? void 0 : period.order) && (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.order)) {
                                    if ((period === null || period === void 0 ? void 0 : period.order) <= (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.order)) {
                                        let notesAsignature = await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
                                            academicAsignatureCourseId: (_39 = asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.id) === null || _39 === void 0 ? void 0 : _39.toString(),
                                            academicPeriodId: (_40 = period === null || period === void 0 ? void 0 : period.id) === null || _40 === void 0 ? void 0 : _40.toString(),
                                            studentId,
                                        });
                                        if ((notesAsignature === null || notesAsignature === void 0 ? void 0 : notesAsignature.length) > 0) {
                                            if ((notesAsignature === null || notesAsignature === void 0 ? void 0 : notesAsignature.length) == 1) {
                                                let performanceLevel = await this.repositoryPerformanceLevel.findOneBy((_41 = notesAsignature[0]) === null || _41 === void 0 ? void 0 : _41.performanceLevelId);
                                                notesAsignatures.push({
                                                    assessment: (_43 = (_42 = notesAsignature[0]) === null || _42 === void 0 ? void 0 : _42.assessment) === null || _43 === void 0 ? void 0 : _43.toFixed(countDigitsPerformanceLevel),
                                                    academicPeriodId: (_44 = notesAsignature[0]) === null || _44 === void 0 ? void 0 : _44.academicPeriodId,
                                                    performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                    asignatureId: (_45 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _45 === void 0 ? void 0 : _45.toString(),
                                                    areaId: (_46 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _46 === void 0 ? void 0 : _46.toString(),
                                                    teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                        ' ' +
                                                        (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                                });
                                            }
                                            else {
                                                let valuationAsignatureCalculate;
                                                let valuationAsignatureDefinitive;
                                                let valuationAsignatureRecovery;
                                                for (let notesAsigna of notesAsignature) {
                                                    switch (notesAsigna === null || notesAsigna === void 0 ? void 0 : notesAsigna.valuationType) {
                                                        case ValuationType_1.ValuationType.CALCULATE:
                                                            valuationAsignatureCalculate = notesAsigna;
                                                            break;
                                                        case ValuationType_1.ValuationType.DEFINITIVE:
                                                            valuationAsignatureDefinitive = notesAsigna;
                                                            break;
                                                        case ValuationType_1.ValuationType.RECOVERY:
                                                            valuationAsignatureRecovery = notesAsigna;
                                                            break;
                                                    }
                                                }
                                                if (valuationAsignatureRecovery) {
                                                    let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAsignatureRecovery === null || valuationAsignatureRecovery === void 0 ? void 0 : valuationAsignatureRecovery.performanceLevelId);
                                                    if (reportPerformanceShowRecoverylValuation == 'YES') {
                                                        notesAsignatures.push({
                                                            assessment: ((_47 = valuationAsignatureCalculate === null || valuationAsignatureCalculate === void 0 ? void 0 : valuationAsignatureCalculate.assessment) === null || _47 === void 0 ? void 0 : _47.toFixed(countDigitsPerformanceLevel)) +
                                                                ' - ' +
                                                                ((_48 = valuationAsignatureRecovery === null || valuationAsignatureRecovery === void 0 ? void 0 : valuationAsignatureRecovery.assessment) === null || _48 === void 0 ? void 0 : _48.toFixed(countDigitsPerformanceLevel)) +
                                                                ' (N)',
                                                            academicPeriodId: valuationAsignatureRecovery === null || valuationAsignatureRecovery === void 0 ? void 0 : valuationAsignatureRecovery.academicPeriodId,
                                                            performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                            asignatureId: (_49 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _49 === void 0 ? void 0 : _49.toString(),
                                                            areaId: (_50 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _50 === void 0 ? void 0 : _50.toString(),
                                                            teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                                ' ' +
                                                                (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                                        });
                                                    }
                                                    else {
                                                        notesAsignatures.push({
                                                            assessment: (_51 = valuationAsignatureRecovery === null || valuationAsignatureRecovery === void 0 ? void 0 : valuationAsignatureRecovery.assessment) === null || _51 === void 0 ? void 0 : _51.toFixed(countDigitsPerformanceLevel),
                                                            academicPeriodId: valuationAsignatureRecovery === null || valuationAsignatureRecovery === void 0 ? void 0 : valuationAsignatureRecovery.academicPeriodId,
                                                            performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                            asignatureId: (_52 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _52 === void 0 ? void 0 : _52.toString(),
                                                            areaId: (_53 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _53 === void 0 ? void 0 : _53.toString(),
                                                            teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                                ' ' +
                                                                (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                                        });
                                                    }
                                                }
                                                else {
                                                    if (valuationAsignatureDefinitive) {
                                                        let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAsignatureDefinitive === null || valuationAsignatureDefinitive === void 0 ? void 0 : valuationAsignatureDefinitive.performanceLevelId);
                                                        notesAsignatures.push({
                                                            assessment: (_54 = valuationAsignatureDefinitive === null || valuationAsignatureDefinitive === void 0 ? void 0 : valuationAsignatureDefinitive.assessment) === null || _54 === void 0 ? void 0 : _54.toFixed(countDigitsPerformanceLevel),
                                                            academicPeriodId: valuationAsignatureDefinitive === null || valuationAsignatureDefinitive === void 0 ? void 0 : valuationAsignatureDefinitive.academicPeriodId,
                                                            performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                            asignatureId: (_55 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _55 === void 0 ? void 0 : _55.toString(),
                                                            areaId: (_56 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _56 === void 0 ? void 0 : _56.toString(),
                                                            teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                                ' ' +
                                                                (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                                        });
                                                    }
                                                    else {
                                                        if (valuationAsignatureCalculate) {
                                                            let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAsignatureCalculate === null || valuationAsignatureCalculate === void 0 ? void 0 : valuationAsignatureCalculate.performanceLevelId);
                                                            notesAsignatures.push({
                                                                assessment: (_57 = valuationAsignatureCalculate === null || valuationAsignatureCalculate === void 0 ? void 0 : valuationAsignatureCalculate.assessment) === null || _57 === void 0 ? void 0 : _57.toFixed(countDigitsPerformanceLevel),
                                                                academicPeriodId: valuationAsignatureCalculate === null || valuationAsignatureCalculate === void 0 ? void 0 : valuationAsignatureCalculate.academicPeriodId,
                                                                performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                                asignatureId: (_58 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _58 === void 0 ? void 0 : _58.toString(),
                                                                areaId: (_59 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _59 === void 0 ? void 0 : _59.toString(),
                                                                teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                                    ' ' +
                                                                    (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            notesAsignatures.push({
                                                assessment: '-',
                                                academicPeriodId: (_60 = period === null || period === void 0 ? void 0 : period.id) === null || _60 === void 0 ? void 0 : _60.toString(),
                                                performanceLevel: '-',
                                                asignatureId: (_61 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _61 === void 0 ? void 0 : _61.toString(),
                                                areaId: (_62 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _62 === void 0 ? void 0 : _62.toString(),
                                                teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                    ' ' +
                                                    (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                            });
                                        }
                                    }
                                    else {
                                        notesAsignatures.push({
                                            assessment: '-',
                                            academicPeriodId: (_63 = period === null || period === void 0 ? void 0 : period.id) === null || _63 === void 0 ? void 0 : _63.toString(),
                                            performanceLevel: '-',
                                            asignatureId: (_64 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _64 === void 0 ? void 0 : _64.toString(),
                                            areaId: (_65 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _65 === void 0 ? void 0 : _65.toString(),
                                            teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                ' ' +
                                                (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                        });
                                    }
                                }
                            }
                            if (ultimateAcademicPeriod) {
                                if (((_66 = ultimateAcademicPeriod === null || ultimateAcademicPeriod === void 0 ? void 0 : ultimateAcademicPeriod.id) === null || _66 === void 0 ? void 0 : _66.toString()) == academicPeriodId ||
                                    reportPerformanceShowFinalValuation == 'YES') {
                                    let notesAsignature = await this.repositoryAcademicAsignatureCourseYearValuation.findBy({
                                        academicAsignatureCourseId: (_67 = asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.id) === null || _67 === void 0 ? void 0 : _67.toString(),
                                        schoolYearId: (_69 = (_68 = academicPeriods[0]) === null || _68 === void 0 ? void 0 : _68.schoolYearId) === null || _69 === void 0 ? void 0 : _69.toString(),
                                        studentId,
                                    });
                                    if ((notesAsignature === null || notesAsignature === void 0 ? void 0 : notesAsignature.length) > 0) {
                                        if ((notesAsignature === null || notesAsignature === void 0 ? void 0 : notesAsignature.length) == 1) {
                                            let performanceLevel = await this.repositoryPerformanceLevel.findOneBy((_70 = notesAsignature[0]) === null || _70 === void 0 ? void 0 : _70.performanceLevelId);
                                            notesAsignatures.push({
                                                assessment: (_72 = (_71 = notesAsignature[0]) === null || _71 === void 0 ? void 0 : _71.assessment) === null || _72 === void 0 ? void 0 : _72.toFixed(countDigitsPerformanceLevel),
                                                academicPeriodId: 'FINAL',
                                                performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                asignatureId: (_73 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _73 === void 0 ? void 0 : _73.toString(),
                                                areaId: (_74 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _74 === void 0 ? void 0 : _74.toString(),
                                                teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                    ' ' +
                                                    (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                            });
                                        }
                                        else {
                                            let valuationAsignatureCalculate;
                                            let valuationAsignatureDefinitive;
                                            let valuationAsignatureRecovery;
                                            for (let notesAsigna of notesAsignature) {
                                                switch (notesAsigna === null || notesAsigna === void 0 ? void 0 : notesAsigna.valuationType) {
                                                    case ValuationType_1.ValuationType.CALCULATE:
                                                        valuationAsignatureCalculate = notesAsigna;
                                                        break;
                                                    case ValuationType_1.ValuationType.DEFINITIVE:
                                                        valuationAsignatureDefinitive = notesAsigna;
                                                        break;
                                                    case ValuationType_1.ValuationType.RECOVERY:
                                                        valuationAsignatureRecovery = notesAsigna;
                                                        break;
                                                }
                                            }
                                            if (valuationAsignatureRecovery) {
                                                let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAsignatureRecovery === null || valuationAsignatureRecovery === void 0 ? void 0 : valuationAsignatureRecovery.performanceLevelId);
                                                notesAsignatures.push({
                                                    assessment: (_75 = valuationAsignatureRecovery === null || valuationAsignatureRecovery === void 0 ? void 0 : valuationAsignatureRecovery.assessment) === null || _75 === void 0 ? void 0 : _75.toFixed(countDigitsPerformanceLevel),
                                                    academicPeriodId: 'FINAL',
                                                    performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                    asignatureId: (_76 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _76 === void 0 ? void 0 : _76.toString(),
                                                    areaId: (_77 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _77 === void 0 ? void 0 : _77.toString(),
                                                    teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                        ' ' +
                                                        (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                                });
                                            }
                                            else {
                                                if (valuationAsignatureDefinitive) {
                                                    let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAsignatureDefinitive === null || valuationAsignatureDefinitive === void 0 ? void 0 : valuationAsignatureDefinitive.performanceLevelId);
                                                    notesAsignatures.push({
                                                        assessment: (_78 = valuationAsignatureDefinitive === null || valuationAsignatureDefinitive === void 0 ? void 0 : valuationAsignatureDefinitive.assessment) === null || _78 === void 0 ? void 0 : _78.toFixed(countDigitsPerformanceLevel),
                                                        academicPeriodId: 'FINAL',
                                                        performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                        asignatureId: (_79 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _79 === void 0 ? void 0 : _79.toString(),
                                                        areaId: (_80 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _80 === void 0 ? void 0 : _80.toString(),
                                                        teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                            ' ' +
                                                            (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                                    });
                                                }
                                                else {
                                                    if (valuationAsignatureCalculate) {
                                                        let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAsignatureCalculate === null || valuationAsignatureCalculate === void 0 ? void 0 : valuationAsignatureCalculate.performanceLevelId);
                                                        notesAsignatures.push({
                                                            assessment: (_81 = valuationAsignatureCalculate === null || valuationAsignatureCalculate === void 0 ? void 0 : valuationAsignatureCalculate.assessment) === null || _81 === void 0 ? void 0 : _81.toFixed(countDigitsPerformanceLevel),
                                                            academicPeriodId: 'FINAL',
                                                            performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                            asignatureId: (_82 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _82 === void 0 ? void 0 : _82.toString(),
                                                            areaId: (_83 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _83 === void 0 ? void 0 : _83.toString(),
                                                            teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                                ' ' +
                                                                (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        notesAsignatures.push({
                                            assessment: '-',
                                            academicPeriodId: 'FINAL',
                                            performanceLevel: '-',
                                            asignatureId: (_84 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _84 === void 0 ? void 0 : _84.toString(),
                                            areaId: (_85 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _85 === void 0 ? void 0 : _85.toString(),
                                            teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                                ' ' +
                                                (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                        });
                                    }
                                }
                                else {
                                    notesAsignatures.push({
                                        assessment: '-',
                                        academicPeriodId: 'FINAL',
                                        performanceLevel: '-',
                                        asignatureId: (_86 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _86 === void 0 ? void 0 : _86.toString(),
                                        areaId: (_87 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _87 === void 0 ? void 0 : _87.toString(),
                                        teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) +
                                            ' ' +
                                            (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                    });
                                }
                            }
                            else {
                                notesAsignatures.push({
                                    assessment: '-',
                                    academicPeriodId: 'FINAL',
                                    performanceLevel: '-',
                                    asignatureId: (_88 = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _88 === void 0 ? void 0 : _88.toString(),
                                    areaId: (_89 = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _89 === void 0 ? void 0 : _89.toString(),
                                    teacher: (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.name) + ' ' + (teacherUserAsignatureCourse === null || teacherUserAsignatureCourse === void 0 ? void 0 : teacherUserAsignatureCourse.lastName),
                                });
                            }
                        }
                        let notesAreas = [];
                        for (let area of areas) {
                            for (let period of academicPeriods) {
                                if ((period === null || period === void 0 ? void 0 : period.order) && (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.order)) {
                                    if ((period === null || period === void 0 ? void 0 : period.order) <= (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.order)) {
                                        let notesArea = await this.repositoryAcademicAreaCoursePeriodValuation.findBy({
                                            academicAreaId: (_90 = area === null || area === void 0 ? void 0 : area.id) === null || _90 === void 0 ? void 0 : _90.toString(),
                                            academicPeriodId: (_91 = period === null || period === void 0 ? void 0 : period.id) === null || _91 === void 0 ? void 0 : _91.toString(),
                                            studentId,
                                        });
                                        if ((notesArea === null || notesArea === void 0 ? void 0 : notesArea.length) > 0) {
                                            let valuationAreaCalculate;
                                            let valuationAreaDefinitive;
                                            let valuationAreaRecovery;
                                            for (let notesA of notesArea) {
                                                switch (notesA === null || notesA === void 0 ? void 0 : notesA.valuationType) {
                                                    case ValuationType_1.ValuationType.CALCULATE:
                                                        valuationAreaCalculate = notesA;
                                                        break;
                                                    case ValuationType_1.ValuationType.DEFINITIVE:
                                                        valuationAreaDefinitive = notesA;
                                                        break;
                                                    case ValuationType_1.ValuationType.RECOVERY:
                                                        valuationAreaRecovery = notesA;
                                                        break;
                                                }
                                            }
                                            if (valuationAreaRecovery) {
                                                let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAreaRecovery === null || valuationAreaRecovery === void 0 ? void 0 : valuationAreaRecovery.performanceLevelId);
                                                notesAreas.push({
                                                    assessment: (_92 = valuationAreaRecovery === null || valuationAreaRecovery === void 0 ? void 0 : valuationAreaRecovery.assessment) === null || _92 === void 0 ? void 0 : _92.toFixed(countDigitsPerformanceLevel),
                                                    academicPeriodId: valuationAreaRecovery === null || valuationAreaRecovery === void 0 ? void 0 : valuationAreaRecovery.academicPeriodId,
                                                    performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                    areaId: (_93 = area === null || area === void 0 ? void 0 : area.id) === null || _93 === void 0 ? void 0 : _93.toString(),
                                                });
                                            }
                                            else {
                                                if (valuationAreaDefinitive) {
                                                    let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAreaDefinitive === null || valuationAreaDefinitive === void 0 ? void 0 : valuationAreaDefinitive.performanceLevelId);
                                                    notesAreas.push({
                                                        assessment: (_94 = valuationAreaDefinitive === null || valuationAreaDefinitive === void 0 ? void 0 : valuationAreaDefinitive.assessment) === null || _94 === void 0 ? void 0 : _94.toFixed(countDigitsPerformanceLevel),
                                                        academicPeriodId: valuationAreaDefinitive === null || valuationAreaDefinitive === void 0 ? void 0 : valuationAreaDefinitive.academicPeriodId,
                                                        performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                        areaId: (_95 = area === null || area === void 0 ? void 0 : area.id) === null || _95 === void 0 ? void 0 : _95.toString(),
                                                    });
                                                }
                                                else {
                                                    if (valuationAreaCalculate) {
                                                        let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAreaCalculate === null || valuationAreaCalculate === void 0 ? void 0 : valuationAreaCalculate.performanceLevelId);
                                                        notesAreas.push({
                                                            assessment: (_96 = valuationAreaCalculate === null || valuationAreaCalculate === void 0 ? void 0 : valuationAreaCalculate.assessment) === null || _96 === void 0 ? void 0 : _96.toFixed(countDigitsPerformanceLevel),
                                                            academicPeriodId: valuationAreaCalculate === null || valuationAreaCalculate === void 0 ? void 0 : valuationAreaCalculate.academicPeriodId,
                                                            performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                            areaId: (_97 = area === null || area === void 0 ? void 0 : area.id) === null || _97 === void 0 ? void 0 : _97.toString(),
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            notesAreas.push({
                                                assessment: '-',
                                                academicPeriodId: (_98 = period === null || period === void 0 ? void 0 : period.id) === null || _98 === void 0 ? void 0 : _98.toString(),
                                                performanceLevel: '-',
                                                areaId: (_99 = area === null || area === void 0 ? void 0 : area.id) === null || _99 === void 0 ? void 0 : _99.toString(),
                                            });
                                        }
                                    }
                                    else {
                                        notesAreas.push({
                                            assessment: '-',
                                            academicPeriodId: (_100 = period === null || period === void 0 ? void 0 : period.id) === null || _100 === void 0 ? void 0 : _100.toString(),
                                            performanceLevel: '-',
                                            areaId: (_101 = area === null || area === void 0 ? void 0 : area.id) === null || _101 === void 0 ? void 0 : _101.toString(),
                                        });
                                    }
                                }
                            }
                            if (ultimateAcademicPeriod) {
                                if (((_102 = ultimateAcademicPeriod === null || ultimateAcademicPeriod === void 0 ? void 0 : ultimateAcademicPeriod.id) === null || _102 === void 0 ? void 0 : _102.toString()) == academicPeriodId ||
                                    reportPerformanceShowFinalValuation == 'YES') {
                                    let notesArea = await this.repositoryAcademicAreaCourseYearValuation.findBy({
                                        academicAreaId: (_103 = area === null || area === void 0 ? void 0 : area.id) === null || _103 === void 0 ? void 0 : _103.toString(),
                                        schoolYearId: (_105 = (_104 = academicPeriods[0]) === null || _104 === void 0 ? void 0 : _104.schoolYearId) === null || _105 === void 0 ? void 0 : _105.toString(),
                                        studentId,
                                    });
                                    if ((notesArea === null || notesArea === void 0 ? void 0 : notesArea.length) > 0) {
                                        if ((notesArea === null || notesArea === void 0 ? void 0 : notesArea.length) == 1) {
                                            let performanceLevel = await this.repositoryPerformanceLevel.findOneBy((_106 = notesArea[0]) === null || _106 === void 0 ? void 0 : _106.performanceLevelId);
                                            notesAreas.push({
                                                assessment: (_108 = (_107 = notesArea[0]) === null || _107 === void 0 ? void 0 : _107.assessment) === null || _108 === void 0 ? void 0 : _108.toFixed(countDigitsPerformanceLevel),
                                                academicPeriodId: 'FINAL',
                                                performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                areaId: (_109 = area === null || area === void 0 ? void 0 : area.id) === null || _109 === void 0 ? void 0 : _109.toString(),
                                            });
                                        }
                                        else {
                                            let valuationAreaCalculate;
                                            let valuationAreaDefinitive;
                                            let valuationAreaRecovery;
                                            for (let notesA of notesArea) {
                                                switch (notesA === null || notesA === void 0 ? void 0 : notesA.valuationType) {
                                                    case ValuationType_1.ValuationType.CALCULATE:
                                                        valuationAreaCalculate = notesA;
                                                        break;
                                                    case ValuationType_1.ValuationType.DEFINITIVE:
                                                        valuationAreaDefinitive = notesA;
                                                        break;
                                                    case ValuationType_1.ValuationType.RECOVERY:
                                                        valuationAreaRecovery = notesA;
                                                        break;
                                                }
                                            }
                                            if (valuationAreaRecovery) {
                                                let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAreaRecovery === null || valuationAreaRecovery === void 0 ? void 0 : valuationAreaRecovery.performanceLevelId);
                                                notesAreas.push({
                                                    assessment: (_110 = valuationAreaRecovery === null || valuationAreaRecovery === void 0 ? void 0 : valuationAreaRecovery.assessment) === null || _110 === void 0 ? void 0 : _110.toFixed(countDigitsPerformanceLevel),
                                                    academicPeriodId: 'FINAL',
                                                    performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                    areaId: (_111 = area === null || area === void 0 ? void 0 : area.id) === null || _111 === void 0 ? void 0 : _111.toString(),
                                                });
                                            }
                                            else {
                                                if (valuationAreaDefinitive) {
                                                    let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAreaDefinitive === null || valuationAreaDefinitive === void 0 ? void 0 : valuationAreaDefinitive.performanceLevelId);
                                                    notesAreas.push({
                                                        assessment: (_112 = valuationAreaDefinitive === null || valuationAreaDefinitive === void 0 ? void 0 : valuationAreaDefinitive.assessment) === null || _112 === void 0 ? void 0 : _112.toFixed(countDigitsPerformanceLevel),
                                                        academicPeriodId: 'FINAL',
                                                        performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                        areaId: (_113 = area === null || area === void 0 ? void 0 : area.id) === null || _113 === void 0 ? void 0 : _113.toString(),
                                                    });
                                                }
                                                else {
                                                    if (valuationAreaCalculate) {
                                                        let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(valuationAreaCalculate === null || valuationAreaCalculate === void 0 ? void 0 : valuationAreaCalculate.performanceLevelId);
                                                        notesAreas.push({
                                                            assessment: (_114 = valuationAreaCalculate === null || valuationAreaCalculate === void 0 ? void 0 : valuationAreaCalculate.assessment) === null || _114 === void 0 ? void 0 : _114.toFixed(countDigitsPerformanceLevel),
                                                            academicPeriodId: 'FINAL',
                                                            performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                                            areaId: (_115 = area === null || area === void 0 ? void 0 : area.id) === null || _115 === void 0 ? void 0 : _115.toString(),
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        notesAreas.push({
                                            assessment: '-',
                                            academicPeriodId: 'FINAL',
                                            performanceLevel: '-',
                                            areaId: (_116 = area === null || area === void 0 ? void 0 : area.id) === null || _116 === void 0 ? void 0 : _116.toString(),
                                        });
                                    }
                                }
                                else {
                                    notesAreas.push({
                                        assessment: '-',
                                        academicPeriodId: 'FINAL',
                                        performanceLevel: '-',
                                        areaId: (_117 = area === null || area === void 0 ? void 0 : area.id) === null || _117 === void 0 ? void 0 : _117.toString(),
                                    });
                                }
                            }
                            else {
                                notesAreas.push({
                                    assessment: '-',
                                    academicPeriodId: 'FINAL',
                                    performanceLevel: '-',
                                    areaId: (_118 = area === null || area === void 0 ? void 0 : area.id) === null || _118 === void 0 ? void 0 : _118.toString(),
                                });
                            }
                        }
                        let notesBehaviour = [];
                        if (reportPerformanceBehaviourStudent == 'DISPLAY') {
                            let noteBehaviour = await this.repositoryStudentBehaviour.findBy({
                                courseId: (_119 = course === null || course === void 0 ? void 0 : course.id) === null || _119 === void 0 ? void 0 : _119.toString(),
                                academicPeriodId: (_120 = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _120 === void 0 ? void 0 : _120.toString(),
                                studentId,
                            });
                            if ((noteBehaviour === null || noteBehaviour === void 0 ? void 0 : noteBehaviour.length) == 1) {
                                let performanceLevel = await this.repositoryPerformanceLevel.findOneBy((_121 = noteBehaviour[0]) === null || _121 === void 0 ? void 0 : _121.performanceLevelId);
                                notesBehaviour.push({
                                    assessment: (_123 = (_122 = noteBehaviour[0]) === null || _122 === void 0 ? void 0 : _122.assessment) === null || _123 === void 0 ? void 0 : _123.toFixed(countDigitsPerformanceLevel),
                                    academicPeriodId: (_124 = noteBehaviour[0]) === null || _124 === void 0 ? void 0 : _124.academicPeriodId,
                                    performanceLevel: performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.name,
                                    observation: (_125 = noteBehaviour[0]) === null || _125 === void 0 ? void 0 : _125.observation,
                                });
                            }
                            else {
                                notesBehaviour.push({
                                    assessment: '-',
                                    academicPeriodId: (_126 = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _126 === void 0 ? void 0 : _126.toString(),
                                    performanceLevel: '-',
                                    observation: '-',
                                });
                            }
                        }
                        dataPDF = Object.assign(Object.assign({}, dataPDF), { noteBehaviour: notesBehaviour });
                        dataPDF = Object.assign(Object.assign({}, dataPDF), { notesAsignatures: notesAsignatures });
                        dataPDF = Object.assign(Object.assign({}, dataPDF), { notesAreas: notesAreas });
                        dataPDF = Object.assign(Object.assign({}, dataPDF), { generatedDate: new Date().toLocaleString(undefined, {
                                timeZone: 'America/Bogota',
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            }) });
                        dataPDF = Object.assign(Object.assign({}, dataPDF), { generatedHour: new Date().toLocaleString('en-US', {
                                timeZone: 'America/Bogota',
                                hour: '2-digit',
                                hour12: true,
                                minute: '2-digit',
                                second: '2-digit',
                            }) });
                        switch (reportPerformanceType) {
                            case 'DETAILS':
                                await this.generatePerformanceReportStudentDetails(dataPDF, studentId, format).then((dataUrl) => {
                                    urls.push(dataUrl);
                                });
                                await this.generatePerformanceReportStudent(dataPDF, studentId, format).then((dataUrl) => {
                                    urls.push(dataUrl);
                                });
                                break;
                            case 'SINGLE':
                                await this.generatePerformanceReportStudent(dataPDF, studentId, format).then((dataUrl) => {
                                    urls.push(dataUrl);
                                });
                                break;
                        }
                    }
                    let urlsReturn = await Promise.all(promisesGeneratePDF).then(() => {
                        if ((urls === null || urls === void 0 ? void 0 : urls.length) > 1) {
                            let urlsAux = [];
                            if (studentsId) {
                                for (let student of studentsId) {
                                    let urlsStudents = urls.filter((url) => url.includes(student));
                                    urlsStudents = urlsStudents.sort();
                                    for (let urlStudent of urlsStudents) {
                                        urlsAux.push(urlStudent);
                                    }
                                }
                            }
                            const opts = {
                                maxBuffer: 1024 * 5096,
                                maxHeap: '2g',
                            };
                            var dir = './public/downloads/reports/courses/' + id;
                            if (!fs_extra_1.default.existsSync(dir)) {
                                fs_extra_1.default.mkdirSync(dir, { recursive: true });
                            }
                            merge(urlsAux, dir + '/' + id + '.pdf', opts, function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                                console.log('Successfully merged!');
                            });
                            return dir + '/' + id + '.pdf';
                        }
                        else {
                            return urls[0];
                        }
                    });
                    return urlsReturn + '';
                }
            }
        }
    }
    async generatePerformanceReportStudent(data, id, format) {
        try {
            handlebars_1.default.registerHelper(`iff`, (a, operator, b, opts) => {
                let bool = false;
                a === null || a === void 0 ? void 0 : a.toString();
                b === null || b === void 0 ? void 0 : b.toString();
                switch (operator) {
                    case `!=`:
                        bool = a != b;
                        break;
                    case `===`:
                        bool = a === b;
                        break;
                    case `==`:
                        bool = a == b;
                        break;
                    case `>`:
                        bool = a > b;
                        break;
                    case `<`:
                        bool = a < b;
                        break;
                    default:
                        bool = a === b;
                }
                if (bool) {
                    return opts.fn(this);
                }
                return opts.inverse(this);
            });
            const browser = await puppeteer_1.default.launch({
                pipe: true,
                args: [
                    '--headless',
                    '--disable-gpu',
                    '--full-memory-crash-report',
                    '--unlimited-storage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                ],
                protocolTimeout: 240000,
                headless: true,
                timeout: 0,
            });
            const page = await browser.newPage();
            const content = await this.compile('index', data);
            await page.setContent(content);
            var dir = './public/downloads/reports/students/' + id;
            if (!fs_extra_1.default.existsSync(dir)) {
                fs_extra_1.default.mkdirSync(dir, { recursive: true });
            }
            await puppeteer_report_1.default.pdfPage(page, {
                path: dir + '/' + id + '-1' + '.pdf',
                format: format,
                printBackground: true,
                preferCSSPageSize: true,
                margin: {
                    bottom: '0',
                    left: '0',
                    right: '0',
                    top: '0',
                },
            });
            await page.close();
            await browser.close();
            return dir + '/' + id + '-1' + '.pdf';
        }
        catch (e) {
            console.log(e);
            return '';
        }
    }
    async generatePerformanceReportStudentDetails(data, id, format) {
        try {
            handlebars_1.default.registerHelper(`iff`, (a, operator, b, opts) => {
                let bool = false;
                a === null || a === void 0 ? void 0 : a.toString();
                b === null || b === void 0 ? void 0 : b.toString();
                switch (operator) {
                    case `!=`:
                        bool = a != b;
                        break;
                    case `===`:
                        bool = a === b;
                        break;
                    case `==`:
                        bool = a == b;
                        break;
                    case `>`:
                        bool = a > b;
                        break;
                    case `<`:
                        bool = a < b;
                        break;
                    default:
                        bool = a === b;
                }
                if (bool) {
                    return opts.fn(this);
                }
                return opts.inverse(this);
            });
            process.setMaxListeners(0);
            const browser = await puppeteer_1.default.launch({
                pipe: true,
                args: [
                    '--headless',
                    '--disable-gpu',
                    '--full-memory-crash-report',
                    '--unlimited-storage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                ],
                protocolTimeout: 240000,
                headless: true,
                timeout: 0,
            });
            const page = await browser.newPage();
            const content = await this.compile('index2', data);
            await page.setContent(content);
            var dir = './public/downloads/reports/students/' + id;
            if (!fs_extra_1.default.existsSync(dir)) {
                fs_extra_1.default.mkdirSync(dir, { recursive: true });
            }
            await puppeteer_report_1.default.pdfPage(page, {
                path: dir + '/' + id + '-2' + '.pdf',
                format: format,
                printBackground: true,
                preferCSSPageSize: true,
                margin: {
                    bottom: '0',
                    left: '0',
                    right: '0',
                    top: '0',
                },
            });
            await page.close();
            await browser.close();
            return dir + '/' + id + '-2' + '.pdf';
        }
        catch (e) {
            console.log(e);
            return '';
        }
    }
    async generatePerformanceLevelExample2(id, context) {
        const data = require('../../../reports/performanceReport/data.json');
        try {
            process.setMaxListeners(0);
            const browser = await puppeteer_1.default.launch({
                pipe: true,
                args: [
                    '--headless',
                    '--disable-gpu',
                    '--full-memory-crash-report',
                    '--unlimited-storage',
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                ],
                protocolTimeout: 240000,
                headless: true,
                timeout: 0,
            });
            const page = await browser.newPage();
            const content = await this.compile('index', data);
            await page.setContent(content);
            await page.pdf({
                path: 'output.pdf',
                format: 'A4',
                printBackground: true,
                margin: {
                    bottom: '10mm',
                    left: '10mm',
                    right: '10mm',
                    top: '10mm',
                },
            });
            await page.close();
            await browser.close();
        }
        catch (e) {
            console.log(e);
        }
        return true;
    }
    async compile(templateName, data) {
        const filePath = path_1.default.join(process.cwd(), 'app', 'reports', 'performanceReport', `${templateName}.hbs`);
        const html = await fs_extra_1.default.readFile(filePath, 'utf8');
        return handlebars_1.default.compile(html)(data);
    }
    compareOrderAcademicArea(a, b) {
        if ((a === null || a === void 0 ? void 0 : a.order) > (b === null || b === void 0 ? void 0 : b.order)) {
            return -1;
        }
        if ((a === null || a === void 0 ? void 0 : a.order) < (b === null || b === void 0 ? void 0 : b.order)) {
            return 1;
        }
        return 0;
    }
};
exports.PerformanceReportResolver = PerformanceReportResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Teacher_1.Teacher),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryTeacher", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicDay_1.AcademicDay),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicDay", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicPeriod_1.AcademicPeriod),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicPeriod", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicArea_1.AcademicArea),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicArea", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCoursePeriodValuation_1.AcademicAsignatureCoursePeriodValuation),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicAsignatureCoursePeriodValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAreaCoursePeriodValuation_1.AcademicAreaCoursePeriodValuation),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicAreaCoursePeriodValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourseYearValuation_1.AcademicAsignatureCourseYearValuation),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicAsignatureCourseYearValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAcademicAreaCourseYearValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PerformanceLevel_1.PerformanceLevel),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryPerformanceLevel", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AverageAcademicPeriodStudent_1.AverageAcademicPeriodStudent),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAverageAcademicPeriodStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryAverageAcademicPeriodCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Learning_1.Learning),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryLearning", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvidenceLearning_1.EvidenceLearning),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryEvidenceLearning", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearning_1.ExperienceLearning),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryExperienceLearning", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolConfiguration_1.SchoolConfiguration),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositorySchoolConfiguration", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(StudentBehaviour_1.StudentBehaviour),
    __metadata("design:type", Object)
], PerformanceReportResolver.prototype, "repositoryStudentBehaviour", void 0);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('studentId', () => String, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('format', () => String)),
    __param(6, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String,
        String, Object]),
    __metadata("design:returntype", Promise)
], PerformanceReportResolver.prototype, "generatePerformanceReportCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PerformanceReportResolver.prototype, "generatePerformanceLevelExample2", null);
exports.PerformanceReportResolver = PerformanceReportResolver = __decorate([
    (0, type_graphql_1.Resolver)(SchoolConfiguration_1.SchoolConfiguration)
], PerformanceReportResolver);
