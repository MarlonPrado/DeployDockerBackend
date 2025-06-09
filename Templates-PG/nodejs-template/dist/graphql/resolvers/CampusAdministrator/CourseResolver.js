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
exports.CourseResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewCourse_1 = require("../../inputs/CampusAdministrator/NewCourse");
const AcademicAsignatureCourse_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourse");
const AcademicDay_1 = require("../../models/CampusAdministrator/AcademicDay");
const Course_1 = require("../../models/CampusAdministrator/Course");
const Teacher_1 = require("../../models/CampusAdministrator/Teacher");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Cursos_1 = require("./../../models/Data/Cursos");
const AcademicAsignatureCourseResolver_1 = require("./AcademicAsignatureCourseResolver");
let CourseResolver = class CourseResolver {
    constructor() {
        this.repository = DataSource_1.CourseRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.repositoryAcademicDay = DataSource_1.AcademicDayRepository;
        this.repositoryTeacher = DataSource_1.TeacherRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryCursos = DataSource_1.CursosRepository;
        this.repositoryAcademicAsignatureCourse = DataSource_1.AcademicAsignatureCourseRepository;
        this.academicAsignatureCourseResolver = new AcademicAsignatureCourseResolver_1.AcademicAsignatureCourseResolver();
    }
    async getCourse(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllCourse(args, allData, orderCreated, campusId, schoolId, academicGradeId) {
        let result;
        let campusDataIds = [];
        if (schoolId) {
            let campusData = [];
            if (allData) {
                campusData = await this.repositoryCampus.findBy({ schoolId });
            }
            else {
                campusData = await this.repositoryCampus.findBy({ schoolId, active: true });
            }
            campusData.forEach((campus) => {
                campusDataIds.push(campus.id.toString());
            });
        }
        else {
            campusDataIds.push(campusId);
        }
        if (allData) {
            if (orderCreated) {
                if (academicGradeId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: campusDataIds },
                            academicGradeId,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: campusDataIds },
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (academicGradeId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: campusDataIds },
                            academicGradeId,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: campusDataIds },
                        },
                    });
                }
            }
        }
        else {
            if (orderCreated) {
                if (academicGradeId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: campusDataIds },
                            academicGradeId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: campusDataIds },
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (academicGradeId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: campusDataIds },
                            academicGradeId,
                            active: true,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            campusId: { $in: campusDataIds },
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new Course_1.CourseConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllCourseTeacher(args, teacherId, schoolYearId) {
        let result = await this.repository.findBy({
            where: {
                teacherId,
                schoolYearId,
                active: true,
            },
            order: { createdAt: 'DESC' },
        });
        let resultConn = new Course_1.CourseConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createCourse(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateGradeAcademicDayAllInitialsCourse(schoolId, schoolYearId) {
        var _a, _b;
        let school = await this.repositorySchool.findOneBy(schoolId);
        let schoolYear = await this.repositorySchoolYear.findOneBy(schoolYearId);
        let count = 0;
        if (school && schoolYear) {
            let campus = await this.repositoryCampus.findBy({
                where: { schoolId: school.id.toString() },
            });
            for (let campu of campus) {
                let courses = await this.repository.findBy({
                    where: {
                        academicDayId: undefined,
                        campusId: campu.id.toString(),
                        schoolId: school.id.toString(),
                        schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                    },
                });
                for (let course of courses) {
                    let academicDay = await this.repositoryAcademicDay.findBy({
                        where: {
                            campusId: campu.id.toString(),
                            nameSIMAT: course.jornadaSIMAT,
                            active: true,
                            schoolId: school.id.toString(),
                            schoolYearId: (_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _b === void 0 ? void 0 : _b.toString(),
                        },
                    });
                    if (academicDay.length === 1) {
                        const result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(course.id.toString()) }, course), { academicDayId: academicDay[0].id.toString(), version: (course === null || course === void 0 ? void 0 : course.version) + 1 }));
                        count += 1;
                    }
                }
            }
        }
        return true;
    }
    async updateGradeAllInitialsCourse(schoolId, schoolYearId) {
        var _a, _b;
        let school = await this.repositorySchool.findOneBy(schoolId);
        let schoolYear = await this.repositorySchoolYear.findOneBy(schoolYearId);
        let count = 0;
        if (school && schoolYear) {
            let campus = await this.repositoryCampus.findBy({
                where: { schoolId: school.id.toString() },
            });
            for (let campu of campus) {
                let courses = await this.repository.findBy({
                    where: {
                        academicGradeId: undefined,
                        campusId: campu.id.toString(),
                        active: true,
                        schoolId: school.id.toString(),
                        schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                    },
                });
                for (let course of courses) {
                    let generalAcademicGradeId = '';
                    switch (course.gradoCodSIMAT) {
                        case '0':
                            generalAcademicGradeId = '627deedcb3635b55532fbd00';
                            break;
                        case '1':
                            generalAcademicGradeId = '6256093f78f3395f6ca958eb';
                            break;
                        case '2':
                            generalAcademicGradeId = '62560c9078f3395f6ca958f4';
                            break;
                        case '3':
                            generalAcademicGradeId = '62560c9678f3395f6ca958f5';
                            break;
                        case '4':
                            generalAcademicGradeId = '62560c9b78f3395f6ca958f6';
                            break;
                        case '5':
                            generalAcademicGradeId = '62560ca278f3395f6ca958f7';
                            break;
                        case '6':
                            generalAcademicGradeId = '627dee7eb3635b55532fbcfa';
                            break;
                        case '7':
                            generalAcademicGradeId = '627dee88b3635b55532fbcfb';
                            break;
                        case '8':
                            generalAcademicGradeId = '627dee90b3635b55532fbcfc';
                            break;
                        case '9':
                            generalAcademicGradeId = '627dee97b3635b55532fbcfd';
                            break;
                        case '10':
                            generalAcademicGradeId = '627deeb4b3635b55532fbcfe';
                            break;
                        case '11':
                            generalAcademicGradeId = '627deebcb3635b55532fbcff';
                            break;
                    }
                    let academicGrade = await this.repositoryAcademicGrade.findBy({
                        where: {
                            schoolId: school.id.toString(),
                            generalAcademicGradeId,
                            active: true,
                            schoolYearId: (_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _b === void 0 ? void 0 : _b.toString(),
                        },
                    });
                    if (academicGrade.length === 1) {
                        const result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(course.id.toString()) }, course), { academicGradeId: academicGrade[0].id.toString(), version: (course === null || course === void 0 ? void 0 : course.version) + 1 }));
                        count += 1;
                    }
                }
            }
        }
        return true;
    }
    async createAllInitialsCourse(schoolId, schoolYearId) {
        var _a, _b, _c;
        let school = await this.repositorySchool.findOneBy(schoolId);
        let schoolYear = await this.repositorySchoolYear.findOneBy(schoolYearId);
        let count = 0;
        if (school && schoolYear) {
            let data = await this.repositoryCursos.findBy({
                where: { dane: school.daneCode },
            });
            for (let curso of data) {
                if (curso.jornada && curso.consecutivo && curso.dane && curso.grado_cod && curso.grupo) {
                    if (curso.jornada.length > 1 &&
                        curso.consecutivo.length > 1 &&
                        curso.dane.length > 1 &&
                        curso.grado_cod.length > 0 &&
                        curso.grupo.length > 0) {
                        let campus = await this.repositoryCampus.findBy({
                            where: { consecutive: curso.consecutivo },
                        });
                        if (campus.length === 1) {
                            let course = await this.repository.findBy({
                                where: {
                                    campusId: campus[0].id.toString(),
                                    grupoSIMAT: curso.grupo,
                                    gradoCodSIMAT: curso.grado_cod,
                                    jornadaSIMAT: curso.jornada,
                                    schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                                },
                            });
                            if (course.length === 0) {
                                const model = await this.repository.create({
                                    name: curso.grupo,
                                    grupoSIMAT: curso.grupo,
                                    gradoCodSIMAT: curso.grado_cod,
                                    jornadaSIMAT: curso.jornada,
                                    campusId: campus[0].id.toString(),
                                    schoolId: school.id.toString(),
                                    schoolYearId: (_b = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _b === void 0 ? void 0 : _b.toString(),
                                    active: true,
                                    version: 0,
                                });
                                let result = await this.repository.save(model);
                                count += 1;
                            }
                            else {
                                let result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(course[0].id.toString()) }, course[0]), { schoolId: school.id.toString(), active: true, version: ((_c = course[0]) === null || _c === void 0 ? void 0 : _c.version) + 1 }));
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async updateStudentsAllInitialsCourse() {
        let schools = await this.repositorySchool.find();
        let count = 0;
        for (let school of schools) {
            let campus = await this.repositoryCampus.findBy({
                where: { schoolId: school.id.toString() },
            });
            for (let campu of campus) {
                let courses = await this.repository.findBy({
                    where: {
                        campusId: campu.id.toString(),
                    },
                });
                for (let course of courses) {
                    let students = await this.repositoryStudent.findBy({
                        where: {
                            courseId: course.id.toString(),
                        },
                    });
                    let studentsId = course === null || course === void 0 ? void 0 : course.studentsId;
                    if (studentsId == undefined || studentsId == null) {
                        studentsId = [];
                    }
                    for (let student of students) {
                        studentsId === null || studentsId === void 0 ? void 0 : studentsId.push(student.id.toString());
                    }
                    let resultCourse = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(course.id.toString()) }, course), { studentsId, version: (course === null || course === void 0 ? void 0 : course.version) + 1 }));
                    count += 1;
                }
            }
        }
    }
    async updateCodeStudentsAllCourses() {
        let schools = await this.repositorySchool.find();
        let count = 0;
        for (let school of schools) {
            let campus = await this.repositoryCampus.findBy({
                where: { schoolId: school.id.toString() },
            });
            for (let campu of campus) {
                let courses = await this.repository.findBy({
                    where: {
                        campusId: campu.id.toString(),
                    },
                });
                for (let course of courses) {
                    this.updateCodeStudentsCourse(course.id.toString());
                    count += 1;
                }
            }
        }
        return true;
    }
    async updateCodeStudentsCoursesAcademicGrade(id) {
        var _a;
        let count = 0;
        let academicGrade = await this.repositoryAcademicGrade.findOneBy(id);
        if (academicGrade && (academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.schoolId)) {
            console.log(academicGrade);
            let campus = await this.repositoryCampus.findBy({
                where: { schoolId: academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.schoolId.toString() },
            });
            for (let campu of campus) {
                let courses = await this.repository.findBy({
                    where: {
                        academicGradeId: (_a = academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.id) === null || _a === void 0 ? void 0 : _a.toString(),
                        campusId: campu.id.toString(),
                    },
                });
                for (let course of courses) {
                    console.log(count);
                    this.updateCodeStudentsCourse(course.id.toString());
                    count += 1;
                }
            }
            return true;
        }
    }
    async updateCodeStudentsCourse(id) {
        var _a, _b, _c, _d, _e;
        let course = await this.repository.findOneBy(id);
        if (course) {
            console.log(course);
            if (course.studentsId && course.studentsId.length > 0) {
                let studentsAux = course.studentsId;
                let studentsIds = [];
                for (let studentId of studentsAux) {
                    studentsIds === null || studentsIds === void 0 ? void 0 : studentsIds.push(new mongodb_1.ObjectId(studentId.toString()));
                }
                let students = await this.repositoryStudent.findBy({
                    where: { _id: { $in: studentsIds } },
                });
                let usersId = [];
                let studentsId = [];
                for (let student of students) {
                    if ((student === null || student === void 0 ? void 0 : student.courseId) == ((_a = course === null || course === void 0 ? void 0 : course.id) === null || _a === void 0 ? void 0 : _a.toString())) {
                        usersId === null || usersId === void 0 ? void 0 : usersId.push(new mongodb_1.ObjectId(student.userId));
                        studentsId === null || studentsId === void 0 ? void 0 : studentsId.push((_b = student === null || student === void 0 ? void 0 : student.id) === null || _b === void 0 ? void 0 : _b.toString());
                    }
                }
                let users = await this.repositoryUser.findBy({
                    where: { _id: { $in: usersId }, active: true },
                    order: { lastName: 'ASC' },
                });
                users = users.sort(function (a, b) {
                    return new Intl.Collator('es').compare('' + (a === null || a === void 0 ? void 0 : a.lastName) + ' ' + (a === null || a === void 0 ? void 0 : a.name), '' + (b === null || b === void 0 ? void 0 : b.lastName) + ' ' + (b === null || b === void 0 ? void 0 : b.name));
                });
                if (users && users.length > 0) {
                    let code = 1;
                    for (let user of users) {
                        let student = await this.repositoryStudent.findBy({
                            where: {
                                courseId: course.id.toString(),
                                userId: user.id.toString(),
                                active: true,
                                schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId,
                            },
                        });
                        if (student && student.length === 1) {
                            await this.repositoryStudent.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(student[0].id.toString()) }, student[0]), { code: code, version: ((_c = student[0]) === null || _c === void 0 ? void 0 : _c.version) + 1 }));
                            code += 1;
                        }
                        else {
                        }
                    }
                    await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, course), { studentsId: studentsId, version: (course === null || course === void 0 ? void 0 : course.version) + 1 }));
                }
            }
            else {
                let students = await this.repositoryStudent.findBy({
                    where: { courseId: id, active: true, schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId },
                });
                let usersId = [];
                let studentsId = [];
                for (let student of students) {
                    usersId === null || usersId === void 0 ? void 0 : usersId.push(new mongodb_1.ObjectId(student.userId));
                    studentsId === null || studentsId === void 0 ? void 0 : studentsId.push((_d = student.id) === null || _d === void 0 ? void 0 : _d.toString());
                }
                let users = await this.repositoryUser.findBy({
                    where: { _id: { $in: usersId }, active: true },
                    order: { lastName: 'ASC' },
                });
                if (users && users.length > 0) {
                    let code = 1;
                    for (let user of users) {
                        let student = await this.repositoryStudent.findBy({
                            where: {
                                courseId: course.id.toString(),
                                userId: user.id.toString(),
                                active: true,
                                schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId,
                            },
                        });
                        if (student && student.length === 1) {
                            await this.repositoryStudent.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(student[0].id.toString()) }, student[0]), { code: code, version: ((_e = student[0]) === null || _e === void 0 ? void 0 : _e.version) + 1 }));
                            code += 1;
                        }
                    }
                    this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, course), { studentsId: studentsId, version: (course === null || course === void 0 ? void 0 : course.version) + 1 }));
                }
            }
        }
        return true;
    }
    async updateCourse(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveCourse(active, id, context) {
        var _a, _b, _c;
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), { active: active, version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        if (!active) {
            const academicAsignatureCourses = await this.repositoryAcademicAsignatureCourse.findBy({
                where: { courseId: id },
            });
            for (let academicAsignatureCourse of academicAsignatureCourses) {
                await this.academicAsignatureCourseResolver.changeActiveAcademicAsignatureCourse(false, (_c = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.id) === null || _c === void 0 ? void 0 : _c.toString(), context);
            }
        }
        if (result.id) {
            return true;
        }
        else {
            return false;
        }
    }
    async importCourseSchoolYearId(schoolId, oldAcademicGradeId, newAcademicGradeId, newSchoolYearId) {
        var _a, _b, _c;
        let results = await this.repository.findBy({
            where: { schoolId, academicGradeId: oldAcademicGradeId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let academicDayNew;
            let academicDayOld = await this.repositoryAcademicDay.findOneBy(result === null || result === void 0 ? void 0 : result.academicDayId);
            if (academicDayOld) {
                academicDayNew = await this.repositoryAcademicDay.findBy({
                    where: { entityBaseId: result === null || result === void 0 ? void 0 : result.academicDayId, schoolYearId: newSchoolYearId },
                });
            }
            const model = await this.repository.create({
                academicGradeId: newAcademicGradeId === null || newAcademicGradeId === void 0 ? void 0 : newAcademicGradeId.toString(),
                academicDayId: (academicDayNew === null || academicDayNew === void 0 ? void 0 : academicDayNew.length) > 0 ? (_b = (_a = academicDayNew[0]) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString() : null,
                name: result.name,
                order: result.order,
                campusId: result.campusId,
                schoolId: result.schoolId,
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
    async fixAllCourseSchoolAndSchoolYear() {
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
    async fixImportCourseSchoolYearId(schoolYearId) {
        var _a;
        let results = await this.repository.findBy({
            where: { schoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let oldCourse = await this.repository.findOneBy(result === null || result === void 0 ? void 0 : result.entityBaseId);
            if (oldCourse) {
                let result2 = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString()) }, result), { campusId: oldCourse.campusId, schoolId: oldCourse.schoolId }));
            }
        }
        return true;
    }
    async deleteCourse(id, context) {
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
    async campus(data) {
        let id = data.campusId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryCampus.findOneBy(id);
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
    async academicDay(data) {
        let id = data.academicDayId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicDay.findOneBy(id);
            return result;
        }
        return null;
    }
    async students(data) {
        let ids = data.studentsId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryStudent.findBy({ where: { _id: { $in: dataIds } } });
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
        let id = data.academicGradeId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryStudent.findBy({
                where: {
                    courseId: (_a = data === null || data === void 0 ? void 0 : data.id) === null || _a === void 0 ? void 0 : _a.toString(),
                },
            });
            return result === null || result === void 0 ? void 0 : result.length;
        }
        return 0;
    }
};
exports.CourseResolver = CourseResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicDay_1.AcademicDay),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositoryAcademicDay", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Teacher_1.Teacher),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositoryTeacher", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Cursos_1.Cursos),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositoryCursos", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __metadata("design:type", Object)
], CourseResolver.prototype, "repositoryAcademicAsignatureCourse", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => Course_1.Course, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "getCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => Course_1.CourseConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('campusId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('schoolId', () => String, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('academicGradeId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "getAllCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => Course_1.CourseConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('teacherId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "getAllCourseTeacher", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Course_1.Course),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewCourse_1.NewCourse, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "createCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updateGradeAcademicDayAllInitialsCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updateGradeAllInitialsCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "createAllInitialsCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updateStudentsAllInitialsCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updateCodeStudentsAllCourses", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updateCodeStudentsCoursesAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updateCodeStudentsCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Course_1.Course),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewCourse_1.NewCourse, String, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updateCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "changeActiveCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldAcademicGradeId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newAcademicGradeId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "importCourseSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "fixAllCourseSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "fixImportCourseSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "deleteCourse", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicGrade_1.AcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "academicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicDay_1.AcademicDay, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "academicDay", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [Student_1.Student], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "students", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Teacher_1.Teacher, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "teacher", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "schoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Number, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Course_1.Course]),
    __metadata("design:returntype", Promise)
], CourseResolver.prototype, "countStudent", null);
exports.CourseResolver = CourseResolver = __decorate([
    (0, type_graphql_1.Resolver)(Course_1.Course)
], CourseResolver);
