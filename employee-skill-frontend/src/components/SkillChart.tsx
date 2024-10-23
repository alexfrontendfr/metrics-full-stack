import React, { useMemo, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface Skill {
  name: string;
  proficiency: number;
}

interface SkillChartProps {
  data: Skill[];
}

const SkillChart: React.FC<SkillChartProps> = ({ data }) => {
  const [dynamicData, setDynamicData] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicData((prevData) =>
        prevData.map((skill) => ({
          ...skill,
          proficiency: Math.min(100, skill.proficiency + Math.random() * 5),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: TooltipItem<'line'>) => `${context.label}: ${context.raw}%`,  // Typed using correct TooltipItem type
          },
        },
      },
    }),
    []
  );

  const chartData = {
    labels: dynamicData.map((skill) => skill.name),
    datasets: [
      {
        label: "Proficiency (%)",
        data: dynamicData.map((skill) => skill.proficiency),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="relative h-64 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SkillChart;
