// src/pages/employees/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { Employee, Metric } from "@/types";
import SkillChart from "@/components/SkillChart";

export default function EmployeeDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id || !isAuthenticated) return;

      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError("Error loading employee details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  if (!employee) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500">Employee not found.</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{employee.name}</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Department</p>
              <p className="font-medium">{employee.department}</p>
            </div>
            <div>
              <p className="text-gray-600">Role</p>
              <p className="font-medium">{employee.role}</p>
            </div>
          </div>

          {employee.top_skills && employee.top_skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employee.top_skills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium">{skill.name}</h3>
                    <div className="mt-2 h-2 bg-gray-200 rounded">
                      <div
                        className="h-full bg-indigo-600 rounded"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Level: {skill.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Performance History</h2>
            <div className="h-64">
              <SkillChart data={employee.top_skills || []} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
