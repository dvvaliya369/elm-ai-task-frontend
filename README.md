# ELM AI Task Frontend

A modern social media application built with React, TypeScript, and Material-UI. This application allows users to create accounts, share posts with images/videos, interact with content through likes and comments, and manage their personal posts.

## 🚀 Features

- **User Authentication**: Login/Signup with JWT token management
- **Post Management**: Create, edit, delete posts with media support
- **Social Interactions**: Like and comment on posts
- **Personal Dashboard**: View your own posts in a grid layout
- **Responsive Design**: Mobile-first approach with Material-UI
- **Real-time Updates**: Optimistic UI updates for better UX
- **Protected Routes**: Secure navigation with authentication guards

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript
- **Build Tool**: Vite 7.1.2
- **UI Library**: Material-UI (MUI) 7.3.1
- **State Management**: Redux Toolkit 2.8.2
- **Routing**: React Router DOM 7.8.1
- **HTTP Client**: Axios 1.11.0
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material-UI Icons
- **Fonts**: Roboto (Google Fonts)

## 📁 Project Structure

```
src/
├── assets/                 # Static assets (images, logos)
├── components/            # Reusable UI components
│   ├── AuthForm/         # Authentication forms
│   ├── FormField/        # Form input components
│   ├── MyPosts/          # Personal posts grid view
│   ├── Post/             # Post-related components
│   ├── PostDetail/       # Single post view components
│   └── RouteLoader/      # Loading component
├── context/              # React context providers
│   └── ToastContext.tsx  # Toast notification system
├── hooks/                # Custom React hooks
│   ├── useCreatePost.ts  # Post creation logic
│   ├── useLike.ts        # Like functionality
│   ├── usePosts.ts       # Posts data management
│   ├── useProfile.ts     # Profile management
│   ├── useToast.ts       # Toast notifications
│   └── useUpdatePost.ts  # Post update logic
├── interface/            # TypeScript interfaces
├── layouts/              # Layout components
│   ├── Navbar/           # Navigation components
│   ├── AuthInitializer.tsx
│   ├── ProtectedRoute.tsx
│   └── PublicRoute.tsx
├── pages/                # Page components
│   ├── create/           # Post creation page
│   ├── home/             # Home feed
│   ├── login/            # Login page
│   ├── my-posts/         # Personal posts page
│   ├── post/             # Single post page
│   ├── profile/          # User profile page
│   └── singup/           # Signup page
├── service/              # API services
│   ├── auth.service.ts   # Authentication API
│   ├── post.service.ts   # Posts API
│   └── profile.service.ts # Profile API
├── store/                # Redux store
│   ├── authSlice.ts      # Authentication state
│   ├── postSlice.ts      # Posts state
│   └── profileSlice.ts   # Profile state
├── theme/                # Material-UI theme
├── utils/                # Utility functions
│   ├── formatTime.ts     # Time formatting
│   ├── user.ts           # User utilities
│   └── validation.ts     # Form validation
├── Router.tsx            # Application routing
└── main.tsx              # Application entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone git@github.com:dvvaliya369/elm-ai-task-frontend.git
cd elm-ai-task-frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `yarn run dev` - Start development server
- `yarn run build` - Build for production
- `yarn run preview` - Preview production build
- `yarn run lint` - Run ESLint

## 🔗 API Integration

The application integrates with a backend API running on `http://localhost:8000/api`. Key endpoints include:

- **Authentication**: `/auth/login`, `/auth/signup`, `/auth/refresh`
- **Posts**: `/post/list`, `/post/create`, `/post/update`, `/post/delete`
- **User Posts**: `/post/user/:userId`
- **Interactions**: `/post/like/:postId`, `/post/comment/:postId`
- **Profile**: `/profile`, `/profile/update`

## 🎨 UI/UX Features

- **Responsive Grid Layout**: 2 items on mobile, 3 on desktop
- **Hover Effects**: Interactive post previews with like/comment counts
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Success/error feedback
- **Empty States**: Helpful messages when no content
- **Protected Navigation**: Route guards for authenticated users

## 🔧 Key Components

### MyPosts Component
- Grid view of user's personal posts
- Responsive layout with hover overlays
- Performance optimized with React.memo and useCallback

### PostCard Component
- Displays post content with media support
- Like/comment interactions
- Three-dot menu for post owners

### Navbar Component
- Responsive navigation with profile dropdown
- Mobile-friendly hamburger menu
- Authentication state awareness

## 📱 Responsive Design

- **Mobile (xs)**: 2 posts per row, compact navigation
- **Tablet (sm)**: 2 posts per row, expanded navigation
- **Desktop (md+)**: 3 posts per row, full navigation

## 🔒 Authentication Flow

1. User logs in/signs up
2. JWT tokens stored in localStorage
3. Automatic token refresh on expiry
4. Protected routes redirect to login if unauthenticated
5. Public routes redirect to home if authenticated

## 🚀 Performance Optimizations

- React.memo for component memoization
- useCallback for stable function references
- Lazy loading for route components
- Optimistic UI updates
- Efficient Redux state management