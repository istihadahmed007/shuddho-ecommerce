import { Store } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-8 animate-pulse">
        <div className="bg-blue-600/10 p-2 rounded-lg">
          <Store className="h-8 w-8 text-blue-600" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-[#1a1a2e]">
          Bazaar<span className="text-blue-600">Nova</span>
        </span>
      </div>
      
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
      
      <p className="mt-4 text-gray-500 font-medium">Loading...</p>
    </div>
  );
}
