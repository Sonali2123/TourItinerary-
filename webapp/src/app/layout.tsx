import './globals.css';
import React from 'react';
import QueryProvider from '../components/providers/QueryProvider';

export const metadata = {
  title: 'AI Tour Itinerary Generator | Web App & Mobile',
  description: 'AI-driven travel itinerary generator built with Next.js, Expo React Native, NestJS, and Prisma ORM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-950 text-gray-100">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
