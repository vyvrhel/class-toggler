(function Toggler() {
  var toggler = {
    options: {
      togglerClass: '-active-toggle',
      toggleClass: '-hidden-toggle',
      togglerModifier: '--active-toggle',
      toggleModifier: '--hidden-toggle'
    },
    init: function init() {
      this.initClick();
      this.initClickout();
      this.initEscape();
    },
    initClick: function initClick() {
      var _this = this;

      document.addEventListener('click', function (event) {
        var allTogglers = document.querySelectorAll('[data-toggle-target]');

        for (var i = 0; i < allTogglers.length; i += 1) {
          var item = allTogglers[i];

          if (item.contains(event.target)) {
            var minWidth = item.getAttribute('data-toggle-min-width') || 0;
            var maxWidth = item.getAttribute('data-toggle-max-width') || 100000;
            var tabs = item.getAttribute('data-toggle-tabs') || false;
            var group = item.getAttribute('data-toggle-group') || tabs || false;

            if (window.matchMedia("(min-width: ".concat(minWidth, "px)")).matches && window.matchMedia("(max-width: ".concat(maxWidth, "px)")).matches) {
              if (!(_this.isActive(item) && tabs)) {
                var toggleName = item.getAttribute('data-toggle-target');
                var togglers = document.querySelectorAll("[data-toggle-target=".concat(toggleName, "]"));
                var toggles = document.querySelectorAll("[data-toggle-name=".concat(toggleName, "]"));

                _this.switchClass(togglers);

                _this.switchClass(toggles);

                _this.initFocus(item);

                if (group) {
                  _this.initGroup(item);
                }

                var toggledEvent = document.createEvent('Event');
                toggledEvent.initEvent('toggler:toggled', true, true);
                window.dispatchEvent(toggledEvent);
              }

              event.preventDefault();
            }
          }
        }
      });
    },
    initClickout: function initClickout() {
      var _this2 = this;

      document.addEventListener('click', function (event) {
        _this2.closeAll(document.querySelectorAll('[data-toggle-clickout]'), event);
      });
    },
    initEscape: function initEscape() {
      var _this3 = this;

      document.addEventListener('keydown', function (event) {
        if (event.keyCode === 27) {
          _this3.closeAll(document.querySelectorAll('[data-toggle-escape]'), null);
        }
      });
    },
    closeAll: function closeAll(items) {
      var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var names = [];

      for (var i = 0; i < items.length; i += 1) {
        if (this.isActive(items[i])) {
          var name = items[i].getAttribute('data-toggle-target');

          if (names.indexOf(name) === -1) {
            names.push(name);
          }
        }
      }

      for (var _i = 0; _i < names.length; _i += 1) {
        var run = true;
        var preventedItems = document.querySelectorAll("[data-toggle-target=".concat(names[_i], "], [data-toggle-name=").concat(names[_i], "]"));

        for (var j = 0; j < preventedItems.length; j += 1) {
          if (event !== null && preventedItems[j].contains(event.target)) {
            run = false;
          }
        }

        if (run) {
          this.switchClass(document.querySelectorAll("[data-toggle-target=".concat(names[_i], "]")));
          this.switchClass(document.querySelectorAll("[data-toggle-name=".concat(names[_i], "]")));
        }
      }
    },
    initGroup: function initGroup(item) {
      var toggleGroup = item.getAttribute('data-toggle-group') || item.getAttribute('data-toggle-tabs');

      if (this.isActive(item)) {
        var names = [];
        var togglers = document.querySelectorAll("[data-toggle-group=".concat(toggleGroup, "], [data-toggle-tabs=").concat(toggleGroup, "]"));

        for (var i = 0; i < togglers.length; i += 1) {
          if (this.isActive(togglers[i]) && togglers[i] !== item) {
            var name = togglers[i].getAttribute('data-toggle-target');

            if (names.indexOf(name) === -1) {
              names.push(name);
            }
          }
        }

        for (var _i2 = 0; _i2 < names.length; _i2 += 1) {
          this.switchClass(document.querySelectorAll("[data-toggle-target=".concat(names[_i2], "]")));
          this.switchClass(document.querySelectorAll("[data-toggle-name=".concat(names[_i2], "]")));
        }
      }
    },
    initFocus: function initFocus(item) {
      var focusTarget = item.getAttribute('data-toggle-focus');

      if (focusTarget && this.isActive(item)) {
        var focusElem = document.querySelector(focusTarget);

        if (focusElem) {
          focusElem.focus();
        }
      }
    },
    switchClass: function switchClass(items) {
      for (var i = 0; i < items.length; i += 1) {
        var cssClass = '';

        if (items[i].hasAttribute('data-toggle-root')) {
          cssClass = items[i].getAttribute('data-toggle-root');

          if (items[i].hasAttribute('data-toggle-target')) {
            cssClass += items[i].getAttribute('data-toggle-root-modifier') || this.options.togglerModifier;
          } else {
            cssClass += items[i].getAttribute('data-toggle-root-modifier') || this.options.toggleModifier;
          }
        } else if (items[i].hasAttribute('data-toggle-target')) {
          cssClass = this.options.togglerClass;
        } else {
          cssClass = this.options.toggleClass;
        }

        items[i].classList.toggle(cssClass);
        var toggledEvent = document.createEvent('Event');

        if (this.isActive(items[i])) {
          toggledEvent.initEvent('es:toggled:on', true, true);
        } else {
          toggledEvent.initEvent('es:toggled:off', true, true);
        }

        items[i].dispatchEvent(toggledEvent);
      }
    },
    isActive: function isActive(item) {
      return item.classList.contains(this.options.togglerClass) || item.hasAttribute('data-toggle-root') && item.classList.contains(item.getAttribute('data-toggle-root') + (item.getAttribute('data-toggle-root-modifier') || this.options.togglerModifier));
    }
  };
  document.addEventListener('DOMContentLoaded', function () {
    toggler.init();
  });
})();