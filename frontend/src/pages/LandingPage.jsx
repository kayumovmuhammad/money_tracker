import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wallet, TrendingUp, ShieldCheck, ArrowRight, LayoutDashboard, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero Animations
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(
      ctaRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Floating animation for abstract shapes
    gsap.to(".abstract-shape", {
      y: "20px",
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Features Scroll Animation
    gsap.fromTo(
      featureCardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        }
      }
    );

  }, []);

  const addToRefs = (el) => {
    if (el && !featureCardsRef.current.includes(el)) {
      featureCardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Navbar (Mock) */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src="/logo/transparent.png" className="w-50" alt="" />
              {/* <Link to="/" className="font-extrabold text-2xl text-primary flex items-center gap-2.5">
                Aura Budget
              </Link> */}
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Sign In
              </Link>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob abstract-shape"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 abstract-shape"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 abstract-shape"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v2.0 is now live
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Master your money <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              with confidence.
            </span>
          </h1>
          
          <p ref={subtitleRef} className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
            Stop wondering where your money goes. Track expenses, set budgets, and achieve your financial goals with our intuitive, AI-powered platform.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/login" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1">
              Start Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute -inset-3 rounded-xl bg-blue-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-700 transition-all duration-200 bg-white border border-gray-200 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm">
              Log In
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Recreated with HTML/CSS for cleaner look */}
        <div className="mt-20 relative z-10 mx-auto max-w-5xl transform hover:scale-[1.01] transition-transform duration-500 ease-out">
           <div className="relative rounded-2xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-3xl lg:p-4">
              <div className="rounded-xl bg-white shadow-2xl ring-1 ring-gray-900/10 overflow-hidden">
                {/* Mock UI Header */}
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-2">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="ml-4 w-full max-w-md h-6 bg-white rounded-md border border-gray-200 flex items-center px-2 text-xs text-gray-400">
                      moneytracker.app/dashboard
                   </div>
                </div>
                {/* Mock UI Content */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/50">
                    <div className="col-span-2 space-y-6">
                        <div className="h-48 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                             <div className="h-4 w-32 bg-gray-100 rounded mb-4"></div>
                             <div className="flex items-end gap-2 h-32">
                                <div className="w-full bg-blue-50 rounded-t-lg h-[60%] relative group">
                                   <div className="absolute inset-x-0 bottom-0 h-0 bg-blue-500 transition-all duration-1000 group-hover:h-full opacity-20"></div>
                                </div>
                                <div className="w-full bg-blue-50 rounded-t-lg h-[80%]"></div>
                                <div className="w-full bg-blue-50 rounded-t-lg h-[40%]"></div>
                                <div className="w-full bg-blue-50 rounded-t-lg h-[90%]"></div>
                                <div className="w-full bg-blue-50 rounded-t-lg h-[50%]"></div>
                             </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="h-24 bg-white rounded-xl shadow-sm p-4 border border-gray-100"></div>
                             <div className="h-24 bg-white rounded-xl shadow-sm p-4 border border-gray-100"></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                         <div className="h-full bg-white rounded-xl shadow-sm p-6 border border-gray-100"></div>
                    </div>
                </div>
              </div>
           </div>
        </div>

      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-24 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                 Everything you need to grow wealth
               </h2>
               <p className="text-lg text-gray-600">
                 Powerful tools packed into a simple, beautiful interface.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <LayoutDashboard className="w-8 h-8 text-white" />,
                  title: "Intuitive Dashboard",
                  desc: "Get a clear snapshot of your financial health at a glance. Visual charts and real-time updates.",
                  color: "bg-blue-500"
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-white" />,
                  title: "Smart Analytics",
                  desc: "Deep dive into your spending habits. Identify trends and find opportunities to save more.",
                  color: "bg-indigo-500"
                },
                {
                  icon: <ShieldCheck className="w-8 h-8 text-white" />,
                  title: "Bank-Grade Security",
                  desc: "Your data is encrypted and secure. We prioritize your privacy and data protection above all.",
                  color: "bg-purple-500"
                }
              ].map((feature, idx) => (
                <div 
                  key={idx} 
                  ref={addToRefs}
                  className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${feature.color} rounded-bl-2xl rounded-tr-2xl`}>
                     {feature.icon}
                  </div>
                  <div className={`inline-flex items-center justify-center p-3 rounded-xl ${feature.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-gray-900 overflow-hidden isolate">
         <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20" />
         <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white/90 sm:text-4xl mb-6">
              Ready to take control?
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of users who are managing their money better. Start your journey effectively today.
            </p>
            <Link to="/dashboard" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-200 bg-white border border-transparent font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-blue-50">
               Create Free Account
               <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
             <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Wallet className="w-5 h-5 text-gray-400" />
                <span className="font-semibold text-gray-700">MoneyTracker</span>
             </div>
             <p>&copy; {new Date().getFullYear()} MoneyTracker. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
};

export default LandingPage;
