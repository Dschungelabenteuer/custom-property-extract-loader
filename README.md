# custom-property-extract-loader

Webpack loader for [custom-property-extract](https://github.com/Dschungelabenteuer/custom-property-extract).

## Install

Requires custom-property-extract as peer dependency.

```console
npm install --save-dev custom-property-extract custom-property-extract-loader
```

## Usage

**In require:**

```js
const variables = require('custom-property-extract!./style.scss');
```

**In webpack config:**

```js
{
  module: {
    loaders: [
      {
        test: /.s[ca]ss$/,
        loader: 'custom-property-extract-loader'
      }
    ]
  }
}
```

Beware! If you are using commonly used loaders such as css-loader or scss-loader to actually generate and import
stylesheets content, using the loader in the webpack config is not recommended unless you give webpack a way to
distinguish stylesheets used for custom properties definitions and stylesheets used for styling (e.g. by tweaking
the test properties).


## Options

| **Name**             | **Type**    | **Required** | **Default** | **Description**                                               |
|----------------------|-------------|--------------|-------------|---------------------------------------------------------------|
| **`syntax`**         | `{String}`  | `false`      | `"css"`     | Syntax of the source stylesheet (`"css"`, `"scss"`, `"sass"`) |
| **`prefix`**         | `{Boolean}` | `false`      | `true`      | Determines whether to prefix custom properties with `--`.     |