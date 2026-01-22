# **Union National Tax: "Digital Vault" Design System**

**Version:** 1.0.0

**Theme:** Modern Wealth

**Tech Stack:** React / Next.js / Tailwind CSS

## **1\. Brand Philosophy**

**"The Digital Vault"**

We reject the ephemeral "startup" look (glassmorphism, gradients, blur). We embrace the "Institution" look (Solid, Opaque, Tactile).

* **Solid over Translucent:** Information sits on solid white paper, not floating glass.  
* **Hierarchy over Decoration:** Use shadow and border to define space.  
* **Gold is Value:** The user's eye follows the Gold color to find value (actions).

## **2\. Color System (Tailwind)**

### **The Foundation (Surfaces)**

|

| **Token** | **Hex** | **Tailwind Class** | **Usage** |

| **Midnight Forest** | \#0D2E2B | bg-brand-500 | Hero sections, Primary Headers (The Anchor). |

| **Deepest Green** | \#020908 | bg-brand-900 | Footer, Sidebar (The Foundation). |

| **Paper White** | \#FFFFFF | bg-white | Cards, Panels, Modals. |

| **App Surface** | \#F8F9FA | bg-slate-50 | The background behind the cards. |

### **The Action (Interactions)**

| **Token** | **Hex** | **Tailwind Class** | **Usage** |

| **Champagne Gold** | \#D4AF37 | bg-gold-500 | **Primary Actions** (File Now, Sign In). |

| **Gold Text** | \#AA8C2C | text-gold-600 | Text links, Icons, Secondary emphasis. |

### **Status Colors**

* **Error:** \#D32F2F (Material Red 700\) – Audit warnings, missing fields.  
* **Success:** \#2E7D32 (Material Green 800\) – Filed successfully, refund accepted.  
* **Warning:** \#ED6C02 (Material Orange 700\) – Action required.

## **3\. Typography System**

**Pairing:** Outfit (Headings) \+ Inter (Body)

### **Usage Rules**

1. **H1 Display:** Always use tracking-tighter with Outfit. It creates a custom logotype feel.  
2. **Eyebrows:** Small labels above headers must be Uppercase, Bold, and tracking-widest.  
3. **Data:** Always use tabular-nums for prices and tax figures.

### **Type Scale**

| **Element** | **Font** | **Size** | **Weight** | **Tracking** | **Usage** |

| **H1** | Outfit | text-5xl | Bold (700) | \-0.03em | Landing Page Hero |

| **H2** | Outfit | text-3xl | SemiBold (600) | \-0.015em | Section Headers |

| **H3** | Outfit | text-xl | Medium (500) | 0 | Card Titles |

| **Body** | Inter | text-base | Regular (400) | 0 | Standard Reading |

| **Label** | Inter | text-xs | Bold (700) | 0.15em | "Eyebrow" Labels |

| **Data** | Inter | text-sm | Medium (500) | 0 | Pricing tables |

## **4\. Components (Material/Tactile)**

### **A. The "Vault" Card**

A solid white surface with a distinct, subtle border. No blur.

\<\!-- Tailwind Class Structure \--\>  
\<div class="bg-white border border-slate-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"\>  
  \<\!-- Content \--\>  
\</div\>

### **B. The "Gold Standard" Button**

Flat, high contrast, tactile.

\<\!-- Primary Action \--\>  
\<button class="bg-gold-500 text-brand-900 hover:bg-gold-600 font-medium py-3 px-6 rounded-md shadow-sm active:scale-95 transition-all"\>  
  Get Started  
\</button\>

\<\!-- Secondary Action (Outline) \--\>  
\<button class="bg-transparent border-2 border-brand-500 text-brand-500 hover:bg-brand-50 font-medium py-3 px-6 rounded-md transition-colors"\>  
  Learn More  
\</button\>

### **C. The "Secure" Input**

Classic Material outlined style.

\<div class="flex flex-col gap-1"\>  
  \<label class="text-xs font-bold text-slate-500 uppercase tracking-widest"\>  
    Social Security Number  
  \</label\>  
  \<input type="text"   
    class="w-full border border-slate-300 rounded bg-white px-4 py-3 text-brand-900   
           focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"  
    placeholder="000-00-0000" /\>  
\</div\>

## **5\. Tailwind Configuration**

Copy this directly into your tailwind.config.ts.

theme: {  
  extend: {  
    colors: {  
      brand: {  
        50: '\#E0E9E8',  
        500: '\#0D2E2B', // Midnight Forest  
        900: '\#020908', // Deepest Green  
      },  
      gold: {  
        500: '\#D4AF37', // Champagne Gold  
        600: '\#AA8C2C', // Darker Gold for text  
      },  
    },  
    fontFamily: {  
      heading: \['var(--font-outfit)', 'sans-serif'\],  
      sans: \['var(--font-inter)', 'sans-serif'\],  
    },  
    letterSpacing: {  
      tighter: '-0.03em',  
      widest: '0.15em',  
    },  
    boxShadow: {  
      'soft': '0 4px 6px \-1px rgba(13, 46, 43, 0.05)',  
    }  
  }  
}

## **6\. Implementation Checklist**

* ![][image1]**Install Fonts:** Add Outfit and Inter via next/font.  
* ![][image1]**Configure Tailwind:** Update the tailwind.config.ts with the tokens above.  
* ![][image1]**Base Styles:** Set body { @apply bg-slate-50 text-slate-800; } in your global CSS.  
* ![][image1]**Build Primitives:** Create \<Button /\>, \<Card /\>, and \<Input /\> components first.

## **7\. What's Next?**

1. **Build the "Hero" Section:** Use the H1 styling and Primary Button on a Midnight Forest background.  
2. **Create the Navigation:** A solid Brand-500 bar with Gold-500 highlights for the active page.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAX8AAAAgCAYAAAD663jxAAAARklEQVR4Xu3BgQAAAADDoPlTH+ECVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwDe/oAABLYMf5wAAAABJRU5ErkJggg==>