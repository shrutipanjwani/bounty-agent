import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { WinnersBoardProps } from "@/lib/types";

const WinnersBoard: React.FC<WinnersBoardProps> = ({ previousBounties }) => {
  const formatBountyForDisplay = (bounty: any) => {
    const poidhUrl = bounty.id ? 
      `https://poidh.xyz/degen/bounty/${bounty.id}` : null;
    
    const explorerUrl = bounty.transactionHash ? 
      `https://explorer.degen.tips/tx/${bounty.transactionHash}` : null;
    
    const winnerDisplayAddress = bounty.winner ? 
      `${bounty.winner.slice(0, 6)}...${bounty.winner.slice(-4)}` : 
      "No winner yet";

    return {
      ...bounty,
      poidhUrl,
      explorerUrl,
      winnerDisplayAddress,
      hasWinner: !!bounty.winner
    };
  };

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
                .toFixed(3)}{" "} DEGEN
            </div>
            <div className="text-sm text-gray-600">Total Distributed</div>
          </div>
        </div>

        <div className="space-y-3">
        {previousBounties.map((bounty, index) => {
            const displayBounty = formatBountyForDisplay(bounty);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                    <Trophy className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    {displayBounty.poidhUrl ? (
                      <Link
                        href={displayBounty.poidhUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        <div className="font-medium">
                          {displayBounty.winnerDisplayAddress}
                        </div>
                        <div className="text-sm text-gray-500">
                          Day {displayBounty.day}
                        </div>
                      </Link>
                    ) : (
                      <>
                        <div className="font-medium">
                          {displayBounty.winnerDisplayAddress}
                        </div>
                        <div className="text-sm text-gray-500">
                          Day {displayBounty.day}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {displayBounty.explorerUrl ? (
                    <Link
                      href={displayBounty.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <span className="font-medium">+{displayBounty.amount}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  ) : (
                    <div className="font-medium text-green-600">
                      +{displayBounty.amount}
                    </div>
                  )}
                  {/* <div className="text-sm text-gray-500">
                    +{displayBounty.tokenAmount} $MAD
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WinnersBoard;
