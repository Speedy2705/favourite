# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Love-note email delivery

The last section opens a note form and sends its message to
`kesarwaniaryan4278@gmail.com` using FormSubmit's AJAX endpoint. No email
password or private API key is included in the frontend.

Before sharing the site, submit a setup note from the running site and open
FormSubmit's activation email in that Gmail inbox (check Spam too). Confirm
the address, then submit another note and verify delivery. Activation is
required; an accepted API request does not independently prove inbox delivery.
See https://formsubmit.co/ and https://formsubmit.co/ajax-documentation.

The app navigates to `#thank-you` only after a successful API response. Failed
or timed-out requests leave the draft in the popup for retry. The thank-you
page includes hearts and stars, respecting reduced-motion preferences.

Manual verification: open the popup using keyboard and pointer, check Escape
and focus return, send whitespace-only text, simulate an offline request,
then verify a successful submission after activating email delivery. No live
email was sent during implementation.
