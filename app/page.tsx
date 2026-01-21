import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative size-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">
            Tech Wear
          </h1>
          <p className="text-xl text-gray-600">
            Discover the latest in fashion technology
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
          >
            Log in
          </Link>
          <Link
            href="/create_account"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          <p>Find your perfect fit — shop now</p>
        </div>
      </div>
    </div>
  );
}
