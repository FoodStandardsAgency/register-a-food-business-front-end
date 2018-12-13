# The tech stack

## Node.js

Node.js is an open-source JavaScript runtime built on Chrome's V8 JavaScript engine. For more information about Node.js, see https://nodejs.org.

## Express.js

Express.js is an open-source library for running server-side processes that listen for HTTP requests to different routes. Express.js runs on Node.js. For more information about Express.js, see https://expressjs.com/.

## Next.js

Next.js is an open-source front-end framework, based on React, that renders HTML webpages server-side by default. Server-side rendering allows users to view a React-based website with JavaScript disabled and largely negates the need to account for differences between browsers' JavaScript engines.

Next.js also automatically splits code into small modules, rather than serving a single large module, which improves the page load time.

For more information about Next.js, see https://nextjs.org.

## GOV UK React components

`govuk-react` is an open-source library of reusable React components that implement the [GOV.UK Design System](https://design-system.service.gov.uk/) using the Emotion CSS-in-JS library. For more information about `govuk-react`, see https://github.com/UKHomeOffice/govuk-react.

## Emotion

Emotion is an open-source CSS-in-JS library that implements the 'styled components' approach. Its features are almost identical to the [Styled Components](https://www.styled-components.com/) library. For more information about Emotion, see https://emotion.sh/.

---

## The relationship between Express.js and Next.js

Next.js is a standalone service by default, which runs its own server and handles incoming HTTP GET requests. However, much of this request handling is hidden from developers by default and cannot be overridden with Next.js alone.

To have full control over the processing of HTTP POST and GET requests, Express.js is used in this repository to [run the server](../../src/server/index.js) and [catch all incoming requests](../../src/server/server.js). These requests are then [sent to individual routers](../../src/server/routes.js) depending on the URL path of the request.

Most of the routers handle requests using Express.js and vanilla JavaScript alone, such as `continue.route.js`. These types of router finish by updating the session data and running a `res.redirect()`. This redirect always forwards the user to another of the internal routes, such as `/new` or `/submit`.

One of the routers, `/new`, handles requests using a combination of Next.js, Express.js, and vanilla JavaScript. The most important part of this router is the use of the `Next.render()` function, which triggers the Next.js server-side render of the specified page and delivers it to the browser.

The wildcard router, `/*`, handles requests using Next.js alone. This is a final catch-all for requests that would otherwise be unhandled. Next.js has a default 404 error page that is displayed in these instances, which [can be customised](https://nextjs.org/docs/#custom-error-handling) if required.
