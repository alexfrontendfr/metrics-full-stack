import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Employee } from "@/types";

interface MetricsFilterProps {
  employees: Employee[];
  selectedEmployee: number | null;
  setSelectedEmployee: (id: number | null) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
}

const MetricsFilter: React.FC<MetricsFilterProps> = ({
  employees,
  selectedEmployee,
  setSelectedEmployee,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-lg font-semibold mb-4">Filter Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="employee-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Employee
          </label>
          <select
            id="employee-select"
            value={selectedEmployee || ""}
            onChange={(e) =>
              setSelectedEmployee(
                e.target.value ? Number(e.target.value) : null
              )
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Employees</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default MetricsFilter;
