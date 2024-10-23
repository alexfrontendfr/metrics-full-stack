import React from "react";
import { useForm } from "react-hook-form";

interface MetricFormData {
  name: string;
  level: number;
  employee_id: string;
}

interface AddMetricFormProps {
  onSubmit: (data: MetricFormData) => void;
  employees: { id: number; name: string }[];
}

const AddMetricForm: React.FC<AddMetricFormProps> = ({
  onSubmit,
  employees,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MetricFormData>();

  const onSubmitForm = (data: MetricFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Metric</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label
            htmlFor="employee"
            className="block text-sm font-medium text-gray-700"
          >
            Employee
          </label>
          <select
            id="employee"
            {...register("employee_id", { required: "Employee is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            id="name"
            type="text"
            {...register("name", { required: "Metric name is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            Level (1-100)
          </label>
          <input
            id="level"
            type="number"
            min="1"
            max="100"
            {...register("level", {
              required: "Level is required",
              min: { value: 1, message: "Minimum level is 1" },
              max: { value: 100, message: "Maximum level is 100" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.level && (
            <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Metric
        </button>
      </form>
    </div>
  );
};

export default AddMetricForm;
