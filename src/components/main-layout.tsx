import { Navbar } from "./navbar";

// components/MainLayout.tsx
interface MainLayoutProps {
    children: React.ReactNode;
  }
  
  export function MainLayout({ children }: MainLayoutProps) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 h-full">
          {children}
        </div>
      </div>
    );
  }