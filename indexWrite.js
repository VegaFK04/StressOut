const fs = require('fs');
const css = `@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --background-secondary: 240 20% 98%;
    --surface: 0 0% 100%;
    --surface-elevated: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --text-primary: 222.2 84% 4.9%;
    --text-secondary: 215.4 16.3% 46.9%;
    --text-muted: 215 20.2% 65.1%;
    --border: 214.3 31.8% 91.4%;
    --border-subtle: 214.3 31.8% 94.1%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --color-healthy: #10B981;
    --color-healthy-foreground: #065F46;
    --color-attention: #F59E0B;
    --color-attention-foreground: #92400E;
    --color-overload: #F97316;
    --color-overload-foreground: #C2410C;
    --color-no-data: #9CA3AF;
    --color-no-data-foreground: #6B7280;
    --color-paused: #8B5CF6;
    --color-paused-foreground: #6D28D9;
    --color-primary: #2563EB;
    --color-primary-light: #60A5FA;
    --color-primary-dark: #1E40AF;
    --color-primary-foreground: #FFFFFF;
    --color-secondary: #64748B;
    --color-secondary-light: #94A3B8;
    --color-secondary-dark: #475569;
    --color-destructive: #EF4444;
    --color-destructive-foreground: #FFFFFF;
    --font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  }
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-family-sans);
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

@theme {
  --color-primary: #2563EB;
  --color-primary-light: #60A5FA;
  --color-primary-dark: #1E40AF;
  --color-primary-foreground: #FFFFFF;
  --color-secondary: #64748B;
  --color-secondary-light: #94A3B8;
  --color-secondary-dark: #475569;
  --color-secondary-foreground: #FFFFFF;
  --color-muted: #F8FAFC;
  --color-muted-foreground: #64748B;
  --color-accent: #F1F5F9;
  --color-accent-foreground: #1E293B;
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-background-secondary: hsl(var(--background-secondary));
  --color-surface: hsl(var(--surface));
  --color-surface-elevated: hsl(var(--surface-elevated));
  --color-foreground: hsl(var(--foreground));
  --color-text-primary: hsl(var(--text-primary));
  --color-text-secondary: hsl(var(--text-secondary));
  --color-text-muted: hsl(var(--text-muted));
  --color-destructive: #EF4444;
  --color-destructive-foreground: #FFFFFF;
  --color-healthy: #10B981;
  --color-healthy-foreground: #065F46;
  --color-attention: #F59E0B;
  --color-attention-foreground: #92400E;
  --color-overload: #F97316;
  --color-overload-foreground: #C2410C;
  --color-no-data: #9CA3AF;
  --color-no-data-foreground: #6B7280;
  --color-paused: #8B5CF6;
  --color-paused-foreground: #6D28D9;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

@layer utilities {
  .status-healthy { @apply bg-emerald-50 text-emerald-700 border-emerald-200; }
  .status-attention { @apply bg-amber-50 text-amber-700 border-amber-200; }
  .status-overload { @apply bg-orange-50 text-orange-700 border-orange-200; }
  .status-no-data { @apply bg-gray-50 text-gray-500 border-gray-200; }
  .status-paused { @apply bg-purple-50 text-purple-700 border-purple-200; }
  .text-display { font-size: 2.25rem; line-height: 1.25; font-weight: 700; letter-spacing: -0.02em; }
  .text-heading-1 { font-size: 1.875rem; line-height: 1.25; font-weight: 600; }
  .text-heading-2 { font-size: 1.5rem; line-height: 1.375; font-weight: 600; }
  .text-heading-3 { font-size: 1.25rem; line-height: 1.375; font-weight: 600; }
  .text-body-large { font-size: 1.125rem; line-height: 1.625; }
  .text-caption { font-size: 0.75rem; line-height: 1.5; color: hsl(var(--text-muted)); }
  .shadow-subtle { box-shadow: var(--shadow-sm); }
  .shadow-card { box-shadow: var(--shadow); }
  .surface { background-color: hsl(var(--surface)); }
  .surface-elevated { background-color: hsl(var(--surface-elevated)); box-shadow: var(--shadow); }
}
`;
fs.writeFileSync('C:\\Users\\Julian\\Desktop\\pj\\stress-out\\src\\index.css', css);
