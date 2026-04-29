import Icon from '@/components/ui/icon';

interface HeaderProps {
  scrollToSection: (section: string) => void;
}

const Header = ({ scrollToSection }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2L37 10V28C37 36 20 44 20 44C20 44 3 36 3 28V10L20 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
            <line x1="20" y1="12" x2="20" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <polygon points="20,8 22,13 18,13" fill="white"/>
            <line x1="13" y1="14" x2="11" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <polygon points="13,10 15,15 11,15" fill="white"/>
            <line x1="27" y1="14" x2="29" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <polygon points="27,10 29,15 25,15" fill="white"/>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-[0.15em] uppercase">СВАИ</span>
            <span className="text-[9px] font-medium tracking-[0.25em] text-muted-foreground uppercase">Забивка свай</span>
          </div>
        </div>
        <nav className="hidden md:flex gap-6">
          <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-accent transition-colors">Главная</button>
          <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-accent transition-colors">Каталог</button>
          <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium hover:text-accent transition-colors">Отзывы</button>
          <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-accent transition-colors">Контакты</button>
        </nav>
        <div className="flex items-center gap-2">
          <Icon name="Phone" size={20} className="text-accent" />
          <a href="tel:+79157771550" className="text-sm font-semibold">+7 (915) 777-15-50</a>
        </div>
      </div>
    </header>
  );
};

export default Header;