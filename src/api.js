import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const fetchLeadData = async (timePeriod) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lead-data`, {
      params: { period: timePeriod }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching lead data:", error);
    throw error;
  }
};