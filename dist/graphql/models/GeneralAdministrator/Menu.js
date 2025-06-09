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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuConnection = exports.MenuEdge = exports.Menu = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const MenuItem_1 = require("./MenuItem");
const Module_1 = require("./Module");
const Role_1 = require("./Role");
let Menu = class Menu extends IModelData_1.IModelData {
};
exports.Menu = Menu;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "icon", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Menu.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Module_1.Module, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)(() => Module_1.Module, { nullable: true }),
    __metadata("design:type", Object)
], Menu.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Index)("index_moduleId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.Index)("index_rolesId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], Menu.prototype, "rolesId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Role_1.Role], { nullable: true }),
    __metadata("design:type", Array)
], Menu.prototype, "roles", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "createAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "deleteAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "updateAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "readAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "fullAccess", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "activateAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "inactiveAction", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [MenuItem_1.MenuItem], { nullable: true }),
    __metadata("design:type", Array)
], Menu.prototype, "menuItems", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [MenuItem_1.MenuItem], { nullable: true }),
    __metadata("design:type", Array)
], Menu.prototype, "menuItemsLogin", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "isHidden", void 0);
exports.Menu = Menu = __decorate([
    (0, typeorm_1.Index)("index_full", ["moduleId", "rolesId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The Menu model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], Menu);
let MenuEdge = class MenuEdge extends (0, relaySpecs_1.EdgeType)('Menu', Menu) {
};
exports.MenuEdge = MenuEdge;
exports.MenuEdge = MenuEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], MenuEdge);
let MenuConnection = class MenuConnection extends (0, relaySpecs_1.ConnectionType)('Menu', MenuEdge) {
};
exports.MenuConnection = MenuConnection;
exports.MenuConnection = MenuConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], MenuConnection);
