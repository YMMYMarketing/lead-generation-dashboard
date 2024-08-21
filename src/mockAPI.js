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
  
  export const fetchLeadData = (timePeriod) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData[timePeriod]);
      }, 500); // Simulate network delay
    });
  };