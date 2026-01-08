import Link from "next/link";
import { Calendar, CheckSquare, Trophy, Utensils, Image, ListChecks, Moon, Settings } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Calendar",
      description: "Keep track of all family events, appointments, and activities in one place.",
      color: "bg-gradient-ocean",
    },
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Assign and track household tasks with ease. Never forget a chore again.",
      color: "bg-gradient-forest",
    },
    {
      icon: Trophy,
      title: "Rewards System",
      description: "Motivate children with a gamified points and rewards system.",
      color: "bg-gradient-dawn",
    },
    {
      icon: Utensils,
      title: "Meal Planning",
      description: "Plan weekly meals and manage grocery shopping effortlessly.",
      color: "bg-gradient-sunset",
    },
    {
      icon: Image,
      title: "Family Photos",
      description: "Store and organize precious family memories securely.",
      color: "bg-gradient-ocean",
    },
    {
      icon: ListChecks,
      title: "Shared Lists",
      description: "Collaborate on grocery, packing, and to-do lists in real-time.",
      color: "bg-gradient-forest",
    },
    {
      icon: Moon,
      title: "Sleep Tracking",
      description: "Monitor children's sleep patterns and establish healthy routines.",
      color: "bg-gradient-dawn",
    },
    {
      icon: Settings,
      title: "Family Settings",
      description: "Manage family members, roles, and preferences all in one place.",
      color: "bg-gradient-sunset",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-sunset bg-clip-text text-transparent">
            Family Planner
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Organize your family life with style. One app for planning, routines, motivation, and memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg font-semibold text-lg hover:bg-primary/5 transition-all duration-300"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-card-desktop p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Why Families Love Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Private & Secure</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-forest bg-clip-text text-transparent mb-2">∞</div>
              <div className="text-gray-600 dark:text-gray-300">Unlimited Members</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-sunset rounded-card-desktop p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to organize your family life?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families already using Family Planner
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-10 py-4 bg-white text-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Start Free Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2026 Family Planner. Built with love for families.</p>
        </div>
      </footer>
    </div>
  );
}
