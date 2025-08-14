# Hi! Salut! Hallo!

This is a very basic template to kickstart any Vue 3 application I would be tempted to make :)

It includes mainly all the dependencies and folder structure for:

- **Testing**
- **SPA metadata support**
- **i18n**
- **Logging**
- **SEO files generation**
- **npm commands** (build, format, test, etc.)
- **Git Hooks**

And many more!
Have fun.

## Developper insights

### `/.husky`:

Contains a pre-commit hook that will format the whole solution and run its associated tests. The commit should be made through a command line to see the output of the hook.

### `/.github`:

Contains a workflow that uses a custom action to verify 3 important aspects of the app in parallel:

1. Unified code format
2. Tests suite
3. Build

It also generates a file (`rollup_bundle_stats.html`) that helps to identify heavy dependencies.
