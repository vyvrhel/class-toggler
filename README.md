# Class Toggler
Simple javascript library for **toggling element's CSS class** by clicking another element(s). Toggling is controlled **via data-attributes**. Suitable for creating simply *[show/hide](https://vyvrhel.github.io/class-toggler/)*, *[more/less](https://vyvrhel.github.io/class-toggler/#demo-more-less)*, *[tabs](https://vyvrhel.github.io/class-toggler/#demo-tabs)*, *[accordion](https://vyvrhel.github.io/class-toggler/#accordion)*, *[dropdown](https://vyvrhel.github.io/class-toggler/#demo-dropdown)* or *[modal](https://vyvrhel.github.io/class-toggler/#demo-modal)* components without writing (repetitive) javascript code, all is done within your HTML template. Component visual behaviour is controlled by your stylesheets.

- [Basic Usage](#-basic-usage)
- [Initialization](#-initialization)
- [Options / Data Attributes](#-options--data-attributtes)
- [Events](#-events)
- [Configuration](#-configuration)
- [Demos](https://vyvrhel.github.io/class-toggler/)

## 📋 Basic Usage
When toggling there are two types of HTML elements:

### Toggle Button
- Show/hides related content(s) when clicked.
- Related content(s) is defined by `data-toggle-target` HTML attribut value.
- **Active state** is identified by customizable CSS class (default `-active-toggle`).

### Toggle Content
- Element to be shown/hidden when related button(s) is clicked.
- Related button(s) is defined by `data-toggle-name` HTML attribut value.
- **Hidden state** is identified by customizable CSS class (default `-hidden-toggle`).

### Basic Example
Reveals text and make the button green when you click on it:
```html
<!-- Linking Class Toggler -->
<script src="class-toggler.min.js"></script>

<!-- Initialization of Class Toggler -->
<script>
  document.addEventListener('DOMContentLoaded', () => classToggler.init());
</script>

<!-- Styles for hidden content and active button -->
<style>
  .-active-toggle {
    color: green;
  }
  .-hidden-toggle {
    display: none;
  }
</style>

<!-- Toggle content -->
<div class="-hidden-toggle" data-toggle-name="toggle-name">
  <p>Text to be toggled.</p>
</div>

<!-- Toggle button -->
<button data-toggle-target="toggle-name">
  Toggle text!
</button>
```
(See [live demos](https://vyvrhel.github.io/class-toggler/))

## 🚀 Initialization
1. Link *Class Toggler* library in your HTML:
```html
<script src="path-to-library/dist/class-toggler.min.js"></script>
```

2. Initialize *Class Toggler* in your JS:
```js
document.addEventListener('DOMContentLoaded', () => {
  classToggler.init();
});
```

## ⚙ Options / Data Attributtes
Behaviour of each individual toggle can be set via these *data attributes*:

### Toggle Button Options

#### `data-toggle-target="name"`
Targets related content(s) that has `data-toggle-name="name"`.

(See [More/Less demo](https://vyvrhel.github.io/class-toggler/#demo-more-less))

---

#### `data-toggle-class="class-name"`
CSS *class-name* that will be assigned to active toggle button (default `-active-toggle`).

For example, when using *BEM* naming convention, your code should look like this:
````html
<div class="Module">

  <button
    class="Module__button"
    data-toggle-target="module-text"
    data-toggle-class="Module__button--active"
  >Show text!</button>

  <p
    class="Module__text Module__text--hidden"
    data-toggle-name="module-text"
    data-toggle-class="Module__text--hidden"
  >Text lorem ipsum dolor.</p>

</div>
````

(See [More/Less demo](https://vyvrhel.github.io/class-toggler/#demo-more-less))

---

#### `data-toggle-group="group-name"`
Each group (togglers with the same *group-name*) can have maximum of one active toggler. Turning one toggler on will turn off the rest of togglers in group.

(See [Accordion demo](https://vyvrhel.github.io/class-toggler/#demo-accordion))

---

#### `data-toggle-tabs="tabs-name"`
Each tabs group (togglers with the same *tabs-name*) has always just one active toggler. Turning one toggler on will turn off the rest of togglers in tabs. Active toggler can't be turned off by clicking it.

(See [Tabs demo](https://vyvrhel.github.io/class-toggler/#demo-tabs))

---

#### `data-toggle-abort="event-1 event-2"`
Automatically hides toggle for these possible *events*:
- *escape* - Hide when escape key is pressed.
- *clickout* - Hide when clicking outside the toggle content.

(See [Modal demo](https://vyvrhel.github.io/class-toggler/#demo-modal))

---

#### `data-toggle-match="media-query"`
Binds toggle function on toggler only for matching *media-query* (e.g. `(min-width: 30em)`), otherwise default action will be fired (opening the `<a>`'s link, submitting `<button>`'s form...).

(See [Media query demo](https://vyvrhel.github.io/class-toggler/#demo-media-query))

### Toggle Content Options

#### `data-toggle-name="name"`
Targets related button(s) that has `data-toggle-target="name"`.

(See [More/Less demo](https://vyvrhel.github.io/class-toggler/#demo-more-less))

---

#### `data-toggle-class="class-name"`
CSS *class-name* that will be assigned to hidden toggle content (default `-hidden-toggle`). See [toggle button option example](#data-toggle-classclass-name).

(See [More/Less demo](https://vyvrhel.github.io/class-toggler/#demo-more-less))

---

#### `data-toggle-focus="css-selector"`
Element targeted by *css-selector* (e.g. `#form-field`) will be focused when content is shown.

(See [Focused content demo](https://vyvrhel.github.io/class-toggler/#demo-focus))

## 👂 Events

#### `ct.button.on`
Fired at toggle button after it is turned on.

````js
document.querySelector('#button').addEventListener('ct.button.on', () => {
  console.log('Button turned on!');
});
````

---

#### `ct.button.off`
Fired at toggle button after it is turned off.

````js
document.querySelector('#button').addEventListener('ct.button.off', () => {
  console.log('Button turned off!');
});
````

---

#### `ct.content.shown`
Fired at toggle content after it is shown.

````js
document.querySelector('#content').addEventListener('ct.content.shown', () => {
  console.log('Content shown!');
});
````

---

#### `ct.content.hidden`
Fired at toggle content after it is hidden.

````js
document.querySelector('#content').addEventListener('ct.content.hidden', () => {
  console.log('Content hidden!');
});
````

---

#### `ct.toggled`
Fired at document when any toggle button is clicked.

````js
document.addEventListener('ct.toggled', () => {
  console.log('Toggle button click!');
});
````

## 🛠 Configuration
*Class Toggler* can be initialized with these options:
- `classActive` - CSS class for active toggle button (default `-active-toggle`)
- `classHidden` - CSS class for hidden toggle content (default `-hidden-toggle`)
- `attrTarget` - HTML data attribute used for toggle targeting (default `data-toggle-target`),
- `attrName` - HTML attribute used for toggle naming (default `data-toggle-name`),
- `attrClass` - HTML attribute defining toggled CSS class (default `data-toggle-class`),
- `attrFocus` - HTML attribute used for focusing toggle content (default `data-toggle-focus`),
- `attrAbort` - HTML attribute used for toggle aborting (default `data-toggle-abort`),
- `attrMatch` - HTML attribute used for toggle media query (default `data-toggle-match`),
- `attrGroup` - HTML attribute used for toggle grouping (default `data-toggle-group`),
- `attrTabs` - HTML attribute used for toggle grouping in tabs (default `data-toggle-tabs`),
- `eventNamespace` - Namespace for Class Toggler events (default `ct`),

Example of initialization with custom configuration:
```js
document.addEventListener('DOMContentLoaded', () => {
  classToggler.init({
    classActive: 'your-active-class',
    classHidden: 'your-hidden-class',
  });
});
```
