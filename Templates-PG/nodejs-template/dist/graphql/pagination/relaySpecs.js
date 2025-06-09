"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionArgs = void 0;
exports.ConnectionType = ConnectionType;
exports.EdgeType = EdgeType;
const Relay = __importStar(require("graphql-relay"));
const type_graphql_1 = require("type-graphql");
let ConnectionArgs = class ConnectionArgs {
};
exports.ConnectionArgs = ConnectionArgs;
__decorate([
    (0, type_graphql_1.Field)((type) => String, {
        nullable: true,
        description: 'Paginate before opaque cursor',
    }),
    __metadata("design:type", String)
], ConnectionArgs.prototype, "before", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String, {
        nullable: true,
        description: 'Paginate after opaque cursor',
    }),
    __metadata("design:type", String)
], ConnectionArgs.prototype, "after", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Number, { nullable: true, description: 'Paginate first' }),
    __metadata("design:type", Number)
], ConnectionArgs.prototype, "first", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Number, { nullable: true, description: 'Paginate last' }),
    __metadata("design:type", Number)
], ConnectionArgs.prototype, "last", void 0);
exports.ConnectionArgs = ConnectionArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], ConnectionArgs);
function ConnectionType(nodeName, edgeClass) {
    let Connection = class Connection {
    };
    __decorate([
        (0, type_graphql_1.Field)((type) => PageInfo),
        __metadata("design:type", PageInfo)
    ], Connection.prototype, "pageInfo", void 0);
    __decorate([
        (0, type_graphql_1.Field)((type) => [edgeClass]),
        __metadata("design:type", Array)
    ], Connection.prototype, "edges", void 0);
    __decorate([
        (0, type_graphql_1.Field)((type) => Number, { nullable: true, description: 'Total Count' }),
        __metadata("design:type", Number)
    ], Connection.prototype, "totalCount", void 0);
    Connection = __decorate([
        (0, type_graphql_1.ObjectType)(`${nodeName}Connection`)
    ], Connection);
    return Connection;
}
function EdgeType(nodeName, nodeType) {
    let Edge = class Edge {
    };
    __decorate([
        (0, type_graphql_1.Field)((type) => nodeType),
        __metadata("design:type", Object)
    ], Edge.prototype, "node", void 0);
    __decorate([
        (0, type_graphql_1.Field)((type) => String, {
            description: 'Used in `before` and `after` args',
        }),
        __metadata("design:type", String)
    ], Edge.prototype, "cursor", void 0);
    Edge = __decorate([
        (0, type_graphql_1.ObjectType)(`${nodeName}Edge`)
    ], Edge);
    return Edge;
}
let PageInfo = class PageInfo {
};
__decorate([
    (0, type_graphql_1.Field)((type) => Boolean),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasNextPage", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => Boolean),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String, { nullable: true }),
    __metadata("design:type", Object)
], PageInfo.prototype, "startCursor", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => String, { nullable: true }),
    __metadata("design:type", Object)
], PageInfo.prototype, "endCursor", void 0);
PageInfo = __decorate([
    (0, type_graphql_1.ObjectType)()
], PageInfo);
