import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/18smell';

const categoriesData = [
  {
    name: 'Eau de Parfum',
    description: 'Highly concentrated luxury fragrance crafted for all-day elegance and signature longevity.',
    status: 'active',
  },
  {
    name: 'Parfum Extrait',
    description: 'The highest concentration of rare botanical oils and aged resins for ultimate sensory richness.',
    status: 'active',
  },
  {
    name: 'Cologne Absolute',
    description: 'Vibrant, refreshing olfactory compositions infused with Mediterranean citrus and crisp spices.',
    status: 'active',
  },
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully!');

    // 1. Seed Categories
    console.log('Seeding Categories...');
    const categoryMap: { [key: string]: mongoose.Types.ObjectId } = {};

    for (const catData of categoriesData) {
      let cat = await Category.findOne({ name: catData.name });
      if (!cat) {
        cat = await Category.create(catData);
        console.log(`Created category: ${cat.name}`);
      } else {
        console.log(`Category exists: ${cat.name}`);
      }
      categoryMap[cat.name] = cat._id as mongoose.Types.ObjectId;
    }

    // Default category fallback
    const defaultCategoryId = categoryMap['Eau de Parfum'] || Object.values(categoryMap)[0];
    const extraitCategoryId = categoryMap['Parfum Extrait'] || defaultCategoryId;
    const cologneCategoryId = categoryMap['Cologne Absolute'] || defaultCategoryId;

    // 2. Define 6 Detailed Dummy Products
    const productsData = [
      {
        name: 'N° 18 Noir Intense',
        brand: '18Smell Atelier',
        category: defaultCategoryId,
        smellType: 'WOODY',
        description: 'An intoxicating blend of smoked agarwood, dark amber, and rare black velvet cedar.',
        about: 'Crafted for evening elegance, Noir Intense opens with top notes of saffron and cardamom, leading into a deep heart of Bulgarian rose and aged oud, grounded by leather and earthy vetiver.',
        price: 14500,
        stock: 25,
        volume: 100,
        imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Velvet Rose & Oud',
        brand: '18Smell Atelier',
        category: extraitCategoryId,
        smellType: 'FLORAL',
        description: 'Damask rose wrapped in smoky oud wood, touched with clove and delicious praline.',
        about: 'An opulent floral composition that captures the duality of soft rose petals and dark, resinous oriental woods. Features top notes of clove, a heart of Damask rose, and a base of dark agarwood.',
        price: 16200,
        stock: 18,
        volume: 100,
        imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Solar Bergamot & Neroli',
        brand: '18Smell Atelier',
        category: cologneCategoryId,
        smellType: 'CITRUSY',
        description: 'Sun-drenched Italian bergamot infused with crisp orange blossom, bitter orange, and sea salt.',
        about: 'Radiating warmth and vibrant Mediterranean elegance, this fresh citrus fragrance evokes sunlit coastal citrus groves. Top notes of Calabrian bergamot give way to white neroli and clean amber.',
        price: 11800,
        stock: 30,
        volume: 100,
        imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Imperial Amber & Saffron',
        brand: '18Smell Atelier',
        category: extraitCategoryId,
        smellType: 'SPICE',
        description: 'Golden saffron filaments dusted over creamy Madagascar vanilla, warm amber, and pink pepper.',
        about: 'A regal spice-infused fragrance that envelops the wearer in an aura of warmth, sophistication, and timeless luxury. Features intense opening saffron, spicy cinnamon bark, and rich amber resins.',
        price: 18500,
        stock: 15,
        volume: 100,
        imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Santals de Mysore',
        brand: '18Smell Atelier',
        category: defaultCategoryId,
        smellType: 'WOODY',
        description: 'Pure Mysore sandalwood harmonized with Australian eucalyptus, white musk, and iris root.',
        about: 'Smooth, creamy, and deeply grounding. A meditative woody masterpiece engineered for modern distinction. Opens with subtle cardamom, evolving into velvety sandalwood and dry papyrus.',
        price: 13900,
        stock: 20,
        volume: 100,
        imageUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Citrus Vetiver Elixir',
        brand: '18Smell Atelier',
        category: cologneCategoryId,
        smellType: 'CITRUSY',
        description: 'Sparkling grapefruit and bergamot paired with earthy Haitian vetiver and crushed grapefruit leaf.',
        about: 'A refined balance between zesty citrus brightness and deep green woody roots. Designed for dynamic everyday sophistication, with notes of pink grapefruit, nutmeg, and smoked vetiver root.',
        price: 12400,
        stock: 22,
        volume: 100,
        imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      },
    ];

    console.log('Seeding Products...');
    for (const prodData of productsData) {
      const existing = await Product.findOne({ name: prodData.name });
      if (existing) {
        await Product.findByIdAndUpdate(existing._id, prodData);
        console.log(`Updated product: ${prodData.name}`);
      } else {
        await Product.create(prodData);
        console.log(`Created product: ${prodData.name}`);
      }
    }

    console.log('Seeding completed successfully! 6 luxury products are ready.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
