import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  scrollToSection: (section: string) => void;
}

const Footer = ({ scrollToSection }: FooterProps) => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Building2" size={28} className="text-accent" />
              <span className="text-xl font-bold">СваиВладимир</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Надёжный поставщик бетонных свай для профессионального
              строительства с 2010 года
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <nav className="space-y-2 text-sm">
              <button
                onClick={() => scrollToSection("catalog")}
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection("delivery")}
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Доставка
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection("contacts")}
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Контакты
              </button>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm">
              <a
                href="tel:+79157771550"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Icon name="Phone" size={16} />
                +7 (915) 777-15-50
              </a>
              <a
                href="mailto:info@svaivladimir.ru"
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
              >
                <Icon name="Mail" size={16} />
                merik.mametkuliyew@gmail.com
              </a>
              <p className="flex items-center gap-2 text-primary-foreground/80">
                <Icon name="MapPin" size={16} />
                г. Владимир
              </p>
            </div>
          </div>
        </div>
        <Separator className="bg-primary-foreground/20 mb-8" />
        <div className="text-center text-sm text-primary-foreground/60">
          © 2024 СваиВладимир. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
