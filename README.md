# Blog App
Full stack simple blog app developed using Next.js 13 new features such as the App Router, Data Fetching and React Server Components.

## Main technologies
- React
- Next.js
- TypeScript
- Tailwind CSS
- NextAuth
- Prisma
- PostgreSQL

# How to run this project

1. [Node.js](https://nodejs.org/en) is required in order to run the project
2. Make a copy of the .env.example file and rename it to .env.
3. Set up a [GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) and get the required credentials for authentication
4. Fill the .env file with the required data: database URL, GitHub credentials, NextAuth variables
5. Push the Prisma schema to the database using the following command:

```bash
npx prisma db push
```
6. Then, run the development server:

```bash
npm run dev
```
7. Open http://localhost:3000 with your browser to see the result.
