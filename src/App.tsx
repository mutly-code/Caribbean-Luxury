import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ArrowRight, Star, MapPin, Phone, Mail, Info } from 'lucide-react';

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [annotationsEnabled, setAnnotationsEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Annotation = ({ children, align = 'right' }: { children: React.ReactNode, align?: 'left' | 'right' | 'top' | 'bottom' }) => (
    <AnimatePresence>
      {annotationsEnabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`absolute z-50 pointer-events-none bg-luxury-gold text-black text-xs font-semibold px-2 py-1 rounded shadow-lg whitespace-nowrap
            ${align === 'right' ? 'left-full ml-2 top-1/2 -translate-y-1/2' : ''}
            ${align === 'left' ? 'right-full mr-2 top-1/2 -translate-y-1/2' : ''}
            ${align === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : ''}
            ${align === 'bottom' ? 'top-full mt-2 left-1/2 -translate-x-1/2' : ''}
          `}
        >
          <div className="flex items-center gap-1">
            <Info size={12} />
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative min-h-screen bg-luxury-bg text-luxury-text font-sans selection:bg-luxury-gold selection:text-black">
      {/* Floating Annotation Toggle */}
      <button
        onClick={() => setAnnotationsEnabled(!annotationsEnabled)}
        className="fixed bottom-6 right-6 z-50 bg-luxury-surface border border-luxury-border p-3 rounded-full shadow-2xl hover:bg-luxury-surface-hover transition text-luxury-gold focus:outline-none"
        title="Toggle Annotations"
      >
        <Info size={24} />
      </button>

      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled ? 'bg-luxury-bg/90 backdrop-blur-md border-b border-luxury-border py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold tracking-widest text-luxury-text relative uppercase">
            Aura <span className="text-luxury-gold">.</span>
            <Annotation align="bottom">Sticky nav: transparent to solid blur</Annotation>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#experience" className="hover:text-luxury-gold transition-colors">Experience</a>
            <a href="#menu" className="hover:text-luxury-gold transition-colors">Menu</a>
            <a href="#story" className="hover:text-luxury-gold transition-colors">Story</a>
            <div className="relative group">
              <button className="bg-luxury-gold text-black px-6 py-2.5 rounded-sm hover:bg-luxury-gold-hover transition-colors font-semibold relative">
                Reserve a Table
                <Annotation align="bottom">Primary Button: Filled, color transition</Annotation>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-luxury-text" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden absolute top-full left-0 w-full bg-luxury-bg border-b border-luxury-border overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 text-center">
                <a href="#experience" className="py-2 hover:text-luxury-gold">Experience</a>
                <a href="#menu" className="py-2 hover:text-luxury-gold">Menu</a>
                <a href="#story" className="py-2 hover:text-luxury-gold">Story</a>
                <button className="bg-luxury-gold text-black mt-4 px-6 py-3 rounded-sm font-semibold">
                  Reserve a Table
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
            alt="Atmospheric bar interior" 
            className="w-full h-full object-cover opacity-40 scale-105 transform transition-transform duration-[20s] hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-black/50" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left mt-20">
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p variants={FADE_UP_VARIANTS} className="text-luxury-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-semibold inline-block relative">
              Escape to the Tropics
              <Annotation align="right">Micro-label: adds contrast to H1</Annotation>
            </motion.p>
            <motion.h1 variants={FADE_UP_VARIANTS} className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] mb-6 relative">
              Refined <br/>
              <span className="italic text-luxury-text-muted">Caribbean</span> Spirit.
              <Annotation align="top">H1: Large, bold serif with italic accent</Annotation>
            </motion.h1>
            <motion.p variants={FADE_UP_VARIANTS} className="text-base md:text-lg text-luxury-text-muted mb-10 max-w-xl font-light leading-relaxed">
              Experience the vibrant soul of the islands through elevated gastronomy and rare spirits in an atmosphere of uncompromised luxury.
            </motion.p>
            <motion.div variants={FADE_UP_VARIANTS} className="flex flex-col sm:flex-row gap-4 items-center md:items-start relative">
              <button className="w-full sm:w-auto bg-luxury-gold text-black px-8 py-4 rounded-sm font-semibold hover:bg-luxury-gold-hover hover:-translate-y-1 transition-all duration-300">
                Book an Experience
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-sm font-medium border border-luxury-border hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 group relative">
                View Menu
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                <Annotation align="right">Secondary Button: Outlined, hover transition</Annotation>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Press */}
      <section className="py-24 border-b border-luxury-border/50 relative overflow-hidden bg-luxury-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
            className="flex flex-wrap justify-between items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
          >
            {['The Michelin Guide', 'Vogue', 'Condé Nast Traveler', 'Esquire'].map((brand, i) => (
              <motion.div key={i} variants={FADE_UP_VARIANTS} className="text-xl md:text-2xl font-serif italic text-luxury-text-muted hover:text-white transition-colors cursor-default relative">
                {brand}
                {i === 0 && <Annotation align="top">Scroll-triggered fade-in. Hover for color.</Annotation>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Offer / Experience */}
      <section id="experience" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={STAGGER_CONTAINER}
            className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                <img 
                  src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200" 
                  alt="Craft cocktail" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-2/3 aspect-square overflow-hidden rounded-sm border-8 border-luxury-bg hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=800" 
                  alt="Culinary dish" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <Annotation align="left">Asymmetric image zone with thick border offset</Annotation>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <motion.span variants={FADE_UP_VARIANTS} className="text-luxury-gold text-xs tracking-widest uppercase mb-4 font-semibold">
                The Offer
              </motion.span>
              <motion.h2 variants={FADE_UP_VARIANTS} className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                A Journey <br/> Through <span className="italic">Flavors</span>
              </motion.h2>
              <motion.p variants={FADE_UP_VARIANTS} className="text-luxury-text-muted mb-8 leading-relaxed font-light">
                Our tasting menu is a carefully curated voyage across the Caribbean archipelago. We blend ancient techniques with modern culinary artistry to present dishes that are familiar in soul, yet completely re-imagined.
              </motion.p>
              
              <motion.div variants={FADE_UP_VARIANTS} className="space-y-6 mb-10">
                {[
                  { title: 'Exotic Pairings', desc: 'Curated rum selections dating back to 1980.' },
                  { title: 'Locally Sourced', desc: 'Fresh seafood delivered daily from the coast.' },
                  { title: 'Private Dining', desc: 'Exclusive spaces for intimate gatherings.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-luxury-gold group-hover:scale-150 transition-transform"/>
                    <div>
                      <h4 className="text-lg font-medium mb-1 text-white group-hover:text-luxury-gold transition-colors">{item.title}</h4>
                      <p className="text-sm text-luxury-text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={FADE_UP_VARIANTS}>
                <button className="text-luxury-gold font-medium uppercase tracking-wider text-sm flex items-center gap-2 hover:gap-4 transition-all pb-1 border-b border-luxury-gold relative">
                  Explore the Menu
                  <ArrowRight size={16} />
                  <Annotation align="bottom">Ghost button: line extension on hover</Annotation>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-luxury-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center mb-16">
          <span className="text-luxury-gold text-xs tracking-widest uppercase mb-4 font-semibold block">Guestbook</span>
          <h2 className="text-4xl md:text-5xl font-serif">Words of <span className="italic">Praise</span></h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8 relative">
          {[
            { quote: "An absolute masterclass in Caribbean fine dining. The ambiance is matched only by the extraordinary complexity of the flavors.", author: "James T.", role: "Local Connoisseur" },
            { quote: "The rare rum pairing elevated the entire night. It feels less like a restaurant and more like an exclusive private club.", author: "Elena R.", role: "Food Critic" },
            { quote: "Impeccable service. The attention to detail in every dish and every corner of the room is simply stunning.", author: "Marcus B.", role: "Travel Blogger" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-luxury-bg border border-luxury-border/50 p-8 rounded-sm hover:-translate-y-2 hover:border-luxury-gold/30 transition-all duration-500 relative group"
            >
              {i === 1 && <Annotation align="top">Card component: subtle border, lift on hover</Annotation>}
              <div className="flex gap-1 text-luxury-gold mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              <p className="text-luxury-text leading-relaxed font-serif italic mb-8">"{item.quote}"</p>
              <div>
                <p className="font-semibold text-sm uppercase tracking-wide">{item.author}</p>
                <p className="text-xs text-luxury-text-muted mt-1 uppercase tracking-wider">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 relative">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif">Curiosity <span className="italic">Rewarded</span></h2>
          </div>

          <div className="space-y-4 relative">
            <Annotation align="left">Accordion: clean borders, rotation animation</Annotation>
            {[
              { q: 'Is a reservation required?', a: 'While we hold a limited number of seats for walk-ins at the lounge, reservations are highly recommended for the main dining room, especially on weekends.' },
              { q: 'What is the dress code?', a: 'We ask our guests to embrace a "Smart Elegance" dress code. Jackets are preferred for gentlemen. Beachwear, athletic wear, and flip-flops are not permitted.' },
              { q: 'Do you accommodate dietary restrictions?', a: 'Yes. Please inform us at least 24 hours in advance of any severe allergies or dietary restrictions so our Chef can prepare a modified experience.' }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Booking Form */}
      <section className="py-32 bg-black relative border-t border-luxury-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">Secure Your <br/><span className="italic text-luxury-gold">Reservation</span></h2>
            <p className="text-luxury-text-muted font-light leading-relaxed mb-8 max-w-md">
              Join us for an unforgettable evening. For parties larger than 6, please contact our concierge directly.
            </p>
            
            <div className="space-y-4 text-sm tracking-wide text-luxury-text-muted">
              <div className="flex items-center gap-4">
                <MapPin size={18} className="text-luxury-gold" />
                <p>123 Palm Avenue, Ocean District</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={18} className="text-luxury-gold" />
                <p>+1 (555) 019-8273</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={18} className="text-luxury-gold" />
                <p>concierge@auramiami.com</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-luxury-surface border border-luxury-border p-8 md:p-12 p rounded-sm relative"
          >
            <Annotation align="top">Form fields: minimal borders, clear focus states</Annotation>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-widest text-luxury-text-muted">First Name</label>
                  <input type="text" className="w-full bg-luxury-bg border-b border-luxury-border/50 focus:border-luxury-gold p-3 text-white outline-none transition-colors rounded-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-widest text-luxury-text-muted">Last Name</label>
                  <input type="text" className="w-full bg-luxury-bg border-b border-luxury-border/50 focus:border-luxury-gold p-3 text-white outline-none transition-colors rounded-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-widest text-luxury-text-muted">Email</label>
                <input type="email" className="w-full bg-luxury-bg border-b border-luxury-border/50 focus:border-luxury-gold p-3 text-white outline-none transition-colors rounded-none" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <label className="text-xs font-medium uppercase tracking-widest text-luxury-text-muted">Date</label>
                  <input type="date" className="w-full bg-luxury-bg border-b border-luxury-border/50 focus:border-luxury-gold p-3 text-white outline-none transition-colors rounded-none [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium uppercase tracking-widest text-luxury-text-muted">Guests</label>
                  <select className="w-full bg-luxury-bg border-b border-luxury-border/50 focus:border-luxury-gold p-3 text-white outline-none transition-colors rounded-none">
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4 People</option>
                    <option>5 People</option>
                    <option>6 People</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-luxury-gold text-black py-4 uppercase tracking-widest font-bold text-sm mt-4 hover:bg-luxury-gold-hover transition-colors rounded-sm relative overflow-hidden group">
                <span className="relative z-10">Request Booking</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Annotation align="bottom">CTA hover: background slide up</Annotation>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-bg border-t border-luxury-border py-12 text-center text-luxury-text-muted text-xs uppercase tracking-widest font-medium">
        <p>&copy; {new Date().getFullYear()} Aura Caribbean. All rights reserved.</p>
      </footer>
    </div>
  );
}

const FAQItem = ({ question, answer }: { key?: React.Key, question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-luxury-border/50">
      <button 
        className="w-full flex justify-between items-center py-6 text-left hover:text-luxury-gold transition-colors focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-serif">{question}</span>
        <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-luxury-gold' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-luxury-text-muted font-light leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

