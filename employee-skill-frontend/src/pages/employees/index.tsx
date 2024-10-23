import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import Link from "next/link";
import { Employee } from "@/types";

interface EmployeesPageProps {
  initialEmployees?: Employee[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  EmployeesPageProps
> = async (context) => {
  try {
    const response = await api.get("/employees", {
      headers: {
        Cookie: context.req.headers.cookie || "",
      },
    });

    return {
      props: {
        initialEmployees: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching employees:", error);
    return {
      props: {
        initialEmployees: [],
        error: "Failed to load employees",
      },
    };
  }
};

export default function EmployeesPage({
  initialEmployees = [],
  error,
}: EmployeesPageProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await api.get("/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (isAuthenticated) {
      fetchEmployees();
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employees</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {employees.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{employee.name}</h2>
                <p className="text-gray-600 mb-1">{employee.role}</p>
                <p className="text-gray-600 mb-4">{employee.department}</p>

                {employee.top_skills && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      Top Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {employee.top_skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill.name} ({skill.level})
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={`/employees/${employee.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No employees available at the moment.
          </div>
        )}
      </div>
    </Layout>
  );
}
