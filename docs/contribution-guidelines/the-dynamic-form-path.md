# The dynamic form path

The **Register a food business** service front-end application is a registration form that routes users to a different selection of questions based on their answers to previous questions. The mechanism that makes this work is called the 'path'.

## The `/continue` and `/back` routes

Each page in the form has a Continue button and a Back button. These buttons cannot be a direct `href` link, because the next page or previous page in the path are often dependent on the user's previously given answers, combined with the answers that they give on the current page. The next page or previous page must therefore be calculated when the user clicks the Continue or Back button.

Every Continue button submits the form from the current page via an HTTP `POST` request using standard HTML form actions. The URL of this request is in the following format, calculated by the [session wrapper](./data-flow.md):

```
/continue/<name-of-current-page>
```

For example:

```
/continue/registration-role
```

The Back button does not need to submit the form, because the new user data from the current page does not need to be saved when moving backwards in the path. Every Back button is therefore a simple anchor `href` link to a URL, in the following format:

```
/back/<name-of-current-page>
```

In both the `/continue` and `/back` routers, the name of the current page is referred to as the 'originator'. This piece of information identifies the user's current position in the path.

## The `editPath()` function

There are two main functions that are called when the user clicks a Continue or Back button. The first, `editPath()`, takes three arguments:

* `cumulativeFullAnswers`: all answers that the user has given to questions so far, including those from the current page.
* `currentPage`: the 'originator' (current page name). NOTE: currently unused by `editPath()`. Can be removed from function tree if necessary.
* `pathFromSession`: the original, unedited path. This path is stored in the user's session data to avoid the path config changing mid-way through a user's session in the event of an app update. The original path is always used to avoid issues with complex user behaviour such as stepping back and forward multiple times.

These three arguments are used to activate the '`switches`' in the path object. Each switch is made up of two parts: the 'trigger', and the 'action'. The trigger can be either the name or the value of an input field.

For example, if a radio button has the name `registration_role` and the value `Sole trader`, it would be most useful to trigger a switch with the value `Sole trader` as this is the differentiator from the other radio buttons. However, if a free text field has the name `establishment_street`, this name is more likely to be used as the trigger (i.e. "It is truthy, therefore the user has written something in this optional field") than the user-entered value itself.

The `on` value of each page object determines whether or not a page is enabled by default. The action of a switch is to enable one or more of these pages that was disabled by default. Because of this one-directional change, all pages that are conditional based on the user's answers must be disabled by default and only enabled when a switch is triggered.

The output of the `editPath()` function is a version of the original `pathFromSession` object, with the `on` values edited to be correct based on the current `cumulativeFullAnswers`.

## The `moveAlongPath()` function

The `moveAlongPath()` function takes three arguments:

* `path`: the output of the `editPath()` function.
* `currentPage`: the 'originator' (current page name).
* `movement`: a number, currently either `1` or `-1`.

Firstly, the path is filtered by `on: true` to become a list of just the enabled pages. The index of the current page on this 'active path' is then used as a basis to add or subtract the `movement`, returning the name of the next or previous page in the active path.

For example, if the current page is `registration-role` and the next enabled page is `company-details`, any pages between those two are skipped,and the return of the function is `company-details`.
