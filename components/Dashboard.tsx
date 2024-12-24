"use client";

import React from "react";
import { Trophy, Coins, SquareArrowOutUpRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBountyData } from "@/hooks/useBountyData";
import CountdownTimer from "@/components/CountdownTimer";
import WinnersBoard from "@/components/WinnersBoard";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState("current");
  const router = useRouter();
  const { currentBounty, previousBounties, stats, loading, error } =
    useBountyData();

  console.log("previousBounties: ", previousBounties);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  // Calculate next round time based on current bounty creation time
  const nextRoundTime = currentBounty?.created_at
    ? new Date(
        new Date(currentBounty.created_at).getTime() + 24 * 60 * 60 * 1000
      )
    : new Date();

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-8 mt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <p> Go Mad, Get $MADHAT </p>
          <Image
            src="/favicon.png"
            alt="madhat"
            width={100}
            height={100}
            className="w-8 h-8"
            unoptimized
          />
        </h1>
        <p className="text-gray-600">
          An AI agent that cares about what you do IRL <br />
          and rewards you onchain
        </p>
      </div>

      <CountdownTimer nextRoundTime={nextRoundTime.toISOString()} />
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white rounded-[20px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Rewards
            </CardTitle>
            <Trophy className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {/* {stats?.totalRewards} */}
              {previousBounties
                ?.reduce((acc, bounty) => acc + parseFloat(bounty.amount), 0)
                .toFixed(3)}{" "}
              ETH
            </div>
            <p className="text-xs text-gray-500">Distributed So Far</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-[20px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Token Status
            </CardTitle>
            <Coins className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats?.tokenDistribution}
            </div>
            <p className="text-xs text-gray-500">Of Supply Distributed</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Bounty */}
      {currentBounty && (
        <Card className="bg-white rounded-[20px]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {stats?.currentDay || 0}/100 Bounty
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {currentBounty.amount} + {currentBounty.tokenAmount}
                </p>
                <p className="text-sm text-gray-500">
                  Time Left: {currentBounty.timeLeft}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {currentBounty.submissions} Submissions
                </p>
              </div>
            </div>

            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-700">
                Today&apos;s Challenge:
              </p>
              <p className="text-gray-600">{currentBounty.description}</p>
            </div>
            <Button
              variant="link"
              onClick={() =>
                router.push(
                  `https://poidh.xyz/degen/bounty/${currentBounty.id}`
                )
              }
            >
              View Bounty on POIDH <SquareArrowOutUpRightIcon />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Winners Board */}
      <WinnersBoard previousBounties={previousBounties} />
    </div>
  );
};

export default Dashboard;
