# Live Demo

https://next-js-sample.netlify.app/

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
