import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ContactUs() {
  return (
    <main className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl mb-12 bg-slate-900 h-64 flex items-center justify-center text-center">
          <div className="absolute inset-0 opacity-40">
            <Image 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt="Modern office building" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">Have questions about our rentals near the University of Buea? Our Molyko team is here to help you find your next home.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" type="email" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Inquiry about Molyko Apartments" type="text" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Tell us what you're looking for..." rows={5}></textarea>
                </div>
                <Button className="w-full md:w-auto bg-blue-600 text-white px-8 py-6 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-primary/30 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-blue-600 shadow-sm">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <h3 className="font-bold text-lg">Visit Us</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Molyko, Main Street<br/>
                Opposite University of Buea<br/>
                Buea, SW Region, Cameroon
              </p>
            </div>

            <div className="bg-primary/30 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-blue-600 shadow-sm">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <h3 className="font-bold text-lg">Call Us</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">+237 672 851 125</p>
            </div>

            <div className="bg-primary/30 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-blue-600 shadow-sm">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <h3 className="font-bold text-lg">Email Us</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">ayambajonjeku@gmail.com</p>
            </div>

            {/* Static Map Placeholder */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 h-48 bg-slate-200 relative">
              <Image 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
                alt="Map" 
                fill
                className="object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 border border-blue-500">
                  <span className="material-symbols-outlined text-sm text-blue-500">push_pin</span>
                  Molyko Office
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="font-semibold">How do I book a viewing?</span>
                <span className="material-symbols-outlined text-slate-400">expand_more</span>
              </button>
              <div className="px-6 pb-5 text-slate-600 dark:text-slate-400">
                You can book a viewing by filling out the contact form above with your preferred date and time, or by calling our Molyko office directly. We conduct viewings Monday to Saturday.
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="font-semibold">What is the security deposit policy?</span>
                <span className="material-symbols-outlined text-slate-400">expand_more</span>
              </button>
              <div className="px-6 pb-5 text-slate-600 dark:text-slate-400">
                Typically, a security deposit equivalent to one month's rent is required. This is fully refundable at the end of your tenancy, provided the property is returned in its original condition.
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="font-semibold">Are utilities included in the rent?</span>
                <span className="material-symbols-outlined text-slate-400">expand_more</span>
              </button>
              <div className="px-6 pb-5 text-slate-600 dark:text-slate-400">
                This varies by property. Most student studios in Molyko include water but have separate ENEO meters for electricity. Check the specific listing details or ask us during the viewing.
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <button className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="font-semibold">Do you offer short-term rentals?</span>
                <span className="material-symbols-outlined text-slate-400">expand_more</span>
              </button>
              <div className="px-6 pb-5 text-slate-600 dark:text-slate-400">
                Our standard leases are for 12 months, matching the academic year. However, we do have a few select properties that offer 3-6 month lease options.
              </div>
            </div>

          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
