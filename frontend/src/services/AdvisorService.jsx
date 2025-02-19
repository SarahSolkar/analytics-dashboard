const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AdvisorService = {
  // Get all advisors
  getAdvisors: async () => {
    try {
      const response = await fetch(`${BASE_URL}/advisors`);
      if (!response.ok) throw new Error("Failed to fetch advisors");
      return await response.json();
    } catch (error) {
      console.error("Error in getAdvisors:", error);
      throw error;
    }
  },

  // Get advisor accounts
  getAdvisorAccounts: async (advisorId) => {
    try {
      const response = await fetch(`${BASE_URL}/advisor/${advisorId}/accounts`);
      if (!response.ok) throw new Error("Failed to fetch advisor accounts");
      return await response.json();
    } catch (error) {
      console.error("Error in getAdvisorAccounts:", error);
      throw error;
    }
  },

  // Get account holdings
  getHoldings: async (accountNumber) => {
    try {
      const response = await fetch(
        `${BASE_URL}/accounts/${accountNumber}/holdings`
      );
      if (!response.ok) throw new Error("Failed to fetch holdings");
      return await response.json();
    } catch (error) {
      console.error("Error in getHoldings:", error);
      throw error;
    }
  },
};
