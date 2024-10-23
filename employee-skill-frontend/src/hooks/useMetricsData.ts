import { useState, useEffect, useCallback } from "react";
import api from "../lib/api";
import { toast } from "react-toastify";

interface Metric {
  id: number;
  name: string;
  value: number;
  timestamp: string;
  employee_id: number;
  employee: {
    id: number;
    name: string;
  };
}

interface Employee {
  id: number;
  name: string;
  performance: number;
  top_skills?: { name: string; level: number }[];
}

interface UseMetricsDataResult {
  metrics: Metric[];
  topEmployees: Employee[];
  employees: Employee[];
  fetchMetrics: () => Promise<void>;
}

const useMetricsData = (
  selectedEmployee: number | null,
  startDate: Date,
  endDate: Date
): UseMetricsDataResult => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [topEmployees, setTopEmployees] = useState<Employee[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchMetrics = useCallback(async () => {
    try {
      const response = await api.get("/metrics", {
        params: {
          employee_id: selectedEmployee,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        },
      });
      setMetrics(response.data.metrics);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      toast.error("Failed to fetch metrics");
      // Provide fallback data if the API request fails
      setMetrics([]);
    }
  }, [selectedEmployee, startDate, endDate]);

  const fetchTopEmployees = async () => {
    try {
      const response = await api.get("/employees/top_performers");
      setTopEmployees(response.data);
    } catch (error) {
      console.error("Error fetching top employees:", error);
      toast.error("Failed to fetch top employees");
      // Provide fallback data if the API request fails
      setTopEmployees([]);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees");
      // Provide fallback data if the API request fails
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchTopEmployees();
    fetchEmployees();
  }, [fetchMetrics]);

  return {
    metrics,
    topEmployees,
    employees,
    fetchMetrics,
  };
};

export default useMetricsData;
