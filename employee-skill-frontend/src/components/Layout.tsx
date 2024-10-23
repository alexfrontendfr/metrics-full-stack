import React, { ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md">
<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold text-indigo-600"
          >
            <Link href="/">Metrics Visualizer</Link>
          </motion.div>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/metrics"
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  Metrics
                </Link>
                <button
                  onClick={logout}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-white shadow-md text-center py-4">
        <p className="text-gray-500">© 2024 Metrics Visualizer</p>
      </footer>
    </div>
  );
};

export default Layout;
