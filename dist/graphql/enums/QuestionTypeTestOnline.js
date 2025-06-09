"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTypeTestOnline = void 0;
const type_graphql_1 = require("type-graphql");
var QuestionTypeTestOnline;
(function (QuestionTypeTestOnline) {
    QuestionTypeTestOnline["MULTIPLECHOICE"] = "MULTIPLECHOICE";
    QuestionTypeTestOnline["TRUEFALSE"] = "TRUEFALSE";
    QuestionTypeTestOnline["SHORTANSWER"] = "SHORTANSWER";
    QuestionTypeTestOnline["NUMERICAL"] = "NUMERICAL";
    QuestionTypeTestOnline["ESSAY"] = "ESSAY";
})(QuestionTypeTestOnline || (exports.QuestionTypeTestOnline = QuestionTypeTestOnline = {}));
(0, type_graphql_1.registerEnumType)(QuestionTypeTestOnline, {
    name: "QuestionTypeTestOnline",
    description: "The QuestionTypeTestOnline Register",
});
