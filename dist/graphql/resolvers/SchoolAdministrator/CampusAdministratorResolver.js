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
exports.CampusAdministratorResolver = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewCampusAdministrator_1 = require("../../inputs/SchoolAdministrator/NewCampusAdministrator");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const CampusAdministrator_1 = require("../../models/SchoolAdministrator/CampusAdministrator");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const BCRYPT_SALT_ROUNDS = 12;
let CampusAdministratorResolver = class CampusAdministratorResolver {
    constructor() {
        this.repository = DataSource_1.CampusAdministratorRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
    }
    async getCampusAdministrator(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllCampusAdministrator(args, allData, orderCreated, schoolId) {
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
        let resultConn = new CampusAdministrator_1.CampusAdministratorConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createCampusAdministrator(data, context) {
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
    async createAllInitialsCampusAdministrators() {
        let campus = await this.repositoryCampus.find();
        for (let campu of campus) {
            let campusAdministrators = await this.repository.findBy({
                active: true,
                campusId: { $in: [campu.id.toString()] },
            });
            if (campusAdministrators.length < 1) {
                let passwordHash = await bcrypt_1.default
                    .hash(campu.consecutive ? campu.consecutive : 'VIVE2022', BCRYPT_SALT_ROUNDS)
                    .then(function (hashedPassword) {
                    return hashedPassword;
                });
                const modelUser = await this.repositoryUser.create({
                    name: 'Admin',
                    lastName: campu.name,
                    username: campu.consecutive,
                    password: passwordHash,
                    roleId: '61955190882a2fb6525a3075',
                    active: true,
                    version: 0,
                });
                let resultUser = await this.repositoryUser.save(modelUser);
                const model = await this.repository.create({
                    schoolId: [campu.schoolId ? campu.schoolId : ''],
                    campusId: [campu.id.toString()],
                    userId: resultUser.id.toString(),
                    active: true,
                    version: 0,
                });
                let result = await this.repository.save(model);
            }
        }
        return true;
    }
    async updateCampusAdministrator(data, id, context) {
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
    async changeActiveCampusAdministrator(active, id, context) {
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
    async deleteCampusAdministrator(id, context) {
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
            const result = await this.repositoryCampus.findBy({ where: { _id: { $in: id } } });
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
exports.CampusAdministratorResolver = CampusAdministratorResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(CampusAdministrator_1.CampusAdministrator),
    __metadata("design:type", Object)
], CampusAdministratorResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], CampusAdministratorResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], CampusAdministratorResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], CampusAdministratorResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => CampusAdministrator_1.CampusAdministrator, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "getCampusAdministrator", null);
__decorate([
    (0, type_graphql_1.Query)(() => CampusAdministrator_1.CampusAdministratorConnection),
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
], CampusAdministratorResolver.prototype, "getAllCampusAdministrator", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => CampusAdministrator_1.CampusAdministrator),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewCampusAdministrator_1.NewCampusAdministrator, Object]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "createCampusAdministrator", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "createAllInitialsCampusAdministrators", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => CampusAdministrator_1.CampusAdministrator),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewCampusAdministrator_1.NewCampusAdministrator, String, Object]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "updateCampusAdministrator", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "changeActiveCampusAdministrator", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "deleteCampusAdministrator", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CampusAdministrator_1.CampusAdministrator]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CampusAdministrator_1.CampusAdministrator]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CampusAdministrator_1.CampusAdministrator]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CampusAdministrator_1.CampusAdministrator]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CampusAdministrator_1.CampusAdministrator]),
    __metadata("design:returntype", Promise)
], CampusAdministratorResolver.prototype, "user", null);
exports.CampusAdministratorResolver = CampusAdministratorResolver = __decorate([
    (0, type_graphql_1.Resolver)(CampusAdministrator_1.CampusAdministrator)
], CampusAdministratorResolver);
