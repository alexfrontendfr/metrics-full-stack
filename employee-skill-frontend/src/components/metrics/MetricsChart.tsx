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

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      type: "time" as const,
      time: {
        unit: "day" as const,
        displayFormats: {
          day: "MMM d",
        },
      },
      title: {
        display: true,
        text: "Date",
      },
      adapters: {
        date: {
          locale: enUS,
        },
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

const MetricsChart: React.FC<MetricsChartProps> = ({ metrics }) => {
  const data = {
    datasets: metrics.reduce<any[]>((acc, metric) => {
      const existingDataset = acc.find(
        (ds) => ds.label === `${metric.name} (${metric.level})`
      );

      const dataPoint = {
        x: new Date(metric.timestamp),
        y: metric.value,
      };

      if (existingDataset) {
        existingDataset.data.push(dataPoint);
      } else {
        acc.push({
          label: `${metric.name} (${metric.level})`,
          data: [dataPoint],
          borderColor: `hsl(${acc.length * 60}, 70%, 50%)`,
          backgroundColor: `hsla(${acc.length * 60}, 70%, 50%, 0.5)`,
          tension: 0.3,
        });
      }

      return acc;
    }, []),
  };

  return (
    <div className="h-[400px] w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default MetricsChart;
