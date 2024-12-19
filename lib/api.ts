/* eslint-disable @typescript-eslint/no-unused-vars */
// lib/api.ts
import { CurrentBounty, Stats, PreviousBounty } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "API request failed");
    }

    return data.data || data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

export const api = {
  async getCurrentBounty(): Promise<CurrentBounty> {
    try {
      const data = await fetchAPI<{ success: boolean; bounty: CurrentBounty }>(
        "/current-bounty"
      );
      return data.bounty;
    } catch (error) {
      throw new Error("Failed to fetch current bounty");
    }
  },

  async getStats(): Promise<Stats> {
    try {
      const data = await fetchAPI<{ success: boolean; stats: Stats }>("/stats");
      return data.stats;
    } catch (error) {
      throw new Error("Failed to fetch stats");
    }
  },

  async getPreviousBounties(): Promise<PreviousBounty[]> {
    try {
      const data = await fetchAPI<{
        success: boolean;
        bounties: PreviousBounty[];
      }>("/previous-bounties");
      return data.bounties;
    } catch (error) {
      throw new Error("Failed to fetch previous bounties");
    }
  },
};
