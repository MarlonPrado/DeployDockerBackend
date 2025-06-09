"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmptyStringElements = removeEmptyStringElements;
function removeEmptyStringElements(obj) {
    for (var prop in obj) {
        if (typeof obj[prop] === 'object') {
            removeEmptyStringElements(obj[prop]);
        }
        else if (obj[prop] === '') {
            delete obj[prop];
        }
    }
    return obj;
}
