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
exports.MenuItemResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewMenuItem_1 = require("../../inputs/GeneralAdministrator/NewMenuItem");
const Menu_1 = require("../../models/GeneralAdministrator/Menu");
const MenuItem_1 = require("../../models/GeneralAdministrator/MenuItem");
const Module_1 = require("../../models/GeneralAdministrator/Module");
const Role_1 = require("../../models/GeneralAdministrator/Role");
const User_1 = require("../../models/GeneralAdministrator/User");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let MenuItemResolver = class MenuItemResolver {
    constructor() {
        this.repository = DataSource_1.MenuItemRepository;
        this.repositoryRole = DataSource_1.RoleRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositoryModule = DataSource_1.ModuleRepository;
        this.repositoryMenu = DataSource_1.MenuRepository;
    }
    async getMenuItem(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllMenuItem(args, allData, orderCreated, menuId) {
        let result;
        if (allData) {
            if (orderCreated) {
                if (menuId) {
                    result = await this.repository.findBy({
                        where: { menuId },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (menuId) {
                    result = await this.repository.findBy({ where: { menuId } });
                }
                else {
                    result = await this.repository.find();
                }
            }
        }
        else {
            if (orderCreated) {
                if (menuId) {
                    result = await this.repository.findBy({
                        where: {
                            menuId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            }
            else {
                if (menuId) {
                    result = await this.repository.findBy({
                        where: {
                            menuId,
                            active: true,
                        },
                    });
                }
                else {
                    result = await this.repository.findBy({
                        where: {
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new MenuItem_1.MenuItemConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createMenuItem(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateMenuItem(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveMenuItem(active, id, context) {
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
    async deleteMenuItem(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
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
    async menu(data) {
        let id = data.menuId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryMenu.findOneBy(id);
            return result;
        }
        return null;
    }
    async module(data) {
        let id = data.moduleId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryModule.findOneBy(id);
            return result;
        }
        return null;
    }
    async roles(data) {
        let ids = data.rolesId;
        if (ids !== null && ids !== undefined) {
            let dataIds = [];
            ids.forEach(async (id) => {
                dataIds.push(new mongodb_1.ObjectId(id));
            });
            const result = await this.repositoryRole.findBy({ where: { _id: { $in: dataIds } } });
            return result;
        }
        return null;
    }
};
exports.MenuItemResolver = MenuItemResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(MenuItem_1.MenuItem),
    __metadata("design:type", Object)
], MenuItemResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Role_1.Role),
    __metadata("design:type", Object)
], MenuItemResolver.prototype, "repositoryRole", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], MenuItemResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Module_1.Module),
    __metadata("design:type", Object)
], MenuItemResolver.prototype, "repositoryModule", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(Menu_1.Menu),
    __metadata("design:type", Object)
], MenuItemResolver.prototype, "repositoryMenu", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => MenuItem_1.MenuItem, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "getMenuItem", null);
__decorate([
    (0, type_graphql_1.Query)(() => MenuItem_1.MenuItemConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __param(3, (0, type_graphql_1.Arg)('menuId', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean,
        String]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "getAllMenuItem", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => MenuItem_1.MenuItem),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewMenuItem_1.NewMenuItem, Object]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "createMenuItem", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => MenuItem_1.MenuItem),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewMenuItem_1.NewMenuItem, String, Object]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "updateMenuItem", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "changeActiveMenuItem", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "deleteMenuItem", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MenuItem_1.MenuItem]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MenuItem_1.MenuItem]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Menu_1.Menu, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MenuItem_1.MenuItem]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "menu", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => Module_1.Module, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MenuItem_1.MenuItem]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "module", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [Role_1.Role], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MenuItem_1.MenuItem]),
    __metadata("design:returntype", Promise)
], MenuItemResolver.prototype, "roles", null);
exports.MenuItemResolver = MenuItemResolver = __decorate([
    (0, type_graphql_1.Resolver)(MenuItem_1.MenuItem)
], MenuItemResolver);
