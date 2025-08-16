# Environment Setup Guide

## 📋 Prerequisites

### System Requirements
- **Node.js**: 18.17.0 or higher
- **Package Manager**: Yarn (recommended) or npm
- **OS**: macOS, Windows, or Linux
- **IDE**: VS Code (recommended)

### Backend Requirements
- NestJS backend with `@foryourdev/nestjs-crud` package
- Schema API endpoint available at `/api/v1/schema/{entity}`
- Proper CORS configuration for local development

## 🚀 Initial Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd template-typescript-nextjs

# Install dependencies with Yarn (recommended)
yarn install

# Or with npm
npm install
```

### 2. Environment Configuration

#### Create Environment File
```bash
# Copy the example file
cp .env.example .env.local
```

#### Configure Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000    # Your backend API URL
NEXT_PUBLIC_APP_ENV=development              # Environment (development/staging/production)

# Optional configurations
NEXT_PUBLIC_APP_NAME="My App"                # Application name
NEXT_PUBLIC_APP_VERSION="1.0.0"              # Application version
```

### 3. Backend Connection

#### Verify Backend is Running
```bash
# Check if backend is accessible
curl http://localhost:4000/api/health

# Expected response:
# {"status":"healthy","timestamp":"..."}
```

#### Test Schema API
```bash
# Check if schema endpoint works
curl http://localhost:4000/api/v1/schema/user

# Expected response:
# {
#   "data": {
#     "entityName": "User",
#     "columns": [...],
#     "crudInfo": {...}
#   }
# }
```

## 🛠️ Development Environment

### VS Code Extensions (Recommended)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "steoates.autoimport"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## 🔧 Configuration Files

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### ESLint Configuration

```javascript
// eslint.config.mjs
export default {
  extends: ['next/core-web-vitals'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  }
}
```

### Prettier Configuration

Create `.prettierrc`:
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

## 🏃 Running the Application

### Development Mode

```bash
# Start development server with Yarn
yarn dev

# Or with npm
npm run dev

# Access the application
# Local: http://localhost:3000
# Network: http://[your-ip]:3000
```

### Production Build

```bash
# Build for production
yarn build

# Start production server
yarn start
```

### Health Check

```bash
# Check if the app is running
curl http://localhost:3000/api/health

# Or use the built-in script
yarn health
```

## 🔍 Verification Steps

### 1. Check Dependencies
```bash
# Verify all dependencies are installed
yarn list --depth=0

# Check for vulnerabilities
yarn audit
```

### 2. Type Checking
```bash
# Run TypeScript compiler
yarn type-check

# Should complete without errors
```

### 3. Linting
```bash
# Run ESLint
yarn lint

# Auto-fix issues
yarn lint --fix
```

### 4. Environment Validation
```bash
# Validate environment variables
yarn validate-env

# Should confirm all required variables are set
```

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Error: Port 3000 is already in use

# Solution 1: Kill the process
lsof -ti:3000 | xargs kill -9

# Solution 2: Use different port
PORT=3001 yarn dev
```

#### Module Not Found
```bash
# Error: Cannot find module '@/...'

# Solution: Clear cache and reinstall
rm -rf node_modules .next
yarn install
yarn dev
```

#### TypeScript Errors
```bash
# Error: Type errors in development

# Solution: Restart TS server in VS Code
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

#### Environment Variables Not Loading
```bash
# Issue: NEXT_PUBLIC_* vars undefined

# Solution: Restart dev server after changing .env.local
# Make sure variable names start with NEXT_PUBLIC_
```

## 🔒 Security Setup

### Environment Security
- Never commit `.env.local` file
- Use `.env.example` for template
- Store sensitive data in environment variables only
- Use different API URLs for dev/staging/prod

### CORS Configuration
Ensure your backend allows requests from your frontend:
```javascript
// Backend CORS config example
{
  origin: [
    'http://localhost:3000',
    'https://your-app.com'
  ],
  credentials: true
}
```

## 📦 Docker Setup (Optional)

### Development Container

Create `Dockerfile.dev`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4000
```

Run with Docker:
```bash
docker-compose up
```

## 🚀 Next Steps

1. **Generate Your First CRUD**
   ```bash
   yarn generate-crud
   # Enter entity name (e.g., "product")
   ```

2. **Explore the Documentation**
   - [API Documentation](./API.md)
   - [Project Structure](./PROJECT_STRUCTURE.md)
   - [Development Guide](./DEVELOPMENT.md)

3. **Start Building**
   - Create your first page in `/app`
   - Add components in `/components`
   - Extend API hooks in `/hooks`

## 📞 Support

If you encounter issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Verify all prerequisites are installed
3. Ensure backend is running and accessible
4. Review environment variable configuration