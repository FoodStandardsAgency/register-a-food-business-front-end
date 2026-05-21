# Data flow

Data is made available to Nunjucks templates via the `props` object, which is assembled by the `PropsGenerator` function from the current request session. Data is passed back to the server via HTTP `POST` requests triggered by form submissions on each page. Users' session data is stored in a temporary cache database on Azure, accessed via a record ID stored in a browser cookie, which means data is retained if the user switches tabs or steps back through the form.

## Data touch-points

* The browser window
* Browser cookies
* Nunjucks page templates (`/pages/*.njk`) and components (`/components/*.njk`)
* The `PropsGenerator` function (`src/server/propsGenerator.js`)
* The `req` object, which contains `req.cookies` and `req.session`
* Express.js
* The `express-session` middleware for Express.js
* The session cache database in Azure (CosmosDB with a MongoDB interface)

## Sending data from webpages to the session cache database

1. The user loads the website for the first time.
2. The `express-session` middleware generates a new unique session key and stores it in a browser cookie.
3. The browser stores the cookie upon the first response.
4. The user enters data on a webpage by typing into text input fields or selecting radio buttons and checkboxes.
5. The user clicks 'Continue', which submits the form via an HTTP `POST` request. The form data is in the `POST` body and the session cookie is attached automatically.
6. Express.js catches the `POST` request and routes it to the `/continue` router.
7. The `/continue` router (via the continue controller) validates the data and merges it into `req.session.cumulativeFullAnswers`.
8. The `/continue` router calls `req.session.save()`, which is provided by `express-session`.
9. The `express-session` middleware reads the session key from the cookie and writes the updated session object to the `front-end-cache` database in Azure, using the session key as the record ID.
10. For every subsequent page submission, steps 4–9 are repeated and new data is merged into the same session record.
11. After 24 hours of inactivity, the browser cookie expires and `express-session` removes the session record from the database.

## Sending data from the session cache database to webpages

1. The user makes an HTTP `GET` request for a page (e.g. by navigating to `/new/business-type`).
2. Express.js receives the request.
3. The `express-session` middleware reads the session key from the cookie and fetches the associated session record from the database.
4. The `express-session` middleware populates `req.session` with the latest stored data.
5. Express.js routes the request to the `/new` router.
6. The `/new` router calls `PropsGenerator(req)`, which constructs a `props` object containing the current session data (e.g. `cumulativeFullAnswers`, `validatorErrors`, CSRF token, etc.).
7. The `/new` router calls `res.render(pageName, { props })`, which tells Nunjucks to render the matching template from the `pages/` directory, with the `props` object available as a template variable.
8. The Nunjucks template uses `props` to inject previously submitted values, e.g.:

    ```njk
    {{ govukInput({
      value: props.cumulativeFullAnswers.operator_email
    }) }}
    ```

9. The fully rendered HTML is sent to the browser as the HTTP `GET` response.
