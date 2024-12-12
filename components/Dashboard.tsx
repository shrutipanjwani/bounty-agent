"use client";

import React, { useState } from "react";
import { Clock, Trophy, Coins, ImagePlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("current");

  // Sample data
  const currentBounty = {
    day: 45,
    amount: "0.001 ETH",
    tokenAmount: "1000 $AGENT",
    description:
      "Take a photo of you doing a random act of kindness in your local community",
    timeLeft: "8 hours",
    submissions: 12,
  };

  const previousBounties = [
    {
      day: 44,
      winner: "0x1234...5678",
      task: "Create street art with AI",
      proof: "/api/placeholder/400/300",
    },
    {
      day: 43,
      winner: "0x8765...4321",
      task: "Help a local business with tech",
      proof: "/api/placeholder/400/300",
    },
  ];

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
            <div className="text-2xl font-bold">45/100</div>
            <p className="text-xs text-muted-foreground">Days Complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.045 ETH</div>
            <p className="text-xs text-muted-foreground">Distributed So Far</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Status</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5%</div>
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
      {activeTab === "current" ? (
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

            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">Drop your proof here or click to upload</p>
              <p className="text-sm text-muted-foreground">
                Supports images up to 5MB
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {previousBounties.map((bounty, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={bounty.proof}
                    alt={`Day ${bounty.day} winning submission`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">Day {bounty.day} Winner</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Winner: {bounty.winner}
                    </p>
                    <p className="text-sm">Task: {bounty.task}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
