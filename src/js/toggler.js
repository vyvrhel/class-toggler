(function Toggler() {
  const toggler = {

    options: {
      togglerClass: '-active-toggle',
      toggleClass: '-hidden-toggle',
      togglerModifier: '--active-toggle',
      toggleModifier: '--hidden-toggle',
    },

    init() {
      this.initClick();
      this.initClickout();
      this.initEscape();
    },

    initClick() {
      document.addEventListener('click', (event) => {
        const allTogglers = document.querySelectorAll('[data-toggle-target]');
        for (let i = 0; i < allTogglers.length; i += 1) {
          const item = allTogglers[i];
          if (item.contains(event.target)) {
            const minWidth = item.getAttribute('data-toggle-min-width') || 0;
            const maxWidth = item.getAttribute('data-toggle-max-width') || 100000;
            const tabs = item.getAttribute('data-toggle-tabs') || false;
            const group = item.getAttribute('data-toggle-group') || tabs || false;
            if (window.matchMedia(`(min-width: ${minWidth}px)`).matches
              && window.matchMedia(`(max-width: ${maxWidth}px)`).matches
            ) {
              if (!(this.isActive(item) && tabs)) {
                const toggleName = item.getAttribute('data-toggle-target');
                const togglers = document.querySelectorAll(`[data-toggle-target=${toggleName}]`);
                const toggles = document.querySelectorAll(`[data-toggle-name=${toggleName}]`);
                this.switchClass(togglers);
                this.switchClass(toggles);
                this.initFocus(item);
                if (group) {
                  this.initGroup(item);
                }
                const toggledEvent = document.createEvent('Event');
                toggledEvent.initEvent('toggler:toggled', true, true);
                window.dispatchEvent(toggledEvent);
              }
              event.preventDefault();
            }
          }
        }
      });
    },

    initClickout() {
      document.addEventListener('click', (event) => {
        this.closeAll(document.querySelectorAll('[data-toggle-clickout]'), event);
      });
    },

    initEscape() {
      document.addEventListener('keydown', (event) => {
        if (event.keyCode === 27) {
          this.closeAll(document.querySelectorAll('[data-toggle-escape]'), null);
        }
      });
    },

    closeAll(items, event = null) {
      const names = [];
      for (let i = 0; i < items.length; i += 1) {
        if (this.isActive(items[i])) {
          const name = items[i].getAttribute('data-toggle-target');
          if (names.indexOf(name) === -1) {
            names.push(name);
          }
        }
      }
      for (let i = 0; i < names.length; i += 1) {
        let run = true;
        const preventedItems = document.querySelectorAll(`[data-toggle-target=${names[i]}], [data-toggle-name=${names[i]}]`);
        for (let j = 0; j < preventedItems.length; j += 1) {
          if (event !== null && preventedItems[j].contains(event.target)) {
            run = false;
          }
        }
        if (run) {
          this.switchClass(document.querySelectorAll(`[data-toggle-target=${names[i]}]`));
          this.switchClass(document.querySelectorAll(`[data-toggle-name=${names[i]}]`));
        }
      }
    },

    initGroup(item) {
      const toggleGroup = item.getAttribute('data-toggle-group') || item.getAttribute('data-toggle-tabs');
      if (this.isActive(item)) {
        const names = [];
        const togglers = document.querySelectorAll(`[data-toggle-group=${toggleGroup}], [data-toggle-tabs=${toggleGroup}]`);
        for (let i = 0; i < togglers.length; i += 1) {
          if (this.isActive(togglers[i]) && togglers[i] !== item) {
            const name = togglers[i].getAttribute('data-toggle-target');
            if (names.indexOf(name) === -1) {
              names.push(name);
            }
          }
        }
        for (let i = 0; i < names.length; i += 1) {
          this.switchClass(document.querySelectorAll(`[data-toggle-target=${names[i]}]`));
          this.switchClass(document.querySelectorAll(`[data-toggle-name=${names[i]}]`));
        }
      }
    },

    initFocus(item) {
      const focusTarget = item.getAttribute('data-toggle-focus');
      if (focusTarget && this.isActive(item)) {
        const focusElem = document.querySelector(focusTarget);
        if (focusElem) {
          focusElem.focus();
        }
      }
    },

    switchClass(items) {
      for (let i = 0; i < items.length; i += 1) {
        let cssClass = '';
        if (items[i].hasAttribute('data-toggle-root')) {
          cssClass = items[i].getAttribute('data-toggle-root');
          if (items[i].hasAttribute('data-toggle-target')) {
            cssClass += (items[i].getAttribute('data-toggle-root-modifier') || this.options.togglerModifier);
          } else {
            cssClass += (items[i].getAttribute('data-toggle-root-modifier') || this.options.toggleModifier);
          }
        } else if (items[i].hasAttribute('data-toggle-target')) {
          cssClass = this.options.togglerClass;
        } else {
          cssClass = this.options.toggleClass;
        }
        items[i].classList.toggle(cssClass);
        const toggledEvent = document.createEvent('Event');
        if (this.isActive(items[i])) {
          toggledEvent.initEvent('es:toggled:on', true, true);
        } else {
          toggledEvent.initEvent('es:toggled:off', true, true);
        }
        items[i].dispatchEvent(toggledEvent);
      }
    },

    isActive(item) {
      return (item.classList.contains(this.options.togglerClass)
        || (item.hasAttribute('data-toggle-root')
        && item.classList.contains(item.getAttribute('data-toggle-root') + (item.getAttribute('data-toggle-root-modifier') || this.options.togglerModifier))));
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    toggler.init();
  });
}());
