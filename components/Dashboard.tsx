"use client";

import React from "react";
import { Trophy, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBountyData } from "@/hooks/useBountyData";
import CountdownTimer from "@/components/CountdownTimer";
import WinnersBoard from "@/components/WinnersBoard";
import Image from "next/image";

const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState("current");
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
        <Card className="bg-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Rewards
            </CardTitle>
            <Trophy className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats?.totalRewards}
            </div>
            <p className="text-xs text-gray-500">Distributed So Far</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
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
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Current Bounty Challenge
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
          </CardContent>
        </Card>
      )}

      {/* Winners Board */}
      <WinnersBoard previousBounties={previousBounties} />

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Day</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.currentDay || 0}/100
            </div>
            <p className="text-xs text-muted-foreground">Days Complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalRewards}</div>
            <p className="text-xs text-muted-foreground">Distributed So Far</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Status</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.tokenDistribution}</div>
            <p className="text-xs text-muted-foreground">
              Of Supply Distributed
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-2 border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "current" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("current")}
        >
          Current Bounty
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "previous" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => setActiveTab("previous")}
        >
          Previous Winners
        </button>
      </div>
      {activeTab === "previous" ? (
        <div className="space-y-4">
          {previousBounties?.map((bounty, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-2">
                  <div>
                    <p className="font-medium">Day {bounty.day} Winner</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Winner:{" "}
                      {bounty.winner
                        ? `${bounty.winner.slice(0, 6)}...${bounty.winner.slice(
                            -4
                          )}`
                        : "No winner yet"}
                    </p>
                    <p className="text-sm">Task: {bounty.task}</p>
                    <p className="text-sm">Description: {bounty.description}</p>
                    <p className="text-sm">
                      Reward: {bounty.amount} + {bounty.tokenAmount}
                    </p>
                    <p className="text-sm">{bounty.created_at}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {previousBounties.length === 0 && (
            <p className="text-center text-muted-foreground">
              No previous bounties found
            </p>
          )}
        </div>
      ) : (
        currentBounty && (
          <Card>
            <CardHeader>
              <CardTitle>Day {currentBounty.day} Bounty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">
                    {currentBounty.amount} + {currentBounty.tokenAmount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Time Left: {currentBounty.timeLeft}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {currentBounty.submissions} Submissions
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Today&apos;s Task:</p>
                <p>{currentBounty.description}</p>
              </div>
            </CardContent>
          </Card>
        )
      )}{" "} */}
    </div>
  );
};

export default Dashboard;
