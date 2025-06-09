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
exports.AcademicAreaCourseYearValuationResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewAcademicAreaCourseYearValuation_1 = require("../../inputs/CampusAdministrator/NewAcademicAreaCourseYearValuation");
const AcademicAreaCourseYearValuation_1 = require("../../models/CampusAdministrator/AcademicAreaCourseYearValuation");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicArea_1 = require("../../models/SchoolAdministrator/AcademicArea");
const PerformanceLevel_1 = require("../../models/SchoolAdministrator/PerformanceLevel");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let AcademicAreaCourseYearValuationResolver = class AcademicAreaCourseYearValuationResolver {
    constructor() {
        this.repository = DataSource_1.AcademicAreaCourseYearValuationRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicArea = DataSource_1.AcademicAreaRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.repositoryPerformanceLevel = DataSource_1.PerformanceLevelRepository;
    }
    async getAcademicAreaCourseYearValuation(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAcademicAreaCourseYearValuation(args, allData, orderCreated, academicAreaId, schoolYearId, studentId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (academicAreaId && schoolYearId && studentId) {
                    result = await this.repository.findBy({
                        where: {
                            academicAreaId,
                            schoolYearId,
                            studentId
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            academicAreaId,
                            schoolYearId,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (academicAreaId && schoolYearId && studentId) {
                    result = await this.repository.findBy({
                        where: {
                            academicAreaId,
                            schoolYearId,
                            studentId
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            academicAreaId,
                            schoolYearId,
                        },
                    });
                }
            }
        }
        else {
            if (orderCreated) {
                if (academicAreaId && schoolYearId && studentId) {
                    result = await this.repository.findBy({
                        where: {
                            academicAreaId,
                            schoolYearId,
                            studentId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            academicAreaId,
                            schoolYearId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (academicAreaId && schoolYearId && studentId) {
                    result = await this.repository.findBy({
                        where: {
                            academicAreaId,
                            schoolYearId,
                            studentId,
                            active: true,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            academicAreaId,
                            schoolYearId,
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuationConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicAreaCourseYearValuation(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAcademicAreaCourseYearValuation(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicAreaCourseYearValuation(active, id, context) {
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
    async deleteAcademicAreaCourseYearValuation(id, context) {
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
    async academicAsignatureCourse(data) {
        let id = data.academicAreaId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicArea.findOneBy(id);
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
    async student(data) {
        let id = data.studentId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryStudent.findOneBy(id);
            return result;
        }
        return null;
    }
    async performanceLevel(data) {
        let id = data.performanceLevelId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryPerformanceLevel.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.AcademicAreaCourseYearValuationResolver = AcademicAreaCourseYearValuationResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation),
    __metadata("design:type", Object)
], AcademicAreaCourseYearValuationResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicAreaCourseYearValuationResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], AcademicAreaCourseYearValuationResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicArea_1.AcademicArea),
    __metadata("design:type", Object)
], AcademicAreaCourseYearValuationResolver.prototype, "repositoryAcademicArea", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], AcademicAreaCourseYearValuationResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], AcademicAreaCourseYearValuationResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PerformanceLevel_1.PerformanceLevel),
    __metadata("design:type", Object)
], AcademicAreaCourseYearValuationResolver.prototype, "repositoryPerformanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "getAcademicAreaCourseYearValuation", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuationConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('academicAreaId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __param(5, (0, type_graphql_1.Arg)('studentId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "getAllAcademicAreaCourseYearValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicAreaCourseYearValuation_1.NewAcademicAreaCourseYearValuation, Object]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "createAcademicAreaCourseYearValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicAreaCourseYearValuation_1.NewAcademicAreaCourseYearValuation, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "updateAcademicAreaCourseYearValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "changeActiveAcademicAreaCourseYearValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "deleteAcademicAreaCourseYearValuation", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicArea_1.AcademicArea, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "academicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "schoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Student_1.Student, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "student", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation]),
    __metadata("design:returntype", Promise)
], AcademicAreaCourseYearValuationResolver.prototype, "performanceLevel", null);
exports.AcademicAreaCourseYearValuationResolver = AcademicAreaCourseYearValuationResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation)
], AcademicAreaCourseYearValuationResolver);
