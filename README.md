# Class Toggler
Simple javascript library for **switching element's CSS class** by clicking another element. Switching is controlled via *data-attributes*. Suitable for creating simply *show/hide*, *more/less*, *tabs*, *dropdown* or *modal* components without writing (repetitive) javascript code, all is done within your HTML template. Component visual behaviour is controlled by your stylesheets.

## Basic Usage
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

## Options / Data Attributtes
Behaviour of each toggle can be set via these *data attributes*:

### Toggle Button Options

#### `data-toggle-target="name"`
Targets related content(s) that has `data-toggle-name="name"`.

---

#### `data-toggle-class="class-name"`
CSS *class-name* which will be assigned to active toggle button (default `-active-toggle`). If you are using BEM naming convention, you'll probably need something like this:
````html
<div class="Module">
  <button class="Module__button" data-toggle-target="module-text" data-toggle-class="Module__button--active">
    Show text!
  </button>
  <p class="Module__text Module__text--hidden" data-toggle-name="module-text" data-toggle-class="Module__text--hidden">
    Text lorem ipsum dolor.
  </p>
</div>
````

---

#### `data-toggle-group="group-name"`
Each group (togglers with the same *group-name*) can have maximum of one active toggler. Turning one toggler on will turn off the rest of togglers in group.

---

#### `data-toggle-tabs="tabs-name"`
Each tabs group (togglers with the same *tabs-name*) has always just one active toggler. Turning one toggler on will turn off the rest of togglers in tabs. Active toggler can't be turned off by clicking it.

---

#### `data-toggle-abort="event-1 event-2"`
Automatically hides toggle for these possible *events*:
- *escape* - Hide when escape key is pressed.
- *clickout* - Hide when clicking outside the toggle content.

---

#### `data-toggle-match="media-query"`
Binds toggle function on toggler only for macthing *media-query* (e.g. `(min-width: 30em)`), otherwise default action will be fired (opening the `<a>`'s link, submitting `<button>`'s form...).

### Toggle Content Options

#### `data-toggle-name="name"`
Targets related button(s) that has `data-toggle-target="name"`.

---

#### `data-toggle-class="class-name"`
CSS *class-name* which will be assigned to hidden toggle content (default `-hidden-toggle`). Analogical to [toggle button option](#data-toggle-classclass-name).

---

#### `data-toggle-focus="css-selector"`
Element targeted by *css-selector* (e.g. `#form-field`) will be focused when content is shown.

## Events

#### `ct.button.on`
Fired at toggle button after it is turned on.

---

#### `ct.button.off`
Fired at toggle button after it is turned off.

---

#### `ct.content.shown`
Fired at toggle content after it is shown.

---

#### `ct.content.hidden`
Fired at toggle content after it is hidden.
