# DevPulse - Frontend

![Angular](https://img.shields.io/badge/Angular-20.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)

A modern, responsive blogging platform frontend built with **Angular 20**, **TypeScript**, and **Standalone Components**. DevPulse showcases contemporary Angular development practices with component-based architecture, reactive forms, and comprehensive state management.

## Overview

DevPulse Frontend is a dynamic single-page application (SPA) that provides users with an intuitive interface to create, manage, and discover blog posts. The application leverages **Angular's latest features** including standalone components, signal-based reactivity, and typed routing, ensuring clean separation of concerns and optimal performance.

**Key Highlights:**
- 🏗️ Standalone Components for modular and efficient architecture
- 🎯 Component-based UI with reusable, composable modules
- 🔐 JWT authentication with secure token management
- 🛡️ Route guards for protected pages and admin features
- 📝 Reactive forms for blog creation and editing
- 🏷️ Dynamic category filtering and blog discovery
- 📱 Responsive design with Bootstrap Icons integration
- 🔄 Interceptor-based API integration with automatic token injection
- 🎨 Clean, modern UI with organized styling
- ⚡ Signal-based state management for optimal reactivity

## Key Features

### User Authentication & Authorization
- **User Registration** - Create new user accounts with email and password
- **User Login** - JWT-based authentication with persistent token storage
- **Token Management** - Automatic token injection via HTTP interceptors
- **Role-Based Access** - Admin and User role-specific features
- **Protected Routes** - Auth guards prevent unauthorized access
- **Token Expiration** - Graceful handling of expired tokens with re-authentication prompts

### Blog Management Interface
- **Browse Blogs** - Public access to all published blogs with pagination
- **Filter by Category** - Dynamic category-based blog filtering
- **View Blog Details** - Comprehensive blog view with metadata
- **Create Blog** - Rich form for authenticated users to publish new blogs
- **Edit Blog** - Users can update only their own blog posts
- **Delete Blog** - Users can remove their own published blogs
- **User Dashboard** - Personalized view of user's own blogs

### Category Management
- **Category Listing** - Browse all available blog categories
- **Filter Blogs by Category** - Quick access to categorized content
- **Admin Category Management** - Admin dashboard for category CRUD operations

### User Interface Features
- **Responsive Navigation** - Dynamic nav with authentication state
- **Blog Card Components** - Reusable blog preview cards with metadata
- **Form Validation** - Real-time form validation with error messaging
- **Error Handling** - User-friendly error messages and recovery flows
- **Loading States** - Visual feedback during API operations

## Architecture

DevPulse Frontend follows **Modern Angular Architecture** with standalone components and feature-based organization:

```
┌──────────────────────────────────────────────────────┐
│           App Component (Root)                       │
│      Router Outlet | Layout Management              │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│         Page Components (Feature Routes)             │
│   AuthLayout | MainLayout | DashboardLayout         │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│         UI Components (Reusable)                    │
│   BlogCard | BlogDetails | Navigation               │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│         Services (Business Logic)                    │
│  AuthService | BlogService | CategoryService        │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│       Core Layer (Guards, Interceptors)             │
│  AuthGuard | AdminGuard | JwtInterceptor            │
└──────────────────────────────────────────────────────┘
```

### Design Patterns Implemented

| Pattern | Purpose |
|---------|---------|
| **Standalone Components** | Self-contained, modular components without NgModule |
| **Services with Dependency Injection** | Centralized business logic and API communication |
| **HTTP Interceptors** | Automatic JWT token injection and response handling |
| **Route Guards** | Protection of authenticated and admin-only routes |
| **Reactive Forms** | Form validation and state management |
| **Custom Directives** | Reusable DOM behaviors (e.g., category color coding) |
| **Model-based Architecture** | Type-safe data structures using TypeScript interfaces |
| **RxJS Observables** | Reactive data streams and asynchronous operations |

## Project Structure

```
DevPulse-Angular/
├── public/                                # Static assets
│   └── Images/                            # Blog and feature images
│
├── src/
│   ├── main.ts                            # Application bootstrap entry point
│   ├── index.html                         # HTML template
│   ├── styles.css                         # Global styles
│   │
│   └── app/
│       ├── app.ts                         # Root component (Standalone)
│       ├── app.html                       # Root template with router outlet
│       ├── app.css                        # Root component styles
│       ├── app.routes.ts                  # Routing configuration (Typed Routes)
│       ├── app.config.ts                  # Application configuration
│       │
│       ├── Components/                    # Reusable UI Components
│       │   ├── blog-card/
│       │   │   ├── blog-card.ts           # Blog preview card component
│       │   │   ├── blog-card.html
│       │   │   ├── blog-card.css
│       │   │   └── blog-card.spec.ts
│       │   ├── blog-details/              # Full blog content display
│       │   │   ├── blog-details.ts
│       │   │   ├── blog-details.html
│       │   │   ├── blog-details.css
│       │   │   └── blog-details.spec.ts
│       │   ├── create-blog/               # Blog creation form
│       │   │   ├── create-blog.ts
│       │   │   ├── create-blog.html
│       │   │   ├── create-blog.css
│       │   │   └── create-blog.spec.ts
│       │   ├── footer/                    # Application footer
│       │   │   ├── footer.ts
│       │   │   ├── footer.html
│       │   │   ├── footer.css
│       │   │   └── footer.spec.ts
│       │   ├── home-layout/               # Home page layout wrapper
│       │   │   ├── home-layout.ts
│       │   │   ├── home-layout.html
│       │   │   ├── home-layout.css
│       │   │   └── home-layout.spec.ts
│       │   ├── latest-blogs/              # Latest blogs display section
│       │   │   ├── latest-blogs.ts
│       │   │   ├── latest-blogs.html
│       │   │   ├── latest-blogs.css
│       │   │   └── latest-blogs.spec.ts
│       │   ├── my-blogs/                  # User's blog collection
│       │   │   ├── my-blogs.ts
│       │   │   ├── my-blogs.html
│       │   │   ├── my-blogs.css
│       │   │   └── my-blogs.spec.ts
│       │   ├── nav/                       # Navigation component
│       │   │   ├── nav.ts
│       │   │   ├── nav.html
│       │   │   ├── nav.css
│       │   │   └── nav.spec.ts
│       │   └── update-blog/               # Blog editing form
│       │       ├── update-blog.ts
│       │       ├── update-blog.html
│       │       ├── update-blog.css
│       │       └── update-blog.spec.ts
│       │
│       ├── Core/
│       │   ├── directives/                # Custom attribute directives
│       │   │   ├── category-color.ts      # Color coding for categories
│       │   │   └── category-color.spec.ts
│       │   │
│       │   ├── Guards/                    # Route protection guards
│       │   │   ├── auth-guard.ts          # Authentication verification
│       │   │   ├── admin-guard.ts         # Admin role verification
│       │   │   ├── auth-guard.spec.ts
│       │   │   └── admin-guard.spec.ts
│       │   │
│       │   ├── Interceptors/              # HTTP interceptors
│       │   │   └── jwt.interceptor.ts     # JWT token injection and error handling
│       │   │
│       │   └── Models/                    # TypeScript interfaces and types
│       │       ├── Auth/
│       │       │   ├── DecodedToken.ts    # JWT payload structure
│       │       │   └── UserDto.ts         # User data structure
│       │       ├── Blog/
│       │       │   └── Blog.ts            # Blog entity interface
│       │       ├── Category/
│       │       │   └── Category.ts        # Category entity interface
│       │       └── Common/
│       │           └── IValidationResponse.ts  # API error response format
│       │
│       ├── Pages/                         # Feature pages and layouts
│       │   ├── auth-layout/               # Authentication pages container
│       │   │   ├── auth-layout-component/
│       │   │   │   ├── auth-layout-component.ts
│       │   │   │   ├── auth-layout-component.html
│       │   │   │   └── auth-layout-component.css
│       │   │   ├── login/                 # Login page
│       │   │   │   ├── login.ts
│       │   │   │   ├── login.html
│       │   │   │   ├── login.css
│       │   │   │   └── login.spec.ts
│       │   │   └── register/              # Registration page
│       │   │       ├── register.ts
│       │   │       ├── register.html
│       │   │       ├── register.css
│       │   │       └── register.spec.ts
│       │   │
│       │   ├── main-layout/               # Public pages container
│       │   │   ├── main-layout-component/
│       │   │   │   ├── main-layout-component.ts
│       │   │   │   ├── main-layout-component.html
│       │   │   │   └── main-layout-component.css
│       │   │   ├── home/                  # Home page
│       │   │   │   ├── home.ts
│       │   │   │   ├── home.html
│       │   │   │   └── home.css
│       │   │   ├── blogs/                 # Blogs listing page
│       │   │   │   ├── blogs.ts
│       │   │   │   ├── blogs.html
│       │   │   │   └── blogs.css
│       │   │   ├── about/                 # About page
│       │   │   │   ├── about.ts
│       │   │   │   ├── about.html
│       │   │   │   └── about.css
│       │   │   └── profile-layout/        # User profile section
│       │   │       ├── profile-layout.ts
│       │   │       ├── profile-layout.html
│       │   │       └── profile-layout.css
│       │   │
│       │   ├── dashboard-layout/          # Admin dashboard container
│       │   │   ├── dashboard-layout.component/
│       │   │   │   ├── dashboard-layout.ts
│       │   │   │   ├── dashboard-layout.html
│       │   │   │   └── dashboard-layout.css
│       │   │   ├── all-blogs/             # Admin: all blogs management
│       │   │   │   ├── all-blogs.ts
│       │   │   │   ├── all-blogs.html
│       │   │   │   └── all-blogs.css
│       │   │   ├── categories/            # Admin: category management
│       │   │   │   ├── categories.ts
│       │   │   │   ├── categories.html
│       │   │   │   └── categories.css
│       │   │   └── users/                 # Admin: users management
│       │   │       ├── users.ts
│       │   │       ├── users.html
│       │   │       └── users.css
│       │   │
│       │   └── not-found/                 # 404 error page
│       │       ├── not-found.ts
│       │       ├── not-found.html
│       │       ├── not-found.css
│       │       └── not-found.spec.ts
│       │
│       ├── Services/                      # Business logic and API services
│       │   ├── auth.service.ts            # Authentication service
│       │   ├── blog.service.ts            # Blog API operations
│       │   └── category.service.ts        # Category API operations
│       │
│       └── environments/                  # Environment configurations
│           ├── environment.ts             # Production environment
│           └── environment.development.ts # Development environment
│
├── angular.json                           # Angular CLI configuration
├── tsconfig.json                          # TypeScript configuration
├── tsconfig.app.json                      # App-specific TypeScript config
├── tsconfig.spec.json                     # Testing TypeScript config
├── package.json                           # Dependencies and scripts
└── README.md                              # This file
```

## Main Services

### AuthService
Handles user authentication and session management:
- `register(userData)` - User account creation
- `login(credentials)` - User authentication
- `logout()` - Session termination
- `isAuthenticated()` - Check authentication status
- `getCurrentUser()` - Retrieve current user data
- `getToken()` - Access stored JWT token
- `decodeToken()` - Parse JWT payload for user claims

### BlogService
Manages blog CRUD operations and retrieval:
- `getAllBlogs()` - Fetch all published blogs
- `getBlogById(id)` - Retrieve specific blog content
- `getBlogsByCategory(categoryId)` - Filter blogs by category
- `getUserBlogs()` - Get authenticated user's blogs
- `createBlog(blogData)` - Publish new blog
- `updateBlog(id, blogData)` - Edit existing blog
- `deleteBlog(id)` - Remove blog post

### CategoryService
Handles category operations and data retrieval:
- `getAllCategories()` - Fetch all available categories
- `getCategoryById(id)` - Get specific category details
- `createCategory(categoryData)` - Admin: Create new category
- `updateCategory(id, categoryData)` - Admin: Update category
- `deleteCategory(id)` - Admin: Remove category

## Core Components & Utilities

### Route Guards
**AuthGuard** - Protects authenticated routes:
- Verifies JWT token existence and validity
- Redirects unauthenticated users to login
- Allows access to authenticated users only

**AdminGuard** - Protects admin-only routes:
- Checks for valid JWT token
- Verifies admin role in token claims
- Denies access to non-admin users

### HTTP Interceptor
**JwtInterceptor** - Automatic token management:
- Injects JWT token into Authorization header
- Handles token refresh logic
- Manages 401 unauthorized responses
- Provides consistent error handling

### Custom Directives
**CategoryColorDirective** - Dynamic styling:
- Applies category-specific colors to elements
- Enhances visual blog categorization
- Improves user experience with visual cues

## Authentication & Authorization

### JWT (JSON Web Tokens)
- **Token Storage** - Secure localStorage with fallback to sessionStorage
- **Token Injection** - Automatic HTTP header injection via interceptor
- **Token Decoding** - Client-side JWT parsing using `jwt-decode` library
- **Token Validation** - Expiration and signature verification
- **Logout Handling** - Graceful token removal and session cleanup

### Role-Based Access Control (RBAC)
- **User Role** - Default role for registered users with blog management access
- **Admin Role** - Elevated privileges for category and system management
- **Public Access** - Anonymous browsing of published content
- **Protected Routes** - Angular route guards enforce role-based access

### Route Protection Examples
```typescript
// Public route - available to all
{ path: 'home', component: HomeComponent }

// Authenticated route - login required
{ path: 'create-blog', component: CreateBlogComponent, canActivate: [authGuard] }

// Admin-only route - admin role required
{ path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] }
```

## Technologies Used

### Core Framework
- **Angular 20** - Modern web application framework
- **TypeScript 5.9** - Typed superset of JavaScript
- **RxJS 7.8** - Reactive programming library

### Frontend Architecture
- **Standalone Components** - Self-contained, tree-shakeable components
- **Typed Routes** - Type-safe Angular routing
- **Signals API** - Reactive state management (preview)

### HTTP & API Communication
- **HttpClientModule** - RESTful API integration
- **HTTP Interceptors** - Request/response processing
- **RxJS Operators** - Async data transformation (map, tap, catchError)

### Forms & Validation
- **Reactive Forms** - Form state management and validation
- **Form Validators** - Built-in and custom validation rules
- **Real-time Validation** - Instant user feedback

### Authentication & Security
- **JWT Authentication** - Token-based security
- **jwt-decode** - Client-side JWT parsing
- **HTTP Interceptors** - Secure token injection
- **Route Guards** - Protected route access

### UI & Styling
- **Bootstrap Icons** - Icon library (1,700+ icons)
- **CSS3** - Modern stylesheet features
- **Responsive Design** - Mobile-first approach

### Testing & Development
- **Jasmine** - Testing framework
- **Karma** - Test runner
- **Angular CLI** - Development toolkit
- **Prettier** - Code formatting

## Local Setup

### Prerequisites
- **Node.js 20+** - [Download](https://nodejs.org/)
- **npm 10+** - Bundled with Node.js
- **Angular CLI 20+** - `npm install -g @angular/cli@latest`
- **DevPulse Backend API** - Running on `https://localhost:5001`
- **Git** - Version control

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Gargera/DevPulse-Angular.git
   cd DevPulse-Angular
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure API Connection**
   - Open `src/environments/environment.development.ts`
   - Set API base URL:
     ```typescript
     export const environment = {
       production: false,
       apiUrl: 'https://localhost:5001/api'
     };
     ```
   - Ensure DevPulse backend API is running on this URL

4. **Configure JWT Settings**
   - Verify JWT configuration in `AuthService`
   - Token is stored in localStorage with key `authToken`
   - Token is decoded and validated before API requests

5. **Start Development Server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

6. **Access the Application**
   - Application: `http://localhost:4200`
   - Hot reload enabled - changes reflect automatically

### Development Commands

```bash
# Start development server
npm start
ng serve

# Build for production
npm run build

# Run unit tests
npm test

# Watch mode (build on file changes)
npm run watch

# Generate new component
ng generate component Components/my-component

# Generate new service
ng generate service Services/my-service
```

### Environment Setup

**Development Environment** (`src/environments/environment.development.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

**Production Environment** (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api'
};
```

## Component Hierarchy

```
AppComponent (Root)
├── NavComponent (Shared Navigation)
├── Main Router Outlet
│   ├── AuthLayout
│   │   ├── LoginComponent
│   │   └── RegisterComponent
│   ├── MainLayout
│   │   ├── HomeComponent
│   │   │   └── HomeLayoutComponent
│   │   ├── BlogsComponent
│   │   │   └── BlogCardComponent (Multiple)
│   │   ├── BlogDetailsComponent
│   │   ├── CreateBlogComponent
│   │   ├── UpdateBlogComponent
│   │   └── ProfileLayoutComponent
│   ├── DashboardLayout (Admin Only)
│   │   ├── AllBlogsComponent
│   │   ├── CategoriesComponent
│   │   └── UsersComponent
│   └── NotFoundComponent
└── FooterComponent (Shared Footer)
```

## Routing Configuration

```typescript
// Feature routes mapped in app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Authentication routes
  { path: 'auth', component: AuthLayoutComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]},
  
  // Public routes
  { path: 'home', component: MainLayoutComponent, children: [
    { path: '', component: HomeComponent }
  ]},
  
  // Protected user routes
  { path: 'my-blogs', component: MyBlogsComponent, canActivate: [authGuard] },
  { path: 'create-blog', component: CreateBlogComponent, canActivate: [authGuard] },
  
  // Protected admin routes
  { path: 'dashboard', component: DashboardLayoutComponent, canActivate: [adminGuard] },
  
  // Error route
  { path: '**', component: NotFoundComponent }
];
```

## API Integration

The frontend communicates with DevPulse Backend API through RESTful endpoints:

### Authentication Endpoints
- `POST /api/account/register` - Create new account
- `POST /api/account/login` - Authenticate user

### Blog Endpoints
- `GET /api/blog` - Fetch all blogs
- `GET /api/blog/{id}` - Get blog details
- `GET /api/blog/category/{categoryId}` - Filter by category
- `GET /api/blog/my-blogs` - User's blogs
- `POST /api/blog` - Create blog (auth required)
- `PUT /api/blog/{id}` - Update blog (auth required)
- `DELETE /api/blog/{id}` - Delete blog (auth required)

### Category Endpoints
- `GET /api/category` - All categories
- `GET /api/category/{id}` - Category details
- `POST /api/category` - Create category (admin)
- `PUT /api/category/{id}` - Update category (admin)
- `DELETE /api/category/{id}` - Delete category (admin)

## Code Quality Standards

### TypeScript Best Practices
- Strict null checks enabled
- Type inference for readability
- Interface-based contracts
- Immutable data patterns

### Angular Best Practices
- OnPush change detection strategy
- Unsubscribe from observables
- Lazy loading for routes
- Standalone components usage
- Reactive forms for complex inputs

### Code Formatting
- Prettier configuration for consistent formatting
- 100-character line width
- Single quotes for strings
- Angular HTML parser for templates

## Performance Optimizations

- **Lazy Loading** - Load features on-demand to reduce initial bundle
- **Change Detection** - OnPush strategy for optimal rendering
- **Unsubscribe Pattern** - Prevent memory leaks from subscriptions
- **Tree Shaking** - Remove unused code in production build
- **Image Optimization** - Lazy load and responsive images
- **Bundle Analysis** - Monitor build size and dependencies

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure DevPulse backend allows frontend origin
- Check browser console for CORS-related messages
- Verify API URL configuration in environment files

**Authentication Token Not Persisting**
- Check browser localStorage/sessionStorage settings
- Verify JWT token is being stored correctly
- Check token expiration time

**Components Not Rendering**
- Verify route configuration in `app.routes.ts`
- Check component standalone declaration
- Review browser console for errors

**API Calls Failing**
- Verify backend API is running on configured URL
- Check network tab in developer tools
- Verify JWT token is being sent in Authorization header

### Debugging

```bash
# Enable Angular debugging in browser console
ng.probe(document.querySelector('app-root')).componentInstance

# Check for memory leaks
# DevTools > Memory > Take heap snapshot
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Dark mode theme toggle
- [ ] Blog search functionality
- [ ] Comments and ratings system
- [ ] User notifications
- [ ] Social media sharing
- [ ] Advanced blog analytics
- [ ] PWA (Progressive Web App) support
- [ ] Internationalization (i18n)
- [ ] Blog image upload and optimization
- [ ] Advanced filtering and sorting options

## Author

**Gargera**
- GitHub: [@Gargera](https://github.com/Gargera)
- Repository Frontend: [DevPulse-Angular](https://github.com/Gargera/DevPulse-Angular)
- Repository Backend: [DevPulse-WebAPI](https://github.com/Gargera/DevPulse-WebAPI)

---

**DevPulse** © 2024. Built with modern Angular development practices and Clean Architecture principles.
