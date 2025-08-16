# 📚 Next.js TypeScript Template Documentation

> Comprehensive documentation for the production-ready Next.js 15 + TypeScript template with automated CRUD generation and enterprise features.

## 🗂️ Documentation Index

### Getting Started
- [README](../README.md) - Project overview and quick start guide
- [Project Structure](./PROJECT_STRUCTURE.md) - Directory layout and architecture
- [Environment Setup](./SETUP.md) - Initial configuration and requirements

### Core Documentation
- [API Documentation](./API.md) - Complete API client and hooks reference
- [Authentication Guide](./AUTHENTICATION.md) - JWT auth system and security
- [CRUD Generator](./CRUD_GENERATOR.md) - Automated code generation system
- [Query Builder](./QUERY_BUILDER.md) - Advanced query construction

### Development Guides
- [Development Workflow](./DEVELOPMENT.md) - Best practices and workflows
- [Component Library](./COMPONENTS.md) - UI component reference
- [State Management](./STATE_MANAGEMENT.md) - Zustand store patterns
- [Type System](./TYPES.md) - TypeScript architecture

### Advanced Topics
- [Performance Optimization](./PERFORMANCE.md) - Caching and optimization strategies
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment instructions
- [Testing Strategy](./TESTING.md) - Testing approaches and tools
- [Security Best Practices](./SECURITY.md) - Security guidelines

## 🚀 Quick Links

### Essential Commands
```bash
# Development
yarn dev                    # Start development server
yarn build                  # Production build
yarn start                  # Start production server

# Code Generation
yarn generate-crud          # Generate CRUD for new entity

# Code Quality
yarn type-check            # TypeScript validation
yarn lint                  # ESLint checks
yarn validate-env          # Environment validation

# Deployment
yarn pre-deploy           # Pre-deployment checks
yarn railway:deploy       # Deploy to Railway
```

### Key Features
- ✅ **Automated CRUD Generation** - Backend schema-driven code generation
- ✅ **Type-Safe API Client** - 100% TypeScript with strict typing
- ✅ **Advanced Query Builder** - Fluent API for complex queries
- ✅ **JWT Authentication** - Secure token management with auto-refresh
- ✅ **React Query Integration** - Optimized data fetching and caching
- ✅ **Zustand State Management** - Lightweight global state
- ✅ **shadcn/ui Components** - Modern, accessible UI components
- ✅ **Railway Deployment** - Production-ready deployment config

## 📖 Documentation Structure

```
docs/
├── INDEX.md                 # This file - Main documentation hub
├── API.md                   # API client and hooks reference
├── PROJECT_STRUCTURE.md    # Directory structure and architecture
├── SETUP.md                # Environment setup guide
├── AUTHENTICATION.md       # Auth system documentation
├── CRUD_GENERATOR.md       # CRUD generation guide
├── QUERY_BUILDER.md        # Query builder reference
├── DEVELOPMENT.md          # Development best practices
├── COMPONENTS.md           # Component library docs
├── STATE_MANAGEMENT.md     # State management patterns
├── TYPES.md               # TypeScript type system
├── PERFORMANCE.md         # Performance optimization
├── DEPLOYMENT.md          # Deployment instructions
├── TESTING.md             # Testing documentation
└── SECURITY.md            # Security guidelines
```

## 🎯 Quick Start Path

1. **Initial Setup**
   - Read [Project Structure](./PROJECT_STRUCTURE.md) to understand the layout
   - Follow [Environment Setup](./SETUP.md) for configuration

2. **Core Concepts**
   - Learn the [API Documentation](./API.md) for data fetching
   - Understand [Authentication](./AUTHENTICATION.md) for user management

3. **Development**
   - Use [CRUD Generator](./CRUD_GENERATOR.md) for rapid development
   - Reference [Query Builder](./QUERY_BUILDER.md) for data queries

4. **Advanced Usage**
   - Optimize with [Performance Guide](./PERFORMANCE.md)
   - Deploy using [Deployment Guide](./DEPLOYMENT.md)

## 🔍 Feature Matrix

| Feature | Status | Documentation |
|---------|--------|---------------|
| Next.js 15 App Router | ✅ Ready | [Project Structure](./PROJECT_STRUCTURE.md) |
| TypeScript Strict Mode | ✅ Ready | [Type System](./TYPES.md) |
| Automated CRUD | ✅ Ready | [CRUD Generator](./CRUD_GENERATOR.md) |
| JWT Authentication | ✅ Ready | [Authentication](./AUTHENTICATION.md) |
| React Query | ✅ Ready | [API Documentation](./API.md) |
| Query Builder | ✅ Ready | [Query Builder](./QUERY_BUILDER.md) |
| Zustand Store | ✅ Ready | [State Management](./STATE_MANAGEMENT.md) |
| shadcn/ui | ✅ Ready | [Components](./COMPONENTS.md) |
| Railway Deploy | ✅ Ready | [Deployment](./DEPLOYMENT.md) |
| Error Handling | ✅ Ready | [API Documentation](./API.md#error-handling) |
| Request Optimization | ✅ Ready | [Performance](./PERFORMANCE.md) |

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.4.4
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Components**: shadcn/ui + Radix UI
- **State**: Zustand 5.x
- **Data Fetching**: TanStack Query 5.x
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Ky 1.x

### Development
- **Package Manager**: Yarn
- **Linting**: ESLint 9.x
- **Type Checking**: TypeScript strict mode
- **Code Generation**: Custom Node.js scripts

### Deployment
- **Platform**: Railway / Vercel / Docker
- **CI/CD**: GitHub Actions ready
- **Monitoring**: Health check endpoints

## 📝 Contributing

### Documentation Standards
- Use Markdown for all documentation
- Include code examples for all features
- Keep sections focused and concise
- Update INDEX.md when adding new docs

### Code Examples
```typescript
// Always include practical examples
import { useUserApi } from '@/hooks/user/use-user-api'

function Example() {
  const userApi = useUserApi()
  const { data } = userApi.index()
  // ...
}
```

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Railway Deployment](https://railway.app/docs)

## 📞 Support

For questions or issues:
1. Check the relevant documentation section
2. Review common patterns in code examples
3. Consult the troubleshooting guides
4. Create an issue in the repository

---

*Last Updated: 2024*  
*Version: 0.1.0*  
*Template: template-typescript-nextjs*