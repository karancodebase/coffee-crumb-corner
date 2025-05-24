
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Setup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    walletAddress: "",
    upiId: "",
    stripeEmail: ""
  });
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");

  const checkUsernameAvailability = async (username: string) => {
    if (!username) {
      setUsernameStatus("idle");
      return;
    }
    
    setUsernameStatus("checking");
    // Simulate API call - will be implemented with Supabase
    setTimeout(() => {
      const taken = ["admin", "test", "user"].includes(username.toLowerCase());
      setUsernameStatus(taken ? "taken" : "available");
    }, 500);
  };

  const handleUsernameChange = (value: string) => {
    setFormData(prev => ({ ...prev, username: value }));
    checkUsernameAvailability(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Save to database and redirect to profile
    navigate(`/${formData.username}`);
  };

  const getUsernameIcon = () => {
    switch (usernameStatus) {
      case "checking":
        return <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />;
      case "available":
        return <Check className="w-4 h-4 text-green-600" />;
      case "taken":
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Coffee className="h-8 w-8 text-amber-600" />
            </div>
            <CardTitle className="text-2xl">Set up your Coffee Page</CardTitle>
            <CardDescription>
              Complete your profile to start receiving support from your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    placeholder="yourname"
                    className="pr-10"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {getUsernameIcon()}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Your page will be available at: alltime.coffee/{formData.username || "username"}
                </p>
                {usernameStatus === "taken" && (
                  <p className="text-sm text-red-600">This username is already taken</p>
                )}
              </div>

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name *</Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  placeholder="Your Display Name"
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell your supporters about yourself..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Methods</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="stripeEmail">Stripe Email</Label>
                  <Input
                    id="stripeEmail"
                    type="email"
                    value={formData.stripeEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, stripeEmail: e.target.value }))}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Crypto Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    value={formData.walletAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, walletAddress: e.target.value }))}
                    placeholder="0x..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={formData.upiId}
                    onChange={(e) => setFormData(prev => ({ ...prev, upiId: e.target.value }))}
                    placeholder="yourname@upi"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={usernameStatus === "taken" || !formData.username || !formData.displayName}
              >
                Create My Coffee Page
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Setup;
