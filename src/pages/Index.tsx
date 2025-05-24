
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Heart, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-bold text-gray-900">AllTimeCoffee</span>
          </div>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Fuel Your Passion with
            <span className="text-amber-600 block">Coffee & Support</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your personalized coffee page and let your supporters buy you a coffee. 
            Accept donations through crypto, Stripe, or UPI - all in one place.
          </p>
          <Link to="/get-started">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg">
              Get Started
              <Coffee className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle>Quick Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Create your coffee page in minutes with Google sign-in and start receiving support immediately.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle>Multiple Payment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Accept payments via Stripe, cryptocurrency, or UPI - whatever works best for your supporters.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle>Build Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Connect with your supporters and build a community around your passion and creativity.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start receiving support?
          </h2>
          <p className="text-gray-600 mb-6">Join thousands of creators already using AllTimeCoffee</p>
          <Link to="/get-started">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              Create Your Coffee Page
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center space-x-2">
            <Coffee className="h-5 w-5 text-amber-600" />
            <span className="text-gray-600">© 2024 AllTimeCoffee. Made with ❤️ for creators.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
