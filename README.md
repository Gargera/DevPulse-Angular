# DevPulse - Frontend

![Angular](https://img.shields.io/badge/Angular-20.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![RxJS](https://img.shields.io/badge/RxJS-7.8-blueviolet)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)

A modern, responsive blogging platform frontend built with **Angular 20**, **TypeScript**, and **Standalone Components**. DevPulse showcases contemporary Angular development practices with component-based architecture, reactive patterns, and enterprise-grade API integration.

## Overview

DevPulse Frontend is a dynamic single-page application (SPA) that provides users with an intuitive interface to create, manage, and discover blog posts. The application leverages **Angular's latest features** including standalone components, signal-based reactivity, and typed routing for clean separation of concerns and optimal performance.

**Key Highlights:**
- 🏗️ Standalone Components for modular architecture
- 🎯 Feature-based folder structure with clear separation
- 🔐 JWT authentication with secure token management
- 🛡️ Route guards for protected pages and admin features
- 📝 Reactive forms with comprehensive validation
- 🏷️ Dynamic category filtering and blog discovery
- 🔄 HTTP Interceptors for automatic token injection
- 🎨 Responsive UI with Bootstrap Icons
- ⚡ RxJS Observables for reactive data flows
- 🔧 TypeScript for type-safe development

## Key Features

### Authentication & Authorization
- **User Registration** - Create new accounts with validation
- **User Login** - JWT-based authentication with persistent token storage
- **Token Management** - Automatic token injection via HTTP interceptors
- **Role-Based Access** - Admin and User role-specific features and pages
- **Protected Routes** - Auth guards prevent unauthorized access

### User Profile Management
- **Get User Profile** - View profile info (FirstName, LastName, Email, ImageUrl)
- **Update User Profile** - Update personal information and upload profile image
- **Profile Image Upload** - Support for profile picture management

### Blog Management
- **Browse Blogs** - Public access to all published blogs
- **Filter by Category** - Dynamic category-based blog filtering
- **View Blog Details** - Comprehensive blog view with full content and metadata
- **Create Blog** - Rich form for authenticated users to publish new blogs
- **Edit Blog** - Users can update only their own blog posts
- **Delete Blog** - Users can remove their own published blogs
- **User Dashboard** - Personalized view of user's blog collection

### Admin Dashboard
- **Manage All Blogs** - Admin view of all platform blogs
- **Manage Categories** - CRUD operations for blog categories
- **Manage Users** - View and manage user accounts

## Architecture

DevPulse Frontend follows **Modern Angular Architecture** with standalone components and organized structure:

```
┌────────────────────────────────────────────────────────┐
│          App Component (Root)                          │
│       RouterOutlet | Layout Management                 │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│      Page Components (Feature Routes)                 │
│  AuthLayout | MainLayout | DashboardLayout           │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│     UI Components (Reusable)                          │
│  BlogCard | BlogDetails | Footer | Navigation        │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│    Services (Business Logic & API)                    │
│ AuthService | BlogService | CategoryService          │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│ Core Layer (Guards, Interceptors, Models)            │
│  AuthGuard | AdminGuard | JwtInterceptor | Models    │
└────────────────────────────────────────────────────────┘
```

### Design Patterns Implemented

| Pattern | Purpose |
|---------|---------|
| **Standalone Components** | Self-contained, modular components without NgModule |
| **Services with DI** | Centralized business logic and API communication |
| **HTTP Interceptors** | Automatic JWT token injection and error handling |
| **Route Guards** | Protection of authenticated and admin-only routes |
| **Reactive Forms** | Advanced form validation and state management |
| **Custom Directives** | Reusable DOM behaviors (e.g., category color styling) |
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

## Core Services

### AuthService
Handles user authentication and profile management:
- `register(userData)` - User account creation
- `login(credentials)` - User authentication
- `update(userData)` - Update user profile and image
- `getUserProfile()` - Retrieve current user profile
- `logout()` - Session termination
- `getToken()` - Access stored JWT token
- `getUsers()` - Get all users (admin)

### BlogService
Manages blog CRUD operations and filtering:
- `getAllBlogs()` - Fetch all published blogs
- `getBlogById(id)` - Retrieve specific blog content
- `getBlogsByCategory(categoryId)` - Filter blogs by category
- `getUserBlogs()` - Get authenticated user's blogs
- `createBlog(blogData)` - Publish new blog
- `updateBlog(id, blogData)` - Edit existing blog
- `deleteBlog(id)` - Remove blog post

### CategoryService
Handles category operations:
- `getAllCategories()` - Fetch all available categories
- `getCategoryById(id)` - Get category details
- `createCategory(categoryData)` - Admin: Create new category
- `updateCategory(id, categoryData)` - Admin: Update category
- `deleteCategory(id)` - Admin: Delete category

## Authentication & Authorization

### JWT (JSON Web Tokens)
- **Token Storage** - localStorage with automatic expiration handling
- **Token Injection** - Automatic HTTP header injection via interceptor
- **Token Decoding** - Client-side JWT parsing using `jwt-decode` library
- **Token Validation** - Expiration and signature verification
- **Logout Handling** - Graceful token removal and session cleanup

### Route Guards
**AuthGuard** - Protects authenticated routes:
- Verifies JWT token existence and validity
- Redirects unauthenticated users to login
- Allows access to authenticated users only

**AdminGuard** - Protects admin-only routes:
- Checks valid JWT token
- Verifies admin role in token claims
- Denies access to non-admin users

### Role-Based Access Control (RBAC)
- **User Role** - Default role with blog management access
- **Admin Role** - Elevated privileges for category and system management
- **Public Access** - Anonymous browsing of published content

### HTTP Interceptor
**JwtInterceptor** - Automatic token management:
- Injects JWT token into Authorization header
- Handles token refresh logic
- Manages 401 unauthorized responses
- Provides consistent error handling

## Technologies Used

### Core Framework
- **Angular 20** - Modern web application framework
- **TypeScript 5.9** - Typed superset of JavaScript
- **RxJS 7.8** - Reactive programming library

### Frontend Architecture
- **Standalone Components** - Self-contained, tree-shakeable components
- **Typed Routes** - Type-safe Angular routing
- **Signals API** - Reactive state management

### HTTP & API Communication
- **HttpClientModule** - RESTful API integration
- **HTTP Interceptors** - Request/response processing
- **RxJS Operators** - Async data transformation

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
- **Bootstrap Icons 1.13.1** - Icon library
- **CSS3** - Modern stylesheet features
- **Responsive Design** - Mobile-first approach

### Testing & Development
- **Jasmine 5.9** - Testing framework
- **Karma 6.4** - Test runner
- **Angular CLI 20.3.26** - Development toolkit
- **Prettier** - Code formatting

### Additional Libraries
- **SweetAlert2 11.26.25** - Beautiful alert dialogs
- **Zone.js 0.15** - Angular zone management
- **tslib 2.3** - TypeScript helper library

## Local Setup

### Prerequisites
- **Node.js 20+** - [Download](https://nodejs.org/)
- **npm 10+** - Bundled with Node.js
- **Angular CLI 20+** - `npm install -g @angular/cli@latest`
- **DevPulse Backend** - Running on `https://localhost:5001`
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
     baseUrl: 'https://localhost:5001'
   };
   ```
   - Ensure DevPulse backend API is running

4. **Start Development Server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

5. **Access the Application**
   - Application: `http://localhost:4200`
   - Hot reload enabled for development

### Development Commands

```bash
# Start development server
npm start
ng serve

# Build for production
npm run build
ng build --configuration production

# Run unit tests
npm test

# Watch mode (build on file changes)
npm run watch
ng build --watch

# Generate new component
ng generate component Components/my-component

# Generate new service
ng generate service Services/my-service
```

## API Endpoints Overview

### Authentication & Profile
- `POST /api/account/register` - Create new account
- `POST /api/account/login` - Authenticate and get JWT token
- `GET /api/account/UserProfile` - Get current user profile (auth)
- `PUT /api/account/update` - Update profile with image (auth)
- `GET /api/Admin` - Get all users (admin)

### Blogs
- `GET /api/blog` - Get all blogs (public)
- `GET /api/blog/{id}` - Get blog details (public)
- `GET /api/blog/category/{categoryId}` - Filter by category (public)
- `GET /api/blog/my-blogs` - Get user's blogs (auth)
- `POST /api/blog` - Create blog (auth)
- `PUT /api/blog/{id}` - Update blog (auth, owner/admin)
- `DELETE /api/blog/{id}` - Delete blog (auth, owner/admin)

### Categories
- `GET /api/category` - Get all categories (public)
- `GET /api/category/{id}` - Get category details (admin)
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
- Unsubscribe from observables to prevent memory leaks
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
- **Tree Shaking** - Remove unused code in production builds
- **Image Optimization** - Lazy load and responsive images

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure DevPulse backend allows frontend origin
- Check browser console for CORS messages
- Verify API URL configuration

**Authentication Token Issues**
- Check browser localStorage for token
- Verify JWT token hasn't expired
- Clear localStorage and re-login

**API Calls Failing**
- Verify backend API is running
- Check network tab in developer tools
- Verify JWT token is in Authorization header

**Components Not Rendering**
- Verify route configuration in `app.routes.ts`
- Check component standalone declaration
- Review browser console for errors

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Recent Enhancements

✅ **Angular 20 Upgrade** - Latest Angular features and performance improvements  
✅ **Standalone Components** - Modern component architecture without NgModule  
✅ **User Profile Management** - Profile viewing and image upload  
✅ **Admin Dashboard** - Comprehensive admin panel for system management  
✅ **Enhanced Authentication** - Improved JWT handling and token management  
✅ **Reactive Forms** - Advanced form validation and state management  

## Author

**Gargera**
- GitHub: [@Gargera](https://github.com/Gargera)
- Frontend Repository: [DevPulse-Angular](https://github.com/Gargera/DevPulse-Angular)
- Backend Repository: [DevPulse-WebAPI](https://github.com/Gargera/DevPulse-WebAPI)

---

**DevPulse** © 2024-2026. Built with modern Angular development practices and contemporary web standards.
