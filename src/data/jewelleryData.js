// ─── Asset Imports: Collections ─────────────────────────────────────
import imgBloom from '../assets/eternal_bloom_collection_1773561954785.jpg';
import imgCelestial from '../assets/celestial_radiance_collection_1773561972307.jpg';
import imgHeritage from '../assets/heritage_redux_collection_1773561991971.jpg';
import imgMidnight from '../assets/midnight_garden_collection_1773562006471.jpg';

// ─── Asset Imports: Categories ──────────────────────────────────────
import necklacesImg from '../assets/categories/necklaces.jpg';
import ringsImg from '../assets/categories/rings.jpg';
import earringsImg from '../assets/categories/earrings.jpg';
import banglesImg from '../assets/categories/bangles.jpg';
import braceletsImg from '../assets/categories/bracelets.jpg';
import bridalImg from '../assets/categories/bridal.jpg';

// ─── Collections ────────────────────────────────────────────────────
export const collections = [
  {
    id: 1,
    slug: 'eternal-bloom',
    name: 'The Eternal Bloom',
    tag: 'AUTUMN/WINTER 2024',
    description:
      'Inspired by the eternal beauty of blooming gardens, this collection features organic gold forms adorned with brilliant-cut diamonds and vivid gemstones.',
    pieces: 12,
    count: '12 Exclusive Pieces',
    image: imgBloom,
  },
  {
    id: 2,
    slug: 'celestial-radiance',
    name: 'Celestial Radiance',
    tag: 'SPRING / SUMMER 2025',
    description:
      'Drawing from the cosmos, each piece captures the ethereal glow of moonstone paired with the brilliance of VS-clarity diamonds in platinum settings.',
    pieces: 8,
    count: '8 Exclusive Pieces',
    image: imgCelestial,
  },
  {
    id: 3,
    slug: 'heritage-redux',
    name: 'Heritage Redux',
    tag: 'TRADITIONAL',
    description:
      'A reimagining of centuries-old kundan techniques through a contemporary lens. Each piece bridges ancestral artistry and modern aesthetics.',
    pieces: 15,
    count: '15 Exclusive Pieces',
    image: imgHeritage,
  },
  {
    id: 4,
    slug: 'midnight-garden',
    name: 'Midnight Garden',
    tag: 'COCKTAIL & EVENING',
    description:
      'Bold, dramatic pieces designed for the night. Deep sapphires, black onyx, and dark emeralds set in architectural gold formations.',
    pieces: 10,
    count: '10 Exclusive Pieces',
    image: imgMidnight,
  },
];

// ─── Categories ─────────────────────────────────────────────────────
export const categories = [
  { id: 'necklaces', slug: 'necklaces', name: 'Necklaces', count: '48 Pieces', pieceCount: 48, image: necklacesImg, type: 'large' },
  { id: 'rings', slug: 'rings', name: 'Rings', count: '24 Pieces', pieceCount: 24, image: ringsImg, type: 'small' },
  { id: 'earrings', slug: 'earrings', name: 'Earrings', count: '62 Pieces', pieceCount: 62, image: earringsImg, type: 'small' },
  { id: 'bangles', slug: 'bangles', name: 'Bangles', count: '36 Pieces', pieceCount: 36, image: banglesImg, type: 'small' },
  { id: 'bracelets', slug: 'bracelets', name: 'Bracelets', count: '18 Pieces', pieceCount: 18, image: braceletsImg, type: 'small' },
  { id: 'bridal', slug: 'bridal', name: 'Bridal', count: '12 Sets', pieceCount: 12, image: bridalImg, type: 'large' },
];

