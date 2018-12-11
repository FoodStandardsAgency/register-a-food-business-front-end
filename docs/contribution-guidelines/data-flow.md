# Data flow

Data is made available to pages via the `props` object, which is supplied in most cases via the `SessionWrapper` component. Data is passed back to the server via HTTP `POST` requests, triggered by form submissions on each page. Users' session data is stored in a temporary cache database on Azure, accessed via a record ID that is stored in a browser cookie, which makes it possible to switch browser tabs and retain all user data.

## Data touch-points

* The browser window
* Browser cookies
* React pages and components
* The `SessionWrapper` component
* The `req` object, which contains `req.cookies` and `req.session`
* Express.js
* The `express-session` middleware for Express.js
* The session cache database in Azure

## Sending data from webpages to the session cache database

1. The user loads the website for the first time
2. The `express-session` middleware generates a new unique session key and adds it to the `req.cookies` object
3. The browser stores the new cookie upon render
4. The user enters data on a webpage by typing into text input fields or selecting radio buttons and checkboxes
5. The user clicks 'Continue', which triggers a HTTP `POST` request with the form data in the `POST` body. This request also contains the `req.cookies` object.
6. Express.js catches the `POST` request and sends it to the `/continue` router
7. The `/continue` router adds the new data to an area of the `req.session` object (e.g. `cumulativeFullAnswers`)
8. The `/continue` router triggers the `req.session.save()` function, which is provided by the `express-session` middleware
9. The `express-session` middleware reads the unique session key cookie from `req.cookies` object
10. The `express-session` middleware saves all `req.session` data into the `*-front-end-cache` database in Azure (CosmosDB, with a MongoDB interface), using the unique session key as a record ID to store the data under
11. For every subsequent webpage submission, steps 4-10 are repeated and new data is added to the same record in the `*-front-end-cache` database.
12. After 24 hours of inactivity, the browser cookie expires and the session database deletes the user data

## Sending data from the session cache database to webpages

1. The user loads a webpage (HTTP `GET` request) where they have previously inputted and submitted data, e.g. text in an input field
2. Express.js catches the `GET` request
3. The `express-session` middleware reads the unique session key cookie from `req.cookies` object
4. The `express-session` middleware fetches the latest user data from the specific record in the `*-front-end-cache` database that is associated with the unique session key
5. The `express-session` middleware updates the `req.session` object with the latest user data
6. Express.js continues by sending the request to the `/new` router
7. The `/new` router begins to render the requested page, which is wrapped by the 'higher-order component' `SessionWrapper`
8. The `SessionWrapper` component returns a modified version of the requested page component, with the addition of a custom `getInitialProps` function
9. The `getInitialProps` function is triggered prior to render. This function receives the `req` object as an argument.
10. The `getInitialProps` function returns an object, `initialProps`, which contains all of the `req.session` data (in addition to other supplementary data)
11. The `initialProps` object is passed to the requested page component as `props`.
12. The page component uses the `props` object in React code to inject the user's previous data, e.g. as the default input field value: `defaultValue={props.cumulativeFullAnswers.operator_email}`
13. The requested page is rendered server-side with the injected data already in place
14. The rendered HTML is sent to the browser as the final HTTP `GET` response