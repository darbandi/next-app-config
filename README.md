# Live Demo

https://next-js-sample.netlify.app/
[![Netlify Status](https://api.netlify.com/api/v1/badges/d0d7eb68-fbb0-4d7e-a5cb-1109563c507a/deploy-status)](https://app.netlify.com/sites/next-js-sample/deploys)

## Used

- NextJs
- TypeScript
- PWA
- Storybook
- Tailwind
- Prettier
- Eslint
- Husky

```bash
npx husky install
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-push "npm run build"
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ''"
npx sb init --builder webpack5
npx sb init -f
npx tailwindcss init -p
```
