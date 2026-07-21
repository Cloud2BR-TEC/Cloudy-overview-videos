# Cloud2BR TEC Hub Cloudy's YouTube Videos

[![GitHub](https://camo.githubusercontent.com/3d6e70cdbf17b7ad9eaa0d34b05c2bc930aa7ae4238ec215244b20ed6917e19f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d2d3138313731373f6c6f676f3d676974687562266c6f676f436f6c6f723d666666666666)](https://github.com/) [Cloud2BR TEC](https://github.com/Cloud2BR-TEC)

Last updated: 2026-07-21

## GitHub Pages Application

Cloudy Repository Video Studio is a static GitHub Pages application. Users sign in through GitHub's browser consent flow, choose an available repository or paste a repository URL, and create an editable Cloudy storyboard from repository metadata, README content, and root image assets. Cloudy can preview narration using a locally available female voice when the browser provides one. Projects remain in browser local storage and can be exported as JSON with editable SRT captions.

### GitHub Browser Sign-In

The deployment uses GitHub Device Flow. It opens GitHub in a separate browser tab, where the user signs in and approves access. The resulting access token is held only in the running page's memory: it is not written to local storage, session storage, project exports, repository files, or a Cloudy server. Signing out or refreshing the page discards it.

One-time setup by a repository administrator:

1. Register a GitHub OAuth App and enable Device Flow.
2. Add its public client ID as the `GITHUB_OAUTH_CLIENT_ID` Actions variable in the repository settings.
3. Push to `main` or rerun the `Pages` workflow.

The consent scope is `read:user repo`, which allows the repository picker to list repositories the user can access. The application only sends read requests to GitHub's API; it does not write to repositories.

GitHub Pages cannot safely host a client secret, shared AI credential, direct YouTube publishing credential, or server-side MP4 renderer. All active features run in the browser.

## Run Locally

```bash
npm install
npm run dev
```

## Validate and Deploy

```bash
npm run lint
npm run build
```

The `Quality` workflow verifies every change. The `Pages` workflow publishes the static `dist` output from `main`.

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE).