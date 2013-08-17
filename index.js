/**
 *
 *  Class Utilties
 *
 *  copyright 2013, Kevin Lindsey
 *
 */

/**
 *  isObject
 *
 *  @param {any} item
 *  @returns {Boolean}
 */
function isObject(item) {
    return typeof item === "object"
}

/**
 *  isFunction
 *
 *  @param {any} item
 *  @returns {Boolean}
 */
function isFunction(item) {
    return typeof item === "function"
}

/**
 *  isString
 *
 *  @param {any} item
 *  @returns {Boolean}
 */
function isString(item) {
    return typeof item === "string"
}

/**
 *  isMethod
 *
 *  @param {Object} item
 *  @param {String} methodName
 *  @returns {Boolean}
 */
function isMethod(item, methodName) {
    return isObject(item) && isString(methodName) && methodName in item && isFunction(item[methodName]);
}

/**
 *  mergeProperties
 *
 *  @param {Object} source
 *  @param {Object} target
 *  @return {Object}
 */
function mergeProperties(source, target) {
    for (prop in source) {
        target[prop] = source[prop];
    }

    return target;
}

/**
 *  inherit
 *
 *  @param {Object | Function} proto
 *  @returns {Object}
 */
function inherit(proto) {
    if (isObject(proto) === false && isFunction(proto) === false) {
        throw new TypeError();
    }

    if ("create" in Object) {
        return Object.create(proto);
    }
    else {
        function f() {};
        f.prototype = p;
        return new f();
    }
}

/**
 *  defineSubclass
 *
 *  @param {Object} superclass
 *  @param {Object} constructor
 *  @param {Object} methods
 *  @param {Object} statics
 */
function defineSubclass(superclass, constructor, methods, statics) {
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;

    if (methods) {
        mergeProperties(methods, constructor.prototype);
    }

    if (statics) {
        mergeProperties(statics, constructor);
    }

    return constructor;
}

exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isMethod = isMethod;
exports.mergeProperties = mergeProperties;
exports.inherit = inherit;
exports.defineSubclass = defineSubclass;
