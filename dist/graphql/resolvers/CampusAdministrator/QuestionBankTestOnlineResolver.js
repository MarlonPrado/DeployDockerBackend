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
exports.QuestionBankTestOnlineResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewQuestionBankTestOnline_1 = require("../../inputs/CampusAdministrator/NewQuestionBankTestOnline");
const QuestionBankTestOnline_1 = require("../../models/CampusAdministrator/QuestionBankTestOnline");
const Teacher_1 = require("../../models/CampusAdministrator/Teacher");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let QuestionBankTestOnlineResolver = class QuestionBankTestOnlineResolver {
    constructor() {
        this.repository = DataSource_1.QuestionBankTestOnlineRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryTeacher = DataSource_1.TeacherRepository;
    }
    async getQuestionBankTestOnline(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllQuestionBankTestOnline(args, allData, orderCreated, campusId) {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        campusId
                    },
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.findBy({
                    where: {
                        campusId
                    },
                });
            }
        }
        else {
            if (orderCreated) {
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
                        campusId,
                        active: true,
                    },
                });
            }
        }
        let resultConn = new QuestionBankTestOnline_1.QuestionBankTestOnlineConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createQuestionBankTestOnline(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateQuestionBankTestOnline(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveQuestionBankTestOnline(active, id, context) {
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
    async deleteQuestionBankTestOnline(id, context) {
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
    async academicAsignature(data) {
        let id = data.academicAsignatureId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicAsignature.findOneBy(id);
            return result;
        }
        return null;
    }
    async academicGrade(data) {
        let id = data.academicAsignatureId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicGrade.findOneBy(id);
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
};
exports.QuestionBankTestOnlineResolver = QuestionBankTestOnlineResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(QuestionBankTestOnline_1.QuestionBankTestOnline),
    __metadata("design:type", Object)
], QuestionBankTestOnlineResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], QuestionBankTestOnlineResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], QuestionBankTestOnlineResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], QuestionBankTestOnlineResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], QuestionBankTestOnlineResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Teacher_1.Teacher),
    __metadata("design:type", Object)
], QuestionBankTestOnlineResolver.prototype, "repositoryTeacher", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => QuestionBankTestOnline_1.QuestionBankTestOnline, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "getQuestionBankTestOnline", null);
__decorate([
    (0, type_graphql_1.Query)(() => QuestionBankTestOnline_1.QuestionBankTestOnlineConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('campusId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "getAllQuestionBankTestOnline", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => QuestionBankTestOnline_1.QuestionBankTestOnline),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewQuestionBankTestOnline_1.NewQuestionBankTestOnline, Object]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "createQuestionBankTestOnline", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => QuestionBankTestOnline_1.QuestionBankTestOnline),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewQuestionBankTestOnline_1.NewQuestionBankTestOnline, String, Object]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "updateQuestionBankTestOnline", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "changeActiveQuestionBankTestOnline", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "deleteQuestionBankTestOnline", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuestionBankTestOnline_1.QuestionBankTestOnline]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuestionBankTestOnline_1.QuestionBankTestOnline]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuestionBankTestOnline_1.QuestionBankTestOnline]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicAsignature_1.AcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuestionBankTestOnline_1.QuestionBankTestOnline]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "academicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicGrade_1.AcademicGrade, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuestionBankTestOnline_1.QuestionBankTestOnline]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "academicGrade", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Teacher_1.Teacher, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QuestionBankTestOnline_1.QuestionBankTestOnline]),
    __metadata("design:returntype", Promise)
], QuestionBankTestOnlineResolver.prototype, "teacher", null);
exports.QuestionBankTestOnlineResolver = QuestionBankTestOnlineResolver = __decorate([
    (0, type_graphql_1.Resolver)(QuestionBankTestOnline_1.QuestionBankTestOnline)
], QuestionBankTestOnlineResolver);
