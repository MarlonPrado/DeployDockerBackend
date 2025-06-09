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
exports.NewGeneralAcademicStandard = void 0;
const type_graphql_1 = require("type-graphql");
let NewGeneralAcademicStandard = class NewGeneralAcademicStandard {
};
exports.NewGeneralAcademicStandard = NewGeneralAcademicStandard;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewGeneralAcademicStandard.prototype, "standard", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewGeneralAcademicStandard.prototype, "type", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewGeneralAcademicStandard.prototype, "subtype", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewGeneralAcademicStandard.prototype, "generalAcademicAsignatureId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], NewGeneralAcademicStandard.prototype, "generalAcademicCycleId", void 0);
exports.NewGeneralAcademicStandard = NewGeneralAcademicStandard = __decorate([
    (0, type_graphql_1.InputType)()
], NewGeneralAcademicStandard);
