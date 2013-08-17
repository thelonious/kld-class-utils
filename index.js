function isObject(item) {
    return typeof item == "object"
}

function isString(item) {
    return typeof item == "string"
}

function isMethod(item, methodName) {
    return isObject(item) && isString(methodName) && methodName in item && typeof item[methodName] === "function";
}

function extend(o, p) {
    for (prop in p) {
        o[prop] = p[prop];
    }

    return o;
}

function inherit(p) {
    if (p === null) {
        throw new TypeError();
    }

    if ("create" in Object) {
        return Object.create(p);
    }
    else {
        var type = typeof p;

        if (t !== "object" && t !== "function") {
            throw new TypeError();
        }

        function f() {};
        f.prototype = p;
        return new f();
    }
}

function defineSubclass(superclass, constructor, methods, statics) {
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;

    if (methods) {
        extend(constructor.prototype, methods);
    }

    if (statics) {
        extend(constructor, statics);
    }

    return constructor;
}

exports.isObject = isObject;
exports.isString = isString;
exports.isMethod = isMethod;
exports.extend = extend;
exports.inherit = inherit;
exports.defineSubclass = defineSubclass;
