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
exports.AverageAcademicPeriodCourseResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewAverageAcademicPeriodCourse_1 = require("../../inputs/CampusAdministrator/NewAverageAcademicPeriodCourse");
const AcademicDay_1 = require("../../models/CampusAdministrator/AcademicDay");
const AverageAcademicPeriodCourse_1 = require("../../models/CampusAdministrator/AverageAcademicPeriodCourse");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const User_1 = require("../../models/GeneralAdministrator/User");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let AverageAcademicPeriodCourseResolver = class AverageAcademicPeriodCourseResolver {
    constructor() {
        this.repository = DataSource_1.AverageAcademicPeriodCourseRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryAcademicDay = DataSource_1.AcademicDayRepository;
    }
    async getAverageAcademicPeriodCourse(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAverageAcademicPeriodCourse(args, allData, orderCreated, academicPeriodId, courseId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (courseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: { courseId, academicPeriodId },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (courseId) {
                        result = await this.repository.findBy({
                            where: { courseId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: { academicPeriodId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (courseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: { courseId, academicPeriodId },
                    });
                }
                else {
                    if (courseId) {
                        result = await this.repository.findBy({
                            where: { courseId },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: { academicPeriodId },
                        });
                    }
                }
            }
        }
        else {
            if (orderCreated) {
                if (courseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (courseId) {
                        result = await this.repository.findBy({
                            where: {
                                courseId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                academicPeriodId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            }
            else {
                if (courseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                            active: true,
                        },
                    });
                }
                else {
                    if (courseId) {
                        result = await this.repository.findBy({
                            where: {
                                courseId,
                                active: true,
                            },
                        });
                    }
                    else {
                        result = await this.repository.findBy({
                            where: {
                                academicPeriodId,
                                active: true,
                            },
                        });
                    }
                }
            }
        }
        let resultConn = new AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourseConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAverageAcademicPeriodCourse(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAverageAcademicPeriodCourse(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAverageAcademicPeriodCourse(active, id, context) {
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
    async deleteAverageAcademicPeriodCourse(id, context) {
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
};
exports.AverageAcademicPeriodCourseResolver = AverageAcademicPeriodCourseResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse),
    __metadata("design:type", Object)
], AverageAcademicPeriodCourseResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AverageAcademicPeriodCourseResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], AverageAcademicPeriodCourseResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicDay_1.AcademicDay),
    __metadata("design:type", Object)
], AverageAcademicPeriodCourseResolver.prototype, "repositoryAcademicDay", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "getAverageAcademicPeriodCourse", null);
__decorate([
    (0, type_graphql_1.Query)(() => AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourseConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('academicPeriodId', () => String, { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)('courseId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "getAllAverageAcademicPeriodCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAverageAcademicPeriodCourse_1.NewAverageAcademicPeriodCourse, Object]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "createAverageAcademicPeriodCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAverageAcademicPeriodCourse_1.NewAverageAcademicPeriodCourse, String, Object]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "updateAverageAcademicPeriodCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "changeActiveAverageAcademicPeriodCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "deleteAverageAcademicPeriodCourse", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse]),
    __metadata("design:returntype", Promise)
], AverageAcademicPeriodCourseResolver.prototype, "campus", null);
exports.AverageAcademicPeriodCourseResolver = AverageAcademicPeriodCourseResolver = __decorate([
    (0, type_graphql_1.Resolver)(AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse)
], AverageAcademicPeriodCourseResolver);
