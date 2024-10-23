import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Employee } from "@/types";

interface TopPerformersProps {
  employees: Employee[];
}

const TopPerformers: React.FC<TopPerformersProps> = ({ employees }) => {
  const topEmployees = [...employees]
    .sort((a, b) => (b.performance || 0) - (a.performance || 0))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
      <div className="space-y-4">
        {topEmployees.map((employee) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.role}</p>
                <p className="text-sm text-gray-600">{employee.department}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-indigo-600">
                  {employee.performance?.toFixed(1)}%
                </div>
                <Link
                  href={`/employees/${employee.id}`}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  View Details
                </Link>
              </div>
            </div>
            {employee.top_skills && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Top Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {employee.top_skills.map((skill, idx) => (
                    <span
                      key={`${employee.id}-${skill.name}-${idx}`}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                    >
                      {skill.name} ({skill.level})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
        {topEmployees.length === 0 && (
          <p className="text-gray-500 text-center py-4">No employees found</p>
        )}
      </div>
    </div>
  );
};

export default TopPerformers;
