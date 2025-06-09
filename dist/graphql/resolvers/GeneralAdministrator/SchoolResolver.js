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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolResolver = void 0;
const graphql_relay_1 = require("graphql-relay");
const graphql_upload_minimal_1 = require("graphql-upload-minimal");
const mongodb_1 = require("mongodb");
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const promises_1 = require("stream/promises");
const type_graphql_1 = require("type-graphql");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const DataSource_1 = require("../../../servers/DataSource");
const types_1 = require("../../../types");
const NewSchool_1 = require("../../inputs/GeneralAdministrator/NewSchool");
const School_1 = require("../../models/GeneralAdministrator/School");
const User_1 = require("../../models/GeneralAdministrator/User");
const SchoolYear_1 = require("../../models/SchoolAdministrator/SchoolYear");
const relaySpecs_1 = require("../../pagination/relaySpecs");
let SchoolResolver = class SchoolResolver {
    constructor() {
        this.repository = DataSource_1.SchoolRepository;
        this.repositoryUser = DataSource_1.UserRepository;
        this.repositorySchoolYear = DataSource_1.SchoolYearRepository;
    }
    async getSchool(id) {
        const result = await this.repository.findOneBy(id);
        return result;
    }
    async getAllSchool(args, allData, orderCreated) {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    order: { createdAt: 'DESC' },
                });
            }
            else {
                result = await this.repository.find();
            }
        }
        else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
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
                });
            }
        }
        let resultConn = new School_1.SchoolConnection();
        let resultConnection = (0, graphql_relay_1.connectionFromArraySlice)(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = Object.assign(Object.assign({}, resultConnection), { totalCount: result.length });
        return resultConn;
    }
    async createSchool(data, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let createdByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        const model = await this.repository.create(Object.assign(Object.assign({}, dataProcess), { active: true, version: 0, createdByUserId }));
        let result = await this.repository.save(model);
        return result;
    }
    async updateSchool(data, id, context) {
        var _a, _b;
        let dataProcess = (0, types_1.removeEmptyStringElements)(data);
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save(Object.assign(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), dataProcess), { version: (result === null || result === void 0 ? void 0 : result.version) + 1, updatedByUserId }));
        return result;
    }
    async changeActiveSchool(active, id, context) {
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
    async deleteSchool(id, context) {
        var _a, _b;
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return (_b = ((_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.ok) === 1) !== null && _b !== void 0 ? _b : true;
    }
    async schoolLogoUploadImage(id, file, context) {
        var _a, _b;
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        if (file === null || file === void 0 ? void 0 : file.filename) {
            var fs = require('fs');
            var dir = './public/uploads/school/profile/' + id;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const stream = file === null || file === void 0 ? void 0 : file.createReadStream();
            const uid = new short_unique_id_1.default({ length: 14 });
            const out = fs.createWriteStream(dir +
                '/' +
                uid() +
                '.' +
                (file === null || file === void 0 ? void 0 : file.filename.slice((((file === null || file === void 0 ? void 0 : file.filename.lastIndexOf('.')) - 1) >>> 0) + 2)));
            stream.pipe(out);
            await (0, promises_1.finished)(out);
            let result = await this.repository.findOneBy(id);
            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), { logo: out.path, updatedByUserId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
            return true;
        }
        else {
            return false;
        }
    }
    async schoolImgPrincipalSignatureUploadImage(id, file, context) {
        var _a, _b;
        console.log('aca llega');
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        if (file === null || file === void 0 ? void 0 : file.filename) {
            var fs = require('fs');
            var dir = './public/uploads/school/principalSignature/' + id;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const stream = file === null || file === void 0 ? void 0 : file.createReadStream();
            const uid = new short_unique_id_1.default({ length: 14 });
            const out = fs.createWriteStream(dir +
                '/' +
                uid() +
                '.' +
                (file === null || file === void 0 ? void 0 : file.filename.slice((((file === null || file === void 0 ? void 0 : file.filename.lastIndexOf('.')) - 1) >>> 0) + 2)));
            stream.pipe(out);
            await (0, promises_1.finished)(out);
            let result = await this.repository.findOneBy(id);
            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), { imgPrincipalSignature: out.path, updatedByUserId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
            return true;
        }
        else {
            return false;
        }
    }
    async schoolImgSecretarySignatureUploadImage(id, file, context) {
        var _a, _b;
        let updatedByUserId = (_b = (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.id;
        if (file === null || file === void 0 ? void 0 : file.filename) {
            var fs = require('fs');
            var dir = './public/uploads/school/secretarySignature/' + id;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const stream = file === null || file === void 0 ? void 0 : file.createReadStream();
            const uid = new short_unique_id_1.default({ length: 14 });
            const out = fs.createWriteStream(dir +
                '/' +
                uid() +
                '.' +
                (file === null || file === void 0 ? void 0 : file.filename.slice((((file === null || file === void 0 ? void 0 : file.filename.lastIndexOf('.')) - 1) >>> 0) + 2)));
            stream.pipe(out);
            await (0, promises_1.finished)(out);
            let result = await this.repository.findOneBy(id);
            result = await this.repository.save(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId(id) }, result), { imgSecretarySignature: out.path, updatedByUserId, version: (result === null || result === void 0 ? void 0 : result.version) + 1 }));
            return true;
        }
        else {
            return false;
        }
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
    async schoolYear(data) {
        let id = data.id.toString();
        if (id !== null && id !== undefined) {
            const result = await this.repositorySchoolYear.findBy({
                where: { schoolId: id, active: true },
                order: { createdAt: 'DESC' },
            });
            return result;
        }
        return null;
    }
};
exports.SchoolResolver = SchoolResolver;
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(School_1.School),
    __metadata("design:type", Object)
], SchoolResolver.prototype, "repository", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(User_1.User),
    __metadata("design:type", Object)
], SchoolResolver.prototype, "repositoryUser", void 0);
__decorate([
    (0, typeorm_typedi_extensions_1.InjectRepository)(SchoolYear_1.SchoolYear),
    __metadata("design:type", Object)
], SchoolResolver.prototype, "repositorySchoolYear", void 0);
__decorate([
    (0, type_graphql_1.Query)(() => School_1.School, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "getSchool", null);
__decorate([
    (0, type_graphql_1.Query)(() => School_1.SchoolConnection),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Arg)('allData', () => Boolean)),
    __param(2, (0, type_graphql_1.Arg)('orderCreated', () => Boolean)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relaySpecs_1.ConnectionArgs,
        Boolean,
        Boolean]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "getAllSchool", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => School_1.School),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewSchool_1.NewSchool, Object]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "createSchool", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => School_1.School),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewSchool_1.NewSchool, String, Object]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "updateSchool", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('active', () => Boolean)),
    __param(1, (0, type_graphql_1.Arg)('id', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String, Object]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "changeActiveSchool", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "deleteSchool", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Arg)('file', () => graphql_upload_minimal_1.GraphQLUpload, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "schoolLogoUploadImage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Arg)('file', () => graphql_upload_minimal_1.GraphQLUpload, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "schoolImgPrincipalSignatureUploadImage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => String)),
    __param(1, (0, type_graphql_1.Arg)('file', () => graphql_upload_minimal_1.GraphQLUpload, { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "schoolImgSecretarySignatureUploadImage", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [School_1.School]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "createdByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [School_1.School]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "updatedByUser", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((_type) => [SchoolYear_1.SchoolYear], { nullable: true }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [School_1.School]),
    __metadata("design:returntype", Promise)
], SchoolResolver.prototype, "schoolYear", null);
exports.SchoolResolver = SchoolResolver = __decorate([
    (0, type_graphql_1.Resolver)(School_1.School)
], SchoolResolver);
