import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
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
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadComment, setLeadComment] = useState("");
  const [leadWebsite, setLeadWebsite] = useState("");
  const [leadConsent, setLeadConsent] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return;
    if (!consent) {
      toast({
        title: "Нужно согласие",
        description: "Подтвердите согласие на обработку персональных данных",
        variant: "destructive",
      });
      return;
    }
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
    if (leadWebsite) return;
    if (!leadConsent) {
      toast({
        title: "Нужно согласие",
        description: "Подтвердите согласие на обработку персональных данных",
        variant: "destructive",
      });
      return;
    }
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
      setLeadConsent(false);
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
      setConsent(false);
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
              <Card key={index} className="relative transition-all duration-300 hover:-translate-y-1 bg-card border border-border/80 border-l-2 border-l-accent/70 shadow-md hover:shadow-xl">
                <Icon name="Quote" size={28} className="absolute top-4 right-4 text-muted-foreground/20" />
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
              className="bg-accent text-accent-foreground font-semibold text-base px-8 py-6 shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all duration-200"
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
                  <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] w-px h-px opacity-0"
                    aria-hidden="true"
                  />
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="review-consent"
                      checked={consent}
                      onCheckedChange={(checked) => setConsent(checked === true)}
                    />
                    <label
                      htmlFor="review-consent"
                      className="text-xs text-muted-foreground leading-tight cursor-pointer"
                    >
                      Согласен на{" "}
                      <Link
                        to="/privacy-policy"
                        target="_blank"
                        className="underline hover:text-accent"
                      >
                        обработку персональных данных
                      </Link>
                    </label>
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
                    <input
                      type="text"
                      name="website"
                      value={leadWebsite}
                      onChange={(e) => setLeadWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute -left-[9999px] w-px h-px opacity-0"
                      aria-hidden="true"
                    />
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="lead-consent"
                        checked={leadConsent}
                        onCheckedChange={(checked) => setLeadConsent(checked === true)}
                      />
                      <label
                        htmlFor="lead-consent"
                        className="text-xs text-muted-foreground leading-tight cursor-pointer"
                      >
                        Согласен на{" "}
                        <Link
                          to="/privacy-policy"
                          target="_blank"
                          className="underline hover:text-accent"
                        >
                          обработку персональных данных
                        </Link>
                      </label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-accent text-accent-foreground font-semibold text-base shadow-lg hover:bg-accent/90 hover:shadow-xl transition-all duration-200"
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

              <Card className="overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?text=г. Владимир, ул. Промышленный проезд 5Б"
                  width="100%"
                  height="220"
                  frameBorder="0"
                  loading="lazy"
                  title="Карта проезда"
                  className="w-full"
                />
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