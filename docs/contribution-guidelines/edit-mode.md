# Edit mode

Edit mode allows a user to change a single answer after reaching the registration summary page, without having to step through the entire form again.

## How it works

When the user clicks a 'Change' link on the registration summary page (`/new/registration-summary`), the link targets `/edit/<page-name>`. The edit router (`src/server/routes/edit.route.js`) intercepts this request and redirects the user to `/new/<page-name>?edit=<page-name>`, where the `edit` query parameter identifies the page the user originally came from (the edit 'anchor').

While the `edit` query parameter is present:

- The **Continue** button submits to `/edit/continue/:originator` instead of the normal `/continue/:originator`.
- The **Back** button links to `/edit/back/:originator`.
- These edit-mode routes use the `editController`, which maintains a separate `cumulativeEditAnswers` object in the session alongside the main `cumulativeFullAnswers`.

When the user has navigated through all pages affected by their changed answer (determined by `editPath()` and `moveAlongPath()` in `src/server/services/path.service.js`), they are redirected back to `/new/registration-summary`.

## Session state during edit mode

| Session key | Purpose |
|---|---|
| `cumulativeFullAnswers` | The user's original answers, updated when edit mode completes |
| `cumulativeEditAnswers` | Temporary answers accumulated during an edit journey |
| `allValidationErrors` | Validation errors across all pages, updated during edit |

## Entering and exiting edit mode

- **Enter**: User clicks a 'Change' link on the summary page, which targets `/edit/<page-name>`.
- **Exit**: When the edit controller determines the user has reached the end of their edit sub-path, it merges `cumulativeEditAnswers` back into `cumulativeFullAnswers` and redirects to `/new/registration-summary`.
