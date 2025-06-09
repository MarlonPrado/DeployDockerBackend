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
exports.TeacherResolver = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewTeacher_1 = require("../../inputs/CampusAdministrator/NewTeacher");
const Teacher_1 = require("../../models/CampusAdministrator/Teacher");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const PlantaDocente_1 = require("./../../models/Data/PlantaDocente");
const BCRYPT_SALT_ROUNDS = 12;
let TeacherResolver = class TeacherResolver {
    constructor() {
        this.repository = DataSource_1.TeacherRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryPlantaDocente = DataSource_1.PlantaDocenteRepository;
    }
    async getTeacher(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllTeacher(args, allData, orderCreated, schoolId, campusId, schoolYearId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (campusId) {
                    result = await this.repository.findBy({
                        where: { schoolId: { $in: schoolId }, campusId: { $in: campusId }, schoolYearId },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: { schoolId: { $in: schoolId }, schoolYearId },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (campusId) {
                    result = await this.repository.findBy({
                        where: { schoolId: { $in: schoolId }, campusId: { $in: campusId }, schoolYearId },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: { schoolId: { $in: schoolId }, schoolYearId },
                    });
                }
            }
        }
        else {
            if (orderCreated) {
                if (campusId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId: { $in: schoolId },
                            campusId: { $in: campusId },
                            schoolYearId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            schoolId: { $in: schoolId },
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
                            schoolId: { $in: schoolId },
                            campusId: { $in: campusId },
                            schoolYearId,
                            active: true,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            schoolId: { $in: schoolId },
                            schoolYearId,
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new Teacher_1.TeacherConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createTeacher(data, context) {
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
            return new Teacher_1.Teacher();
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
    async createAllInitialsTeachers() {
        var _a, _b, _c, _d, _e, _f;
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
        let schools = await this.repositorySchool.findBy({
            where: { daneCode: { $in: dataSchoolCreate } },
        });
        let count = 0;
        for (let school of schools) {
            console.log('school', school);
            let schoolYear = await this.repositorySchoolYear.findBy({
                where: { schoolYear: 2024, schoolId: (_a = school === null || school === void 0 ? void 0 : school.id) === null || _a === void 0 ? void 0 : _a.toString(), active: true },
            });
            let data = await this.repositoryPlantaDocente.findBy({
                where: { school_id: school === null || school === void 0 ? void 0 : school.daneCode, procesado: null },
            });
            console.log('data', data === null || data === void 0 ? void 0 : data.length);
            console.log('schoolYear', schoolYear);
            if ((schoolYear === null || schoolYear === void 0 ? void 0 : schoolYear.length) == 1) {
                for (let docente of data) {
                    if (docente.documento &&
                        docente.school_id &&
                        docente.sede_dane &&
                        docente.cargo === 'Docente') {
                        if (docente.documento.length > 1 &&
                            docente.school_id.length > 1 &&
                            docente.sede_dane.length > 1) {
                            let user = await this.repositoryUser.findBy({
                                username: docente.documento,
                                active: true,
                            });
                            let campus = await this.repositoryCampus.findBy({
                                where: { consecutive: docente.sede_dane },
                            });
                            let resultUser = null;
                            if (user.length === 0) {
                                let passwordHash = await bcrypt_1.default
                                    .hash(docente.documento ? docente.documento : 'VIVE2022', BCRYPT_SALT_ROUNDS)
                                    .then(function (hashedPassword) {
                                    return hashedPassword;
                                });
                                let fechaNacimiento = (_b = docente.fechanacimiento) === null || _b === void 0 ? void 0 : _b.split('/');
                                const modelUser = await this.repositoryUser.create({
                                    name: docente.empleado,
                                    lastName: '',
                                    username: docente.documento,
                                    password: passwordHash,
                                    documentNumber: docente.documento,
                                    documentTypeId: '60cfc792445f133f9e261eae',
                                    genderId: docente.sexo == 'F' ? '60cfc51e445f133f9e261ead' : '60ecc36d6c716a21bee51e00',
                                    birthdate: fechaNacimiento
                                        ? new Date(Number(fechaNacimiento[2]), Number(fechaNacimiento[1]) - 1, Number(fechaNacimiento[0]))
                                        : undefined,
                                    phone: docente.telefono,
                                    email: docente.email,
                                    roleId: '619551da882a2fb6525a3079',
                                    active: true,
                                    version: 0,
                                });
                                resultUser = await this.repositoryUser.save(modelUser);
                            }
                            else {
                                resultUser = user[0];
                            }
                            let teacher = await this.repository.findBy({
                                userId: resultUser === null || resultUser === void 0 ? void 0 : resultUser.id.toString(),
                                schoolYearId: (_d = (_c = schoolYear[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString(),
                                active: true,
                            });
                            if ((teacher === null || teacher === void 0 ? void 0 : teacher.length) == 0) {
                                const model = await this.repository.create({
                                    schoolId: [school.id.toString()],
                                    campusId: campus.length === 1 ? [campus[0].id.toString()] : [],
                                    userId: resultUser === null || resultUser === void 0 ? void 0 : resultUser.id.toString(),
                                    schoolYearId: (_f = (_e = schoolYear[0]) === null || _e === void 0 ? void 0 : _e.id) === null || _f === void 0 ? void 0 : _f.toString(),
                                    active: true,
                                    version: 0,
                                });
                                let result = await this.repository.save(model);
                            }
                            const modelPlantaDocente = await this.repositoryPlantaDocente.create(Object.assign(Object.assign({}, docente), { procesado: true }));
                            count += 1;
                            let resultPLantaDocente = await this.repositoryPlantaDocente.save(modelPlantaDocente);
                            console.log('procesados ' + count);
                        }
                    }
                }
            }
        }
        return true;
    }
    async updateTeacher(data, id, context) {
        var _a, _b, _c, _d;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        let dataUserProcess = (0, types_1.removeEmptyStringElements)(dataProcess === null || dataProcess === void 0 ? void 0 : dataProcess.newUser);
        let resultUser = await this.repositoryUser.findOneBy((_c = result === null || result === void 0 ? void 0 : result.userId) === null || _c === void 0 ? void 0 : _c.toString());
        resultUser = await this.repositoryUser.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_d = result === null || result === void 0 ? void 0 : result.userId) === null || _d === void 0 ? void 0 : _d.toString()) }, resultUser), dataUserProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        dataProcess === null || dataProcess === void 0 ? true : delete dataProcess.newUser;
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveTeacher(active, id, context) {
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
    async importTeacherSchoolYearId(schoolId, oldSchoolYearId, newSchoolYearId) {
        var _a;
        let results = await this.repository.findBy({
            where: { schoolId, schoolYearId: oldSchoolYearId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            const model = await this.repository.create({
                attentionSchedule: result.attentionSchedule,
                userId: result.userId,
                campusId: result.campusId,
                schoolId: result.schoolId,
                createdByUserId: result.createdByUserId,
                updatedByUserId: result.updatedByUserId,
                active: result === null || result === void 0 ? void 0 : result.active,
                version: 0,
                schoolYearId: newSchoolYearId.toString(),
                entityBaseId: (_a = result === null || result === void 0 ? void 0 : result.id) === null || _a === void 0 ? void 0 : _a.toString(),
            });
            let resultSave = await this.repository.save(model);
        }
        return true;
    }
    async fixAllTeacherSchoolAndSchoolYear() {
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
    async deleteTeacher(id, context) {
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
    async user(data) {
        let id = data.userId;
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
};
exports.TeacherResolver = TeacherResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Teacher_1.Teacher),
    __metadata("design:type", Object)
], TeacherResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], TeacherResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], TeacherResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], TeacherResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], TeacherResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PlantaDocente_1.PlantaDocente),
    __metadata("design:type", Object)
], TeacherResolver.prototype, "repositoryPlantaDocente", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => Teacher_1.Teacher, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "getTeacher", null);
__decorate([
    (0, type_graphql_1.Query)(() => Teacher_1.TeacherConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => [String])),
    __param(4, (0, type_graphql_1.Arg)('campusId', () => [String], { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean, Array, Array, String]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "getAllTeacher", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Teacher_1.Teacher),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewTeacher_1.NewTeacher, Object]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "createTeacher", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "createAllInitialsTeachers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Teacher_1.Teacher),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewTeacher_1.NewTeacher, String, Object]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "updateTeacher", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "changeActiveTeacher", null);
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
], TeacherResolver.prototype, "importTeacherSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "fixAllTeacherSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "deleteTeacher", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Teacher_1.Teacher]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Teacher_1.Teacher]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Teacher_1.Teacher]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Teacher_1.Teacher]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Teacher_1.Teacher]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "schoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [Campus_1.Campus], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Teacher_1.Teacher]),
    __metadata("design:returntype", Promise)
], TeacherResolver.prototype, "campus", null);
exports.TeacherResolver = TeacherResolver = __decorate([
    (0, type_graphql_1.Resolver)(Teacher_1.Teacher)
], TeacherResolver);
