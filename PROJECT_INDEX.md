# 🏨 Hotel Management System - Project Index

> Comprehensive documentation and navigation for the Hotel Management Next.js application

## 📋 Project Overview

**Name**: Hotel Management System  
**Framework**: Next.js 15.4.4 with TypeScript  
**Status**: Development Mode ✅  
**Server**: http://localhost:3000  
**API**: http://localhost:4000 (Backend required)

## 🚀 Quick Start

```bash
# Environment Setup
cp .env.example .env        # Create environment file
npm run validate-env        # Validate configuration

# Development
npm run dev                 # Start development server (Turbopack)
npm run build              # Build for production
npm run start              # Start production server

# Code Quality
npm run type-check         # TypeScript validation
npm run lint              # ESLint checks
npm run pre-deploy        # Pre-deployment validation

# Utilities
npm run generate-crud     # Generate CRUD operations
npm run health           # Check API health
```

## 🗂️ Project Structure

```
hotel-next/
├── 📱 app/                    # Next.js App Router
│   ├── api/                   # API Routes
│   │   └── health/           # Health check endpoint
│   ├── auth/                 # Authentication pages
│   │   ├── signin/          # Sign in page
│   │   └── signup/          # Sign up page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── error.tsx            # Error boundary
│
├── 🧩 components/            # React Components
│   ├── forms/               # Form components
│   │   ├── sign-in-form.tsx
│   │   └── sign-up-form.tsx
│   └── ui/                  # UI Components (shadcn/ui)
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── table.tsx
│
├── 🪝 hooks/                 # Custom React Hooks
│   ├── use-auth-api.ts      # Authentication API hook
│   ├── use-query-state.ts   # Query state management
│   ├── use-query-utils.ts   # Query utilities
│   └── user/                # User-specific hooks
│       ├── use-crud-user-api.ts
│       └── use-user-api.ts
│
├── 📚 lib/                   # Core Libraries
│   ├── api.ts               # API client configuration
│   ├── constants.ts         # Application constants
│   ├── env-validator.ts     # Environment validation
│   ├── error-handler.ts     # Error handling utilities
│   ├── query-builder.ts     # Query construction
│   ├── query-invalidation.ts # Cache invalidation
│   ├── request-deduplicator.ts # Request optimization
│   ├── token-manager.ts     # JWT token management
│   └── utils.ts             # Utility functions
│
├── 🔄 providers/             # Context Providers
│   ├── query-provider.tsx   # React Query provider
│   └── token-monitor-provider.tsx # Token monitoring
│
├── 💾 store/                 # State Management
│   └── auth-store.ts        # Zustand auth store
│
├── 📝 types/                 # TypeScript Types
│   ├── api.ts               # API types
│   ├── auth.ts              # Authentication types
│   ├── crud.ts              # CRUD operation types
│   ├── query.ts             # Query types
│   ├── store.ts             # Store types
│   └── user/                # User-related types
│       ├── crud-user.ts
│       └── user.ts
│
├── 📖 docs/                  # Documentation
│   ├── INDEX.md             # Documentation hub
│   ├── API.md               # API documentation
│   ├── CODE_REVIEW.md       # Code review notes
│   ├── IMPROVEMENTS.md      # Improvement suggestions
│   ├── PROJECT_STRUCTURE.md # Architecture details
│   └── SETUP.md             # Setup instructions
│
└── 🔧 scripts/               # Build Scripts
    ├── generate-crud.js      # CRUD generator
    └── validate-env.js       # Environment validator
```

## 🔑 Key Features

### ✅ Implemented Features

1. **Authentication System**
   - JWT-based authentication
   - Sign in/Sign up forms
   - Token management with auto-refresh
   - Secure token storage

2. **API Integration**
   - Type-safe API client (Ky)
   - React Query integration
   - Request deduplication
   - Advanced query builder

3. **State Management**
   - Zustand store for auth
   - React Query for server state
   - Custom hooks for data fetching

4. **UI Components**
   - shadcn/ui component library
   - Form validation with React Hook Form + Zod
   - Responsive design with Tailwind CSS
   - Accessibility-first components

