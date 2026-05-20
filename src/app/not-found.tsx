import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center text-center px-4 font-display">
      <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mb-8 rotate-6">
        <span className="material-symbols-outlined text-5xl text-blue-600">home_work</span>
      </div>
      <h1 className="text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-10 leading-relaxed">
        The page you are looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/">
          <Button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            <span className="material-symbols-outlined mr-2">home</span>
            Back to Home
          </Button>
        </Link>
        <Link href="/browse">
          <Button variant="outline" className="px-8 py-3 border border-slate-300 rounded-xl font-bold hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined mr-2">search</span>
            Browse Houses
          </Button>
        </Link>
      </div>
    </div>
  );
}
