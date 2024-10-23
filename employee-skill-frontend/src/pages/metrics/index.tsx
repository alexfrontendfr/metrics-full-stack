import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import MetricsChart from "@/components/metrics/MetricsChart";
import AddMetricForm from "@/components/metrics/AddMetricForm";
import TopPerformers from "@/components/metrics/TopPerformers";
import MetricsFilter from "@/components/metrics/MetricsFilter";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { toast } from "react-toastify";
import type { Metric, Employee } from "@/types";

export default function MetricsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  });

  const fetchData = async () => {
    if (!isAuthenticated) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token");

      const [metricsRes, employeesRes] = await Promise.all([
        api.get("/metrics", {
          params: {
            employee_id: selectedEmployee,
            start_date: dateRange.start.toISOString(),
            end_date: dateRange.end.toISOString(),
          },
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/employees", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setMetrics(metricsRes.data.metrics);
      setEmployees(employeesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, selectedEmployee, dateRange, router]);

  const handleAddMetric = async (data: {
    name: string;
    level: string;
    value: number;
    employee_id: string;
  }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token");

      await api.post(
        "/metrics",
        { metric: data },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Metric added successfully");
      fetchData(); // Refresh data after adding new metric
    } catch (error) {
      console.error("Error adding metric:", error);
      toast.error("Failed to add metric");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Metrics Dashboard</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <AddMetricForm onSubmit={handleAddMetric} employees={employees} />
              <TopPerformers employees={employees} />
            </div>

            <MetricsFilter
              employees={employees}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              startDate={dateRange.start}
              setStartDate={(date) =>
                setDateRange((prev) => ({ ...prev, start: date }))
              }
              endDate={dateRange.end}
              setEndDate={(date) =>
                setDateRange((prev) => ({ ...prev, end: date }))
              }
            />

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Metrics Over Time</h2>
              {metrics.length > 0 ? (
                <MetricsChart metrics={metrics} />
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No metrics available for the selected criteria
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
