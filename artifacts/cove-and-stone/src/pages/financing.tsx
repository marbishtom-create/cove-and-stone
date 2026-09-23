import { ArrowRight, BadgeCheck, FileText, Landmark } from 'lucide-react';
import { Link } from 'wouter';
import { THEME_CONFIG } from '@/config/theme';

export default function Financing() {
  return (
    <div className="w-full pt-24 lg:pt-20 bg-background min-h-[80dvh]">
      <div className="container mx-auto px-6 max-w-6xl py-24">
        
        <div className="text-center mb-16">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Project planning</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary">Explore Financing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A complete outdoor environment is a meaningful investment in how you live at home. We can help you understand financing paths while you plan the right scope, materials and timing.
          </p>
        </div>

        <div className="bg-card border border-border p-10 md:p-16 mb-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-primary mb-4">Flexible options for the full environment</h2>
            <p className="text-muted-foreground mb-10">
              Our primary financing partner is {THEME_CONFIG.financing.primaryPartner}. Additional financing options may be available depending on the project, borrower qualifications and current programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12 border-t border-border pt-12">
            <div className="flex flex-col gap-3">
              <Landmark className="w-8 h-8 text-secondary" />
              <h4 className="font-bold text-primary">Start with the scope</h4>
              <p className="text-sm text-muted-foreground">Build a clear plan for the pool, materials, outdoor rooms, lighting and landscape coordination you want.</p>
            </div>
            <div className="flex flex-col gap-3">
              <FileText className="w-8 h-8 text-secondary" />
              <h4 className="font-bold text-primary">Review current programs</h4>
              <p className="text-sm text-muted-foreground">We can point you toward available lender programs without promising a specific rate, payment or term.</p>
            </div>
            <div className="flex flex-col gap-3">
              <BadgeCheck className="w-8 h-8 text-secondary" />
              <h4 className="font-bold text-primary">Make an informed decision</h4>
              <p className="text-sm text-muted-foreground">Compare options based on lender terms, credit approval, project timing and your own financial goals.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://www.lyonfinancial.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-secondary transition-colors">
              Explore Lyon Financial <ArrowRight size={15} />
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
              Estimate Your Project <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="text-xs text-muted-foreground p-6 bg-card border border-border text-center leading-relaxed">
          <p className="font-bold mb-2 uppercase tracking-widest">Important Disclosure</p>
          <p>
            {THEME_CONFIG.financing.disclosure} Cove & Stone is not a lender and does not make credit decisions. Contact the applicable lender directly for complete program details.
          </p>
        </div>

      </div>
    </div>
  );
}
