import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section
      id="home"
      className="relative min-h-[600px] flex items-center justify-center text-primary-foreground overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary/90 bg-[length:200%_200%] animate-gradient-shift" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 animate-float"
        style={{
          backgroundImage:
            'url(https://cdn.poehali.dev/projects/18820996-abf2-4c3a-9ca8-6f4059ff29cd/files/c2b807c7-cb21-4eb8-b046-80c92f3b6336.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.1),transparent_50%)]" />
      <div className="container relative z-10 text-center py-20">
        <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90">
          Работаем с 2010 года
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          Бетонные сваи во Владимире
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
          Надёжный фундамент для вашего строительства. Доставка от 1 дня. Гарантия качества.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
            onClick={() => scrollToSection('catalog')}
          >
            <Icon name="Package" size={20} className="mr-2" />
            Смотреть каталог
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8"
            onClick={() => scrollToSection('contacts')}
          >
            <Icon name="Phone" size={20} className="mr-2" />
            Получить консультацию
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          <Card className="border-primary-foreground/20 bg-background/10 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2 text-primary-foreground">Доставка от 1 дня</h3>
              <p className="text-sm text-primary-foreground/80">По Владимиру и области</p>
            </CardContent>
          </Card>
          <Card className="border-primary-foreground/20 bg-background/10 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <Icon name="Award" size={48} className="mx-auto mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2 text-primary-foreground">ГОСТ 19804-2012</h3>
              <p className="text-sm text-primary-foreground/80">Сертифицированная продукция</p>
            </CardContent>
          </Card>
          <Card className="border-primary-foreground/20 bg-background/10 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2 text-primary-foreground">500+ проектов</h3>
              <p className="text-sm text-primary-foreground/80">Довольных клиентов</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
