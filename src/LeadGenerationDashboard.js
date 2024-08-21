import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './UIComponents';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchLeadData } from './api';

// Mock data - replace with actual data fetching logic
const mockData = {
  today: {
    totalLeads: 100,
    scheduledLeads: 60,
    forwardedLeads: 40,
    deadLeads: 10,
    queuedLeads: 50
  },
  yesterday: {
    totalLeads: 90,
    scheduledLeads: 55,
    forwardedLeads: 35,
    deadLeads: 8,
    queuedLeads: 47
  },
  lastWeek: {
    totalLeads: 600,
    scheduledLeads: 400,
    forwardedLeads: 300,
    deadLeads: 50,
    queuedLeads: 250
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const LeadGenerationDashboard = () => {
  const [timePeriod, setTimePeriod] = useState('today');
  const [data, setData] = useState(mockData.today);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchLeadData(timePeriod);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // You might want to set an error state here and display it to the user
      }
    };
    
    loadData();
  }, [timePeriod]);

  const calculatePercentage = (value) => ((value / data.totalLeads) * 100).toFixed(2);


  const pieChartData = [
    { name: 'Scheduled', value: data.scheduledLeads },
    { name: 'Forwarded', value: data.forwardedLeads },
    { name: 'Dead', value: data.deadLeads },
    { name: 'Queued', value: data.queuedLeads }
  ];

  const predictQueuedOutcomes = () => {
    const totalProcessed = data.forwardedLeads + data.deadLeads;
    const forwardedRatio = data.forwardedLeads / totalProcessed;
    const deadRatio = data.deadLeads / totalProcessed;
    
    return {
      predictedForwarded: Math.round(data.queuedLeads * forwardedRatio),
      predictedDead: Math.round(data.queuedLeads * deadRatio),
      predictedQueued: data.queuedLeads - Math.round(data.queuedLeads * (forwardedRatio + deadRatio))
    };
  };

  const predictions = predictQueuedOutcomes();

  const prepareChartData = () => [
    { name: 'Total Leads', value: data.totalLeads },
    { name: 'Scheduled', value: data.scheduledLeads },
    { name: 'Forwarded', value: data.forwardedLeads },
    { name: 'Dead', value: data.deadLeads },
    { name: 'Queued', value: data.queuedLeads },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lead Generation Dashboard</h1>
      
      <Select onValueChange={setTimePeriod} defaultValue={timePeriod}>
        <SelectTrigger className="w-[180px] mb-4">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="lastWeek">Last 7 days</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.totalLeads}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.scheduledLeads} ({calculatePercentage(data.scheduledLeads)}%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Forwarded Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.forwardedLeads} ({calculatePercentage(data.forwardedLeads)}%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dead Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.deadLeads} ({calculatePercentage(data.deadLeads)}%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Queued Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.queuedLeads} ({calculatePercentage(data.queuedLeads)}%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>% Scheduled Forwarded</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{((data.forwardedLeads / data.scheduledLeads) * 100).toFixed(2)}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <Card>
        <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                >
                {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Queued Leads Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Predicted to be forwarded: {predictions.predictedForwarded}</p>
            <p>Predicted to be marked as dead: {predictions.predictedDead}</p>
            <p>Predicted to remain in queue: {predictions.predictedQueued}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
  <CardHeader>
    <CardTitle>Lead Data Overview</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={prepareChartData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>
    </div>
  );
};

export default LeadGenerationDashboard;