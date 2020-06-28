"use strict";
var __extends = (this && this.__extends) || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var reselect_1 = require("reselect");
var GlobalStateSelector = (function () {
  function GlobalStateSelector() {
    this.selectGlobalState = function (state) { return state.globalState || {}; };
  }
  return GlobalStateSelector;
}());
exports.GlobalStateSelector = GlobalStateSelector;
var BaseSelector = (function (_super) {
  __extends(BaseSelector, _super);
  function BaseSelector() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.selectFormDataState = function (state) { return state.formDataState; };
    return _this;
  }
  return BaseSelector;
}(GlobalStateSelector));
exports.BaseSelector = BaseSelector;
var DiffSelector = (function (_super) {
  __extends(DiffSelector, _super);
  function DiffSelector(diffFormName) {
    var _this = _super.call(this) || this;
    _this.diffFormName = diffFormName;
    _this.selectDiff = reselect_1.createSelector(_this.selectGlobalState, function (globalState) {
      if (globalState) {
        var diff = globalState[_this.diffFormName];
        if (diff) {
          var result = {
            id: diff.id || '',
            oldValue: diff.oldValue,
            newValue: diff.newValue,
          };
          return result;
        }
      }
      var d = {
        id: null,
        oldValue: null,
        newValue: null
      };
      return d;
    });
    return _this;
  }
  return DiffSelector;
}(GlobalStateSelector));
exports.DiffSelector = DiffSelector;
var ListGlobalStateSelector = (function (_super) {
  __extends(ListGlobalStateSelector, _super);
  function ListGlobalStateSelector(listFormName) {
    var _this = _super.call(this) || this;
    _this.listFormName = listFormName;
    _this.selectListData = reselect_1.createSelector(_this.selectGlobalState, function (globalState) {
      if (globalState && globalState[_this.listFormName]) {
        return globalState[_this.listFormName];
      }
      return [];
    });
    return _this;
  }
  return ListGlobalStateSelector;
}(GlobalStateSelector));
exports.ListGlobalStateSelector = ListGlobalStateSelector;
var ViewGlobalStateSelector = (function (_super) {
  __extends(ViewGlobalStateSelector, _super);
  function ViewGlobalStateSelector(formName) {
    var _this = _super.call(this) || this;
    _this.formName = formName;
    _this.selectFormData = reselect_1.createSelector(_this.selectGlobalState, function (globalState) {
      if (globalState && globalState[_this.formName]) {
        return globalState[_this.formName];
      }
      return _this.createModel();
    });
    return _this;
  }
  ViewGlobalStateSelector.prototype.createModel = function () {
    var model = {};
    return model;
  };
  return ViewGlobalStateSelector;
}(GlobalStateSelector));
exports.ViewGlobalStateSelector = ViewGlobalStateSelector;
var ViewListGlobalStateSelector = (function (_super) {
  __extends(ViewListGlobalStateSelector, _super);
  function ViewListGlobalStateSelector(formName, listFormName) {
    var _this = _super.call(this, formName) || this;
    _this.listFormName = listFormName;
    _this.selectListData = reselect_1.createSelector(_this.selectGlobalState, function (globalState) {
      if (globalState && globalState[_this.listFormName]) {
        return globalState[_this.listFormName];
      }
      return [];
    });
    return _this;
  }
  return ViewListGlobalStateSelector;
}(ViewGlobalStateSelector));
exports.ViewListGlobalStateSelector = ViewListGlobalStateSelector;
var ViewListDiffGlobalStateSelector = (function (_super) {
  __extends(ViewListDiffGlobalStateSelector, _super);
  function ViewListDiffGlobalStateSelector(formName, listFormName, diffFormName) {
    var _this = _super.call(this, formName, listFormName) || this;
    _this.diffFormName = diffFormName;
    _this.selectDiff = reselect_1.createSelector(_this.selectGlobalState, function (globalState) {
      if (globalState) {
        var diff = globalState[_this.diffFormName];
        if (diff) {
          var result = {
            id: diff.id || '',
            oldValue: diff.oldValue,
            newValue: diff.newValue,
          };
          return result;
        }
      }
      var d = {
        id: null,
        oldValue: null,
        newValue: null
      };
      return d;
    });
    return _this;
  }
  return ViewListDiffGlobalStateSelector;
}(ViewListGlobalStateSelector));
exports.ViewListDiffGlobalStateSelector = ViewListDiffGlobalStateSelector;
