# Next.js E-commerce Application

A modern e-commerce application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog** - Browse and search products
- 🛒 **Shopping Cart** - Add/remove items with persistent storage
- 👤 **User Authentication** - Login/register functionality
- 📊 **Dashboard** - User dashboard for order management
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Performance Optimized** - Built with Next.js best practices

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SASS
- **State Management**: React Hooks + LocalStorage
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nextjs-ecommerce-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts
- `npm run analyze` - Analyze bundle size

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── layouts/        # Layout components
│   │   ├── Header/     # Header component
│   │   ├── Navbar/     # Navigation component
│   │   └── AppShell/   # Main app shell
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   ├── product/       # Product pages
│   └── shop/          # Shop pages
├── styles/            # Global styles
├── utils/             # Utility functions
└── views/             # Page-specific components
```

## API Routes

- `GET /api/hello` - Example API endpoint

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
