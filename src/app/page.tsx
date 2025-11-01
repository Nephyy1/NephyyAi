import { Button } from "@/components/ui/button";
import { BrainCircuit, BotMessageSquare, ShieldCheck, Menu } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans">
      
      {/* 1. Header/Navbar */}
      <header className="absolute top-0 left-0 w-full z-10 p-4 sm:px-8">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between rounded-lg bg-white/60 backdrop-blur-sm px-6 shadow-3d-light">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">NephyyAI</h1>
          </div>
          
          {/* Navigasi Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
          </nav>
          
          {/* Tombol CTA dan Menu Mobile */}
          <div className="flex items-center space-x-4">
            <Button className="hidden sm:inline-flex" size="sm">
              Try Assistant
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <section className="relative w-full pt-48 pb-32 overflow-hidden bg-hero-gradient">
          <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Teks Hero */}
            <div className="flex flex-col gap-6 text-left">
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                AI Assistant
                <span className="block text-primary">That Understands</span>
                Your Workflow
              </h2>
              <p className="text-lg text-gray-600 max-w-lg">
                NephyyAI analyzes your tasks, learns your patterns, and automates
                your routine, giving you back time to focus on what matters.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button size="lg">Get Started Free</Button>
                <Button size="lg" variant="outline">
                  See Demo
                </Button>
              </div>
            </div>
            
            {/* Kartu Mockup 3D */}
            <div className="relative flex items-center justify-center h-full">
              <div className="w-full max-w-md h-80 rounded-xl bg-white p-6 shadow-3d-medium border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="h-4 w-full rounded-full bg-gray-100 mb-4 opacity-50"></div>
                <div className="space-y-3">
                  <div className="h-8 w-3/4 rounded-full bg-blue-100"></div>
                  <div className="h-8 w-1/2 rounded-full bg-gray-200 ml-auto"></div>
                  <div className="h-8 w-5/6 rounded-full bg-blue-100"></div>
                  <div className="h-8 w-2/3 rounded-full bg-gray-200 ml-auto"></div>
                  <div className="h-8 w-4/5 rounded-full bg-blue-100"></div>
                </div>
                <div className="absolute bottom-4 left-6 right-6 h-10 rounded-lg bg-gray-100 border border-gray-200"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Feature Cards Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-6">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Features Designed for You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Kartu Fitur 1 */}
              <div className="group flex flex-col p-6 bg-white rounded-xl shadow-3d-light border border-gray-50 hover:shadow-3d-medium hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Smart Context</h4>
                <p className="text-gray-600">
                  Understands the context of your conversation and provides relevant, intelligent responses.
                </p>
              </div>
              
              {/* Kartu Fitur 2 */}
              <div className="group flex flex-col p-6 bg-white rounded-xl shadow-3d-light border border-gray-50 hover:shadow-3d-medium hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <BotMessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Proactive Automation</h4>
                <p className="text-gray-600">
                  Automates repetitive tasks in your workflow before you even ask.
                </p>
              </div>

              {/* Kartu Fitur 3 */}
              <div className="group flex flex-col p-6 bg-white rounded-xl shadow-3d-light border border-gray-50 hover:shadow-3d-medium hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h4>
                <p className="text-gray-600">
                  Your data is encrypted and remains yours, always. Enterprise-grade security.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="w-full py-16 bg-secondary/50 border-t border-gray-200">
        <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">NephyyAI</h3>
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} NephyyAI. All rights reserved.</p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <h4 className="font-semibold text-gray-800">Links</h4>
            <a href="#" className="text-gray-600 hover:text-primary">Features</a>
            <a href="#" className="text-gray-600 hover:text-primary">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-primary">Docs</a>
          </div>
          
          <div className="flex flex-col space-y-2">
            <h4 className="font-semibold text-gray-800">Company</h4>
            <a href="#" className="text-gray-600 hover:text-primary">About Us</a>
            <a href="#" className="text-gray-600 hover:text-primary">Careers</a>
            <a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
            }
      
