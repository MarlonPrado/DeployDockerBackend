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
exports.MenuItemConnection = exports.MenuItemEdge = exports.MenuItem = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const IModelData_1 = require("../../interfaces/IModelData");
const relaySpecs_1 = require("../../pagination/relaySpecs");
const Menu_1 = require("./Menu");
const Module_1 = require("./Module");
const Role_1 = require("./Role");
let MenuItem = class MenuItem extends IModelData_1.IModelData {
};
exports.MenuItem = MenuItem;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "icon", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], MenuItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Menu_1.Menu, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)(() => Menu_1.Menu, { nullable: true }),
    __metadata("design:type", Object)
], MenuItem.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.Index)("index_menuId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "menuId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Module_1.Module, (data) => data.id, { lazy: true }),
    (0, type_graphql_1.Field)(() => Module_1.Module, { nullable: true }),
    __metadata("design:type", Object)
], MenuItem.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Index)("index_moduleId"),
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.Index)("index_rolesId"),
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Array)
], MenuItem.prototype, "rolesId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Role_1.Role], { nullable: true }),
    __metadata("design:type", Array)
], MenuItem.prototype, "roles", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "createAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "deleteAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "updateAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "readAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "fullAccess", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "activateAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "inactiveAction", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "isHidden", void 0);
exports.MenuItem = MenuItem = __decorate([
    (0, typeorm_1.Index)("index_full", ["menuId", "moduleId", "rolesId"]),
    (0, type_graphql_1.ObjectType)({ description: 'The MenuItem model', implements: IModelData_1.IModelData }),
    (0, typeorm_1.Entity)()
], MenuItem);
let MenuItemEdge = class MenuItemEdge extends (0, relaySpecs_1.EdgeType)('MenuItem', MenuItem) {
};
exports.MenuItemEdge = MenuItemEdge;
exports.MenuItemEdge = MenuItemEdge = __decorate([
    (0, type_graphql_1.ObjectType)()
], MenuItemEdge);
let MenuItemConnection = class MenuItemConnection extends (0, relaySpecs_1.ConnectionType)('MenuItem', MenuItemEdge) {
};
exports.MenuItemConnection = MenuItemConnection;
exports.MenuItemConnection = MenuItemConnection = __decorate([
    (0, type_graphql_1.ObjectType)()
], MenuItemConnection);
