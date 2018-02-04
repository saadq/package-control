# package-control
> A client for working with `package-control` in Node.

[![Build Status](https://travis-ci.org/saadq/package-control.svg?branch=master)](https://travis-ci.org/saadq/package-control) [![Flow typed](https://img.shields.io/badge/flow-typed-E8BD36.svg)](https://flow.org)

## Installation

```bash
$ npm install package-control
```

## Usage

```js
const PackageControl = require('package-control')

const pc = new PackageControl()

;(async () => {
  const packages = await pc.search('Material')
  console.log(packages)
})()
```

## API

### Response

Every available method on the `PackageControl` object returns an `Array` of `Package` objects.

A `Package` has the following format:

```js
type Package = {
  name: string,
  description: string,
  authors: Array<string>,
  labels: Array<string>,
  unique_installs: number,
  st_versions: Array<number>,
  installs_rank: number,
  trending_rank: ?number,
  first_seen: string,
  last_seen: string,
  last_modified: string,
  is_missing: boolean,
  platforms: Array<'windows' | 'osx' | 'linux'>,
  missing_error?: string,
  highlighted_name?: string,
  highlighted_authors?: Array<string>,
  z_value?: ?number
}
```

An example:

```json
{
  "authors": ["saadq"],
  "missing_error": "",
  "highlighted_name": "\u0002Materialize\u0003",
  "st_versions": [3],
  "name": "Materialize",
  "highlighted_authors": ["saadq"],
  "unique_installs": 98365,
  "trending_rank": null,
  "relevance": 11.3816524635662,
  "highlighted_description": "Elegant themes for Sublime Text 3",
  "labels": ["theme", "color scheme", "material"],
  "first_seen": "2015-08-04T15:32:39Z",
  "last_modified": "2017-10-17T14:31:52Z",
  "is_missing": false,
  "installs_rank": 136,
  "platforms": ["windows", "osx", "linux"]
}
```

### pc.search(query[, opts])

> Use a query to search for packages.

| param       | required | type                        | description                       | example                                                       |
| ----------- | -------- | --------------------------- | --------------------------------- | ------------------------------------------------------------- |
| query       | yes      | string                      | The query you want to search for. | `pc.search('react')`                                          |
| opts.labels | no       | string &#124; Array<String> | Filter package results by label.  | `pc.search('material', { labels: ['color scheme', 'theme']})` |
| opts.limit  | no       | number                      | Limit size of package results.    | `pc.search('material', { limit: 15 })`                        |

### pc.getThemes([limit])

> Get a list of all Package Control themes.

| param | required | type   | description                  | example            |
| ----- | -------- | ------ | ---------------------------- | ------------------ |
| limit | no       | number | Limit size of theme results. | `pc.getThemes(10)` |

### pc.getColorSchemes([limit])

> Get a list of all Package Control color schemes.

| param | required | type   | description                         | example                  |
| ----- | -------- | ------ | ----------------------------------- | ------------------------ |
| limit | no       | number | Limit size of color scheme results. | `pc.getColorSchemes(10)` |

### pc.getLanguages([limit])

> Get a list of all Package Control syntax languages.

| param | required | type   | description                     | example               |
| ----- | -------- | ------ | ------------------------------- | --------------------- |
| limit | no       | number | Limit size of language results. | `pc.getLanguages(10)` |
