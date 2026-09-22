import { DollarSign, Percent, ShieldCheck } from 'lucide-react';

export default function Financing() {
  return (
    <div className="w-full pt-20 bg-background min-h-[80dvh]">
      <div className="container mx-auto px-6 max-w-4xl py-24">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary">Project Financing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A luxury outdoor space is a significant investment in your property's value and your lifestyle. We partner with specialized lenders to make funding straightforward.
          </p>
        </div>

        <div className="bg-card border border-border p-10 md:p-16 mb-16 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-serif text-primary mb-4">Lyon Financial</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            We are proud to partner with Lyon Financial, the industry leader in pool and outdoor living financing since 1979. They offer specialized programs designed specifically for swimming pool projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12 border-t border-border pt-12">
            <div className="flex flex-col gap-3">
              <DollarSign className="w-8 h-8 text-secondary" />
              <h4 className="font-bold text-primary">High Limits</h4>
              <p className="text-sm text-muted-foreground">Unsecured loans available up to $200,000 for qualified borrowers.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Percent className="w-8 h-8 text-secondary" />
              <h4 className="font-bold text-primary">Fixed Rates</h4>
              <p className="text-sm text-muted-foreground">Low, fixed rates with terms up to 30 years to keep payments manageable.</p>
            </div>
            <div className="flex flex-col gap-3">
              <ShieldCheck className="w-8 h-8 text-secondary" />
              <h4 className="font-bold text-primary">No Equity Required</h4>
              <p className="text-sm text-muted-foreground">No appraisals or home equity needed. Approvals based on credit profile.</p>
            </div>
          </div>

          <a 
            href="https://www.lyonfinancial.net" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            Apply with Lyon Financial
          </a>
        </div>

        <div className="text-xs text-muted-foreground p-6 bg-card border border-border text-center leading-relaxed">
          <p className="font-bold mb-2 uppercase tracking-widest">Important Disclosure</p>
          <p>
            Financing is provided by third-party lenders, including Lyon Financial. All financing is subject to lender approval, credit qualifications, and current rates. Cove & Stone is not a lender and does not make credit decisions, nor do we guarantee approval. Terms and conditions apply. Contact the lender directly for complete program details.
          </p>
        </div>

      </div>
    </div>
  );
}
