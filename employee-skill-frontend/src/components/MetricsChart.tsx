import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { enUS } from "date-fns/locale";
import type { Metric } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface MetricsChartProps {
  metrics: Metric[];
}

const skillLevelColors = {
  Beginner: "rgba(255, 99, 132, 0.8)",
  Intermediate: "rgba(54, 162, 235, 0.8)",
  Advanced: "rgba(75, 192, 192, 0.8)",
  Expert: "rgba(153, 102, 255, 0.8)",
} as const;

const MetricsChart: React.FC<MetricsChartProps> = ({ metrics }) => {
  const chartData = {
    datasets: metrics.reduce((acc: any[], metric) => {
      const existingDataset = acc.find(
        (ds) => ds.label === `${metric.name} (${metric.level})`
      );

      if (existingDataset) {
        existingDataset.data.push({
          x: new Date(metric.timestamp),
          y: metric.value,
        });
      } else {
        acc.push({
          label: `${metric.name} (${metric.level})`,
          data: [
            {
              x: new Date(metric.timestamp),
              y: metric.value,
            },
          ],
          borderColor: skillLevelColors[metric.level],
          backgroundColor: skillLevelColors[metric.level],
          tension: 0.1,
        });
      }

      return acc;
    }, []),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: "day" as const,
          tooltipFormat: "PPP",
          displayFormats: {
            day: "MMM d",
          },
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Metrics Over Time",
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MetricsChart;
