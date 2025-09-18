"use client";

import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";

interface AnalyticsChartProps {
  title: string;
  data: {
    label: string;
    value: number;
    trend?: 'up' | 'down' | 'stable';
  }[];
  type?: 'bar' | 'line';
}

const AnalyticsChart = ({ title, data, type = 'bar' }: AnalyticsChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-light-100 text-sm">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{item.value}%</span>
                  {item.trend && (
                    <div className={`flex items-center gap-1 ${
                      item.trend === 'up' ? 'text-green-400' : 
                      item.trend === 'down' ? 'text-red-400' : 
                      'text-gray-400'
                    }`}>
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : item.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <BarChart3 className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full bg-dark-200 rounded-full h-2">
                <div 
                  className="bg-primary-200 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsChart;




