"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFederatedSchema = buildFederatedSchema;
const subgraph_1 = require("@apollo/subgraph");
const utils_1 = require("@graphql-tools/utils");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const type_graphql_1 = require("type-graphql");
async function buildFederatedSchema(options, referenceResolvers) {
    const schema = await (0, type_graphql_1.buildSchema)(Object.assign(Object.assign({}, options), { skipCheck: true, scalarsMap: [{ type: Date, scalar: type_graphql_1.GraphQLISODateTime }] }));
    const federatedSchema = (0, subgraph_1.buildSubgraphSchema)({
        typeDefs: (0, graphql_tag_1.default)((0, utils_1.printSchemaWithDirectives)(schema)),
        resolvers: (0, lodash_merge_1.default)((0, type_graphql_1.createResolversMap)(schema), referenceResolvers),
    });
    return federatedSchema;
}
