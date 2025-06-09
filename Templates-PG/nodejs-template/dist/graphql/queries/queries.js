"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERT_GET_ACADEMIC_PERIOD_SCHOOL_YEAR = exports.QUERT_GET_ALL_SCHOOL_YEAR = exports.QUERY_GET_ALL_SCHOOL = exports.QUERY_GET_ALL_MENU_ITEM = exports.QUERY_GET_ALL_MENU = exports.QUERY_GET_ALL_MODULE = exports.QUERY_GET_ALL_ROLE = exports.QUERT_GET_SCHOOL_ADMINISTRATOR_USER_ID = exports.QUERT_GET_USER = void 0;
const graphql_request_1 = require("graphql-request");
exports.QUERT_GET_USER = (0, graphql_request_1.gql) `
  query getUser($id: String!) {
    data: getUser(id: $id) {
      active
      birthdate
      createdAt
      createdByUserId
      documentNumber
      documentTypeId
      email
      genderId
      id
      lastName
      name
      password
      phone
      profilePhoto
      roleId
      schoolId
      signaturePhoto
      updatedAt
      updatedByUserId
      username
      version
    }
  }
`;
exports.QUERT_GET_SCHOOL_ADMINISTRATOR_USER_ID = (0, graphql_request_1.gql) `
  query getSchoolAdministratorUserId($userId: String!) {
    data: getSchoolAdministratorUserId(userId: $userId) {
      active
      campusId
      createdAt
      createdByUserId
      id
      schoolId
      support
      updatedAt
      updatedByUserId
      userId
      version
    }
  }
`;
exports.QUERY_GET_ALL_ROLE = (0, graphql_request_1.gql) `
  query getAllRole {
    data: getAllRole(orderCreated: true, allData: true) {
      edges {
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
          isSchoolAdministrator
          isSchoolAdministrative
          isCampusAdministrator
          isCampusCoordinator
          isStudent
          isTeacher
          isGuardian
        }
        cursor
      }
      totalCount
    }
  }
`;
exports.QUERY_GET_ALL_MODULE = (0, graphql_request_1.gql) `
  query getAllModule {
    data: getAllModule(orderCreated: true, allData: true) {
      edges {
        node {
          active
          createdAt
          createdByUserId
          id
          name
          updatedAt
          updatedByUserId
          url
          version
        }
        cursor
      }
      totalCount
    }
  }
`;
exports.QUERY_GET_ALL_MENU = (0, graphql_request_1.gql) `
  query getAllMenu {
    data: getAllMenu(orderCreated: true, allData: true) {
      edges {
        node {
          activateAction
          active
          createAction
          createdAt
          createdByUserId
          deleteAction
          fullAccess
          icon
          id
          inactiveAction
          isHidden
          moduleId
          name
          order
          readAction
          rolesId
          updateAction
          updatedAt
          updatedByUserId
          version
        }
        cursor
      }
      totalCount
    }
  }
`;
exports.QUERY_GET_ALL_MENU_ITEM = (0, graphql_request_1.gql) `
  query getAllMenuItem {
    data: getAllMenuItem(orderCreated: true, allData: true) {
      edges {
        node {
          activateAction
          active
          createAction
          createdAt
          createdByUserId
          deleteAction
          fullAccess
          icon
          id
          inactiveAction
          isHidden
          menuId
          moduleId
          name
          order
          readAction
          rolesId
          updateAction
          updatedAt
          updatedByUserId
          version
        }
        cursor
      }
      totalCount
    }
  }
`;
exports.QUERY_GET_ALL_SCHOOL = (0, graphql_request_1.gql) `
  query getAllSchool {
    data: getAllSchool(orderCreated: true, allData: true) {
      edges {
        node {
          active
          createdAt
          createdByUserId
          curricularComponent
          daneCode
          educationalModel
          id
          imgPrincipalSignature
          imgSecretarySignature
          logo
          name
          pedagogicalModel
          textAddress
          textDaneNit
          textPrincipalSignature
          textResolution
          textSecretarySignature
          updatedAt
          updatedByUserId
          version
        }
        cursor
      }
      totalCount
    }
  }
`;
exports.QUERT_GET_ALL_SCHOOL_YEAR = (0, graphql_request_1.gql) `
  query getAllSchoolYear($schoolId: String!) {
    data: getAllSchoolYear(schoolId: $schoolId, orderCreated: true, allData: true) {
      edges {
        node {
          id
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          schoolYear
          startDate
          endDate
          folioNumber
          schoolYearImportId
        }
      }
      totalCount
    }
  }
`;
exports.QUERT_GET_ACADEMIC_PERIOD_SCHOOL_YEAR = (0, graphql_request_1.gql) `
  query getAcademicPeriodSchoolYear($schoolId: String!, $schoolYearId: String!) {
    data: getAcademicPeriodSchoolYear(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      edges {
        node {
          id
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
          schoolYearId
          startDate
          endDate
          startDateRecovery
          endDateRecovery
          weight
          order
          entityBaseId
        }
      }
      totalCount
    }
  }
`;
