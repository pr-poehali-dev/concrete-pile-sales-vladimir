import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  scrollToSection: (section: string) => void;
}

const Header = ({ scrollToSection }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (section: string) => {
    scrollToSection(section);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button onClick={() => handleNav('home')} className="flex items-center">
          <img
            src="https://cdn.poehali.dev/projects/18820996-abf2-4c3a-9ca8-6f4059ff29cd/bucket/99f5cecf-7eee-4813-ae33-2814e7946c42.jpg"
            alt="Сваи — Забивка свай"
            className="h-12 w-auto object-contain rounded-md"
          />
        </button>

        <nav className="hidden md:flex gap-6">
          <button onClick={() => handleNav('home')} className="text-sm font-medium hover:text-accent transition-colors">Главная</button>
          <button onClick={() => handleNav('catalog')} className="text-sm font-medium hover:text-accent transition-colors">Каталог</button>
          <button onClick={() => handleNav('reviews')} className="text-sm font-medium hover:text-accent transition-colors">Отзывы клиентов</button>
          <button onClick={() => handleNav('contacts')} className="text-sm font-medium hover:text-accent transition-colors">Контакты</button>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Icon name="Phone" size={20} className="text-accent" />
            <a href="tel:+79157771550" className="text-sm font-semibold">+7 (915) 777-15-50</a>
          </div>
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container flex flex-col py-4 gap-1">
            <button onClick={() => handleNav('home')} className="text-left px-3 py-3 rounded-md text-sm font-medium hover:bg-muted hover:text-accent transition-colors">Главная</button>
            <button onClick={() => handleNav('catalog')} className="text-left px-3 py-3 rounded-md text-sm font-medium hover:bg-muted hover:text-accent transition-colors">Каталог</button>
            <button onClick={() => handleNav('reviews')} className="text-left px-3 py-3 rounded-md text-sm font-medium hover:bg-muted hover:text-accent transition-colors">Отзывы клиентов</button>
            <button onClick={() => handleNav('contacts')} className="text-left px-3 py-3 rounded-md text-sm font-medium hover:bg-muted hover:text-accent transition-colors">Контакты</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;