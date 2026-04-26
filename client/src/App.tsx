import { Switch, Route, useLocation, Redirect } from "wouter";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/Home";
import AdvisorPage from "@/pages/AdvisorPage";
import SocaasPage from "@/pages/SocaasPage";
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
export function buildPath(lang: SupportedLanguage, subpath?: string): string {
  return subpath ? `/${lang}/${subpath}` : `/${lang}/assistance`;
}

// Get asset path with current language
export function getAssetPath(assetPath: string, lang: SupportedLanguage): string {
  const cleanPath = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  return `/${lang}/${cleanPath}`;
}

function LanguageRouter() {
  const [location, setLocation] = useLocation();
  
  // Handle root redirect and bare language redirects
  useEffect(() => {
    if (location === "/" || location === "") {
      setLocation("/en/assistance");
    }
  }, [location, setLocation]);

  return (
    <Switch>
      {/* CyberAssistance page (primary) */}
      <Route path="/de/assistance" component={Home} />
      <Route path="/en/assistance" component={Home} />
      <Route path="/fr/assistance" component={Home} />

      {/* Redirect bare language paths to /assistance */}
      <Route path="/de">
        {() => <Redirect to="/de/assistance" />}
      </Route>
      <Route path="/de/">
        {() => <Redirect to="/de/assistance" />}
      </Route>
      <Route path="/en">
        {() => <Redirect to="/en/assistance" />}
      </Route>
      <Route path="/en/">
        {() => <Redirect to="/en/assistance" />}
      </Route>
      <Route path="/fr">
        {() => <Redirect to="/fr/assistance" />}
      </Route>
      <Route path="/fr/">
        {() => <Redirect to="/fr/assistance" />}
      </Route>

      {/* CyberAdvisory page */}
      <Route path="/de/advisor" component={AdvisorPage} />
      <Route path="/en/advisor" component={AdvisorPage} />
      <Route path="/fr/advisor" component={AdvisorPage} />

      {/* SOC as a Service page */}
      <Route path="/de/socaas" component={SocaasPage} />
      <Route path="/en/socaas" component={SocaasPage} />
      <Route path="/fr/socaas" component={SocaasPage} />
      
      {/* Redirect unsupported languages to English */}
      <Route path="/:lang">
        {() => <Redirect to="/en/assistance" />}
      </Route>
      <Route path="/:lang/">
        {() => <Redirect to="/en/assistance" />}
      </Route>
      <Route path="/:lang/:rest*">
        {(params: { lang: string }) => {
          if (!SUPPORTED_LANGUAGES.includes(params.lang as SupportedLanguage)) {
            return <Redirect to="/en/assistance" />;
          }
          return <NotFound />;
        }}
      </Route>
      
      {/* Root redirect */}
      <Route path="/">
        {() => <Redirect to="/en/assistance" />}
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
