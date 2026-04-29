import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import DeliveryReviewsContacts from '@/components/DeliveryReviewsContacts';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const products = [
    {
      name: 'Сваи забивные железобетонные',
      type: 'С40-15',
      length: '4 метра',
      diameter: '150 мм',
      price: 'по запросу',
      priceValue: 0,
      description: 'Для малоэтажного строительства',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С30-15',
      length: '3 метра',
      diameter: '150 мм',
      price: 'по запросу',
      priceValue: 0,
      description: 'Для частных домов и коттеджей',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С40-20',
      length: '4 метра',
      diameter: '200 мм',
      price: 'по запросу',
      priceValue: 0,
      description: 'Для промышленного строительства',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С30-20',
      length: '3 метра',
      diameter: '200 мм',
      price: 'по запросу',
      priceValue: 0,
      description: 'Для многоэтажных зданий',
    },
  ];

  const reviews = [
    {
      company: 'Частный застройщик',
      author: 'Алексей Морозов',
      position: 'Строю дом в Суздальском районе',
      text: 'Брал сваи С30-15 для фундамента дома 10×12. Качество отличное — всё по ГОСТу, документы предоставили сразу. Привезли точно в срок, разгрузили аккуратно. Рекомендую!',
      rating: 5,
    },
    {
      company: 'Частный застройщик',
      author: 'Дмитрий Савельев',
      position: 'Строительство коттеджа под Владимиром',
      text: 'Обратился впервые — остался очень доволен. Менеджер помог подобрать нужный тип свай под мой проект, объяснил все нюансы. Цены адекватные, работают профессионально.',
      rating: 5,
    },
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
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