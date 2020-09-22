function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var classToggler = {
    // eslint-disable-line  no-unused-vars
    // Default options
    defaultOpt: {
      classActive: '-active-toggle',
      classHidden: '-hidden-toggle',
      attrTarget: 'data-toggle-target',
      attrName: 'data-toggle-name',
      attrClass: 'data-toggle-class',
      attrFocus: 'data-toggle-focus',
      attrAbort: 'data-toggle-abort',
      attrMatch: 'data-toggle-match',
      attrGroup: 'data-toggle-group',
      attrTabs: 'data-toggle-tabs',
      eventNamespace: 'ct'
    },
    // Options (set after init)
    opt: {},
    // Initialization
    init: function init(opt) {
      this.opt = _objectSpread(_objectSpread({}, this.defaultOpt), opt);
      this.initClick();
      this.initAbort();
      this.initFocus();
      this.initGroup();
      this.initTabs();
    },
    // Return nodes with specific data-attribute (and its value)
    items: function items(type, value) {
      var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '=';
      return document.querySelectorAll("[".concat(type).concat(value ? "".concat(operator, "'").concat(value, "'") : '', "]"));
    },
    // Return togglers (filtered by name)
    togglers: function togglers(name) {
      return this.items(this.opt.attrTarget, name);
    },
    // Return toggles (filtered by name)
    toggles: function toggles(name) {
      return this.items(this.opt.attrName, name);
    },
    // Handle click on toggler
    initClick: function initClick() {
      var _this = this;

      document.addEventListener('click', function (e) {
        _this.togglers().forEach(function (toggler) {
          if (toggler.contains(e.target)) {
            // Break if toggler doesn't match its media query
            var query = toggler.getAttribute(_this.opt.attrMatch);

            if (query && !window.matchMedia(query).matches) {
              return;
            } // Break if toggler is tab and is active (tabs aren't hideable by clicking it)


            if (toggler.getAttribute(_this.opt.attrTabs) && _this.isClassed(toggler)) {
              return;
            }

            e.preventDefault();

            _this.switch(toggler.getAttribute(_this.opt.attrTarget));

            document.dispatchEvent(new Event("".concat(_this.opt.eventNamespace, ".toggled")));
          }
        });
      });
    },
    // Return CSS class for item
    resolveClass: function resolveClass(item) {
      return item.getAttribute(this.opt.attrClass) || (this.isToggler(item) ? this.opt.classActive : this.opt.classHidden);
    },
    // Switche CSS class on toggler/toggle with specific name
    switch: function _switch(name) {
      var _this2 = this;

      return [].concat(_toConsumableArray(this.togglers(name)), _toConsumableArray(this.toggles(name))).forEach(function (item) {
        item.classList.toggle(_this2.resolveClass(item));

        _this2.doItemEvent(item);
      });
    },
    // Fire event on toggled item
    // (ct.button.on / ct.button.off / ct.content.shown / ct.content.hidden)
    doItemEvent: function doItemEvent(item) {
      item.dispatchEvent(new Event(this.isToggler(item) ? "".concat(this.opt.eventNamespace, ".button.").concat(this.isClassed(item) ? 'on' : 'off') : "".concat(this.opt.eventNamespace, ".content.").concat(this.isClassed(item) ? 'hidden' : 'shown')));
    },
    // Item is toggler (not toggle)?
    isToggler: function isToggler(item) {
      return item.getAttribute(this.opt.attrTarget);
    },
    // Has toggler/toggle its toggling class?
    isClassed: function isClassed(item) {
      return item.classList.contains(this.resolveClass(item));
    },
    // Focus specific element when toggle is shown
    initFocus: function initFocus() {
      var _this3 = this;

      this.items(this.opt.attrFocus).forEach(function (item) {
        item.addEventListener("".concat(_this3.opt.eventNamespace, ".content.shown"), function () {
          item.querySelector(item.getAttribute(_this3.opt.attrFocus)).focus();
        });
      });
    },
    // Initialize hiding toggles on clickout/pressing escape
    initAbort: function initAbort() {
      var _this4 = this;

      document.addEventListener('keydown', function (e) {
        return e.keyCode === 27 ? _this4.hide(_this4.items(_this4.opt.attrAbort, 'escape', '*=')) : false;
      });
      document.addEventListener('click', function (e) {
        return _this4.hide(_this4.items(_this4.opt.attrAbort, 'clickout', '*='), e);
      });
    },
    // Hide toggles
    hide: function hide(items, clickoutEvent) {
      var _this5 = this;

      // Loop over abort initiators
      _toConsumableArray(new Set(_toConsumableArray(items) // Filter only active togglers
      .filter(function (item) {
        return item.classList.contains(_this5.resolveClass(item));
      }) // Get theirs names
      .map(function (item) {
        return item.getAttribute(_this5.opt.attrTarget);
      }) // Filter only names of togglers/toggles which aren't target of click event
      .filter(function (name) {
        var prevent = false;
        [].concat(_toConsumableArray(_this5.togglers(name)), _toConsumableArray(_this5.toggles(name))).forEach(function (target) {
          if (clickoutEvent && target.contains(clickoutEvent.target)) {
            prevent = true;
            return false;
          }

          return true;
        });
        return !prevent;
      }))).forEach(function (name) {
        return _this5.switch(name);
      }); // Hide

    },
    // Keep active only one toggler from group
    initGroup: function initGroup() {
      var _this6 = this;

      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.opt.attrGroup;
      this.items(type).forEach(function (toggler) {
        toggler.addEventListener("".concat(_this6.opt.eventNamespace, ".button.on"), function () {
          var names = [];

          _this6.items(type, toggler.getAttribute(type)).forEach(function (item) {
            var name = item.getAttribute(_this6.opt.attrTarget);

            if (item !== toggler && !names.includes(name) && _this6.isClassed(item)) {
              names.push(name);

              _this6.switch(name);
            }
          });
        });
      });
    },
    // Keep active only one toggler from tabs
    initTabs: function initTabs() {
      this.initGroup(this.opt.attrTabs);
    }
  }; // Assign classToggler to global variable

  window.classToggler = classToggler;
})();