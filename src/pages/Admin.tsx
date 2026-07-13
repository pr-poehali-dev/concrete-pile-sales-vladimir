import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import {
  API_URLS,
  authHeaders,
  getAdminToken,
  setAdminToken,
  clearAdminToken,
} from "@/lib/api";
import AdminLogin from "@/components/admin/AdminLogin";
import ProductsTab from "@/components/admin/ProductsTab";
import ReviewsAndLeadsTab from "@/components/admin/ReviewsAndLeadsTab";
import SettingsTab from "@/components/admin/SettingsTab";

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
  image_url: string;
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
  image_url: "",
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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

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
      if (!pRes.ok || !rRes.ok || !lRes.ok) throw new Error();
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
    const res = await fetch(`${API_URLS.products}?id=${id}`, { method: "DELETE", headers: authHeaders() });
    if (!res.ok) {
      toast({ title: "Ошибка", description: "Не удалось удалить товар", variant: "destructive" });
      return;
    }
    loadData();
  };

  const togglePublish = async (review: Review) => {
    const res = await fetch(API_URLS.reviews, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ ...review, is_published: !review.is_published }),
    });
    if (!res.ok) {
      toast({ title: "Ошибка", description: "Не удалось изменить статус отзыва", variant: "destructive" });
      return;
    }
    loadData();
  };

  const deleteReview = async (id: number) => {
    if (!confirm("Удалить отзыв?")) return;
    const res = await fetch(`${API_URLS.reviews}?id=${id}`, { method: "DELETE", headers: authHeaders() });
    if (!res.ok) {
      toast({ title: "Ошибка", description: "Не удалось удалить отзыв", variant: "destructive" });
      return;
    }
    loadData();
  };

  const toggleProcessed = async (lead: Lead) => {
    const res = await fetch(API_URLS.leads, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ id: lead.id, is_processed: !lead.is_processed }),
    });
    if (!res.ok) {
      toast({ title: "Ошибка", description: "Не удалось изменить статус заявки", variant: "destructive" });
      return;
    }
    loadData();
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Удалить заявку?")) return;
    const res = await fetch(`${API_URLS.leads}?id=${id}`, { method: "DELETE", headers: authHeaders() });
    if (!res.ok) {
      toast({ title: "Ошибка", description: "Не удалось удалить заявку", variant: "destructive" });
      return;
    }
    loadData();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangingPassword(true);
    try {
      const res = await fetch(`${API_URLS.adminAuth}?action=change_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось сменить пароль",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Готово", description: "Пароль успешно изменён" });
      setOldPassword("");
      setNewPassword("");
    } finally {
      setChangingPassword(false);
    }
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
      <AdminLogin
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        loggingIn={loggingIn}
        handleLogin={handleLogin}
      />
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
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <ProductsTab
            products={products}
            productDialogOpen={productDialogOpen}
            setProductDialogOpen={setProductDialogOpen}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            emptyProduct={emptyProduct}
            saveProduct={saveProduct}
            deleteProduct={deleteProduct}
          />

          <ReviewsAndLeadsTab
            reviews={reviews}
            leads={leads}
            togglePublish={togglePublish}
            deleteReview={deleteReview}
            toggleProcessed={toggleProcessed}
            deleteLead={deleteLead}
          />

          <SettingsTab
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            changingPassword={changingPassword}
            handleChangePassword={handleChangePassword}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;