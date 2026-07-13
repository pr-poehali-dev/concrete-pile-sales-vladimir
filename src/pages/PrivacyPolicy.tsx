import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-3xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            На главную
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-6">
          Политика обработки персональных данных
        </h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              1. Общие положения
            </h2>
            <p>
              Настоящая Политика определяет порядок обработки и защиты
              персональных данных пользователей сайта «СваиВладимир»
              (далее — Оператор). Оператор обязуется соблюдать
              конфиденциальность персональных данных в соответствии с
              Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных
              данных».
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              2. Какие данные собираются
            </h2>
            <p>
              При заполнении форм на сайте (заявка на консультацию, форма
              отзыва) Оператор может собирать: имя, номер телефона,
              комментарий к заявке, текст отзыва.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              3. Цели обработки данных
            </h2>
            <p>
              Персональные данные используются исключительно для связи с
              пользователем по вопросам консультации, расчёта стоимости и
              доставки продукции, а также для публикации отзывов на сайте
              (с согласия автора).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              4. Защита данных
            </h2>
            <p>
              Оператор принимает необходимые организационные и технические
              меры для защиты персональных данных от неправомерного
              доступа, изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              5. Передача данных третьим лицам
            </h2>
            <p>
              Оператор не передаёт персональные данные третьим лицам, за
              исключением случаев, предусмотренных законодательством
              Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              6. Права пользователя
            </h2>
            <p>
              Пользователь вправе в любой момент отозвать согласие на
              обработку персональных данных, направив соответствующий
              запрос на контактную почту, указанную на сайте.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              7. Контакты
            </h2>
            <p>
              По всем вопросам, связанным с обработкой персональных данных,
              можно обратиться по телефону +7 (915) 777-15-50 или
              электронной почте vladsvai@bk.ru.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
