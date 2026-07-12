import { Button } from "@/components/ui/button";
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
import Icon from "@/components/ui/icon";

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

interface ReviewsAndLeadsTabProps {
  reviews: Review[];
  leads: Lead[];
  togglePublish: (review: Review) => void;
  deleteReview: (id: number) => void;
  toggleProcessed: (lead: Lead) => void;
  deleteLead: (id: number) => void;
}

const ReviewsAndLeadsTab = ({
  reviews,
  leads,
  togglePublish,
  deleteReview,
  toggleProcessed,
  deleteLead,
}: ReviewsAndLeadsTabProps) => {
  return (
    <>
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
    </>
  );
};

export default ReviewsAndLeadsTab;
