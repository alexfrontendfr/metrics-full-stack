import React, { useState, useEffect } from "react";
import api from "../lib/api";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Skill {
  name: string;
  proficiency: number;
}

interface EmployeeSkillsProps {
  employeeId: number | null;
}

const EmployeeSkills: React.FC<EmployeeSkillsProps> = ({ employeeId }) => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (employeeId) {
        try {
          const response = await api.get(`/employees/${employeeId}/skills`);
          setSkills(response.data);
        } catch (error) {
          console.error("Error fetching skills:", error);
        }
      }
    };

    fetchSkills();
  }, [employeeId]);

  if (!employeeId || skills.length === 0) {
    return null;
  }

  const chartData = {
    labels: skills.map((skill) => skill.name),
    datasets: [
      {
        label: "Skill Proficiency",
        data: skills.map((skill) => skill.proficiency),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Employee Skills Overview</h2>
      <div className="aspect-w-16 aspect-h-9" style={{ height: "400px" }}>
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EmployeeSkills;
