# Theme Toggle Functionality

This project now includes a comprehensive theme toggle system that allows users to switch between light and dark modes with persistence across browser sessions.

## Features

- ✅ **Redux State Management**: Theme state is managed through Redux with automatic localStorage persistence
- ✅ **Multiple Component Variants**: Icon, Switch, Icon with Text, and Animated variants
- ✅ **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- ✅ **Material-UI Integration**: Fully integrated with Material-UI's theming system
- ✅ **Smooth Transitions**: Animated transitions between theme changes
- ✅ **Accessibility**: Proper ARIA labels, tooltips, and keyboard navigation
- ✅ **System Preference Detection**: Automatically detects user's system theme preference on first visit

## Components

### ThemeToggle

The main theme toggle component with multiple variants:

```tsx
import { ThemeToggle } from './components/ThemeToggle';

// Icon variant (default)
<ThemeToggle variant="icon" size="medium" />

// Switch variant
<ThemeToggle variant="switch" size="medium" />

// Icon with text variant
<ThemeToggle variant="icon-with-text" size="medium" />
```

### AnimatedThemeToggle

A special variant with rotating animation:

```tsx
import { AnimatedThemeToggle } from './components/ThemeToggle';

<AnimatedThemeToggle size="medium" />
```

### useThemeToggle Hook

Custom hook for programmatic theme control:

```tsx
import { useThemeToggle } from './hooks/useThemeToggle';

const MyComponent = () => {
  const { mode, isDark, isLight, toggle, setLight, setDark } = useThemeToggle();
  
  return (
    <div>
      <p>Current theme: {mode}</p>
      <button onClick={toggle}>Toggle Theme</button>
      <button onClick={setLight}>Set Light</button>
      <button onClick={setDark}>Set Dark</button>
    </div>
  );
};
```

## Integration

The theme toggle has been integrated into the navbar at multiple breakpoints:

- **Desktop**: Icon toggle next to profile/auth buttons
- **Tablet**: Icon toggle in the navigation area
- **Mobile**: Icon toggle next to profile menu + switch in profile dropdown

## Theme Configuration

The theme system supports:

- **Light Theme**: Clean, bright colors with good contrast
- **Dark Theme**: Dark backgrounds with light text and adjusted colors
- **Smooth Transitions**: 0.3s ease transitions for background and text colors
- **Component Customization**: Enhanced Paper and CssBaseline components for better theme support

## Files Added/Modified

### New Files:
- `src/store/themeSlice.ts` - Redux slice for theme state management
- `src/components/ThemeWrapper.tsx` - Theme provider wrapper component
- `src/components/ThemeToggle.tsx` - Main theme toggle components
- `src/hooks/useThemeToggle.ts` - Custom hook for theme management
- `src/components/ThemeDemo.tsx` - Demo component showcasing all variants

### Modified Files:
- `src/main.tsx` - Updated to use ThemeWrapper
- `src/theme/theme.ts` - Enhanced to support both light and dark themes
- `src/store/index.ts` - Added theme reducer
- `src/layouts/Navbar/index.tsx` - Added theme toggles to navbar
- `src/layouts/Navbar/components/ProfileMenu.tsx` - Added theme toggle to mobile menu
- `src/components/index.ts` - Added exports for new components

## Usage Examples

### Basic Usage
```tsx
// Simple icon toggle
<ThemeToggle />

// Switch with label
<ThemeToggle variant="switch" />

// Animated version
<AnimatedThemeToggle />
```

### Advanced Usage
```tsx
import { useThemeToggle } from './hooks/useThemeToggle';
import { ThemeToggle } from './components/ThemeToggle';

const MyApp = () => {
  const { isDark, mode } = useThemeToggle();
  
  return (
    <div>
      <header>
        <h1>My App ({mode} mode)</h1>
        <ThemeToggle variant="icon-with-text" />
      </header>
      <main style={{ 
        backgroundColor: isDark ? '#121212' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000'
      }}>
        Content here...
      </main>
    </div>
  );
};
```

## Customization

You can customize the theme colors by modifying `src/theme/theme.ts`:

```tsx
// Light theme colors
primary: { main: "#1976d2" },
secondary: { main: "#dc004e" },
background: { default: "#fafafa", paper: "#ffffff" },

// Dark theme colors  
primary: { main: "#90caf9" },
secondary: { main: "#f48fb1" },
background: { default: "#121212", paper: "#1e1e1e" },
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest) 
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

The theme preference is stored in localStorage and will persist across browser sessions and page reloads.