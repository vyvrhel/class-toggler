# Toggler
## Basic usage

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
    data-toggle-root="module__text"
  >Content to show</p>

  <button
    class="module__button"
    data-toggle-target="toggling-text"
    data-toggle-root="module__button"
  >Show content!</button>
  
</div>
```
