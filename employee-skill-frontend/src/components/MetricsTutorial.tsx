import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MetricsTutorialProps {
  onClose: () => void;
}

const MetricsTutorial: React.FC<MetricsTutorialProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Metrics Dashboard",
      content:
        "This tutorial will guide you through the main features of the Metrics Dashboard.",
    },
    {
      title: "Adding New Metrics",
      content:
        'Use the "Add New Metric" form to record new skill levels for employees.',
    },
    {
      title: "Viewing Top Performers",
      content:
        'The "Top Performing Employees" section shows the employees with the highest average skill levels.',
    },
    {
      title: "Exploring the Metrics Chart",
      content:
        "The chart displays skill levels over time. Use the filters to view data for specific employees and date ranges.",
    },
    {
      title: "Employee Skills Overview",
      content:
        "Scroll down to see a detailed breakdown of skills for each employee.",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4">{steps[step].title}</h2>
          <p className="mb-6">{steps[step].content}</p>
          <div className="flex justify-between">
            <button
              onClick={() => setStep((prev) => Math.max(0, prev - 1))}
              disabled={step === 0}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep((prev) => prev + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MetricsTutorial;
