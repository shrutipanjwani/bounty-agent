"use client";

import React, { useState } from "react";
import { Clock, Trophy, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBountyData } from "@/hooks/useBountyData";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("current");
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

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      {/* Navigation */}
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
      {/* Content */}
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
      )}{" "}
    </div>
  );
};

export default Dashboard;
