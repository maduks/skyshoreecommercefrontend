import ProductDetailsPageClient from './ProductDetailsPageClient';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  const { id } = await params;
  return <ProductDetailsPageClient id={id} />;
};

export default ProductDetailsPage; 