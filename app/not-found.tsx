import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen hero-gradient circuit-bg flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-bebas text-brand-royal text-9xl tracking-tight">404</p>
        <h1 className="font-bebas text-white text-4xl tracking-wide mb-4">PAGE NOT FOUND</h1>
        <p className="text-brand-silver/60 text-sm mb-8 max-w-sm mx-auto">
          The page you{"'"}re looking for doesn{"'"}t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-royal hover:bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
