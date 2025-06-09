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
exports.SchoolAdministrativeResolver = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewSchoolAdministrative_1 = require("../../inputs/GeneralAdministrator/NewSchoolAdministrative");
const PlantaDocente_1 = require("../../models/Data/PlantaDocente");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const SchoolAdministrative_1 = require("../../models/GeneralAdministrator/SchoolAdministrative");
const User_1 = require("../../models/GeneralAdministrator/User");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const BCRYPT_SALT_ROUNDS = 12;
let SchoolAdministrativeResolver = class SchoolAdministrativeResolver {
    constructor() {
        this.repository = DataSource_1.SchoolAdministrativeRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryPlantaDocente = DataSource_1.PlantaDocenteRepository;
    }
    async getSchoolAdministrative(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllSchoolAdministrative(args, allData, orderCreated, schoolId) {
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
        let resultConn = new SchoolAdministrative_1.SchoolAdministrativeConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createSchoolAdministrative(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let dataUserProcess = (0, types_1.removeEmptyStringElements)(dataProcess.newUser);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        delete dataProcess.newUser;
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
    async createAllInitialsSchoolAdministratives() {
        var _a;
        let schools = await this.repositorySchool.find();
        let count = 0;
        for (let school of schools) {
            let data = await this.repositoryPlantaDocente.findBy({
                where: { school_id: school.id.toString(), procesado: null },
            });
            for (let administrativo of data) {
                if (administrativo.documento &&
                    administrativo.school_id &&
                    administrativo.cargo !== 'Docente') {
                    if (administrativo.documento.length > 1 && administrativo.school_id.length > 1) {
                        let user = await this.repositoryUser.findBy({
                            username: administrativo.documento,
                        });
                        if (user.length === 0) {
                            let campus = await this.repositoryCampus.findBy({
                                where: { consecutive: administrativo.sede_dane },
                            });
                            let campusId = null;
                            if (campus.length === 1) {
                                campusId = campus[0].id.toString();
                            }
                            let passwordHash = await bcrypt_1.default
                                .hash(administrativo.documento ? administrativo.documento : 'VIVE2022', BCRYPT_SALT_ROUNDS)
                                .then(function (hashedPassword) {
                                return hashedPassword;
                            });
                            let fechaNacimiento = (_a = administrativo.fechanacimiento) === null || _a === void 0 ? void 0 : _a.split('/');
                            const modelUser = await this.repositoryUser.create({
                                name: administrativo.empleado,
                                lastName: '',
                                username: administrativo.documento,
                                password: passwordHash,
                                documentNumber: administrativo.documento,
                                documentTypeId: '60cfc792445f133f9e261eae',
                                genderId: administrativo.sexo == 'F'
                                    ? '60cfc51e445f133f9e261ead'
                                    : '60ecc36d6c716a21bee51e00',
                                birthdate: fechaNacimiento
                                    ? new Date(Number(fechaNacimiento[2]), Number(fechaNacimiento[1]) - 1, Number(fechaNacimiento[0]))
                                    : undefined,
                                phone: administrativo.telefono,
                                email: administrativo.email,
                                roleId: '619551da882a2fb6525a3079',
                                active: true,
                                version: 0,
                            });
                            let resultUser = await this.repositoryUser.save(modelUser);
                            const model = await this.repository.create({
                                schoolId: [school.id.toString()],
                                campusId: campusId !== null ? [campusId] : [],
                                userId: resultUser.id.toString(),
                                active: true,
                                version: 0,
                            });
                            let result = await this.repository.save(model);
                            count += 1;
                            console.log(count);
                        }
                        else {
                            for (let use of user) {
                                await this.repositoryUser.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(use.id.toString()) }, use), { documentNumber: use.username, version: (use === null || use === void 0 ? void 0 : use.version) + 1 }));
                            }
                            const model = await this.repositoryPlantaDocente.create(Object.assign(Object.assign({}, administrativo), { procesado: true }));
                            count += 1;
                            let result = await this.repositoryPlantaDocente.save(model);
                        }
                    }
                }
            }
        }
        return true;
    }
    async updateSchoolAdministrative(data, id, context) {
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
    async changeActiveSchoolAdministrative(active, id, context) {
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
    async deleteSchoolAdministrative(id, context) {
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
            const result = await this.repositorySchool.findBy({ where: { _id: { $in: id } } });
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
};
exports.SchoolAdministrativeResolver = SchoolAdministrativeResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolAdministrative_1.SchoolAdministrative),
    __metadata("design:type", Object)
], SchoolAdministrativeResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], SchoolAdministrativeResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], SchoolAdministrativeResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], SchoolAdministrativeResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PlantaDocente_1.PlantaDocente),
    __metadata("design:type", Object)
], SchoolAdministrativeResolver.prototype, "repositoryPlantaDocente", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => SchoolAdministrative_1.SchoolAdministrative, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "getSchoolAdministrative", null);
__decorate([
    (0, type_graphql_1.Query)(() => SchoolAdministrative_1.SchoolAdministrativeConnection),
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
], SchoolAdministrativeResolver.prototype, "getAllSchoolAdministrative", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SchoolAdministrative_1.SchoolAdministrative),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewSchoolAdministrative_1.NewSchoolAdministrative, Object]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "createSchoolAdministrative", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "createAllInitialsSchoolAdministratives", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SchoolAdministrative_1.SchoolAdministrative),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewSchoolAdministrative_1.NewSchoolAdministrative, String, Object]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "updateSchoolAdministrative", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "changeActiveSchoolAdministrative", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "deleteSchoolAdministrative", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolAdministrative_1.SchoolAdministrative]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolAdministrative_1.SchoolAdministrative]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolAdministrative_1.SchoolAdministrative]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SchoolAdministrative_1.SchoolAdministrative]),
    __metadata("design:returntype", Promise)
], SchoolAdministrativeResolver.prototype, "user", null);
exports.SchoolAdministrativeResolver = SchoolAdministrativeResolver = __decorate([
    (0, type_graphql_1.Resolver)(SchoolAdministrative_1.SchoolAdministrative)
], SchoolAdministrativeResolver);
