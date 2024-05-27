import './global.css';

export const metadata = {
  title: 'The San Francisco People’s Debate for Mayor 2024',
  description: `
    The San Francisco People’s Debate for Mayor 2024 is a series of weekly
    debates between the candidates for Mayor of San Francisco held
    in Mission Dolores Park on Saturdays from 1 PM - 3 PM.
  `,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
