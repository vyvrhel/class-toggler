# Class Toggler
Simple javascript library for **switching element's CSS class** by clicking another element. Switching is controlled via *data-attributes*. Suitable for creating simply *show/hide*, *more/less*, *tabs*, *dropdown* or *modal* components without writing (repetitive) javascript code, all is done within your HTML template. Component visual behaviour is controlled by your stylesheets.

## Basic usage
When toggling there are two types of HTML elements:

### Toggle Button
- Show/hides related content(s) when clicked.
- Related content(s) is defined by `data-toggle-target` HTML attribut value.
- **Active state** is identified by customizable CSS class (default `-active-toggle`).
### Toggle Content
- Element to be shown/hidden when related button(s) is clicked.
- Related button(s) is defined by `data-toggle-name` HTML attribut value.
- **Hidden state** is identified by customizable CSS class (default `-hidden-toggle`).

### Basic example
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

## Options
Behaviour of each toggle pair can be set via these *data attributes*:

### Toggle button

#### `data-toggle-target="name"`
Targets related content(s) that has set `data-toggle-name="name"`.

#### `data-toggle-abort="event-1 event-2"`
Turns on automatic hiding of toggle for these possible events/values:
- *escape* - Hide when escape key is pressed.
- *clickout* - Hide when clicking outside the toggle content.

#### `data-toggle-group="group-name"`
Each group (togglers with the same *group-name*) can have only one active toggler (turning one toggler on will turn off the rest of togglers in group).

#### `data-toggle-tabs="tabs-name"`
Each tabs group (togglers with the same *tabs-name*) has always just one active toggler (turning one toggler on will turn off the rest of togglers in tabs; active toggler can't be turned off by clicking it).

