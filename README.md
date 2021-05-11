# aslint

ASLint is an accessibility testing tool for HTML-based content. It's cross-browser and cross-environment. There are more than 100 ASLint rules that covers WCAG 2.0, 2.1 standard and Best Practices.

Best Practices refers to a collection of rules that doesn't conform to WCAG success criterion, but they improve the user experience.

## Getting started

First download the package:

    npm install aslint --save-dev

Now include the script:

    <script src="node_modules/aslint/aslint.min.js"></script>

## Creating ASLint package

Run `npm run build:all` in order to create ASLint package available in folder `dist/aslint.bundle.js`. The file `app/index.html` will be copied as well. It is used while playing with ASLint locally. See section [Local Playground](#local-playground)

## Run ASLint

ASLint can be run using Promises as well as passing [callback](#https://developer.mozilla.org/en-US/docs/Glossary/Callback_function).

### Using Promises

    aslint
      // Optional config options; more about options below;
      .config(options)
      .run()
      .then((results): void => {
        if (results.summary.byIssueType.error.length > 0) {
          console.error(`There were ${results.summary.byIssueType.error.length} errors while scanning.`, results);

          return;
        }

        console.log('[ASLint] All tests passed.', results);
      })
      .catch((e) => {
        // Handle error here
      })

### or passing a callback

    aslint
      .run(function(results) {
        if (results.summary.byIssueType.error.length > 0) {
          console.error(`There were ${results.summary.byIssueType.error.length} errors while scanning.`, results);

          return;
        }

        console.log('[ASLint] All tests passed.', results);
      });

### Config Options

`context` - (type: string, params: CSS Selector or XPath). Limit scanning within the document that matches the specified selector. **Default**: `document.documentElement`

`reportFormat` - select results format type. Supported formats: json. **Default**: `json`

`asyncRunner` – set to `true` if you want to prevent from code execution blocking User Interface thread. Since JavaScript is executed by the same thread that handles updating the User Interface, developers can easily lock up the UI and make it unresponsive to end-users, specifically on page with large amount of content (useful for monitoring injection where it’s being executed on every page). **Default**: `false`

`locale` - (type: string, params: language code). Language tag in the format defined in Tags for Identifying Languages (BCP47). Set this to get all texts translated in a required language. **Default**: `en-us`

`includeHidden` - (type: boolean). `true` if you want to include all visually hidden elements for the evaluation. Hidden means that the element isn’t visible within the viewport. **Default**: `false`

`includeElementReference` - (type: boolean). `true` if you want to include element reference in every report. **Default**: `false`

`namespace` - (type: string). Global namespace for application, e.g. `window.aslint` in browsers environment. **Default**: `aslint`

## Events

`addListener` - an Event is an object that allows you to be notified when something interesting happens. ASLint contains common events that are dispatched in a certain situations. The argument to addListener() is always a function that you define to handle the event, but the parameters to the function depend on which event you're handling.

### Available events


`onBeforeRuleReport(handler)` - an event that is dispatched just before the rule report is being saved. `handler` is a function that receives an object as its sole arguments.

    handler(ruleId: string, reportObject: object)

`onValidatorComplete(handler)` - an event that is dispatched when validation is completed.

    handler(error: any, reportObject: object)

Value `null` for `error` means that there were no errors. Otherwise error object is passed with all details.

`onValidatorReport(handler)` - an event that is dispatched when single report is being saved.

    handler(reportObject: object)

`onValidatorReset()` - an event that is dispatched when all results are being removed. No data are passed to the handler.

`onValidatorStarted` - an event that is dispatched just before tests are being executed. No data are passed to the handler.

## Filters

Filters gives an opportunity to modify data of other functions.

`addFilter` - a method that provides a way for functions to modify data of other functions.

### Available filters

`onBeforeRuleReport(handler)` - an event being called just before rule report is being saved. That way you can modify the report before saving it to the final report.

Usage:

    .addFilter('onBeforeRuleReport', handler)

`handler` take 1 argument: `ruleReport` (object, representing current report for the rule).

### Running unit tests

#### Without debug

`npm run test`

#### With debug option

with `debug` option that allows debugging, e.g. in the browser

`npm run test:debug`

#### Test Coverage report

To generate unit tests coverage report run `npm run test:coverage`. The report should be generated under `.jest/coverage` path.

## Local Playground

To use ASLint locally using browser the file `app/index.html` is being used. In order to build and test ASLint locally follow steps:

1. Create local domain `localhost.aslint.org` and set to 127.0.0.1.
2. Point root path to `[location of ASLint]/dist`
3. Run `npm run build:all` to create ASLint package, translations and copy `app/index.html`.
4. Open browser and go to `localhost.aslint.org`.

## Technology stack

ASLint is written in [TypeScript](https://www.typescriptlang.org/).

To keep code quality and consistency there are also validators like ESLint, lint for markdown and circular dependecies checker.

## Supported browsers

ASLint uses feature detection to support as wide as possible range of browsers. However, ASLint is being tested on:

* Safari (Mac OS)
* Chrome / Chromium
* Firefox
* Edge (Windows OS)

## Creating bookmarklet for the local usage

When you want to use ASLint locally then you can create a bookmarklet that points to ASLint local code. You need to have configured local domain e.g. `local.aslint.org` that points to the ASLint `dist` folder.

1. Use code from file `app/bookmarklet/bookmarklet.js`. You can modify that code in any way.
2. Use tool https://mrcoles.com/bookmarklet/ to convert the code to the bookmarklet code.
3. Create a bookmark in your browser, give a name and for url paste the code generate in step #2.

## Adding new translations

Translations can be added in following steps:

1. Create a new translations based on English version `app/translations/en-us.json`. File name should contains language and region code Example: `app/translations/pl-pl.json`
2. Modify file `app/services/translate.config.ts` to include language file content created in step #1.
3. Modify Jest tests setup: `.jest/jest-setup.js`.

## Frequently Asked Questions

Please refer to https://www.aslint.org/faq

## Code guidelines

Please refer to https://www.aslint.org/coding-guidelines

## Contributing

Contributions are welcome, and greatly appreciated! Contributing doesn't just mean submitting pull requests. There are many different ways for you to get involved, including answering questions on the issues, reporting or triaging bugs, and participating in the ASLint evolution process.

Please refer to https://www.aslint.org/contributing

## Acknowledgements

Thanks to the [Cezary Tomczyk](https://www.ctomczyk.pl/) for inventing ASLint and making a substantial contribution to the design and development.
