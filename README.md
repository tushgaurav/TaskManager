# TaskManager Frontend

![TaskManager](/screenshot.png)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running Application Locally
Clone the repo and install dependencies:

```bash
git clone https://github.com/tushgaurav/TaskManager.git
cd TaskManager
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Features
- Very fast to navigate between tabs and tasks.
- Fully accessible through keyboard.
- Filters and search implemented in task table.
- Minimilstic and simple design.

## Performance Report

[PageSpeed Report](https://pagespeed.web.dev/analysis/https-sdtaskman-vercel-app/y0ll47s5b8?form_factor=desktop)
 ![Performance](/performance.png)

## Design Choices
- **Next.js**: I chose Next.js because it is a React framework that allows for server-side rendering and static site generation. This is important for SEO and performance. It also has a lot of built-in features like image optimization and internationalization.
- **TypeScript**: I chose TypeScript because it is a statically typed language that helps catch errors before they happen.
- **Tailwind**: I chose TailwindCSS because it is a utility-first CSS framework that allows for rapid development. You don't need to learn new class names or design system each time you start a new project or contribute to an existing one.
- **shadcn/ui**: I chose shadcn because it is the most popular UI library for React. It has a lot of components that are easy to use and customize. It follows the already popular Radix APIs. Also the community is very active and helpful.

#### Backend
Currently there is no backend, the data is stored in state. The tasks are mocked.

