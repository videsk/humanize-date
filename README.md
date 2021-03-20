# Humanize Date

This library was designed to handle dates and returns readable formats for humans.

Humanize Date not have any dependency, because use native ES6 methods to parse and convert dates to string for be easy readable.

By default, is adapted to locate the language format of user, so never need worry about use i18n or languages tree shaking. Humanize Date use `navigator.language` as parameter of native method as `toLocaleDateString` and `Intl.RelativeTimeFormat`.

So, what do you need? Two dates :)

```markdown
NOTICE: You'll need add polyfill in Safari with previous of the version 14.

SUGGESTION: Add Int from https://polyfill.io/
```

## How to use

### Install

```shell
npm i @videsk/humanize-date
```

It's simple:

```js
new HumanizeDate()...
```

### Humanize date to locale

This returns the date you pass as parameter, will be readable for the user in their local language (browser).

```js
new HumanizeDate().toLocale(date1);
// Output
March 01, 2021
```

### Humanize relative time to locale

This returns the relative time in readable units you set as parameter as the result of difference of dates .

```js
new HumanizeDate().dates(date1, date2).ago('days');
// Ouput
3 days ago
new HumanizeDate().dates(date1, date2).within('days');
// Output
in 3 days
```

Also, you will be able to modify the default `options` passing the second parameter. The available options can you [check here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat).

### Get dates difference in units

Also, you can get easily the difference between two dates based on the unit.

```js
new HumanizeDate().dates(date1, date2).minutes();
```

## Units

The available units are: `seconds`, `minutes`, `hours`, `days`, `weeks`, `quarters` and `years`. So you can use it with relative time methods and to get the difference.

# License

LGPL-2.1 developed by Videsk.



