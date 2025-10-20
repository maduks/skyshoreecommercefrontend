# Skyshore E-Commerce

A modern Next.js e-commerce website for car accessories and automotive parts, converted from the Uren HTML template.

## Features

- **Modern Next.js 15** with App Router
- **TypeScript** for type safety
- **Responsive Design** based on the Uren template
- **Car Accessories Focus** - specialized for automotive parts
- **Component-Based Architecture** for maintainability
- **SEO Optimized** with proper metadata

## Pages

- **Home Page** (`/`) - Landing page with hero slider, featured categories, and new arrivals
- **Shop Page** (`/shop`) - Product listing page
- **About Page** (`/about`) - Company information
- **Contact Page** (`/contact`) - Contact information and form
- **Blog Page** (`/blog`) - Blog articles
- **Cart Page** (`/cart`) - Shopping cart
- **Checkout Page** (`/checkout`) - Checkout process
- **My Account** (`/my-account`) - User account management

## Components

- `Header` - Navigation and search functionality
- `NewsletterPopup` - Newsletter subscription popup
- `PopularSearch` - Popular search terms
- `HeroSlider` - Main banner slider
- `ShippingInfo` - Shipping information section
- `FeaturedCategories` - Featured product categories
- `BannerSection` - Promotional banners
- `NewArrivals` - New product arrivals
- `DealOfTheDay` - Special offers and deals
- `Footer` - Site footer with links and contact info

## Styling

The project uses the original Uren template CSS files:
- Bootstrap CSS for layout
- Font Awesome for icons
- Ion Icons for additional icons
- Custom CSS from the Uren template
- Responsive design for mobile and desktop

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
skyshore-ecommerce/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── shop/
│   │   │   └── page.tsx          # Shop page
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   └── contact/
│   │       └── page.tsx          # Contact page
│   └── components/
│       ├── Header.tsx            # Header component
│       ├── Footer.tsx            # Footer component
│       ├── NewsletterPopup.tsx   # Newsletter popup
│       ├── PopularSearch.tsx     # Popular search
│       ├── HeroSlider.tsx        # Hero slider
│       ├── ShippingInfo.tsx      # Shipping info
│       ├── FeaturedCategories.tsx # Featured categories
│       ├── BannerSection.tsx     # Banner section
│       ├── NewArrivals.tsx       # New arrivals
│       └── DealOfTheDay.tsx      # Deal of the day
├── public/
│   └── assets/                   # Static assets from Uren template
│       ├── css/
│       ├── js/
│       ├── images/
│       └── fonts/
└── package.json
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **CSS** - Styling (Bootstrap + Custom)
- **Font Awesome** - Icons
- **Ion Icons** - Additional icons

## Original Template

This project is converted from the Uren HTML template, a premium car accessories e-commerce template. All original styling and assets have been preserved while converting to a modern Next.js application.

## License

This project is for demonstration purposes. The original Uren template may have its own licensing terms.
