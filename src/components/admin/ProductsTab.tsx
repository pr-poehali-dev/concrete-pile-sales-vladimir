import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

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

interface ProductsTabProps {
  products: Product[];
  productDialogOpen: boolean;
  setProductDialogOpen: (open: boolean) => void;
  editingProduct: Product | Omit<Product, "id"> | null;
  setEditingProduct: (product: Product | Omit<Product, "id"> | null) => void;
  emptyProduct: Omit<Product, "id">;
  saveProduct: () => void;
  deleteProduct: (id: number) => void;
}

const ProductsTab = ({
  products,
  productDialogOpen,
  setProductDialogOpen,
  editingProduct,
  setEditingProduct,
  emptyProduct,
  saveProduct,
  deleteProduct,
}: ProductsTabProps) => {
  return (
    <>
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
                <TableHead>Фото</TableHead>
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
                  <TableCell>
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.type} className="h-10 w-10 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                        <Icon name="Image" size={16} className="text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
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
              <div>
                <Label className="mb-2 block">Ссылка на фото</Label>
                <Input
                  placeholder="https://..."
                  value={editingProduct.image_url}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                />
                {editingProduct.image_url && (
                  <img
                    src={editingProduct.image_url}
                    alt="Превью"
                    className="mt-2 h-24 w-24 rounded object-cover border border-border"
                  />
                )}
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
    </>
  );
};

export default ProductsTab;