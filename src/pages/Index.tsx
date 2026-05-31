import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import DeliveryReviewsContacts from '@/components/DeliveryReviewsContacts';

const Index = () => {
  const products = [
    {
      name: 'Сваи забивные железобетонные',
      type: 'С40-15',
      length: '4 метра',
      diameter: '150 мм',
      price: 'по запросу',
      description: 'Для частных домов и коттеджей',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С30-15',
      length: '3 метра',
      diameter: '150 мм',
      price: 'по запросу',
      description: 'Для частных домов и коттеджей',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С40-20',
      length: '4 метра',
      diameter: '200 мм',
      price: 'по запросу',
      description: 'Для частных домов и коттеджей',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С30-20',
      length: '3 метра',
      diameter: '200 мм',
      price: 'по запросу',
      description: 'Для частных домов и коттеджей',
    },
  ];

  const reviews: never[] = [];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <CatalogSection products={products} scrollToSection={scrollToSection} />
      <DeliveryReviewsContacts reviews={reviews} />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default Index;