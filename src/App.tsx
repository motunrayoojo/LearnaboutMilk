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

type MilkCategory = 'fat' | 'processing' | 'moisture' | 'additives' | 'sources' | 'nafdac';

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
        icon: Milk
      },
      {
        id: 'two-percent',
        name: 'Reduced-Fat Milk',
        description: 'Some fat removed for a balanced profile.',
        fat: '2%',
        characteristics: 'Retains some creaminess but with fewer calories.',
        details: ['Skimmed butterfat', 'Standard grocery choice', 'Versatile for cooking'],
        icon: Droplet
      },
      {
        id: 'one-percent',
        name: 'Low-Fat Milk',
        description: 'Thinner texture with significantly lower fat.',
        fat: '1%',
        characteristics: 'Noticeably thinner and less flavorful than 2%.',
        details: ['High calorie reduction', 'Healthy heart choice', 'Watery finish'],
        icon: Droplet
      },
      {
        id: 'skim',
        name: 'Skim Milk',
        description: 'Non-fat milk with almost all cream removed.',
        fat: '< 0.5%',
        characteristics: 'Almost all butterfat removed via centrifuge. Very thin.',
        details: ['Lowest calorie count', 'Same protein as whole milk', 'Centrifuge processed'],
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
        icon: Cylinder
      },
      {
        id: 'condensed',
        name: 'Sweetened Condensed',
        description: 'Water removed and sugar added.',
        characteristics: 'Extremely thick, sticky, and very sweet.',
        details: ['Water removed by heat', 'Added sugar acts as preservative', 'Used in baking'],
        icon: Boxes
      },
      {
        id: 'powdered-full',
        name: 'Full Cream Powder',
        description: 'Spray-dried whole milk (97% moisture removed).',
        characteristics: 'Contains all natural milk fat. Rich and nutrient-dense.',
        details: ['12-24 months shelf life', 'High energy', 'Standard whole milk replacement'],
        fat: '≥26%',
        icon: Snowflake
      },
      {
        id: 'powdered-filled',
        name: 'Instant Filled Powder',
        description: 'Skimmed milk + vegetable fat blend.',
        characteristics: 'Butterfat replaced with oils like palm or coconut.',
        details: ['Affordable alternative', 'Easily soluble', 'Widely used in households'],
        fat: '~3.5% total fat',
        icon: Zap
      },
      {
        id: 'powdered-skim',
        name: 'Skimmed Powder',
        description: 'Fat removed, high protein retained.',
        characteristics: 'Ideal for weight management and fitness.',
        details: ['Max 0.5% fat', 'High protein content', 'Baking ingredient'],
        fat: '≤0.5%',
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
        id: 'lactose-free',
        name: 'Lactose-Free',
        description: 'Lactase enzyme pre-digests lactose.',
        characteristics: 'Standard milk with lactase added. Tastes slightly sweeter.',
        details: ['Safe for intolerance', 'Real dairy', 'Glucose & Galactose result'],
        icon: Droplet
      },
      {
        id: 'fortified',
        name: 'Fortified Milk',
        description: 'Extra vitamins or minerals added.',
        characteristics: 'Commonly added Vitamin A, D, or Calcium.',
        details: ['Enhanced nutrition', 'Public health tool', 'Standardized in many regions'],
        icon: PlusCircle
      }
    ]
  },
  sources: {
    title: 'Source Origins',
    subtitle: 'From animals to plant-based alternatives.',
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
      },
      {
        id: 'plant',
        name: 'Plant Alternatives',
        description: 'Non-dairy beverages from nuts and grains.',
        characteristics: 'Soaked and strained plants like Soy, Almond, and Oat.',
        details: ['Lactose-free naturally', 'Diverse flavors', 'Vegan & Eco-friendly'],
        icon: Leaf
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
        description: 'Dominant format due to grid constraints.',
        characteristics: 'Spray-dried fresh whole milk with ~97% moisture removed.',
        details: ['Peak, Dano, Three Crowns', 'Shelf life: 12-24 months', 'Ideal for low power areas'],
        fat: '26% fat',
        nafdacStandard: '≥26% milk fat, moisture ≤5%',
        nutritionalValue: [
          { label: 'Fat', value: '26%' },
          { label: 'Lactose', value: '~38%' },
          { label: 'Protein', value: '~26%' }
        ],
        avgPrice: '₦200 – ₦500 (sachet)',
        brands: 'Peak, Dano, Three Crowns, Cowbell',
        icon: Milk
      },
      {
        id: 'nafdac-full-cream',
        name: 'Full Cream (Liquid)',
        description: 'Full-fat cow milk with nothing removed.',
        characteristics: 'UHT variants are favored for shelf stability without refrigeration.',
        details: ['Hollandia, Arla, Olympic', 'UHT: 3-6 months stability', 'Rich liquid dairy'],
        fat: '≥3.5% fat',
        nafdacStandard: 'fat ≥3.5%, SNF ≥8.5%',
        nutritionalValue: [
          { label: 'Fat', value: '≥3.5%' },
          { label: 'Lactose', value: '~4.7%' },
          { label: 'Protein', value: '~3.3%' }
        ],
        avgPrice: '₦600 – ₦1,200',
        brands: 'Hollandia, Arla, Olympic',
        icon: Droplet
      },
      {
        id: 'nafdac-filled',
        name: 'Filled Milk',
        description: 'Skimmed milk + vegetable fat blend.',
        characteristics: 'Butterfat replaced with oils like palm; widely used in affordable blends.',
        details: ['Must be labeled "Filled Milk"', 'Cheaper production', 'Widely consumed'],
        fat: '~3.5% total fat',
        nafdacStandard: 'Must disclose "filled milk" on label',
        avgPrice: '₦150 – ₦350 (sachet)',
        brands: 'Loya, Miksi, Nunu',
        icon: Snowflake
      },
      {
        id: 'nafdac-evaporated',
        name: 'Evaporated Tin',
        description: 'Concentrated, sterilized, unsweetened.',
        characteristics: 'A Nigerian kitchen staple for tea, oats, and soups.',
        details: ['Peak, Three Crowns', '12-24 months shelf life', 'Rich and creamy'],
        fat: '~7.5% fat',
        nafdacStandard: 'fat ≥7.5%, total solids ≥25%',
        nutritionalValue: [
          { label: 'Fat', value: '~7.5%' },
          { label: 'Lactose', value: '~10%' },
          { label: 'Protein', value: '~6.8%' }
        ],
        avgPrice: '₦800 – ₦1,500 (tin)',
        brands: 'Peak, Three Crowns, Carnation',
        icon: Cylinder
      },
      {
        id: 'nafdac-tiger-nut',
        name: 'Tiger Nut (Kunu aya)',
        description: 'Traditional Nigerian plant beverage.',
        characteristics: 'Naturally lactose-free, rich in iron and fibre.',
        details: ['Locally produced', 'Cultural staple', 'Natural dairy alternative'],
        avgPrice: '₦200 – ₦600 / cup',
        icon: Leaf
      }
    ]
  }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MilkCategory>('fat');
  const [selectedItem, setSelectedItem] = useState<MilkItem | null>(null);

  const categoryConfigs: { id: MilkCategory; label: string; icon: any }[] = [
    { id: 'fat', label: 'Fat Content', icon: Droplet },
    { id: 'processing', label: 'Processing', icon: Thermometer },
    { id: 'moisture', label: 'Moisture', icon: Layers },
    { id: 'additives', label: 'Additives', icon: PlusCircle },
    { id: 'sources', label: 'Sources', icon: Cat },
    { id: 'nafdac', label: 'Nigeria (NAFDAC)', icon: Info },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <header className="relative h-[40vh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 text-white px-6">
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <span className="text-milk-blue font-display tracking-widest uppercase text-xs mb-4 block">Encyclopedia of Dairy</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 italic">Milk Classified</h1>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Understanding the spectrum of dairy through fat content, processing techniques, moisture levels, and origins.
          </p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryConfigs.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedItem(null);
                }}
                className={`flex items-center gap-2 px-6 py-4 rounded-full transition-all duration-300 ${
                  activeCategory === cat.id ? 'tab-active' : 'tab-inactive bg-white border border-slate-100'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 border-l-4 border-milk-blue pl-6"
        >
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">{MILK_DATA[activeCategory].title}</h2>
          <p className="text-slate-500 max-w-2xl">{MILK_DATA[activeCategory].subtitle}</p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {MILK_DATA[activeCategory].items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedItem(item)}
                  className="glass-card p-6 cursor-pointer group hover:border-milk-blue/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-milk-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="text-milk-blue" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-milk-blue transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  {item.fat && (
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      <span>Fat: {item.fat}</span>
                    </div>
                  )}
                  <div className="mt-6 flex items-center text-milk-blue text-xs font-bold group-hover:gap-3 gap-2 transition-all">
                    <span>EXPLORE DETAIL</span>
                    <ChevronRight size={14} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Detail Modal Overlay */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto"
              />
              <motion.div
                layoutId={selectedItem.id}
                className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
              >
                <div className="h-48 bg-milk-blue relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '24px 24px'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <selectedItem.icon className="text-white w-24 h-24 opacity-20" />
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-4xl font-serif font-bold text-slate-800 mb-2">{selectedItem.name}</h2>
                      <p className="text-milk-blue font-medium uppercase tracking-widest text-xs">
                        {categoryConfigs.find(c => c.id === activeCategory)?.label}
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                    >
                      <PlusCircle className="rotate-45" size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-4">
                        <Info size={16} className="text-milk-blue" />
                        Key Characteristics
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {selectedItem.characteristics}
                      </p>

                      {selectedItem.nafdacStandard && (
                        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                          <h5 className="text-emerald-800 text-xs font-bold uppercase mb-2">NAFDAC Regulation</h5>
                          <p className="text-emerald-700 text-xs italic">
                            {selectedItem.nafdacStandard}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-slate-800 font-bold mb-4">
                        <TableIcon size={16} className="text-milk-blue" />
                        Quick Stats
                      </h4>
                      <ul className="space-y-3">
                        {selectedItem.fat && (
                          <li className="flex justify-between text-sm py-1 border-b border-slate-50">
                            <span className="text-slate-400">Fat Level</span>
                            <span className="font-bold text-slate-700">{selectedItem.fat}</span>
                          </li>
                        )}
                        {selectedItem.shelfLife && (
                          <li className="flex justify-between text-sm py-1 border-b border-slate-50">
                            <span className="text-slate-400">Shelf Life</span>
                            <span className="font-bold text-slate-700">{selectedItem.shelfLife}</span>
                          </li>
                        )}
                        {selectedItem.avgPrice && (
                          <li className="flex justify-between text-sm py-1 border-b border-slate-50">
                            <span className="text-slate-400">Est. Price</span>
                            <span className="font-bold text-slate-700">{selectedItem.avgPrice}</span>
                          </li>
                        )}
                        {selectedItem.brands && (
                          <li className="flex flex-col gap-1 text-sm py-1 border-b border-slate-50">
                            <span className="text-slate-400">Major Brands</span>
                            <span className="font-medium text-slate-600">{selectedItem.brands}</span>
                          </li>
                        )}
                      </ul>

                      {selectedItem.nutritionalValue && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {selectedItem.nutritionalValue.map((stat, i) => (
                            <div key={i} className="bg-slate-50 p-2 rounded-lg text-center">
                              <div className="text-[10px] text-slate-400 font-bold uppercase">{stat.label}</div>
                              <div className="text-sm font-display font-bold text-milk-blue">{stat.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h4 className="text-slate-800 font-bold mb-4 text-sm uppercase tracking-wider">Features & Processing</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.details.map((detail, idx) => (
                        <span key={idx} className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-xs font-medium text-slate-600 shadow-sm">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Facts Banner */}
        <section className="mt-24 bg-milk-cream rounded-[2.5rem] p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-serif font-bold text-slate-800 mb-6">Did you know?</h2>
              <p className="text-slate-700 text-lg leading-relaxed mb-8">
                Commercial milk processing like <strong>homogenization</strong> was developed to keep the cream from separating 
                and floating to the top, ensuring every sip has the same consistency and fat content.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/50 p-4 rounded-2xl backdrop-blur-sm border border-white/40">
                  <p className="text-xs font-bold text-slate-400 mb-1 uppercase">Standard Temp</p>
                  <p className="text-xl font-display font-bold text-slate-800">71.7°C</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl backdrop-blur-sm border border-white/40">
                  <p className="text-xs font-bold text-slate-400 mb-1 uppercase">UHT Shelf Life</p>
                  <p className="text-xl font-display font-bold text-slate-800">9 Months</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-xl rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?auto=format&fit=crop&q=80&w=600" 
                  alt="Glass of milk" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-milk-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/20 rounded-full blur-2xl" />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-milk-blue p-2 rounded-lg">
              <Milk className="text-white" size={20} />
            </div>
            <span className="font-serif font-bold text-xl text-slate-800 italic">Milk Classified</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400 tracking-wider">
            <span className="hover:text-milk-blue cursor-pointer transition-colors">THEORY</span>
            <span className="hover:text-milk-blue cursor-pointer transition-colors">NUTRITION</span>
            <span className="hover:text-milk-blue cursor-pointer transition-colors">PROCESSING</span>
          </div>
          <p className="text-xs text-slate-300 font-mono tracking-tighter">
            © 2026 DAIRY EDU. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
