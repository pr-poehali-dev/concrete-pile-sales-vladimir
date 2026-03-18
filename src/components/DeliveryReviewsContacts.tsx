import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Review {
  company: string;
  author: string;
  position: string;
  text: string;
  rating: number;
}

interface DeliveryReviewsContactsProps {
  reviews: Review[];
}

const DeliveryReviewsContacts = ({ reviews }: DeliveryReviewsContactsProps) => {
  return (
    <>
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
                  <h3 className="text-lg font-semibold mb-2">Особые условия для строительных компаний</h3>
                  <p className="text-muted-foreground">
                    Для постоянных клиентов и крупных заказов предоставляем скидки до 15%, отсрочку платежа и бесплатную доставку
                  </p>
                </div>
                <Button className="bg-accent hover:bg-accent/90">Узнать подробнее</Button>
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
                  <CardTitle className="text-base">{review.company}</CardTitle>
                  <CardDescription>
                    {review.author} — {review.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{review.text}"</p>
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
                <CardDescription>Мы свяжемся с вами в течение 15 минут</CardDescription>
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
                    <label className="text-sm font-medium mb-2 block">Комментарий (необязательно)</label>
                    <Textarea placeholder="Расскажите о вашем проекте..." rows={4} />
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
                      <a href="tel:+79157771550" className="text-muted-foreground hover:text-accent transition-colors">
                        +7 (915) 777-15-50
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
                      <a href="mailto:info@svaivladimir.ru" className="text-muted-foreground hover:text-accent transition-colors">
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
                      <p className="text-muted-foreground">г. Владимир, ул. Промышленная, 15</p>
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
                      <h3 className="font-semibold text-lg mb-1">Бесплатная консультация</h3>
                      <p className="text-sm text-primary-foreground/80">Поможем подобрать сваи под ваш проект</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeliveryReviewsContacts;