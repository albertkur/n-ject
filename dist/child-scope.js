"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_scope_1 = require("./base-scope");
var n_defensive_1 = require("n-defensive");
var scope_type_1 = require("./scope-type");
// internal
var ChildScope = (function (_super) {
    __extends(ChildScope, _super);
    function ChildScope(componentRegistry, parentScope) {
        var _this = this;
        n_defensive_1.default(componentRegistry, "componentRegistry").ensureHasValue();
        n_defensive_1.default(parentScope, "parentScope").ensureHasValue();
        _this = _super.call(this, scope_type_1.default.Child, componentRegistry, parentScope) || this;
        return _this;
    }
    return ChildScope;
}(base_scope_1.default));
exports.default = ChildScope;
//# sourceMappingURL=child-scope.js.map