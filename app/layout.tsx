import './globals.css';

export const metadata = {
  title: 'Tech Wear',
  description: 'Discover the latest in fashion technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
