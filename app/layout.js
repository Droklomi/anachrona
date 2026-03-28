import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

export const metadata = {
  title: 'Anachrona — L\'Histoire en 60 secondes',
  description: 'Jules César, Marie-Antoinette, Cléopâtre, Louis XIV… Plongez dans l\'Histoire à travers des portraits de figures légendaires, racontés par l\'IA.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Anachrona',
  },
  openGraph: {
    title: 'Anachrona — L\'Histoire en 60 secondes',
    description: 'Jules César, Marie-Antoinette, Cléopâtre… Portraits de figures historiques légendaires racontés par l\'IA.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://anachrona.fr',
    siteName: 'Anachrona',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anachrona — L\'Histoire en 60 secondes',
    description: 'Jules César, Marie-Antoinette, Cléopâtre… Portraits historiques racontés par l\'IA.',
  },
  alternates: {
    canonical: 'https://anachrona.fr',
  },
};

export const viewport = {
  themeColor: '#0d0d0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
