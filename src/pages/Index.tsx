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
      type: 'С 60.30-5',
      length: '6 метров',
      diameter: '300 мм',
      price: 'от 4 500 ₽',
      priceValue: 4500,
      description: 'Для малоэтажного строительства',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С 80.30-8',
      length: '8 метров',
      diameter: '300 мм',
      price: 'от 6 800 ₽',
      priceValue: 6800,
      description: 'Для частных домов и коттеджей',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С 100.30-8',
      length: '10 метров',
      diameter: '300 мм',
      price: 'от 8 200 ₽',
      priceValue: 8200,
      description: 'Для промышленного строительства',
    },
    {
      name: 'Сваи забивные железобетонные',
      type: 'С 120.35-10',
      length: '12 метров',
      diameter: '350 мм',
      price: 'от 12 500 ₽',
      priceValue: 12500,
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
