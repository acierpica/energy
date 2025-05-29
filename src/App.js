import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function App() {
  const [selectedCountry, setSelectedCountry] = useState('Deutschland');

  const energyData = {
    'Deutschland': [
      { name: 'Wind', value: 12, color: '#10B981' },
      { name: 'Solar', value: 4, color: '#F59E0B' },
      { name: 'Biomasse', value: 4, color: '#84CC16' },
      { name: 'Wasserkraft', value: 2, color: '#06B6D4' },
      { name: 'Erdgas', value: 41, color: '#6366F1' },
      { name: 'Braunkohle', value: 9, color: '#8B5CF6' },
      { name: 'Steinkohle', value: 10, color: '#A855F7' },
      { name: 'Kernenergie', value: 12, color: '#EF4444' },
      { name: 'Öl', value: 6, color: '#F97316' }
    ],
    // ... other countries
  };

  const countries = Object.keys(energyData);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-blue-600">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        EU-Länder Energieportfolios 2022-2023
      </h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Land auswählen:
        </label>
        <select 
          value={selectedCountry} 
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full max-w-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {selectedCountry} - Energiemix
        </h2>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={energyData[selectedCountry]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {energyData[selectedCountry].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color, fontWeight: 'bold' }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {energyData[selectedCountry]
            .sort((a, b) => b.value - a.value)
            .map((item, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-sm text-gray-600">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Legende der Energiequellen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span><strong>Erneuerbare Energien:</strong></span>
            </div>
            <div className="ml-6 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                <span>Wind</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Solar</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-lime-500 rounded"></div>
                <span>Biomasse</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                <span>Wasserkraft</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span><strong>Kernenergie</strong></span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <span><strong>Fossile Brennstoffe:</strong></span>
            </div>
            {/* Add detailed legend for fossil fuels here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
