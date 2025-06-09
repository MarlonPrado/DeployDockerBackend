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
exports.AcademicAsignatureResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const AcademicArea_1 = require("./../../models/SchoolAdministrator/AcademicArea");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewAcademicAsignature_1 = require("../../inputs/SchoolAdministrator/NewAcademicAsignature");
const GeneralAcademicAsignature_1 = require("../../models/GeneralAdministrator/GeneralAcademicAsignature");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const GradeAssignment_1 = require("../../models/SchoolAdministrator/GradeAssignment");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let AcademicAsignatureResolver = class AcademicAsignatureResolver {
    constructor() {
        this.repository = DataSource_1.AcademicAsignatureRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryAcademicArea = DataSource_1.AcademicAreaRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
        this.repositoryGeneralAcademicAsignature = DataSource_1.GeneralAcademicAsignatureRepository;
        this.repositoryGradeAssignment = DataSource_1.GradeAssignmentRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
    }
    async getAcademicAsignature(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllAcademicAsignature(args, allData, orderCreated, schoolId, academicAreaId, schoolYearId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (academicAreaId) {
                    result = await this.repository.findBy({
                        where: { schoolId, academicAreaId, schoolYearId },
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
                if (academicAreaId) {
                    result = await this.repository.findBy({
                        where: { schoolId, academicAreaId, schoolYearId },
                    });
                }
                else {
                    result = await this.repository.findBy({ where: { schoolId, schoolYearId } });
                }
            }
        }
        else {
            if (orderCreated) {
                if (academicAreaId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            academicAreaId,
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
                if (academicAreaId) {
                    result = await this.repository.findBy({
                        where: {
                            schoolId,
                            schoolYearId,
                            academicAreaId,
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
        let resultConn = new AcademicAsignature_1.AcademicAsignatureConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllAcademicAsignatureNotAssignedInAcademicGrade(args, schoolId, academicGradeId, schoolYearId) {
        let gradeAssignmentAsignatureIds = [];
        let gradeAssignmentsAcademicGrade = await this.repositoryGradeAssignment.findBy({
            where: {
                schoolId,
                academicGradeId,
                schoolYearId,
                active: true,
            },
        });
        gradeAssignmentsAcademicGrade.forEach((gradeAssignmentAcademicGrade) => {
            gradeAssignmentAsignatureIds.push(new mongodb_1.ObjectId(gradeAssignmentAcademicGrade.academicAsignatureId));
        });
        let result;
        result = await this.repository.findBy({
            where: {
                _id: { $nin: gradeAssignmentAsignatureIds },
                schoolId,
                schoolYearId,
                active: true,
            },
        });
        let resultConn = new AcademicAsignature_1.AcademicAsignatureConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createAcademicAsignature(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateAcademicAsignature(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveAcademicAsignature(active, id, context) {
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
    async deleteAcademicAsignature(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async importAcademicAsignatureSchoolYearId(schoolId, oldAcademicAreaId, newAcademicAreaId, newSchoolYearId) {
        var _a, _b, _c;
        let results = await this.repository.findBy({
            where: { schoolId, academicAreaId: oldAcademicAreaId },
        });
        console.log('IMPORT', results === null || results === void 0 ? void 0 : results.length);
        for (let result of results) {
            let academicGradesId = [];
            if (result === null || result === void 0 ? void 0 : result.academicGradeId) {
                for (let academicGradeId of result === null || result === void 0 ? void 0 : result.academicGradeId) {
                    let academicGradeNew;
                    let academicGradeOld = await this.repositoryAcademicGrade.findOneBy(academicGradeId);
                    if (academicGradeOld) {
                        academicGradeNew = await this.repositoryAcademicGrade.findBy({
                            where: { entityBaseId: academicGradeId, schoolYearId: newSchoolYearId },
                        });
                        if ((academicGradeNew === null || academicGradeNew === void 0 ? void 0 : academicGradeNew.length) > 0) {
                            academicGradesId.push((_b = (_a = academicGradeNew[0]) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString());
                        }
                    }
                }
            }
            const model = await this.repository.create({
                name: result.name,
                abbreviation: result.abbreviation,
                code: result.code,
                minWeight: result.minWeight,
                maxWeight: result.maxWeight,
                academicAreaId: newAcademicAreaId.toString(),
                academicGradeId: academicGradesId,
                schoolId: result.schoolId,
                generalAcademicAsignatureId: result.generalAcademicAsignatureId,
                order: result.order,
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
    async fixAllAcademicAsignatureSchoolAndSchoolYear() {
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
                if (result === null || result === void 0 ? void 0 : result.schoolId) {
                    let schoolId;
                    let school = await this.repositorySchool.findOneBy(result === null || result === void 0 ? void 0 : result.schoolId);
                    if (school) {
                        schoolId = (_b = school === null || school === void 0 ? void 0 : school.id) === null || _b === void 0 ? void 0 : _b.toString();
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
                    if (result === null || result === void 0 ? void 0 : result.academicAreaId) {
                        let academicArea = await this.repositoryAcademicArea.findOneBy(result === null || result === void 0 ? void 0 : result.academicAreaId);
                        if (academicArea && (academicArea === null || academicArea === void 0 ? void 0 : academicArea.schoolId) && (academicArea === null || academicArea === void 0 ? void 0 : academicArea.schoolYearId)) {
                            console.log('school 1: ', number);
                            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId((_h = result === null || result === void 0 ? void 0 : result.id) === null || _h === void 0 ? void 0 : _h.toString()) }, result), { schoolId: academicArea === null || academicArea === void 0 ? void 0 : academicArea.schoolId, schoolYearId: academicArea === null || academicArea === void 0 ? void 0 : academicArea.schoolYearId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
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
    async academicArea(data) {
        let id = data.academicAreaId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicArea.findOneBy(id);
            return result;
        }
        return null;
    }
    async generalAcademicAsignature(data) {
        let id = data.generalAcademicAsignatureId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryGeneralAcademicAsignature.findOneBy(id);
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
};
exports.AcademicAsignatureResolver = AcademicAsignatureResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], AcademicAsignatureResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], AcademicAsignatureResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicArea_1.AcademicArea),
    __metadata("design:type", Object)
], AcademicAsignatureResolver.prototype, "repositoryAcademicArea", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], AcademicAsignatureResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], AcademicAsignatureResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GeneralAcademicAsignature_1.GeneralAcademicAsignature),
    __metadata("design:type", Object)
], AcademicAsignatureResolver.prototype, "repositoryGeneralAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(GradeAssignment_1.GradeAssignment),
    __metadata("design:type", Object)
], AcademicAsignatureResolver.prototype, "repositoryGradeAssignment", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], AcademicAsignatureResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAsignature_1.AcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "getAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAsignature_1.AcademicAsignatureConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('academicAreaId', () => String, { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String, String, String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "getAllAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Query)(() => AcademicAsignature_1.AcademicAsignatureConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('academicGradeId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('schoolYearId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        String, String, String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "getAllAcademicAsignatureNotAssignedInAcademicGrade", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicAsignature_1.AcademicAsignature),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicAsignature_1.NewAcademicAsignature, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "createAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => AcademicAsignature_1.AcademicAsignature),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewAcademicAsignature_1.NewAcademicAsignature, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "updateAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "changeActiveAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "deleteAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('oldAcademicAreaId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('newAcademicAreaId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('newSchoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "importAcademicAsignatureSchoolYearId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "fixAllAcademicAsignatureSchoolAndSchoolYear", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignature_1.AcademicAsignature]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignature_1.AcademicAsignature]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicArea_1.AcademicArea, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignature_1.AcademicAsignature]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "academicArea", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => GeneralAcademicAsignature_1.GeneralAcademicAsignature, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignature_1.AcademicAsignature]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "generalAcademicAsignature", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignature_1.AcademicAsignature]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "school", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => SchoolYear_1.SchoolYear, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AcademicAsignature_1.AcademicAsignature]),
    __metadata("design:returntype", Promise)
], AcademicAsignatureResolver.prototype, "schoolYear", null);
exports.AcademicAsignatureResolver = AcademicAsignatureResolver = __decorate([
    (0, type_graphql_1.Resolver)(AcademicAsignature_1.AcademicAsignature)
], AcademicAsignatureResolver);
