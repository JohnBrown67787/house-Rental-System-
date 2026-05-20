export function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-accent text-3xl">home_work</span>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">BueaStay</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              The most trusted student housing platform in Buea. We make off-campus living easy and affordable.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <svg className="w-5 h-5 fill-accent" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-accent" href="#">Browse Neighborhoods</a></li>
              <li><a className="hover:text-accent" href="#">Hostels in Molyko</a></li>
              <li><a className="hover:text-accent" href="#">Pricing Guide</a></li>
              <li><a className="hover:text-accent" href="#">Safety Tips</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">About</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a className="hover:text-accent" href="#">Our Mission</a></li>
              <li><a className="hover:text-accent" href="#">List a Property</a></li>
              <li><a className="hover:text-accent" href="#">Landlord FAQ</a></li>
              <li><a className="hover:text-accent" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-sm">mail</span>
                ayambajonjeku@gmail.com
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-sm">phone</span>
                +237 672 851 125
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-sm">location_on</span>
                Silicon Mountain, Buea
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            © 2026 BueaStay Student Housing System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
