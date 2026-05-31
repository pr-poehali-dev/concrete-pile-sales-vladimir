import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

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
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(false);
      setSubmitted(false);
      setName("");
      setText("");
    }
  };

  return (
    <>
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
              <Card key={index} className="transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-[#2e2e2e] border-[#3a3a3a] shadow-[4px_4px_0px_#1a1a1a,8px_8px_0px_#111] hover:shadow-[6px_6px_0px_rgba(234,179,8,0.3),12px_12px_0px_rgba(234,179,8,0.1)] cursor-pointer" style={{transform: 'perspective(800px) rotateX(1deg)'}}>
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className="text-accent fill-accent"
                      />
                    ))}
                  </div>
                  <CardTitle className="text-base">{review.company}</CardTitle>
                  <CardDescription>
                    {review.author} — {review.position}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    "{review.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90"
              onClick={() => setOpen(true)}
            >
              <Icon name="MessageSquarePlus" size={20} className="mr-2" />
              Оставить отзыв
            </Button>
          </div>

          <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Оставить отзыв</DialogTitle>
              </DialogHeader>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                    <Icon
                      name="CheckCircle"
                      size={40}
                      className="text-accent"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Спасибо за отзыв!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Мы ценим ваше мнение и обязательно его опубликуем.
                  </p>
                  <Button
                    onClick={() => handleClose(false)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Закрыть
                  </Button>
                </div>
              ) : (
                <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Ваше имя
                    </label>
                    <Input
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Ваш отзыв
                    </label>
                    <Textarea
                      placeholder="Расскажите о вашем опыте работы с нами..."
                      rows={5}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90"
                    size="lg"
                  >
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
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
                    <label className="text-sm font-medium mb-2 block">
                      Ваше имя
                    </label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Телефон
                    </label>
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
                  <Button
                    className="w-full bg-accent hover:bg-accent/90"
                    size="lg"
                  >
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
                        href="tel:+79157771550"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
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
                      <a
                        href="mailto:vladsvai@bk.ru"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        vladsvai@bk.ru
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
                        г. Владимир, ул. Промышленный проезд 5Б
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
                      <p className="text-muted-foreground">
                        Пн-Вс: 8:00 - 20:00
                      </p>
                      <p className="text-muted-foreground"></p>
                      <p className="text-muted-foreground"></p>
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
    </>
  );
};

export default DeliveryReviewsContacts;