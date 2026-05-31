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
  priceValue: number;
  description: string;
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
            <Card key={index} className="hover:shadow-lg transition-all hover:scale-105 duration-200 bg-[#2e2e2e] border-[#3a3a3a]">
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
                  <Button size="sm" onClick={() => scrollToSection('contacts')}>Заказать</Button>
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