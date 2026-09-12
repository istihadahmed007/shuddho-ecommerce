import Link from 'next/link';
import { Store } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600/10 p-2 rounded-lg group-hover:bg-blue-600/20 transition-colors">
              <Store className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#1a1a2e]">
              Bazaar<span className="text-blue-600">Nova</span>
            </span>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
