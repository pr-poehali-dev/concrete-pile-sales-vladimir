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
import { API_URLS } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadComment, setLeadComment] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(API_URLS.reviews, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: name, text, rating: 5 }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить отзыв. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitting(true);
    try {
      const res = await fetch(API_URLS.leads, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          comment: leadComment,
        }),
      });
      if (!res.ok) throw new Error();
      setLeadSubmitted(true);
      setLeadName("");
      setLeadPhone("");
      setLeadComment("");
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setLeadSubmitting(false);
    }
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
              onClick={() => setOpen(true)}
              className="bg-accent text-accent-foreground font-bold text-base px-8 py-6 shadow-[4px_4px_0px_#92660a] hover:shadow-[2px_2px_0px_#92660a] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 uppercase tracking-widest"
            >
              <Icon name="MessageSquarePlus" size={22} className="mr-2" />
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
                    disabled={submitting}
                  >
                    <Icon name="Send" size={18} className="mr-2" />
                    {submitting ? "Отправка..." : "Отправить"}
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
                {leadSubmitted ? (
                  <div className="text-center py-8">
                    <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                      <Icon
                        name="CheckCircle"
                        size={40}
                        className="text-accent"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Спасибо за заявку!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Мы свяжемся с вами в течение 15 минут.
                    </p>
                    <Button
                      onClick={() => setLeadSubmitted(false)}
                      className="bg-accent hover:bg-accent/90"
                    >
                      Отправить ещё одну
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleLeadSubmit}>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Ваше имя
                      </label>
                      <Input
                        placeholder="Иван Иванов"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Телефон
                      </label>
                      <Input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Комментарий (необязательно)
                      </label>
                      <Textarea
                        placeholder="Расскажите о вашем проекте..."
                        rows={4}
                        value={leadComment}
                        onChange={(e) => setLeadComment(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-accent text-accent-foreground font-bold text-base shadow-[4px_4px_0px_#92660a] hover:shadow-[2px_2px_0px_#92660a] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 uppercase tracking-widest"
                      size="lg"
                      disabled={leadSubmitting}
                    >
                      <Icon name="Send" size={20} className="mr-2" />
                      {leadSubmitting ? "Отправка..." : "Отправить заявку"}
                    </Button>
                  </form>
                )}
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
                        className="text-foreground font-medium hover:text-accent transition-colors"
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
                        href="mailto:vladsvai33@mail.ru"
                        className="text-foreground font-medium hover:text-accent transition-colors"
                      >
                        vladsvai33@mail.ru
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
                      <p className="text-foreground font-medium">
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
                      <p className="text-foreground font-medium">
                        Пн-Вс: 8:00 - 20:00
                      </p>
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