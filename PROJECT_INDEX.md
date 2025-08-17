# 🏨 Hotel Booking Platform - Project Index

> **Next.js 15 기반 호텔 예약 플랫폼**  
> 여기어때(yeogi.com) 스타일의 숙박 예약 서비스를 구현한 프로덕션 레디 애플리케이션

## 📋 Project Overview

**Name**: Hotel Booking Platform (Yeogi Clone)  
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
│   ├── page.tsx             # Home page (Yeogi-style)
│   └── error.tsx            # Error boundary
│
├── 🧩 components/            # React Components
│   ├── cards/               # Card components
│   │   └── HotelCard.tsx    # Hotel card display
│   ├── forms/               # Form components
│   │   ├── sign-in-form.tsx
│   │   └── sign-up-form.tsx
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Site header
│   │   └── Footer.tsx       # Site footer
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx  # Main hero banner
│   │   ├── QuickMenu.tsx    # Category quick menu
│   │   ├── EventBanner.tsx  # Promotional events
│   │   ├── HotelList.tsx    # Hotel listings
│   │   └── PopularDestinations.tsx # Popular locations
│   └── ui/                  # UI Components
│       ├── Accessibility/   # Accessibility components
│       ├── Animation/       # Animation utilities
│       ├── Badge/           # Badge component
│       ├── Card/            # Card layouts
│       ├── Container/       # Container layouts
│       ├── Grid/            # Grid system
│       ├── Modal/           # Modal dialogs
│       ├── Typography/      # Text components
│       └── [shadcn/ui components]
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
├── 🎨 design-system/         # Design System
│   ├── breakpoints.ts       # Responsive breakpoints
│   ├── colors.ts            # Color palette
│   ├── components.ts        # Component styles
│   └── tokens.ts            # Design tokens
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
├── 🔧 scripts/               # Build Scripts
│   ├── generate-crud.js      # CRUD generator
│   └── validate-env.js       # Environment validator
│
├── 🎨 public/                # Static Assets
│   └── images/              # Image resources
│       ├── categories/      # Category icons
│       ├── events/          # Event banners
│       ├── footer/          # Footer assets
│       ├── hotels/          # Hotel images
│       └── yeogi-logo.svg   # Logo
│
└── 🔧 utils/                 # Utility Functions
    ├── cn.ts                # Class name utilities
    └── performance.ts       # Performance utilities
```

## 🔑 Key Features

### ✅ Implemented Features

1. **홈페이지 (Yeogi-style)**
   - Hero section with search
   - Quick category menu
   - Event/promotion banners
   - Hotel recommendations
   - Popular destinations
   - Responsive footer

2. **Authentication System**
   - JWT-based authentication
   - Sign in/Sign up forms
   - Token management with auto-refresh
   - Proactive token renewal (5min before expiry)
   - Secure token storage & encryption

3. **API Integration**
   - Type-safe API client (Ky)
   - React Query integration
   - Request deduplication
   - Advanced query builder
   - Auto-retry logic
   - Error handling

4. **UI/UX System**
   - Yeogi-inspired design
   - shadcn/ui component library
   - Custom design system
   - Form validation with React Hook Form + Zod
   - Responsive design with Tailwind CSS v4
   - Accessibility-first components
   - Framer Motion animations

5. **State Management**
   - Zustand store for auth
   - React Query for server state
   - Custom hooks for data fetching
   - Token monitoring provider

6. **Developer Experience**
   - TypeScript strict mode
   - ESLint configuration
   - Environment validation
   - CRUD code generation
   - Hot reload with Turbopack
   - Absolute imports

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

### Page Sections
- **HeroSection**: Main search banner with background
- **QuickMenu**: Category icons (Hotel, Motel, Pension, etc.)
- **EventBanner**: Promotional event carousel
- **HotelList**: Hotel card grid with recommendations
- **PopularDestinations**: Popular travel destinations

### Layout Components
- **Header**: Navigation bar with search and user menu
- **Footer**: Company info, links, certifications

### Form Components
- **SignInForm**: User authentication form
- **SignUpForm**: User registration form

### UI Components
- **HotelCard**: Hotel display card with image, price, rating
- **Badge**: Status indicators
- **Button**: Interactive buttons with variants
- **Card**: Content containers
- **Form**: Form wrapper with validation
- **Input**: Text input fields
- **Label**: Form labels
- **Table**: Data tables
- **Modal**: Dialog windows
- **Container**: Responsive containers
- **Grid**: Grid layout system
- **Typography**: Text components

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
| **UI Library** | shadcn/ui | Latest |
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

1. **Search & Booking Features**
   - Hotel search functionality
   - Date picker integration
   - Room selection interface
   - Booking flow implementation
   - Payment gateway integration

2. **Hotel Management**
   - Hotel detail pages
   - Room availability calendar
   - Pricing management
   - Review & rating system
   - Photo galleries

3. **User Features**
   - User profile management
   - Booking history
   - Wishlist/favorites
   - Review submission
   - Loyalty program

4. **Enhancement**
   - Map integration (Kakao/Google)
   - Real-time availability
   - Push notifications
   - PWA support
   - Multi-language (i18n)
   - Dark mode

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

## 🎨 Design System

### Color Palette
- **Primary**: Yeogi Red (#FF385C)
- **Secondary**: Teal (#00A699)
- **Neutral**: Gray scale
- **Success**: Green (#00C851)
- **Warning**: Orange (#FFBB33)
- **Error**: Red (#FF4444)

### Breakpoints
- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large**: 1280px+

### Typography
- **Headings**: Pretendard font
- **Body**: System fonts
- **Sizes**: xs, sm, base, lg, xl, 2xl

---

**Version**: 0.1.0  
**Last Updated**: 2025-08-16  
**Status**: Active Development 🟢
**Style Reference**: Yeogi.com (여기어때)