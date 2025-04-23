
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DonutChartProps {
  data: {
    connected?: number;
    notConnected?: number;
    [key: string]: any;
  };
}

interface ProgressBarProps {
  data: {
    critical?: number;
    high?: number;
    warning?: number;
    failed?: number;
    passed?: number;
    notEvaluated?: number;
    [key: string]: any;
  };
  colorful?: boolean;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartData = [
    { name: "Connected", value: data.connected || 0, color: "#4f46e5" },
    { name: "Not Connected", value: data.notConnected || 0, color: "#e5e7eb" }
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="h-40 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-bold">{total}</div>
        <div className="text-sm text-gray-500">Total</div>
      </div>
      <div className="mt-2 flex justify-center gap-4">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm">{item.name} ({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ data, colorful }) => {
  const getProgressBarItems = () => {
    if (data.critical !== undefined || data.high !== undefined) {
      return [
        { name: "Critical", value: data.critical || 0, color: "#ef4444" },
        { name: "High", value: data.high || 0, color: "#f97316" },
      ];
    }
    
    return [
      { name: "Failed", value: data.failed || 0, color: "#ef4444" },
      { name: "Warning", value: data.warning || 0, color: "#f97316" },
      { name: "Not Evaluated", value: data.notEvaluated || 0, color: "#a1a1aa" },
      { name: "Passed", value: data.passed || 0, color: "#22c55e" }
    ];
  };

  const progressItems = getProgressBarItems();
  const total = progressItems.reduce((sum, item) => sum + item.value, 0);

  if (colorful) {
    return (
      <div>
        <div className="flex rounded-full overflow-hidden h-5 mb-3">
          {progressItems.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                width: `${(item.value / total) * 100}%`,
                backgroundColor: item.color
              }}
              className="h-full"
            ></div>
          ))}
        </div>
        <div className="text-center mb-2">
          <div className="text-xl font-bold">{total}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {progressItems.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm">{item.name} ({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Simple progress bar for risk assessment
  return (
    <div>
      {progressItems.map((item, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium" style={{ color: item.color }}>{item.name} ({item.value})</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{ width: '70%', backgroundColor: item.color }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
