import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { CurrentBounty, Stats, PreviousBounty } from "@/lib/types";

interface BountyDataState {
  currentBounty: CurrentBounty | null;
  previousBounties: PreviousBounty[];
  stats: Stats | null;
  loading: boolean;
  error: string | null;
}

export function useBountyData(): BountyDataState {
  const [state, setState] = useState<BountyDataState>({
    currentBounty: null,
    previousBounties: [],
    stats: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!mounted) return;

      // Only show loading on initial fetch
      if (!state.currentBounty && !state.stats) {
        setState((prev) => ({ ...prev, loading: true }));
      }

      try {
        const statsPromise = api.getStats().catch((error) => {
          console.error("Stats error:", error);
          return state.stats;
        });

        const bountyPromise = api.getCurrentBounty().catch((error) => {
          console.error("Current bounty error:", error);
          return state.currentBounty;
        });

        const previousPromise = api.getPreviousBounties().catch((error) => {
          console.error("Previous bounties error:", error);
          return state.previousBounties;
        });

        const [stats, currentBounty, previousBounties] = await Promise.all([
          statsPromise,
          bountyPromise,
          previousPromise,
        ]);

        if (!mounted) return;

        setState({
          currentBounty,
          previousBounties,
          stats,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        if (!mounted) return;

        setState((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : "Failed to fetch data",
        }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return state;
}
