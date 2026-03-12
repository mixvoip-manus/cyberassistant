import { Switch, Route, useLocation, Redirect } from "wouter";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";

// Base path for the application (empty = root level, nginx handles /mixcyber rewriting)
export const BASE_PATH = "";

// Supported languages
export const SUPPORTED_LANGUAGES = ["de", "en", "fr"] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Get language from URL path
export function getLanguageFromPath(path: string): SupportedLanguage {
  const match = path.match(/^\/(de|en|fr)(\/|$)/);
  if (match && SUPPORTED_LANGUAGES.includes(match[1] as SupportedLanguage)) {
    return match[1] as SupportedLanguage;
  }
  return "en"; // Default to English
}

// Build full path with language
export function buildPath(lang: SupportedLanguage, hash?: string): string {
  return hash ? `/${lang}/#${hash}` : `/${lang}/`;
}

// Get asset path with current language
export function getAssetPath(assetPath: string, lang: SupportedLanguage): string {
  const cleanPath = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  return `/${lang}/${cleanPath}`;
}

function LanguageRouter() {
  const [location, setLocation] = useLocation();
  
  // Handle root redirect
  useEffect(() => {
    if (location === "/" || location === "") {
      setLocation("/en/");
    }
  }, [location, setLocation]);

  return (
    <Switch>
      {/* Language-specific routes */}
      <Route path="/de" component={Home} />
      <Route path="/de/" component={Home} />
      <Route path="/en" component={Home} />
      <Route path="/en/" component={Home} />
      <Route path="/fr" component={Home} />
      <Route path="/fr/" component={Home} />
      
      {/* Redirect unsupported languages to English */}
      <Route path="/:lang">
        {() => <Redirect to="/en/" />}
      </Route>
      <Route path="/:lang/">
        {() => <Redirect to="/en/" />}
      </Route>
      
      {/* Root redirect */}
      <Route path="/">
        {() => <Redirect to="/en/" />}
      </Route>
      
      {/* 404 for everything else */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="cyber-assistance-theme">
      <LanguageProvider>
        <TooltipProvider>
          <LanguageRouter />
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
