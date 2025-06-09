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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupResolver = void 0;
const mongodb_snapshot_1 = require("mongodb-snapshot");
const type_graphql_1 = require("type-graphql");
let BackupResolver = class BackupResolver {
    async createBackup(context) {
        var _a, e_1, _b, _c;
        const mongo_connector = new mongodb_snapshot_1.MongoDBDuplexConnector({
            connection: {
                uri: "mongodb://db_user_vivecolegios:db_user_vivecolegios2022@vivecolegios.nortedesantander.gov.co",
                dbname: 'app_db_vivecolegios',
            },
        });
        const localfile_connector = new mongodb_snapshot_1.LocalFileSystemDuplexConnector({
            connection: {
                path: './backup.tar',
            },
            assource: {
                collections: ["user", "role"],
            },
            astarget: {
                collections: ["user", "role"],
            }
        });
        const transferer = new mongodb_snapshot_1.MongoTransferer({
            source: mongo_connector,
            targets: [localfile_connector],
        });
        try {
            for (var _d = true, transferer_1 = __asyncValues(transferer), transferer_1_1; transferer_1_1 = await transferer_1.next(), _a = transferer_1_1.done, !_a; _d = true) {
                _c = transferer_1_1.value;
                _d = false;
                const { total, write } = _c;
                console.log(`remaining bytes to write: ${total - write}`);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = transferer_1.return)) await _b.call(transferer_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    }
};
exports.BackupResolver = BackupResolver;
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BackupResolver.prototype, "createBackup", null);
exports.BackupResolver = BackupResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BackupResolver);
