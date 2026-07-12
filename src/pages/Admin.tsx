import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import {
  API_URLS,
  authHeaders,
  getAdminToken,
  setAdminToken,
  clearAdminToken,
} from "@/lib/api";

interface Product {
  id: number;
  name: string;
  type: string;
  length: string;
  diameter: string;
  price: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

interface Review {
  id: number;
  company: string;
  author: string;
  position: string;
  text: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

interface Lead {
  id: number;
  name: string;
  phone: string;
  comment: string;
  is_processed: boolean;
  created_at: string;
}

const emptyProduct: Omit<Product, "id"> = {
  name: "Сваи забивные железобетонные",
  type: "",
  length: "",
  diameter: "",
  price: "по запросу",
  description: "",
  sort_order: 0,
  is_active: true,
};

const Admin = () => {
  const { toast } = useToast();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | Omit<Product, "id"> | null>(null);

  const checkAuth = async () => {
    const token = getAdminToken();
    if (!token) {
      setAuthorized(false);
      return;
    }
    try {
      const res = await fetch(`${API_URLS.adminAuth}?action=check`, {
        headers: authHeaders(),
      });
      setAuthorized(res.ok);
    } catch {
      setAuthorized(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pRes, rRes, lRes] = await Promise.all([
        fetch(`${API_URLS.products}?all=1`, { headers: authHeaders() }),
        fetch(`${API_URLS.reviews}?all=1`, { headers: authHeaders() }),
        fetch(API_URLS.leads, { headers: authHeaders() }),
      ]);
      setProducts(await pRes.json());
      setReviews(await rRes.json());
      setLeads(await lRes.json());
    } catch {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить данные",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) loadData();
  }, [authorized]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const res = await fetch(`${API_URLS.adminAuth}?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Ошибка входа",
          description: data.error || "Неверный логин или пароль",
          variant: "destructive",
        });
        return;
      }
      setAdminToken(data.token);
      setAuthorized(true);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_URLS.adminAuth}?action=logout`, {
      method: "POST",
      headers: authHeaders(),
    });
    clearAdminToken();
    setAuthorized(false);
  };

  const saveProduct = async () => {
    if (!editingProduct) return;
    const isNew = !("id" in editingProduct);
    const res = await fetch(API_URLS.products, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(editingProduct),
    });
    if (!res.ok) {
      toast({ title: "Ошибка", description: "Не удалось сохранить товар", variant: "destructive" });
      return;
    }
    setProductDialogOpen(false);
    setEditingProduct(null);
    loadData();
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Удалить товар?")) return;
    await fetch(`${API_URLS.products}?id=${id}`, { method: "DELETE", headers: authHeaders() });
    loadData();
  };

  const togglePublish = async (review: Review) => {
    await fetch(API_URLS.reviews, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ ...review, is_published: !review.is_published }),
    });
    loadData();
  };

  const deleteReview = async (id: number) => {
    if (!confirm("Удалить отзыв?")) return;
    await fetch(`${API_URLS.reviews}?id=${id}`, { method: "DELETE", headers: authHeaders() });
    loadData();
  };

  const toggleProcessed = async (lead: Lead) => {
    await fetch(API_URLS.leads, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ id: lead.id, is_processed: !lead.is_processed }),
    });
    loadData();
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Удалить заявку?")) return;
    await fetch(`${API_URLS.leads}?id=${id}`, { method: "DELETE", headers: authHeaders() });
    loadData();
  };

  if (authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Вход в админ-панель</CardTitle>
            <CardDescription>Введите логин и пароль</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="mb-2 block">Логин</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div>
                <Label className="mb-2 block">Пароль</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loggingIn}>
                {loggingIn ? "Вход..." : "Войти"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <Button variant="outline" onClick={handleLogout}>
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Icon name="Loader2" className="animate-spin" size={18} />
            Загрузка данных...
          </div>
        )}
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            <TabsTrigger value="leads">
              Заявки
              {leads.filter((l) => !l.is_processed).length > 0 && (
                <span className="ml-2 bg-accent text-accent-foreground rounded-full px-2 text-xs">
                  {leads.filter((l) => !l.is_processed).length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="flex justify-end mb-4">
              <Button
                onClick={() => {
                  setEditingProduct({ ...emptyProduct });
                  setProductDialogOpen(true);
                }}
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить товар
              </Button>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Тип</TableHead>
                    <TableHead>Длина</TableHead>
                    <TableHead>Диаметр</TableHead>
                    <TableHead>Цена</TableHead>
                    <TableHead>Активен</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.type}</TableCell>
                      <TableCell>{p.length}</TableCell>
                      <TableCell>{p.diameter}</TableCell>
                      <TableCell>{p.price}</TableCell>
                      <TableCell>{p.is_active ? "Да" : "Нет"}</TableCell>
                      <TableCell className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(p);
                            setProductDialogOpen(true);
                          }}
                        >
                          <Icon name="Pencil" size={16} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteProduct(p.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Автор</TableHead>
                    <TableHead>Компания</TableHead>
                    <TableHead>Текст</TableHead>
                    <TableHead>Опубликован</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.author}</TableCell>
                      <TableCell>{r.company}</TableCell>
                      <TableCell className="max-w-xs truncate">{r.text}</TableCell>
                      <TableCell>
                        <Switch checked={r.is_published} onCheckedChange={() => togglePublish(r)} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="destructive" onClick={() => deleteReview(r.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="mt-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Имя</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Комментарий</TableHead>
                    <TableHead>Обработана</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((l) => (
                    <TableRow key={l.id} className={l.is_processed ? "opacity-50" : ""}>
                      <TableCell>{l.name}</TableCell>
                      <TableCell>
                        <a href={`tel:${l.phone}`} className="text-accent">
                          {l.phone}
                        </a>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{l.comment}</TableCell>
                      <TableCell>
                        <Switch checked={l.is_processed} onCheckedChange={() => toggleProcessed(l)} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="destructive" onClick={() => deleteLead(l.id)}>
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct && "id" in editingProduct ? "Редактировать товар" : "Новый товар"}</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Название</Label>
                <Input
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Тип (маркировка)</Label>
                  <Input
                    value={editingProduct.type}
                    onChange={(e) => setEditingProduct({ ...editingProduct, type: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Цена</Label>
                  <Input
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Длина</Label>
                  <Input
                    value={editingProduct.length}
                    onChange={(e) => setEditingProduct({ ...editingProduct, length: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Диаметр</Label>
                  <Input
                    value={editingProduct.diameter}
                    onChange={(e) => setEditingProduct({ ...editingProduct, diameter: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Описание</Label>
                <Textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingProduct.is_active}
                  onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, is_active: checked })}
                />
                <Label>Показывать на сайте</Label>
              </div>
              <Button className="w-full" onClick={saveProduct}>
                Сохранить
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;