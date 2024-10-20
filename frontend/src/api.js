import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';


export const createRule = async (ruleString, name) => {
  const response = await axios.post(`${API_BASE_URL}/rules/create`, {
    ruleString,
    name,
  });
  return response.data;
};


export const getAllRules = async () => {
  const response = await axios.get(`${API_BASE_URL}/rules`);
  return response.data;
};


export const evaluateRule = async (ruleId, data) => {
  const response = await axios.post(`${API_BASE_URL}/rules/evaluate`, {
    ruleId,
    data,
  });
  return response.data;
};


export const modifyRule = async (ruleId, ruleString) => {
  const response = await axios.put(`${API_BASE_URL}/rules/update/${ruleId}`, {
    ruleString,
  });
  return response.data;
};

import axios from 'axios';

export const combineRules = async (ruleIds, name) => {
  try {
    if (!ruleIds || ruleIds.length === 0) {
      throw new Error('Rule IDs are required');
    }

    if (!name) {
      throw new Error('Rule name is required');
    }

    const response = await axios.post(`${API_BASE_URL}/rules/combine`, {
      ruleIds,
      name,
    });

    return response.data;
  } catch (error) {
    console.error('Error combining rules:', error.response ? error.response.data : error.message);
    throw error;
  }
};
