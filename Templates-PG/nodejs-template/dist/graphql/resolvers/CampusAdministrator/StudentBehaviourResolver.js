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
exports.StudentBehaviourResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewStudentBehaviour_1 = require("../../inputs/CampusAdministrator/NewStudentBehaviour");
const Course_1 = require("../../models/CampusAdministrator/Course");
const StudentBehaviour_1 = require("../../models/CampusAdministrator/StudentBehaviour");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicPeriod_1 = require("../../models/SchoolAdministrator/AcademicPeriod");
const PerformanceLevel_1 = require("../../models/SchoolAdministrator/PerformanceLevel");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let StudentBehaviourResolver = class StudentBehaviourResolver {
    constructor() {
        this.repository = DataSource_1.StudentBehaviourRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
        this.repositoryAcademicPeriod = DataSource_1.AcademicPeriodRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.repositoryPerformanceLevel = DataSource_1.PerformanceLevelRepository;
    }
    async getStudentBehaviour(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllStudentBehaviour(args, allData, orderCreated, courseId, academicPeriodId, studentId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (courseId && academicPeriodId && studentId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                            studentId
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (courseId && academicPeriodId && studentId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                            studentId
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                        },
                    });
                }
            }
        }
        else {
            if (orderCreated) {
                if (courseId && academicPeriodId && studentId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                            studentId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (courseId && academicPeriodId && studentId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                            studentId,
                            active: true,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            academicPeriodId,
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new StudentBehaviour_1.StudentBehaviourConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createStudentBehaviour(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateStudentBehaviour(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveStudentBehaviour(active, id, context) {
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
    async deleteStudentBehaviour(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async createPeriodStudentBehaviour(courseId, academicPeriodId, context) {
        var _a, _b;
        let course = await this.repositoryCourse.findOneBy(courseId);
        let academicPeriod = await this.repositoryAcademicPeriod.findOneBy(academicPeriodId);
        if (course && academicPeriod) {
            const students = course.studentsId;
            if (students) {
                for (let student of students) {
                    let studentBehaviour = await this.repository.findBy({
                        where: {
                            academicPeriodId,
                            courseId,
                            studentId: student,
                        },
                    });
                    if (studentBehaviour.length == 0) {
                        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
                        const model = await this.repository.create({
                            courseId,
                            academicPeriodId,
                            studentId: student,
                            active: true,
                            version: 0,
                            createdByUserId,
                        });
                        let result = await this.repository.save(model);
                    }
                }
            }
        }
        return true;
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
    async course(data) {
        let id = data.courseId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryCourse.findOneBy(id);
            return result;
        }
        return null;
    }
    async academicPeriod(data) {
        let id = data.academicPeriodId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicPeriod.findOneBy(id);
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
exports.StudentBehaviourResolver = StudentBehaviourResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(StudentBehaviour_1.StudentBehaviour),
    __metadata("design:type", Object)
], StudentBehaviourResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], StudentBehaviourResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], StudentBehaviourResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], StudentBehaviourResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicPeriod_1.AcademicPeriod),
    __metadata("design:type", Object)
], StudentBehaviourResolver.prototype, "repositoryAcademicPeriod", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], StudentBehaviourResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PerformanceLevel_1.PerformanceLevel),
    __metadata("design:type", Object)
], StudentBehaviourResolver.prototype, "repositoryPerformanceLevel", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => StudentBehaviour_1.StudentBehaviour, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "getStudentBehaviour", null);
__decorate([
    (0, type_graphql_1.Query)(() => StudentBehaviour_1.StudentBehaviourConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(5, (0, type_graphql_1.Arg)('studentId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "getAllStudentBehaviour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => StudentBehaviour_1.StudentBehaviour),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewStudentBehaviour_1.NewStudentBehaviour, Object]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "createStudentBehaviour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => StudentBehaviour_1.StudentBehaviour),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewStudentBehaviour_1.NewStudentBehaviour, String, Object]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "updateStudentBehaviour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "changeActiveStudentBehaviour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "deleteStudentBehaviour", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "createPeriodStudentBehaviour", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentBehaviour_1.StudentBehaviour]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentBehaviour_1.StudentBehaviour]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentBehaviour_1.StudentBehaviour]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Course_1.Course, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentBehaviour_1.StudentBehaviour]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "course", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicPeriod_1.AcademicPeriod, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentBehaviour_1.StudentBehaviour]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "academicPeriod", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Student_1.Student, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentBehaviour_1.StudentBehaviour]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "student", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => PerformanceLevel_1.PerformanceLevel, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentBehaviour_1.StudentBehaviour]),
    __metadata("design:returntype", Promise)
], StudentBehaviourResolver.prototype, "performanceLevel", null);
exports.StudentBehaviourResolver = StudentBehaviourResolver = __decorate([
    (0, type_graphql_1.Resolver)(StudentBehaviour_1.StudentBehaviour)
], StudentBehaviourResolver);
