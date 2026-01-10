import Link from "next/link";
import { Linkedin, Facebook, Youtube, Instagram } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-brand-900 border-t border-brand-800">
            <div className="max-w-[80rem] mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">

                    {/* Brand Section */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="relative h-24 w-96">
                            <Image
                                src="/images/logo.png"
                                alt="Union National Tax"
                                fill
                                className="object-contain brightness-0 invert opacity-80"
                            />
                        </Link>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
                        {['Home', 'Services', 'About', 'Team', 'Blog', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="text-sm font-medium text-zinc-400 hover:text-gold-500 transition-colors font-sans"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        {[
                            { icon: Linkedin, href: "https://www.linkedin.com/in/jason-astwood-ea-lutcf-fscp-8337a476/" },
                            { icon: Facebook, href: "https://www.facebook.com/UnionNationalTax" },
                            { icon: Youtube, href: "https://www.youtube.com/@JasonAstwood" },
                            { icon: Instagram, href: "https://www.instagram.com/unionnationaltax/?hl=en" }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                className="w-8 h-8 rounded-md bg-brand-800 border border-brand-700 flex items-center justify-center text-zinc-400 hover:bg-gold-500 hover:text-brand-900 hover:border-gold-500 transition-all shadow-sm hover:shadow-md"
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} Union National Tax. All Rights Reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
