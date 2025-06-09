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
exports.StudentObserverAnnotationResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewStudentObserverAnnotation_1 = require("../../inputs/CampusAdministrator/NewStudentObserverAnnotation");
const Course_1 = require("../../models/CampusAdministrator/Course");
const StudentObserverAnnotation_1 = require("../../models/CampusAdministrator/StudentObserverAnnotation");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const Student_1 = require("../../models/GeneralAdministrator/Student");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicPeriod_1 = require("../../models/SchoolAdministrator/AcademicPeriod");
const ObserverAnnotationType_1 = require("../../models/SchoolAdministrator/ObserverAnnotationType");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let StudentObserverAnnotationResolver = class StudentObserverAnnotationResolver {
    constructor() {
        this.repository = DataSource_1.StudentObserverAnnotationRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
        this.repositoryAcademicPeriod = DataSource_1.AcademicPeriodRepository;
        this.repositoryStudent = DataSource_1.StudentRepository;
        this.repositoryObserverAnnotationType = DataSource_1.ObserverAnnotationTypeRepository;
    }
    async getStudentObserverAnnotation(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllStudentObserverAnnotation(args, allData, orderCreated, studentId, courseId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (courseId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            studentId
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            studentId
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (courseId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            studentId
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            studentId
                        },
                    });
                }
            }
        }
        else {
            if (orderCreated) {
                if (courseId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            studentId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            studentId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (courseId) {
                    result = await this.repository.findBy({
                        where: {
                            courseId,
                            studentId,
                            active: true,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            studentId,
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new StudentObserverAnnotation_1.StudentObserverAnnotationConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createStudentObserverAnnotation(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateStudentObserverAnnotation(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveStudentObserverAnnotation(active, id, context) {
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
    async deleteStudentObserverAnnotation(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async createPeriodStudentObserverAnnotation(courseId, academicPeriodId, context) {
        var _a, _b;
        let course = await this.repositoryCourse.findOneBy(courseId);
        let academicPeriod = await this.repositoryAcademicPeriod.findOneBy(academicPeriodId);
        if (course && academicPeriod) {
            const students = course.studentsId;
            if (students) {
                for (let student of students) {
                    let StudentObserverAnnotation = await this.repository.findBy({
                        where: {
                            academicPeriodId,
                            courseId,
                            studentId: student,
                        },
                    });
                    if (StudentObserverAnnotation.length == 0) {
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
    async observerAnnotationType(data) {
        let id = data.observerAnnotationTypeId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryObserverAnnotationType.findOneBy(id);
            return result;
        }
        return null;
    }
};
exports.StudentObserverAnnotationResolver = StudentObserverAnnotationResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(StudentObserverAnnotation_1.StudentObserverAnnotation),
    __metadata("design:type", Object)
], StudentObserverAnnotationResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], StudentObserverAnnotationResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], StudentObserverAnnotationResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], StudentObserverAnnotationResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicPeriod_1.AcademicPeriod),
    __metadata("design:type", Object)
], StudentObserverAnnotationResolver.prototype, "repositoryAcademicPeriod", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Student_1.Student),
    __metadata("design:type", Object)
], StudentObserverAnnotationResolver.prototype, "repositoryStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ObserverAnnotationType_1.ObserverAnnotationType),
    __metadata("design:type", Object)
], StudentObserverAnnotationResolver.prototype, "repositoryObserverAnnotationType", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => StudentObserverAnnotation_1.StudentObserverAnnotation, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "getStudentObserverAnnotation", null);
__decorate([
    (0, type_graphql_1.Query)(() => StudentObserverAnnotation_1.StudentObserverAnnotationConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('studentId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('courseId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String,
        String]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "getAllStudentObserverAnnotation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => StudentObserverAnnotation_1.StudentObserverAnnotation),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewStudentObserverAnnotation_1.NewStudentObserverAnnotation, Object]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "createStudentObserverAnnotation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => StudentObserverAnnotation_1.StudentObserverAnnotation),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewStudentObserverAnnotation_1.NewStudentObserverAnnotation, String, Object]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "updateStudentObserverAnnotation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "changeActiveStudentObserverAnnotation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "deleteStudentObserverAnnotation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "createPeriodStudentObserverAnnotation", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentObserverAnnotation_1.StudentObserverAnnotation]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentObserverAnnotation_1.StudentObserverAnnotation]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentObserverAnnotation_1.StudentObserverAnnotation]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Course_1.Course, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentObserverAnnotation_1.StudentObserverAnnotation]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "course", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicPeriod_1.AcademicPeriod, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentObserverAnnotation_1.StudentObserverAnnotation]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "academicPeriod", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Student_1.Student, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentObserverAnnotation_1.StudentObserverAnnotation]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "student", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => ObserverAnnotationType_1.ObserverAnnotationType, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentObserverAnnotation_1.StudentObserverAnnotation]),
    __metadata("design:returntype", Promise)
], StudentObserverAnnotationResolver.prototype, "observerAnnotationType", null);
exports.StudentObserverAnnotationResolver = StudentObserverAnnotationResolver = __decorate([
    (0, type_graphql_1.Resolver)(StudentObserverAnnotation_1.StudentObserverAnnotation)
], StudentObserverAnnotationResolver);
