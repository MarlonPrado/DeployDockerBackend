"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MUTATION_LOGIN = void 0;
const graphql_request_1 = require("graphql-request");
exports.MUTATION_LOGIN = (0, graphql_request_1.gql) `
  mutation login($username: String!, $password: String!) {
    data: login(username: $username, password: $password) {
      userId
    }
  }
`;
