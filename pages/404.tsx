import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 404 Header */}
        <div>
          <h1 className="text-6xl font-extrabold text-primary tracking-wider">
            404
          </h1>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            Page Not Found
          </p>
          <p className="mt-2 text-gray-600">
            Kechirasiz, siz qidirgan sahifa topilmadi yoki mavjud emas.
          </p>
        </div>

        {/* Illustration (optional) */}
        <div className="flex justify-center">
          <svg
            className="w-40 h-40 text-primary opacity-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Back to Home Button */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-opacity-90 transition duration-150 ease-in-out"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}
