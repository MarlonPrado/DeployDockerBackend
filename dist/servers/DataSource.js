"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceLearningRepository = exports.GeneralBasicLearningRightRepository = exports.EvidenceLearningRepository = exports.LearningRepository = exports.AcademicScheduleRepository = exports.AcademicAsignatureCourseRepository = exports.ForumInteractionRepository = exports.ForumRepository = exports.TeacherRepository = exports.GuardianRepository = exports.CourseRepository = exports.AcademicHourRepository = exports.AcademicDayRepository = exports.SpecialtyRepository = exports.SchoolYearRepository = exports.PerformanceLevelRepository = exports.ModalityRepository = exports.GradeAssignmentRepository = exports.EvaluativeComponentRepository = exports.EducationLevelRepository = exports.CampusCoordinatorRepository = exports.CampusAdministratorRepository = exports.AcademicStandardRepository = exports.AcademicPeriodRepository = exports.AcademicGradeRepository = exports.AcademicAsignatureRepository = exports.AcademicAreaRepository = exports.StudentRepository = exports.SchoolAdministratorRepository = exports.SchoolRepository = exports.MunicipalityRepository = exports.GeneralPerformanceLevelRepository = exports.GeneralAcademicStandardRepository = exports.GeneralAcademicGradeRepository = exports.GeneralAcademicCycleRepository = exports.GeneralAcademicAsignatureRepository = exports.GeneralAcademicAreaRepository = exports.CampusRepository = exports.MenuItemRepository = exports.UserRepository = exports.RoleRepository = exports.NotificationRepository = exports.ModuleRepository = exports.MenuRepository = exports.InboxRepository = exports.GenderRepository = exports.EmailRepository = exports.DocumentTypeRepository = exports.AuditLoginRepository = exports.dataSource = void 0;
exports.SyncOfflineRepository = exports.ForumQuestionRepository = exports.FrecuentQuestionRepository = exports.VideoTutorialRepository = exports.StudentYearBehaviourRepository = exports.AverageAcademicYearCourseRepository = exports.AverageAcademicYearStudentRepository = exports.AcademicAreaCourseYearValuationRepository = exports.AcademicAsignatureCourseYearValuationRepository = exports.StudentObserverAnnotationRepository = exports.ObserverAnnotationTypeRepository = exports.StudentBehaviourRepository = exports.AverageAcademicPeriodCourseRepository = exports.AverageAcademicPeriodStudentRepository = exports.AcademicAsignatureCoursePeriodEvidenceLearningValuationRepository = exports.SchoolConfigurationRepository = exports.AcademicAreaCoursePeriodValuationRepository = exports.StudentAttendanceRepository = exports.SchoolAdministrativeRepository = exports.CursosRepository = exports.JornadasRepository = exports.EstudiantesRepository = exports.PlantaDocenteRepository = exports.ClassroomPlanRepository = exports.QuestionCategoryTestOnlineRepository = exports.QuestionBankTestOnlineRepository = exports.QuestionTestOnlineRepository = exports.AcademicAsignatureCoursePeriodValuationRepository = exports.ExperienceLearningAverageValuationRepository = exports.ExperienceLearningRubricCriteriaValuationRepository = exports.ExperienceLearningRubricValuationRepository = exports.ExperienceLearningRubricCriteriaRepository = exports.ExperienceLearningCoEvaluationRepository = exports.ExperienceLearningCoEvaluationValuationRepository = exports.ExperienceLearningSelfAssessmentValuationRepository = exports.ExperienceLearningTraditionalValuationRepository = void 0;
const process_1 = require("process");
const typeorm_1 = require("typeorm");
const SyncOffline_1 = require("./../graphql/models/SchoolAdministrator/SyncOffline");
const AcademicAreaCoursePeriodValuation_1 = require("../graphql/models/CampusAdministrator/AcademicAreaCoursePeriodValuation");
const AcademicAreaCourseYearValuation_1 = require("../graphql/models/CampusAdministrator/AcademicAreaCourseYearValuation");
const AcademicAsignatureCourse_1 = require("../graphql/models/CampusAdministrator/AcademicAsignatureCourse");
const AcademicAsignatureCoursePeriodEvidenceLearningValuation_1 = require("../graphql/models/CampusAdministrator/AcademicAsignatureCoursePeriodEvidenceLearningValuation");
const AcademicAsignatureCoursePeriodValuation_1 = require("../graphql/models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation");
const AcademicAsignatureCourseYearValuation_1 = require("../graphql/models/CampusAdministrator/AcademicAsignatureCourseYearValuation");
const AcademicDay_1 = require("../graphql/models/CampusAdministrator/AcademicDay");
const AcademicHour_1 = require("../graphql/models/CampusAdministrator/AcademicHour");
const AcademicSchedule_1 = require("../graphql/models/CampusAdministrator/AcademicSchedule");
const AverageAcademicPeriodCourse_1 = require("../graphql/models/CampusAdministrator/AverageAcademicPeriodCourse");
const AverageAcademicPeriodStudent_1 = require("../graphql/models/CampusAdministrator/AverageAcademicPeriodStudent");
const AverageAcademicYearCourse_1 = require("../graphql/models/CampusAdministrator/AverageAcademicYearCourse");
const AverageAcademicYearStudent_1 = require("../graphql/models/CampusAdministrator/AverageAcademicYearStudent");
const ClassroomPlan_1 = require("../graphql/models/CampusAdministrator/ClassroomPlan");
const Course_1 = require("../graphql/models/CampusAdministrator/Course");
const ExperienceLearning_1 = require("../graphql/models/CampusAdministrator/ExperienceLearning");
const ExperienceLearningAverageValuation_1 = require("../graphql/models/CampusAdministrator/ExperienceLearningAverageValuation");
const ExperienceLearningCoEvaluation_1 = require("../graphql/models/CampusAdministrator/ExperienceLearningCoEvaluation");
const ExperienceLearningCoEvaluationValuation_1 = require("../graphql/models/CampusAdministrator/ExperienceLearningCoEvaluationValuation");
const ExperienceLearningRubricCriteria_1 = require("../graphql/models/CampusAdministrator/ExperienceLearningRubricCriteria");
const ExperienceLearningRubricCriteriaValuation_1 = require("../graphql/models/CampusAdministrator/ExperienceLearningRubricCriteriaValuation");
const ExperienceLearningRubricValuation_1 = require("../graphql/models/CampusAdministrator/ExperienceLearningRubricValuation");
const ExperienceLearningSelfAssessmentValuation_1 = require("../graphql/models/CampusAdministrator/ExperienceLearningSelfAssessmentValuation");
const ExperienceLearningTraditionalValuation_1 = require("../graphql/models/CampusAdministrator/ExperienceLearningTraditionalValuation");
const Forum_1 = require("../graphql/models/CampusAdministrator/Forum");
const ForumInteraction_1 = require("../graphql/models/CampusAdministrator/ForumInteraction");
const ForumQuestion_1 = require("../graphql/models/CampusAdministrator/ForumQuestion");
const Guardian_1 = require("../graphql/models/CampusAdministrator/Guardian");
const QuestionBankTestOnline_1 = require("../graphql/models/CampusAdministrator/QuestionBankTestOnline");
const QuestionCategoryTestOnline_1 = require("../graphql/models/CampusAdministrator/QuestionCategoryTestOnline");
const QuestionTestOnline_1 = require("../graphql/models/CampusAdministrator/QuestionTestOnline");
const StudentAttendance_1 = require("../graphql/models/CampusAdministrator/StudentAttendance");
const StudentBehaviour_1 = require("../graphql/models/CampusAdministrator/StudentBehaviour");
const StudentObserverAnnotation_1 = require("../graphql/models/CampusAdministrator/StudentObserverAnnotation");
const StudentYearBehaviour_1 = require("../graphql/models/CampusAdministrator/StudentYearBehaviour");
const Teacher_1 = require("../graphql/models/CampusAdministrator/Teacher");
const Estudiantes_1 = require("../graphql/models/Data/Estudiantes");
const PlantaDocente_1 = require("../graphql/models/Data/PlantaDocente");
const AuditLogin_1 = require("../graphql/models/GeneralAdministrator/AuditLogin");
const Campus_1 = require("../graphql/models/GeneralAdministrator/Campus");
const DocumentType_1 = require("../graphql/models/GeneralAdministrator/DocumentType");
const Email_1 = require("../graphql/models/GeneralAdministrator/Email");
const FrecuentQuestion_1 = require("../graphql/models/GeneralAdministrator/FrecuentQuestion");
const Gender_1 = require("../graphql/models/GeneralAdministrator/Gender");
const GeneralAcademicArea_1 = require("../graphql/models/GeneralAdministrator/GeneralAcademicArea");
const GeneralAcademicAsignature_1 = require("../graphql/models/GeneralAdministrator/GeneralAcademicAsignature");
const GeneralAcademicCycle_1 = require("../graphql/models/GeneralAdministrator/GeneralAcademicCycle");
const GeneralAcademicGrade_1 = require("../graphql/models/GeneralAdministrator/GeneralAcademicGrade");
const GeneralAcademicStandard_1 = require("../graphql/models/GeneralAdministrator/GeneralAcademicStandard");
const GeneralBasicLearningRight_1 = require("../graphql/models/GeneralAdministrator/GeneralBasicLearningRight");
const GeneralPerformanceLevel_1 = require("../graphql/models/GeneralAdministrator/GeneralPerformanceLevel");
const Inbox_1 = require("../graphql/models/GeneralAdministrator/Inbox");
const Menu_1 = require("../graphql/models/GeneralAdministrator/Menu");
const MenuItem_1 = require("../graphql/models/GeneralAdministrator/MenuItem");
const Module_1 = require("../graphql/models/GeneralAdministrator/Module");
const Municipality_1 = require("../graphql/models/GeneralAdministrator/Municipality");
const Notification_1 = require("../graphql/models/GeneralAdministrator/Notification");
const Role_1 = require("../graphql/models/GeneralAdministrator/Role");
const School_1 = require("../graphql/models/GeneralAdministrator/School");
const SchoolAdministrative_1 = require("../graphql/models/GeneralAdministrator/SchoolAdministrative");
const SchoolAdministrator_1 = require("../graphql/models/GeneralAdministrator/SchoolAdministrator");
const Student_1 = require("../graphql/models/GeneralAdministrator/Student");
const User_1 = require("../graphql/models/GeneralAdministrator/User");
const VideoTutorial_1 = require("../graphql/models/GeneralAdministrator/VideoTutorial");
const AcademicArea_1 = require("../graphql/models/SchoolAdministrator/AcademicArea");
const AcademicAsignature_1 = require("../graphql/models/SchoolAdministrator/AcademicAsignature");
const AcademicGrade_1 = require("../graphql/models/SchoolAdministrator/AcademicGrade");
const AcademicPeriod_1 = require("../graphql/models/SchoolAdministrator/AcademicPeriod");
const AcademicStandard_1 = require("../graphql/models/SchoolAdministrator/AcademicStandard");
const CampusAdministrator_1 = require("../graphql/models/SchoolAdministrator/CampusAdministrator");
const CampusCoordinator_1 = require("../graphql/models/SchoolAdministrator/CampusCoordinator");
const EducationLevel_1 = require("../graphql/models/SchoolAdministrator/EducationLevel");
const EvaluativeComponent_1 = require("../graphql/models/SchoolAdministrator/EvaluativeComponent");
const EvidenceLearning_1 = require("../graphql/models/SchoolAdministrator/EvidenceLearning");
const GradeAssignment_1 = require("../graphql/models/SchoolAdministrator/GradeAssignment");
const Learning_1 = require("../graphql/models/SchoolAdministrator/Learning");
const Modality_1 = require("../graphql/models/SchoolAdministrator/Modality");
const ObserverAnnotationType_1 = require("../graphql/models/SchoolAdministrator/ObserverAnnotationType");
const PerformanceLevel_1 = require("../graphql/models/SchoolAdministrator/PerformanceLevel");
const SchoolConfiguration_1 = require("../graphql/models/SchoolAdministrator/SchoolConfiguration");
const SchoolYear_1 = require("../graphql/models/SchoolAdministrator/SchoolYear");
const Specialty_1 = require("../graphql/models/SchoolAdministrator/Specialty");
const Cursos_1 = require("./../graphql/models/Data/Cursos");
const Jornadas_1 = require("./../graphql/models/Data/Jornadas");
exports.dataSource = new typeorm_1.DataSource({
    type: 'mongodb',
    url: process_1.env.DATABASE_URL_TYPE_ORM,
    authSource: 'admin',
    entities: [
        AuditLogin_1.AuditLogin,
        DocumentType_1.DocumentType,
        Email_1.Email,
        Gender_1.Gender,
        Inbox_1.Inbox,
        Menu_1.Menu,
        Module_1.Module,
        Notification_1.Notification,
        Role_1.Role,
        User_1.User,
        MenuItem_1.MenuItem,
        Campus_1.Campus,
        GeneralAcademicArea_1.GeneralAcademicArea,
        GeneralAcademicAsignature_1.GeneralAcademicAsignature,
        GeneralAcademicCycle_1.GeneralAcademicCycle,
        GeneralAcademicGrade_1.GeneralAcademicGrade,
        GeneralAcademicStandard_1.GeneralAcademicStandard,
        GeneralPerformanceLevel_1.GeneralPerformanceLevel,
        Municipality_1.Municipality,
        School_1.School,
        SchoolAdministrator_1.SchoolAdministrator,
        Student_1.Student,
        AcademicArea_1.AcademicArea,
        AcademicAsignature_1.AcademicAsignature,
        AcademicGrade_1.AcademicGrade,
        AcademicPeriod_1.AcademicPeriod,
        AcademicStandard_1.AcademicStandard,
        CampusAdministrator_1.CampusAdministrator,
        CampusCoordinator_1.CampusCoordinator,
        EducationLevel_1.EducationLevel,
        EvaluativeComponent_1.EvaluativeComponent,
        GradeAssignment_1.GradeAssignment,
        Modality_1.Modality,
        PerformanceLevel_1.PerformanceLevel,
        SchoolYear_1.SchoolYear,
        Specialty_1.Specialty,
        AcademicDay_1.AcademicDay,
        AcademicHour_1.AcademicHour,
        Course_1.Course,
        Guardian_1.Guardian,
        Teacher_1.Teacher,
        Forum_1.Forum,
        ForumInteraction_1.ForumInteraction,
        AcademicAsignatureCourse_1.AcademicAsignatureCourse,
        AcademicSchedule_1.AcademicSchedule,
        Learning_1.Learning,
        EvidenceLearning_1.EvidenceLearning,
        GeneralBasicLearningRight_1.GeneralBasicLearningRight,
        ExperienceLearning_1.ExperienceLearning,
        ExperienceLearningTraditionalValuation_1.ExperienceLearningTraditionalValuation,
        ExperienceLearningSelfAssessmentValuation_1.ExperienceLearningSelfAssessmentValuation,
        ExperienceLearningCoEvaluationValuation_1.ExperienceLearningCoEvaluationValuation,
        ExperienceLearningCoEvaluation_1.ExperienceLearningCoEvaluation,
        ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria,
        ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation,
        ExperienceLearningRubricCriteriaValuation_1.ExperienceLearningRubricCriteriaValuation,
        ExperienceLearningAverageValuation_1.ExperienceLearningAverageValuation,
        AcademicAsignatureCoursePeriodValuation_1.AcademicAsignatureCoursePeriodValuation,
        QuestionTestOnline_1.QuestionTestOnline,
        QuestionBankTestOnline_1.QuestionBankTestOnline,
        QuestionCategoryTestOnline_1.QuestionCategoryTestOnline,
        ClassroomPlan_1.ClassroomPlan,
        PlantaDocente_1.PlantaDocente,
        Estudiantes_1.Estudiantes,
        Jornadas_1.Jornadas,
        Cursos_1.Cursos,
        SchoolAdministrative_1.SchoolAdministrative,
        StudentAttendance_1.StudentAttendance,
        AcademicAreaCoursePeriodValuation_1.AcademicAreaCoursePeriodValuation,
        SchoolConfiguration_1.SchoolConfiguration,
        AcademicAsignatureCoursePeriodEvidenceLearningValuation_1.AcademicAsignatureCoursePeriodEvidenceLearningValuation,
        AverageAcademicPeriodStudent_1.AverageAcademicPeriodStudent,
        AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse,
        StudentBehaviour_1.StudentBehaviour,
        ObserverAnnotationType_1.ObserverAnnotationType,
        StudentObserverAnnotation_1.StudentObserverAnnotation,
        AcademicAsignatureCourseYearValuation_1.AcademicAsignatureCourseYearValuation,
        AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation,
        AverageAcademicYearStudent_1.AverageAcademicYearStudent,
        AverageAcademicYearCourse_1.AverageAcademicYearCourse,
        StudentYearBehaviour_1.StudentYearBehaviour,
        VideoTutorial_1.VideoTutorial,
        FrecuentQuestion_1.FrecuentQuestion,
        ForumQuestion_1.ForumQuestion,
        SyncOffline_1.SyncOffline,
    ],
    synchronize: true,
    logger: 'advanced-console',
    logging: 'all',
    dropSchema: false,
    cache: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
exports.AuditLoginRepository = exports.dataSource.getMongoRepository(AuditLogin_1.AuditLogin);
exports.DocumentTypeRepository = exports.dataSource.getMongoRepository(DocumentType_1.DocumentType);
exports.EmailRepository = exports.dataSource.getMongoRepository(Email_1.Email);
exports.GenderRepository = exports.dataSource.getMongoRepository(Gender_1.Gender);
exports.InboxRepository = exports.dataSource.getMongoRepository(Inbox_1.Inbox);
exports.MenuRepository = exports.dataSource.getMongoRepository(Menu_1.Menu);
exports.ModuleRepository = exports.dataSource.getMongoRepository(Module_1.Module);
exports.NotificationRepository = exports.dataSource.getMongoRepository(Notification_1.Notification);
exports.RoleRepository = exports.dataSource.getMongoRepository(Role_1.Role);
exports.UserRepository = exports.dataSource.getMongoRepository(User_1.User);
exports.MenuItemRepository = exports.dataSource.getMongoRepository(MenuItem_1.MenuItem);
exports.CampusRepository = exports.dataSource.getMongoRepository(Campus_1.Campus);
exports.GeneralAcademicAreaRepository = exports.dataSource.getMongoRepository(GeneralAcademicArea_1.GeneralAcademicArea);
exports.GeneralAcademicAsignatureRepository = exports.dataSource.getMongoRepository(GeneralAcademicAsignature_1.GeneralAcademicAsignature);
exports.GeneralAcademicCycleRepository = exports.dataSource.getMongoRepository(GeneralAcademicCycle_1.GeneralAcademicCycle);
exports.GeneralAcademicGradeRepository = exports.dataSource.getMongoRepository(GeneralAcademicGrade_1.GeneralAcademicGrade);
exports.GeneralAcademicStandardRepository = exports.dataSource.getMongoRepository(GeneralAcademicStandard_1.GeneralAcademicStandard);
exports.GeneralPerformanceLevelRepository = exports.dataSource.getMongoRepository(GeneralPerformanceLevel_1.GeneralPerformanceLevel);
exports.MunicipalityRepository = exports.dataSource.getMongoRepository(Municipality_1.Municipality);
exports.SchoolRepository = exports.dataSource.getMongoRepository(School_1.School);
exports.SchoolAdministratorRepository = exports.dataSource.getMongoRepository(SchoolAdministrator_1.SchoolAdministrator);
exports.StudentRepository = exports.dataSource.getMongoRepository(Student_1.Student);
exports.AcademicAreaRepository = exports.dataSource.getMongoRepository(AcademicArea_1.AcademicArea);
exports.AcademicAsignatureRepository = exports.dataSource.getMongoRepository(AcademicAsignature_1.AcademicAsignature);
exports.AcademicGradeRepository = exports.dataSource.getMongoRepository(AcademicGrade_1.AcademicGrade);
exports.AcademicPeriodRepository = exports.dataSource.getMongoRepository(AcademicPeriod_1.AcademicPeriod);
exports.AcademicStandardRepository = exports.dataSource.getMongoRepository(AcademicStandard_1.AcademicStandard);
exports.CampusAdministratorRepository = exports.dataSource.getMongoRepository(CampusAdministrator_1.CampusAdministrator);
exports.CampusCoordinatorRepository = exports.dataSource.getMongoRepository(CampusCoordinator_1.CampusCoordinator);
exports.EducationLevelRepository = exports.dataSource.getMongoRepository(EducationLevel_1.EducationLevel);
exports.EvaluativeComponentRepository = exports.dataSource.getMongoRepository(EvaluativeComponent_1.EvaluativeComponent);
exports.GradeAssignmentRepository = exports.dataSource.getMongoRepository(GradeAssignment_1.GradeAssignment);
exports.ModalityRepository = exports.dataSource.getMongoRepository(Modality_1.Modality);
exports.PerformanceLevelRepository = exports.dataSource.getMongoRepository(PerformanceLevel_1.PerformanceLevel);
exports.SchoolYearRepository = exports.dataSource.getMongoRepository(SchoolYear_1.SchoolYear);
exports.SpecialtyRepository = exports.dataSource.getMongoRepository(Specialty_1.Specialty);
exports.AcademicDayRepository = exports.dataSource.getMongoRepository(AcademicDay_1.AcademicDay);
exports.AcademicHourRepository = exports.dataSource.getMongoRepository(AcademicHour_1.AcademicHour);
exports.CourseRepository = exports.dataSource.getMongoRepository(Course_1.Course);
exports.GuardianRepository = exports.dataSource.getMongoRepository(Guardian_1.Guardian);
exports.TeacherRepository = exports.dataSource.getMongoRepository(Teacher_1.Teacher);
exports.ForumRepository = exports.dataSource.getMongoRepository(Forum_1.Forum);
exports.ForumInteractionRepository = exports.dataSource.getMongoRepository(ForumInteraction_1.ForumInteraction);
exports.AcademicAsignatureCourseRepository = exports.dataSource.getMongoRepository(AcademicAsignatureCourse_1.AcademicAsignatureCourse);
exports.AcademicScheduleRepository = exports.dataSource.getMongoRepository(AcademicSchedule_1.AcademicSchedule);
exports.LearningRepository = exports.dataSource.getMongoRepository(Learning_1.Learning);
exports.EvidenceLearningRepository = exports.dataSource.getMongoRepository(EvidenceLearning_1.EvidenceLearning);
exports.GeneralBasicLearningRightRepository = exports.dataSource.getMongoRepository(GeneralBasicLearningRight_1.GeneralBasicLearningRight);
exports.ExperienceLearningRepository = exports.dataSource.getMongoRepository(ExperienceLearning_1.ExperienceLearning);
exports.ExperienceLearningTraditionalValuationRepository = exports.dataSource.getMongoRepository(ExperienceLearningTraditionalValuation_1.ExperienceLearningTraditionalValuation);
exports.ExperienceLearningSelfAssessmentValuationRepository = exports.dataSource.getMongoRepository(ExperienceLearningSelfAssessmentValuation_1.ExperienceLearningSelfAssessmentValuation);
exports.ExperienceLearningCoEvaluationValuationRepository = exports.dataSource.getMongoRepository(ExperienceLearningCoEvaluationValuation_1.ExperienceLearningCoEvaluationValuation);
exports.ExperienceLearningCoEvaluationRepository = exports.dataSource.getMongoRepository(ExperienceLearningCoEvaluation_1.ExperienceLearningCoEvaluation);
exports.ExperienceLearningRubricCriteriaRepository = exports.dataSource.getMongoRepository(ExperienceLearningRubricCriteria_1.ExperienceLearningRubricCriteria);
exports.ExperienceLearningRubricValuationRepository = exports.dataSource.getMongoRepository(ExperienceLearningRubricValuation_1.ExperienceLearningRubricValuation);
exports.ExperienceLearningRubricCriteriaValuationRepository = exports.dataSource.getMongoRepository(ExperienceLearningRubricCriteriaValuation_1.ExperienceLearningRubricCriteriaValuation);
exports.ExperienceLearningAverageValuationRepository = exports.dataSource.getMongoRepository(ExperienceLearningAverageValuation_1.ExperienceLearningAverageValuation);
exports.AcademicAsignatureCoursePeriodValuationRepository = exports.dataSource.getMongoRepository(AcademicAsignatureCoursePeriodValuation_1.AcademicAsignatureCoursePeriodValuation);
exports.QuestionTestOnlineRepository = exports.dataSource.getMongoRepository(QuestionTestOnline_1.QuestionTestOnline);
exports.QuestionBankTestOnlineRepository = exports.dataSource.getMongoRepository(QuestionBankTestOnline_1.QuestionBankTestOnline);
exports.QuestionCategoryTestOnlineRepository = exports.dataSource.getMongoRepository(QuestionCategoryTestOnline_1.QuestionCategoryTestOnline);
exports.ClassroomPlanRepository = exports.dataSource.getMongoRepository(ClassroomPlan_1.ClassroomPlan);
exports.PlantaDocenteRepository = exports.dataSource.getMongoRepository(PlantaDocente_1.PlantaDocente);
exports.EstudiantesRepository = exports.dataSource.getMongoRepository(Estudiantes_1.Estudiantes);
exports.JornadasRepository = exports.dataSource.getMongoRepository(Jornadas_1.Jornadas);
exports.CursosRepository = exports.dataSource.getMongoRepository(Cursos_1.Cursos);
exports.SchoolAdministrativeRepository = exports.dataSource.getMongoRepository(SchoolAdministrative_1.SchoolAdministrative);
exports.StudentAttendanceRepository = exports.dataSource.getMongoRepository(StudentAttendance_1.StudentAttendance);
exports.AcademicAreaCoursePeriodValuationRepository = exports.dataSource.getMongoRepository(AcademicAreaCoursePeriodValuation_1.AcademicAreaCoursePeriodValuation);
exports.SchoolConfigurationRepository = exports.dataSource.getMongoRepository(SchoolConfiguration_1.SchoolConfiguration);
exports.AcademicAsignatureCoursePeriodEvidenceLearningValuationRepository = exports.dataSource.getMongoRepository(AcademicAsignatureCoursePeriodEvidenceLearningValuation_1.AcademicAsignatureCoursePeriodEvidenceLearningValuation);
exports.AverageAcademicPeriodStudentRepository = exports.dataSource.getMongoRepository(AverageAcademicPeriodStudent_1.AverageAcademicPeriodStudent);
exports.AverageAcademicPeriodCourseRepository = exports.dataSource.getMongoRepository(AverageAcademicPeriodCourse_1.AverageAcademicPeriodCourse);
exports.StudentBehaviourRepository = exports.dataSource.getMongoRepository(StudentBehaviour_1.StudentBehaviour);
exports.ObserverAnnotationTypeRepository = exports.dataSource.getMongoRepository(ObserverAnnotationType_1.ObserverAnnotationType);
exports.StudentObserverAnnotationRepository = exports.dataSource.getMongoRepository(StudentObserverAnnotation_1.StudentObserverAnnotation);
exports.AcademicAsignatureCourseYearValuationRepository = exports.dataSource.getMongoRepository(AcademicAsignatureCourseYearValuation_1.AcademicAsignatureCourseYearValuation);
exports.AcademicAreaCourseYearValuationRepository = exports.dataSource.getMongoRepository(AcademicAreaCourseYearValuation_1.AcademicAreaCourseYearValuation);
exports.AverageAcademicYearStudentRepository = exports.dataSource.getMongoRepository(AverageAcademicYearStudent_1.AverageAcademicYearStudent);
exports.AverageAcademicYearCourseRepository = exports.dataSource.getMongoRepository(AverageAcademicYearCourse_1.AverageAcademicYearCourse);
exports.StudentYearBehaviourRepository = exports.dataSource.getMongoRepository(StudentYearBehaviour_1.StudentYearBehaviour);
exports.VideoTutorialRepository = exports.dataSource.getMongoRepository(VideoTutorial_1.VideoTutorial);
exports.FrecuentQuestionRepository = exports.dataSource.getMongoRepository(FrecuentQuestion_1.FrecuentQuestion);
exports.ForumQuestionRepository = exports.dataSource.getMongoRepository(ForumQuestion_1.ForumQuestion);
exports.SyncOfflineRepository = exports.dataSource.getMongoRepository(SyncOffline_1.SyncOffline);
