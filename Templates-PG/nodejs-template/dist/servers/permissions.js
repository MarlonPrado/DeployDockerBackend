"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const { and, or, rule, shield } = require('graphql-shield');
const isAuthenticated = rule()((parent, args, { user }) => {
    console.log(parent);
    console.log(args);
    console.log(user);
    console.log('..................................');
    return user !== null;
});
const canReadAnyAccount = rule()(({ user }) => {
    console.log(user);
    console.log('..................................');
    return true;
});
const canReadOwnAccount = rule()(({ user }) => {
    console.log(user);
    console.log('..................................');
    return true;
});
const isReadingOwnAccount = rule()(({ id }, { user }) => {
    console.log(id, user);
    return true;
});
exports.permissions = shield({
    Query: {},
    Mutation: {},
});
