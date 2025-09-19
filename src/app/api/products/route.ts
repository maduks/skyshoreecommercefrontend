import { NextResponse } from 'next/server';

const products = [
  {
    _id: { $oid: "6893e147208965f5ca432e3c" },
    name: "Skyshore Apex 2000",
    description: "Skyshore APEX 2000 SAE 20W-50 Motor Oil API SG/CF is a high-performance multi-grade engine oil with excellent shear stability.",
    price: { $numberDouble: "97009.99" },
    salePrice: { $numberDouble: "83400.99" },
    category: { $oid: "689220df5627fc9c307c9174" },
    images: ["https://ik.imagekit.io/paysupport/Skyshoregroup/800_products/White%20and%20Pink%20Modern%20Auto%20Parts%20Sale%20Banner%20(1770%20x%20617%20mm)%20(400%20x%20380%20px)%20(400%20x%2050%20px)%20(800%20x%20800%20px)_5ALVUZVxi.png?updatedAt=1754521368551"],
    stock: { $numberInt: "100" },
    sku: "APEX-2000-001",
    brand: "Skyshore",
    specifications: "High-performance multi-grade engine oil",
    isActive: true,
    tags: ["featured", "new-arrival", "deal-of-day"],
    variations: [
      {
        name: "Size",
        options: [
          {
            value: "Carton",
            price: { $numberInt: "0" },
            stock: { $numberInt: "30" },
            sku: "APEX-2000-CARTON",
            _id: { $oid: "6893e147208965f5ca432e3e" }
          }
        ],
        _id: { $oid: "6893e147208965f5ca432e3d" }
      }
    ],
    averageRating: { $numberInt: "4" },
    totalRatings: { $numberInt: "10" },
    featured: true,
    newArrival: true,
    saleEndDate: { $date: { $numberLong: "1735689599000" } },
    ratings: [],
    createdAt: { $date: { $numberLong: "1754521927924" } },
    updatedAt: { $date: { $numberLong: "1754521927924" } },
    __v: { $numberInt: "0" }
  },
  {
    _id: { $oid: "6893e147208965f5ca432e3f" },
    name: "Skyshore Premium Diesel",
    description: "Premium diesel engine oil for heavy-duty applications.",
    price: { $numberDouble: "120000.00" },
    salePrice: { $numberDouble: "96000.00" },
    category: { $oid: "689220df5627fc9c307c9174" },
    images: ["https://ik.imagekit.io/paysupport/Skyshoregroup/800_products/White%20and%20Pink%20Modern%20Auto%20Parts%20Sale%20Banner%20(1770%20x%20617%20mm)%20(400%20x%20380%20px)%20(400%20x%2050%20px)%20(800%20x%20800%20px)_5ALVUZVxi.png?updatedAt=1754521368551"],
    stock: { $numberInt: "50" },
    sku: "PREMIUM-DIESEL-001",
    brand: "Skyshore",
    specifications: "Premium diesel engine oil specifications",
    isActive: true,
    tags: ["featured", "deal-of-day"],
    variations: [
      {
        name: "Size",
        options: [
          {
            value: "Carton",
            price: { $numberInt: "0" },
            stock: { $numberInt: "20" },
            sku: "PREMIUM-DIESEL-CARTON",
            _id: { $oid: "6893e147208965f5ca432e40" }
          }
        ],
        _id: { $oid: "6893e147208965f5ca432e41" }
      }
    ],
    averageRating: { $numberInt: "5" },
    totalRatings: { $numberInt: "15" },
    featured: true,
    newArrival: false,
    saleEndDate: { $date: { $numberLong: "1735689599000" } },
    ratings: [],
    createdAt: { $date: { $numberLong: "1754521927924" } },
    updatedAt: { $date: { $numberLong: "1754521927924" } },
    __v: { $numberInt: "0" }
  },
  {
    _id: { $oid: "6893e147208965f5ca432e42" },
    name: "Veniam officiis voluptates",
    description: "The invention relates to an electromechanical brake booster with an electric motor and a helical gearing.",
    price: { $numberDouble: "122.00" },
    salePrice: { $numberDouble: "98.00" },
    category: { $oid: "cat1" },
    images: ["/assets/images/product/large-size/1.jpg", "/assets/images/product/large-size/2.jpg"],
    stock: { $numberInt: "50" },
    sku: "CA001",
    brand: "Uren",
    specifications: "High-quality car accessory for optimal performance.",
    isActive: true,
    tags: ["Brake", "Performance", "Safety"],
    variations: [
      {
        name: "Size",
        options: [
          {
            value: "Carton",
            price: { $numberInt: "0" },
            stock: { $numberInt: "30" },
            sku: "CA001-CARTON",
            _id: { $oid: "6893e147208965f5ca432e43" }
          }
        ],
        _id: { $oid: "6893e147208965f5ca432e44" }
      }
    ],
    averageRating: { $numberInt: "4" },
    totalRatings: { $numberInt: "10" },
    featured: true,
    newArrival: true,
    saleEndDate: { $date: { $numberLong: "1735689599000" } },
    ratings: [],
    createdAt: { $date: { $numberLong: "1754521927924" } },
    updatedAt: { $date: { $numberLong: "1754521927924" } },
    __v: { $numberInt: "0" }
  }
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      products,
      totalPages: 1,
      currentPage: 1,
      total: products.length
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 