"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Mail, Check } from "lucide-react";
import Image from "next/image";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [newsletterOpen, setNewsletterOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for newsletter submission logic
        console.log("Newsletter signup:", email);
        setSubmitted(true);
        setTimeout(() => {
            setNewsletterOpen(false);
            setSubmitted(false);
            setEmail("");
        }, 2000);
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Shop", href: "/shop" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about" },
        { name: "Team", href: "/team" },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 top-0 transition-all duration-300 border-b bg-brand-500 border-brand-600 shadow-md ${scrolled ? 'py-2' : 'py-4'}`}
            >
                <div className="max-w-[90rem] mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group relative z-50">
                        <div className={`relative transition-all duration-300 ${scrolled ? 'w-48 h-12' : 'w-56 h-14'}`}>
                            <Image
                                src="/images/logo.png"
                                alt="Union National Tax"
                                fill
                                className="object-contain brightness-0 invert"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-sm font-medium text-white hover:text-gold-500 transition-colors font-heading tracking-wide group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => setNewsletterOpen(true)}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-200 hover:text-gold-500 transition-colors"
                        >
                            <Mail className="w-4 h-4" /> Subscribe
                        </button>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-brand-900 bg-gold-500 hover:bg-gold-600 px-6 py-2.5 rounded-md transition-all shadow-sm hover:shadow-md active:scale-95 font-heading"
                        >
                            Book a Call
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white relative z-50"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-brand-500 z-40 md:hidden transition-all duration-300 flex flex-col items-center justify-center space-y-8 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    {navLinks.map((link, idx) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-3xl font-medium text-white hover:text-gold-500 transition-all duration-300 font-heading transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className={`flex flex-col items-center gap-6 mt-8 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                        <button
                            onClick={() => { setMobileMenuOpen(false); setNewsletterOpen(true); }}
                            className="flex items-center gap-2 text-sm font-bold text-brand-200 uppercase tracking-widest hover:text-gold-500"
                        >
                            <Mail className="w-4 h-4" /> Subscribe
                        </button>
                        <Link
                            href="/contact"
                            className="text-lg font-medium text-brand-900 bg-gold-500 hover:bg-gold-600 px-8 py-3 rounded-md shadow-sm font-heading"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Book a Call
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Newsletter Modal */}
            {newsletterOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-900/80 p-4"
                    onClick={() => setNewsletterOpen(false)}
                >
                    <div
                        className="rounded-md shadow-2xl p-8 relative w-full max-w-md bg-white border border-slate-200 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Removed gold circle decorative element for stricter material feel, kept simple */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none opacity-50"></div>

                        <button
                            onClick={() => setNewsletterOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-brand-900/60 hover:text-brand-900 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {!submitted ? (
                            <>
                                <div className="text-center mb-8 relative z-10">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gold-50 text-gold-600 shadow-sm"
                                    >
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading text-brand-900 mb-2">Join the Inner Circle</h3>
                                    <p className="text-sm text-brand-900 leading-relaxed font-sans px-4">Get the same tax strategies we sell to clients for $5,000+, delivered weekly for free.</p>
                                </div>

                                <form onSubmit={handleNewsletterSubmit} className="space-y-4 relative z-10">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold text-brand-900 uppercase tracking-widest ml-1 font-heading">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="ceo@company.com"
                                            className="w-full px-4 py-3 rounded-xl outline-none text-sm border border-slate-200 bg-slate-50 focus:border-gold-500 focus:bg-white focus:ring-4 focus:ring-gold-500/10 transition-all font-sans"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 rounded-xl text-sm font-bold transition-all bg-brand-900 text-white hover:bg-gold-500 hover:text-brand-900 shadow-lg hover:shadow-gold-500/20 font-heading"
                                    >
                                        Subscribe Free
                                    </button>
                                    <p className="text-[10px] text-brand-900/60 text-center font-sans">100% Signal. 0% Spam. Unsubscribe anytime.</p>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-12 relative z-10">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-50 text-green-600 animate-in zoom-in spin-in-12 duration-500"
                                >
                                    <Check className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold font-heading text-brand-900 mb-2">You're In.</h3>
                                <p className="text-sm text-brand-900 font-sans">Check your inbox for your first strategy.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
