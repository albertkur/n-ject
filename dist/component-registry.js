"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var n_defensive_1 = require("n-defensive");
var n_exception_1 = require("n-exception");
var component_registration_1 = require("./component-registration");
// internal
var ComponentRegistry = (function () {
    function ComponentRegistry() {
        this._registrations = new Array();
        this._registry = {};
    }
    ComponentRegistry.prototype.register = function (key, component, lifestyle) {
        n_defensive_1.default(key, "key").ensureHasValue().ensure(function (t) { return !t.isEmptyOrWhiteSpace(); });
        n_defensive_1.default(component, "component").ensureHasValue().ensure(function (t) { return typeof t === "function"; });
        n_defensive_1.default(lifestyle, "lifestyle").ensureHasValue();
        key = key.trim();
        if (this._registry[key])
            throw new n_exception_1.ApplicationException("Duplicate registration for key '{0}'".format(key));
        var registration = new component_registration_1.default(key, component, lifestyle);
        this._registrations.push(registration);
        this._registry[key] = registration;
    };
    ComponentRegistry.prototype.verifyRegistrations = function () {
        for (var _i = 0, _a = this._registrations; _i < _a.length; _i++) {
            var registration = _a[_i];
            this.walkDependencyGraph(registration);
        }
    };
    ComponentRegistry.prototype.find = function (key) {
        n_defensive_1.default(key, "key").ensureHasValue().ensure(function (t) { return !t.isEmptyOrWhiteSpace(); });
        key = key.trim();
        return this._registry[key];
    };
    ComponentRegistry.prototype.walkDependencyGraph = function (registration, visited) {
        // check if current is in visited
        // add current to visited
        // check if the dependencies are registered
        // walk the dependencies reusing the visited
        // remove current from visited
        if (visited === void 0) { visited = {}; }
        if (visited[registration.key])
            throw new n_exception_1.ApplicationException("Circular dependency detected with registration '{0}'.".format(registration.key));
        visited[registration.key] = registration;
        for (var _i = 0, _a = registration.dependencies; _i < _a.length; _i++) {
            var dependency = _a[_i];
            if (!this._registry[dependency])
                throw new n_exception_1.ApplicationException("Unregistered dependency '{0}' detected.".format(dependency));
            this.walkDependencyGraph(this._registry[dependency], visited);
        }
        visited[registration.key] = null;
    };
    return ComponentRegistry;
}());
exports.default = ComponentRegistry;
//# sourceMappingURL=component-registry.js.map