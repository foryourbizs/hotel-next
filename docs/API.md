# API Documentation

## 📚 Table of Contents
- [Core API Client](#core-api-client)
- [Query Builder](#query-builder)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Request Optimization](#request-optimization)
- [Hooks Reference](#hooks-reference)
- [Type System](#type-system)

---

## Core API Client

### Configuration
```typescript
// lib/api.ts
const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  retry: {
    limit: 3,
    methods: ['GET', 'HEAD', 'OPTIONS'],
    statusCodes: [408, 429, 500, 502, 503, 504]
  }
}
```

### Basic Usage
```typescript
import { apiUtils } from '@/lib/api'

// GET request
const users = await apiUtils.get('/users')

// POST request
const newUser = await apiUtils.post('/users', { 
  json: { name: 'John', email: 'john@example.com' }
})

// PUT request
await apiUtils.put(`/users/${id}`, { 
  json: { name: 'Updated Name' }
})

// DELETE request
await apiUtils.delete(`/users/${id}`)
```

### Advanced Options
```typescript
// With custom headers
apiUtils.get('/users', {
  headers: {
    'X-Custom-Header': 'value'
  }
})

// Disable deduplication
apiUtils.get('/users', {
  skipDeduplication: true
})

// Custom timeout
apiUtils.get('/large-data', {
  timeout: 60000
})
```

---

## Query Builder

### Basic Query Construction
```typescript
import { createQuery } from '@/lib/query-builder'

const query = createQuery()
  .paginate(1, 20)                    // Page 1, 20 items per page
  .sortDesc('createdAt')              // Sort by createdAt descending
  .filterEq('status', 'active')       // Filter by status
  .include(['author', 'category'])    // Include relations
  .build()
```

### Filter Operations
```typescript
// Available filter methods
.filterEq('field', value)           // Equals
.filterNe('field', value)           // Not equals
.filterLt('field', value)           // Less than
.filterLte('field', value)          // Less than or equal
.filterGt('field', value)           // Greater than
.filterGte('field', value)          // Greater than or equal
.filterLike('field', '%pattern%')   // Pattern matching
.filterILike('field', '%pattern%')  // Case-insensitive pattern
.filterIn('field', [1, 2, 3])       // In array
.filterNotIn('field', [4, 5])       // Not in array
.filterIsNull('field')               // Is null
.filterIsNotNull('field')            // Is not null
.filterBetween('field', min, max)   // Between values
.filterArray('field', ['a', 'b'])   // Array contains
.filterOverlap('field', ['x', 'y']) // Array overlaps
```

### Pagination Types
```typescript
// Offset pagination
query.paginate(1, 20)  // page number, limit

// Limit-offset pagination
query.setLimit(20).setOffset(40)

// Cursor pagination
query.setCursor('eyJpZCI6MTAwfQ==').setLimit(20)
```

### Sorting
```typescript
// Single sort
query.sortAsc('name')   // Ascending
query.sortDesc('date')  // Descending

// Multiple sorts
query.setSort(['name', '-createdAt'])  // + or no prefix = ASC, - = DESC
```

### Query Templates
```typescript
import { QueryTemplates } from '@/lib/query-builder'

// Pre-defined templates
const activeUsers = QueryTemplates.activeUsers()
const recentPosts = QueryTemplates.recentPosts()
const adminUsers = QueryTemplates.adminUsers()

// Custom template
const customTemplate = QueryTemplates.create({
  page: { limit: 10, offset: 0 },
  filter: { status_eq: 'published' },
  sort: ['-createdAt']
})
```

---

## Authentication

### Login
```typescript
import { useAuthApi } from '@/hooks/use-auth-api'

function LoginForm() {
  const authApi = useAuthApi()
  const login = authApi.login()
  
  const handleSubmit = (data) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  }
}
```

### Signup
```typescript
const signup = authApi.signup()

signup.mutate({
  email: 'user@example.com',
  password: 'SecurePass123!',
  name: 'John Doe'
}, {
  onSuccess: () => {
    toast.success('Account created successfully!')
    router.push('/auth/signin')
  }
})
```

### Logout
```typescript
const logout = authApi.logout()

logout.mutate(undefined, {
  onSuccess: () => {
    router.push('/auth/signin')
  }
})
```

### Token Management
```typescript
import { tokenManager } from '@/lib/token-manager'

// Check token status
const isValid = tokenManager.isAccessTokenValid()
const expiresIn = tokenManager.getAccessTokenExpiry()

// Manual refresh
await tokenManager.refreshTokens()

// Get current tokens
const { accessToken, refreshToken } = tokenManager.getTokens()
```

### Auth Store
```typescript
import { useAuthStore } from '@/store/auth-store'

function ProtectedComponent() {
  const { 
    isAuthenticated, 
    user, 
    hydrated,
    canManageUsers 
  } = useAuthStore()
  
  if (!hydrated) return <Loading />
  if (!isAuthenticated) return <Redirect to="/login" />
  
  return <Dashboard user={user} />
}
```

---

## Error Handling

### Error Types
```typescript
// lib/error-handler.ts
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN'
}
```

### Custom Error Handling
```typescript
import { handleError } from '@/lib/error-handler'

try {
  const data = await apiUtils.get('/protected')
} catch (error) {
  handleError(error, {
    customHandlers: {
      401: () => {
        // Custom unauthorized handling
        router.push('/login')
      },
      404: () => {
        // Custom not found handling
        toast.error('Resource not found')
      }
    }
  })
}
```

### Global Error Boundaries
```typescript
// Error boundary component
export function ApiErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error) => {
        handleError(error)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
```

---

## Request Optimization

### Deduplication
```typescript
import { requestDeduplicator } from '@/lib/request-deduplicator'

// Automatic deduplication (enabled by default)
const result1 = apiUtils.get('/users')  // Makes request
const result2 = apiUtils.get('/users')  // Returns same promise

// Disable deduplication
const result = apiUtils.get('/users', {
  skipDeduplication: true
})
```

### Debouncing
```typescript
// Debounced search
const debouncedSearch = requestDeduplicator.debounce(
  async (query: string) => {
    return apiUtils.get(`/search?q=${query}`)
  },
  300  // 300ms delay
)

// Use in component
function SearchBox() {
  const handleSearch = (e) => {
    debouncedSearch(e.target.value)
  }
  
  return <input onChange={handleSearch} />
}
```

### Throttling
```typescript
// Throttled updates
const throttledUpdate = requestDeduplicator.throttle(
  async (data) => {
    return apiUtils.put('/settings', { json: data })
  },
  1000  // Max once per second
)
```

---

## Hooks Reference

### useAuthApi
```typescript
const authApi = useAuthApi()

// Available methods
authApi.login()       // Login mutation
authApi.signup()      // Signup mutation
authApi.logout()      // Logout mutation
authApi.refresh()     // Token refresh mutation
authApi.me()          // Current user query
```

### useQueryState
```typescript
const queryState = useQueryState({
  defaultLimit: 20,
  defaultSort: '-createdAt'
})

// State management
queryState.page              // Current page
queryState.limit            // Items per page
queryState.sort             // Sort order
queryState.filters          // Active filters
queryState.query           // Built query object

// Methods
queryState.setPage(2)
queryState.setLimit(50)
queryState.setSort('name')
queryState.addFilter('status', 'active')
queryState.removeFilter('status')
queryState.searchBy('title', 'search term')
queryState.reset()
```

### useQueryUtils
```typescript
const queryUtils = useQueryUtils()

// Cache management
queryUtils.invalidateQueries(['users'])
queryUtils.prefetchQuery(['user', id], fetchUser)
queryUtils.setQueryData(['user', id], userData)
queryUtils.removeQueries(['temp'])
```

### CRUD Hooks (Auto-generated)
```typescript
// Example: User CRUD hooks
const userApi = useUserApi()

// Query methods (return UseQueryResult)
userApi.index(query)     // List users
userApi.show(id)         // Get single user

// Mutation methods (return UseMutationResult)
userApi.create()         // Create user
userApi.update(id)        // Update user
userApi.destroy(id)       // Delete user

// Custom extensions
userApi.me()             // Current user
userApi.stats()          // User statistics
```

---

## Type System

### API Response Types
```typescript
// Standard response wrapper
interface ApiResponse<T> {
  data: T
  metadata?: {
    pagination?: PaginationMetadata
    timestamp?: string
  }
  error?: ApiError
}

// Pagination metadata
interface PaginationMetadata {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}
```

### CRUD Types
```typescript
// Query structure
interface CrudQuery {
  page?: PageQuery
  filter?: FilterQuery
  sort?: string | string[]
  include?: string[]
  fields?: string[]
}

// Filter operations
type FilterOperator = 
  | 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte'
  | 'like' | 'ilike' | 'in' | 'notin'
  | 'isnull' | 'isnotnull' | 'between'
  | 'array' | 'overlap'

// Dynamic filter types
type FilterQuery = Record<`${string}_${FilterOperator}`, any>
```

### Auth Types
```typescript
// Login request
interface LoginRequest {
  email: string
  password: string
}

// Signup request
interface SignupRequest extends LoginRequest {
  name: string
  terms?: boolean
}

// Auth response
interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

// User type
interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  updatedAt: string
}
```

### Store Types
```typescript
// Auth store state
interface AuthState {
  isAuthenticated: boolean
  user: User | null
  hydrated: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setAuthenticated: (value: boolean) => void
  logout: () => void
  
  // Computed
  canManageUsers: boolean
  canViewAnalytics: boolean
}
```

---

## Examples

### Complete CRUD Implementation
```typescript
// 1. Generate CRUD for new entity
// Run: npm run generate-crud
// Enter: product

// 2. Use generated hooks
import { useProductApi } from '@/hooks/product/use-product-api'

function ProductList() {
  const productApi = useProductApi()
  const queryState = useQueryState()
  
  // List products with pagination
  const { data, isLoading } = productApi.index(queryState.query)
  
  // Create product
  const createProduct = productApi.create()
  
  // Update product
  const updateProduct = productApi.update(productId)
  
  // Delete product
  const deleteProduct = productApi.destroy(productId)
  
  return (
    <div>
      {/* Product list UI */}
    </div>
  )
}
```

### Advanced Query Example
```typescript
function AdvancedSearch() {
  const [query, setQuery] = useState(() => 
    createQuery()
      .paginate(1, 20)
      .sortDesc('createdAt')
      .filterEq('status', 'published')
      .filterGte('price', 100)
      .filterLte('price', 1000)
      .filterLike('title', '%sale%')
      .include(['category', 'author'])
      .build()
  )
  
  const { data } = productApi.index(query)
  
  // Update filters
  const handlePriceChange = (min, max) => {
    setQuery(prev => 
      createQuery(prev)
        .filterGte('price', min)
        .filterLte('price', max)
        .build()
    )
  }
  
  return <SearchUI />
}
```

### Custom API Extension
```typescript
// hooks/product/use-product-api.ts
import { CrudProductApi } from './use-crud-product-api'

export class ProductApi extends CrudProductApi {
  // Add custom methods
  featured = () => {
    return useQuery({
      queryKey: ['products', 'featured'],
      queryFn: () => apiUtils.get(`${this.baseUrl}/featured`)
    })
  }
  
  bulkUpdate = () => {
    return useMutation({
      mutationFn: (data: BulkUpdateRequest) => 
        apiUtils.put(`${this.baseUrl}/bulk`, { json: data })
    })
  }
  
  import = () => {
    return useMutation({
      mutationFn: (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        return apiUtils.post(`${this.baseUrl}/import`, { body: formData })
      }
    })
  }
}
```