5. **Developer Experience**
   - TypeScript strict mode
   - ESLint configuration
   - Environment validation
   - CRUD code generation
   - Hot reload with Turbopack

## 📊 API Endpoints

### Health Check
- `GET /api/health` - System health status

### Authentication (External API)
- `POST /auth/signin` - User login
- `POST /auth/signup` - User registration
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout

### User Management (External API)
- `GET /users` - List users
- `GET /users/:id` - Get user details
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🎨 Component Library

### Form Components
- **SignInForm**: User authentication form
- **SignUpForm**: User registration form

### UI Components (shadcn/ui)
- **Badge**: Status indicators
- **Button**: Interactive buttons
- **Card**: Content containers
- **Form**: Form wrapper with validation
- **Input**: Text input fields
- **Label**: Form labels
- **Table**: Data tables

## 🪝 Custom Hooks

### Authentication
- `useAuthApi()` - Authentication operations
- `useAuthStore()` - Auth state management

### User Management
- `useUserApi()` - User CRUD operations
- `useCrudUserApi()` - Advanced user operations

### Utilities
- `useQueryState()` - Query state management
- `useQueryUtils()` - Query helper utilities

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js | 15.4.4 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **State Management** | Zustand | 5.0.6 |
| **Data Fetching** | TanStack Query | 5.83.0 |
| **HTTP Client** | Ky | 1.8.2 |
| **Forms** | React Hook Form | 7.61.1 |
| **Validation** | Zod | 4.0.10 |
| **UI Components** | shadcn/ui + Radix UI | Latest |
| **Animation** | Framer Motion | 12.23.9 |
| **Date Handling** | date-fns | 4.1.0 |
| **Notifications** | react-hot-toast | 2.5.2 |

## 🔒 Security Features

- JWT token encryption
- Secure token storage
- Request deduplication
- Environment variable validation
- HTTPS enforcement in production
- XSS protection
- CSRF protection ready

## 🚦 Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_ENCRYPTION_KEY=your-secure-encryption-key-here-32chars!

# Optional
NEXT_PUBLIC_APP_ENV=development
```

## 📈 Performance Optimizations

- Turbopack for fast development
- React Query caching
- Request deduplication
- Optimistic updates
- Code splitting
- Image optimization
- Font optimization

## 🧪 Testing Strategy

- Unit tests for utilities
- Integration tests for API
- E2E tests for user flows
- Component testing
- Performance monitoring

## 🚀 Deployment

### Railway
```bash
npm run railway:login
npm run pre-deploy
npm run railway:deploy
npm run railway:logs
```

### Docker
```dockerfile
# Dockerfile ready for containerization
docker build -t hotel-app .
docker run -p 3000:3000 hotel-app
```

## 📝 Development Workflow

1. **Feature Development**
   ```bash
   npm run generate-crud [entity]  # Generate CRUD for new entity
   npm run dev                     # Start development
   ```

2. **Code Quality**
   ```bash
   npm run type-check              # Check TypeScript
   npm run lint                    # Lint code
   ```

3. **Testing**
   ```bash
   npm run test                    # Run tests
   npm run test:e2e               # E2E tests
   ```

4. **Deployment**
   ```bash
   npm run pre-deploy             # Validation
   npm run build                  # Production build
   npm run railway:deploy         # Deploy
   ```

## 🎯 Next Steps

1. **Backend Integration**
   - Set up backend API at port 4000
   - Configure database connection
   - Implement hotel-specific endpoints

2. **Feature Implementation**
   - Room management system
   - Booking system
   - Guest management
   - Payment integration
   - Reporting dashboard

3. **Enhancement**
   - Add internationalization
   - Implement real-time updates
   - Add offline support
   - Enhance mobile experience

## 📚 Related Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Follow TypeScript strict mode
2. Use existing patterns and conventions
3. Write tests for new features
4. Update documentation
5. Run pre-deploy checks

## 📞 Support & Resources

- **Documentation**: `/docs` directory
- **API Reference**: `/docs/API.md`
- **Setup Guide**: `/docs/SETUP.md`
- **Health Check**: http://localhost:3000/api/health

---

**Version**: 0.1.0  
**Last Updated**: 2025-08-16  
**Status**: Active Development 🟢