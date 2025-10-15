import CatalogProductDetailsClient from './CatalogProductDetailsClient';

interface CatalogProductDetailsPageProps {
  params: Promise<{ category: string; id: string }>;
}

const CatalogProductDetailsPage = async ({ params }: CatalogProductDetailsPageProps) => {
  const { category, id } = await params;
  return <CatalogProductDetailsClient category={category} id={id} />;
};

export default CatalogProductDetailsPage;
