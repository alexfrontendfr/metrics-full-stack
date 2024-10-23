import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import MetricsPreview from "@/components/MetricsPreview";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { toast } from "react-toastify";
import type { Metric, MetricsResponse } from "@/types";

export default function HomePage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await api.get<MetricsResponse>("/metrics", {
          params: {
            limit: 5,
            public: true,
          },
        });
        setMetrics(data.metrics);
      } catch {
        toast.error("Failed to load recent metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 py-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-indigo-600 min-h-[80px]">
            <span>
              <Typewriter
                words={["Empower", "Innovate", "Engage"]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Empower your workforce with our advanced skill management and
            training tracking system. Unlock potential and drive growth.
          </p>
          <div className="space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Get Started
                </Link>
                <Link
                  href="/register"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500" />
          </div>
        ) : (
          <MetricsPreview metrics={metrics} />
        )}
      </div>
    </Layout>
  );
}
