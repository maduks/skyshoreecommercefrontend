import { NextRequest, NextResponse } from 'next/server';

// Mock blog data based on the provided structure
const mockBlogs = [
  {
    seo: {
      metaTitle: "API Oil Standards for Modern Engines",
      metaDescription: "Find out why new cars need oils with higher API ratings like SP and CK-4.",
      keywords: [
        "API SP",
        "modern engine oil",
        "API CK-4",
        "car oil guide"
      ]
    },
    _id: "6899f207b734fdf5f0de5eeb",
    title: "Why Newer Cars Require Higher API Oil Ratings",
    slug: "why-newer-cars-require-higher-api-oil-ratings",
    content: "Modern engines are designed with tighter tolerances, turbochargers, and emission control systems, making oil performance more critical than ever. Newer API classifications like SP (for gasoline) and CK-4 (for diesel) are engineered to provide better wear protection, turbocharger deposit control, and compatibility with emission systems. Using outdated API oil grades may not meet your car's requirements, leading to poor performance and potential warranty issues. Always ensure your oil meets or exceeds the API standard recommended in your owner's manual.",
    excerpt: "Learn why high-performance modern engines require the latest API-certified oils.",
    author: {
      _id: "689217144b047d9f0517c3d4",
      name: "John Doe",
      email: "john@example.com"
    },
    featuredImage: "/assets/images/blog/large-size/1.jpg",
    images: [],
    categories: [
      {
        _id: "689220df5627fc9c307c9174",
        name: "Engine Oil"
      }
    ],
    tags: [
      "API standards",
      "modern cars",
      "SP oil",
      "CK-4 oil"
    ],
    status: "published",
    featured: true,
    allowComments: true,
    viewCount: 0,
    readTime: 1,
    isActive: true,
    createdAt: "2025-08-11T13:37:11.198Z",
    updatedAt: "2025-08-11T13:37:11.198Z",
    publishedAt: "2025-08-11T13:37:11.198Z",
    __v: 0
  },
  {
    seo: {
      metaTitle: "API Oil Standards for Gasoline and Diesel Engines",
      metaDescription: "Understand API S-series and C-series oil ratings for optimal engine care.",
      keywords: [
        "API S-series",
        "API C-series",
        "diesel engine oil",
        "gasoline engine oil"
      ]
    },
    _id: "6899f1d5b734fdf5f0de5ee7",
    title: "Gasoline vs Diesel: API Oil Standards You Need to Know",
    slug: "gasoline-vs-diesel",
    content: "Gasoline and diesel engines operate differently, which is why the API assigns separate categories. Gasoline engines use the 'S' series (e.g., SN, SP), while diesel engines use the 'C' series (e.g., CK-4, FA-4). Using the wrong oil type can cause premature wear, poor fuel economy, and engine deposits. Always check your vehicle's manual for the correct API category and viscosity grade. Modern engines often require oils that meet both gasoline and diesel API ratings for versatility, especially in mixed fleet operations.",
    excerpt: "Avoid costly mistakes by learning the difference between API S-series and C-series engine oils.",
    author: {
      _id: "689217144b047d9f0517c3d4",
      name: "John Doe",
      email: "john@example.com"
    },
    featuredImage: "/assets/images/blog/large-size/2.jpg",
    images: [],
    categories: [
      {
        _id: "689220df5627fc9c307c9174",
        name: "Engine Oil"
      }
    ],
    tags: [
      "API standards",
      "diesel oil",
      "gasoline oil"
    ],
    status: "published",
    featured: true,
    allowComments: true,
    viewCount: 0,
    readTime: 1,
    isActive: true,
    createdAt: "2025-08-11T13:36:21.240Z",
    updatedAt: "2025-08-11T13:36:21.240Z",
    publishedAt: "2025-08-11T13:36:21.240Z",
    __v: 0
  },
  {
    seo: {
      metaTitle: "Best API Oils for Summer and Winter",
      metaDescription: "Learn which API oil standards are ideal for hot summers and cold winters.",
      keywords: [
        "API oil",
        "winter oil",
        "summer engine oil",
        "viscosity grades"
      ]
    },
    _id: "6899f19ab734fdf5f0de5ee3",
    title: "API Oil Standards for Different Seasons: Summer vs. Winter",
    slug: "api-oil-standards-for-different-seasons",
    content: "Temperature plays a major role in oil performance. In cold winters, you need oils with low viscosity at start-up, such as API SP-rated 5W-30, which flows easily in freezing conditions. In hot summers, thicker oils like 10W-40 with API SN/SP certification handle heat better, preventing breakdown under high temperatures. Always check your manufacturer's recommendations and ensure the oil meets the latest API classification for your climate. Seasonal oil changes are crucial for extending engine life and avoiding wear caused by improper lubrication.",
    excerpt: "Discover how API oil ratings help you choose the right oil for summer and winter driving conditions.",
    author: {
      _id: "689217144b047d9f0517c3d4",
      name: "John Doe",
      email: "john@example.com"
    },
    featuredImage: "/assets/images/blog/large-size/3.jpg",
    images: [],
    categories: [
      {
        _id: "689220df5627fc9c307c9174",
        name: "Engine Oil"
      }
    ],
    tags: [
      "API standards",
      "seasonal oil change",
      "winter oil",
      "summer oil"
    ],
    status: "published",
    featured: true,
    allowComments: true,
    viewCount: 0,
    readTime: 1,
    isActive: true,
    createdAt: "2025-08-11T13:35:22.134Z",
    updatedAt: "2025-08-11T13:35:22.134Z",
    publishedAt: "2025-08-11T13:35:22.134Z",
    __v: 0
  },
  {
    seo: {
      metaTitle: "API Engine Oil Standards Explained",
      metaDescription: "Understand API oil ratings like SN, SP, CK-4, and how they affect engine performance.",
      keywords: [
        "API oil standard",
        "SN SP CK-4",
        "engine oil guide"
      ]
    },
    _id: "6899f152b734fdf5f0de5edf",
    title: "Understanding API Standards: Choosing the Right Oil for Your Car",
    slug: "understanding-api-standards",
    content: "The American Petroleum Institute (API) sets quality standards for engine oils to ensure optimal engine protection and performance. These standards are identified by labels like API SN, SP, CK-4, and more. For example, API SN/SP are designed for modern gasoline engines, offering better sludge control, oxidation resistance, and wear protection. Diesel vehicles, on the other hand, require API categories like CK-4 or FA-4 for high-temperature and heavy-duty operation. Knowing your car's manufacturer recommendation and matching it with the right API standard ensures your engine stays healthy and efficient.",
    excerpt: "Learn how API oil standards like SN, SP, and CK-4 help you choose the best oil for your vehicle.",
    author: {
      _id: "689217144b047d9f0517c3d4",
      name: "John Doe",
      email: "john@example.com"
    },
    featuredImage: "/assets/images/blog/large-size/4.jpg",
    images: [],
    categories: [
      {
        _id: "689220df5627fc9c307c9174",
        name: "Engine Oil"
      }
    ],
    tags: [
      "API standards",
      "engine oil",
      "car maintenance"
    ],
    status: "published",
    featured: true,
    allowComments: true,
    viewCount: 0,
    readTime: 1,
    isActive: true,
    createdAt: "2025-08-11T13:34:10.838Z",
    updatedAt: "2025-08-11T13:34:10.838Z",
    publishedAt: "2025-08-11T13:34:10.838Z",
    __v: 0
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const featured = searchParams.get('featured') === 'true';

    // Filter blogs based on parameters
    let filteredBlogs = mockBlogs.filter(blog => blog.isActive && blog.status === 'published');
    
    if (featured) {
      filteredBlogs = filteredBlogs.filter(blog => blog.featured);
    }

    // Calculate pagination
    const total = filteredBlogs.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

    const response = {
      success: true,
      message: "Blogs retrieved successfully",
      data: paginatedBlogs,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        }
      },
      { status: 500 }
    );
  }
} 