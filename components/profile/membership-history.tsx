import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMembershipPurchasesByUserId, getCurrentMembershipForUser } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatCurrency } from "@/lib/utils";

interface MembershipHistoryProps {
  userId: string;
}

export default function MembershipHistory({ userId }: MembershipHistoryProps) {
  const [membershipHistory, setMembershipHistory] = useState([]);
  const [currentMembership, setCurrentMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembershipData() {
      try {
        setLoading(true);
        
        // Fetch purchases and current membership in parallel
        const [historyData, currentData] = await Promise.all([
          getMembershipPurchasesByUserId(userId),
          getCurrentMembershipForUser(userId)
        ]);
        
        if (historyData) {
          setMembershipHistory(historyData);
        }
        
        if (currentData) {
          setCurrentMembership(currentData);
        }
      } catch (error) {
        console.error('Error fetching membership data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (userId) {
      fetchMembershipData();
    }
  }, [userId]);

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle>Membership Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>Membership Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentMembership ? (
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">Current Plan: {currentMembership.membership?.name || 'Basic'}</h3>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-medium">{formatDisplayDate(currentMembership.start_date)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">End Date</p>
                <p className="font-medium">{formatDisplayDate(currentMembership.end_date)}</p>
              </div>
            </div>
            <div className="text-sm">
              <p className="text-muted-foreground">Amount Paid</p>
              <p className="font-medium">₹{currentMembership.amount_paid || currentMembership.membership?.price}</p>
            </div>
          </div>
        ) : (
          <div className="bg-muted p-4 rounded-lg text-center">
            <p>No active membership found. Purchase a membership to access premium features.</p>
          </div>
        )}
        
        {membershipHistory && membershipHistory.length > 0 ? (
          <div>
            <h3 className="font-medium mb-3">Purchase History</h3>
            <div className="space-y-3">
              {membershipHistory.map((purchase) => (
                <div key={purchase.id} className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{purchase.membership?.name || 'Membership'}</p>
                    <Badge 
                      variant="outline" 
                      className={new Date(purchase.end_date) > new Date() ? 
                        "bg-green-100 text-green-800" : 
                        "bg-gray-100 text-gray-800"}
                    >
                      {new Date(purchase.end_date) > new Date() ? 'Active' : 'Expired'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Purchased On</p>
                      <p>{formatDisplayDate(purchase.purchase_date)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valid Until</p>
                      <p>{formatDisplayDate(purchase.end_date)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p>₹{purchase.amount_paid}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment Method</p>
                      <p>{purchase.payment_method || 'Card'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center">No purchase history found.</p>
        )}
      </CardContent>
    </Card>
  );
} 