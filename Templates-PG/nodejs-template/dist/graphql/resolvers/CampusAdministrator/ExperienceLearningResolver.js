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
exports.ExperienceLearningResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const ExperienceLearningType_1 = require("../../enums/ExperienceLearningType");
const ExperienceType_1 = require("../../enums/ExperienceType");
const PerformanceLevelType_1 = require("../../enums/PerformanceLevelType");
const ValuationType_1 = require("../../enums/ValuationType");
const NewExperienceLearning_1 = require("../../inputs/CampusAdministrator/NewExperienceLearning");
const AcademicAreaCoursePeriodValuation_1 = require("../../models/CampusAdministrator/AcademicAreaCoursePeriodValuation");
const AcademicAreaCourseYearValuation_1 = require("../../models/CampusAdministrator/AcademicAreaCourseYearValuation");
const AcademicAsignatureCourse_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourse");
const AcademicAsignatureCoursePeriodValuation_1 = require("../../models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation");
const AcademicAsignatureCourseYearValuation_1 = require("../../models/CampusAdministrator/AcademicAsignatureCourseYearValuation");
const AverageAcademicPeriodCourse_1 = require("../../models/CampusAdministrator/AverageAcademicPeriodCourse");
const AverageAcademicPeriodStudent_1 = require("../../models/CampusAdministrator/AverageAcademicPeriodStudent");
const AverageAcademicYearCourse_1 = require("../../models/CampusAdministrator/AverageAcademicYearCourse");
const AverageAcademicYearStudent_1 = require("../../models/CampusAdministrator/AverageAcademicYearStudent");
const Course_1 = require("../../models/CampusAdministrator/Course");
const ExperienceLearning_1 = require("../../models/CampusAdministrator/ExperienceLearning");
const ExperienceLearningAverageValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningAverageValuation");
const ExperienceLearningCoEvaluation_1 = require("../../models/CampusAdministrator/ExperienceLearningCoEvaluation");
const ExperienceLearningCoEvaluationValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningCoEvaluationValuation");
const ExperienceLearningRubricCriteria_1 = require("../../models/CampusAdministrator/ExperienceLearningRubricCriteria");
const ExperienceLearningRubricCriteriaValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningRubricCriteriaValuation");
const ExperienceLearningRubricValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningRubricValuation");
const ExperienceLearningSelfAssessmentValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningSelfAssessmentValuation");
const ExperienceLearningTraditionalValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningTraditionalValuation");
const ExperienceLearningValuation_1 = require("../../models/CampusAdministrator/ExperienceLearningValuation");
const StudentBehaviour_1 = require("../../models/CampusAdministrator/StudentBehaviour");
const StudentYearBehaviour_1 = require("../../models/CampusAdministrator/StudentYearBehaviour");
const Campus_1 = require("../../models/GeneralAdministrator/Campus");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const AcademicArea_1 = require("../../models/SchoolAdministrator/AcademicArea");
const AcademicAsignature_1 = require("../../models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../../models/SchoolAdministrator/AcademicGrade");
const AcademicPeriod_1 = require("../../models/SchoolAdministrator/AcademicPeriod");
const EvaluativeComponent_1 = require("../../models/SchoolAdministrator/EvaluativeComponent");
const EvidenceLearning_1 = require("../../models/SchoolAdministrator/EvidenceLearning");
const Learning_1 = require("../../models/SchoolAdministrator/Learning");
const PerformanceLevel_1 = require("../../models/SchoolAdministrator/PerformanceLevel");
const SchoolConfiguration_1 = require("../../models/SchoolAdministrator/SchoolConfiguration");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const PerformanceLevelResolver_1 = require("../SchoolAdministrator/PerformanceLevelResolver");
let ExperienceLearningResolver = class ExperienceLearningResolver {
    constructor() {
        this.repository = DataSource_1.ExperienceLearningRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryCampus = DataSource_1.CampusRepository;
        this.repositorySchool = DataSource_1.SchoolRepository;
        this.repositoryLearning = DataSource_1.LearningRepository;
        this.repositoryEvidenceLearning = DataSource_1.EvidenceLearningRepository;
        this.repositoryAcademicAsignatureCourse = DataSource_1.AcademicAsignatureCourseRepository;
        this.repositoryAcademicPeriod = DataSource_1.AcademicPeriodRepository;
        this.repositoryEvaluativeComponent = DataSource_1.EvaluativeComponentRepository;
        this.repositoryCourse = DataSource_1.CourseRepository;
        this.repositoryAcademicGrade = DataSource_1.AcademicGradeRepository;
        this.repositoryExperienceLearningTraditionalValuation = DataSource_1.ExperienceLearningTraditionalValuationRepository;
        this.repositoryExperienceLearningSelfAssessmentValuation = DataSource_1.ExperienceLearningSelfAssessmentValuationRepository;
        this.repositoryExperienceLearningCoEvaluation = DataSource_1.ExperienceLearningCoEvaluationRepository;
        this.repositoryExperienceLearningCoEvaluationValuation = DataSource_1.ExperienceLearningCoEvaluationValuationRepository;
        this.repositoryExperienceLearningAverageValuation = DataSource_1.ExperienceLearningAverageValuationRepository;
        this.repositoryAcademicAsignatureCoursePeriodValuation = DataSource_1.AcademicAsignatureCoursePeriodValuationRepository;
        this.repositoryAcademicAreaCoursePeriodValuation = DataSource_1.AcademicAreaCoursePeriodValuationRepository;
        this.repositoryAcademicAsignatureCourseYearValuation = DataSource_1.AcademicAsignatureCourseYearValuationRepository;
        this.repositoryAcademicAreaCourseYearValuation = DataSource_1.AcademicAreaCourseYearValuationRepository;
        this.repositoryExperienceLearningRubricCriteria = DataSource_1.ExperienceLearningRubricCriteriaRepository;
        this.repositoryExperienceLearningRubricCriteriaValuation = DataSource_1.ExperienceLearningRubricCriteriaValuationRepository;
        this.repositoryExperienceLearningRubricValuation = DataSource_1.ExperienceLearningRubricValuationRepository;
        this.repositoryAcademicAsignature = DataSource_1.AcademicAsignatureRepository;
        this.repositoryPerformanceLevel = DataSource_1.PerformanceLevelRepository;
        this.repositoryAcademicArea = DataSource_1.AcademicAreaRepository;
        this.repositoryAverageAcademicPeriodStudent = DataSource_1.AverageAcademicPeriodStudentRepository;
        this.repositoryAverageAcademicPeriodCourse = DataSource_1.AverageAcademicPeriodCourseRepository;
        this.repositoryAverageAcademicYearStudent = DataSource_1.AverageAcademicYearStudentRepository;
        this.repositoryAverageAcademicYearCourse = DataSource_1.AverageAcademicYearCourseRepository;
        this.repositoryStudentBehaviour = DataSource_1.StudentBehaviourRepository;
        this.repositoryStudentYearBehaviour = DataSource_1.StudentYearBehaviourRepository;
        this.repositorySchoolConfiguration = DataSource_1.SchoolConfigurationRepository;
        this.performanceLevelResolver = new PerformanceLevelResolver_1.PerformanceLevelResolver();
    }
    async getExperienceLearning(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllExperienceLearning(args, allData, experienceLearningType, orderCreated, campusId, academicPeriodId, academicAsignatureCourseId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (academicAsignatureCourseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicPeriodId,
                            academicAsignatureCourseId,
                            experienceLearningType,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (academicAsignatureCourseId) {
                        result = await this.repository.findBy({
                            where: {
                                academicAsignatureCourseId,
                                campusId,
                                experienceLearningType,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        if (academicPeriodId) {
                            result = await this.repository.findBy({
                                where: {
                                    campusId,
                                    academicPeriodId,
                                    experienceLearningType,
                                },
                                order: { createdAt: 'DESC' },
                            });
                        }
                        else {
                            result = await this.repository.findBy({
                                where: {
                                    campusId,
                                    experienceLearningType,
                                },
                                order: { createdAt: 'DESC' },
                            });
                        }
                    }
                }
            }
            else {
                if (academicAsignatureCourseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicPeriodId,
                            academicAsignatureCourseId,
                            experienceLearningType,
                        },
                    });
                }
                else {
                    if (academicAsignatureCourseId) {
                        result = await this.repository.findBy({
                            where: {
                                academicAsignatureCourseId,
                                campusId,
                                experienceLearningType,
                            },
                        });
                    }
                    else {
                        if (academicPeriodId) {
                            result = await this.repository.findBy({
                                where: {
                                    campusId,
                                    academicPeriodId,
                                    experienceLearningType,
                                },
                            });
                        }
                        else {
                            result = await this.repository.findBy({
                                where: {
                                    campusId,
                                    experienceLearningType,
                                },
                            });
                        }
                    }
                }
            }
        }
        else {
            if (orderCreated) {
                if (academicAsignatureCourseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicPeriodId,
                            academicAsignatureCourseId,
                            experienceLearningType,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    if (academicAsignatureCourseId) {
                        result = await this.repository.findBy({
                            where: {
                                academicAsignatureCourseId,
                                campusId,
                                experienceLearningType,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                    else {
                        if (academicPeriodId) {
                            result = await this.repository.findBy({
                                where: {
                                    campusId,
                                    academicPeriodId,
                                    experienceLearningType,
                                    active: true,
                                },
                                order: { createdAt: 'DESC' },
                            });
                        }
                        else {
                            result = await this.repository.findBy({
                                where: {
                                    campusId,
                                    experienceLearningType,
                                    active: true,
                                },
                                order: { createdAt: 'DESC' },
                            });
                        }
                    }
                }
            }
            else {
                if (academicAsignatureCourseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicPeriodId,
                            academicAsignatureCourseId,
                            experienceLearningType,
                            active: true,
                        },
                    });
                }
                else {
                    if (academicAsignatureCourseId) {
                        result = await this.repository.findBy({
                            where: {
                                academicAsignatureCourseId,
                                campusId,
                                experienceLearningType,
                                active: true,
                            },
                        });
                    }
                    else {
                        if (academicPeriodId) {
                            result = await this.repository.findBy({
                                where: {
                                    campusId,
                                    academicPeriodId,
                                    experienceLearningType,
                                    active: true,
                                },
                            });
                        }
                        else {
                            result = await this.repository.findBy({
                                where: {
                                    campusId,
                                    experienceLearningType,
                                    active: true,
                                },
                            });
                        }
                    }
                }
            }
        }
        let resultConn = new ExperienceLearning_1.ExperienceLearningConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async getAllExperienceLearningWhitoutCampusId(args, allData, experienceLearningType, orderCreated, academicAsignatureCourseId, academicPeriodId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            academicPeriodId,
                            academicAsignatureCourseId,
                            experienceLearningType,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            academicAsignatureCourseId,
                            experienceLearningType,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (academicAsignatureCourseId && academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            academicPeriodId,
                            academicAsignatureCourseId,
                            experienceLearningType,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            academicAsignatureCourseId,
                            experienceLearningType,
                        },
                    });
                }
            }
        }
        else {
            if (orderCreated) {
                if (academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            academicPeriodId,
                            academicAsignatureCourseId,
                            experienceLearningType,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            academicAsignatureCourseId,
                            experienceLearningType,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (academicPeriodId) {
                    result = await this.repository.findBy({
                        where: {
                            academicPeriodId,
                            academicAsignatureCourseId,
                            experienceLearningType,
                            active: true,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            academicAsignatureCourseId,
                            experienceLearningType,
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new ExperienceLearning_1.ExperienceLearningConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createExperienceLearning(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateExperienceLearning(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        if ((result === null || result === void 0 ? void 0 : result.academicPeriodId) && (result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId)) {
            this.updateAllStudentAcademicAsignatureCoursePeriodValuation(result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId, result === null || result === void 0 ? void 0 : result.academicPeriodId, (result === null || result === void 0 ? void 0 : result.experienceLearningType)
                ? result === null || result === void 0 ? void 0 : result.experienceLearningType
                : ExperienceLearningType_1.ExperienceLearningType.NORMAL);
        }
        return result;
    }
    async changeActiveExperienceLearning(active, id, context) {
        var _a, _b;
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), { active: active, version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        if ((result === null || result === void 0 ? void 0 : result.academicPeriodId) && (result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId)) {
            this.updateAllStudentAcademicAsignatureCoursePeriodValuation(result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId, result === null || result === void 0 ? void 0 : result.academicPeriodId, (result === null || result === void 0 ? void 0 : result.experienceLearningType)
                ? result === null || result === void 0 ? void 0 : result.experienceLearningType
                : ExperienceLearningType_1.ExperienceLearningType.NORMAL);
        }
        if (result.id) {
            return true;
        }
        else {
            return false;
        }
    }
    async deleteExperienceLearning(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        if ((data === null || data === void 0 ? void 0 : data.academicPeriodId) && (data === null || data === void 0 ? void 0 : data.academicAsignatureCourseId)) {
            this.updateAllStudentAcademicAsignatureCoursePeriodValuation(data === null || data === void 0 ? void 0 : data.academicAsignatureCourseId, data === null || data === void 0 ? void 0 : data.academicPeriodId, (data === null || data === void 0 ? void 0 : data.experienceLearningType) ? data === null || data === void 0 ? void 0 : data.experienceLearningType : ExperienceLearningType_1.ExperienceLearningType.NORMAL);
        }
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async createExperienceLearningTraditionalValuationStudents(id, context) {
        var _a, _b;
        const result = await this.repository.findOneBy(id);
        if (result) {
            const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId);
            if (academicAsignatureCourse) {
                const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
                if (course) {
                    const students = course.studentsId;
                    if (students) {
                        for (let student of students) {
                            let experienceLearningTraditionalValuation = await this.repositoryExperienceLearningTraditionalValuation.findBy({
                                where: {
                                    experienceLearningId: id,
                                    studentId: student,
                                },
                            });
                            if (experienceLearningTraditionalValuation.length == 0) {
                                let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
                                const model = await this.repositoryExperienceLearningTraditionalValuation.create({
                                    experienceLearningId: id,
                                    studentId: student,
                                    assessment: undefined,
                                    active: true,
                                    version: 0,
                                    createdByUserId,
                                });
                                let result = await this.repositoryExperienceLearningTraditionalValuation.save(model);
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async createExperienceLearningSelfAssessmentValuationStudents(id, context) {
        var _a, _b;
        const result = await this.repository.findOneBy(id);
        if (result) {
            const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId);
            if (academicAsignatureCourse) {
                const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
                if (course) {
                    const students = course.studentsId;
                    if (students) {
                        for (let student of students) {
                            let experienceLearningSelfAssessmentValuation = await this.repositoryExperienceLearningSelfAssessmentValuation.findBy({
                                where: {
                                    experienceLearningId: id,
                                    studentId: student,
                                },
                            });
                            if (experienceLearningSelfAssessmentValuation.length == 0) {
                                let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
                                const model = await this.repositoryExperienceLearningSelfAssessmentValuation.create({
                                    experienceLearningId: id,
                                    studentId: student,
                                    assessment: undefined,
                                    observations: undefined,
                                    active: true,
                                    version: 0,
                                    createdByUserId,
                                });
                                let result = await this.repositoryExperienceLearningSelfAssessmentValuation.save(model);
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async createExperienceLearningCoEvaluationStudents(id, context) {
        var _a, _b;
        const result = await this.repository.findOneBy(id);
        if (result) {
            const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId);
            if (academicAsignatureCourse) {
                const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
                if (course) {
                    const coEvaluators = course.studentsId;
                    if (coEvaluators) {
                        for (let coEvaluator of coEvaluators) {
                            const students = course.studentsId;
                            if (students) {
                                for (let student of students) {
                                    if (coEvaluator != student) {
                                        let experienceLearningCoEvaluation = await this.repositoryExperienceLearningCoEvaluation.findBy({
                                            where: {
                                                coEvaluatorId: coEvaluator,
                                                experienceLearningId: id,
                                                studentId: student,
                                            },
                                        });
                                        if (experienceLearningCoEvaluation.length == 0) {
                                            let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
                                            const model = await this.repositoryExperienceLearningCoEvaluation.create({
                                                experienceLearningId: id,
                                                coEvaluatorId: coEvaluator,
                                                studentId: student,
                                                assessment: undefined,
                                                observations: undefined,
                                                active: true,
                                                version: 0,
                                                createdByUserId,
                                            });
                                            let result = await this.repositoryExperienceLearningCoEvaluation.save(model);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async createExperienceLearningCoEvaluationValuationStudents(id, context) {
        var _a, _b, _c, _d;
        const result = await this.repository.findOneBy(id);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let updatedByUserId = (_d = (_c = context === null || context === void 0 ? void 0 : context.user) === null || _c === void 0 ? void 0 : _c.authorization) === null || _d === void 0 ? void 0 : _d.id;
        if (result) {
            const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId);
            if (academicAsignatureCourse) {
                const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
                if (course) {
                    const students = course.studentsId;
                    if (students) {
                        for (let student of students) {
                            let experienceLearningCoEvaluationValuation = await this.repositoryExperienceLearningCoEvaluationValuation.findBy({
                                where: {
                                    experienceLearningId: id,
                                    studentId: student,
                                },
                            });
                            let experienceLearningCoEvaluations = await this.repositoryExperienceLearningCoEvaluation.findBy({
                                where: {
                                    experienceLearningId: id,
                                    studentId: student,
                                },
                            });
                            if (experienceLearningCoEvaluationValuation.length == 0) {
                                if (experienceLearningCoEvaluations.length > 0) {
                                    let assessment = 0;
                                    let count = 0;
                                    experienceLearningCoEvaluations.forEach((experienceLearningCoEvaluation) => {
                                        assessment += experienceLearningCoEvaluation.assessment
                                            ? experienceLearningCoEvaluation.assessment
                                            : 0;
                                        if (experienceLearningCoEvaluation.assessment) {
                                            count++;
                                        }
                                    });
                                    if (assessment !== 0) {
                                        assessment = assessment / count;
                                    }
                                    const model = await this.repositoryExperienceLearningCoEvaluationValuation.create({
                                        experienceLearningId: id,
                                        studentId: student,
                                        assessment: assessment !== 0 ? assessment : undefined,
                                        active: true,
                                        version: 0,
                                        createdByUserId,
                                    });
                                    let result = await this.repositoryExperienceLearningCoEvaluationValuation.save(model);
                                }
                                else {
                                    const model = await this.repositoryExperienceLearningCoEvaluationValuation.create({
                                        experienceLearningId: id,
                                        studentId: student,
                                        assessment: undefined,
                                        active: true,
                                        version: 0,
                                        createdByUserId,
                                    });
                                    let result = await this.repositoryExperienceLearningCoEvaluationValuation.save(model);
                                }
                            }
                            else {
                                if (experienceLearningCoEvaluations.length > 0) {
                                    let assessment = 0;
                                    let count = 0;
                                    experienceLearningCoEvaluations.forEach((experienceLearningCoEvaluation) => {
                                        assessment += experienceLearningCoEvaluation.assessment
                                            ? experienceLearningCoEvaluation.assessment
                                            : 0;
                                        if (experienceLearningCoEvaluation.assessment) {
                                            count++;
                                        }
                                    });
                                    if (assessment !== 0) {
                                        assessment = assessment / count;
                                    }
                                    let data = experienceLearningCoEvaluationValuation[0];
                                    let result = await this.repositoryExperienceLearningCoEvaluationValuation.save(Object.assign(Object.assign({ _id: data.id }, data), { assessment: assessment !== 0 ? assessment : undefined, version: (data === null || data === void 0 ? void 0 : data.version) + 1, updatedByUserId }));
                                }
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async createExperienceLearningRubricStudents(id, context) {
        var _a, _b, _c, _d;
        const result = await this.repository.findOneBy(id);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let updatedByUserId = (_d = (_c = context === null || context === void 0 ? void 0 : context.user) === null || _c === void 0 ? void 0 : _c.authorization) === null || _d === void 0 ? void 0 : _d.id;
        if (result) {
            const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(result === null || result === void 0 ? void 0 : result.academicAsignatureCourseId);
            const experienceLearningRubricCriterias = await this.repositoryExperienceLearningRubricCriteria.findBy({
                where: {
                    experienceLearningId: id,
                },
            });
            if (academicAsignatureCourse && experienceLearningRubricCriterias) {
                const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
                if (course) {
                    const students = course.studentsId;
                    if (students) {
                        for (let student of students) {
                            for (let experienceLearningRubricCriteria of experienceLearningRubricCriterias) {
                                let experienceLearningRubricCriteriaValuation = await this.repositoryExperienceLearningRubricCriteriaValuation.findBy({
                                    where: {
                                        experienceLearningRubricCriteriaId: experienceLearningRubricCriteria.id.toString(),
                                        studentId: student,
                                    },
                                });
                                if (experienceLearningRubricCriteriaValuation.length == 0) {
                                    const model = await this.repositoryExperienceLearningRubricCriteriaValuation.create({
                                        experienceLearningRubricCriteriaId: experienceLearningRubricCriteria.id.toString(),
                                        studentId: student,
                                        active: true,
                                        version: 0,
                                        createdByUserId,
                                    });
                                    let result = await this.repositoryExperienceLearningRubricCriteriaValuation.save(model);
                                }
                            }
                            let experienceLearningRubricValuation = await this.repositoryExperienceLearningRubricValuation.findBy({
                                where: {
                                    experienceLearningId: id,
                                    studentId: student,
                                },
                            });
                            if (experienceLearningRubricValuation.length == 0) {
                                const model = await this.repositoryExperienceLearningRubricValuation.create({
                                    experienceLearningId: id,
                                    studentId: student,
                                    active: true,
                                    version: 0,
                                    createdByUserId,
                                });
                                let result = await this.repositoryExperienceLearningRubricValuation.save(model);
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    async getValuationStudents(id) {
        let result = [];
        const experienceLearning = await this.repository.findOneBy(id);
        if (experienceLearning) {
            switch (experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.experienceType) {
                case ExperienceType_1.ExperienceType.COEVALUATION:
                    result = await this.repositoryExperienceLearningCoEvaluationValuation.findBy({
                        where: {
                            experienceLearningId: experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.id.toString(),
                        },
                    });
                    break;
                case ExperienceType_1.ExperienceType.SELFAPPRAISAL:
                    result = await this.repositoryExperienceLearningSelfAssessmentValuation.findBy({
                        where: {
                            experienceLearningId: experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.id.toString(),
                        },
                    });
                    break;
                case ExperienceType_1.ExperienceType.TRADITIONALVALUATION:
                    result = await this.repositoryExperienceLearningTraditionalValuation.findBy({
                        where: {
                            experienceLearningId: experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.id.toString(),
                        },
                    });
                    break;
                case ExperienceType_1.ExperienceType.VALUATIONRUBRIC:
                    result = await this.repositoryExperienceLearningRubricValuation.findBy({
                        where: {
                            experienceLearningId: experienceLearning === null || experienceLearning === void 0 ? void 0 : experienceLearning.id.toString(),
                        },
                    });
                    break;
            }
        }
        return result;
    }
    async createExperienceLearningAverageValuationStudent(academicAsignatureCourseId, academicPeriodId, evaluativeComponentId, studentId, experienceLearningType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let countDigitsPerformanceLevel = 2;
        let academicPeriod = await this.repositoryAcademicPeriod.findOneBy(academicPeriodId);
        if (academicPeriod) {
            let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                where: {
                    schoolId: academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.schoolId,
                    code: 'COUNT_DIGITS_PERFORMANCE_LEVEL',
                    active: true,
                },
            });
            if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                countDigitsPerformanceLevel = ((_a = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _a === void 0 ? void 0 : _a.valueNumber)
                    ? (_b = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _b === void 0 ? void 0 : _b.valueNumber
                    : 2;
            }
            const experienceLearnings = await this.repository.findBy({
                where: {
                    evaluativeComponentsId: { $in: [evaluativeComponentId] },
                    academicAsignatureCourseId,
                    academicPeriodId,
                    experienceLearningType,
                    active: true,
                },
            });
            if (experienceLearnings) {
                const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
                if (academicAsignatureCourse) {
                    const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
                    if (course) {
                        let studentAverage;
                        let average = 0;
                        let evaluations = [];
                        let performanceLevelType = null;
                        let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourse({}, academicAsignatureCourseId + '');
                        let performanceLevelsFinal = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + '');
                        let diferencesPerformanceLevels = ((_c = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _c === void 0 ? void 0 : _c.length) - ((_d = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges) === null || _d === void 0 ? void 0 : _d.length);
                        if (performanceLevels) {
                            performanceLevelType = (_f = (_e = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _e === void 0 ? void 0 : _e.node) === null || _f === void 0 ? void 0 : _f.type;
                        }
                        let studentAverageList = await this.repositoryExperienceLearningAverageValuation.findBy({
                            where: {
                                academicAsignatureCourseId,
                                academicPeriodId,
                                evaluativeComponentId,
                                studentId,
                                experienceLearningType,
                            },
                        });
                        if (studentAverageList.length > 0) {
                            studentAverage = studentAverageList[0];
                        }
                        else {
                            studentAverage = new ExperienceLearningAverageValuation_1.ExperienceLearningAverageValuation();
                            studentAverage.version = 0;
                            studentAverage.active = true;
                            studentAverage.studentId = studentId;
                            studentAverage.average = 0;
                            studentAverage.evaluativeComponentId = evaluativeComponentId;
                            studentAverage.academicPeriodId = academicPeriodId;
                            studentAverage.academicAsignatureCourseId = academicAsignatureCourseId;
                            studentAverage.experienceLearningType = experienceLearningType;
                        }
                        let countExperienceLearningAssessment = 0;
                        for (let experienceLearning of experienceLearnings) {
                            switch (experienceLearning.experienceType) {
                                case ExperienceType_1.ExperienceType.COEVALUATION:
                                    evaluations = await this.repositoryExperienceLearningCoEvaluationValuation.findBy({
                                        where: {
                                            experienceLearningId: experienceLearning.id.toString(),
                                            studentId,
                                        },
                                    });
                                    evaluations.forEach((evaluation) => {
                                        var _a;
                                        switch (performanceLevelType) {
                                            case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                                if (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId) {
                                                    let performanceLevelIndex = ((_a = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _a === void 0 ? void 0 : _a.findIndex((i) => i.node.id.toString() === (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId))) + 1;
                                                    average += performanceLevelIndex;
                                                    countExperienceLearningAssessment++;
                                                }
                                                break;
                                            case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                                if (evaluation === null || evaluation === void 0 ? void 0 : evaluation.assessment) {
                                                    average += evaluation === null || evaluation === void 0 ? void 0 : evaluation.assessment;
                                                    countExperienceLearningAssessment++;
                                                    break;
                                                }
                                        }
                                    });
                                    break;
                                case ExperienceType_1.ExperienceType.SELFAPPRAISAL:
                                    evaluations =
                                        await this.repositoryExperienceLearningSelfAssessmentValuation.findBy({
                                            where: {
                                                experienceLearningId: experienceLearning.id.toString(),
                                                studentId,
                                            },
                                        });
                                    evaluations.forEach((evaluation) => {
                                        var _a;
                                        switch (performanceLevelType) {
                                            case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                                if (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId) {
                                                    let performanceLevelIndex = ((_a = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _a === void 0 ? void 0 : _a.findIndex((i) => i.node.id.toString() === (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId))) + 1;
                                                    average += performanceLevelIndex;
                                                    countExperienceLearningAssessment++;
                                                }
                                                break;
                                            case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                                if (evaluation === null || evaluation === void 0 ? void 0 : evaluation.assessment) {
                                                    average += evaluation === null || evaluation === void 0 ? void 0 : evaluation.assessment;
                                                    countExperienceLearningAssessment++;
                                                    break;
                                                }
                                        }
                                    });
                                    break;
                                case ExperienceType_1.ExperienceType.TRADITIONALVALUATION:
                                    evaluations = await this.repositoryExperienceLearningTraditionalValuation.findBy({
                                        where: {
                                            experienceLearningId: experienceLearning.id.toString(),
                                            studentId,
                                        },
                                    });
                                    evaluations.forEach((evaluation) => {
                                        var _a, _b, _c;
                                        switch (performanceLevelType) {
                                            case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                                if (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId) {
                                                    let perfomance = (_a = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _a === void 0 ? void 0 : _a.find((i) => i.node.id.toString() === (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId));
                                                    let performanceLevelIndex = ((_b = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _b === void 0 ? void 0 : _b.findIndex((i) => i.node.id.toString() === (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId))) - diferencesPerformanceLevels;
                                                    if ((_c = perfomance === null || perfomance === void 0 ? void 0 : perfomance.node) === null || _c === void 0 ? void 0 : _c.isFinal) {
                                                        average += performanceLevelIndex;
                                                    }
                                                    else {
                                                        average += 0;
                                                    }
                                                    countExperienceLearningAssessment++;
                                                }
                                                break;
                                            case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                                if (evaluation === null || evaluation === void 0 ? void 0 : evaluation.assessment) {
                                                    average += evaluation === null || evaluation === void 0 ? void 0 : evaluation.assessment;
                                                    countExperienceLearningAssessment++;
                                                    break;
                                                }
                                        }
                                    });
                                    break;
                                case ExperienceType_1.ExperienceType.VALUATIONRUBRIC:
                                    evaluations = await this.repositoryExperienceLearningRubricValuation.findBy({
                                        where: {
                                            experienceLearningId: experienceLearning.id.toString(),
                                            studentId,
                                        },
                                    });
                                    evaluations.forEach((evaluation) => {
                                        var _a;
                                        switch (performanceLevelType) {
                                            case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                                if (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId) {
                                                    let performanceLevelIndex = (_a = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _a === void 0 ? void 0 : _a.findIndex((i) => i.node.id.toString() === (evaluation === null || evaluation === void 0 ? void 0 : evaluation.performanceLevelId));
                                                    average += performanceLevelIndex;
                                                    countExperienceLearningAssessment++;
                                                }
                                                break;
                                            case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                                if (evaluation === null || evaluation === void 0 ? void 0 : evaluation.assessment) {
                                                    average += evaluation === null || evaluation === void 0 ? void 0 : evaluation.assessment;
                                                    countExperienceLearningAssessment++;
                                                    break;
                                                }
                                        }
                                    });
                                    break;
                            }
                        }
                        performanceLevels =
                            await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + '');
                        average = average / countExperienceLearningAssessment;
                        switch (performanceLevelType) {
                            case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                if (average != null && average > 0 && countExperienceLearningAssessment > 0) {
                                    studentAverage.average = average;
                                    let averagePerfomanceLevel = Number(average.toFixed(0));
                                    studentAverage.performanceLevelId =
                                        (_h = (_g = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel]) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.id.toString();
                                }
                                else {
                                    studentAverage.average = 0;
                                    studentAverage.performanceLevelId =
                                        (_k = (_j = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _j === void 0 ? void 0 : _j.node) === null || _k === void 0 ? void 0 : _k.id.toString();
                                }
                                break;
                            case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                average = Number(average.toFixed(countDigitsPerformanceLevel));
                                studentAverage.average = average;
                                if (Number.isNaN(average) || average < 0) {
                                    studentAverage.average = 0;
                                }
                                else {
                                    let performanceLevelId;
                                    let perf = (_l = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _l === void 0 ? void 0 : _l.find((c) => {
                                        return average < c.node.topScore && average >= c.node.minimumScore;
                                    });
                                    if (perf === undefined) {
                                        perf = (_m = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _m === void 0 ? void 0 : _m.find((c) => {
                                            return average <= c.node.topScore && average > c.node.minimumScore;
                                        });
                                    }
                                    if (perf && ((_o = perf === null || perf === void 0 ? void 0 : perf.node) === null || _o === void 0 ? void 0 : _o.id)) {
                                        performanceLevelId = perf.node.id.toString();
                                    }
                                    studentAverage.performanceLevelId = performanceLevelId;
                                }
                                break;
                        }
                        if (studentAverage.id) {
                            studentAverage = await this.repositoryExperienceLearningAverageValuation.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(studentAverage.id.toString()) }, studentAverage), { version: (studentAverage === null || studentAverage === void 0 ? void 0 : studentAverage.version) + 1 }));
                        }
                        else {
                            studentAverage = await this.repositoryExperienceLearningAverageValuation.save(Object.assign({}, studentAverage));
                        }
                    }
                }
                return true;
            }
        }
    }
    async createExperienceLearningAverageValuationStudents(academicAsignatureCourseId, academicPeriodId, evaluativeComponentId, experienceLearningType) {
        const experienceLearnings = await this.repository.findBy({
            where: {
                evaluativeComponentsId: { $in: [evaluativeComponentId] },
                academicAsignatureCourseId,
                academicPeriodId,
                active: true,
            },
        });
        if (experienceLearnings) {
            const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
            if (academicAsignatureCourse) {
                const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
                if (course) {
                    const students = course.studentsId;
                    if (students) {
                        for (const student of students) {
                            await this.createExperienceLearningAverageValuationStudent(academicAsignatureCourseId, academicPeriodId, evaluativeComponentId, student, experienceLearningType);
                        }
                    }
                    return true;
                }
            }
        }
    }
    async updateAllStudentSchoolPeriodValuation(schoolId, academicPeriodId, experienceLearningType) {
        var _a, _b, _c;
        const school = await this.repositorySchool.findOneBy(schoolId);
        if (school) {
            const academicGrades = await this.repositoryAcademicGrade.findBy({
                where: { schoolId: (_a = school === null || school === void 0 ? void 0 : school.id) === null || _a === void 0 ? void 0 : _a.toString() },
            });
            for (let academicGrade of academicGrades) {
                let promisesList = [];
                console.log('Generando =', (academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.name) + ' ' + ((_b = academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.id) === null || _b === void 0 ? void 0 : _b.toString()));
                promisesList.push(this.updateAllStudentGradePeriodValuation((_c = academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.id) === null || _c === void 0 ? void 0 : _c.toString(), academicPeriodId, experienceLearningType));
                await Promise.all(promisesList).then(() => {
                    return true;
                });
            }
            return true;
        }
    }
    async updateAllStudentGradePeriodValuation(academicGradeId, academicPeriodId, experienceLearningType) {
        var _a, _b;
        const academicGrade = await this.repositoryAcademicGrade.findOneBy(academicGradeId);
        if (academicGrade) {
            const courses = await this.repositoryCourse.findBy({
                where: { academicGradeId: (_a = academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.id) === null || _a === void 0 ? void 0 : _a.toString() },
            });
            for (let course of courses) {
                let promisesList = [];
                console.log('Generando =', (course === null || course === void 0 ? void 0 : course.name) + ' ' + (course === null || course === void 0 ? void 0 : course.academicGradeId));
                promisesList.push(this.updateAllStudentCoursePeriodValuation((_b = course === null || course === void 0 ? void 0 : course.id) === null || _b === void 0 ? void 0 : _b.toString(), academicPeriodId, experienceLearningType));
                await Promise.all(promisesList).then(() => {
                    return true;
                });
            }
            return true;
        }
    }
    async updateAllStudentCoursePeriodValuation(courseId, academicPeriodId, experienceLearningType) {
        var _a;
        const course = await this.repositoryCourse.findOneBy(courseId);
        if (course) {
            let students = course.studentsId;
            const academicAsignatureCourses = await this.repositoryAcademicAsignatureCourse.findBy({
                where: { courseId: courseId, active: true },
            });
            let promisesList = [];
            for (let academicAsignatureCourse of academicAsignatureCourses) {
                if (academicAsignatureCourse) {
                    promisesList.push(this.updateAllStudentAcademicAsignatureCoursePeriodValuation((_a = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.id) === null || _a === void 0 ? void 0 : _a.toString(), academicPeriodId, experienceLearningType));
                }
            }
            return await Promise.all(promisesList).then(async () => {
                var _a, _b, _c;
                if (students) {
                    let areasAux = [];
                    let asignaturesAux = [];
                    for (let asignatureCourse of academicAsignatureCourses) {
                        let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId);
                        let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
                        if (academicArea !== null) {
                            asignaturesAux.push(academicAsignature);
                            areasAux.push(academicArea);
                        }
                    }
                    const ids = areasAux.map((o) => { var _a; return (_a = o.id) === null || _a === void 0 ? void 0 : _a.toString(); });
                    const count = {};
                    ids.forEach((element) => {
                        count[element] = (count[element] || 0) + 1;
                    });
                    const filtered = areasAux.filter(({ id }, index) => !ids.includes(id === null || id === void 0 ? void 0 : id.toString(), index + 1));
                    for (let filter of filtered) {
                        filter.count = count[filter === null || filter === void 0 ? void 0 : filter.id];
                    }
                    let promisesListAreasStudent = [];
                    for (let filter of filtered) {
                        let asignaturesArea = asignaturesAux === null || asignaturesAux === void 0 ? void 0 : asignaturesAux.filter((itemV) => (itemV === null || itemV === void 0 ? void 0 : itemV.academicAreaId) == (filter === null || filter === void 0 ? void 0 : filter.id));
                        if ((asignaturesArea === null || asignaturesArea === void 0 ? void 0 : asignaturesArea.length) > 0) {
                            let asignature = asignaturesArea[0];
                            for (let asignatureCourse of academicAsignatureCourses) {
                                for (let student of students) {
                                    if ((asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId) == ((_a = asignature === null || asignature === void 0 ? void 0 : asignature.id) === null || _a === void 0 ? void 0 : _a.toString())) {
                                        promisesListAreasStudent.push(this.createAcademicAreaCoursePeriodValuationStudent((_b = asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.id) === null || _b === void 0 ? void 0 : _b.toString(), academicPeriodId, student + ''));
                                    }
                                }
                            }
                        }
                    }
                    await Promise.all(promisesListAreasStudent).then(async () => {
                        return true;
                    });
                    let promisesListStudents = [];
                    for (let student of students) {
                        promisesListStudents.push(this.createAveragePeriodValuationStudent((_c = course === null || course === void 0 ? void 0 : course.id) === null || _c === void 0 ? void 0 : _c.toString(), academicPeriodId, student + ''));
                    }
                    await Promise.all(promisesListStudents).then(async () => {
                        return true;
                    });
                }
            });
        }
    }
    async updateAllStudentAcademicAsignatureCoursePeriodValuation(academicAsignatureCourseId, academicPeriodId, experienceLearningType) {
        const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
        if (academicAsignatureCourse) {
            const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            if (course) {
                let students = course.studentsId;
                let promisesListAsignatures = [];
                if (students) {
                    for (let student of students) {
                        promisesListAsignatures.push(this.createAcademicAsignatureCoursePeriodValuationStudentBulk(academicAsignatureCourseId, academicPeriodId, student + '', experienceLearningType));
                    }
                    await Promise.all(promisesListAsignatures).then(async () => { });
                    return true;
                }
            }
        }
    }
    async createAcademicAsignatureCoursePeriodValuationStudentBulk(academicAsignatureCourseId, academicPeriodId, studentId, experienceLearningType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let countDigitsPerformanceLevel = 2;
        let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
        let evaluativeComponents = [];
        if (academicAsignatureCourse) {
            let course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(academicAsignatureCourse.academicAsignatureId);
            if (course && academicAsignature) {
                let campus = await this.repositoryCampus.findOneBy(course.campusId);
                if (campus) {
                    let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                        where: {
                            schoolId: campus === null || campus === void 0 ? void 0 : campus.schoolId,
                            code: 'COUNT_DIGITS_PERFORMANCE_LEVEL',
                            active: true,
                        },
                    });
                    if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                        countDigitsPerformanceLevel = ((_a = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _a === void 0 ? void 0 : _a.valueNumber)
                            ? (_b = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _b === void 0 ? void 0 : _b.valueNumber
                            : 2;
                    }
                    evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
                        where: {
                            academicAsignaturesId: { $in: [academicAsignature.id.toString()] },
                            academicAreasId: [],
                            schoolId: campus.schoolId,
                            schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                    if (evaluativeComponents.length === 0) {
                        evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
                            where: {
                                academicAsignaturesId: [],
                                academicAreasId: { $in: [academicAsignature.academicAreaId] },
                                schoolId: campus.schoolId,
                                schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                        if (evaluativeComponents.length === 0) {
                            evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
                                where: {
                                    academicAsignaturesId: [],
                                    academicAreasId: [],
                                    schoolId: campus.schoolId,
                                    schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId,
                                    active: true,
                                },
                                order: { createdAt: 'DESC' },
                            });
                        }
                    }
                }
            }
        }
        if (academicAsignatureCourse) {
            const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            if (course) {
                let studentPeriodValuation;
                let average = 0;
                let perf = null;
                let performanceLevelId = undefined;
                let valuationType = 'CALCULATE';
                if (experienceLearningType == ExperienceLearningType_1.ExperienceLearningType.NORMAL) {
                    valuationType = ValuationType_1.ValuationType.CALCULATE;
                }
                if (experienceLearningType == ExperienceLearningType_1.ExperienceLearningType.RECOVERY) {
                    valuationType = ValuationType_1.ValuationType.RECOVERY;
                }
                let studentPeriodValuationList = await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
                    where: {
                        academicAsignatureCourseId,
                        academicPeriodId,
                        studentId,
                        valuationType,
                    },
                });
                let countDefinitive = 0;
                let countCalculate = 0;
                let countRecovery = 0;
                if (studentPeriodValuationList.length > 1) {
                    for (let studentPeriodValuation of studentPeriodValuationList) {
                        switch (studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) {
                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                                countDefinitive++;
                                break;
                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                                countCalculate++;
                                break;
                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                                countRecovery++;
                                break;
                        }
                    }
                    if (countCalculate > 1) {
                        for (let studentPeriodValuation of studentPeriodValuationList) {
                            if ((studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                                let result = await this.repositoryAcademicAsignatureCoursePeriodValuation.deleteOne({ _id: new mongodb_1.ObjectId((_c = studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.id) === null || _c === void 0 ? void 0 : _c.toString()) });
                            }
                        }
                        studentPeriodValuationList = [];
                    }
                    if (countRecovery > 1) {
                        for (let studentPeriodValuation of studentPeriodValuationList) {
                            if ((studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                                let result = await this.repositoryAcademicAsignatureCoursePeriodValuation.deleteOne({ _id: new mongodb_1.ObjectId((_d = studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.id) === null || _d === void 0 ? void 0 : _d.toString()) });
                            }
                        }
                        studentPeriodValuationList = [];
                    }
                }
                if (countDefinitive == 0) {
                    if (studentPeriodValuationList.length > 0) {
                        studentPeriodValuation = studentPeriodValuationList[0];
                    }
                    else {
                        studentPeriodValuation = new AcademicAsignatureCoursePeriodValuation_1.AcademicAsignatureCoursePeriodValuation();
                        studentPeriodValuation.version = 0;
                        studentPeriodValuation.active = true;
                        studentPeriodValuation.studentId = studentId;
                        studentPeriodValuation.academicPeriodId = academicPeriodId;
                        studentPeriodValuation.academicAsignatureCourseId = academicAsignatureCourseId;
                        studentPeriodValuation.assessment = 0;
                        if (experienceLearningType == (ExperienceLearningType_1.ExperienceLearningType === null || ExperienceLearningType_1.ExperienceLearningType === void 0 ? void 0 : ExperienceLearningType_1.ExperienceLearningType.NORMAL)) {
                            studentPeriodValuation.valuationType = ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE;
                        }
                        if (experienceLearningType == (ExperienceLearningType_1.ExperienceLearningType === null || ExperienceLearningType_1.ExperienceLearningType === void 0 ? void 0 : ExperienceLearningType_1.ExperienceLearningType.RECOVERY)) {
                            studentPeriodValuation.valuationType = ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY;
                        }
                    }
                    let performanceLevelType = null;
                    let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + '');
                    if (performanceLevels) {
                        performanceLevelType = (_f = (_e = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _e === void 0 ? void 0 : _e.node) === null || _f === void 0 ? void 0 : _f.type;
                    }
                    for (let evaluativeComponent of evaluativeComponents) {
                        await this.createExperienceLearningAverageValuationStudent(academicAsignatureCourseId, academicPeriodId, evaluativeComponent.id.toString(), studentId, experienceLearningType);
                        const experienceLearningAverageValuation = await this.repositoryExperienceLearningAverageValuation.findBy({
                            where: {
                                academicAsignatureCourseId,
                                academicPeriodId,
                                studentId,
                                evaluativeComponentId: evaluativeComponent.id.toString(),
                                experienceLearningType,
                                active: true,
                            },
                        });
                        if (experienceLearningAverageValuation.length > 0) {
                            let averageComponent = 0;
                            let weightComponent = 0;
                            switch (performanceLevelType) {
                                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                    let performanceLevelIndex = ((_g = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _g === void 0 ? void 0 : _g.findIndex((i) => {
                                        var _a;
                                        return i.node.id.toString() ===
                                            ((_a = experienceLearningAverageValuation[0]) === null || _a === void 0 ? void 0 : _a.performanceLevelId);
                                    })) + 1;
                                    averageComponent = performanceLevelIndex;
                                    weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
                                    average += averageComponent * (weightComponent / 100);
                                    break;
                                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                    averageComponent = experienceLearningAverageValuation[0].average
                                        ? experienceLearningAverageValuation[0].average
                                        : 0;
                                    weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
                                    average += averageComponent * (weightComponent / 100);
                                    break;
                            }
                        }
                    }
                    switch (performanceLevelType) {
                        case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                            let averagePerfomanceLevel = Number(average.toFixed(0));
                            studentPeriodValuation.performanceLevelId =
                                (_j = (_h = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel - 1]) === null || _h === void 0 ? void 0 : _h.node) === null || _j === void 0 ? void 0 : _j.id.toString();
                            break;
                        case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                            average = Number(average.toFixed(countDigitsPerformanceLevel));
                            studentPeriodValuation.assessment = average;
                            perf = (_k = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _k === void 0 ? void 0 : _k.find((c) => {
                                return average < c.node.topScore && average >= c.node.minimumScore;
                            });
                            if (perf === undefined) {
                                perf = (_l = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _l === void 0 ? void 0 : _l.find((c) => {
                                    return average <= c.node.topScore && average > c.node.minimumScore;
                                });
                            }
                            if (perf && ((_m = perf === null || perf === void 0 ? void 0 : perf.node) === null || _m === void 0 ? void 0 : _m.id)) {
                                performanceLevelId = perf.node.id;
                            }
                            studentPeriodValuation.performanceLevelId = performanceLevelId;
                            break;
                    }
                    if (studentPeriodValuation.id) {
                        studentPeriodValuation =
                            await this.repositoryAcademicAsignatureCoursePeriodValuation.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(studentPeriodValuation.id.toString()) }, studentPeriodValuation), { version: (studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.version) + 1 }));
                    }
                    else {
                        studentPeriodValuation =
                            await this.repositoryAcademicAsignatureCoursePeriodValuation.save(Object.assign({}, studentPeriodValuation));
                    }
                }
            }
        }
        return true;
    }
    async createAcademicAsignatureCoursePeriodValuationStudent(academicAsignatureCourseId, academicPeriodId, studentId, experienceLearningType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        let countDigitsPerformanceLevel = 2;
        let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
        let evaluativeComponents = [];
        if (academicAsignatureCourse) {
            let course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(academicAsignatureCourse.academicAsignatureId);
            if (course && academicAsignature) {
                let campus = await this.repositoryCampus.findOneBy(course.campusId);
                if (campus) {
                    let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                        where: {
                            schoolId: campus === null || campus === void 0 ? void 0 : campus.schoolId,
                            code: 'COUNT_DIGITS_PERFORMANCE_LEVEL',
                            active: true,
                        },
                    });
                    if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                        countDigitsPerformanceLevel = ((_a = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _a === void 0 ? void 0 : _a.valueNumber)
                            ? (_b = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _b === void 0 ? void 0 : _b.valueNumber
                            : 2;
                    }
                    evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
                        where: {
                            academicAsignaturesId: { $in: [academicAsignature.id.toString()] },
                            academicAreasId: [],
                            schoolId: campus.schoolId,
                            schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                    if (evaluativeComponents.length === 0) {
                        evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
                            where: {
                                academicAsignaturesId: [],
                                academicAreasId: { $in: [academicAsignature.academicAreaId] },
                                schoolId: campus.schoolId,
                                schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                        if (evaluativeComponents.length === 0) {
                            evaluativeComponents = await this.repositoryEvaluativeComponent.findBy({
                                where: {
                                    academicAsignaturesId: [],
                                    academicAreasId: [],
                                    schoolId: campus.schoolId,
                                    schoolYearId: course === null || course === void 0 ? void 0 : course.schoolYearId,
                                    active: true,
                                },
                                order: { createdAt: 'DESC' },
                            });
                        }
                    }
                }
            }
        }
        if (academicAsignatureCourse) {
            const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            if (course) {
                let studentPeriodValuation;
                let average = 0;
                let perf = null;
                let performanceLevelId = undefined;
                let valuationType = 'CALCULATE';
                if (experienceLearningType == ExperienceLearningType_1.ExperienceLearningType.NORMAL) {
                    valuationType = ValuationType_1.ValuationType.CALCULATE;
                }
                if (experienceLearningType == ExperienceLearningType_1.ExperienceLearningType.RECOVERY) {
                    valuationType = ValuationType_1.ValuationType.RECOVERY;
                }
                let studentPeriodValuationList = await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
                    where: {
                        academicAsignatureCourseId,
                        academicPeriodId,
                        studentId,
                        valuationType,
                    },
                });
                let countDefinitive = 0;
                let countCalculate = 0;
                let countRecovery = 0;
                if (studentPeriodValuationList.length > 1) {
                    for (let studentPeriodValuation of studentPeriodValuationList) {
                        switch (studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) {
                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                                countDefinitive++;
                                break;
                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                                countCalculate++;
                                break;
                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                                countRecovery++;
                                break;
                        }
                    }
                    if (countCalculate > 1) {
                        for (let studentPeriodValuation of studentPeriodValuationList) {
                            if ((studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                                let result = await this.repositoryAcademicAsignatureCoursePeriodValuation.deleteOne({ _id: new mongodb_1.ObjectId((_c = studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.id) === null || _c === void 0 ? void 0 : _c.toString()) });
                            }
                        }
                        studentPeriodValuationList = [];
                    }
                    if (countRecovery > 1) {
                        for (let studentPeriodValuation of studentPeriodValuationList) {
                            if ((studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                                let result = await this.repositoryAcademicAsignatureCoursePeriodValuation.deleteOne({ _id: new mongodb_1.ObjectId((_d = studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.id) === null || _d === void 0 ? void 0 : _d.toString()) });
                            }
                        }
                        studentPeriodValuationList = [];
                    }
                }
                if (countDefinitive == 0) {
                    if (studentPeriodValuationList.length > 0) {
                        studentPeriodValuation = studentPeriodValuationList[0];
                    }
                    else {
                        studentPeriodValuation = new AcademicAsignatureCoursePeriodValuation_1.AcademicAsignatureCoursePeriodValuation();
                        studentPeriodValuation.version = 0;
                        studentPeriodValuation.active = true;
                        studentPeriodValuation.studentId = studentId;
                        studentPeriodValuation.academicPeriodId = academicPeriodId;
                        studentPeriodValuation.academicAsignatureCourseId = academicAsignatureCourseId;
                        studentPeriodValuation.assessment = 0;
                        if (experienceLearningType == (ExperienceLearningType_1.ExperienceLearningType === null || ExperienceLearningType_1.ExperienceLearningType === void 0 ? void 0 : ExperienceLearningType_1.ExperienceLearningType.NORMAL)) {
                            studentPeriodValuation.valuationType = ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE;
                        }
                        if (experienceLearningType == (ExperienceLearningType_1.ExperienceLearningType === null || ExperienceLearningType_1.ExperienceLearningType === void 0 ? void 0 : ExperienceLearningType_1.ExperienceLearningType.RECOVERY)) {
                            studentPeriodValuation.valuationType = ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY;
                        }
                    }
                    let performanceLevelType = null;
                    let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + '');
                    if (performanceLevels) {
                        performanceLevelType = (_f = (_e = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _e === void 0 ? void 0 : _e.node) === null || _f === void 0 ? void 0 : _f.type;
                    }
                    for (let evaluativeComponent of evaluativeComponents) {
                        await this.createExperienceLearningAverageValuationStudent(academicAsignatureCourseId, academicPeriodId, evaluativeComponent.id.toString(), studentId, experienceLearningType);
                        const experienceLearningAverageValuation = await this.repositoryExperienceLearningAverageValuation.findBy({
                            where: {
                                academicAsignatureCourseId,
                                academicPeriodId,
                                studentId,
                                evaluativeComponentId: evaluativeComponent.id.toString(),
                                experienceLearningType,
                            },
                        });
                        if (experienceLearningAverageValuation.length > 0) {
                            let averageComponent = 0;
                            let weightComponent = 0;
                            switch (performanceLevelType) {
                                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                    let performanceLevelIndex = ((_g = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _g === void 0 ? void 0 : _g.findIndex((i) => {
                                        var _a;
                                        return i.node.id.toString() ===
                                            ((_a = experienceLearningAverageValuation[0]) === null || _a === void 0 ? void 0 : _a.performanceLevelId);
                                    })) + 1;
                                    averageComponent = performanceLevelIndex;
                                    weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
                                    average += averageComponent * (weightComponent / 100);
                                    break;
                                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                    averageComponent = experienceLearningAverageValuation[0].average
                                        ? experienceLearningAverageValuation[0].average
                                        : 0;
                                    weightComponent = evaluativeComponent.weight ? evaluativeComponent.weight : 0;
                                    average += averageComponent * (weightComponent / 100);
                                    break;
                            }
                        }
                    }
                    switch (performanceLevelType) {
                        case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                            let averagePerfomanceLevel = Number(average.toFixed(0));
                            studentPeriodValuation.performanceLevelId =
                                (_j = (_h = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel - 1]) === null || _h === void 0 ? void 0 : _h.node) === null || _j === void 0 ? void 0 : _j.id.toString();
                            break;
                        case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                            average = Number(average.toFixed(countDigitsPerformanceLevel));
                            studentPeriodValuation.assessment = average;
                            perf = (_k = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _k === void 0 ? void 0 : _k.find((c) => {
                                return average < c.node.topScore && average >= c.node.minimumScore;
                            });
                            if (perf === undefined) {
                                perf = (_l = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _l === void 0 ? void 0 : _l.find((c) => {
                                    return average <= c.node.topScore && average > c.node.minimumScore;
                                });
                            }
                            if (perf && ((_m = perf === null || perf === void 0 ? void 0 : perf.node) === null || _m === void 0 ? void 0 : _m.id)) {
                                performanceLevelId = perf.node.id;
                            }
                            studentPeriodValuation.performanceLevelId = performanceLevelId;
                            break;
                    }
                    if (studentPeriodValuation.id) {
                        studentPeriodValuation =
                            await this.repositoryAcademicAsignatureCoursePeriodValuation.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(studentPeriodValuation.id.toString()) }, studentPeriodValuation), { version: (studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.version) + 1 }));
                    }
                    else {
                        studentPeriodValuation =
                            await this.repositoryAcademicAsignatureCoursePeriodValuation.save(Object.assign({}, studentPeriodValuation));
                    }
                }
            }
        }
        this.createAcademicAreaCoursePeriodValuationStudent(academicAsignatureCourseId, academicPeriodId, studentId + '');
        return true;
    }
    async createAcademicAreaCoursePeriodValuationStudent(academicAsignatureCourseId, academicPeriodId, studentId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        let countDigitsPerformanceLevel = 2;
        let schoolConfigurationAverageArea;
        let configurationAverageArea = 'IHS';
        let academicPeriod = await this.repositoryAcademicPeriod.findOneBy(academicPeriodId);
        if (academicPeriod) {
            schoolConfigurationAverageArea = await this.repositorySchoolConfiguration.findBy({
                where: {
                    schoolId: (_a = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.schoolId) === null || _a === void 0 ? void 0 : _a.toString(),
                    code: 'AVERAGE_AREA',
                    active: true,
                },
            });
            if ((schoolConfigurationAverageArea === null || schoolConfigurationAverageArea === void 0 ? void 0 : schoolConfigurationAverageArea.length) > 0) {
                configurationAverageArea = ((_b = schoolConfigurationAverageArea[0]) === null || _b === void 0 ? void 0 : _b.valueString)
                    ? (_c = schoolConfigurationAverageArea[0]) === null || _c === void 0 ? void 0 : _c.valueString
                    : 'IHS';
            }
            let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                where: {
                    schoolId: academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.schoolId,
                    code: 'COUNT_DIGITS_PERFORMANCE_LEVEL',
                    active: true,
                },
            });
            if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                countDigitsPerformanceLevel = ((_d = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _d === void 0 ? void 0 : _d.valueNumber)
                    ? (_e = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _e === void 0 ? void 0 : _e.valueNumber
                    : 2;
            }
        }
        let academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
        let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.academicAsignatureId);
        let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
        let academicAsignatures = await this.repositoryAcademicAsignature.findBy({
            where: { academicAreaId: (_f = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _f === void 0 ? void 0 : _f.toString() },
        });
        let asignaturesAux = [];
        for (let asignature of academicAsignatures) {
            asignaturesAux.push((_g = asignature === null || asignature === void 0 ? void 0 : asignature.id) === null || _g === void 0 ? void 0 : _g.toString());
        }
        let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({
            where: {
                academicAsignatureId: { $in: asignaturesAux },
                courseId: academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.courseId,
            },
        });
        let hourlyIntensityTotal = 0;
        for (let academicAsignature of academicAsignaturesCourses) {
            hourlyIntensityTotal += (academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.hourlyIntensity)
                ? academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.hourlyIntensity
                : 0;
        }
        let studentAreaPeriodValuation;
        let average = 0;
        let perf = null;
        let performanceLevelId = undefined;
        let studentAreaPeriodValuationList = await this.repositoryAcademicAreaCoursePeriodValuation.findBy({
            where: {
                academicAreaId: (_h = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _h === void 0 ? void 0 : _h.toString(),
                academicPeriodId,
                studentId,
            },
        });
        let countDefinitive = 0;
        let countCalculate = 0;
        let countRecovery = 0;
        let valuationType = 'CALCULATE';
        if (studentAreaPeriodValuationList.length > 1) {
            for (let studentAreaPeriodValuation of studentAreaPeriodValuationList) {
                switch (studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) {
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                        countDefinitive++;
                        break;
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                        countCalculate++;
                        break;
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                        countRecovery++;
                        break;
                }
            }
            if (countCalculate > 1) {
                for (let studentAreaPeriodValuation of studentAreaPeriodValuationList) {
                    if ((studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                        let result = await this.repositoryAcademicAreaCoursePeriodValuation.deleteOne({
                            _id: new mongodb_1.ObjectId((_j = studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.id) === null || _j === void 0 ? void 0 : _j.toString()),
                        });
                    }
                }
                studentAreaPeriodValuationList = [];
            }
            if (countRecovery > 1) {
                for (let studentPeriodValuation of studentAreaPeriodValuationList) {
                    if ((studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                        let result = await this.repositoryAcademicAsignatureCoursePeriodValuation.deleteOne({
                            _id: new mongodb_1.ObjectId((_k = studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.id) === null || _k === void 0 ? void 0 : _k.toString()),
                        });
                    }
                }
                studentAreaPeriodValuationList = [];
            }
        }
        if (countDefinitive == 0 && countRecovery == 0) {
            if (studentAreaPeriodValuationList.length > 0) {
                studentAreaPeriodValuation = studentAreaPeriodValuationList[0];
                if (studentAreaPeriodValuation.valuationType == null) {
                    studentAreaPeriodValuation.valuationType = ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE;
                }
            }
            else {
                studentAreaPeriodValuation = new AcademicAreaCoursePeriodValuation_1.AcademicAreaCoursePeriodValuation();
                studentAreaPeriodValuation.version = 0;
                studentAreaPeriodValuation.active = true;
                studentAreaPeriodValuation.studentId = studentId;
                studentAreaPeriodValuation.academicPeriodId = academicPeriodId;
                studentAreaPeriodValuation.academicAreaId = (_l = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _l === void 0 ? void 0 : _l.toString();
                studentAreaPeriodValuation.assessment = 0;
                studentAreaPeriodValuation.valuationType = ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE;
            }
            let performanceLevelType = null;
            let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + '');
            if (performanceLevels) {
                performanceLevelType = (_o = (_m = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _m === void 0 ? void 0 : _m.node) === null || _o === void 0 ? void 0 : _o.type;
            }
            for (let academicAsignature of academicAsignaturesCourses) {
                let studentAsignaturePeriodValuationList = await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
                    where: {
                        academicAsignatureCourseId: (_p = academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.id) === null || _p === void 0 ? void 0 : _p.toString(),
                        academicPeriodId,
                        studentId,
                    },
                });
                let countDefinitive = 0;
                let countCalculate = 0;
                let countRecovery = 0;
                for (let studentAsignaturePeriodValuation of studentAsignaturePeriodValuationList) {
                    switch (studentAsignaturePeriodValuation === null || studentAsignaturePeriodValuation === void 0 ? void 0 : studentAsignaturePeriodValuation.valuationType) {
                        case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                            countDefinitive++;
                            break;
                        case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                            countCalculate++;
                            break;
                        case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                            countRecovery++;
                            break;
                    }
                }
                let studentAsignaturePeriodValuationAux = null;
                if (countCalculate > 0) {
                    for (let studentAsignaturePeriodValuation of studentAsignaturePeriodValuationList) {
                        if ((studentAsignaturePeriodValuation === null || studentAsignaturePeriodValuation === void 0 ? void 0 : studentAsignaturePeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                            studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
                        }
                    }
                }
                if (countDefinitive > 0) {
                    for (let studentAsignaturePeriodValuation of studentAsignaturePeriodValuationList) {
                        if ((studentAsignaturePeriodValuation === null || studentAsignaturePeriodValuation === void 0 ? void 0 : studentAsignaturePeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE)) {
                            studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
                        }
                    }
                }
                if (countRecovery > 0) {
                    for (let studentAsignaturePeriodValuation of studentAsignaturePeriodValuationList) {
                        if ((studentAsignaturePeriodValuation === null || studentAsignaturePeriodValuation === void 0 ? void 0 : studentAsignaturePeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                            studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
                        }
                    }
                }
                if (studentAsignaturePeriodValuationAux != null) {
                    let averageAsignatureCourse = 0;
                    let horlyIntensityAsignature = 0;
                    switch (performanceLevelType) {
                        case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                            let performanceLevelIndex = ((_q = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _q === void 0 ? void 0 : _q.findIndex((i) => i.node.id.toString() ===
                                (studentAsignaturePeriodValuationAux === null || studentAsignaturePeriodValuationAux === void 0 ? void 0 : studentAsignaturePeriodValuationAux.performanceLevelId))) + 1;
                            averageAsignatureCourse = performanceLevelIndex;
                            horlyIntensityAsignature = (academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.hourlyIntensity)
                                ? academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.hourlyIntensity
                                : 0;
                            if (configurationAverageArea == 'IHS') {
                                average +=
                                    averageAsignatureCourse * (horlyIntensityAsignature / hourlyIntensityTotal);
                            }
                            else {
                                average += averageAsignatureCourse;
                            }
                            break;
                        case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                            averageAsignatureCourse = studentAsignaturePeriodValuationAux.assessment
                                ? studentAsignaturePeriodValuationAux.assessment
                                : 0;
                            horlyIntensityAsignature = academicAsignature.hourlyIntensity
                                ? academicAsignature.hourlyIntensity
                                : 0;
                            if (configurationAverageArea == 'IHS') {
                                average +=
                                    averageAsignatureCourse * (horlyIntensityAsignature / hourlyIntensityTotal);
                            }
                            else {
                                average += averageAsignatureCourse;
                            }
                            break;
                    }
                }
            }
            if (configurationAverageArea == 'PROM') {
                average = average / (academicAsignaturesCourses === null || academicAsignaturesCourses === void 0 ? void 0 : academicAsignaturesCourses.length);
            }
            if (Number.isNaN(average) || average < 0) {
                studentAreaPeriodValuation.assessment = 0;
            }
            switch (performanceLevelType) {
                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                    let averagePerfomanceLevel = Number(average.toFixed(0));
                    studentAreaPeriodValuation.performanceLevelId =
                        (_s = (_r = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel - 1]) === null || _r === void 0 ? void 0 : _r.node) === null || _s === void 0 ? void 0 : _s.id.toString();
                    break;
                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                    average = Number(average.toFixed(countDigitsPerformanceLevel));
                    studentAreaPeriodValuation.assessment = average;
                    perf = (_t = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _t === void 0 ? void 0 : _t.find((c) => {
                        return average < c.node.topScore && average >= c.node.minimumScore;
                    });
                    if (perf === undefined) {
                        perf = (_u = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _u === void 0 ? void 0 : _u.find((c) => {
                            return average <= c.node.topScore && average > c.node.minimumScore;
                        });
                    }
                    if (perf && ((_v = perf === null || perf === void 0 ? void 0 : perf.node) === null || _v === void 0 ? void 0 : _v.id)) {
                        performanceLevelId = perf.node.id;
                    }
                    studentAreaPeriodValuation.performanceLevelId = performanceLevelId;
                    break;
            }
            if (studentAreaPeriodValuation.id) {
                studentAreaPeriodValuation = await this.repositoryAcademicAreaCoursePeriodValuation.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(studentAreaPeriodValuation.id.toString()) }, studentAreaPeriodValuation), { version: (studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.version) + 1 }));
            }
            else {
                studentAreaPeriodValuation = await this.repositoryAcademicAreaCoursePeriodValuation.save(Object.assign({}, studentAreaPeriodValuation));
            }
            return true;
        }
    }
    async updateAllAverageStudentCoursePeriod(courseId, academicPeriodId) {
        var _a;
        const course = await this.repositoryCourse.findOneBy(courseId);
        if (course) {
            let students = course.studentsId;
            if (students) {
                for (let student of students) {
                    await this.createAveragePeriodValuationStudent((_a = course === null || course === void 0 ? void 0 : course.id) === null || _a === void 0 ? void 0 : _a.toString(), academicPeriodId, student + '');
                }
                return true;
            }
        }
    }
    async createAveragePeriodValuationStudent(courseId, academicPeriodId, studentId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        let countDigitsPerformanceLevel = 2;
        let schoolConfigurationAverageArea;
        let configurationAverageArea = 'IHS';
        let hourlyIntensityAreaAux = new Array();
        let academicPeriod = await this.repositoryAcademicPeriod.findOneBy(academicPeriodId);
        if (academicPeriod) {
            schoolConfigurationAverageArea = await this.repositorySchoolConfiguration.findBy({
                where: {
                    schoolId: (_a = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.schoolId) === null || _a === void 0 ? void 0 : _a.toString(),
                    code: 'AVERAGE_AREA',
                    active: true,
                },
            });
            if ((schoolConfigurationAverageArea === null || schoolConfigurationAverageArea === void 0 ? void 0 : schoolConfigurationAverageArea.length) > 0) {
                configurationAverageArea = ((_b = schoolConfigurationAverageArea[0]) === null || _b === void 0 ? void 0 : _b.valueString)
                    ? (_c = schoolConfigurationAverageArea[0]) === null || _c === void 0 ? void 0 : _c.valueString
                    : 'IHS';
            }
            let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                where: {
                    schoolId: academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.schoolId,
                    code: 'COUNT_DIGITS_AVERAGE_STUDENT',
                    active: true,
                },
            });
            if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                countDigitsPerformanceLevel = ((_d = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _d === void 0 ? void 0 : _d.valueNumber)
                    ? (_e = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _e === void 0 ? void 0 : _e.valueNumber
                    : 2;
            }
        }
        let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({
            where: { courseId: courseId, active: true },
        });
        let areasAux = [];
        let asignaturesAux = [];
        for (let asignatureCourse of academicAsignaturesCourses) {
            let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId);
            let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
            if (academicArea !== null) {
                asignaturesAux.push(academicAsignature);
                areasAux.push(academicArea);
            }
        }
        const ids = areasAux.map((o) => { var _a; return (_a = o.id) === null || _a === void 0 ? void 0 : _a.toString(); });
        const count = {};
        ids.forEach((element) => {
            count[element] = (count[element] || 0) + 1;
        });
        const filtered = areasAux.filter(({ id }, index) => !ids.includes(id === null || id === void 0 ? void 0 : id.toString(), index + 1));
        for (let filter of filtered) {
            filter.count = count[filter === null || filter === void 0 ? void 0 : filter.id];
        }
        let average = 0;
        let performanceLevelType = null;
        let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, ((_g = (_f = academicAsignaturesCourses[0]) === null || _f === void 0 ? void 0 : _f.id) === null || _g === void 0 ? void 0 : _g.toString()) + '');
        if (performanceLevels) {
            performanceLevelType = (_j = (_h = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _h === void 0 ? void 0 : _h.node) === null || _j === void 0 ? void 0 : _j.type;
        }
        let hourlyIntensityTotal = 0;
        for (let area of filtered) {
            let hourlyIntensityArea = 0;
            for (let asignatureCourse of academicAsignaturesCourses) {
                let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId);
                let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
                if ((academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) == ((_k = area === null || area === void 0 ? void 0 : area.id) === null || _k === void 0 ? void 0 : _k.toString())) {
                    hourlyIntensityArea += (asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.hourlyIntensity)
                        ? asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.hourlyIntensity
                        : 0;
                }
            }
            if (configurationAverageArea == 'IHS') {
                hourlyIntensityTotal += hourlyIntensityArea;
            }
            else {
                hourlyIntensityTotal += 1;
            }
            let studentAreaPeriodValuationList = await this.repositoryAcademicAreaCoursePeriodValuation.findBy({
                where: {
                    academicAreaId: (_l = area === null || area === void 0 ? void 0 : area.id) === null || _l === void 0 ? void 0 : _l.toString(),
                    academicPeriodId,
                    studentId,
                },
            });
            let countDefinitive = 0;
            let countCalculate = 0;
            let countRecovery = 0;
            for (let studentAreaPeriodValuation of studentAreaPeriodValuationList) {
                switch (studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) {
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                        countDefinitive++;
                        break;
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                        countCalculate++;
                        break;
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                        countRecovery++;
                        break;
                }
            }
            let studentAreaPeriodValuationAux = null;
            if (countCalculate > 0) {
                for (let studentAreaPeriodValuation of studentAreaPeriodValuationList) {
                    if ((studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                        studentAreaPeriodValuationAux = studentAreaPeriodValuation;
                    }
                }
            }
            if (countRecovery > 0) {
                for (let studentAreaPeriodValuation of studentAreaPeriodValuationList) {
                    if ((studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                        studentAreaPeriodValuationAux = studentAreaPeriodValuation;
                    }
                }
            }
            if (countDefinitive > 0) {
                for (let studentAreaPeriodValuation of studentAreaPeriodValuationList) {
                    if ((studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE)) {
                        studentAreaPeriodValuationAux = studentAreaPeriodValuation;
                    }
                }
            }
            let averageArea = 0;
            if (studentAreaPeriodValuationAux != null) {
                let averageAsignatureCourse = 0;
                let horlyIntensityAsignature = 0;
                switch (performanceLevelType) {
                    case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                        let performanceLevelIndex = ((_m = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _m === void 0 ? void 0 : _m.findIndex((i) => i.node.id.toString() === (studentAreaPeriodValuationAux === null || studentAreaPeriodValuationAux === void 0 ? void 0 : studentAreaPeriodValuationAux.performanceLevelId))) + 1;
                        averageArea = performanceLevelIndex;
                        if (configurationAverageArea == 'IHS') {
                            average += averageArea * hourlyIntensityArea;
                        }
                        else {
                            average += averageArea;
                        }
                        break;
                    case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                        averageArea = (studentAreaPeriodValuationAux === null || studentAreaPeriodValuationAux === void 0 ? void 0 : studentAreaPeriodValuationAux.assessment)
                            ? studentAreaPeriodValuationAux === null || studentAreaPeriodValuationAux === void 0 ? void 0 : studentAreaPeriodValuationAux.assessment
                            : 0;
                        if (configurationAverageArea == 'IHS') {
                            average += averageArea * hourlyIntensityArea;
                        }
                        else {
                            average += averageArea;
                        }
                        break;
                }
            }
        }
        average = average / hourlyIntensityTotal;
        let perf = null;
        let performanceLevelId = undefined;
        let averageAcademicPeriodStudent;
        let averageAcademicPeriodStudentList = await this.repositoryAverageAcademicPeriodStudent.findBy({
            where: {
                courseId,
                academicPeriodId,
                studentId,
            },
        });
        if (averageAcademicPeriodStudentList.length > 1) {
            for (let averageAcademicPeriodStudents of averageAcademicPeriodStudentList) {
                let result = await this.repositoryAverageAcademicPeriodStudent.deleteOne({
                    _id: new mongodb_1.ObjectId((_o = averageAcademicPeriodStudents === null || averageAcademicPeriodStudents === void 0 ? void 0 : averageAcademicPeriodStudents.id) === null || _o === void 0 ? void 0 : _o.toString()),
                });
            }
            averageAcademicPeriodStudentList = [];
        }
        if (averageAcademicPeriodStudentList.length > 0) {
            averageAcademicPeriodStudent = averageAcademicPeriodStudentList[0];
        }
        else {
            averageAcademicPeriodStudent = new AverageAcademicPeriodStudent_1.AverageAcademicPeriodStudent();
            averageAcademicPeriodStudent.version = 0;
            averageAcademicPeriodStudent.active = true;
            averageAcademicPeriodStudent.studentId = studentId;
            averageAcademicPeriodStudent.academicPeriodId = academicPeriodId;
            averageAcademicPeriodStudent.courseId = courseId;
            averageAcademicPeriodStudent.assessment = 0;
        }
        if (Number.isNaN(average) || average < 0) {
            averageAcademicPeriodStudent.assessment = 0;
        }
        else {
            switch (performanceLevelType) {
                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                    let averagePerfomanceLevel = Number(average.toFixed(0));
                    averageAcademicPeriodStudent.performanceLevelId =
                        (_q = (_p = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel - 1]) === null || _p === void 0 ? void 0 : _p.node) === null || _q === void 0 ? void 0 : _q.id.toString();
                    averageAcademicPeriodStudent.assessment = average;
                    break;
                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                    average = Number(average.toFixed(countDigitsPerformanceLevel));
                    averageAcademicPeriodStudent.assessment = average;
                    perf = (_r = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _r === void 0 ? void 0 : _r.find((c) => {
                        return average < c.node.topScore && average >= c.node.minimumScore;
                    });
                    if (perf === undefined) {
                        perf = (_s = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _s === void 0 ? void 0 : _s.find((c) => {
                            return average <= c.node.topScore && average > c.node.minimumScore;
                        });
                    }
                    if (perf && ((_t = perf === null || perf === void 0 ? void 0 : perf.node) === null || _t === void 0 ? void 0 : _t.id)) {
                        performanceLevelId = perf.node.id;
                    }
                    averageAcademicPeriodStudent.performanceLevelId = performanceLevelId;
                    break;
            }
        }
        if (averageAcademicPeriodStudent.id) {
            averageAcademicPeriodStudent = await this.repositoryAverageAcademicPeriodStudent.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(averageAcademicPeriodStudent.id.toString()) }, averageAcademicPeriodStudent), { version: (averageAcademicPeriodStudent === null || averageAcademicPeriodStudent === void 0 ? void 0 : averageAcademicPeriodStudent.version) + 1 }));
        }
        else {
            averageAcademicPeriodStudent = await this.repositoryAverageAcademicPeriodStudent.save(Object.assign({}, averageAcademicPeriodStudent));
        }
        await this.createAveragePeriodValuationCourse(courseId, academicPeriodId);
        return true;
    }
    async createAveragePeriodValuationCourse(courseId, academicPeriodId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let countDigitsPerformanceLevel = 2;
        const course = await this.repositoryCourse.findOneBy(courseId);
        if (course) {
            let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId: course === null || course === void 0 ? void 0 : course.schoolId, code: 'COUNT_DIGITS_AVERAGE_COURSE', active: true },
            });
            if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                countDigitsPerformanceLevel = ((_a = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _a === void 0 ? void 0 : _a.valueNumber)
                    ? (_b = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _b === void 0 ? void 0 : _b.valueNumber
                    : 2;
            }
            let averageAcademicPeriodStudentList = await this.repositoryAverageAcademicPeriodStudent.findBy({
                where: {
                    courseId,
                    academicPeriodId,
                    studentId: { $in: course === null || course === void 0 ? void 0 : course.studentsId },
                },
                order: { assessment: -1 },
            });
            let average = 0;
            let performanceLevelType = null;
            let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({
                where: { courseId: courseId },
            });
            let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, ((_d = (_c = academicAsignaturesCourses[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString()) + '');
            if (performanceLevels) {
                performanceLevelType = (_f = (_e = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _e === void 0 ? void 0 : _e.node) === null || _f === void 0 ? void 0 : _f.type;
            }
            let auxCount = 1;
            for (let averageAcademicPeriodStudents of averageAcademicPeriodStudentList) {
                await this.repositoryAverageAcademicPeriodStudent.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(averageAcademicPeriodStudents.id.toString()) }, averageAcademicPeriodStudents), { score: auxCount, version: (averageAcademicPeriodStudents === null || averageAcademicPeriodStudents === void 0 ? void 0 : averageAcademicPeriodStudents.version) + 1 }));
                auxCount++;
                let averageStudent = 0;
                switch (performanceLevelType) {
                    case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                        let performanceLevelIndex = ((_g = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _g === void 0 ? void 0 : _g.findIndex((i) => i.node.id.toString() === (averageAcademicPeriodStudents === null || averageAcademicPeriodStudents === void 0 ? void 0 : averageAcademicPeriodStudents.performanceLevelId))) + 1;
                        averageStudent = performanceLevelIndex;
                        average += averageStudent;
                        break;
                    case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                        averageStudent = (averageAcademicPeriodStudents === null || averageAcademicPeriodStudents === void 0 ? void 0 : averageAcademicPeriodStudents.assessment)
                            ? averageAcademicPeriodStudents === null || averageAcademicPeriodStudents === void 0 ? void 0 : averageAcademicPeriodStudents.assessment
                            : 0;
                        average += averageStudent;
                        break;
                }
            }
            if ((course === null || course === void 0 ? void 0 : course.studentsId) && ((_h = course === null || course === void 0 ? void 0 : course.studentsId) === null || _h === void 0 ? void 0 : _h.length) > 0) {
                average = average / ((_j = course === null || course === void 0 ? void 0 : course.studentsId) === null || _j === void 0 ? void 0 : _j.length);
            }
            let perf = null;
            let performanceLevelId = undefined;
            let averageAcademicPeriodCourse;
            let averageAcademicPeriodCourseList = await this.repositoryAverageAcademicPeriodCourse.findBy({
                where: {
                    courseId,
                    academicPeriodId,
                },
            });
            if (averageAcademicPeriodCourseList.length > 1) {
                for (let averageAcademicPeriodcourses of averageAcademicPeriodCourseList) {
                    let result = await this.repositoryAverageAcademicPeriodCourse.deleteOne({
                        _id: new mongodb_1.ObjectId((_k = averageAcademicPeriodcourses === null || averageAcademicPeriodcourses === void 0 ? void 0 : averageAcademicPeriodcourses.id) === null || _k === void 0 ? void 0 : _k.toString()),
                    });
                }
                averageAcademicPeriodCourseList = [];
            }
            if (averageAcademicPeriodCourseList.length > 0) {
                averageAcademicPeriodCourse = averageAcademicPeriodCourseList[0];
            }
            else {
                averageAcademicPeriodCourse = new AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse();
                averageAcademicPeriodCourse.version = 0;
                averageAcademicPeriodCourse.active = true;
                averageAcademicPeriodCourse.academicPeriodId = academicPeriodId;
                averageAcademicPeriodCourse.courseId = courseId;
                averageAcademicPeriodCourse.assessment = 0;
            }
            if (Number.isNaN(average) || average < 0) {
                averageAcademicPeriodCourse.assessment = 0;
            }
            switch (performanceLevelType) {
                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                    let averagePerfomanceLevel = Number(average.toFixed(0));
                    averageAcademicPeriodCourse.performanceLevelId =
                        (_m = (_l = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel - 1]) === null || _l === void 0 ? void 0 : _l.node) === null || _m === void 0 ? void 0 : _m.id.toString();
                    averageAcademicPeriodCourse.assessment = average;
                    break;
                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                    average = Number(average.toFixed(countDigitsPerformanceLevel));
                    averageAcademicPeriodCourse.assessment = average;
                    perf = (_o = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _o === void 0 ? void 0 : _o.find((c) => {
                        return average < c.node.topScore && average >= c.node.minimumScore;
                    });
                    if (perf === undefined) {
                        perf = (_p = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _p === void 0 ? void 0 : _p.find((c) => {
                            return average <= c.node.topScore && average > c.node.minimumScore;
                        });
                    }
                    if (perf && ((_q = perf === null || perf === void 0 ? void 0 : perf.node) === null || _q === void 0 ? void 0 : _q.id)) {
                        performanceLevelId = perf.node.id;
                    }
                    averageAcademicPeriodCourse.performanceLevelId = performanceLevelId;
                    break;
            }
            if (averageAcademicPeriodCourse.id) {
                averageAcademicPeriodCourse = await this.repositoryAverageAcademicPeriodCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(averageAcademicPeriodCourse.id.toString()) }, averageAcademicPeriodCourse), { version: (averageAcademicPeriodCourse === null || averageAcademicPeriodCourse === void 0 ? void 0 : averageAcademicPeriodCourse.version) + 1 }));
            }
            else {
                averageAcademicPeriodCourse = await this.repositoryAverageAcademicPeriodCourse.save(Object.assign({}, averageAcademicPeriodCourse));
            }
            return true;
        }
    }
    async createAcademicAsignatureCoursePeriodValuationStudents(academicAsignatureCourseId, academicPeriodId, schoolId, experienceLearningType) {
        const academicAsignatureCourse = await this.repositoryAcademicAsignatureCourse.findOneBy(academicAsignatureCourseId);
        if (academicAsignatureCourse) {
            const course = await this.repositoryCourse.findOneBy(academicAsignatureCourse.courseId);
            if (course) {
                const students = course.studentsId;
                if (students) {
                    for (const student of students) {
                        this.createAcademicAsignatureCoursePeriodValuationStudent(academicAsignatureCourseId, academicPeriodId, student, experienceLearningType);
                    }
                }
            }
        }
        return true;
    }
    async updateAllStudentGradeYearValuation(academicGradeId, schoolId, schoolYearId) {
        var _a, _b;
        const academicGrade = await this.repositoryAcademicGrade.findOneBy(academicGradeId);
        if (academicGrade) {
            const courses = await this.repositoryCourse.findBy({
                where: { academicGradeId: (_a = academicGrade === null || academicGrade === void 0 ? void 0 : academicGrade.id) === null || _a === void 0 ? void 0 : _a.toString() },
            });
            for (let course of courses) {
                let promisesList = [];
                console.log('Generando =', (course === null || course === void 0 ? void 0 : course.name) + ' ' + (course === null || course === void 0 ? void 0 : course.academicGradeId));
                promisesList.push(this.updateAllStudentCourseYearValuation((_b = course === null || course === void 0 ? void 0 : course.id) === null || _b === void 0 ? void 0 : _b.toString(), schoolId, schoolYearId));
                await Promise.all(promisesList).then(() => {
                    return true;
                });
            }
            return true;
        }
    }
    async updateAllStudentCourseYearValuation(courseId, schoolId, schoolYearId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
        let countDigitsPerformanceLevel = 2;
        const course = await this.repositoryCourse.findOneBy(courseId);
        let academicPeriods = await this.repositoryAcademicPeriod.findBy({
            where: {
                schoolYearId: schoolYearId,
                schoolId: schoolId,
                active: true,
            },
            order: { order: 1 },
        });
        let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
            where: { schoolId: course === null || course === void 0 ? void 0 : course.schoolId, code: 'COUNT_DIGITS_PERFORMANCE_LEVEL', active: true },
        });
        if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
            countDigitsPerformanceLevel = ((_a = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _a === void 0 ? void 0 : _a.valueNumber)
                ? (_b = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _b === void 0 ? void 0 : _b.valueNumber
                : 2;
        }
        if (course && academicPeriods) {
            let students = course.studentsId;
            if (students) {
                const academicAsignatureCourses = await this.repositoryAcademicAsignatureCourse.findBy({
                    where: { courseId: courseId, active: true },
                });
                for (let student of students) {
                    let studentId = student;
                    for (let academicAsignatureCourse of academicAsignatureCourses) {
                        let academicAsignatureCourseId = (_c = academicAsignatureCourse === null || academicAsignatureCourse === void 0 ? void 0 : academicAsignatureCourse.id) === null || _c === void 0 ? void 0 : _c.toString();
                        let performanceLevelType = null;
                        let performanceLevelsFinal = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, academicAsignatureCourseId + '');
                        if (performanceLevelsFinal) {
                            performanceLevelType = (_e = (_d = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges[0]) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.type;
                        }
                        let assessmentYear = 0;
                        if (academicAsignatureCourse) {
                            for (let academicPeriod of academicPeriods) {
                                let academicPeriodPercentage = 0;
                                if (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.weight) {
                                    academicPeriodPercentage = (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.weight) / 100;
                                }
                                let academicPeriodId = (_f = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _f === void 0 ? void 0 : _f.toString();
                                let studentPeriodValuationList = await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
                                    where: {
                                        academicAsignatureCourseId,
                                        academicPeriodId,
                                        studentId,
                                    },
                                });
                                let countDefinitive = 0;
                                let countCalculate = 0;
                                let countRecovery = 0;
                                if (studentPeriodValuationList.length > 0) {
                                    for (let studentPeriodValuation of studentPeriodValuationList) {
                                        switch (studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) {
                                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                                                countDefinitive++;
                                                break;
                                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                                                countCalculate++;
                                                break;
                                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                                                countRecovery++;
                                                break;
                                        }
                                    }
                                }
                                let studentAsignaturePeriodValuationAux = null;
                                if (countCalculate > 0) {
                                    for (let studentAsignaturePeriodValuation of studentPeriodValuationList) {
                                        if ((studentAsignaturePeriodValuation === null || studentAsignaturePeriodValuation === void 0 ? void 0 : studentAsignaturePeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                                            studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
                                        }
                                    }
                                }
                                if (countDefinitive > 0) {
                                    for (let studentAsignaturePeriodValuation of studentPeriodValuationList) {
                                        if ((studentAsignaturePeriodValuation === null || studentAsignaturePeriodValuation === void 0 ? void 0 : studentAsignaturePeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE)) {
                                            studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
                                        }
                                    }
                                }
                                if (countRecovery > 0) {
                                    for (let studentAsignaturePeriodValuation of studentPeriodValuationList) {
                                        if ((studentAsignaturePeriodValuation === null || studentAsignaturePeriodValuation === void 0 ? void 0 : studentAsignaturePeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                                            studentAsignaturePeriodValuationAux = studentAsignaturePeriodValuation;
                                        }
                                    }
                                }
                                switch (performanceLevelType) {
                                    case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                        let performanceLevelIndex = ((_g = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges) === null || _g === void 0 ? void 0 : _g.findIndex((i) => i.node.id.toString() ===
                                            (studentAsignaturePeriodValuationAux === null || studentAsignaturePeriodValuationAux === void 0 ? void 0 : studentAsignaturePeriodValuationAux.performanceLevelId))) + 1;
                                        assessmentYear += academicPeriodPercentage * performanceLevelIndex;
                                        break;
                                    case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                        if (studentAsignaturePeriodValuationAux === null || studentAsignaturePeriodValuationAux === void 0 ? void 0 : studentAsignaturePeriodValuationAux.assessment) {
                                            assessmentYear +=
                                                academicPeriodPercentage * (studentAsignaturePeriodValuationAux === null || studentAsignaturePeriodValuationAux === void 0 ? void 0 : studentAsignaturePeriodValuationAux.assessment);
                                        }
                                        break;
                                }
                            }
                            let studentYearValuations = await this.repositoryAcademicAsignatureCourseYearValuation.findBy({
                                where: {
                                    academicAsignatureCourseId,
                                    schoolYearId,
                                    studentId,
                                },
                            });
                            if ((studentYearValuations === null || studentYearValuations === void 0 ? void 0 : studentYearValuations.length) > 1) {
                                for (let studentYearValuation of studentYearValuations) {
                                    let result = await this.repositoryAcademicAsignatureCourseYearValuation.deleteOne({ _id: new mongodb_1.ObjectId((_h = studentYearValuation === null || studentYearValuation === void 0 ? void 0 : studentYearValuation.id) === null || _h === void 0 ? void 0 : _h.toString()) });
                                }
                            }
                            let studentYearValuation;
                            if (studentYearValuations.length > 0) {
                                studentYearValuation = studentYearValuations[0];
                            }
                            else {
                                studentYearValuation = new AcademicAsignatureCourseYearValuation_1.AcademicAsignatureCourseYearValuation();
                                studentYearValuation.version = 0;
                                studentYearValuation.active = true;
                                studentYearValuation.studentId = studentId;
                                studentYearValuation.schoolYearId = schoolYearId;
                                studentYearValuation.academicAsignatureCourseId = academicAsignatureCourseId;
                                studentYearValuation.assessment = 0;
                                studentYearValuation.valuationType = ValuationType_1.ValuationType.CALCULATE;
                            }
                            switch (performanceLevelType) {
                                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                    let averagePerfomanceLevel = Number(assessmentYear.toFixed(0));
                                    studentYearValuation.performanceLevelId =
                                        (_k = (_j = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges[averagePerfomanceLevel - 1]) === null || _j === void 0 ? void 0 : _j.node) === null || _k === void 0 ? void 0 : _k.id.toString();
                                    break;
                                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                    let perf = null;
                                    assessmentYear = Number(assessmentYear.toFixed(countDigitsPerformanceLevel));
                                    studentYearValuation.assessment = assessmentYear;
                                    perf = (_l = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges) === null || _l === void 0 ? void 0 : _l.find((c) => {
                                        return (assessmentYear < c.node.topScore && assessmentYear >= c.node.minimumScore);
                                    });
                                    if (perf === undefined) {
                                        perf = (_m = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges) === null || _m === void 0 ? void 0 : _m.find((c) => {
                                            return (assessmentYear <= c.node.topScore && assessmentYear > c.node.minimumScore);
                                        });
                                    }
                                    if (perf && ((_o = perf === null || perf === void 0 ? void 0 : perf.node) === null || _o === void 0 ? void 0 : _o.id)) {
                                        studentYearValuation.performanceLevelId = perf.node.id.toString();
                                    }
                                    break;
                            }
                            if (studentYearValuation.id) {
                                studentYearValuation =
                                    await this.repositoryAcademicAsignatureCourseYearValuation.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(studentYearValuation.id.toString()) }, studentYearValuation), { version: (studentYearValuation === null || studentYearValuation === void 0 ? void 0 : studentYearValuation.version) + 1 }));
                            }
                            else {
                                studentYearValuation =
                                    await this.repositoryAcademicAsignatureCourseYearValuation.save(Object.assign({}, studentYearValuation));
                            }
                        }
                    }
                }
                for (let student of students) {
                    let studentId = student;
                    for (let asignatureCourse of academicAsignatureCourses) {
                        let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId);
                        let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
                        let performanceLevelType = null;
                        let performanceLevelsFinal = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, ((_p = asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.id) === null || _p === void 0 ? void 0 : _p.toString()) + '');
                        if (performanceLevelsFinal) {
                            performanceLevelType = (_r = (_q = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges[0]) === null || _q === void 0 ? void 0 : _q.node) === null || _r === void 0 ? void 0 : _r.type;
                        }
                        let assessmentYear = 0;
                        let countPeriod = 0;
                        for (let academicPeriod of academicPeriods) {
                            countPeriod++;
                            let academicPeriodPercentage = 0;
                            if (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.weight) {
                                academicPeriodPercentage = (academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.weight) / 100;
                            }
                            let academicPeriodId = (_s = academicPeriod === null || academicPeriod === void 0 ? void 0 : academicPeriod.id) === null || _s === void 0 ? void 0 : _s.toString();
                            let studentPeriodValuationList = await this.repositoryAcademicAreaCoursePeriodValuation.findBy({
                                where: {
                                    academicAreaId: (_t = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _t === void 0 ? void 0 : _t.toString(),
                                    academicPeriodId,
                                    studentId,
                                },
                            });
                            let countDefinitive = 0;
                            let countCalculate = 0;
                            let countRecovery = 0;
                            if (studentPeriodValuationList.length > 0) {
                                for (let studentPeriodValuation of studentPeriodValuationList) {
                                    switch (studentPeriodValuation === null || studentPeriodValuation === void 0 ? void 0 : studentPeriodValuation.valuationType) {
                                        case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                                            countDefinitive++;
                                            break;
                                        case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                                            countCalculate++;
                                            break;
                                        case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                                            countRecovery++;
                                            break;
                                    }
                                }
                            }
                            let studentAreaPeriodValuationAux = null;
                            if (countCalculate > 0) {
                                for (let studentAreaPeriodValuation of studentPeriodValuationList) {
                                    if ((studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                                        studentAreaPeriodValuationAux = studentAreaPeriodValuation;
                                    }
                                }
                            }
                            if (countDefinitive > 0) {
                                for (let studentAreaPeriodValuation of studentPeriodValuationList) {
                                    if ((studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE)) {
                                        studentAreaPeriodValuationAux = studentAreaPeriodValuation;
                                    }
                                }
                            }
                            if (countRecovery > 0) {
                                for (let studentAreaPeriodValuation of studentPeriodValuationList) {
                                    if ((studentAreaPeriodValuation === null || studentAreaPeriodValuation === void 0 ? void 0 : studentAreaPeriodValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                                        studentAreaPeriodValuationAux = studentAreaPeriodValuation;
                                    }
                                }
                            }
                            switch (performanceLevelType) {
                                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                    let performanceLevelIndex = ((_u = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges) === null || _u === void 0 ? void 0 : _u.findIndex((i) => i.node.id.toString() === (studentAreaPeriodValuationAux === null || studentAreaPeriodValuationAux === void 0 ? void 0 : studentAreaPeriodValuationAux.performanceLevelId))) + 1;
                                    assessmentYear += academicPeriodPercentage * performanceLevelIndex;
                                    break;
                                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                    if (studentAreaPeriodValuationAux === null || studentAreaPeriodValuationAux === void 0 ? void 0 : studentAreaPeriodValuationAux.assessment) {
                                        assessmentYear +=
                                            academicPeriodPercentage * (studentAreaPeriodValuationAux === null || studentAreaPeriodValuationAux === void 0 ? void 0 : studentAreaPeriodValuationAux.assessment);
                                    }
                                    break;
                            }
                            let studentYearValuations = await this.repositoryAcademicAreaCourseYearValuation.findBy({
                                where: {
                                    academicAreaId: (_v = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _v === void 0 ? void 0 : _v.toString(),
                                    schoolYearId,
                                    studentId,
                                },
                            });
                            countDefinitive = 0;
                            countCalculate = 0;
                            countRecovery = 0;
                            if ((studentYearValuations === null || studentYearValuations === void 0 ? void 0 : studentYearValuations.length) > 1) {
                                let valuationType = 'CALCULATE';
                                if (studentYearValuations.length > 1) {
                                    for (let studentAreaYearValuation of studentYearValuations) {
                                        switch (studentAreaYearValuation === null || studentAreaYearValuation === void 0 ? void 0 : studentAreaYearValuation.valuationType) {
                                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                                                countDefinitive++;
                                                break;
                                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                                                countCalculate++;
                                                break;
                                            case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                                                countRecovery++;
                                                break;
                                        }
                                    }
                                    if (countCalculate > 1) {
                                        for (let studentAreaYearValuation of studentYearValuations) {
                                            if ((studentAreaYearValuation === null || studentAreaYearValuation === void 0 ? void 0 : studentAreaYearValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                                                let result = await this.repositoryAcademicAreaCourseYearValuation.deleteOne({ _id: new mongodb_1.ObjectId((_w = studentAreaYearValuation === null || studentAreaYearValuation === void 0 ? void 0 : studentAreaYearValuation.id) === null || _w === void 0 ? void 0 : _w.toString()) });
                                            }
                                        }
                                        studentYearValuations = [];
                                    }
                                    if (countRecovery > 1) {
                                        for (let studentAreaYearValuation of studentYearValuations) {
                                            if ((studentAreaYearValuation === null || studentAreaYearValuation === void 0 ? void 0 : studentAreaYearValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                                                let result = await this.repositoryAcademicAreaCourseYearValuation.deleteOne({ _id: new mongodb_1.ObjectId((_x = studentAreaYearValuation === null || studentAreaYearValuation === void 0 ? void 0 : studentAreaYearValuation.id) === null || _x === void 0 ? void 0 : _x.toString()) });
                                            }
                                        }
                                        studentYearValuations = [];
                                    }
                                }
                            }
                            if (countDefinitive == 0 && countRecovery == 0) {
                                let studentYearValuation;
                                if (studentYearValuations.length > 0) {
                                    studentYearValuation = studentYearValuations[0];
                                    if (studentYearValuation.valuationType == null) {
                                        studentYearValuation.valuationType = ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE;
                                    }
                                }
                                else {
                                    studentYearValuation = new AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation();
                                    studentYearValuation.version = 0;
                                    studentYearValuation.active = true;
                                    studentYearValuation.studentId = studentId;
                                    studentYearValuation.schoolYearId = schoolYearId;
                                    studentYearValuation.academicAreaId = (_y = academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) === null || _y === void 0 ? void 0 : _y.toString();
                                    studentYearValuation.assessment = 0;
                                    studentYearValuation.valuationType = ValuationType_1.ValuationType.CALCULATE;
                                }
                                switch (performanceLevelType) {
                                    case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                        let averagePerfomanceLevel = Number(assessmentYear.toFixed(0));
                                        studentYearValuation.performanceLevelId =
                                            (_0 = (_z = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges[averagePerfomanceLevel - 1]) === null || _z === void 0 ? void 0 : _z.node) === null || _0 === void 0 ? void 0 : _0.id.toString();
                                        break;
                                    case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                        let perf = null;
                                        if (countPeriod == (academicPeriods === null || academicPeriods === void 0 ? void 0 : academicPeriods.length)) {
                                            assessmentYear = Number(assessmentYear.toFixed(countDigitsPerformanceLevel));
                                        }
                                        studentYearValuation.assessment = Number(assessmentYear.toFixed(countDigitsPerformanceLevel));
                                        perf = (_1 = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges) === null || _1 === void 0 ? void 0 : _1.find((c) => {
                                            return (assessmentYear < c.node.topScore && assessmentYear >= c.node.minimumScore);
                                        });
                                        if (perf === undefined) {
                                            perf = (_2 = performanceLevelsFinal === null || performanceLevelsFinal === void 0 ? void 0 : performanceLevelsFinal.edges) === null || _2 === void 0 ? void 0 : _2.find((c) => {
                                                return (assessmentYear <= c.node.topScore && assessmentYear > c.node.minimumScore);
                                            });
                                        }
                                        if (perf && ((_3 = perf === null || perf === void 0 ? void 0 : perf.node) === null || _3 === void 0 ? void 0 : _3.id)) {
                                            studentYearValuation.performanceLevelId = perf.node.id.toString();
                                        }
                                        break;
                                }
                                if (studentYearValuation.id) {
                                    studentYearValuation = await this.repositoryAcademicAreaCourseYearValuation.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(studentYearValuation.id.toString()) }, studentYearValuation), { version: (studentYearValuation === null || studentYearValuation === void 0 ? void 0 : studentYearValuation.version) + 1 }));
                                }
                                else {
                                    studentYearValuation = await this.repositoryAcademicAreaCourseYearValuation.save(Object.assign({}, studentYearValuation));
                                }
                            }
                        }
                    }
                }
                let promisesListStudents = [];
                for (let student of students) {
                    await this.createAverageYearValuationStudent((_4 = course === null || course === void 0 ? void 0 : course.id) === null || _4 === void 0 ? void 0 : _4.toString(), schoolYearId, schoolId, student + '');
                }
                await Promise.all(promisesListStudents).then(async () => {
                    return true;
                });
            }
        }
    }
    async createAverageYearValuationStudent(courseId, schoolYearId, schoolId, studentId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        console.log('courseId', courseId);
        console.log('schoolYearId', schoolYearId);
        console.log('schoolId', schoolId);
        console.log('studentId', studentId);
        let schoolConfigurationPromotedIndicate = await this.repositorySchoolConfiguration.findBy({
            where: { schoolId, code: 'PROMOTED_INDICATE', active: true },
        });
        let schoolConfigurationCountPromotedIndicate = await this.repositorySchoolConfiguration.findBy({
            where: { schoolId, code: 'COUNT_PROMOTED_INDICATE', active: true },
        });
        let promotedIndicate = 'AREA';
        if ((schoolConfigurationPromotedIndicate === null || schoolConfigurationPromotedIndicate === void 0 ? void 0 : schoolConfigurationPromotedIndicate.length) > 0) {
            promotedIndicate = ((_a = schoolConfigurationPromotedIndicate[0]) === null || _a === void 0 ? void 0 : _a.valueString)
                ? (_b = schoolConfigurationPromotedIndicate[0]) === null || _b === void 0 ? void 0 : _b.valueString
                : 'AREA';
        }
        let countPromotedIndicate = 1;
        if ((schoolConfigurationCountPromotedIndicate === null || schoolConfigurationCountPromotedIndicate === void 0 ? void 0 : schoolConfigurationCountPromotedIndicate.length) > 0) {
            countPromotedIndicate = ((_c = schoolConfigurationCountPromotedIndicate[0]) === null || _c === void 0 ? void 0 : _c.valueNumber)
                ? (_d = schoolConfigurationCountPromotedIndicate[0]) === null || _d === void 0 ? void 0 : _d.valueNumber
                : 0;
        }
        let countNoPromotedArea = 0;
        let countNoPromotedAsignature = 0;
        let countDigitsPerformanceLevel = 2;
        let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
            where: { schoolId: schoolId, code: 'COUNT_DIGITS_AVERAGE_STUDENT', active: true },
        });
        if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
            countDigitsPerformanceLevel = ((_e = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _e === void 0 ? void 0 : _e.valueNumber)
                ? (_f = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _f === void 0 ? void 0 : _f.valueNumber
                : 2;
        }
        let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({
            where: { courseId: courseId, active: true },
        });
        let areasAux = [];
        let hourlyIntensityAreaAux = new Array();
        let asignaturesAux = [];
        for (let asignatureCourse of academicAsignaturesCourses) {
            let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId);
            let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
            if (academicArea !== null) {
                asignaturesAux.push(academicAsignature);
                areasAux.push(academicArea);
            }
        }
        const ids = areasAux.map((o) => { var _a; return (_a = o.id) === null || _a === void 0 ? void 0 : _a.toString(); });
        const count = {};
        ids.forEach((element) => {
            count[element] = (count[element] || 0) + 1;
        });
        const filtered = areasAux.filter(({ id }, index) => !ids.includes(id === null || id === void 0 ? void 0 : id.toString(), index + 1));
        for (let filter of filtered) {
            filter.count = count[filter === null || filter === void 0 ? void 0 : filter.id];
        }
        let average = 0;
        let performanceLevelType = null;
        let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, ((_h = (_g = academicAsignaturesCourses[0]) === null || _g === void 0 ? void 0 : _g.id) === null || _h === void 0 ? void 0 : _h.toString()) + '');
        if (performanceLevels) {
            performanceLevelType = (_k = (_j = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _j === void 0 ? void 0 : _j.node) === null || _k === void 0 ? void 0 : _k.type;
        }
        let hourlyIntensityTotal = 0;
        for (let area of filtered) {
            let hourlyIntensityArea = 0;
            for (let asignatureCourse of academicAsignaturesCourses) {
                let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.academicAsignatureId);
                let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature === null || academicAsignature === void 0 ? void 0 : academicAsignature.academicAreaId);
                if ((academicArea === null || academicArea === void 0 ? void 0 : academicArea.id) == ((_l = area === null || area === void 0 ? void 0 : area.id) === null || _l === void 0 ? void 0 : _l.toString())) {
                    hourlyIntensityArea += (asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.hourlyIntensity)
                        ? asignatureCourse === null || asignatureCourse === void 0 ? void 0 : asignatureCourse.hourlyIntensity
                        : 0;
                }
            }
            hourlyIntensityTotal += hourlyIntensityArea;
            let averageArea = 0;
            let studentAreaYearValuationList = await this.repositoryAcademicAreaCourseYearValuation.findBy({
                where: {
                    academicAreaId: (_m = area === null || area === void 0 ? void 0 : area.id) === null || _m === void 0 ? void 0 : _m.toString(),
                    schoolYearId,
                    studentId,
                },
            });
            let countDefinitive = 0;
            let countCalculate = 0;
            let countRecovery = 0;
            for (let studentAsignatureYearValuation of studentAreaYearValuationList) {
                switch (studentAsignatureYearValuation === null || studentAsignatureYearValuation === void 0 ? void 0 : studentAsignatureYearValuation.valuationType) {
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE:
                        countDefinitive++;
                        break;
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE:
                        countCalculate++;
                        break;
                    case ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY:
                        countRecovery++;
                        break;
                }
            }
            let studentAsignatureYearValuationAux = null;
            if (countCalculate > 0) {
                for (let studentAsignatureYearValuation of studentAreaYearValuationList) {
                    if ((studentAsignatureYearValuation === null || studentAsignatureYearValuation === void 0 ? void 0 : studentAsignatureYearValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.CALCULATE)) {
                        studentAsignatureYearValuationAux = studentAsignatureYearValuation;
                    }
                }
            }
            if (countDefinitive > 0) {
                for (let studentAsignatureYearValuation of studentAreaYearValuationList) {
                    if ((studentAsignatureYearValuation === null || studentAsignatureYearValuation === void 0 ? void 0 : studentAsignatureYearValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.DEFINITIVE)) {
                        studentAsignatureYearValuationAux = studentAsignatureYearValuation;
                    }
                }
            }
            if (countRecovery > 0) {
                for (let studentAsignatureYearValuation of studentAreaYearValuationList) {
                    if ((studentAsignatureYearValuation === null || studentAsignatureYearValuation === void 0 ? void 0 : studentAsignatureYearValuation.valuationType) == (ValuationType_1.ValuationType === null || ValuationType_1.ValuationType === void 0 ? void 0 : ValuationType_1.ValuationType.RECOVERY)) {
                        studentAsignatureYearValuationAux = studentAsignatureYearValuation;
                    }
                }
            }
            let performanceLevel = (_o = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _o === void 0 ? void 0 : _o.find((i) => {
                var _a;
                return i.node.id.toString() ===
                    ((_a = studentAsignatureYearValuationAux === null || studentAsignatureYearValuationAux === void 0 ? void 0 : studentAsignatureYearValuationAux.performanceLevelId) === null || _a === void 0 ? void 0 : _a.toString());
            });
            if ((_p = performanceLevel === null || performanceLevel === void 0 ? void 0 : performanceLevel.node) === null || _p === void 0 ? void 0 : _p.isRecovery) {
                countNoPromotedArea += 1;
                console.log('area', area);
                console.log('studentAsignatureYearValuationAux', studentAsignatureYearValuationAux);
                console.log('performanceLevel', performanceLevel);
            }
            console.log('countNoPromotedArea', countNoPromotedArea);
            switch (performanceLevelType) {
                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                    let performanceLevelIndex = ((_q = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _q === void 0 ? void 0 : _q.findIndex((i) => {
                        var _a;
                        return i.node.id.toString() ===
                            ((_a = studentAsignatureYearValuationAux === null || studentAsignatureYearValuationAux === void 0 ? void 0 : studentAsignatureYearValuationAux.performanceLevelId) === null || _a === void 0 ? void 0 : _a.toString());
                    })) + 1;
                    averageArea = performanceLevelIndex;
                    average += averageArea * hourlyIntensityArea;
                    break;
                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                    averageArea = (studentAsignatureYearValuationAux === null || studentAsignatureYearValuationAux === void 0 ? void 0 : studentAsignatureYearValuationAux.assessment)
                        ? studentAsignatureYearValuationAux === null || studentAsignatureYearValuationAux === void 0 ? void 0 : studentAsignatureYearValuationAux.assessment
                        : 0;
                    average += averageArea * hourlyIntensityArea;
                    break;
            }
        }
        average = average / hourlyIntensityTotal;
        let perf = null;
        let performanceLevelId = undefined;
        let averageAcademicYearStudent;
        let averageAcademicYearStudentList = await this.repositoryAverageAcademicYearStudent.findBy({
            where: {
                courseId,
                schoolYearId,
                studentId,
            },
        });
        console.log('averageAcademicYearStudentList', averageAcademicYearStudentList === null || averageAcademicYearStudentList === void 0 ? void 0 : averageAcademicYearStudentList.length);
        if (averageAcademicYearStudentList.length > 1) {
            console.log('elminando repetidos');
            for (let averageAcademicYearStudents of averageAcademicYearStudentList) {
                console.log('elminando repetidos', (_r = averageAcademicYearStudents === null || averageAcademicYearStudents === void 0 ? void 0 : averageAcademicYearStudents.id) === null || _r === void 0 ? void 0 : _r.toString());
                let result = await this.repositoryAverageAcademicYearStudent.deleteOne({
                    _id: new mongodb_1.ObjectId((_s = averageAcademicYearStudents === null || averageAcademicYearStudents === void 0 ? void 0 : averageAcademicYearStudents.id) === null || _s === void 0 ? void 0 : _s.toString()),
                });
                console.log('result', result);
            }
            averageAcademicYearStudentList = [];
        }
        console.log('averageAcademicYearStudentList', averageAcademicYearStudentList === null || averageAcademicYearStudentList === void 0 ? void 0 : averageAcademicYearStudentList.length);
        if (averageAcademicYearStudentList.length > 0) {
            averageAcademicYearStudent = averageAcademicYearStudentList[0];
        }
        else {
            averageAcademicYearStudent = new AverageAcademicPeriodStudent_1.AverageAcademicPeriodStudent();
            averageAcademicYearStudent.version = 0;
            averageAcademicYearStudent.active = true;
            averageAcademicYearStudent.studentId = studentId;
            averageAcademicYearStudent.schoolYearId = schoolYearId;
            averageAcademicYearStudent.courseId = courseId;
            averageAcademicYearStudent.assessment = 0;
            averageAcademicYearStudent.promoted = true;
        }
        console.log('countNoPromotedArea', countNoPromotedArea);
        console.log('countPromotedIndicate', countPromotedIndicate);
        if (countNoPromotedArea >= countPromotedIndicate) {
            averageAcademicYearStudent.promoted = false;
        }
        else {
            averageAcademicYearStudent.promoted = true;
        }
        if (Number.isNaN(average) || average < 0) {
            averageAcademicYearStudent.assessment = 0;
        }
        else {
            switch (performanceLevelType) {
                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                    let averagePerfomanceLevel = Number(average.toFixed(0));
                    averageAcademicYearStudent.performanceLevelId =
                        (_u = (_t = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel - 1]) === null || _t === void 0 ? void 0 : _t.node) === null || _u === void 0 ? void 0 : _u.id.toString();
                    averageAcademicYearStudent.assessment = average;
                    break;
                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                    average = Number(average.toFixed(countDigitsPerformanceLevel));
                    averageAcademicYearStudent.assessment = average;
                    perf = (_v = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _v === void 0 ? void 0 : _v.find((c) => {
                        return average < c.node.topScore && average >= c.node.minimumScore;
                    });
                    if (perf === undefined) {
                        perf = (_w = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _w === void 0 ? void 0 : _w.find((c) => {
                            return average <= c.node.topScore && average > c.node.minimumScore;
                        });
                    }
                    if (perf && ((_x = perf === null || perf === void 0 ? void 0 : perf.node) === null || _x === void 0 ? void 0 : _x.id)) {
                        performanceLevelId = perf.node.id;
                    }
                    averageAcademicYearStudent.performanceLevelId = performanceLevelId;
                    break;
            }
        }
        if (averageAcademicYearStudent.id) {
            averageAcademicYearStudent = await this.repositoryAverageAcademicYearStudent.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(averageAcademicYearStudent.id.toString()) }, averageAcademicYearStudent), { version: (averageAcademicYearStudent === null || averageAcademicYearStudent === void 0 ? void 0 : averageAcademicYearStudent.version) + 1 }));
        }
        else {
            averageAcademicYearStudent = await this.repositoryAverageAcademicYearStudent.save(Object.assign({}, averageAcademicYearStudent));
        }
        await this.createAverageYearValuationCourse(courseId, schoolYearId);
        await this.createAverageBehaviourYearValuationCourse(courseId, schoolYearId);
        return true;
    }
    async createAverageYearValuationCourse(courseId, schoolYearId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let countDigitsPerformanceLevel = 2;
        const course = await this.repositoryCourse.findOneBy(courseId);
        if (course) {
            let averageAcademicYearStudentList = await this.repositoryAverageAcademicYearStudent.findBy({
                where: {
                    courseId,
                    schoolYearId,
                    studentId: { $in: course === null || course === void 0 ? void 0 : course.studentsId },
                },
                order: { assessment: -1 },
            });
            let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                where: { schoolId: course === null || course === void 0 ? void 0 : course.schoolId, code: 'COUNT_DIGITS_AVERAGE_COURSE', active: true },
            });
            if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                countDigitsPerformanceLevel = ((_a = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _a === void 0 ? void 0 : _a.valueNumber)
                    ? (_b = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _b === void 0 ? void 0 : _b.valueNumber
                    : 2;
            }
            let average = 0;
            let performanceLevelType = null;
            let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({
                where: { courseId: courseId },
            });
            let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, ((_d = (_c = academicAsignaturesCourses[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString()) + '');
            if (performanceLevels) {
                performanceLevelType = (_f = (_e = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _e === void 0 ? void 0 : _e.node) === null || _f === void 0 ? void 0 : _f.type;
            }
            let auxCount = 1;
            for (let averageAcademicYearStudents of averageAcademicYearStudentList) {
                await this.repositoryAverageAcademicYearStudent.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(averageAcademicYearStudents.id.toString()) }, averageAcademicYearStudents), { score: auxCount, version: (averageAcademicYearStudents === null || averageAcademicYearStudents === void 0 ? void 0 : averageAcademicYearStudents.version) + 1 }));
                auxCount++;
                let averageStudent = 0;
                switch (performanceLevelType) {
                    case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                        let performanceLevelIndex = ((_g = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _g === void 0 ? void 0 : _g.findIndex((i) => i.node.id.toString() === (averageAcademicYearStudents === null || averageAcademicYearStudents === void 0 ? void 0 : averageAcademicYearStudents.performanceLevelId))) + 1;
                        averageStudent = performanceLevelIndex;
                        average += averageStudent;
                        break;
                    case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                        averageStudent = (averageAcademicYearStudents === null || averageAcademicYearStudents === void 0 ? void 0 : averageAcademicYearStudents.assessment)
                            ? averageAcademicYearStudents === null || averageAcademicYearStudents === void 0 ? void 0 : averageAcademicYearStudents.assessment
                            : 0;
                        average += averageStudent;
                        break;
                }
            }
            if ((course === null || course === void 0 ? void 0 : course.studentsId) && ((_h = course === null || course === void 0 ? void 0 : course.studentsId) === null || _h === void 0 ? void 0 : _h.length) > 0) {
                average = average / ((_j = course === null || course === void 0 ? void 0 : course.studentsId) === null || _j === void 0 ? void 0 : _j.length);
            }
            let perf = null;
            let performanceLevelId = undefined;
            let averageAcademicYearCourse;
            let averageAcademicYearCourseList = await this.repositoryAverageAcademicYearCourse.findBy({
                where: {
                    courseId,
                    schoolYearId,
                },
            });
            if (averageAcademicYearCourseList.length > 1) {
                for (let averageAcademicYearcourses of averageAcademicYearCourseList) {
                    let result = await this.repositoryAverageAcademicYearCourse.deleteOne({
                        _id: new mongodb_1.ObjectId((_k = averageAcademicYearcourses === null || averageAcademicYearcourses === void 0 ? void 0 : averageAcademicYearcourses.id) === null || _k === void 0 ? void 0 : _k.toString()),
                    });
                }
                averageAcademicYearCourseList = [];
            }
            if (averageAcademicYearCourseList.length > 0) {
                averageAcademicYearCourse = averageAcademicYearCourseList[0];
            }
            else {
                averageAcademicYearCourse = new AverageAcademicYearCourse_1.AverageAcademicYearCourse();
                averageAcademicYearCourse.version = 0;
                averageAcademicYearCourse.active = true;
                averageAcademicYearCourse.schoolYearId = schoolYearId;
                averageAcademicYearCourse.courseId = courseId;
                averageAcademicYearCourse.assessment = 0;
            }
            if (Number.isNaN(average) || average < 0) {
                averageAcademicYearCourse.assessment = 0;
            }
            switch (performanceLevelType) {
                case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                    let averagePerfomanceLevel = Number(average.toFixed(0));
                    averageAcademicYearCourse.performanceLevelId =
                        (_m = (_l = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel - 1]) === null || _l === void 0 ? void 0 : _l.node) === null || _m === void 0 ? void 0 : _m.id.toString();
                    averageAcademicYearCourse.assessment = average;
                    break;
                case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                    average = Number(average.toFixed(countDigitsPerformanceLevel));
                    averageAcademicYearCourse.assessment = average;
                    perf = (_o = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _o === void 0 ? void 0 : _o.find((c) => {
                        return average < c.node.topScore && average >= c.node.minimumScore;
                    });
                    if (perf === undefined) {
                        perf = (_p = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _p === void 0 ? void 0 : _p.find((c) => {
                            return average <= c.node.topScore && average > c.node.minimumScore;
                        });
                    }
                    if (perf && ((_q = perf === null || perf === void 0 ? void 0 : perf.node) === null || _q === void 0 ? void 0 : _q.id)) {
                        performanceLevelId = perf.node.id;
                    }
                    averageAcademicYearCourse.performanceLevelId = performanceLevelId;
                    break;
            }
            if (averageAcademicYearCourse.id) {
                averageAcademicYearCourse = await this.repositoryAverageAcademicYearCourse.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(averageAcademicYearCourse.id.toString()) }, averageAcademicYearCourse), { version: (averageAcademicYearCourse === null || averageAcademicYearCourse === void 0 ? void 0 : averageAcademicYearCourse.version) + 1 }));
            }
            else {
                averageAcademicYearCourse = await this.repositoryAverageAcademicYearCourse.save(Object.assign({}, averageAcademicYearCourse));
            }
            return true;
        }
    }
    async createAverageBehaviourYearValuationCourse(courseId, schoolYearId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const course = await this.repositoryCourse.findOneBy(courseId);
        let countDigitsPerformanceLevel = 2;
        let academicPeriods = await this.repositoryAcademicPeriod.findBy({
            where: {
                schoolYearId: schoolYearId,
                active: true,
            },
            order: { order: 1 },
        });
        if (course && academicPeriods) {
            let schoolConfigurationCountDigitsPerformanceLevel = await this.repositorySchoolConfiguration.findBy({
                where: {
                    schoolId: course === null || course === void 0 ? void 0 : course.schoolId,
                    code: 'COUNT_DIGITS_PERFORMANCE_LEVEL',
                    active: true,
                },
            });
            if ((schoolConfigurationCountDigitsPerformanceLevel === null || schoolConfigurationCountDigitsPerformanceLevel === void 0 ? void 0 : schoolConfigurationCountDigitsPerformanceLevel.length) > 0) {
                countDigitsPerformanceLevel = ((_a = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _a === void 0 ? void 0 : _a.valueNumber)
                    ? (_b = schoolConfigurationCountDigitsPerformanceLevel[0]) === null || _b === void 0 ? void 0 : _b.valueNumber
                    : 2;
            }
            let students = course.studentsId;
            if (students) {
                let academicAsignaturesCourses = await this.repositoryAcademicAsignatureCourse.findBy({
                    where: { courseId: courseId, active: true },
                });
                let performanceLevelType = null;
                let performanceLevels = await this.performanceLevelResolver.getAllPerformanceLevelAcademicAsignatureCourseFinal({}, ((_d = (_c = academicAsignaturesCourses[0]) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toString()) + '');
                if (performanceLevels) {
                    performanceLevelType = (_f = (_e = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[0]) === null || _e === void 0 ? void 0 : _e.node) === null || _f === void 0 ? void 0 : _f.type;
                }
                for (let student of students) {
                    let studentId = student;
                    let studentBehaviours = await this.repositoryStudentBehaviour.findBy({
                        where: { studentId: studentId, courseId: courseId },
                    });
                    let average = 0;
                    for (let studentBehaviour of studentBehaviours) {
                        let averageArea = 0;
                        switch (performanceLevelType) {
                            case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                let performanceLevelIndex = ((_g = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _g === void 0 ? void 0 : _g.findIndex((i) => i.node.id.toString() === (studentBehaviour === null || studentBehaviour === void 0 ? void 0 : studentBehaviour.performanceLevelId))) + 1;
                                averageArea = performanceLevelIndex;
                                average += averageArea * 1;
                                break;
                            case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                averageArea = (studentBehaviour === null || studentBehaviour === void 0 ? void 0 : studentBehaviour.assessment) ? studentBehaviour.assessment : 0;
                                average += averageArea * 1;
                                break;
                        }
                    }
                    average = average / (academicPeriods === null || academicPeriods === void 0 ? void 0 : academicPeriods.length);
                    let perf = null;
                    let performanceLevelId = undefined;
                    let averageYearStudent;
                    let averageAcademicYearStudentList = await this.repositoryStudentYearBehaviour.findBy({
                        where: {
                            courseId,
                            schoolYearId,
                            studentId,
                        },
                    });
                    if (averageAcademicYearStudentList.length > 1) {
                        for (let averageAcademicYearStudents of averageAcademicYearStudentList) {
                            let result = await this.repositoryStudentYearBehaviour.deleteOne({
                                _id: new mongodb_1.ObjectId((_h = averageAcademicYearStudents === null || averageAcademicYearStudents === void 0 ? void 0 : averageAcademicYearStudents.id) === null || _h === void 0 ? void 0 : _h.toString()),
                            });
                        }
                        averageAcademicYearStudentList = [];
                    }
                    if (averageAcademicYearStudentList.length > 0) {
                        averageYearStudent = averageAcademicYearStudentList[0];
                    }
                    else {
                        averageYearStudent = new StudentYearBehaviour_1.StudentYearBehaviour();
                        averageYearStudent.version = 0;
                        averageYearStudent.active = true;
                        averageYearStudent.studentId = studentId;
                        averageYearStudent.schoolYearId = schoolYearId;
                        averageYearStudent.courseId = courseId;
                        averageYearStudent.assessment = 0;
                    }
                    if (Number.isNaN(average) || average < 0) {
                        averageYearStudent.assessment = 0;
                    }
                    else {
                        switch (performanceLevelType) {
                            case PerformanceLevelType_1.PerformanceLevelType.QUALITATIVE:
                                let averagePerfomanceLevel = Number(average.toFixed(0));
                                averageYearStudent.performanceLevelId =
                                    (_k = (_j = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges[averagePerfomanceLevel - 1]) === null || _j === void 0 ? void 0 : _j.node) === null || _k === void 0 ? void 0 : _k.id.toString();
                                averageYearStudent.assessment = average;
                                break;
                            case PerformanceLevelType_1.PerformanceLevelType.QUANTITATIVE:
                                average = Number(average.toFixed(countDigitsPerformanceLevel));
                                averageYearStudent.assessment = average;
                                perf = (_l = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _l === void 0 ? void 0 : _l.find((c) => {
                                    return average < c.node.topScore && average >= c.node.minimumScore;
                                });
                                if (perf === undefined) {
                                    perf = (_m = performanceLevels === null || performanceLevels === void 0 ? void 0 : performanceLevels.edges) === null || _m === void 0 ? void 0 : _m.find((c) => {
                                        return average <= c.node.topScore && average > c.node.minimumScore;
                                    });
                                }
                                if (perf && ((_o = perf === null || perf === void 0 ? void 0 : perf.node) === null || _o === void 0 ? void 0 : _o.id)) {
                                    performanceLevelId = perf.node.id;
                                }
                                averageYearStudent.performanceLevelId = performanceLevelId;
                                break;
                        }
                    }
                    if (averageYearStudent.id) {
                        averageYearStudent = await this.repositoryStudentYearBehaviour.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(averageYearStudent.id.toString()) }, averageYearStudent), { version: (averageYearStudent === null || averageYearStudent === void 0 ? void 0 : averageYearStudent.version) + 1 }));
                    }
                    else {
                        averageYearStudent = await this.repositoryStudentYearBehaviour.save(Object.assign({}, averageYearStudent));
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
    async academicAsignatureCourse(data) {
        let id = data.academicAsignatureCourseId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryAcademicAsignatureCourse.findOneBy(id);
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
    async learnigs(data) {
        let ids = data.learningsId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryLearning.findBy({ where: { _id: { $in: dataIds } } });
            return result;
        }
        return null;
    }
    async evidenceLearnings(data) {
        let ids = data.evidenceLearningsId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryEvidenceLearning.findBy({
                where: { _id: { $in: dataIds } },
            });
            return result;
        }
        return null;
    }
    async evaluativeComponents(data) {
        let ids = data.evaluativeComponentsId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryEvaluativeComponent.findBy({
                where: { _id: { $in: dataIds } },
            });
            return result;
        }
        return null;
    }
};
exports.ExperienceLearningResolver = ExperienceLearningResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearning_1.ExperienceLearning),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Campus_1.Campus),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryCampus", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositorySchool", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Learning_1.Learning),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryLearning", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvidenceLearning_1.EvidenceLearning),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryEvidenceLearning", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourse_1.AcademicAsignatureCourse),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicAsignatureCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicPeriod_1.AcademicPeriod),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicPeriod", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(EvaluativeComponent_1.EvaluativeComponent),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryEvaluativeComponent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Course_1.Course),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicGrade_1.AcademicGrade),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicGrade", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningTraditionalValuation_1.ExperienceLearningTraditionalValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryExperienceLearningTraditionalValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningSelfAssessmentValuation_1.ExperienceLearningSelfAssessmentValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryExperienceLearningSelfAssessmentValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningCoEvaluation_1.ExperienceLearningCoEvaluation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryExperienceLearningCoEvaluation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningCoEvaluationValuation_1.ExperienceLearningCoEvaluationValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryExperienceLearningCoEvaluationValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningAverageValuation_1.ExperienceLearningAverageValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryExperienceLearningAverageValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCoursePeriodValuation_1.AcademicAsignatureCoursePeriodValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicAsignatureCoursePeriodValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAreaCoursePeriodValuation_1.AcademicAreaCoursePeriodValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicAreaCoursePeriodValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignatureCourseYearValuation_1.AcademicAsignatureCourseYearValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicAsignatureCourseYearValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicAreaCourseYearValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryExperienceLearningRubricCriteria", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningRubricCriteriaValuation_1.ExperienceLearningRubricCriteriaValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryExperienceLearningRubricCriteriaValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryExperienceLearningRubricValuation", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicAsignature_1.AcademicAsignature),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicAsignature", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(PerformanceLevel_1.PerformanceLevel),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryPerformanceLevel", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AcademicArea_1.AcademicArea),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAcademicArea", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AverageAcademicPeriodStudent_1.AverageAcademicPeriodStudent),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAverageAcademicPeriodStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAverageAcademicPeriodCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AverageAcademicYearStudent_1.AverageAcademicYearStudent),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAverageAcademicYearStudent", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(AverageAcademicYearCourse_1.AverageAcademicYearCourse),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryAverageAcademicYearCourse", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(StudentBehaviour_1.StudentBehaviour),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryStudentBehaviour", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(StudentYearBehaviour_1.StudentYearBehaviour),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositoryStudentYearBehaviour", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolConfiguration_1.SchoolConfiguration),
    __metadata("design:type", Object)
], ExperienceLearningResolver.prototype, "repositorySchoolConfiguration", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => ExperienceLearning_1.ExperienceLearning, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "getExperienceLearning", null);
__decorate([
    (0, type_graphql_1.Query)(() => ExperienceLearning_1.ExperienceLearningConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __param(3, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(4, (0, type_graphql_1.Arg)('campusId', () => String)),
    __param(5, (0, type_graphql_1.Arg)('academicPeriodId', () => String, { nullable: true })),
    __param(6, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean, String, Boolean,
        String,
        String,
        String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "getAllExperienceLearning", null);
__decorate([
    (0, type_graphql_1.Query)(() => ExperienceLearning_1.ExperienceLearningConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __param(3, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(4, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __param(5, (0, type_graphql_1.Arg)('academicPeriodId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean, String, Boolean,
        String,
        String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "getAllExperienceLearningWhitoutCampusId", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ExperienceLearning_1.ExperienceLearning),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewExperienceLearning_1.NewExperienceLearning, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createExperienceLearning", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ExperienceLearning_1.ExperienceLearning),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewExperienceLearning_1.NewExperienceLearning, String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updateExperienceLearning", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "changeActiveExperienceLearning", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "deleteExperienceLearning", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createExperienceLearningTraditionalValuationStudents", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createExperienceLearningSelfAssessmentValuationStudents", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createExperienceLearningCoEvaluationStudents", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createExperienceLearningCoEvaluationValuationStudents", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createExperienceLearningRubricStudents", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ExperienceLearningValuation_1.ExperienceLearningValuation], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "getValuationStudents", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('evaluativeComponentId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('studentId', () => String)),
    __param(4, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createExperienceLearningAverageValuationStudent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('evaluativeComponentId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createExperienceLearningAverageValuationStudents", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updateAllStudentSchoolPeriodValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicGradeId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updateAllStudentGradePeriodValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updateAllStudentCoursePeriodValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updateAllStudentAcademicAsignatureCoursePeriodValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('studentId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAcademicAsignatureCoursePeriodValuationStudentBulk", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('studentId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAcademicAsignatureCoursePeriodValuationStudent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('studentId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAcademicAreaCoursePeriodValuationStudent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updateAllAverageStudentCoursePeriod", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('studentId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAveragePeriodValuationStudent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAveragePeriodValuationCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicAsignatureCourseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('academicPeriodId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('experienceLearningType', () => ExperienceLearningType_1.ExperienceLearningType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAcademicAsignatureCoursePeriodValuationStudents", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('academicGradeId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updateAllStudentGradeYearValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updateAllStudentCourseYearValuation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __param(2, (0, type_graphql_1.Arg)('schoolId', () => String)),
    __param(3, (0, type_graphql_1.Arg)('studentId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAverageYearValuationStudent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAverageYearValuationCourse", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('courseId', () => String)),
    __param(1, (0, type_graphql_1.Arg)('schoolYearId', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createAverageBehaviourYearValuationCourse", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearning_1.ExperienceLearning]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearning_1.ExperienceLearning]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Campus_1.Campus, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearning_1.ExperienceLearning]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "campus", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicAsignatureCourse_1.AcademicAsignatureCourse, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearning_1.ExperienceLearning]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "academicAsignatureCourse", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => AcademicPeriod_1.AcademicPeriod, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearning_1.ExperienceLearning]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "academicPeriod", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [Learning_1.Learning], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearning_1.ExperienceLearning]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "learnigs", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [EvidenceLearning_1.EvidenceLearning], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearning_1.ExperienceLearning]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "evidenceLearnings", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [EvaluativeComponent_1.EvaluativeComponent], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExperienceLearning_1.ExperienceLearning]),
    __metadata("design:returntype", Promise)
], ExperienceLearningResolver.prototype, "evaluativeComponents", null);
exports.ExperienceLearningResolver = ExperienceLearningResolver = __decorate([
    (0, type_graphql_1.Resolver)(ExperienceLearning_1.ExperienceLearning)
], ExperienceLearningResolver);
