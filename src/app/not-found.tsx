import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mb-8 max-w-md text-sm text-[#666666]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#111111] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
