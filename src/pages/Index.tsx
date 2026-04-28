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
      company: 'ООО "СтройМонтаж"',
      author: 'Алексей Петров',
      position: 'Главный инженер',
      text: 'Работаем с этой компанией уже 3 года. Качество свай на высоте, доставка всегда вовремя. Рекомендуем!',
      rating: 5,
    },
    {
      company: 'ИП Смирнов С.А.',
      author: 'Сергей Смирнов',
      position: 'Частный застройщик',
      text: 'Строил дом, нужны были сваи 8м. Ребята помогли с выбором, привезли точно в срок. Цена адекватная.',
      rating: 5,
    },
    {
      company: 'ООО "Владимирстрой"',
      author: 'Елена Иванова',
      position: 'Директор',
      text: 'Заказывали большую партию для объекта. Всё прошло гладко, документы в порядке. Будем обращаться ещё.',
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