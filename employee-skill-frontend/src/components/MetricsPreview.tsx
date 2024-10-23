import React from "react";
import { motion } from "framer-motion";
import type { MetricsPreviewProps, Metric } from "@/types";

const MetricsPreview: React.FC<MetricsPreviewProps> = ({ metrics }) => {
  const getEmployeeName = (metric: Metric): string => {
    return metric.employee_name || metric.employee?.name || "Unknown Employee";
  };

  return (
    <div className="metrics-preview py-20 bg-gray-50 rounded-xl shadow-inner">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600">
          Recent Metrics
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          {metrics.length > 0 ? (
            <ul className="space-y-6">
              {metrics.map((metric) => (
                <motion.li
                  key={metric.id}
                  className="flex justify-between items-center border-b pb-4 last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <span className="font-medium text-lg text-gray-700">
                      {getEmployeeName(metric)}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      {metric.name} ({metric.level})
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <motion.span
                      className="text-2xl font-bold text-indigo-600"
                      key={metric.value}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {metric.value}
                    </motion.span>
                    <span className="text-sm text-gray-500">
                      {new Date(metric.timestamp).toLocaleString()}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No metrics available for preview.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MetricsPreview;
