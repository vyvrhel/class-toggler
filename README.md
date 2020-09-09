# Class Toggler
Simple javascript library for **switching element's CSS class** by clicking another element. Switching is controlled via *data-attributes*. Suitable for creating simply *show/hide*, *more/less*, *tabs*, *dropdown* or *modal* components without writing (repetitive) javascript code. Component visual behaviour is controlled by your stylesheets.

## Basic usage
Reveal text and hide the button when you click on it:
```html
<script src="toggler.min.js"></script>

<style>
  .module__text--hidden-toggle {
    display: none;
  }
  .module__button--active-toggle {
    display: none;
  }
</style>

<div class="module">

  <p
    class="module__text module__text--hidden-toggle"
    data-toggle-name="toggling-text"
    data-toggle-class="module__text--hidden-toggle"
  >Content to show</p>

  <button
    class="module__button"
    data-toggle-target="toggling-text"
    data-toggle-class="module__button--active-toggle"
  >Show content!</button>
  
</div>
```
