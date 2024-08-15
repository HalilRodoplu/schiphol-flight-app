Bu uygulama AMS Schiphol havaalanının api'ına bağlanarak uçuş verilerini sıralayan ve seçilen uçuşları MongoDB'ye satın alınmış bir bilet gibi kaydeden bir NextJS uygulamasıdır.


Kurulum Aşaması:

1-) Projeyi indirdikten sonra "npm install" ile gerekli kurulumları yapınız.

2-) "npx shadcn-ui@latest init" komutuyla shadcn kurulumunu gerçekleştirin. Shadcn ile button varyantları özelleştirilmiştir.
    ShadCN kurulumunu yaparken bu şekilde seçiniz.

    ✔ Which style would you like to use? › Default

    ✔ Which color would you like to use as base color? › Slate

    ✔ Would you like to use CSS variables for colors? … yes

3-) root dizine ".env.local" dosyası oluşturun.

4-) .env.local içerisine geçerli keyleri ve valueları giriniz.

    NEXT_PUBLIC_APP_ID=

    NEXT_PUBLIC_APP_KEY=

    MONGO_URI=

5-) "npm run dev" komutuyla kodu çalıştırın.


Web application önizlemelerine buradan göz atabilirsiniz.

Ön İzleme

Biletlerim sayfası boş gösterim.

![Biletlerim sayfasi bos gosterim](public/appfellas/empty-tickets-page.png)

Uçuşlar sayfası.

![Ucuslarim_sayfasi](public/appfellas/flights-page.png)

Bilet seçenekleri ve satın alınamaz biletler.

![Bilet_secenekleri_ve_erisilemez_biletler](public/appfellas/flight-options-unavailable-flight.png)

Bilet satın alma aşaması uyarıları.

Başarılı satis.

![Basrili_satis](public/appfellas/success.png)

Uyarı.

![Bilet_secenegi_eksik](public/appfellas/warning.png)

Başarısız satış.

![Basarısiz_satis](public/appfellas/error.png)

Biletlerim sayfası

![Biletlerim_sayfasi](public/appfellas/tickets-page.png)