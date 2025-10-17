import { useThemeContext } from '../context/ThemeContext';

export const useThemeToggle = () => {
  const { mode, toggleTheme } = useThemeContext();
  
  return {
    mode,
    toggleTheme,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  };
};
