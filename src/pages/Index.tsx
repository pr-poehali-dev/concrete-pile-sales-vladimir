import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import DeliveryReviewsContacts from '@/components/DeliveryReviewsContacts';
import { API_URLS } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  type: string;
  length: string;
  diameter: string;
  price: string;
  description: string;
}

interface Review {
  id: number;
  company: string;
  author: string;
  position: string;
  text: string;
  rating: number;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(API_URLS.products)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]));

    fetch(API_URLS.reviews)
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]));
  }, []);

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
