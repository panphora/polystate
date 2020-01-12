# Polystate

![npm bundle size](https://img.shields.io/bundlephobia/minzip/polystate)

Polystate lets you set and unset classes in your DOM with the click of a button. Much simpler than using vanilla JS or a full JS framework.

Perfect for static sites & server-rendered apps.

## Install

**From CDN:** Add the following script to the end of your `<head>` section.
```html
<script src="https://cdn.jsdelivr.net/gh/panphora/polystate@v0.5.0/dist/polystate.min.js" defer></script>
```

That's it. It will initialize itself.

**From NPM:** Install the package from NPM.
```js
npm i polystate
```

Include it in your script.
```js
import polystate from 'polystate'
```

## Use

*Menu*
```html
<body>
  <button data-click-to-toggle-class="menu-open">toggle</button>
  <aside data-click-away-to-remove-class="menu-open" data-show-if=".menu-open">menu</aside>
  <div data-hide-if=".menu-open">hide if menu open</div>
</body>
```

*Tabs*
```html

```


## Learn

