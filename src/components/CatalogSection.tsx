import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  name: string;
  type: string;
  length: string;
  diameter: string;
  price: string;
  description: string;
  image_url?: string;
}

interface CatalogSectionProps {
  products: Product[];
  scrollToSection: (section: string) => void;
}

const CatalogSection = ({ products, scrollToSection }: CatalogSectionProps) => {
  return (
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
            <Card key={index} className="group transition-all duration-300 hover:-translate-y-1 bg-card border border-border/80 border-t-2 border-t-accent/70 shadow-md hover:shadow-xl hover:border-accent/60 overflow-hidden">
              {product.image_url && (
                <div className="h-40 w-full overflow-hidden bg-muted">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">{product.type}</Badge>
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
                  <span className="text-2xl font-bold text-accent">{product.price}</span>
                  <Button size="sm" onClick={() => scrollToSection('contacts')} className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Заказать</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;