// src/components/metrics/AddMetricForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import type { SkillLevel } from "@/types";

interface MetricFormData {
  name: string;
  level: SkillLevel;
  value: number;
  employee_id: string;
}

interface AddMetricFormProps {
  onSubmit: (data: MetricFormData) => Promise<void>;
  employees: Array<{ id: number; name: string }>;
}

const SKILL_LEVELS: SkillLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const AddMetricForm: React.FC<AddMetricFormProps> = ({
  onSubmit,
  employees,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MetricFormData>();

  const handleFormSubmit = async (data: MetricFormData) => {
    try {
      await onSubmit({
        ...data,
        employee_id: data.employee_id,
        value: Number(data.value),
      });
      reset();
    } catch (error) {
      console.error("Error submitting metric:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Metric</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="employee_id"
            className="block text-sm font-medium text-gray-700"
          >
            Employee
          </label>
          <select
            id="employee_id"
            {...register("employee_id", { required: "Employee is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          {errors.employee_id && (
            <p className="mt-1 text-sm text-red-600">
              {errors.employee_id.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Metric Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Metric name is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700"
          >
            Skill Level
          </label>
          <select
            id="level"
            {...register("level", { required: "Skill level is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select level</option>
            {SKILL_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="value"
            className="block text-sm font-medium text-gray-700"
          >
            Value (1-100)
          </label>
          <input
            type="number"
            id="value"
            {...register("value", {
              required: "Value is required",
              min: { value: 1, message: "Minimum value is 1" },
              max: { value: 100, message: "Maximum value is 100" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.value && (
            <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add Metric"}
        </button>
      </form>
    </div>
  );
};

export default AddMetricForm;
