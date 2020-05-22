(function() {
    var toggler = {

        options: {
            togglerClass: '-active-toggle',
            toggleClass: '-hidden-toggle',
            togglerModifier: '--active-toggle',
            toggleModifier: '--hidden-toggle',
        },

        init: function() {
            this.initClick();
            this.initClickout();
            this.initEscape();
        },

        initClick: function() {
            var _self = this;
            document.addEventListener('click', function(event) {
                var allTogglers = document.querySelectorAll('[data-toggle-target]');
                for (var i = 0; i < allTogglers.length; i++) {
                    var toggler = allTogglers[i];
                    if (toggler.contains(event.target)) {
                        var minWidth = toggler.getAttribute('data-toggle-min-width') || 0;
                        var maxWidth = toggler.getAttribute('data-toggle-max-width') || 100000;
                        var tabs = toggler.getAttribute('data-toggle-tabs') || false;
                        var group = toggler.getAttribute('data-toggle-group') || tabs || false;
                        if (window.matchMedia('(min-width: ' + minWidth + 'px)').matches &&
                            window.matchMedia('(max-width: ' + maxWidth + 'px)').matches
                        ) {
                            if (!(_self.isActive(toggler) && tabs)) {
                                var toggleName = toggler.getAttribute('data-toggle-target');
                                var togglers = document.querySelectorAll('[data-toggle-target=' + toggleName + ']');
                                var toggles = document.querySelectorAll('[data-toggle-name=' + toggleName + ']');
                                _self.switchClass(togglers);
                                _self.switchClass(toggles);
                                _self.initFocus(toggler);
                                if (group) {
                                    _self.initGroup(toggler);
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

        initClickout: function() {
            var _self = this;
            document.addEventListener('click', function(event) {
                var clickoutTogglers = document.querySelectorAll('[data-toggle-clickout]');
                _self.closeAll(clickoutTogglers, event);
            });
        },

        initEscape: function() {
            var _self = this;
            document.addEventListener('keydown', function(event) {
                if (event.keyCode === 27) {
                    var escapeTogglers = document.querySelectorAll('[data-toggle-escape]');
                    _self.closeAll(escapeTogglers, null);
                }
            });
        },

        closeAll: function(items, event) {
            event = event || null;
            var _self = this;
            var i;
            var names = [];
            for (i = 0; i < items.length; i++) {
                if (_self.isActive(items[i])) {
                    var name = items[i].getAttribute('data-toggle-target');
                    if (names.indexOf(name) === -1) {
                        names.push(name);
                    }
                }
            }
            for (i = 0; i < names.length; i++) {
                var run = true;
                var preventedItems = document.querySelectorAll('[data-toggle-target=' + names[i] + '], [data-toggle-name=' + names[i] + ']');
                for (var j = 0; j < preventedItems.length; j++) {
                    if (event !== null && preventedItems[j].contains(event.target)) {
                        run = false;
                    }
                }
                if (run) {
                    _self.switchClass(document.querySelectorAll('[data-toggle-target=' + names[i] + ']'));
                    _self.switchClass(document.querySelectorAll('[data-toggle-name=' + names[i] + ']'));
                }
            }
        },

        initGroup: function(toggler) {
            var _self = this;
            var toggleGroup = toggler.getAttribute('data-toggle-group') || toggler.getAttribute('data-toggle-tabs');
            if (_self.isActive(toggler)) {
                var i;
                var names = [];
                var togglers = document.querySelectorAll('[data-toggle-group=' + toggleGroup + '], [data-toggle-tabs=' + toggleGroup + ']');
                for (i = 0; i < togglers.length; i++) {
                    if (_self.isActive(togglers[i]) && togglers[i] !== toggler) {
                        var name = togglers[i].getAttribute('data-toggle-target');
                        if (names.indexOf(name) === -1) {
                            names.push(name);
                        }
                    }
                }
                for (i = 0; i < names.length; i++) {
                    _self.switchClass(document.querySelectorAll('[data-toggle-target=' + names[i] + ']'));
                    _self.switchClass(document.querySelectorAll('[data-toggle-name=' + names[i] + ']'));
                }
            }
        },

        initFocus: function(toggler) {
            var focusTarget = toggler.getAttribute('data-toggle-focus');
            if (focusTarget && this.isActive(toggler)) {
                var focusElem = document.querySelector(focusTarget);
                if (focusElem) {
                    focusElem.focus();
                }
            }
        },

        switchClass: function(items) {
            var _self = this;
            for (var i = 0; i < items.length; i++) {
                var cssClass = '';
                if (items[i].hasAttribute('data-toggle-root')) {
                    cssClass = items[i].getAttribute('data-toggle-root');
                    if (items[i].hasAttribute('data-toggle-target')) {
                        cssClass = cssClass + (items[i].getAttribute('data-toggle-root-modifier') || _self.options.togglerModifier);
                    } else {
                        cssClass = cssClass + (items[i].getAttribute('data-toggle-root-modifier') || _self.options.toggleModifier);
                    }
                } else {
                    if (items[i].hasAttribute('data-toggle-target')) {
                        cssClass = _self.options.togglerClass;
                    } else {
                        cssClass = _self.options.toggleClass;
                    }
                }
                items[i].classList.toggle(cssClass);
                var toggledEvent = document.createEvent('Event');
                if (_self.isActive(items[i])) {
                    toggledEvent.initEvent('toggler:toggled:on', true, true);
                } else {
                    toggledEvent.initEvent('toggler:toggled:off', true, true);
                }
                items[i].dispatchEvent(toggledEvent);
            }
        },

        isActive: function(item) {
            return (item.classList.contains(this.options.togglerClass) ||
                (item.hasAttribute('data-toggle-root') &&
                item.classList.contains(item.getAttribute('data-toggle-root') + (item.getAttribute('data-toggle-root-modifier') || this.options.togglerModifier))));
        },
    };

    document.addEventListener('DOMContentLoaded', function() {
        toggler.init();
    });
})();