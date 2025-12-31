# Contributing to MagicMove

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/shakcho/MagicMove.git
   cd MagicMove
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the library:
   ```bash
   npm run build
   ```

4. Run the example app:
   ```bash
   npm run example:dev
   ```

## Code Quality

- **Linting**: `npm run lint` / `npm run lint:fix`
- **Formatting**: `npm run format` / `npm run format:check`

Pre-commit hooks automatically run lint and format on staged files.

## Automatic Releases

This project uses **semantic-release** to automatically publish to npm when changes are merged to `main`.

### How It Works

Version bumps are determined by commit messages following [Conventional Commits](https://www.conventionalcommits.org/):

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `fix:` | Patch (0.0.x) | `fix: resolve animation flicker` |
| `feat:` | Minor (0.x.0) | `feat: add new MagicMoveList component` |
| `feat!:` or `BREAKING CHANGE:` | Major (x.0.0) | `feat!: change API signature` |
| `perf:` | Patch | `perf: optimize transition calculations` |
| `refactor:` | Patch | `refactor: simplify context logic` |
| `docs:`, `style:`, `chore:`, `test:` | No release | `docs: update README` |

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Examples:**
```bash
git commit -m "feat: add duration prop to MagicMove"
git commit -m "fix: handle edge case in list reordering"
git commit -m "docs: improve API documentation"
git commit -m "feat!: rename triggerMagicMove to trigger"
```

### Release Flow

1. Create a PR with conventional commits
2. Merge PR to `main`
3. GitHub Actions automatically:
   - Analyzes commits to determine version bump
   - Updates `package.json` version
   - Publishes to npm
   - Creates GitHub Release with changelog
   - Creates git tag

### Setup (Maintainers)

1. Create an npm access token at https://www.npmjs.com/settings/tokens
2. Add the token as a GitHub secret named `NPM_TOKEN`

## Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes with conventional commit messages
4. Run `npm run lint` and `npm run format:check`
5. Push and create a Pull Request

All PRs must pass CI checks before merging.
