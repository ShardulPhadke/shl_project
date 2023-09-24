## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the app

Welcome to Project Vault. This is a simple app where you can browse a list of projects which use a wide variety of technologies.
Firstly, Sign In using your Google account. The authentication uses next-auth to sign in and create a entry of users in the MongoDB database.

After signing in, you will see a button to see the project list. Clicking the button will take you to the page displaying all 100 projects. 

Here there is a search bar, with a free-form/natural language capability to filter out the projects according to your search text.
You can search for multiple fields using free-form sentences such as "find projects that use Angular as frontend and Java as backend". The projects will then filter out showing only those projects with Angular as frontend and Java as backend.
You can also search for keywords like- "java python".
