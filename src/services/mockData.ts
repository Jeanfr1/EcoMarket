import type { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Eco-Friendly Water Bottle',
    description: 'Reusable water bottle made from recycled materials',
    price: 24.99,
    carbonFootprint: 2.5,
    sustainabilityScore: 92,
    certifications: ['Recycled', 'Carbon Neutral'],
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=300',
    supplier: {
      id: 's1',
      name: 'EcoWare',
      sustainablePractices: ['Zero Waste', 'Renewable Energy'],
      certifications: ['B Corp', 'Fair Trade'],
      carbonFootprint: 150
    }
  },
  {
    id: '2',
    name: 'Bamboo Cutlery Set',
    description: 'Sustainable bamboo cutlery for eco-conscious dining',
    price: 19.99,
    carbonFootprint: 1.8,
    sustainabilityScore: 88,
    certifications: ['Biodegradable', 'Organic'],
    imageUrl: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=300',
    supplier: {
      id: 's2',
      name: 'GreenLife',
      sustainablePractices: ['Sustainable Forestry', 'Local Production'],
      certifications: ['FSC Certified'],
      carbonFootprint: 120
    }
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable t-shirt made from organic cotton',
    price: 29.99,
    carbonFootprint: 3.2,
    sustainabilityScore: 85,
    certifications: ['Organic', 'Fair Trade', 'Vegan'],
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300',
    supplier: {
      id: 's3',
      name: 'EcoFashion',
      sustainablePractices: ['Organic Farming', 'Fair Labor'],
      certifications: ['GOTS Certified', 'Fair Trade'],
      carbonFootprint: 200
    }
  },
  {
    id: '4',
    name: 'Solar-Powered Backpack',
    description: 'Charge your devices on the go with integrated solar panels',
    price: 89.99,
    carbonFootprint: 4.5,
    sustainabilityScore: 90,
    certifications: ['Solar Powered', 'Recycled'],
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300',
    supplier: {
      id: 's4',
      name: 'SolarTech',
      sustainablePractices: ['Solar Manufacturing', 'E-waste Recycling'],
      certifications: ['Solar Certified', 'Energy Star'],
      carbonFootprint: 180
    }
  },
  {
    id: '5',
    name: 'Biodegradable Phone Case',
    description: 'Protective phone case made from plant-based materials',
    price: 34.99,
    carbonFootprint: 1.2,
    sustainabilityScore: 95,
    certifications: ['Biodegradable', 'Vegan', 'Plastic-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=300',
    supplier: {
      id: 's5',
      name: 'EcoTech',
      sustainablePractices: ['Zero Plastic', 'Composting'],
      certifications: ['Plastic-Free', 'Compostable'],
      carbonFootprint: 90
    }
  },
  {
    id: '6',
    name: 'Hemp Yoga Mat',
    description: 'Natural, non-toxic yoga mat made from sustainable hemp',
    price: 49.99,
    carbonFootprint: 2.8,
    sustainabilityScore: 87,
    certifications: ['Organic', 'Non-Toxic', 'Biodegradable'],
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=300',
    supplier: {
      id: 's6',
      name: 'YogaEarth',
      sustainablePractices: ['Organic Farming', 'Natural Processing'],
      certifications: ['GOTS Certified', 'Non-Toxic'],
      carbonFootprint: 110
    }
  },
  {
    id: '7',
    name: 'Recycled Paper Notebook',
    description: 'Handcrafted notebook made from 100% recycled paper',
    price: 14.99,
    carbonFootprint: 0.8,
    sustainabilityScore: 98,
    certifications: ['Recycled', 'Tree-Free', 'Carbon Neutral'],
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=300',
    supplier: {
      id: 's7',
      name: 'PaperCycle',
      sustainablePractices: ['Paper Recycling', 'Zero Waste'],
      certifications: ['FSC Recycled', 'Carbon Neutral'],
      carbonFootprint: 60
    }
  },
  {
    id: '8',
    name: 'Bamboo Toothbrush Set',
    description: 'Pack of 4 biodegradable bamboo toothbrushes',
    price: 15.99,
    carbonFootprint: 1.0,
    sustainabilityScore: 94,
    certifications: ['Biodegradable', 'Plastic-Free', 'Vegan'],
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=300',
    supplier: {
      id: 's8',
      name: 'BambooBasics',
      sustainablePractices: ['Sustainable Forestry', 'Plastic-Free Packaging'],
      certifications: ['FSC Certified', 'Plastic-Free'],
      carbonFootprint: 75
    }
  },
  {
    id: '9',
    name: 'Upcycled Denim Bag',
    description: 'Stylish tote bag made from recycled denim',
    price: 39.99,
    carbonFootprint: 2.0,
    sustainabilityScore: 89,
    certifications: ['Recycled', 'Fair Trade', 'Zero Waste'],
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300',
    supplier: {
      id: 's9',
      name: 'DenimRevive',
      sustainablePractices: ['Textile Recycling', 'Fair Labor'],
      certifications: ['Fair Trade', 'Recycled Materials'],
      carbonFootprint: 95
    }
  }
];