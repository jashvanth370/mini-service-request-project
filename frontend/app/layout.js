import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'ServiceBoard | Connect with Local Tradespeople',
  description: 'Post your service requests and find the best tradespeople in your area.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Link href="/" className="logo">
              <span style={{ fontSize: '1.8rem' }}>🛠️</span> ServiceBoard
            </Link>
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link href="/" style={{ fontWeight: 500 }}>Browse Jobs</Link>
              <Link href="/new" className="btn btn-primary">Post a Job</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
          <p>© 2026 ServiceBoard by GlobalTNA Intern Assessment</p>
        </footer>
      </body>
    </html>
  );
}
