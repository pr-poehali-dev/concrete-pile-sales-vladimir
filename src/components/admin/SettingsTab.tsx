import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingsTabProps {
  oldPassword: string;
  setOldPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  changingPassword: boolean;
  handleChangePassword: (e: React.FormEvent) => void;
}

const SettingsTab = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  changingPassword,
  handleChangePassword,
}: SettingsTabProps) => {
  return (
    <TabsContent value="settings" className="mt-6">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Смена пароля</CardTitle>
          <CardDescription>
            После смены пароля другие сеансы входа будут завершены
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label className="mb-2 block">Текущий пароль</Label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label className="mb-2 block">Новый пароль</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <Button type="submit" disabled={changingPassword}>
              {changingPassword ? "Сохранение..." : "Сменить пароль"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SettingsTab;
