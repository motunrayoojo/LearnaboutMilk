/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplet, 
  Thermometer, 
  Layers, 
  PlusCircle, 
  Cat, 
  Leaf, 
  Info, 
  Table as TableIcon,
  ChevronRight,
  Flame,
  Zap,
  Snowflake,
  Cylinder,
  Milk,
  Boxes
} from 'lucide-react';

type MilkCategory = 'fat' | 'processing' | 'moisture' | 'additives' | 'sources' | 'nafdac' | 'alternatives';

interface MilkItem {
  id: string;
  name: string;
  description: string;
  details: string[];
  fat?: string;
  characteristics: string;
  safety?: string;
  processing?: string;
  shelfLife?: string;
  image?: string;
  icon: any;
  // NAFDAC specific fields
  nafdacStandard?: string;
  nutritionalValue?: {
    label: string;
    value: string;
  }[];
  avgPrice?: string;
  brands?: string;
}

const MILK_DATA: Record<MilkCategory, { title: string; subtitle: string; items: MilkItem[] }> = {
  fat: {
    title: 'Fat Content',
    subtitle: 'The most common way milk is categorized on store shelves.',
    items: [
      {
        id: 'whole',
        name: 'Whole Milk',
        description: 'Full cream milk directly from the source.',
        fat: '3.25% - 3.5%',
        characteristics: 'The richest, creamiest, and most calorie-dense option.',
        details: ['Natural proportion of fat', 'High Vitamin D naturally', 'Richest texture'],
        shelfLife: 'Fresh: 5-7 days | UHT: 3-6 months',
        icon: Milk
      },
      {
        id: 'two-percent',
        name: 'Reduced-Fat Milk',
        description: 'Some fat removed for a balanced profile.',
        fat: '2%',
        characteristics: 'Retains some creaminess but with fewer calories.',
        details: ['Skimmed butterfat', 'Standard grocery choice', 'Versatile for cooking'],
        shelfLife: 'Fresh: 1-2 weeks',
        icon: Droplet
      },
      {
        id: 'one-percent',
        name: 'Low-Fat Milk',
        description: 'Thinner texture with significantly lower fat.',
        fat: '1%',
        characteristics: 'Noticeably thinner and less flavorful than 2%.',
        details: ['High calorie reduction', 'Healthy heart choice', 'Watery finish'],
        shelfLife: 'Fresh: 1-2 weeks',
        icon: Droplet
      },
      {
        id: 'skim',
        name: 'Skim Milk',
        description: 'Non-fat milk with almost all cream removed.',
        fat: '< 0.5%',
        characteristics: 'Almost all butterfat removed via centrifuge. Very thin.',
        details: ['Lowest calorie count', 'Same protein as whole milk', 'Centrifuge processed'],
        shelfLife: 'Fresh: 1-2 weeks | Powder: 24 months',
        icon: Droplet
      }
    ]
  },
  processing: {
    title: 'Processing Method',
    subtitle: 'Methods to ensure safety and extend shelf life.',
    items: [
      {
        id: 'raw',
        name: 'Raw Milk',
        description: 'Unpasteurized and unhomogenized.',
        characteristics: 'Retains all natural enzymes and bacteria.',
        details: ['Highly controversial', 'Risk of E. coli & Salmonella', 'Often illegal to sell'],
        safety: 'High risk pathogens',
        icon: Snowflake
      },
      {
        id: 'pasteurized',
        name: 'Pasteurized Milk',
        description: 'Standard fresh milk.',
        characteristics: 'Heated to 71.7°C (161°F) for 15 seconds.',
        details: ['Kills harmful bacteria', 'Must be refrigerated', 'Lasts 1-2 weeks'],
        shelfLife: '1-2 weeks refrigerated',
        icon: Thermometer
      },
      {
        id: 'uht',
        name: 'UHT Milk',
        description: 'Ultra-High Temperature or Long-Life milk.',
        characteristics: 'Heated to 135°C (275°F) for 1-2 seconds.',
        details: ['Aseptic packaging', 'Lasts 6-9 months unopened', 'No refrigeration needed initially'],
        shelfLife: '6-9 months shelf-stable',
        icon: Flame
      },
      {
        id: 'homogenized',
        name: 'Homogenized',
        description: 'Processing to prevent cream separation.',
        characteristics: 'Milk forced through tiny holes at high pressure.',
        details: ['Breaks fat molecules', 'Uniform consistency', 'Most commercial milk uses this'],
        icon: Zap
      }
    ]
  },
  moisture: {
    title: 'Moisture Content',
    subtitle: 'Concentrated milks with reduced water for longevity.',
    items: [
      {
        id: 'evaporated',
        name: 'Evaporated Milk',
        description: 'Canned milk with 60% water removed.',
        characteristics: 'Slightly thick with a toasted/caramelized flavor.',
        details: ['Heated under vacuum', 'No sugar added', 'Shelf-stable'],
        shelfLife: '12-24 months (unopened)',
        avgPrice: '₦800 – ₦1,500 (410g tin)',
        brands: 'Peak, Three Crowns, Carnation',
        nafdacStandard: 'Milk fat ≥7.5%, total solids ≥25%',
        nutritionalValue: [
           { label: 'Fat', value: '~7.5%' },
           { label: 'Lactose', value: '~10%' },
           { label: 'Protein', value: '~6.8%' }
        ],
        icon: Cylinder
      },
      {
        id: 'condensed',
        name: 'Sweetened Condensed',
        description: 'Water removed and sugar added.',
        characteristics: 'Extremely thick, sticky, and very sweet.',
        details: ['Water removed by heat', 'Added sugar acts as preservative', 'Used in baking'],
        shelfLife: 'Up to 2 years (unopened)',
        avgPrice: '₦1,000 – ₦1,800 (397g tin)',
        brands: 'Hollandia, Three Crowns, Ideal',
        nafdacStandard: 'Must declare "sweetened condensed milk"',
        nutritionalValue: [
           { label: 'Sugar', value: '~55%' },
           { label: 'Fat', value: '~8%' },
           { label: 'Protein', value: '~8%' }
        ],
        icon: Boxes
      },
      {
        id: 'powdered-full',
        name: 'Full Cream Powder',
        description: 'Spray-dried whole milk (97% moisture removed).',
        characteristics: 'Contains all natural milk fat. Rich and nutrient-dense.',
        details: ['12-24 months shelf life', 'High energy', 'Standard whole milk replacement'],
        fat: '≥26%',
        shelfLife: '12-24 months',
        avgPrice: '₦2,500 – ₦4,200 (400g tin)',
        brands: 'Peak, Dano, Cowbell',
        nafdacStandard: '≥26% milk fat, moisture ≤5%',
        nutritionalValue: [
           { label: 'Fat', value: '26%' },
           { label: 'Lactose', value: '~38%' },
           { label: 'Protein', value: '~26%' }
        ],
        icon: Snowflake
      },
      {
        id: 'powdered-filled',
        name: 'Instant Filled Powder',
        description: 'Skimmed milk + vegetable fat blend.',
        characteristics: 'Butterfat replaced with oils like palm or coconut.',
        details: ['Affordable alternative', 'Easily soluble', 'Widely used in households'],
        fat: '~3.5% total fat',
        shelfLife: '12-18 months',
        avgPrice: '₦150 – ₦350 (sachet)',
        brands: 'Loya, Miksi, Nunu',
        nafdacStandard: 'Must disclose "filled milk" on label',
        nutritionalValue: [
           { label: 'Total Fat', value: '26%' },
           { label: 'Sat Fat', value: '~65% of fat' },
           { label: 'Protein', value: '~26%' }
        ],
        icon: Zap
      },
      {
        id: 'powdered-skim',
        name: 'Skimmed Powder',
        description: 'Fat removed, high protein retained.',
        characteristics: 'Ideal for weight management and fitness.',
        details: ['Max 0.5% fat', 'High protein content', 'Baking ingredient'],
        fat: '≤0.5%',
        shelfLife: '24 months',
        avgPrice: '₦2,000 – ₦4,200 (400g)',
        brands: 'Instant Slim, Anchor Skimmed',
        nafdacStandard: 'fat ≤0.5%, SNF ≥9%',
        icon: Droplet
      }
    ]
  },
  additives: {
    title: 'Additives & Alterations',
    subtitle: 'Milk modified for taste or dietary needs.',
    items: [
      {
        id: 'flavored',
        name: 'Flavored Milk',
        description: 'Added sugar and flavorings.',
        characteristics: 'Usually low-fat or whole with chocolate or strawberry.',
        details: ['High sugar content', 'Includes stabilizers', 'Popular with children'],
        icon: PlusCircle
      },
      {
        id: 'fortified',
        name: 'Fortified Milk',
        description: 'Extra vitamins or minerals added.',
        characteristics: 'Commonly added Vitamin A, D, or Calcium.',
        details: ['Enhanced nutrition', 'Public health tool', 'Standardized in many regions'],
        icon: PlusCircle
      },
      {
        id: 'lactose-free',
        name: 'Lactose-Free Dairy',
        description: 'Lactase enzyme pre-digests lactose in cow milk.',
        characteristics: 'Standard milk with lactase added. Tastes slightly sweeter.',
        details: ['Safe for intolerance', 'Real dairy', 'Glucose & Galactose result'],
        avgPrice: '₦1,800 – ₦3,500 / 1L',
        brands: 'Arla, Peak Lactose-Free, Hollandia',
        icon: Droplet
      }
    ]
  },
  sources: {
    title: 'Source Origins',
    subtitle: 'From animals providing specific nutrient profiles.',
    items: [
      {
        id: 'cow',
        name: "Cow's Milk",
        description: 'The global standard for dairy.',
        characteristics: 'Balanced nutrient profile and neutral taste.',
        details: ['Most processed commodity', 'Standardized fat levels', 'Primary dairy source'],
        icon: Milk
      },
      {
        id: 'goat',
        name: 'Goat Milk',
        description: 'Popular alternative to cow milk.',
        characteristics: 'Stronger flavor, smaller fat globules.',
        details: ['Easier to digest for some', 'Different protein structure', 'Distinctive tangy taste'],
        icon: Cat
      },
      {
        id: 'sheep',
        name: 'Sheep Milk',
        description: 'Very rich and creamy animal milk.',
        characteristics: 'Similar to goat milk but even more nutrient-dense.',
        details: ['High solid content', 'Great for cheese-making', 'Premium alternative'],
        icon: Cat
      },
      {
        id: 'buffalo',
        name: 'Buffalo Milk',
        description: 'Traditional source for Mozzarella.',
        characteristics: 'Extremely high in fat and protein.',
        details: ['Richest animal milk', 'Traditional in South Asia', 'Authentic Mozzarella base'],
        icon: Milk
      },
      {
        id: 'camel',
        name: 'Camel Milk',
        description: 'High fat milk from desert regions.',
        characteristics: 'Stable in hot climates, unique mineral content.',
        details: ['Medicinal reputation', 'High Vitamin C', 'Common in Asia & Africa'],
        icon: Milk
      }
    ]
  },
  nafdac: {
    title: 'NAFDAC Standards (Nigeria)',
    subtitle: 'Dairy regulation and classifications in the Nigerian market.',
    items: [
      {
        id: 'nafdac-powdered',
        name: 'Powdered Whole Milk',
        description: 'The primary dairy format in Nigeria, strictly regulated for fat and moisture preservation in hot climates.',
        details: [],
        characteristics: '',
        nafdacStandard: 'NIS 38:2018 (Standard for Milk Powder and Cream Powder): Full Cream Milk Powder shall contain not less than 26.0% and not more than 40.0% milk fat by weight. The moisture content shall not exceed 5.0%. It must be fortified with Vitamin A (min 2000 IU / 100g). Microbiological limits: Salmonella (Absent in 25g), E. coli (< 10 cfu/g). Registration by NAFDAC is mandatory; the product name must be conspicuously displayed as "Full Cream Milk Powder".',
        icon: Milk
      },
      {
        id: 'nafdac-full-cream',
        name: 'Full Cream (Liquid)',
        description: 'Standardized liquid bovine milk, requiring strict aseptic packaging or cold chain compliance as per NAFDAC guidelines.',
        details: [],
        characteristics: '',
        nafdacStandard: 'NIS 37:2018 (Standard for Fluid Milk): Liquid Full Cream Milk shall contain no less than 3.5% milk fat and not less than 8.5% milk solids-not-fat. If UHT or Pasteurised, it must be clearly stated on the label. Mandatory fortification of Vitamin A is required in Nigeria for retail fluid milk. Label must include NAFDAC Registration Number, Batch Number, and "Best Before" date.',
        icon: Droplet
      },
      {
        id: 'nafdac-filled',
        name: 'Filled Milk',
        description: 'An economically optimized blend where butterfat is replaced by vegetable oil, requiring explicit labelling to prevent consumer deception.',
        details: [],
        characteristics: '',
        nafdacStandard: 'Total fat content: ≥3.2% (liquid filled milk) or ≥26% (powdered form) · The vegetable fat used must be food-grade, non-hydrogenated (to avoid industrial trans fats), and from approved sources (palm oil, palm kernel, coconut) · Protein: ≥2.9% (liquid) · Vitamins A and D must be added at NAFDAC-approved fortification levels to compensate for their absence in vegetable fat · Product must be clearly labelled "Filled Milk" or "Recombined Filled Milk" — selling it as whole milk or full cream milk is a regulatory violation · NAFDAC registration number is mandatory on all packaging',
        icon: Snowflake
      },
      {
        id: 'nafdac-evaporated',
        name: 'Evaporated Tin',
        description: 'A highly concentrated dairy staple subject to minimum total solids and fat requirements for consumer protection.',
        details: [],
        characteristics: '',
        nafdacStandard: 'NIS 33:2018 (Standard for Evaporated Milk): Evaporated Milk shall contain not less than 7.5% milk fat and not less than 25% total milk solids. The product must be concentrated and sterilized by heat in a sealed container to ensure commercial sterility. Only specified food additives (stabilizers) permitted by NAFDAC are allowed. Mandatory fortification with Vitamin A is required.',
        icon: Cylinder
      },
      {
        id: 'nafdac-condensed',
        name: 'Condensed Milk',
        description: 'Concentrated milk with added sugar, requiring strict disclosure of sweeteners and milk solids.',
        details: [],
        characteristics: '',
        nafdacStandard: 'Milk and Milk Products Regulations 2021: Sweetened Condensed Milk shall be obtained from partial removal of water from milk with addition of sugar; it shall contain not less than 8.0% fat and not less than 28.0% total milk solids. For Condensed Skimmed Milk, fat shall not exceed 0.5% and total milk solids shall be at least 24%. It must be conspicuously labelled as "Sweetened Condensed Milk" and the NAFDAC number is mandatory.',
        icon: Boxes
      }
    ]
  },
  alternatives: {
    title: 'Non-Dairy Alternatives',
    subtitle: 'Plant-based beverages and dietary workarounds.',
    items: [
      {
        id: 'soy',
        name: 'Soy Milk',
        description: 'Made from soaked and ground soybeans.',
        characteristics: 'Closest protein profile to dairy milk.',
        details: ['Complete protein', 'Contains isoflavones', 'Versatile texture'],
        avgPrice: '₦800 – ₦1,800 / 500ml',
        brands: 'Vitasoy, Hollandia Soy, SoyGood',
        icon: Leaf
      },
      {
        id: 'oat',
        name: 'Oat Milk',
        description: 'Liquid from soaked oats and water.',
        characteristics: 'Creamy texture, slightly sweet grain flavor.',
        details: ['High carbohydrates', 'Oat-fibre content', 'Great for coffee'],
        avgPrice: '₦1,500 – ₦3,000 / 500ml',
        brands: 'Oatly, Alpro, Minor Figures',
        icon: Leaf
      },
      {
        id: 'coconut',
        name: 'Coconut Milk',
        description: 'Extracted from the grated pulp of mature coconuts.',
        characteristics: 'Rich and creamy with high saturated fat.',
        details: ['Traditional in cooking', 'Specific fat profile', 'Distinct aroma'],
        avgPrice: '₦600 – ₦1,400 / 400ml tin',
        brands: 'Aroy-D, Grace, Chaokoh',
        icon: Leaf
      },
      {
        id: 'almond',
        name: 'Almond Milk',
        description: 'Ground almonds and water.',
        characteristics: 'Low calorie, nutty flavor, thin consistency.',
        details: ['Vitamin E source', 'Low protein', 'Light profile'],
        avgPrice: '₦2,000 – ₦4,500 / 500ml',
        brands: 'Almond Breeze, Silk, Alpro',
        icon: Leaf
      },
      {
        id: 'tiger-nut',
        name: 'Tiger Nut (Kunu aya)',
        description: 'Traditional Nigerian plant beverage.',
        characteristics: 'Naturally lactose-free, rich in iron and fibre.',
        details: ['Locally produced', 'Cultural staple', 'Natural dairy alternative'],
        avgPrice: '₦200 – ₦600 / cup',
        brands: 'Local Artisans, TigerVit',
        icon: Leaf
      }
    ]
  }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MilkCategory>('fat');
  const [selectedItem, setSelectedItem] = useState<MilkItem | null>(null);

  const categoryConfigs: { id: MilkCategory; label: string; icon: any }[] = [
    { id: 'fat', label: 'Fat Level', icon: Droplet },
    { id: 'processing', label: 'Processing', icon: Thermometer },
    { id: 'moisture', label: 'Moisture', icon: Layers },
    { id: 'additives', label: 'Additives', icon: PlusCircle },
    { id: 'sources', label: 'Origins', icon: Cat },
    { id: 'alternatives', label: 'Alternatives', icon: Leaf },
    { id: 'nafdac', label: 'NAFDAC', icon: Info },
  ];

  return (
    <div className="min-h-screen grid-bg">
      {/* Top Bar */}
      <nav className="border-b border-line bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-ink rotate-45 flex items-center justify-center">
              <Milk size={12} className="text-paper -rotate-45" />
            </div>
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Dairy.Lab</span>
          </div>
          <div className="hidden md:flex gap-8">
            <button 
              onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
              className="mono text-slate-400 hover:text-ink transition-colors cursor-pointer"
            >
              Manifesto
            </button>
            <button 
              onClick={() => document.getElementById('analysis')?.scrollIntoView({ behavior: 'smooth' })}
              className="mono text-slate-400 hover:text-ink transition-colors cursor-pointer"
            >
              Analysis
            </button>
            <button 
              onClick={() => {
                setActiveCategory('processing');
                document.getElementById('analysis')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mono text-slate-400 hover:text-ink transition-colors cursor-pointer"
            >
              Safety
            </button>
          </div>
        </div>
      </nav>

      {/* Hero / Intro Section */}
      <header id="manifesto" className="max-w-7xl mx-auto px-6 pt-24 pb-32 border-x border-line bg-white">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mono text-accent mb-6 block font-bold">The Complete Guide</span>
            <h1 className="text-6xl md:text-8xl leading-[0.9] mb-12 tracking-tight">
              Learn about milk <br />
              <span className="text-slate-300 italic">and stop panicking</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  Milk is one of the most misunderstood staples in our pantry. From complex processing to modern dietary 
                  adaptations, understanding what you're drinking is the first step to clarity.
                </p>
                <div className="h-px w-24 bg-accent/30" />
                <p className="text-slate-500 leading-relaxed font-light">
                  Whether you are navigating NAFDAC regulations, exploring plant-based alternatives, or analyzing fat 
                  matrices, this encyclopedia provides the technical foundation you need to choose with confidence.
                </p>
              </div>
              <div className="p-8 border border-line bg-slate-50/50 italic text-slate-500 font-serif leading-relaxed text-sm">
                "Information is the best antidote to uncertainty. By breaking down milk into its core classifications, 
                we transform a biological complexity into accessible technical knowledge."
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Classification Tool */}
      <section id="analysis" className="border-y border-line bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[80vh]">
          {/* Sidebar Nav */}
          <div className="w-full md:w-72 border-r border-line p-8 flex flex-col gap-2 bg-slate-50/30">
            <span className="mono text-slate-400 mb-6 font-bold">Classifications</span>
            {categoryConfigs.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedItem(null);
                  }}
                  className={`flex items-center justify-between px-4 py-3 text-sm transition-all group ${
                    activeCategory === cat.id 
                      ? 'bg-ink text-paper font-medium' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={activeCategory === cat.id ? 'text-accent' : 'text-slate-300 group-hover:text-slate-400'} />
                    <span>{cat.label}</span>
                  </div>
                  {activeCategory === cat.id && <ChevronRight size={14} className="text-accent" />}
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 md:p-16 border-x border-line">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-16"
            >
              <h2 className="text-5xl md:text-6xl mb-4 leading-tight">{MILK_DATA[activeCategory].title}</h2>
              <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em]">{MILK_DATA[activeCategory].subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AnimatePresence mode="wait">
                {MILK_DATA[activeCategory].items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      layoutId={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedItem(item)}
                      className="group relative border border-line p-8 hover:border-ink cursor-pointer bg-white transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                        <Icon size={40} className="text-ink" />
                      </div>
                      <div className="mono text-accent mb-4 font-bold flex items-center justify-between">
                         ID: {item.id.toUpperCase()}
                         <span className="w-2 h-2 rounded-full bg-line group-hover:bg-accent transition-colors" />
                      </div>
                      <h3 className="text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-500">{item.name}</h3>
                      <p className="text-slate-500 font-light mb-8 leading-relaxed line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between border-t border-line pt-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-slate-400 uppercase">
                            {item.fat && <span>{item.fat} FAT</span>}
                            {item.shelfLife && <span className="text-accent/60">STABLE</span>}
                          </div>
                          {item.avgPrice && (
                            <span className="text-[10px] font-mono font-bold text-accent">{item.avgPrice}</span>
                          )}
                        </div>
                        <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-all">
                          <PlusCircle size={14} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-white w-full max-w-xl h-full shadow-2xl overflow-y-auto px-12 py-20 border-l border-line"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-8 right-8 text-slate-400 hover:text-ink"
              >
                <PlusCircle className="rotate-45" size={32} />
              </button>

              <div className="mb-20">
                <span className="mono text-accent mb-4 block font-bold">
                  {activeCategory === 'nafdac' ? 'Regulatory Compliance' : 'Subject Analysis'}
                </span>
                <h2 className="text-6xl mb-6">{selectedItem.name}</h2>
                <p className="text-xl text-slate-500 font-light leading-relaxed italic border-l-2 border-accent/20 pl-6">
                  {selectedItem.description}
                </p>
              </div>

                <div className="space-y-12">
                {activeCategory !== 'nafdac' && (
                  <div className="grid grid-cols-2 gap-px bg-line border border-line">
                    <div className="bg-slate-50 p-6">
                        <span className="mono text-slate-400 block mb-2 text-[10px] uppercase font-bold tracking-wider">Storage Stability</span>
                        <span className="text-lg font-serif italic text-slate-700">{selectedItem.shelfLife || 'Check Packaging'}</span>
                    </div>
                    <div className="bg-slate-50 p-6">
                        <span className="mono text-slate-400 block mb-2 text-[10px] uppercase font-bold tracking-wider">Fat Matrix</span>
                        <span className="text-lg font-serif italic text-slate-700">{selectedItem.fat || 'Variable'}</span>
                    </div>
                    <div className="bg-slate-50 p-6 col-span-2 border-t border-line">
                        <span className="mono text-slate-400 block mb-2 text-[10px] uppercase font-bold tracking-wider">Market Valuation (est.)</span>
                        <span className="text-lg font-mono text-accent">{selectedItem.avgPrice || 'Premium/Variable'}</span>
                    </div>
                  </div>
                )}

                {activeCategory !== 'nafdac' && selectedItem.characteristics && (
                  <div className="space-y-6">
                    <h4 className="mono text-slate-400 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                      <Info size={12} className="text-accent" /> Characteristics & Bio-Logic
                    </h4>
                    <p className="text-slate-600 leading-relaxed font-light">
                      {selectedItem.characteristics}
                    </p>
                  </div>
                )}

                {activeCategory !== 'nafdac' && (
                  <div className="space-y-6">
                    <h4 className="mono text-slate-400 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                      <TableIcon size={12} className="text-accent" /> Technical Specs
                    </h4>
                    {selectedItem.nutritionalValue && (
                      <div className="grid grid-cols-3 gap-px bg-line border border-line mb-4">
                        {selectedItem.nutritionalValue.map((nv, i) => (
                          <div key={i} className="bg-slate-50 p-4 text-center">
                            <span className="mono text-[9px] text-slate-400 block mb-1 uppercase font-bold">{nv.label}</span>
                            <span className="text-sm font-bold text-accent">{nv.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="grid grid-cols-1 gap-2">
                      {selectedItem.brands && (
                        <div className="p-4 border border-line bg-slate-50/30 flex flex-col gap-1">
                          <span className="mono text-[9px] text-slate-400 uppercase font-bold">Leading Manufacturers</span>
                          <span className="text-sm text-slate-700 font-medium">{selectedItem.brands}</span>
                        </div>
                      )}
                      {selectedItem.details.length > 0 && selectedItem.details.map((d, i) => (
                        <div key={i} className="p-4 border border-line flex items-center justify-between text-sm group hover:bg-slate-50 transition-colors">
                          <span className="text-slate-500">{d}</span>
                          <ChevronRight size={10} className="text-slate-300 group-hover:text-accent" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.nafdacStandard && (
                  <div className="p-8 bg-ink text-paper border-l-4 border-accent">
                    <span className="mono text-accent block mb-4 text-[10px] uppercase font-bold tracking-widest">Nigeria Regulatory (NAFDAC)</span>
                    <p className="text-sm border-l border-accent/30 pl-4 py-2 font-light italic text-slate-300">
                      {selectedItem.nafdacStandard}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-line bg-white py-24 px-6 text-center">
         <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl italic">Knowledge is clarity.</h2>
            <p className="text-slate-400 font-light leading-relaxed">
              From traditional sources to modern plant-based innovations, dairy and its alternatives represent an 
              incredible journey of nutritional adaptation. This encyclopedia is here to help you navigate it all.
            </p>
            <div className="flex justify-center gap-12 pt-8">
               <div className="text-left">
                  <span className="mono text-slate-300 block mb-2">Standard</span>
                  <span className="text-sm font-serif">ISO 22000</span>
               </div>
               <div className="text-left">
                  <span className="mono text-slate-300 block mb-2">Ethics</span>
                  <span className="text-sm font-serif">Animal Welfare</span>
               </div>
               <div className="text-left">
                  <span className="mono text-slate-300 block mb-2">Science</span>
                  <span className="text-sm font-serif">Food Tech</span>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
