import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [calculatorData, setCalculatorData] = useState({
    pileType: 'С 60.30-5',
    quantity: 10,
    distance: 0,
  });
  const [calculatorResult, setCalculatorResult] = useState<{
    pilesTotal: number;
    deliveryTotal: number;
    total: number;
  } | null>(null);

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

  const calculatePrice = () => {
    const selectedProduct = products.find(p => p.type === calculatorData.pileType);
    if (!selectedProduct) return;

    const pilesTotal = selectedProduct.priceValue * calculatorData.quantity;
    let deliveryTotal = 0;

    if (calculatorData.distance > 0 && calculatorData.distance <= 50) {
      deliveryTotal = 2000;
    } else if (calculatorData.distance > 50 && calculatorData.distance <= 100) {
      deliveryTotal = 3500;
    } else if (calculatorData.distance > 100) {
      deliveryTotal = 3500 + (calculatorData.distance - 100) * 30;
    }

    setCalculatorResult({
      pilesTotal,
      deliveryTotal,
      total: pilesTotal + deliveryTotal,
    });
  };

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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Building2" size={28} className="text-accent" />
            <span className="text-xl font-bold">СваиВладимир</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection('catalog')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Каталог
            </button>
            <button
              onClick={() => scrollToSection('delivery')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Доставка
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Отзывы
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Контакты
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <Icon name="Phone" size={20} className="text-accent" />
            <a href="tel:+74922123456" className="text-sm font-semibold">
              +7 (4922) 12-34-56
            </a>
          </div>
        </div>
      </header>

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
            Надёжный фундамент для вашего строительства. Доставка от 1 дня.
            Гарантия качества.
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
                <h3 className="text-lg font-semibold mb-2 text-primary-foreground">
                  Доставка от 1 дня
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  По Владимиру и области
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary-foreground/20 bg-background/10 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <Icon name="Award" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-semibold mb-2 text-primary-foreground">
                  ГОСТ 19804-2012
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  Сертифицированная продукция
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary-foreground/20 bg-background/10 backdrop-blur">
              <CardContent className="pt-6 text-center">
                <Icon name="Users" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-semibold mb-2 text-primary-foreground">
                  500+ проектов
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  Довольных клиентов
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent/5 border-y border-accent/10">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Калькулятор стоимости</h2>
            <p className="text-muted-foreground">Рассчитайте предварительную стоимость свай с доставкой</p>
          </div>
          <Card className="border-accent/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Тип сваи</label>
                  <select
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    value={calculatorData.pileType}
                    onChange={(e) => {
                      setCalculatorData({ ...calculatorData, pileType: e.target.value });
                      setCalculatorResult(null);
                    }}
                  >
                    {products.map((product) => (
                      <option key={product.type} value={product.type}>
                        {product.type} ({product.length})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Количество (шт)</label>
                  <Input
                    type="number"
                    min="1"
                    value={calculatorData.quantity}
                    onChange={(e) => {
                      setCalculatorData({ ...calculatorData, quantity: parseInt(e.target.value) || 1 });
                      setCalculatorResult(null);
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Расстояние (км)</label>
                  <Input
                    type="number"
                    min="0"
                    value={calculatorData.distance}
                    onChange={(e) => {
                      setCalculatorData({ ...calculatorData, distance: parseInt(e.target.value) || 0 });
                      setCalculatorResult(null);
                    }}
                  />
                </div>
              </div>
              <Button
                className="w-full bg-accent hover:bg-accent/90 mb-6"
                size="lg"
                onClick={calculatePrice}
              >
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
              {calculatorResult && (
                <div className="bg-muted/50 rounded-lg p-6 space-y-3 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Стоимость свай:</span>
                    <span className="font-semibold text-lg">{calculatorResult.pilesTotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Доставка:</span>
                    <span className="font-semibold text-lg">
                      {calculatorResult.deliveryTotal === 0 ? 'Бесплатно' : `${calculatorResult.deliveryTotal.toLocaleString('ru-RU')} ₽`}
                    </span>
                  </div>
                  <Separator className="bg-accent/20" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-semibold">Итого:</span>
                    <span className="text-3xl font-bold text-accent">{calculatorResult.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    * Точная стоимость уточняется у менеджера
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Каталог продукции</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Железобетонные забивные сваи различных типоразмеров для любых задач
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all hover:scale-105 duration-200"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.type}
                    </Badge>
                    <Icon name="CheckCircle2" size={20} className="text-accent" />
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Ruler" size={16} className="text-muted-foreground" />
                      <span>Длина: {product.length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Circle" size={16} className="text-muted-foreground" />
                      <span>Диаметр: {product.diameter}</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">
                      {product.price}
                    </span>
                    <Button size="sm" onClick={() => scrollToSection('contacts')}>
                      Заказать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Доставка</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Оперативная доставка по Владимиру и Владимирской области
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Icon name="MapPin" size={24} className="text-accent" />
                  </div>
                  <CardTitle>Зоны доставки</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">г. Владимир</span>
                  <Badge>Бесплатно</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">До 50 км</span>
                  <span className="text-muted-foreground">от 2 000 ₽</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">До 100 км</span>
                  <span className="text-muted-foreground">от 3 500 ₽</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Более 100 км</span>
                  <span className="text-muted-foreground">договорная</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Icon name="Clock" size={24} className="text-accent" />
                  </div>
                  <CardTitle>Сроки доставки</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">В наличии</span>
                  <Badge variant="secondary">1-2 дня</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Под заказ</span>
                  <span className="text-muted-foreground">3-7 дней</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Срочный заказ</span>
                  <span className="text-muted-foreground">в день заказа</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">График</span>
                  <span className="text-muted-foreground">Пн-Сб 8:00-18:00</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 max-w-5xl mx-auto bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Icon name="Info" size={32} className="text-accent" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold mb-2">
                    Особые условия для строительных компаний
                  </h3>
                  <p className="text-muted-foreground">
                    Для постоянных клиентов и крупных заказов предоставляем скидки до 15%,
                    отсрочку платежа и бесплатную доставку
                  </p>
                </div>
                <Button className="bg-accent hover:bg-accent/90">
                  Узнать подробнее
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Нам доверяют строительные компании и частные застройщики
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.company}</CardTitle>
                  <CardDescription>
                    {review.author} — {review.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{review.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами удобным способом
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Оставьте заявку</CardTitle>
                <CardDescription>
                  Мы свяжемся с вами в течение 15 минут
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <Input type="tel" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Комментарий (необязательно)
                    </label>
                    <Textarea
                      placeholder="Расскажите о вашем проекте..."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90" size="lg">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Наши контакты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="Phone" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <a
                        href="tel:+74922123456"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        +7 (4922) 12-34-56
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="Mail" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a
                        href="mailto:info@svaivladimir.ru"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        info@svaivladimir.ru
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="MapPin" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-muted-foreground">
                        г. Владимир, ул. Промышленная, 15
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon name="Clock" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-muted-foreground">Пн-Пт: 8:00 - 18:00</p>
                      <p className="text-muted-foreground">Сб: 9:00 - 15:00</p>
                      <p className="text-muted-foreground">Вс: выходной</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Icon name="Headphones" size={40} className="text-accent" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Бесплатная консультация
                      </h3>
                      <p className="text-sm text-primary-foreground/80">
                        Поможем подобрать сваи под ваш проект
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Building2" size={28} className="text-accent" />
                <span className="text-xl font-bold">СваиВладимир</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Надёжный поставщик бетонных свай для профессионального строительства
                с 2010 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <nav className="space-y-2 text-sm">
                <button
                  onClick={() => scrollToSection('catalog')}
                  className="block text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Каталог
                </button>
                <button
                  onClick={() => scrollToSection('delivery')}
                  className="block text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Доставка
                </button>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="block text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Отзывы
                </button>
                <button
                  onClick={() => scrollToSection('contacts')}
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
                  href="tel:+74922123456"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <Icon name="Phone" size={16} />
                  +7 (4922) 12-34-56
                </a>
                <a
                  href="mailto:info@svaivladimir.ru"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <Icon name="Mail" size={16} />
                  info@svaivladimir.ru
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
    </div>
  );
};

export default Index;