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
exports.StudentResolver = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewStudent_1 = require("../../inputs/GeneralAdministrator/NewStudent");
const AverageAcademicYearStudent_1 = require("../../models/CampusAdministrator/AverageAcademicYearStudent");
const Course_1 = require("../../models/CampusAdministrator/Course");
const Estudiantes_1 = require("../../models/Data/Estudiantes");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const GeneralAcademicGrade_1 = require("../../models/GeneralAdministrator/GeneralAcademicGrade");
const School_1 = require("../../models/GeneralAdministrator/School");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const CourseResolver_1 = require("../CampusAdministrator/CourseResolver");
const BCRYPT_SALT_ROUNDS = 12;
let StudentResolver = class StudentResolver {
    constructor() {
        this.repository = DataSource_1.StudentRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
        this.repositoryEstudiantes = DataSource_1.EstudiantesRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryAverageAcademicYearStudent = DataSource_1.AverageAcademicYearStudentRepository;
        this.repositoryGeneralAcademicGrade = DataSource_1.GeneralAcademicGradeRepository;
        this.courseResolver = new CourseResolver_1.CourseResolver();
    }
    async getStudent(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllStudent(args, allData, orderCreated, schoolId, campusId, schoolYearId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (campusId) {
                    result = await this.repository.findBy({
                        where: { schoolId, campusId, schoolYearId },
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
                if (campusId) {
                    result = await this.repository.findBy({
                        where: { schoolId, campusId, schoolYearId },
                    });
                }
                else {
                    result = await this.repository.findBy({ where: { schoolId, schoolYearId } });
                }
            }
        }
        else {
            if (orderCreated) {
                if (campusId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            campusId,
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
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (campusId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            campusId,
                            schoolYearId,
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
        let resultConn = new Student_1.StudentConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllStudentAcademicGradeIdWithoutCourse(args, schoolId, campusId, academicGradeId) {
        let result;
        result = await this.repository.findBy({
            where: {
                schoolId,
                campusId,
                academicGradeId,
                courseId: null,
                active: true,
            },
            order: { createdAt: 'DESC' },
        });
        let resultConn = new Student_1.StudentConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllStudentAcademicGrade(args, schoolId, campusId, academicGradeId, schoolYearId) {
        let result;
        if (campusId) {
            result = await this.repository.findBy({
                where: {
                    schoolId,
                    campusId,
                    academicGradeId,
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
                    academicGradeId,
                    schoolYearId,
                    active: true,
                },
                order: { createdAt: 'DESC' },
            });
        }
        let resultConn = new Student_1.StudentConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createStudent(data, context) {
        var _a, _b, _c, _d;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let dataUserProcess = (0, types_1.removeEmptyStringElements)(dataProcess.newUser);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        delete dataProcess.newUser;
        let user = await this.repositoryUser.findBy({ documentNumber: dataUserProcess.documentNumber });
        if (user.length > 0) {
            let teacher = await this.repository.findBy({
                userId: (_d = (_c = user[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString(),
                schoolYearId: dataProcess.schoolYearId,
            });
            if (teacher.length == 0) {
                const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { userId: user[0].id.toString(), active: true, version: 0, createdByUserId }));
                let result = await this.repository.save(model);
                return result;
            }
            return new Student_1.Student();
        }
        else {
            if (dataUserProcess.documentNumber != null) {
                let passwordHash = await bcrypt_1.default
                    .hash(dataUserProcess.documentNumber, BCRYPT_SALT_ROUNDS)
                    .then(function (hashedPassword) {
                    return hashedPassword;
                });
                dataUserProcess.password = passwordHash;
            }
            const modelUser = await this.repositoryUser.create(Object.assign(Object.assign({}, dataUserProcess), { username: dataUserProcess.documentNumber, active: true, version: 0, createdByUserId }));
            let resultUser = await this.repositoryUser.save(modelUser);
            const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { userId: resultUser.id.toString(), active: true, version: 0, createdByUserId }));
            let result = await this.repository.save(model);
            return result;
        }
    }
    async createAllInitialsStudents(schoolId, schoolYearId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let school = await this.repositorySchool.findOneBy(schoolId);
        let schoolYear = await this.repositorySchoolYear.findOneBy(schoolYearId);
        let count = 0;
        if (school && schoolYear) {
            let data = await this.repositoryEstudiantes.findBy({
                where: { dane: school.daneCode },
            });
            console.log('Step: SIMAT - Update Students - Count', data === null || data === void 0 ? void 0 : data.length);
            for (let estudiante of data) {
                if (estudiante.jornada &&
                    estudiante.consecutivo &&
                    estudiante.dane &&
                    estudiante.grado_cod &&
                    estudiante.grupo) {
                    if (estudiante.jornada.length > 1 &&
                        estudiante.consecutivo.length > 1 &&
                        estudiante.dane.length > 1 &&
                        estudiante.grado_cod.length > 0 &&
                        estudiante.grupo.length > 0) {
                        let user = await this.repositoryUser.findBy({ username: estudiante.doc });
                        let campus = await this.repositoryCampus.findBy({
                            where: { consecutive: estudiante.consecutivo },
                        });
                        if (campus.length === 1) {
                            let course = await this.repositoryCourse.findBy({
                                jornadaSIMAT: estudiante.jornada,
                                gradoCodSIMAT: estudiante.grado_cod,
                                grupoSIMAT: estudiante.grupo,
                                campusId: campus[0].id.toString(),
                                active: true,
                                schoolId: school.id.toString(),
                                schoolYearId: (_a = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _a === void 0 ? void 0 : _a.toString(),
                            });
                            let academicGradeId = undefined;
                            let courseId = undefined;
                            if (course.length === 1) {
                                academicGradeId = course[0].academicGradeId;
                                courseId = course[0].id.toString();
                            }
                            let documentTypeId = '';
                            switch (estudiante.tipodoc) {
                                case 'RC:REGISTRO CIVIL DE NACIMIENTO':
                                    documentTypeId = '629eb3e109a7e271df669986';
                                    break;
                                case 'NES:NÚMERO ESTABLECIDO POR LA SECRETARÍA':
                                    documentTypeId = '629eb3f909a7e271df669987';
                                    break;
                                case 'TI:TARJETA DE IDENTIDAD':
                                    documentTypeId = '61d5624837ab8e89c425f48a';
                                    break;
                                case 'CC:CÉDULA DE CIUDADANÍA':
                                    documentTypeId = '60cfc792445f133f9e261eae';
                                    break;
                                case 'CE:CÉDULA DE EXTRANJERÍA':
                                    documentTypeId = '629eb40a09a7e271df669988';
                                    break;
                                case 'NUIP:NÚMERO UNICO DE IDENTIFICACIÓN PERSONAL':
                                    documentTypeId = '629eb42a09a7e271df669989';
                                    break;
                                case 'PEP:PERMISO ESPECIAL DE PERMANENCIA':
                                    documentTypeId = '629eb51e09a7e271df66998e';
                                    break;
                                case 'PPT: PERMISO DE PROTECCIÃ¿N TEMPORAL':
                                    documentTypeId = '629eb44109a7e271df66998a';
                                    break;
                                case 'TMF: TARJETA DE MOVILIDAD FRONTERIZA':
                                    documentTypeId = '629eb45209a7e271df66998b';
                                    break;
                                case 'NIP:NÚMERO DE IDENTIFICACIÓN PERSONAL':
                                    documentTypeId = '629eb46609a7e271df66998c';
                                    break;
                                case 'VISA':
                                    documentTypeId = '629eb47009a7e271df66998d';
                                    break;
                            }
                            let passwordHash = await bcrypt_1.default
                                .hash(estudiante.doc ? estudiante.doc : 'VIVE2022', BCRYPT_SALT_ROUNDS)
                                .then(function (hashedPassword) {
                                return hashedPassword;
                            });
                            let fechaNacimiento = (_b = estudiante.fecha_nacimiento) === null || _b === void 0 ? void 0 : _b.split('/');
                            let name = (estudiante.nombre1 ? estudiante.nombre1 : '') + ' ';
                            name += estudiante.nombre2 ? estudiante.nombre2 : '';
                            let lastName = (estudiante.apellido1 ? estudiante.apellido1 : '') + ' ';
                            lastName += estudiante.apellido2 ? estudiante.apellido2 : '';
                            const modelUser = await this.repositoryUser.create({
                                name,
                                lastName,
                                username: estudiante.doc,
                                password: passwordHash,
                                documentTypeId,
                                documentNumber: estudiante.doc,
                                genderId: estudiante.genero == 'FEMENINO'
                                    ? '60cfc51e445f133f9e261ead'
                                    : '60ecc36d6c716a21bee51e00',
                                birthdate: fechaNacimiento
                                    ? new Date(Number(fechaNacimiento[2]), Number(fechaNacimiento[1]) - 1, Number(fechaNacimiento[0]))
                                    : undefined,
                                roleId: '619551d1882a2fb6525a3078',
                                schoolId: school.id.toString(),
                                active: true,
                                version: 0,
                            });
                            let resultUser = null;
                            if (user.length > 0) {
                                resultUser = await this.repositoryUser.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_d = (_c = user[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString()) }, user[0]), modelUser), { version: ((_e = user[0]) === null || _e === void 0 ? void 0 : _e.version) + 1 }));
                            }
                            else {
                                resultUser = await this.repositoryUser.save(modelUser);
                            }
                            let student = await this.repository.findBy({
                                userId: resultUser.id.toString(),
                                schoolId: { $in: [school.id.toString()] },
                                schoolYearId: (_f = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _f === void 0 ? void 0 : _f.toString(),
                            });
                            const model = await this.repository.create({
                                schoolId: [school.id.toString()],
                                campusId: [campus[0].id.toString()],
                                academicGradeId,
                                courseId,
                                userId: resultUser.id.toString(),
                                active: true,
                                version: 0,
                                schoolYearId: (_g = schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.id) === null || _g === void 0 ? void 0 : _g.toString(),
                            });
                            let result = null;
                            if (student.length > 0) {
                                result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_j = (_h = student[0]) === null || _h === void 0 ? void 0 : _h.id) === null || _j === void 0 ? void 0 : _j.toString()) }, student[0]), model), { version: ((_k = user[0]) === null || _k === void 0 ? void 0 : _k.version) + 1 }));
                            }
                            else {
                                result = await this.repository.save(model);
                            }
                            if (courseId != null && courseId != undefined) {
                                let course = await this.repositoryCourse.findOneBy(courseId);
                                let studentsId = course === null || course === void 0 ? void 0 : course.studentsId;
                                if (studentsId == undefined || studentsId == null) {
                                    studentsId = [];
                                }
                                studentsId === null || studentsId === void 0 ? void 0 : studentsId.push((_l = result === null || result === void 0 ? void 0 : result.id) === null || _l === void 0 ? void 0 : _l.toString());
                                let resultCourse = await this.repositoryCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(courseId) }, course), { studentsId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
                                this.courseResolver.updateCodeStudentsCourse(courseId + '');
                            }
                            count += 1;
                            const model2 = await this.repositoryEstudiantes.create(Object.assign(Object.assign({}, estudiante), { procesado: true }));
                            let result2 = await this.repositoryEstudiantes.save(model2);
                        }
                    }
                }
            }
        }
        return true;
    }
    async updateAllIStudentsName() {
        var _a, _b, _c;
        let schools = await this.repositorySchool.find();
        let count = 0;
        for (let school of schools) {
            if ((school === null || school === void 0 ? void 0 : school.daneCode) == '154680000015') {
                let data = await this.repositoryEstudiantes.findBy({
                    where: { dane: school.daneCode, procesado: null },
                });
                for (let estudiante of data) {
                    if (estudiante.jornada &&
                        estudiante.consecutivo &&
                        estudiante.dane &&
                        estudiante.grado_cod &&
                        estudiante.grupo) {
                        if (estudiante.jornada.length > 1 &&
                            estudiante.consecutivo.length > 1 &&
                            estudiante.dane.length > 1 &&
                            estudiante.grado_cod.length > 0 &&
                            estudiante.grupo.length > 0) {
                            let user = await this.repositoryUser.findBy({ username: estudiante.doc });
                            if (user.length == 1) {
                                let name = (estudiante.nombre1 ? estudiante.nombre1 : '') + ' ';
                                name += estudiante.nombre2 ? estudiante.nombre2 : '';
                                let lastName = (estudiante.apellido1 ? estudiante.apellido1 : '') + ' ';
                                lastName += estudiante.apellido2 ? estudiante.apellido2 : '';
                                console.log(name, lastName);
                                let resultUser = await this.repositoryUser.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_b = (_a = user[0]) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString()) }, user[0]), { name,
                                    lastName, version: ((_c = user[0]) === null || _c === void 0 ? void 0 : _c.version) + 1 }));
                                const model = await this.repositoryEstudiantes.create(Object.assign(Object.assign({}, estudiante), { procesado: true }));
                                let result = await this.repositoryEstudiantes.save(model);
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async updateStudent(data, id, context) {
        var _a, _b, _c, _d;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        let dataUserProcess = (0, types_1.removeEmptyStringElements)(dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.newUser);
        let resultUser = await this.repositoryUser.findOneBy((_c = result === null || result === void 0 ? void 0 : result.userId) === null || _c === void 0 ? void 0 : _c.toString());
        resultUser = await this.repositoryUser.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_d = result === null || result === void 0 ? void 0 : result.userId) === null || _d === void 0 ? void 0 : _d.toString()) }, resultUser), dataUserProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        dataProcess === null || dataProcess === void 0 ? true : delete dataProcess.newUser;
        console.log(data);
        let courseId = null;
        if (data.courseId) {
            if (data.courseId != (result === null || result === void 0 ? void 0 : result.courseId)) {
                courseId = data === null || data === void 0 ? void 0 : data.courseId;
                let course = await this.repositoryCourse.findOneBy(data.courseId);
                dataProcess.campusId = [course === null || course === void 0 ? void 0 : course.campusId];
                let studentsId = course === null || course === void 0 ? void 0 : course.studentsId;
                if (studentsId == undefined || studentsId == null) {
                    studentsId = [];
                }
                studentsId === null || studentsId === void 0 ? void 0 : studentsId.push(id);
                let resultCourse = await this.repositoryCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(data.courseId) }, course), { studentsId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
            }
        }
        else {
            if (result === null || result === void 0 ? void 0 : result.courseId) {
                let course = await this.repositoryCourse.findOneBy(result === null || result === void 0 ? void 0 : result.courseId);
                if (course && course != undefined) {
                    courseId = result === null || result === void 0 ? void 0 : result.courseId;
                    let studentsId = course === null || course === void 0 ? void 0 : course.studentsId;
                    if (studentsId == undefined || studentsId == null) {
                        studentsId = [];
                    }
                    studentsId = studentsId === null || studentsId === void 0 ? void 0 : studentsId.filter((student) => {
                        return student !== id;
                    });
                    let resultCourse = await this.repositoryCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(data.courseId) }, course), { studentsId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
                }
            }
        }
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        await this.courseResolver.updateCodeStudentsCourse(courseId + '');
        return result;
    }
    async changeActiveStudent(active, id, context) {
        var _a, _b, _c, _d;
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        let resultUser = await this.repositoryUser.findOneBy((_c = result === null || result === void 0 ? void 0 : result.userId) === null || _c === void 0 ? void 0 : _c.toString());
        resultUser = await this.repositoryUser.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_d = result === null || result === void 0 ? void 0 : result.userId) === null || _d === void 0 ? void 0 : _d.toString()) }, resultUser), { active: active, version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), { active: active, version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        if (result.id) {
            return true;
        }
        else {
            return false;
        }
    }
    async importStudentSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId, studentPromoted, studentNoPromoted) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        let dataAcademicGradeGeneral = await this.repositoryGeneralAcademicGrade.findBy({
            where: { active: true },
        });
        for (let academicGradeGeneral of dataAcademicGradeGeneral) {
            let academicGradeNext = [];
            let academicGradePrevious = [];
            let academicGradeCurrent = [];
            if (academicGradeGeneral === null || academicGradeGeneral === void 0 ? void 0 : academicGradeGeneral.nextGeneralAcademicGradeId) {
                academicGradeNext = await this.repositoryAcademicGrade.findBy({
                    where: {
                        generalAcademicGradeId: academicGradeGeneral === null || academicGradeGeneral === void 0 ? void 0 : academicGradeGeneral.nextGeneralAcademicGradeId,
                        schoolYearId: newSchoolYearId,
                    },
                });
            }
            if (academicGradeGeneral === null || academicGradeGeneral === void 0 ? void 0 : academicGradeGeneral.previousGeneralAcademicGradeId) {
                academicGradePrevious = await this.repositoryAcademicGrade.findBy({
                    where: {
                        generalAcademicGradeId: (_a = academicGradeGeneral === null || academicGradeGeneral === void 0 ? void 0 : academicGradeGeneral.id) === null || _a === void 0 ? void 0 : _a.toString(),
                        schoolYearId: oldSchoolYearId,
                    },
                });
            }
            if (academicGradeGeneral === null || academicGradeGeneral === void 0 ? void 0 : academicGradeGeneral.previousGeneralAcademicGradeId) {
                academicGradeCurrent = await this.repositoryAcademicGrade.findBy({
                    where: {
                        generalAcademicGradeId: (_b = academicGradeGeneral === null || academicGradeGeneral === void 0 ? void 0 : academicGradeGeneral.id) === null || _b === void 0 ? void 0 : _b.toString(),
                        schoolYearId: newSchoolYearId,
                    },
                });
            }
            if ((academicGradeNext === null || academicGradeNext === void 0 ? void 0 : academicGradeNext.length) > 0 &&
                (academicGradePrevious === null || academicGradePrevious === void 0 ? void 0 : academicGradePrevious.length) > 0 &&
                (academicGradeCurrent === null || academicGradeCurrent === void 0 ? void 0 : academicGradeCurrent.length) > 0) {
                let results = await this.repository.findBy({
                    where: {
                        schoolId,
                        schoolYearId: oldSchoolYearId,
                        academicGradeId: (_d = (_c = academicGradePrevious[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString(),
                    },
                });
                for (let result of results) {
                    let modelEntityBase = await this.repository.findBy({
                        where: {
                            entityBaseId: (_e = result === null || result === void 0 ? void 0 : result.id) === null || _e === void 0 ? void 0 : _e.toString(),
                            schoolYearId: newSchoolYearId.toString(),
                        },
                    });
                    if ((modelEntityBase === null || modelEntityBase === void 0 ? void 0 : modelEntityBase.length) < 1) {
                        let averageAcademicYearStudent = await this.repositoryAverageAcademicYearStudent.findBy({
                            where: { studentId: (_f = result === null || result === void 0 ? void 0 : result.id) === null || _f === void 0 ? void 0 : _f.toString(), schoolYearId: oldSchoolYearId },
                        });
                        if ((averageAcademicYearStudent === null || averageAcademicYearStudent === void 0 ? void 0 : averageAcademicYearStudent.length) > 0) {
                            if (studentPromoted && ((_g = averageAcademicYearStudent[0]) === null || _g === void 0 ? void 0 : _g.promoted) == true) {
                                const model = await this.repository.create({
                                    userId: result.userId,
                                    campusId: result.campusId,
                                    schoolId: result.schoolId,
                                    academicGradeId: (_j = (_h = academicGradeNext[0]) === null || _h === void 0 ? void 0 : _h.id) === null || _j === void 0 ? void 0 : _j.toString(),
                                    createdByUserId: result.createdByUserId,
                                    updatedByUserId: result.updatedByUserId,
                                    active: result === null || result === void 0 ? void 0 : result.active,
                                    version: 0,
                                    schoolYearId: newSchoolYearId.toString(),
                                    entityBaseId: (_k = result === null || result === void 0 ? void 0 : result.id) === null || _k === void 0 ? void 0 : _k.toString(),
                                });
                                let resultSave = await this.repository.save(model);
                            }
                            if (studentNoPromoted && ((_l = averageAcademicYearStudent[0]) === null || _l === void 0 ? void 0 : _l.promoted) == false) {
                                const model = await this.repository.create({
                                    userId: result.userId,
                                    campusId: result.campusId,
                                    schoolId: result.schoolId,
                                    academicGradeId: (_o = (_m = academicGradeCurrent[0]) === null || _m === void 0 ? void 0 : _m.id) === null || _o === void 0 ? void 0 : _o.toString(),
                                    createdByUserId: result.createdByUserId,
                                    updatedByUserId: result.updatedByUserId,
                                    active: result === null || result === void 0 ? void 0 : result.active,
                                    version: 0,
                                    schoolYearId: newSchoolYearId.toString(),
                                    entityBaseId: (_p = result === null || result === void 0 ? void 0 : result.id) === null || _p === void 0 ? void 0 : _p.toString(),
                                });
                                let resultSave = await this.repository.save(model);
                            }
                        }
                        else {
                            const model = await this.repository.create({
                                userId: result.userId,
                                campusId: result.campusId,
                                schoolId: result.schoolId,
                                academicGradeId: (_r = (_q = academicGradeNext[0]) === null || _q === void 0 ? void 0 : _q.id) === null || _r === void 0 ? void 0 : _r.toString(),
                                createdByUserId: result.createdByUserId,
                                updatedByUserId: result.updatedByUserId,
                                active: result === null || result === void 0 ? void 0 : result.active,
                                version: 0,
                                schoolYearId: newSchoolYearId.toString(),
                                entityBaseId: (_s = result === null || result === void 0 ? void 0 : result.id) === null || _s === void 0 ? void 0 : _s.toString(),
                            });
                            let resultSave = await this.repository.save(model);
                        }
                    }
                }
            }
        }
        return true;
    }
    async fixAllSudentSchoolAndSchoolYear() {
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
                    result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString()) }, result), { schoolId: [(schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.schoolId) + ''], version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
                }
            }
            else {
                if ((result === null || result === void 0 ? void 0 : result.schoolId) || (result === null || result === void 0 ? void 0 : result.campusId)) {
                    let schoolId;
                    if (result === null || result === void 0 ? void 0 : result.schoolId) {
                        let school = await this.repositorySchool.findOneBy(result === null || result === void 0 ? void 0 : result.schoolId[0]);
                        if (school) {
                            schoolId = (_b = school === null || school === void 0 ? void 0 : school.id) === null || _b === void 0 ? void 0 : _b.toString();
                        }
                    }
                    else {
                        if (result === null || result === void 0 ? void 0 : result.campusId) {
                            let campus = await this.repositoryCampus.findOneBy(result === null || result === void 0 ? void 0 : result.campusId[0]);
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
                            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_c = result === null || result === void 0 ? void 0 : result.id) === null || _c === void 0 ? void 0 : _c.toString()) }, result), { schoolId: [((_d = schoolYears[0]) === null || _d === void 0 ? void 0 : _d.schoolId) + ''], schoolYearId: (_f = (_e = schoolYears[0]) === null || _e === void 0 ? void 0 : _e.id) === null || _f === void 0 ? void 0 : _f.toString(), version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
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
                else {
                    console.log('school -: ', number);
                    result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_j = result === null || result === void 0 ? void 0 : result.id) === null || _j === void 0 ? void 0 : _j.toString()) }, result), { active: false, version: -1 }));
                }
            }
        }
        return true;
    }
    async deleteStudent(id, context) {
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
        let ids = data.schoolId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositorySchool.findBy({ where: { _id: { $in: dataIds } } });
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
    async user(data) {
        let id = data.userId;
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
    async course(data) {
        let id = data.courseId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryCourse.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.StudentResolver = StudentResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Estudiantes_1.Estudiantes),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositoryEstudiantes", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AverageAcademicYearStudent_1.AverageAcademicYearStudent),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositoryAverageAcademicYearStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicGrade_1.GeneralAcademicGrade),
    __metadata("design:type", Object)
], StudentResolver.prototype, "repositoryGeneralAcademicGrade", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => Student_1.Student, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "getStudent", null);
__decorate([
    (0, type_graphql_1.Query)(() => Student_1.StudentConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => String, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('campusId', () => String, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "getAllStudent", null);
__decorate([
    (0, type_graphql_1.Query)(() => Student_1.StudentConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('campusId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('academicGradeId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "getAllStudentAcademicGradeIdWithoutCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => Student_1.StudentConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('campusId', () => String, { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('academicGradeId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "getAllStudentAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Student_1.Student),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewStudent_1.NewStudent, Object]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "createStudent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "createAllInitialsStudents", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "updateAllIStudentsName", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Student_1.Student),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewStudent_1.NewStudent, String, Object]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "updateStudent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "changeActiveStudent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldSchoolYearId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('studentPromoted', () => Boolean)),
    __param(4, (0, type_graphql_1.Arg)('studentNoPromoted', () => Boolean)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String, Boolean, Boolean]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "importStudentSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "fixAllSudentSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "deleteStudent", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_1.Student]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_1.Student]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_1.Student]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [Campus_1.Campus], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_1.Student]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_1.Student]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicGrade_1.AcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_1.Student]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "academicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Course_1.Course, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Student_1.Student]),
    __metadata("design:returntype", Promise)
], StudentResolver.prototype, "course", null);
exports.StudentResolver = StudentResolver = __decorate([
    (0, type_graphql_1.Resolver)(Student_1.Student)
], StudentResolver);
