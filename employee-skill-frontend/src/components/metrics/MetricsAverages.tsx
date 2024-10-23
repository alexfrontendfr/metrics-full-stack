import React, { useMemo } from "react";

interface Metric {
  id: number;
  name: string;
  level: string;
  value: number;
  timestamp: string;
  employee: {
    id: number;
    name: string;
  };
}

interface MetricsAveragesProps {
  metrics: Metric[];
}

const MetricsAverages: React.FC<MetricsAveragesProps> = ({ metrics }) => {
  const averages = useMemo(() => {
    const now = new Date();
    const minuteAgo = new Date(now.getTime() - 60000);
    const hourAgo = new Date(now.getTime() - 3600000);
    const dayAgo = new Date(now.getTime() - 86400000);

    const minuteMetrics = metrics.filter(
      (m) => new Date(m.timestamp) >= minuteAgo
    );
    const hourMetrics = metrics.filter((m) => new Date(m.timestamp) >= hourAgo);
    const dayMetrics = metrics.filter((m) => new Date(m.timestamp) >= dayAgo);

    const calculateAverage = (metricsList: Metric[]) => {
      const sum = metricsList.reduce((acc, m) => acc + m.value, 0);
      return metricsList.length > 0 ? sum / metricsList.length : 0;
    };

    return {
      minute: calculateAverage(minuteMetrics),
      hour: calculateAverage(hourMetrics),
      day: calculateAverage(dayMetrics),
    };
  }, [metrics]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Last Minute Average</h3>
        <p className="text-3xl font-bold text-indigo-600">
          {averages.minute.toFixed(2)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Last Hour Average</h3>
        <p className="text-3xl font-bold text-indigo-600">
          {averages.hour.toFixed(2)}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Last Day Average</h3>
        <p className="text-3xl font-bold text-indigo-600">
          {averages.day.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default MetricsAverages;
