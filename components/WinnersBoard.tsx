import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface WinnersBoardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previousBounties: any[];
}

const WinnersBoard: React.FC<WinnersBoardProps> = ({ previousBounties }) => {
  return (
    <Card className="bg-white rounded-[20px]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Previous Winners
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {previousBounties?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Total Bounties</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {previousBounties
                ?.reduce((acc, bounty) => acc + parseFloat(bounty.amount), 0)
                .toFixed(3)}{" "}
            </div>
            <div className="text-sm text-gray-600">Total Distributed</div>
          </div>
        </div>

        <div className="space-y-3">
          {previousBounties?.map((bounty, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                  <Trophy className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">
                    {bounty.winner
                      ? `${bounty.winner.slice(0, 6)}...${bounty.winner.slice(
                          -4
                        )}`
                      : "No winner yet"}
                  </div>
                  <div className="text-sm text-gray-500">Day {bounty.day}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">
                  +{bounty.amount} ETH
                </div>
                <div className="text-sm text-gray-500">
                  +{bounty.tokenAmount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WinnersBoard;
