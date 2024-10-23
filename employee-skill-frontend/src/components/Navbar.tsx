import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar: React.FC = () => (
  <motion.div
    initial={{ y: -250 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 120 }}
    className="bg-blue-600 p-4 shadow-md text-white"
  >
    <nav className="flex justify-around">
      <Link href="/" className="hover:text-yellow-300 transition-colors">
        Home
      </Link>
      <Link
        href="/employees"
        className="hover:text-yellow-300 transition-colors"
      >
        Employees
      </Link>
      <Link href="/metrics" className="hover:text-yellow-300 transition-colors">
        Metrics
      </Link>
      <Link href="/skills" className="hover:text-yellow-300 transition-colors">
        Skills
      </Link>
    </nav>
  </motion.div>
);

export default Navbar;