// ─── Products ───────────────────────────────────────────────────────
export const products = [
  // ── Eternal Bloom ──
  { id: 1,  name: 'Celestial Cascade Necklace',   collection: 'eternal-bloom', category: 'necklaces',  price: '₹4,85,000', material: '18K Gold, VVS Diamonds',          image: necklacesImg, isNew: true },
  { id: 2,  name: 'Bloom Petal Ring',              collection: 'eternal-bloom', category: 'rings',      price: '₹1,95,000', material: '18K Rose Gold, Pink Sapphire',    image: ringsImg,     isNew: true },
  { id: 3,  name: 'Garden Dew Earrings',           collection: 'eternal-bloom', category: 'earrings',   price: '₹2,40,000', material: '18K Gold, Emerald, Diamonds',     image: earringsImg,  isNew: false },
  { id: 4,  name: 'Vine Embrace Bracelet',         collection: 'eternal-bloom', category: 'bracelets',  price: '₹3,10,000', material: '18K Gold, Tsavorite Garnets',     image: braceletsImg, isNew: false },
  { id: 5,  name: 'Flora Halo Bangle',             collection: 'eternal-bloom', category: 'bangles',    price: '₹5,20,000', material: '22K Gold, Uncut Diamonds',        image: banglesImg,   isNew: true },
  { id: 6,  name: 'Eternal Bloom Bridal Set',      collection: 'eternal-bloom', category: 'bridal',     price: '₹12,50,000', material: '22K Gold, Polki, Emeralds',      image: bridalImg,    isNew: false },

  // ── Celestial Radiance ──
  { id: 7,  name: 'Lunar Halo Necklace',           collection: 'celestial-radiance', category: 'necklaces',  price: '₹6,75,000', material: 'Platinum, Moonstone, Diamonds',    image: necklacesImg, isNew: true },
  { id: 8,  name: 'Starfall Solitaire Ring',       collection: 'celestial-radiance', category: 'rings',      price: '₹3,20,000', material: 'Platinum, VS1 Diamond',             image: ringsImg,     isNew: true },
  { id: 9,  name: 'Nova Drop Earrings',            collection: 'celestial-radiance', category: 'earrings',   price: '₹2,85,000', material: 'White Gold, Blue Sapphire',          image: earringsImg,  isNew: false },
  { id: 10, name: 'Orbit Tennis Bracelet',          collection: 'celestial-radiance', category: 'bracelets',  price: '₹4,50,000', material: 'Platinum, Round Brilliant Diamonds',image: braceletsImg, isNew: false },
  { id: 11, name: 'Eclipse Cuff Bangle',            collection: 'celestial-radiance', category: 'bangles',    price: '₹3,90,000', material: '18K White Gold, Black Diamonds',    image: banglesImg,   isNew: true },
  { id: 12, name: 'Celestial Bridal Ensemble',      collection: 'celestial-radiance', category: 'bridal',     price: '₹18,00,000', material: 'Platinum, Diamonds, Pearls',       image: bridalImg,    isNew: false },

  // ── Heritage Redux ──
  { id: 13, name: 'Mughal Rivière Necklace',       collection: 'heritage-redux', category: 'necklaces',  price: '₹8,50,000', material: '22K Gold, Kundan, Ruby',         image: necklacesImg, isNew: false },
  { id: 14, name: 'Dynasty Cocktail Ring',          collection: 'heritage-redux', category: 'rings',      price: '₹2,75,000', material: '22K Gold, Polki Diamond',        image: ringsImg,     isNew: true },
  { id: 15, name: 'Empress Jhumka Earrings',        collection: 'heritage-redux', category: 'earrings',   price: '₹3,40,000', material: '22K Gold, Meenakari, Pearls',    image: earringsImg,  isNew: false },
  { id: 16, name: 'Rani Haar Statement Necklace',   collection: 'heritage-redux', category: 'necklaces',  price: '₹15,00,000', material: '22K Gold, Uncut Diamonds, Emeralds', image: necklacesImg, isNew: true },
  { id: 17, name: 'Heritage Kada Bangle',            collection: 'heritage-redux', category: 'bangles',    price: '₹4,20,000', material: '22K Gold, Kundan Work',          image: banglesImg,   isNew: false },
  { id: 18, name: 'Royal Heritage Bridal Set',       collection: 'heritage-redux', category: 'bridal',     price: '₹25,00,000', material: '22K Gold, Polki, Rubies, Pearls', image: bridalImg,  isNew: true },

  // ── Midnight Garden ──
  { id: 19, name: 'Noir Cascade Necklace',          collection: 'midnight-garden', category: 'necklaces',  price: '₹7,25,000', material: '18K Gold, Black Onyx, Diamonds',  image: necklacesImg, isNew: true },
  { id: 20, name: 'Shadow Bloom Ring',               collection: 'midnight-garden', category: 'rings',      price: '₹2,10,000', material: '18K Gold, Dark Emerald',           image: ringsImg,     isNew: false },
  { id: 21, name: 'Midnight Pear Drop Earrings',     collection: 'midnight-garden', category: 'earrings',   price: '₹3,65,000', material: '18K Gold, Deep Sapphire, Diamonds',image: earringsImg, isNew: true },
  { id: 22, name: 'Dark Vine Cuff Bracelet',         collection: 'midnight-garden', category: 'bracelets',  price: '₹2,90,000', material: '18K Gold, Black Spinel',           image: braceletsImg, isNew: false },
  { id: 23, name: 'Obsidian Sculpt Bangle',          collection: 'midnight-garden', category: 'bangles',    price: '₹3,55,000', material: '18K Gold, Black Diamonds',         image: banglesImg,   isNew: true },
  { id: 24, name: 'Midnight Garden Bridal Suite',     collection: 'midnight-garden', category: 'bridal',     price: '₹14,00,000', material: '18K Gold, Sapphires, Diamonds',  image: bridalImg,    isNew: false },
];
