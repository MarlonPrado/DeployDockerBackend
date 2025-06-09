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
exports.ImportDataSchoolResolver = void 0;
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const AcademicAsignatureCourse_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourse");
const AcademicDay_1 = require("../../models/CampusAdministrator/AcademicDay");
const Course_1 = require("../../models/CampusAdministrator/Course");
const Teacher_1 = require("../../models/CampusAdministrator/Teacher");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const SchoolAdministrator_1 = require("../../models/GeneralAdministrator/SchoolAdministrator");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicArea_1 = require("../../models/SchoolAdministrator/AcademicArea");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const AcademicPeriod_1 = require("../../models/SchoolAdministrator/AcademicPeriod");
const CampusAdministrator_1 = require("../../models/SchoolAdministrator/CampusAdministrator");
const EducationLevel_1 = require("../../models/SchoolAdministrator/EducationLevel");
const EvaluativeComponent_1 = require("../../models/SchoolAdministrator/EvaluativeComponent");
const GradeAssignment_1 = require("../../models/SchoolAdministrator/GradeAssignment");
const Modality_1 = require("../../models/SchoolAdministrator/Modality");
const PerformanceLevel_1 = require("../../models/SchoolAdministrator/PerformanceLevel");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const Specialty_1 = require("../../models/SchoolAdministrator/Specialty");
const AcademicDayResolver_1 = require("../CampusAdministrator/AcademicDayResolver");
const CourseResolver_1 = require("../CampusAdministrator/CourseResolver");
const AcademicAreaResolver_1 = require("../SchoolAdministrator/AcademicAreaResolver");
const AcademicGradeResolver_1 = require("../SchoolAdministrator/AcademicGradeResolver");
const AcademicPeriodResolver_1 = require("../SchoolAdministrator/AcademicPeriodResolver");
const EducationLevelResolver_1 = require("../SchoolAdministrator/EducationLevelResolver");
const EvaluativeComponentResolver_1 = require("../SchoolAdministrator/EvaluativeComponentResolver");
const PerformanceLevelResolver_1 = require("../SchoolAdministrator/PerformanceLevelResolver");
const StudentResolver_1 = require("./StudentResolver");
let ImportDataSchoolResolver = class ImportDataSchoolResolver {
    constructor() {
        this.repository = DataSource_1.SpecialtyRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryAcademicPeriod = DataSource_1.AcademicPeriodRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicDay = DataSource_1.AcademicDayRepository;
        this.repositoryEducationLevel = DataSource_1.EducationLevelRepository;
        this.repositoryPerformanceLevel = DataSource_1.PerformanceLevelRepository;
        this.repositoryEvaluativeComponent = DataSource_1.EvaluativeComponentRepository;
        this.repositoryModality = DataSource_1.ModalityRepository;
        this.repositorySpecialty = DataSource_1.SpecialtyRepository;
        this.repositoryAcademicArea = DataSource_1.AcademicAreaRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
        this.repositorySchoolAdministrator = DataSource_1.SchoolAdministratorRepository;
        this.repositoryCampusAdministrator = DataSource_1.CampusAdministratorRepository;
        this.repositoryGradeAssignment = DataSource_1.GradeAssignmentRepository;
        this.repositoryTeacher = DataSource_1.TeacherRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.repositoryAcademicAsignatureCourse = DataSource_1.AcademicAsignatureCourseRepository;
        this.academicDayResolver = new AcademicDayResolver_1.AcademicDayResolver();
        this.courseResolver = new CourseResolver_1.CourseResolver();
        this.studentResolver = new StudentResolver_1.StudentResolver();
        this.academicPeriodResolver = new AcademicPeriodResolver_1.AcademicPeriodResolver();
        this.educationLevelResolver = new EducationLevelResolver_1.EducationLevelResolver();
        this.performanceLevelResolver = new PerformanceLevelResolver_1.PerformanceLevelResolver();
        this.evaluativeComponentResolver = new EvaluativeComponentResolver_1.EvaluativeComponentResolver();
        this.academicAreaResolver = new AcademicAreaResolver_1.AcademicAreaResolver();
        this.academicGradeResolver = new AcademicGradeResolver_1.AcademicGradeResolver();
    }
    async updateWithDaneSchoolBulk() {
        let dataSchoolDane = ['154498000051'];
        let dataSchool = await this.repositorySchool.findBy({
            where: { daneCode: { $in: dataSchoolDane } },
        });
        for (let school of dataSchool) {
            let schoolId = school.id.toString();
            console.log('Actualizando IE: ', school === null || school === void 0 ? void 0 : school.name);
            console.log('DANE IE: ', school === null || school === void 0 ? void 0 : school.daneCode);
            await this.importDataSchoolInactive(schoolId);
        }
        return true;
    }
    async importDataSchoolInactive(schoolId) {
        let dataSchoolYear = await this.repositorySchoolYear.findBy({
            where: { schoolId: schoolId, schoolYear: 2023 },
        });
        if (dataSchoolYear.length == 1) {
            let dataCampus = await this.repositoryCampus.findBy({ where: { schoolId: schoolId } });
            for (let schoolYear of dataSchoolYear) {
                console.log('Step: Initial');
                console.log('Update Year');
                let resultSchoolYear = await this.repositorySchoolYear.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(schoolYear.id.toString()) }, schoolYear), { schoolYear: 2023, version: (schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.version) + 1 }));
                let dataAcademicPeriods = await this.repositoryAcademicPeriod.findBy({
                    where: { schoolId: schoolId },
                });
                console.log('Academic Periods: ', dataAcademicPeriods === null || dataAcademicPeriods === void 0 ? void 0 : dataAcademicPeriods.length);
                for (let academicPeriod of dataAcademicPeriods) {
                    let resultAcademicPeriod = await this.repositoryAcademicPeriod.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(academicPeriod.id.toString()) }, academicPeriod), { version: (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                }
                for (let campus of dataCampus) {
                    let dataAcademicDays = await this.repositoryAcademicDay.findBy({
                        where: { campusId: campus.id.toString() },
                    });
                    console.log('Academic Days Campus: ', dataAcademicDays === null || dataAcademicDays === void 0 ? void 0 : dataAcademicDays.length);
                    console.log('Campus: ', campus === null || campus === void 0 ? void 0 : campus.name);
                    for (let academicDay of dataAcademicDays) {
                        let resultAcademicDay = await this.repositoryAcademicDay.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(academicDay.id.toString()) }, academicDay), { version: (academicDay === null || academicDay === void 0 ? void 0 : academicDay.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                    }
                }
                let dataEducationLevel = await this.repositoryEducationLevel.findBy({
                    where: { schoolId: schoolId },
                });
                console.log('Education Level: ', dataEducationLevel === null || dataEducationLevel === void 0 ? void 0 : dataEducationLevel.length);
                for (let educationLevel of dataEducationLevel) {
                    let resultEducationLevel = await this.repositoryEducationLevel.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(educationLevel.id.toString()) }, educationLevel), { version: (educationLevel === null || educationLevel === void 0 ? void 0 : educationLevel.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                }
                let dataPerformanceLevel = await this.repositoryPerformanceLevel.findBy({
                    where: { schoolId: schoolId },
                });
                console.log('Performance Level: ', dataPerformanceLevel === null || dataPerformanceLevel === void 0 ? void 0 : dataPerformanceLevel.length);
                for (let performanceLevel of dataPerformanceLevel) {
                    let resultEducationLevel = await this.repositoryPerformanceLevel.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(performanceLevel.id.toString()) }, performanceLevel), { version: (performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                }
                let dataEvaluativeComponent = await this.repositoryEvaluativeComponent.findBy({
                    where: { schoolId: schoolId },
                });
                console.log('Evaluative Component: ', dataEvaluativeComponent === null || dataEvaluativeComponent === void 0 ? void 0 : dataEvaluativeComponent.length);
                for (let evaluativeComponent of dataEvaluativeComponent) {
                    let resultEducationLevel = await this.repositoryEvaluativeComponent.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(evaluativeComponent.id.toString()) }, evaluativeComponent), { version: (evaluativeComponent === null || evaluativeComponent === void 0 ? void 0 : evaluativeComponent.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                }
                let dataModality = await this.repositoryModality.findBy({ where: { schoolId: schoolId } });
                console.log('Modality: ', dataEvaluativeComponent === null || dataEvaluativeComponent === void 0 ? void 0 : dataEvaluativeComponent.length);
                for (let modality of dataModality) {
                    let resultModality = await this.repositoryModality.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(modality.id.toString()) }, modality), { version: (modality === null || modality === void 0 ? void 0 : modality.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                    let dataSpeciality = await this.repositorySpecialty.findBy({
                        where: { modalityId: modality.id.toString() },
                    });
                    console.log('Speciality: ', dataSpeciality === null || dataSpeciality === void 0 ? void 0 : dataSpeciality.length);
                    for (let speciality of dataSpeciality) {
                        let resultSpeciality = await this.repositorySpecialty.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(speciality.id.toString()) }, speciality), { version: (speciality === null || speciality === void 0 ? void 0 : speciality.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                    }
                }
                let dataAcademicArea = await this.repositoryAcademicArea.findBy({
                    where: { schoolId: schoolId },
                });
                console.log('Academic Area: ', dataAcademicArea === null || dataAcademicArea === void 0 ? void 0 : dataAcademicArea.length);
                for (let academicArea of dataAcademicArea) {
                    let resultAcademicArea = await this.repositoryAcademicArea.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(academicArea.id.toString()) }, academicArea), { version: (academicArea === null || academicArea === void 0 ? void 0 : academicArea.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                    let dataAcademicAsignature = await this.repositoryAcademicAsignature.findBy({
                        where: { academicAreaId: academicArea.id.toString() },
                    });
                    console.log('Academic Asignature: ', dataAcademicAsignature === null || dataAcademicAsignature === void 0 ? void 0 : dataAcademicAsignature.length);
                    for (let academicAsignature of dataAcademicAsignature) {
                        let resultAcademicAsignature = await this.repositoryAcademicAsignature.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(academicAsignature.id.toString()) }, academicAsignature), { version: (academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                    }
                }
                let dataAcademicGrade = await this.repositoryAcademicGrade.findBy({
                    where: { schoolId: schoolId },
                });
                console.log('Academic Grade: ', dataAcademicGrade === null || dataAcademicGrade === void 0 ? void 0 : dataAcademicGrade.length);
                for (let academicGrade of dataAcademicGrade) {
                    let resultAcademicGrade = await this.repositoryAcademicGrade.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(academicGrade.id.toString()) }, academicGrade), { version: (academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.version) + 1, schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                    let dataCourse = await this.repositoryCourse.findBy({
                        where: { academicGradeId: academicGrade.id.toString() },
                    });
                    console.log('Course: ', dataCourse === null || dataCourse === void 0 ? void 0 : dataCourse.length);
                    for (let course of dataCourse) {
                        let resultCourse = await this.repositoryCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(course.id.toString()) }, course), { version: (course === null || course === void 0 ? void 0 : course.version) + 1, studentsId: [], schoolId: schoolId.toString(), schoolYearId: schoolYear.id.toString() }));
                    }
                }
                console.log('Step: SIMAT ');
                await this.academicDayResolver.createAllInitialsAcademicDay(schoolId, schoolYear.id.toString());
                console.log('Step: SIMAT - Academic Days');
                await this.courseResolver.createAllInitialsCourse(schoolId, schoolYear.id.toString());
                console.log('Step: SIMAT - Courses');
                await this.courseResolver.updateGradeAllInitialsCourse(schoolId, schoolYear.id.toString());
                console.log('Step: SIMAT - Update Grade Courses');
                await this.courseResolver.updateGradeAcademicDayAllInitialsCourse(schoolId, schoolYear.id.toString());
                console.log('Step: SIMAT - Update Academic Day Courses');
                await this.studentResolver.createAllInitialsStudents(schoolId, schoolYear.id.toString());
                console.log('Step: SIMAT - Update Students');
            }
        }
        else {
            console.log('Step Fail: School Years ', dataSchoolYear === null || dataSchoolYear === void 0 ? void 0 : dataSchoolYear.length);
        }
        return true;
    }
    async updateGradeAssignmentSchoolYear() {
        var _a, _b, _c;
        let dataSchoolDane = [
            '154128000680',
        ];
        let dataSchool = await this.repositorySchool.findBy({
            where: { daneCode: { $in: dataSchoolDane } },
        });
        for (let school of dataSchool) {
            let schoolId = school.id.toString();
            let dataGradeAssigments = await this.repositoryGradeAssignment.findBy({
                where: { schoolId: schoolId },
            });
            let schoolYearId = undefined;
            console.log('Actualizando IE: ', school === null || school === void 0 ? void 0 : school.name);
            console.log('DANE IE: ', school === null || school === void 0 ? void 0 : school.daneCode);
            console.log('Actualizando: ', dataGradeAssigments === null || dataGradeAssigments === void 0 ? void 0 : dataGradeAssigments.length);
            for (let gradeAssigment of dataGradeAssigments) {
                if (gradeAssigment.schoolYearId == undefined) {
                    let academicGrade = await this.repositoryAcademicGrade.findOneBy(gradeAssigment.academicGradeId);
                    if (academicGrade) {
                        let resultGradeAssigment = await this.repositoryGradeAssignment.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_a = gradeAssigment === null || gradeAssigment === void 0 ? void 0 : gradeAssigment.id) === null || _a === void 0 ? void 0 : _a.toString()) }, gradeAssigment), { schoolYearId: academicGrade.schoolYearId, active: true, version: (gradeAssigment === null || gradeAssigment === void 0 ? void 0 : gradeAssigment.version) + 1 }));
                        schoolYearId = academicGrade.schoolYearId;
                    }
                }
                else {
                    schoolYearId = gradeAssigment.schoolYearId;
                }
                let dataAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findBy({
                    where: { gradeAssignmentId: gradeAssigment.id.toString() },
                });
                for (let academicAsignatureCourse of dataAcademicAsignatureCourse) {
                    let resultAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy((_b = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.id) === null || _b === void 0 ? void 0 : _b.toString());
                    resultAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_c = resultAcademicAsignatureCourse === null || resultAcademicAsignatureCourse === void 0 ? void 0 : resultAcademicAsignatureCourse.id) === null || _c === void 0 ? void 0 : _c.toString()) }, resultAcademicAsignatureCourse), { schoolYearId: schoolYearId, schoolId: schoolId.toString(), active: true, version: (resultAcademicAsignatureCourse === null || resultAcademicAsignatureCourse === void 0 ? void 0 : resultAcademicAsignatureCourse.version) + 1 }));
                }
            }
        }
        return true;
    }
    async fixStudentCourseYearOld(schoolId, schoolYearId) {
        var _a, _b;
        let dataSchool = await this.repositorySchool.findOneBy(schoolId);
        let dataSchoolYear = await this.repositorySchoolYear.findOneBy(schoolYearId);
        if (dataSchool && dataSchoolYear) {
            let schoolId = dataSchool.id.toString();
            let schoolYearId = dataSchoolYear.id.toString();
            let dataCourses = await this.repositoryCourse.findBy({
                where: { schoolId: schoolId, schoolYearId },
            });
            for (let course of dataCourses) {
                let dataStudents = await this.repositoryStudent.findBy({
                    courseId: course.id.toString(),
                });
                console.log('dataStudents', dataStudents);
                let studentsId = [];
                for (let student of dataStudents) {
                    studentsId === null || studentsId === void 0 ? void 0 : studentsId.push((_a = student === null || student === void 0 ? void 0 : student.id) === null || _a === void 0 ? void 0 : _a.toString());
                }
                console.log(studentsId);
                let resultCourse = await this.repositoryCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_b = course === null || course === void 0 ? void 0 : course.id) === null || _b === void 0 ? void 0 : _b.toString()) }, course), { studentsId, version: (course === null || course === void 0 ? void 0 : course.version) + 1 }));
            }
        }
        return true;
    }
    async updateDataSimat(schoolId, schoolYearId) {
        let dataSchool = await this.repositorySchool.findOneBy(schoolId);
        if (dataSchool) {
            let schoolId = dataSchool.id.toString();
            console.log('Actualizando IE: ', dataSchool === null || dataSchool === void 0 ? void 0 : dataSchool.name);
            console.log('DANE IE: ', dataSchool === null || dataSchool === void 0 ? void 0 : dataSchool.daneCode);
            let dataSchoolYear = await this.repositorySchoolYear.findOneBy(schoolYearId);
            if (dataSchoolYear) {
                console.log('Step: SIMAT ');
                await this.academicDayResolver.createAllInitialsAcademicDay(schoolId, schoolYearId);
                console.log('Step: SIMAT - Academic Days');
                await this.courseResolver.createAllInitialsCourse(schoolId, schoolYearId);
                console.log('Step: SIMAT - Courses');
                await this.courseResolver.updateGradeAllInitialsCourse(schoolId, schoolYearId);
                console.log('Step: SIMAT - Update Grade Courses');
                await this.courseResolver.updateGradeAcademicDayAllInitialsCourse(schoolId, schoolYearId);
                console.log('Step: SIMAT - Update Academic Day Courses');
                await this.studentResolver.createAllInitialsStudents(schoolId, schoolYearId);
                console.log('Step: SIMAT - Update Students');
                console.log('Step: Final');
            }
        }
        return true;
    }
    async importGradeAssignmentSchoolYear() {
        var _a, _b;
        let dataSchoolDane = [
            '2540030000445',
        ];
        let dataSchool = await this.repositorySchool.findBy({
            where: { daneCode: { $in: dataSchoolDane } },
        });
        for (let school of dataSchool) {
            let dataSchoolYear2022 = await this.repositorySchoolYear.findBy({
                where: { schoolId: school.id.toString(), schoolYear: 2022 },
            });
            let dataSchoolYear2023 = await this.repositorySchoolYear.findBy({
                where: { schoolId: school.id.toString(), schoolYear: 2023 },
            });
            let schoolId = school.id.toString();
            console.log('dataSchoolYear2022', dataSchoolYear2022[0].id.toString());
            console.log('dataSchoolYear2023', dataSchoolYear2023[0].id.toString());
            if ((dataSchoolYear2022 === null || dataSchoolYear2022 === void 0 ? void 0 : dataSchoolYear2022.length) > 0 && dataSchoolYear2023.length > 0) {
                let dataOldGradeAssigments = await this.repositoryGradeAssignment.findBy({
                    where: { schoolId: schoolId, schoolYearId: dataSchoolYear2022[0].id.toString() },
                });
                console.log('Actualizando IE: ', school === null || school === void 0 ? void 0 : school.name);
                console.log('DANE IE: ', school === null || school === void 0 ? void 0 : school.daneCode);
                console.log('Data OLD Grade Assigments: ', dataOldGradeAssigments === null || dataOldGradeAssigments === void 0 ? void 0 : dataOldGradeAssigments.length);
                for (let oldGradeAssigment of dataOldGradeAssigments) {
                    let oldAcademicGrade = await this.repositoryAcademicGrade.findOneBy(oldGradeAssigment.academicGradeId);
                    let oldAcademicAsignature = await this.repositoryAcademicAsignature.findOneBy(oldGradeAssigment.academicAsignatureId);
                    console.log('oldAcademicGrade', (_a = oldAcademicGrade === null || oldAcademicGrade === void 0 ? void 0 : oldAcademicGrade.id) === null || _a === void 0 ? void 0 : _a.toString());
                    console.log('oldAcademicAsignature', (_b = oldAcademicAsignature === null || oldAcademicAsignature === void 0 ? void 0 : oldAcademicAsignature.id) === null || _b === void 0 ? void 0 : _b.toString());
                    if (oldAcademicGrade && oldAcademicAsignature) {
                        let newAcademicGrade = await this.repositoryAcademicGrade.findBy({
                            where: {
                                schoolId: schoolId,
                                schoolYearId: dataSchoolYear2023[0].id.toString(),
                                generalAcademicGradeId: oldAcademicGrade === null || oldAcademicGrade === void 0 ? void 0 : oldAcademicGrade.generalAcademicGradeId,
                                name: oldAcademicGrade === null || oldAcademicGrade === void 0 ? void 0 : oldAcademicGrade.name,
                            },
                        });
                        let newAcademicAsignature = await this.repositoryAcademicAsignature.findBy({
                            where: {
                                schoolId: schoolId,
                                schoolYearId: dataSchoolYear2023[0].id.toString(),
                                name: oldAcademicAsignature === null || oldAcademicAsignature === void 0 ? void 0 : oldAcademicAsignature.name,
                            },
                        });
                        console.log('newAcademicGrade', newAcademicGrade[0].id.toString());
                        console.log('newAcademicAsignature', newAcademicAsignature[0].id.toString());
                        if ((newAcademicGrade === null || newAcademicGrade === void 0 ? void 0 : newAcademicGrade.length) > 0 && newAcademicAsignature.length > 0) {
                            const modelNewGradeAssigment = await this.repositoryGradeAssignment.create({
                                academicGradeId: newAcademicGrade[0].id.toString(),
                                academicAsignatureId: newAcademicAsignature[0].id.toString(),
                                minHourlyIntensity: oldGradeAssigment.minHourlyIntensity,
                                maxHourlyIntensity: oldGradeAssigment.maxHourlyIntensity,
                                schoolId: school.id.toString(),
                                schoolYearId: dataSchoolYear2023[0].id.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultNewGradeAssigment = await this.repositoryGradeAssignment.save(modelNewGradeAssigment);
                            let courses = await this.repositoryCourse.findBy({
                                where: {
                                    academicGradeId: resultNewGradeAssigment === null || resultNewGradeAssigment === void 0 ? void 0 : resultNewGradeAssigment.academicGradeId,
                                    schoolYearId: resultNewGradeAssigment === null || resultNewGradeAssigment === void 0 ? void 0 : resultNewGradeAssigment.schoolYearId,
                                },
                            });
                            if (courses) {
                                for (let course of courses) {
                                    let repositoryAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findBy({
                                        where: {
                                            academicAsignatureId: resultNewGradeAssigment === null || resultNewGradeAssigment === void 0 ? void 0 : resultNewGradeAssigment.academicAsignatureId,
                                            courseId: course === null || course === void 0 ? void 0 : course.id.toString(),
                                            schoolYearId: resultNewGradeAssigment === null || resultNewGradeAssigment === void 0 ? void 0 : resultNewGradeAssigment.schoolYearId,
                                        },
                                    });
                                    if (repositoryAcademicAsignatureCourse.length === 0) {
                                        const modelAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.create({
                                            hourlyIntensity: resultNewGradeAssigment === null || resultNewGradeAssigment === void 0 ? void 0 : resultNewGradeAssigment.minHourlyIntensity,
                                            academicAsignatureId: resultNewGradeAssigment === null || resultNewGradeAssigment === void 0 ? void 0 : resultNewGradeAssigment.academicAsignatureId,
                                            courseId: course === null || course === void 0 ? void 0 : course.id.toString(),
                                            gradeAssignmentId: resultNewGradeAssigment === null || resultNewGradeAssigment === void 0 ? void 0 : resultNewGradeAssigment.id.toString(),
                                            schoolYearId: resultNewGradeAssigment === null || resultNewGradeAssigment === void 0 ? void 0 : resultNewGradeAssigment.schoolYearId,
                                            active: true,
                                            version: 0,
                                        });
                                        let resultAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.save(modelAcademicAsignatureCourse);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async fixAcademicAsignatureCourseSchoolYear() {
        var _a;
        let dataSchoolDane = [
            '254385000431',
        ];
        let dataSchool = await this.repositorySchool.findBy({
            where: { daneCode: { $in: dataSchoolDane } },
        });
        for (let school of dataSchool) {
            console.log('Actualizando IE: ', school === null || school === void 0 ? void 0 : school.name);
            console.log('DANE IE: ', school === null || school === void 0 ? void 0 : school.daneCode);
            let dataSchoolYear2023 = await this.repositorySchoolYear.findBy({
                where: { schoolId: school.id.toString(), schoolYear: 2023 },
            });
            if (dataSchool && dataSchoolYear2023) {
                let schoolId = school.id.toString();
                let schoolYearId = dataSchoolYear2023[0].id.toString();
                let dataCourses = await this.repositoryCourse.findBy({
                    where: { schoolId: schoolId, schoolYearId: schoolYearId },
                });
                for (let course of dataCourses) {
                    let dataAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findBy({
                        courseId: course.id.toString(),
                    });
                    for (let academicAsignatureCourse of dataAcademicAsignatureCourse) {
                        if (academicAsignatureCourse.schoolId == undefined ||
                            academicAsignatureCourse.schoolId == null ||
                            academicAsignatureCourse.schoolYearId == undefined ||
                            academicAsignatureCourse.schoolYearId == null) {
                            let resultAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_a = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.id) === null || _a === void 0 ? void 0 : _a.toString()) }, academicAsignatureCourse), { schoolId: course.schoolId, schoolYearId: course.schoolYearId, version: (academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.version) + 1 }));
                        }
                    }
                }
            }
        }
        return true;
    }
    async updateSchoolYearAllTeacher() {
        var _a, _b;
        let schools = await this.repositorySchool.find();
        for (let school of schools) {
            console.log('Actualizando IE: ', school === null || school === void 0 ? void 0 : school.name);
            console.log('DANE IE: ', school === null || school === void 0 ? void 0 : school.daneCode);
            let schoolYearId = '';
            console.log('Activate Teachers');
            let dataSchoolYear2022 = await this.repositorySchoolYear.findBy({
                where: { schoolId: school.id.toString(), schoolYear: 2022 },
            });
            let dataSchoolYear2023 = await this.repositorySchoolYear.findBy({
                where: { schoolId: school.id.toString(), schoolYear: 2023 },
            });
            if ((dataSchoolYear2023 === null || dataSchoolYear2023 === void 0 ? void 0 : dataSchoolYear2023.length) > 0) {
                schoolYearId = dataSchoolYear2023[0].id.toString();
            }
            else {
                if ((dataSchoolYear2022 === null || dataSchoolYear2022 === void 0 ? void 0 : dataSchoolYear2022.length) > 0) {
                    schoolYearId = dataSchoolYear2022[0].id.toString();
                }
            }
            console.log('SchoolYearId: ', schoolYearId);
            let dataTeacher = await this.repositoryTeacher.findBy({
                where: { schoolId: { $in: [(_a = school === null || school === void 0 ? void 0 : school.id) === null || _a === void 0 ? void 0 : _a.toString()] } },
            });
            console.log('Teacher: ', dataTeacher === null || dataTeacher === void 0 ? void 0 : dataTeacher.length);
            for (let teacher of dataTeacher) {
                let resultTeacher = await this.repositoryTeacher.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_b = teacher === null || teacher === void 0 ? void 0 : teacher.id) === null || _b === void 0 ? void 0 : _b.toString()) }, teacher), { schoolYearId: schoolYearId, version: (teacher === null || teacher === void 0 ? void 0 : teacher.version) + 1 }));
            }
        }
        return true;
    }
    async fixAcademicAsignatureCourseSchoolSchoolYear2023() {
        var _a, _b, _c, _d, _e, _f;
        let dataSchoolDane = [
            '154680000015',
        ];
        let dataSchool = await this.repositorySchool.findBy({
            where: { daneCode: { $in: dataSchoolDane } },
        });
        for (let school of dataSchool) {
            console.log('Actualizando IE: ', school === null || school === void 0 ? void 0 : school.name);
            console.log('DANE IE: ', school === null || school === void 0 ? void 0 : school.daneCode);
            let dataSchoolYear2023 = await this.repositorySchoolYear.findBy({
                where: { schoolId: school.id.toString(), schoolYear: 2023 },
            });
            if (dataSchool && dataSchoolYear2023) {
                let schoolId = school.id.toString();
                let schoolYearId = dataSchoolYear2023[0].id.toString();
                if (schoolYearId) {
                    let dataAcademicGrades = await this.repositoryAcademicGrade.findBy({
                        where: { schoolId: school.id.toString(), schoolYearId: schoolYearId },
                    });
                    for (let academicGrade of dataAcademicGrades) {
                        console.log('Academic Grade: ', academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.name);
                        let dataCourses = await this.repositoryCourse.findBy({
                            where: {
                                academicGradeId: (_a = academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.id) === null || _a === void 0 ? void 0 : _a.toString(),
                                schoolId: school.id.toString(),
                                schoolYearId: schoolYearId,
                            },
                        });
                        for (let course of dataCourses) {
                            console.log('Academic Course: ', course === null || course === void 0 ? void 0 : course.name);
                            let dataAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findBy({
                                courseId: course.id.toString(),
                                schoolYearId: schoolYearId,
                            });
                            for (let academicAsignatureCourse of dataAcademicAsignatureCourse) {
                                let dataGradeAssigment = await this.repositoryGradeAssignment.findOneBy(academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.gradeAssignmentId);
                                if (dataGradeAssigment) {
                                    let dataAcademicAsignature = await this.repositoryAcademicAsignature.findOneBy(dataGradeAssigment === null || dataGradeAssigment === void 0 ? void 0 : dataGradeAssigment.academicAsignatureId);
                                    if (dataAcademicAsignature) {
                                        console.log('Academic Asignature: ', dataAcademicAsignature === null || dataAcademicAsignature === void 0 ? void 0 : dataAcademicAsignature.name);
                                        let dataAcademicArea = await this.repositoryAcademicArea.findOneBy(dataAcademicAsignature === null || dataAcademicAsignature === void 0 ? void 0 : dataAcademicAsignature.academicAreaId);
                                        if (dataAcademicArea) {
                                            console.log('Academic Area: ', dataAcademicArea === null || dataAcademicArea === void 0 ? void 0 : dataAcademicArea.name);
                                            console.log('Existe el Area');
                                            if ((academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.academicAsignatureId) !==
                                                (dataGradeAssigment === null || dataGradeAssigment === void 0 ? void 0 : dataGradeAssigment.academicAsignatureId)) {
                                                let modelAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.create(Object.assign(Object.assign({}, academicAsignatureCourse), { academicAsignatureId: dataGradeAssigment === null || dataGradeAssigment === void 0 ? void 0 : dataGradeAssigment.academicAsignatureId, version: (academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.version) + 1 }));
                                                let resultAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.save(modelAcademicAsignatureCourse);
                                            }
                                        }
                                        else {
                                            console.log('No Existe el Area');
                                            let dataAcademicAsignatures = await this.repositoryAcademicAsignature.findBy({
                                                where: {
                                                    name: dataAcademicAsignature === null || dataAcademicAsignature === void 0 ? void 0 : dataAcademicAsignature.name,
                                                    schoolId: school.id.toString(),
                                                    schoolYearId: schoolYearId,
                                                },
                                            });
                                            let data = dataAcademicAsignatures.filter((academicAsignatureFilter) => {
                                                var _a, _b;
                                                if (((_a = academicAsignatureFilter === null || academicAsignatureFilter === void 0 ? void 0 : academicAsignatureFilter.id) === null || _a === void 0 ? void 0 : _a.toString()) !==
                                                    ((_b = dataAcademicAsignature === null || dataAcademicAsignature === void 0 ? void 0 : dataAcademicAsignature.id) === null || _b === void 0 ? void 0 : _b.toString())) {
                                                    return academicAsignatureFilter;
                                                }
                                            });
                                            if ((data === null || data === void 0 ? void 0 : data.length) == 1) {
                                                console.log('Nueva Asignatura', data === null || data === void 0 ? void 0 : data.length);
                                                dataAcademicArea = await this.repositoryAcademicArea.findOneBy((_b = data[0]) === null || _b === void 0 ? void 0 : _b.academicAreaId);
                                                if (dataAcademicArea) {
                                                    console.log('Existe el Area');
                                                    let modelGradeAssigment = await this.repositoryGradeAssignment.create(Object.assign(Object.assign({}, dataGradeAssigment), { academicAsignatureId: (_d = (_c = data[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString(), version: (dataGradeAssigment === null || dataGradeAssigment === void 0 ? void 0 : dataGradeAssigment.version) + 1 }));
                                                    console.log('modelGradeAssigmentOld', dataGradeAssigment);
                                                    console.log('modelGradeAssigment', modelGradeAssigment);
                                                    let resultGradeAssigment = await this.repositoryGradeAssignment.save(modelGradeAssigment);
                                                    let modelAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.create(Object.assign(Object.assign({}, academicAsignatureCourse), { academicAsignatureId: (_f = (_e = data[0]) === null || _e === void 0 ? void 0 : _e.id) === null || _f === void 0 ? void 0 : _f.toString(), version: (academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.version) + 1 }));
                                                    let resultAcademicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.save(modelAcademicAsignatureCourse);
                                                    console.log('modelAcademicAsignatureCourseOld', academicAsignatureCourse);
                                                    console.log('modelAcademicAsignatureCourse', modelAcademicAsignatureCourse);
                                                    console.log('************************************************************');
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        console.log('No Existe la asignatura');
                                    }
                                }
                                else {
                                    console.log('NO Existe la asignacion de grado');
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async fixAcademicAsignatureWithDeleteAcademicArea() {
        let dataSchoolDane = [
            '154680000015',
        ];
        let dataSchool = await this.repositorySchool.findBy({
            where: { daneCode: { $in: dataSchoolDane } },
        });
        for (let school of dataSchool) {
            console.log('Actualizando IE: ', school === null || school === void 0 ? void 0 : school.name);
            console.log('DANE IE: ', school === null || school === void 0 ? void 0 : school.daneCode);
            let dataSchoolYear2023 = await this.repositorySchoolYear.findBy({
                where: { schoolId: school.id.toString(), schoolYear: 2023 },
            });
            if (dataSchool && dataSchoolYear2023) {
                let schoolId = school.id.toString();
                let schoolYearId = dataSchoolYear2023[0].id.toString();
                if (schoolYearId) {
                    let dataAcademicAsignatures = await this.repositoryAcademicAsignature.findBy({
                        where: {
                            schoolId: school.id.toString(),
                            schoolYearId: schoolYearId,
                        },
                    });
                    for (let academicAsignature of dataAcademicAsignatures) {
                        let dataAcademicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature.academicAreaId);
                        if (!dataAcademicArea) {
                            let modelAcademicAsignature = await this.repositoryAcademicAsignature.create(Object.assign(Object.assign({}, academicAsignature), { active: false, version: (academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.version) + 1 }));
                            await this.repositoryAcademicAsignature.save(modelAcademicAsignature);
                        }
                        else {
                            let modelAcademicAsignature = await this.repositoryAcademicAsignature.create(Object.assign(Object.assign({}, academicAsignature), { schoolYearId: dataAcademicArea === null || dataAcademicArea === void 0 ? void 0 : dataAcademicArea.schoolYearId, version: (academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.version) + 1 }));
                            await this.repositoryAcademicAsignature.save(modelAcademicAsignature);
                        }
                    }
                }
            }
        }
        return true;
    }
};
exports.ImportDataSchoolResolver = ImportDataSchoolResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Specialty_1.Specialty),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicPeriod_1.AcademicPeriod),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryAcademicPeriod", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicDay_1.AcademicDay),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryAcademicDay", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EducationLevel_1.EducationLevel),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryEducationLevel", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PerformanceLevel_1.PerformanceLevel),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryPerformanceLevel", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvaluativeComponent_1.EvaluativeComponent),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryEvaluativeComponent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Modality_1.Modality),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryModality", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Specialty_1.Specialty),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositorySpecialty", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicArea_1.AcademicArea),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryAcademicArea", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolAdministrator_1.SchoolAdministrator),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositorySchoolAdministrator", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(CampusAdministrator_1.CampusAdministrator),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryCampusAdministrator", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GradeAssignment_1.GradeAssignment),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryGradeAssignment", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Teacher_1.Teacher),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryTeacher", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __metadata("design:type", Object)
], ImportDataSchoolResolver.prototype, "repositoryAcademicAsignatureCourse", void 0);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "updateWithDaneSchoolBulk", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "importDataSchoolInactive", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "updateGradeAssignmentSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "fixStudentCourseYearOld", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "updateDataSimat", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "importGradeAssignmentSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "fixAcademicAsignatureCourseSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "updateSchoolYearAllTeacher", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "fixAcademicAsignatureCourseSchoolSchoolYear2023", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImportDataSchoolResolver.prototype, "fixAcademicAsignatureWithDeleteAcademicArea", null);
exports.ImportDataSchoolResolver = ImportDataSchoolResolver = __decorate([
    (0, type_graphql_1.Resolver)(School_1.School)
], ImportDataSchoolResolver);
