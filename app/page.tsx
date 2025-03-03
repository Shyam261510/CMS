import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to our site
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          This is a demo page showing our navbar with dark mode and Google
          login.
        </p>
      </div>
    </main>
  );
}
