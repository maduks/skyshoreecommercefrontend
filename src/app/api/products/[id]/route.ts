import { NextResponse } from 'next/server';

// Sample products data (in a real app, this would come from a database)
const products = [
  {
    _id: { $oid: "68d04d228d7eda93d67523c4" },
    name: "Skyshore Spark-500 - 1L",
    description: "<h2>Skyshore SPARK 500 SAE 40 API SF/CF: Versatile Engine Protection</h2><p><strong>Skyshore Spark 500 SAE 40</strong> is a high-performance, multi-purpose engine oil engineered for use in both <strong>gasoline and diesel engines</strong> in passenger cars, light trucks, commercial vehicles, and agricultural machinery. Formulated to meet the stringent <strong>API SF and API CF</strong> performance standards, it delivers dependable lubrication, robust protection for critical engine components, and long engine life under diverse operating conditions.</p>",
    price: { $numberDouble: "72000.99" },
    category: { $oid: "689220df5627fc9c307c9174" },
    images: ["https://ik.imagekit.io/paysupport/Skyshoregroup/800_products/35_vqTqANXYp.png?updatedAt=1758480982302","https://ik.imagekit.io/paysupport/Skyshoregroup/800_products/36_FtPstXdjd.png?updatedAt=1758480981965"],
    stock: { $numberInt: "97" },
    sku: "SPARK-500-001-1L",
    brand: "Skyshore",
    specifications: "High-performance engine oil specifications",
    isActive: true,
    tags: ["featured-small","new-arrival"],
    variations: [{
      name: "Size",
      options: [{
        value: "Single",
        price: { $numberInt: "0" },
        stock: { $numberInt: "30" },
        sku: "SPARK-500-SINGLE-1L",
        _id: { $oid: "689230123e8773f277147421" }
      }],
      _id: { $oid: "689230123e8773f277147420" }
    }],
    averageRating: { $numberInt: "0" },
    totalRatings: { $numberInt: "0" },
    featured: true,
    newArrival: true,
    salePrice: { $numberDouble: "69000.99" },
    saleEndDate: { $date: { $numberLong: "1767225599000" } },
    ratings: [],
    createdAt: { $date: { $numberLong: "1754411026876" } },
    updatedAt: { $date: { $numberLong: "1754878405273" } },
    __v: { $numberInt: "0" }
  },
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
    variations: [{
      name: "Size",
      options: [{
        value: "Carton",
        price: { $numberInt: "0" },
        stock: { $numberInt: "30" },
        sku: "APEX-2000-CARTON",
        _id: { $oid: "6893e147208965f5ca432e3e" }
      }],
      _id: { $oid: "6893e147208965f5ca432e3d" }
    }],
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Find product by ID
    const product = products.find(p => p._id.$oid === id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}


