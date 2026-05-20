import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header />
      
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 px-6 lg:px-40 flex flex-col items-center text-center bg-white dark:bg-background-dark">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full">
              Built for Students, by Students
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-6">
              Your Home Away from Home in <span className="text-blue-600">Buea</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Revolutionizing student housing with safe, affordable, and verified listings near the University of Buea. We're bridging the gap between quality housing and student budgets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <Button className="w-full sm:w-auto bg-primary hover:bg-blue-100 text-slate-900 font-bold py-6 px-8 rounded-xl transition-all h-auto">
                  Start Your Search
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold py-6 px-8 rounded-xl transition-all h-auto">
                Learn Our Process
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6 lg:px-40 bg-primary/30 dark:bg-slate-900/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Our Mission</h2>
              <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                To provide a transparent, secure, and effortless rental experience for every student in the Buea community. 
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe that where you live significantly impacts how you learn. By removing the stress of finding reliable housing, we empower students to focus on what matters most: their education and personal growth.
              </p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-blue-600">check_circle</span>
                  <span>Verified landlord identities</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-blue-600">check_circle</span>
                  <span>Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-blue-600">check_circle</span>
                  <span>Safe locations near campus hubs</span>
                </li>
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white aspect-video relative">
                <Image 
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop" 
                  alt="Modern student housing" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 px-6 lg:px-40 bg-white dark:bg-background-dark">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-12">
                    <div className="aspect-square rounded-xl overflow-hidden relative">
                      <Image 
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                        alt="Student community" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-primary flex items-center justify-center p-6 text-center">
                      <div>
                        <p className="text-4xl font-black text-blue-600">5k+</p>
                        <p className="text-sm font-bold text-slate-800 mt-2">Students Helped</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                      <Image 
                        src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop" 
                        alt="Dormitory" 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden relative">
                      <Image 
                        src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop" 
                        alt="Landscape" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 space-y-6">
                <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">Our Story</h2>
                <p className="text-lg font-medium text-blue-600 italic">"From Students to Property Experts"</p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Born out of the challenges students face in finding reliable housing near campus, Buea Rentals was created to simplify the search. As former students ourselves, we faced the "door-to-door" struggle—spending days walking through Molyko and Great Soppo under the Buea sun just to find a decent room.
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  We realized the process was broken. Scams were common, prices were inconsistent, and there was no central hub for verified information. We started as a small project to help our classmates and grew into Buea's most trusted housing platform, leveraging local knowledge and digital security.
                </p>
                <div className="pt-4 flex gap-8">
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">2018</p>
                    <p className="text-sm text-slate-500 mt-1">Year Founded</p>
                  </div>
                  <div className="w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">250+</p>
                    <p className="text-sm text-slate-500 mt-1">Verified Properties</p>
                  </div>
                  <div className="w-px h-12 bg-slate-200 dark:bg-slate-700"></div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">100%</p>
                    <p className="text-sm text-slate-500 mt-1">Safety Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-6 lg:px-40 bg-slate-50 dark:bg-slate-900/20">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Why Choose Us</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We focus on the things that matter most to students, ensuring a worry-free living experience throughout your academic journey.
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-background-dark p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-2">
              <div className="size-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-blue-600 text-3xl">verified_user</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">Verified Listings</h3>
              <p className="text-slate-600 dark:text-slate-400">Every single property listed on our platform undergoes a rigorous physical verification process by our team to ensure safety and authenticity.</p>
            </div>
            
            <div className="bg-white dark:bg-background-dark p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-2">
              <div className="size-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-blue-600 text-3xl">payments</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">Student Pricing</h3>
              <p className="text-slate-600 dark:text-slate-400">We negotiate directly with landlords to secure student-friendly rates and flexible payment schedules that align with scholarship or bursary cycles.</p>
            </div>
            
            <div className="bg-white dark:bg-background-dark p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 transition-transform hover:-translate-y-2">
              <div className="size-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-blue-600 text-3xl">location_on</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100">Strategic Locations</h3>
              <p className="text-slate-600 dark:text-slate-400">Proximity to campus is our priority. Find rooms within walking distance of UB, Biaka, or CUIB, near essential transport links and markets.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-40">
          <div className="max-w-6xl mx-auto bg-blue-600 rounded-3xl overflow-hidden relative p-10 md:p-20 flex flex-col items-center text-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <circle cx="0" cy="0" fill="white" r="40"></circle>
                <circle cx="100" cy="100" fill="white" r="40"></circle>
              </svg>
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to find your perfect student room?</h2>
              <p className="text-blue-100 text-lg mb-10">Join thousands of students who have found their ideal housing in Buea through our verified platform.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/browse">
                  <Button className="bg-white text-blue-600 hover:bg-slate-100 font-bold py-6 px-10 rounded-xl transition-all shadow-lg h-auto text-base">
                    Browse Rentals
                  </Button>
                </Link>
                <Button className="bg-blue-700 text-white hover:bg-blue-800 font-bold py-6 px-10 rounded-xl transition-all border border-blue-400 h-auto text-base">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
