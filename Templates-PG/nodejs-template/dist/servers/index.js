"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const disabled_1 = require("@apollo/server/plugin/disabled");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const middleware_1 = require("graphql-voyager/middleware");
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
require("reflect-metadata");
const config_1 = require("../config");
const buildFederatedSchema_1 = require("../graphql/helpers/buildFederatedSchema");
const error_logger_1 = require("../graphql/middlewares/error-logger");
const log_access_1 = require("../graphql/middlewares/log-access");
const resolve_time_1 = require("../graphql/middlewares/resolve-time");
const AcademicAreaCoursePeriodValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/AcademicAreaCoursePeriodValuationResolver");
const AcademicAreaCourseYearValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/AcademicAreaCourseYearValuationResolver");
const AcademicAsignatureCoursePeriodEvidenceLearningValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/AcademicAsignatureCoursePeriodEvidenceLearningValuationResolver");
const AcademicAsignatureCoursePeriodValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/AcademicAsignatureCoursePeriodValuationResolver");
const AcademicAsignatureCourseResolver_1 = require("../graphql/resolvers/CampusAdministrator/AcademicAsignatureCourseResolver");
const AcademicAsignatureCourseYearValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/AcademicAsignatureCourseYearValuationResolver");
const AcademicHourResolver_1 = require("../graphql/resolvers/CampusAdministrator/AcademicHourResolver");
const AcademicScheduleResolver_1 = require("../graphql/resolvers/CampusAdministrator/AcademicScheduleResolver");
const AverageAcademicPeriodStudentResolver_1 = require("../graphql/resolvers/CampusAdministrator/AverageAcademicPeriodStudentResolver");
const AverageAcademicYearCourseResolver_1 = require("../graphql/resolvers/CampusAdministrator/AverageAcademicYearCourseResolver");
const AverageAcademicYearStudentResolver_1 = require("../graphql/resolvers/CampusAdministrator/AverageAcademicYearStudentResolver");
const ClassroomPlanExpectedPerformanceResolver_1 = require("../graphql/resolvers/CampusAdministrator/ClassroomPlanExpectedPerformanceResolver");
const ClassroomPlanPerformanceAppraisalStrategyResolver_1 = require("../graphql/resolvers/CampusAdministrator/ClassroomPlanPerformanceAppraisalStrategyResolver");
const ClassroomPlanResolver_1 = require("../graphql/resolvers/CampusAdministrator/ClassroomPlanResolver");
const ExperienceLearningAverageValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningAverageValuationResolver");
const ExperienceLearningCoEvaluationResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningCoEvaluationResolver");
const ExperienceLearningCoEvaluationValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningCoEvaluationValuationResolver");
const ExperienceLearningPerformanceLevelResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningPerformanceLevelResolver");
const ExperienceLearningResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningResolver");
const ExperienceLearningRubricCriteriaPerformanceLevelResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningRubricCriteriaPerformanceLevelResolver");
const ExperienceLearningRubricCriteriaResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningRubricCriteriaResolver");
const ExperienceLearningRubricCriteriaValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningRubricCriteriaValuationResolver");
const ExperienceLearningRubricValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningRubricValuationResolver");
const ExperienceLearningSelfAssessmentValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningSelfAssessmentValuationResolver");
const ExperienceLearningTraditionalValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningTraditionalValuationResolver");
const ExperienceLearningValuationResolver_1 = require("../graphql/resolvers/CampusAdministrator/ExperienceLearningValuationResolver");
const ForumInteractionResolver_1 = require("../graphql/resolvers/CampusAdministrator/ForumInteractionResolver");
const ForumQuestionResolver_1 = require("../graphql/resolvers/CampusAdministrator/ForumQuestionResolver");
const ForumResolver_1 = require("../graphql/resolvers/CampusAdministrator/ForumResolver");
const QuestionBankTestOnlineResolver_1 = require("../graphql/resolvers/CampusAdministrator/QuestionBankTestOnlineResolver");
const QuestionCategoryTestOnlineResolver_1 = require("../graphql/resolvers/CampusAdministrator/QuestionCategoryTestOnlineResolver");
const QuestionTestOnlineResolver_1 = require("../graphql/resolvers/CampusAdministrator/QuestionTestOnlineResolver");
const StudentAttendanceResolver_1 = require("../graphql/resolvers/CampusAdministrator/StudentAttendanceResolver");
const StudentBehaviourResolver_1 = require("../graphql/resolvers/CampusAdministrator/StudentBehaviourResolver");
const StudentObserverAnnotationResolver_1 = require("../graphql/resolvers/CampusAdministrator/StudentObserverAnnotationResolver");
const StudentYearBehaviourResolver_1 = require("../graphql/resolvers/CampusAdministrator/StudentYearBehaviourResolver");
const AuditLoginResolver_1 = require("../graphql/resolvers/GeneralAdministrator/AuditLoginResolver");
const BackupResolver_1 = require("../graphql/resolvers/GeneralAdministrator/BackupResolver");
const GenderResolver_1 = require("../graphql/resolvers/GeneralAdministrator/GenderResolver");
const GeneralAcademicAsignatureResolver_1 = require("../graphql/resolvers/GeneralAdministrator/GeneralAcademicAsignatureResolver");
const GeneralBasicLearningRightResolver_1 = require("../graphql/resolvers/GeneralAdministrator/GeneralBasicLearningRightResolver");
const ImportDataSchoolResolver_1 = require("../graphql/resolvers/GeneralAdministrator/ImportDataSchoolResolver");
const SchoolAdministrativeResolver_1 = require("../graphql/resolvers/GeneralAdministrator/SchoolAdministrativeResolver");
const VideoTutorialResolver_1 = require("../graphql/resolvers/GeneralAdministrator/VideoTutorialResolver");
const CertificateFinalReport_1 = require("../graphql/resolvers/SchoolAdministrator/CertificateFinalReport");
const EvidenceLearningResolver_1 = require("../graphql/resolvers/SchoolAdministrator/EvidenceLearningResolver");
const LearningResolver_1 = require("../graphql/resolvers/SchoolAdministrator/LearningResolver");
const ObserverAnnotationTypeResolver_1 = require("../graphql/resolvers/SchoolAdministrator/ObserverAnnotationTypeResolver");
const PerformanceFinalReportResolver_1 = require("../graphql/resolvers/SchoolAdministrator/PerformanceFinalReportResolver");
const PerformanceReportResolver_1 = require("../graphql/resolvers/SchoolAdministrator/PerformanceReportResolver");
const SchoolConfigurationResolver_1 = require("../graphql/resolvers/SchoolAdministrator/SchoolConfigurationResolver");
const SyncOfflineResolver_1 = require("../graphql/resolvers/SchoolAdministrator/SyncOfflineResolver");
const AcademicDayResolver_1 = require("./../graphql/resolvers/CampusAdministrator/AcademicDayResolver");
const CourseResolver_1 = require("./../graphql/resolvers/CampusAdministrator/CourseResolver");
const GuardianResolver_1 = require("./../graphql/resolvers/CampusAdministrator/GuardianResolver");
const TeacherResolver_1 = require("./../graphql/resolvers/CampusAdministrator/TeacherResolver");
const CampusResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/CampusResolver");
const DocumentTypeResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/DocumentTypeResolver");
const EmailResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/EmailResolver");
const GeneralAcademicAreaResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/GeneralAcademicAreaResolver");
const GeneralAcademicCycleResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/GeneralAcademicCycleResolver");
const GeneralAcademicGradeResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/GeneralAcademicGradeResolver");
const GeneralAcademicStandardResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/GeneralAcademicStandardResolver");
const GeneralPerformanceLevelResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/GeneralPerformanceLevelResolver");
const InboxResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/InboxResolver");
const MenuItemResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/MenuItemResolver");
const MenuResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/MenuResolver");
const ModuleResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/ModuleResolver");
const MunicipalityResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/MunicipalityResolver");
const NotificationResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/NotificationResolver");
const RoleResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/RoleResolver");
const SchoolAdministratorResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/SchoolAdministratorResolver");
const SchoolResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/SchoolResolver");
const StudentResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/StudentResolver");
const UserResolver_1 = require("./../graphql/resolvers/GeneralAdministrator/UserResolver");
const AcademicAreaResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/AcademicAreaResolver");
const AcademicAsignatureResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/AcademicAsignatureResolver");
const AcademicGradeResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/AcademicGradeResolver");
const AcademicPeriodResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/AcademicPeriodResolver");
const AcademicStandardResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/AcademicStandardResolver");
const CampusAdministratorResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/CampusAdministratorResolver");
const CampusCoordinatorResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/CampusCoordinatorResolver");
const EducationLevelResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/EducationLevelResolver");
const EvaluativeComponentResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/EvaluativeComponentResolver");
const GradeAssignmentResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/GradeAssignmentResolver");
const ModalityResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/ModalityResolver");
const PerformanceLevelResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/PerformanceLevelResolver");
const SchoolYearResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/SchoolYearResolver");
const SpecialtyResolver_1 = require("./../graphql/resolvers/SchoolAdministrator/SpecialtyResolver");
const DataSource_1 = require("./DataSource");
const PORT = config_1.SERVER_PORT_APP;
const SERVER_NAME = config_1.SERVER_NAME_APP;
const cluster = require('node:cluster');
const numCPUs = process_1.env.NODE_ENV === 'development' ? 1 : 1;
const expressHealthApi = require('express-health-api');
async function app() {
    try {
        const federatedSchema = await (0, buildFederatedSchema_1.buildFederatedSchema)({
            resolvers: [
                AuditLoginResolver_1.AuditLoginResolver,
                DocumentTypeResolver_1.DocumentTypeResolver,
                EmailResolver_1.EmailResolver,
                GenderResolver_1.GenderResolver,
                InboxResolver_1.InboxResolver,
                MenuResolver_1.MenuResolver,
                ModuleResolver_1.ModuleResolver,
                NotificationResolver_1.NotificationResolver,
                RoleResolver_1.RoleResolver,
                UserResolver_1.UserResolver,
                MenuItemResolver_1.MenuItemResolver,
                CampusResolver_1.CampusResolver,
                GeneralAcademicAreaResolver_1.GeneralAcademicAreaResolver,
                GeneralAcademicAsignatureResolver_1.GeneralAcademicAsignatureResolver,
                GeneralAcademicCycleResolver_1.GeneralAcademicCycleResolver,
                GeneralAcademicGradeResolver_1.GeneralAcademicGradeResolver,
                GeneralAcademicStandardResolver_1.GeneralAcademicStandardResolver,
                GeneralPerformanceLevelResolver_1.GeneralPerformanceLevelResolver,
                MunicipalityResolver_1.MunicipalityResolver,
                SchoolAdministratorResolver_1.SchoolAdministratorResolver,
                SchoolResolver_1.SchoolResolver,
                StudentResolver_1.StudentResolver,
                AcademicAreaResolver_1.AcademicAreaResolver,
                AcademicAsignatureResolver_1.AcademicAsignatureResolver,
                AcademicGradeResolver_1.AcademicGradeResolver,
                AcademicPeriodResolver_1.AcademicPeriodResolver,
                AcademicStandardResolver_1.AcademicStandardResolver,
                CampusAdministratorResolver_1.CampusAdministratorResolver,
                CampusCoordinatorResolver_1.CampusCoordinatorResolver,
                EducationLevelResolver_1.EducationLevelResolver,
                EvaluativeComponentResolver_1.EvaluativeComponentResolver,
                GradeAssignmentResolver_1.GradeAssignmentResolver,
                ModalityResolver_1.ModalityResolver,
                PerformanceLevelResolver_1.PerformanceLevelResolver,
                SchoolYearResolver_1.SchoolYearResolver,
                SpecialtyResolver_1.SpecialtyResolver,
                AcademicDayResolver_1.AcademicDayResolver,
                AcademicHourResolver_1.AcademicHourResolver,
                CourseResolver_1.CourseResolver,
                GuardianResolver_1.GuardianResolver,
                TeacherResolver_1.TeacherResolver,
                ForumResolver_1.ForumResolver,
                ForumInteractionResolver_1.ForumInteractionResolver,
                AcademicAsignatureCourseResolver_1.AcademicAsignatureCourseResolver,
                AcademicScheduleResolver_1.AcademicScheduleResolver,
                LearningResolver_1.LearningResolver,
                EvidenceLearningResolver_1.EvidenceLearningResolver,
                GeneralBasicLearningRightResolver_1.GeneralBasicLearningRightResolver,
                ExperienceLearningResolver_1.ExperienceLearningResolver,
                ExperienceLearningTraditionalValuationResolver_1.ExperienceLearningTraditionalValuationResolver,
                ExperienceLearningSelfAssessmentValuationResolver_1.ExperienceLearningSelfAssessmentValuationResolver,
                ExperienceLearningCoEvaluationValuationResolver_1.ExperienceLearningCoEvaluationValuationResolver,
                ExperienceLearningCoEvaluationResolver_1.ExperienceLearningCoEvaluationResolver,
                ExperienceLearningRubricCriteriaPerformanceLevelResolver_1.ExperienceLearningRubricCriteriaPerformanceLevelResolver,
                ExperienceLearningRubricCriteriaResolver_1.ExperienceLearningRubricCriteriaResolver,
                ExperienceLearningRubricValuationResolver_1.ExperienceLearningRubricValuationResolver,
                ExperienceLearningRubricCriteriaValuationResolver_1.ExperienceLearningRubricCriteriaValuationResolver,
                ExperienceLearningPerformanceLevelResolver_1.ExperienceLearningPerformanceLevelResolver,
                ExperienceLearningAverageValuationResolver_1.ExperienceLearningAverageValuationResolver,
                AcademicAsignatureCoursePeriodValuationResolver_1.AcademicAsignatureCoursePeriodValuationResolver,
                QuestionBankTestOnlineResolver_1.QuestionBankTestOnlineResolver,
                QuestionCategoryTestOnlineResolver_1.QuestionCategoryTestOnlineResolver,
                QuestionTestOnlineResolver_1.QuestionTestOnlineResolver,
                ClassroomPlanPerformanceAppraisalStrategyResolver_1.ClassroomPlanPerformanceAppraisalStrategyResolver,
                ClassroomPlanExpectedPerformanceResolver_1.ClassroomPlanExpectedPerformanceResolver,
                ClassroomPlanResolver_1.ClassroomPlanResolver,
                SchoolAdministrativeResolver_1.SchoolAdministrativeResolver,
                ExperienceLearningValuationResolver_1.ExperienceLearningValuationResolver,
                StudentAttendanceResolver_1.StudentAttendanceResolver,
                PerformanceReportResolver_1.PerformanceReportResolver,
                SchoolConfigurationResolver_1.SchoolConfigurationResolver,
                AcademicAreaCoursePeriodValuationResolver_1.AcademicAreaCoursePeriodValuationResolver,
                AcademicAsignatureCoursePeriodEvidenceLearningValuationResolver_1.AcademicAsignatureCoursePeriodEvidenceLearningValuationResolver,
                StudentBehaviourResolver_1.StudentBehaviourResolver,
                ObserverAnnotationTypeResolver_1.ObserverAnnotationTypeResolver,
                StudentObserverAnnotationResolver_1.StudentObserverAnnotationResolver,
                AcademicAsignatureCourseYearValuationResolver_1.AcademicAsignatureCourseYearValuationResolver,
                AcademicAreaCourseYearValuationResolver_1.AcademicAreaCourseYearValuationResolver,
                AverageAcademicPeriodStudentResolver_1.AverageAcademicPeriodStudentResolver,
                AverageAcademicYearCourseResolver_1.AverageAcademicYearCourseResolver,
                AverageAcademicYearStudentResolver_1.AverageAcademicYearStudentResolver,
                CertificateFinalReport_1.CertificateFinalReportResolver,
                PerformanceFinalReportResolver_1.PerformanceFinalReportResolver,
                StudentYearBehaviourResolver_1.StudentYearBehaviourResolver,
                ImportDataSchoolResolver_1.ImportDataSchoolResolver,
                VideoTutorialResolver_1.VideoTutorialResolver,
                BackupResolver_1.BackupResolver,
                ForumQuestionResolver_1.ForumQuestionResolver,
                SyncOfflineResolver_1.SyncOfflineResolver,
            ],
            globalMiddlewares: [error_logger_1.ErrorLoggerMiddleware, resolve_time_1.ResolveTimeMiddleware, log_access_1.LogAccessMiddleware],
        });
        const configExpressStatusMonitor = {
            title: 'Express Status ViveColegios',
            theme: 'default.css',
            path: '/status',
            spans: [
                {
                    interval: 1,
                    retention: 60,
                },
                {
                    interval: 5,
                    retention: 60,
                },
                {
                    interval: 15,
                    retention: 60,
                },
            ],
            chartVisibility: {
                cpu: true,
                mem: true,
                load: true,
                eventLoop: true,
                heap: true,
                responseTime: true,
                rps: true,
                statusCodes: true,
            },
            healthChecks: [
                {
                    protocol: 'http',
                    host: 'localhost',
                    path: `/healthcheck-${config_1.SERVER_NAME_APP}`,
                    port: `${config_1.SERVER_PORT_APP}`,
                },
            ],
        };
        await DataSource_1.dataSource
            .initialize()
            .then((connection) => {
            console.log('TypeORM with mongodb: ' + SERVER_NAME);
        })
            .catch((error) => {
            console.error(error);
        });
        const server = new server_1.ApolloServer({
            schema: federatedSchema,
            includeStacktraceInErrorResponses: true,
            introspection: true,
            plugins: [
                process.env.NODE_ENV === 'production'
                    ? (0, disabled_1.ApolloServerPluginLandingPageDisabled)()
                    : (0, default_1.ApolloServerPluginLandingPageProductionDefault)({ footer: false }),
            ],
            csrfPrevention: true,
            formatError: (err) => {
                var _a, _b, _c;
                console.error('GraphQL Error 2', err);
                const errorReport = {
                    message: err.message,
                    locations: err.locations,
                    path: err.path,
                    stacktrace: ((_b = (_a = err.extensions) === null || _a === void 0 ? void 0 : _a.exception) === null || _b === void 0 ? void 0 : _b.stacktrace) || [],
                    code: (_c = err.extensions) === null || _c === void 0 ? void 0 : _c.code,
                };
                console.error('GraphQL Error 2', errorReport);
                return errorReport;
            },
        });
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        await server.start();
        app.use(`/healthcheck-${SERVER_NAME}`, require('express-healthcheck')());
        app.use(require('express-status-monitor')(configExpressStatusMonitor));
        app.use((0, morgan_1.default)('dev', {
            skip: function (req, res) {
                return res.statusCode < 400;
            },
        }));
        app.use((0, morgan_1.default)('common', {
            stream: fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), { flags: 'a' }),
        }));
        app.use((0, helmet_1.default)({
            contentSecurityPolicy: false,
            xDownloadOptions: false,
            crossOriginResourcePolicy: { policy: 'cross-origin' },
        }));
        app.use((0, cors_1.default)({ origin: '*' }));
        app.use(express_1.default.json({ limit: '800mb' }));
        app.use(expressHealthApi({ apiPath: '/health' }));
        app.use('/voyager', (0, middleware_1.express)({ endpointUrl: '/graphql' }));
        app.use((0, graphql_upload_minimal_1.graphqlUploadExpress)({ maxFileSize: 1000000000, maxFiles: 10 }));
        app.use((0, express4_1.expressMiddleware)(server, {
            context: async ({ req }) => {
                var _a, _b;
                const user = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.user) ? JSON.parse((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.user) : null;
                return { user };
            },
        }));
        await new Promise((resolve) => {
            httpServer.listen({ port: PORT }, () => {
                console.log(`🚀 Server ${SERVER_NAME} Ready and Listening at ==> http://localhost:${PORT}`);
            });
        });
    }
    catch (err) {
        console.error(err);
    }
}
if (cluster.isMaster) {
    console.log(`Master Services ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    app();
}
