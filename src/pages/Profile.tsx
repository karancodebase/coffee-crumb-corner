import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Heart, Share, CreditCard, Wallet, Smartphone } from "lucide-react";

interface ProfileData {
  username: string;
  displayName: string;
  bio: string;
  walletAddress?: string;
  upiId?: string;
  stripeEmail?: string;
  avatar?: string;
}

const Profile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "crypto" | "upi">("stripe");

  useEffect(() => {
    // Simulate loading profile data from localStorage (temporary until Supabase is connected)
    setTimeout(() => {
      // Check if profile data exists in localStorage
      const savedProfile = localStorage.getItem(`profile_${username}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else if (username === "john") {
        // Keep the existing mock data for john
        setProfile({
          username: "john",
          displayName: "John Developer",
          bio: "Full-stack developer passionate about creating amazing web experiences. Support my open-source projects!",
          stripeEmail: "john@example.com",
          walletAddress: "0x1234...5678",
          upiId: "john@paytm"
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    }, 500);
  }, [username]);

  const handlePayment = () => {
    console.log("Processing payment:", { amount, message, paymentMethod });
    // Payment processing logic will be implemented
    alert(`Mock payment of $${amount} via ${paymentMethod} processed!`);
    setShowPayment(false);
    setAmount("");
    setMessage("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <Coffee className="h-8 w-8 text-amber-600 animate-spin mx-auto mb-2" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>
              The user @{username} doesn't exist or hasn't set up their coffee page yet.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="mx-auto bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <Coffee className="h-10 w-10 text-amber-600" />
            </div>
            <CardTitle className="text-2xl">{profile.displayName}</CardTitle>
            <CardDescription className="text-sm text-gray-500">@{profile.username}</CardDescription>
            {profile.bio && (
              <p className="text-gray-700 mt-2">{profile.bio}</p>
            )}
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Buy Coffee Section */}
        {!showPayment ? (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Support {profile.displayName}
              </CardTitle>
              <CardDescription>
                Buy them a coffee to show your appreciation!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => setShowPayment(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-3"
              >
                <Coffee className="h-5 w-5 mr-2" />
                Buy Me a Coffee
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Support {profile.displayName}</CardTitle>
              <CardDescription>Choose an amount and payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Selection */}
              <div className="space-y-3">
                <Label>Amount (USD)</Label>
                <div className="flex gap-2 mb-2">
                  {[3, 5, 10].map((preset) => (
                    <Button
                      key={preset}
                      variant={amount === preset.toString() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAmount(preset.toString())}
                    >
                      ${preset}
                    </Button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label>Message (optional)</Label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say something nice..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={2}
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={paymentMethod === "stripe" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("stripe")}
                    className="flex flex-col items-center p-4 h-auto"
                    disabled={!profile.stripeEmail}
                  >
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span className="text-xs">Stripe</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "crypto" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("crypto")}
                    className="flex flex-col items-center p-4 h-auto"
                    disabled={!profile.walletAddress}
                  >
                    <Wallet className="h-5 w-5 mb-1" />
                    <span className="text-xs">Crypto</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "upi" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("upi")}
                    className="flex flex-col items-center p-4 h-auto"
                    disabled={!profile.upiId}
                  >
                    <Smartphone className="h-5 w-5 mb-1" />
                    <span className="text-xs">UPI</span>
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowPayment(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                  disabled={!amount || parseFloat(amount) <= 0}
                >
                  Send ${amount || "0"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;
