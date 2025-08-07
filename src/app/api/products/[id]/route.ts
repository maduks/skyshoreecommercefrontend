import { NextResponse } from 'next/server';

const products = [
  {
    id: 1,
    name: "Veniam officiis voluptates",
    price: 122.00,
    oldPrice: null,
    image: "/assets/images/product/large-size/1.jpg",
    secondaryImage: "/assets/images/product/large-size/2.jpg",
    category: "Car Accessories",
    rating: 3,
    isNew: true,
    discount: null,
    description: "The invention relates to an electromechanical brake booster with an electric motor and a helical gearing. The brake booster is used for coupling an auxiliary force via a driver into a piston rod. The invention proposes connecting a spindle of the helical gearing elastically via a spring element to the piston rod such that, in the event of rapid actuation of the brake, the helical gearing and a rotor of the electric motor do not have to be accelerated entirely muscle power. The muscle power required for actuating a brake is reduced as a result in the event of a rapid actuation of the brake.",
    shortDescription: "High-quality car accessory for optimal performance.",
    inStock: true,
    sku: "CA001",
    brand: "Uren",
    tags: ["Brake", "Performance", "Safety"],
    colors: ["Red", "Blue", "Black"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 2,
    name: "Rerum perspiciatis qui",
    price: 194.00,
    oldPrice: 241.00,
    image: "/assets/images/product/large-size/3.jpg",
    secondaryImage: "/assets/images/product/large-size/4.jpg",
    category: "Car Accessories",
    rating: 2,
    isNew: true,
    discount: 20,
    description: "Advanced automotive component designed for enhanced vehicle performance and safety. This product features cutting-edge technology that improves vehicle handling and provides superior protection for drivers and passengers.",
    shortDescription: "Premium automotive component with advanced features.",
    inStock: true,
    sku: "CA002",
    brand: "Uren",
    tags: ["Performance", "Advanced", "Safety"],
    colors: ["Silver", "Black"],
    sizes: ["M", "L", "XL"]
  },
  {
    id: 3,
    name: "Dolorem odio provident",
    price: 165.80,
    oldPrice: null,
    image: "/assets/images/product/large-size/5.jpg",
    secondaryImage: "/assets/images/product/large-size/6.jpg",
    category: "Car Accessories",
    rating: 4,
    isNew: true,
    discount: null,
    description: "Professional-grade automotive accessory for optimal vehicle maintenance and performance. Designed for automotive professionals and enthusiasts who demand the highest quality and reliability.",
    shortDescription: "Professional-grade automotive accessory.",
    inStock: true,
    sku: "CA003",
    brand: "Uren",
    tags: ["Professional", "Maintenance", "Performance"],
    colors: ["Blue", "Red", "Yellow"],
    sizes: ["S", "M"]
  },
  {
    id: 4,
    name: "Autem ipsa ad",
    price: 145.80,
    oldPrice: null,
    image: "/assets/images/product/large-size/7.jpg",
    secondaryImage: "/assets/images/product/large-size/8.jpg",
    category: "Car Accessories",
    rating: 5,
    isNew: false,
    discount: null,
    description: "Reliable automotive component designed for long-lasting performance and durability. Built to withstand the rigors of daily use while maintaining optimal functionality.",
    shortDescription: "Reliable automotive component with long-lasting performance.",
    inStock: true,
    sku: "CA004",
    brand: "Uren",
    tags: ["Reliable", "Durable", "Performance"],
    colors: ["Black", "White"],
    sizes: ["L", "XL"]
  },
  {
    id: 5,
    name: "Tenetur illum amet",
    price: 150.80,
    oldPrice: null,
    image: "/assets/images/product/large-size/9.jpg",
    secondaryImage: "/assets/images/product/large-size/10.jpg",
    category: "Car Accessories",
    rating: 3,
    isNew: false,
    discount: null,
    description: "Essential automotive accessory for vehicle maintenance and safety enhancement. A must-have component for any vehicle owner who prioritizes safety and performance.",
    shortDescription: "Essential automotive accessory for vehicle maintenance.",
    inStock: true,
    sku: "CA005",
    brand: "Uren",
    tags: ["Essential", "Maintenance", "Safety"],
    colors: ["Green", "Blue"],
    sizes: ["M", "L"]
  },
  {
    id: 6,
    name: "Non doloremque placeat",
    price: 165.80,
    oldPrice: null,
    image: "/assets/images/product/large-size/11.jpg",
    secondaryImage: "/assets/images/product/large-size/12.jpg",
    category: "Car Accessories",
    rating: 4,
    isNew: false,
    discount: null,
    description: "High-performance automotive component for enhanced vehicle capabilities and safety. Engineered for maximum efficiency and reliability in demanding conditions.",
    shortDescription: "High-performance automotive component for enhanced capabilities.",
    inStock: true,
    sku: "CA006",
    brand: "Uren",
    tags: ["High-Performance", "Enhanced", "Safety"],
    colors: ["Red", "Black", "Silver"],
    sizes: ["S", "M", "L", "XL"]
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
} 