import SignReqAssignModal from "@/components/signitures/req-assign/sign-modal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignContract() {
  const router = useRouter();
  const { data }: any = router.query;
  const parsedData = data ? JSON.parse(data) : null;

  // states
  const [signReqAssign, setSignReqAssign] = useState(false);

  return (
    <>
      <div className="flex relative items-start justify-between gap-10">
        <div className="w-[70%] pl-20 pr-10 overflow-auto max-h-[95vh]">
          <div className="font-bold text-center text-lg">
            TOPSHIRIQ SHARTNOMASI. № {parsedData?.contractNumber || "-----"}
          </div>
          <div className="italic text-center">
            (tovar-bug‘doy sotib olish, tashish, saqlash va yuklash to‘g‘risida)
          </div>
          <div className="flex items-center justify-between gap-10">
            <div>08.07.2024</div>
            <div>
              {parsedData?.partnersDto?.districtDto[0]?.name || "-----"}
            </div>
          </div>
          <div>
            O'zbekiston Respublikasi Igtisodiyot va moliya vazirligi huzuridagi
            Qishloq xo'jaligini davlat tomonidan qo'llab-quvvatlash jamg'amasini
            boshqarish departamenti (keyingi o'nnlarda -{" "}
            <span className="font-bold">"Topshiriq benuvchi"</span>) nomidan
            Jamg'ama nizomiga asosan faoliyat yurituvchi Jamg'amani boshqarish
            departamenti direktori A.A.Isroilov bir tomondan, "Topshiriq
            benuvchi"ning nomidan va uning hisobidan muzyyan yuridik harakatlami
            sodir etish magburiyatini oluvchi SHIMBAY DAN QO SHIMCHA
            MAS'ULIYATLI JAMIYAT (keyingi o'nnlarda -{" "}
            <span className="font-bold">"Tijorat vakili"</span>) nomidan Nizom
            asosida faoliyat yurituvchi aksiyadorlik jamiyati Boshqaruvi raisi
            KADIROV KAMILDJAN KADIROVICH ikkinchi tomondan, birgalikda
            "Taraflar", alohida esa "Taraf" deb ataluvchilar mazkur shartnomani
            quyidagilar to'g'risida tuzdilar.
          </div>
          <div className="mt-5 text-center text-xl font-bold">
            I. SHARTNOMA PREDMETI
          </div>
          <div>
            <span className="font-bold">1.1.</span> Ushbu shartnoma bo'yicha
            "Topshiriq benuvchi" O'zbekiston Respublikasi Vazirlar Mahkamasining
            2024 yil 11 iyundagi "2024 yil hosilidan bug'doy xarid qilish va
            ichki bozorda narxlar barqarorligini ta'minlash chora-tadbirlari to
            'g'risida"gi 325-sonli qaroriga muvofiq, mazkur shartnoma bo'yicha
            "Tijorat vakili" "Topshiriq benuvchi" nomidan va uning hisobidan
            quyidagi yuridik harakatlami sodir etish, "Topshiriq benuvchi" esa
            "Tijorat vakili"ga yuridik harakatlami sodir etish bilan bog'liq
            xarajatlar uchun ushbu shartnomada belgilangan shartlar asosida haq
            to'lash majburiyatini oladi:
          </div>
          <div>
            a) fermer xo'jaliklari va g'allachilik klasterlari (keyingi
            o'ninlarda - bug'doy yetishtiruvchilar) bilan tovarbug'doy yetkazib
            berish to'g'risida shartnomalar tuzzan holda quyidagi talablar
            asosida tovar-bug'doy sotib olish:
          </div>

          {/* table */}
          <div className="w-full my-3 text-center">
            <table className="border w-full border-black">
              <thead>
                <tr>
                  <th className="border-r max-w-[20%] truncate p-2 border-black">
                    T/r
                  </th>
                  <th className="border-r max-w-[20%] truncate p-2 border-black">
                    Mahsulot nomi
                  </th>
                  <th className="border-r max-w-[20%] truncate p-2 border-black">
                    Miqdori (tonna)
                  </th>
                  <th className="border-r max-w-[20%] truncate p-2 border-black">
                    Narxi
                  </th>
                  <th className="border-r max-w-[20%] truncate p-2 border-black">
                    Jami summa
                  </th>
                  <th className="border-r max-w-[10%] truncate p-2 border-black">
                    QQS
                  </th>
                </tr>
              </thead>
              <tbody>
                {parsedData?.applicationDtoList?.map(
                  (item: any, index: number) => (
                    <tr key={index} className="border-t border-black">
                      <td className="border-r max-w-[20%] truncate p-2 border-black">
                        {index + 1}
                      </td>
                      <td className="border-r max-w-[20%] truncate p-2 border-black">
                        {item?.productName || "-----"}
                      </td>
                      <td className="border-r max-w-[20%] truncate p-2 border-black">
                        {item?.productWeight || "-----"}
                      </td>
                      <td className="border-r max-w-[20%] truncate p-2 border-black">
                        {item?.productPrice || "-----"}
                      </td>
                      <td className="border-r max-w-[20%] truncate p-2 border-black">
                        {item?.allPrice || "-----"}
                      </td>
                      <td className="border-r max-w-[10%] truncate p-2 border-black">
                        {item?.qqos ? (
                          <Check className="text-blue-700 size-5 mx-auto" />
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <div>
            Bunda, "Tijorat vakili" va bug'doy yetishtiruvchilar o'rtasida
            tuziladigan tovar-bug'doy yetkazib berish to'g'risida
            shartnomalarda, haqiqatda yetkazib berilgan tovar-bug'doyning sifat
            ko'rsatkichlari asosida belgilangan tartibda hisob-kitob qilinadi.
          </div>
          <div>
            Ushbu shartnoma bo'yicha "Topshiriq benuvchi"ning topshing'iga
            asosan "Tijorat vakili" tomonidan bug'doy yetishtiruvchilardan sotib
            olinishi lozim bo'lgan tovar-bug'doy deganda belgilangan standart
            talablanga muvofiq sifat ko'rsatkichlari (namlik, ifloslik, donli
            aralashmasi, natura og'irligi, kleykovina miqdori va sifati) ga ega
            2024 yil hosiliga tegishli tovar-bug'doy tushuniladi.
          </div>
          <div>
            Tovar-bug'doyning sifati O'z DST 880.2015 bug'doy "Texnikaviy
            shartlar" talablanga javob berishi shart
          </div>
          <div>
            b.) bug'doy yetishtiruvchilardan sotib olingan tovar-bug'doyni
            belgilangan standart talablari asosida qqabul qilish;
          </div>
          <div>
            v.) bug'doy yetishtiruvchilardan sotib olingan tovar-bug'doyni
            belgilangan talablar asosida sifatli saqlash uchun "Topshiriq
            benuvchi"ning topshing'iga ko'ra ombor va (yoki) elevatorga tashib
            keltirish;
          </div>
          <div>
            g.) bug'doy yetishtiruvchilardan sotib olingan tovar-bug'doyni ombor
            va (yoki) elevatorda belgilangan talablar asosida sifatli saqlash;
          </div>
          <div>
            d.) zaruratga ko'ra, "Topshiriq benuvchi"ning yozma ko'rsatmasi
            asosida tovar-bug'doyni hududlararo yuklash va tashishni amalga
            oshirish;
          </div>
          <div>
            e.) ombor va (yoki) elevatorda saqlanayotgan tovar-bug'doyni
            "Topshiriq benuvchi"ning yozma ko'rsatmasiga asosan birja savdolari
            orqali sotib olgan xandor ko'rsatgan transport vostasiga (temir yo'l
            yoki avtomobil) yuklash.
          </div>
          <div>
            <span className="font-bold">1.2.</span> "Tijorat vakili" "Topshiriq
            benuvchi"ning nomidan va uning hisobidan barcha topshiriqlami va
            ko'rsatmalarini to'liq hajmda ijro etadi.
          </div>
          <div>
            <span className="font-bold">1.3.</span> "Topshiriq benuvchi",
            "Tijorat vakili"ga bug'doy sotib olish bilan bog'liq bo'lgan boshqa
            yuridik harakatami ham amalga oshirish bo'yicha topshiriglar berishi
            mumkin, bu holatda mazkur shartnomaga tegishli qo'shimcha kelishuv
            tuziladi.
          </div>
          <div>
            <span className="font-bold">1.4.</span> Mazkur shartnoma shartlarini
            bajarish maqsadida tuzzan bitimlar bo'yicha huquq va majburiyatlar
            ushbu shartnoma shartlari asosida bevosita "Tijorat vakili"da
            vujudga keladi.
          </div>
          <div className="mt-5 text-center font-bold">
            II. "TARAFLAR"NING HUQUQ VA MAJBURIYATLARI
          </div>
          <div className="font-bold">
            2.1. "Tijorat vakili" quyidagilarga majbur:
          </div>
          <div>
            2.1.1. o'ziga berilgan topshirigni "Topshiriq benuvchi"ning
            ko'rsatmasiga asosan shassan o'zi bajarish;
          </div>
          <div>
            2.1.2. "Topshiriq beruvchi"ning talabiga ko'ra, unga topshiriq
            qanday bajanlayotganligi to'g'risida barcha ma'lumotlami berib
            turish;
          </div>
          <div>
            2.1.3. mazkur shartnomaning 1.1-bandida ko'rsatilgan harakatlami
            amalga oshirish bo'yicha tuzialigan shartnomalami "Topshiniq
            beruvchi" tomonidan taqdim etilgan namunaviy shartnoma loyihasiga
            asosan tuzish;
          </div>
          <div>
            2.1.4. topshiriqni bajanish maqsadida tuzilgan shartnomalar bilan
            bog'liq barcha hujjatlami kechiktimasdan "Topshiriq benuvchi"ga
            topshirish;
          </div>
          <div>
            2.1.5. bug'doy yetishtiruvchilardan ushbu shartnomaning 1.1.-bandida
            ko'rsatib o'tilgan O'zDST 880:2015 bug'doy "Texnikaviy shartlar"
            talablarga javob beruvchi tovar-bug'doyni sotib olish;
          </div>
          <div>
            2.1.6. "Topshiriq beruvchi" tomonidan bug'doy sotib olish uchun
            "Tijorat vakili'ning 23210 maxsus hisobvarag'iga o'tkazilgan pul
            mablag'lan hisobidan 3 (uch) bank ish kunidan kechiktimasdan bug'doy
            yetishtiruvchilar bilan tuzilgan shartnomalar bo'yicha topshirilgan
            mahsulot hamda sifat sertifikatlan uchun hisob-kitobni amalga
            oshirish;
          </div>
          <div>
            2.1.7. sotib olingan bug'doy hisobini yuritish, ichki tashish va
            sifatli saqlash O'zbekiston Respublikasi Vazirlar Mahkamasining "Don
            va donni qayta ishlash mahsulotlari hisobini yuritish tizimini
            takomillashtinshga, ulaming saqlanishi ustidan nazoratni
            kuchaytirishga doir qo'shimcha chora-tadbirlar to'g'risida"gi 2006
            yil 25 maydagi 95 -son qaroni hamda "G'alla yetishtiruvchi
            xo'jaliklar va korxonalardan sotib olinadigan donni saqlash
            sohasidagi ayrim nomativ-huquqiy hujjatlami tasdiqlash
            to'g'risida"gi 2020 yil 22 maydagi 312 -son qaroniga muvofiq amalga
            oshirilishini ta'minlash;
          </div>
          <div>
            2.1.8. bug'doyni saqlashda belgilangan standartlarga hamda
            O'zbekiston Respublikasi Vazirlar Mahkamasining "Don xavfsizligi
            to'g'risidagi umumiy texnik reglamentni tasdiqlash haqjda"gi 2016
            yil 31 martdagi 99-son qaroni talablanga noya qilinishini
            ta'minlash;
          </div>
          <div>
            2.1.9. zaruriyatga ko'ra, "Topshiriq beruvchi"ning yozma ko'rsatmasi
            asosida tovar-bug'doyni hududlararo yuklash va ichki tashishni
            amalga oshirish;
          </div>
          <div>
            2.1.10. "Topshiriq beruvchi" tomonidan taydim etilgan yuklash
            yo'riqnomasiga (naryad) asosan ombor va (yoki) elevatorda
            saqlanayotgan tovar-bug'doyni birja savdolari orqali sotib olgan
            xaridor tomonidan taqdim etilgan transport (temir yo'l yoki
            avtomobil) vositasiga zudlik bilan yuklash, yuk xatini yoki
            topshirish va qabul qilish dalolatnomasini rasmiylashtirish;
          </div>
          <div>
            2.1.11. don saqlash sig'imida saqlanayotgan bug'doyni sotib olgan
            xaridonga yuklab jo'natganligi to'g'risidagi yuk xatini yoki
            topshirish va qabul qilish dalolatnomasini hamda qo'shilgan qymat
            solig'i hisobga olingan xarid narxidagi bug'doy qiymati ko'rsatilgan
            hisobvarag-fakturani keyingi ish kunidan kechiktimasdan "Topshiriq
            beruvchi"ga taqdim etish;
          </div>
          <div>
            2.1.12. topshiriq bajarib bo'lingandan keyin (yoki mazkur
            shartnomada nazarda tutilgan shartlar to'liq bagarilgunga qadar
            uning amal qilishi to'xtatilganda) topshiriq bajarilganligi
            to'g'risida hisobot taqdim etish.
          </div>
          <div>
            Hisobotga "Tijorat vakili"ning mazkur shartnomani bajarish bilan
            bog'liq xarajatlarini tasdiqlovchi hujjatlar ilova qilinadi.
          </div>
          <div>
            2.1.13. Jamg'armaning tijorat vakillari donni qabul qilish va
            omborlardan chiqarish jarayoni, shuningdek, Jamg'arma, tijorat
            vakili va bug'doy yetishtiruvchilar o'rtasidagi moliyaviy
            hisob-kitoblar tezkor va shaffof amalga oshirilishini ta'minlash
            maqsadida "d-xarid.uz" axborot tizimiga kiritiladigan ma'lumotlar
            haqqoniyligiga shaxsan javob beradi.
          </div>
          <div className="font-bold">
            2.2. "Topshiriq beruvchi" quyidagi huquq va majburiyatlarga ega:
          </div>
          <div>
            2.2.1. "Tijorat vakili"ga topshinqni bajarish bilan bog'liq
            xarajatlami qoplash;
          </div>
          <div>
            2.2.2. "Tijorat vakili"ni topshiriqni bajarish bchun zarur
            mablag'lar bilan ta'minlash;
          </div>
          <div>
            2.2.3. "Tijorat vakili"dan mazkur shartnomaga muvofiq bajarilgan
            barcha ishlami kechiktimasdan qabul qilib olish;
          </div>
          <div>
            2.2.4. "Tijorat vakili"ga mazkur shartnomaging III-bo'limida
            belgilangan tartibda haq to'lash.
          </div>
          <div>
            2.2.5. bug'doy yetishtiruvchilardan sotib olingan tovar-bug'doyni
            ombor va (yoki) elevatorda belgilangan talablar asosida sifatli
            saqlash hamda Jamg' armadan ajratilgan mablag'larni to'g'ri
            sarflanganligini o'rganish maqsadida Jamg'armaning "Jamg'arma
            mablag'laridan samarali foydalanilishini monitoring qilish" bo'limi
            hamda Davlat moliyaviy nazorati inspeksiyasi va uning hududiy
            boshqarmalarini jalb etish.
          </div>
          <div className="font-bold text-center mt-5">
            III. HISOB-KITOB QILISH VA "TIJORAT VAKILI'GA HAQ TO'LASH HAMDA
            UNING XARAJATLARINI QOPLASH TARTIBI
          </div>
          <div>
            <span className="font-bold">3.1.</span> "Topshiriq beruvchi"
            "Tijorat vakili" tomonidan taqdim etilgan buyurtmanoma asosida
            "Topshiriq beruvchi" nomidan tovar-bug'doy sotib olish uchun
            ochilgan "Tijorat vakili"ning 23210 maxsus hisobvarag'iga ikki xafta
            muddatda foizsiz mablag'lami o'tkazadi.
          </div>
          <div>
            Bunda, "Topshiriq beruvchi" tovar-bug'doy sotib olish uchun "Tijorat
            vakili" tomonidan taqdim etilgan buyurtmanomalami joriy yilining
            sentyabriga qadar qabul qiladi.
          </div>
          <div>
            Zarur hollarda tijorat vakili murojaati asosida Jamg'arma tomonidan
            bug'doyni daladan tashish, qabul qilish, ichki tashish, saqlash va
            yuklash xarajatlarni qoplash uchun oldindan to'lovlar amalga
            oshirilishi mumkin.
          </div>
          <div>
            <span className="font-bold">3.2.</span> "Tijorat vakili"
            tovar-bug'doy sotib olish uchun ochilgan 23210 maxsus hisobvaraqdagi
            mablag'lardan faqat ichki bozorda bug'doy narx barqarorigini
            ta'minlash tadbirlari uchun to'g'ridan-to'g'ri shartnoma asosida
            bug'doy yetishtiruvchilardan sotib olingan tovar-bug'doy qiymatini
            to'laydi;
          </div>
          <div>
            <span className="font-bold">3.3.</span> "Tijorat vakili" "Topshiniq
            benuvchi" tomonidan mazkur shartnomaga muvofiq tovar-bug'doy sotib
            olish xarajatlari uchun 23210 maxsus hisobvaraqqa o'tkazilgan pul
            mablag'larini boshqa maqsadlar uchun sarflashi mumkin emas.
          </div>
          <div>
            <span className="font-bold">3.4.</span> Mazkur shartnoma shartlanga
            ko'ra hisob-kitoblar pul o'tkazish yo'li bilan amalga oshinlad.
          </div>
          <div>
            <span className="font-bold">3.5.</span> Agar mazkur shartnoma
            topshiniq to'liq bajanlgunga qadar bekor qilinsa yoki "Tijorat
            vakili" ushbu shartnomaning 1.1.-bandida nazarda tutilgan
            harakatlardan qynimlarini bajanb, aynimlarini bajamasa yoki
            bajanishi oxinga yetkaza almasa "Topshiniq benuvchi" "Tijorat
            vakili"ga topshiniqi bajanishd haqiqatda amalga oshirgan
            xarajatlarni to'lab beradi.
          </div>
          <div>
            <span className="font-bold">3.6.</span> "Tijorat vakili" daladan
            tashish, qabul qilish, saqlash, ichki tashish va yuklash bilan
            bog'liq xarajatlarni qoplash uchun har oy yakunida "Topshiniq
            benuvchi"ga hisobvaraq-faktura taqdim etadi.
          </div>
          <div>
            Bunda, ko'rsatilgan xizmatlar uchun hisobvaraq-faktura keyingi
            oyning so'nggi kuniga qadar taqdim etilmagan taqdirda "Topshiriq
            benuvchi" tomonidan qabul qilimmaydi.
          </div>
          <div>
            "Tijorat vakili" ning topshiniqni bajanish bo'yicha qilgan
            xarajatlari tasdiqlovchi hujjatlar asosida "Topshiniq benuvchi"
            tomonidan qoplanadi.
          </div>
          <div>
            "Tijorat vakili" talab qilingan hujjatlami to'liq taqdim etganda,
            qilingan xarajatlar "Topshiniq benuvchi" tomonidan 23210 maxsus
            hisobvarag'iga to'lab beniladi.
          </div>
          <div>
            <span className="font-bold">3.7.</span> "O'zagroinspeksiya"
            tomonidan bug'doyni qabul qilish, saqlash va xaridorlarga yuklab
            jo'natish jarayonida yuzaga keladigan tabiy kamayish migdorini don
            qabul qilish shaxobchalarida 2 foizdan hamda bosh korxona elevatori
            va omborlarida 1 foizdan yuqori bo'Imasligi ustidan doimiy nazorat
            o'matiladi.
          </div>
          <div>
            Bunda, "Tijorat vakili" tomonidan bug'doyni yuzaga kelgan tabiy
            kamayishini belgilangan standartlarga mosligi yuzasidan
            "O'zagroinspeksiya'ning ijobiy xulosasini olgan vaqtdan boshlab ikki
            hafta muddat ichida "Topshiniq benuvchi"ga hisobvaraq-faktura taqdim
            etadi.
          </div>
          <div>
            <span className="font-bold">3.8.</span> "Taraflar" topshiniqni
            bajarish bo'yicha o'zaro hisob-kitoblarda tovar-bug'doyni tashish,
            qabul qilish, saqlash, ichki tashish va yuklash bilan bog'liq
            xarajatlami belgilangan tartibda tasdiqlangan xizmatlar tanfiga amal
            qiladilar.
          </div>
          <div className="font-bold text-center mt-5">
            IV. "TARAFLAR"NING JAVOBGARLIGI
          </div>
          <div>
            <span className="font-bold">4.1.</span> Ushbu shartnomada nazarda
            tutilgan majuriyatlar bajarilmaggan yoki lozim darajada bajanilmagan
            taqdirda, "Taraflar" mazkur shartnomada belgilangan taribda javobgar
            bo'ladilar.
          </div>
          <div>
            <span className="font-bold">4.2.</span> Ichki bozorda narx
            barqarotligini ta'minlash tadbirlari uchun to'g'ridan-to'g'n
            shartnoma asosida sotib olinib, "Tijorat vakili" ombon va (yoki)
            elevatonda saqlanayotgan tovar-bug'doy hajmida kamomad yoki
            normativdan ortiqcha yo'qotishlar (kamayish) aniqlanganda, yuzaga
            kelgan tovar-bug'doy kamomadi qiymati, kamomad aniqlangan kundagi
            tovar-bug'doyning bina narxiga 20 (yigima) foiz ustama qo'llagan
            holda "Tijorat vakili"dan "Topshiniq benuvchi" foydasiga undinladi.
          </div>
          <div>
            <span className="font-bold">4.3.</span> "Tijorat vakili" mazkur
            shartnomaning 2.1.6.-bandida nazarda tutilgan o'z majburiyatini
            buzib, 23210 maxsus hisobvarag' iga "Topshiniq benuvchi" tomonidan
            pul mablag' lari o'tkazilgan vaqtdan boshlab 3 (uch) bank ish kuni
            ichida (mablag' oluvchining 23210 maxsus hisobvarag'i yopilgan
            bo'lsa bundan mustasno)-bug'doy yetishtinuvchilar hamda transport
            xizmati ko'rsatuvchi tashkilotlar bilan hisob-kitoblami amalga
            oshiminasa (tovar oshinlishi lozim bo'lgan to'lov summasining 10
            (o'n) foizi miqdorida "Topshiniq benuvchi"ga jarima to'laydi.
          </div>
          <div>
            <span className="font-bold">4.4.</span> "Tijorat vakili" mazkur
            shartnomaning 2.1.10.-bandida nazarda tutilgan o'z majburiyatini
            buzib, "Topshiniq benuvchi" tomonidan taqdim etilgan yuklash
            yo'niqnomasiga (naryad) asosan ombor va (yoki) elevatorda
            saqlanayotgan tovar-bug'doyni bina savdolari orqali sotib olgan
            xaridor tomonidan taqdim etilgan transport (temir yo'l yoki
            avtomobil) vositasiga yuklash ishlarini 5 kundan ko'p bo'lggan
            muddatga kechiktirgan taqdirda xaridonga yuklanishi lozim bo'lgan
            tovar bug'doy qiymatining 10 (o'n) foizi miqdorida "Topshiniq
            benuvchi"ga jarima to'laydi.
          </div>
          <div>
            <span className="font-bold">4.5.</span> Tovar-bug'doy sotib olish
            xarajatlari uchun ochilgan 23210 maxsus hisobvaraqqa o'tkazilgan
            "Topshiniq benuvchi"ning pul mablag' lari "Tijorat vakili" tomonidan
            boshqa maqsadlar uchun (bug'doy sotib olish bilan bog'liq bo'lmagan)
            sarilangan yoki tovar-bug'doy qiymatiga nisbatan ortiqcha to'langan
            holda "Tijorat vakili" ushbu holatlar bo'yicha aniqlangan mablag'lar
            summasining 10 (o'n) foizi miqdorida "Topshiniq benuvchi"ga jarima
            to'laydi.
          </div>
          <div>
            <span className="font-bold">4.6.</span> "Tijorat vakili" bug'doy
            yetishtiruvchilar bilan tovar bug'doy sotib olish uchun o'zaro
            tuzilgan shartnoma bo'yicha pul mablag' lari to'lanishini "Topshiniq
            benuvchi"ning aybi bilan kechiktinlgan yoki "Tijorat vakili"ning
            hisobraqamiga shartnomaning 3.1-bandida ko'rsatilgan vaqtida
            o'tkazib berilmaganlik uchun "Topshiniq benuvchi" to'lashga majbur
            bo'lgan pul mablag'lan kechiktinlgan to'lov summasining 0,4 foizi
            miqdonida penya to'laydi, biroq penyaning umumy summasi
            kechiktinlgan to'lov summasining 50 foizidan ortiq bo'lmashigi
            kerak.
          </div>
          <div>
            <span className="font-bold">4.7.</span> "Tijorat vakili" daladan
            tashish, qabul qilish, saqlash, ichki tashish va yuklash bilan
            bog'liq xarajatlami, shuningdek, tovar-bug'doyni saqlash davomida
            uni tabiry kamayish xarajatlanri qoplash uchun har oy yakunida talab
            qilingan hujjatlami to'liq taqdim etganda, "Topshiriq benuvchi"
            tomonidan mazkur xarajatlar o'ziga bog'liq bo'lmagan uzli
            sabablarsiz 3 (uch) bank ish kunida to'lab benlmaganida, "Topshiriq
            benuvchi" to'lashga majbur bo'lgan pul mablag'lan to'lov summasining
            0,4 foizi miqdonida penya to'laydi, biroq penyaning umumiy summasi
            to'lanishi lozim bo'lgan pul mablag'lan summasining 50 foizidan
            ortiq bo'lmashigi kerak.
          </div>
          <div className="font-bold text-center mt-5">
            V. FORS-MAJOR VA JAVOBGARLIKDAN OZOD ETISH
          </div>
          <div>
            <span className="font-bold">5.1.</span> "Taraflar" dan bini
            shartnoma bo'yicha olgan majburiyatlanini yengib bo'lmaydigan kuch
            holat (forsmajor)lari (zilzila, qurg'oqchilik, suv toshqini,
            yong'in, sel, do'l, jala va boshqa tabiry ofatlar, shuningdek
            portlash, epidemiya, urush yoki harbiy harakatlar, fixjarolik
            tartibsizkiklari, terrorchilik harakatlari va boshqalar) sababli
            bajarmagan yoki lozim darajada bajarmaganligini isbotlasa, javobgar
            bo'lmaydi.
          </div>
          <div>
            <span className="font-bold">5.2.</span> Ushbu shartnoma shartlarini
            bajarishga to'sqinlik qiluvchi fors-major holatlarining boshlanishi
            va tugashi to'g'risida "Taraflar" zudlik bilan bir-birlanini hamda
            yengib bo'lmaydigan kuch holatlari (fors-major)ni tasdiqlash
            bo'yicha komissiyani yozma ravishda xabardor qilishlari shart.
          </div>
          <div>
            Yengib bo'lmaydigan kuch holatlari (fors-major)ni tasdiqlash
            bo'yicha komissya bunday holatlar oqibatida yoki "Taraflar" dan
            birining aybi bilan shartnoma bo'yicha magburiyatlanin
            bajarilishgahligi uchun javobgarlikdan ozod qilish bo'yicha xulosa
            benishlari mumkin.
          </div>
          <div>
            <span className="font-bold">5.3.</span> Fors-major holatlari
            bo'yicha kelishmovchiliklar va nizoli masalalar kelib chiqqan
            taqdirda "Taraflar", qoidaga ko'ra, mustaqil ravishda yoki tuman
            (shavar)lar hokimliklan huzurida tashkil etiladigan yengib
            bo'lmaydigan kuch holatlari (fors-major)ni tasdiqlash bo'yicha
            komissiya ishtirokida ulami sudgacha hal etish chora-tadbirlanini
            ko'radilar.
          </div>
          <div>
            Fors-major holatlarini aniglashda shartnoma "Taraflar" i qatnashishi
            kerak.
          </div>
          <div>
            <span className="font-bold">5.4.</span> Fors-major holatlari yuzaga
            kelgan taqdirda, ushbu shartnoma bo'yicha majburiyatlaming
            bajarilish muddati bunday holatlar va ulaming oqibatlari amal
            qiladigan davrga ko'chiriladi.
          </div>
          <div className="font-bold text-center mt-5">
            VI. NIZOLARNI HAL ETISH TARTIBI
          </div>
          <div>
            <span className="font-bold">6.1.</span> Shartnoma shartlari bo'yicha
            "Taraflar" o'rtasida kelishmovchiliklar va nizoli masalalar kelib
            chiqqan taqdirda, "Taraflar" mustaqil ravishda o'zlari yoki boshqa
            vakillar ishtirokida hal etish choralarini ko' radilar.
          </div>
          <div>
            "Taraflar" o'zaro kelishuvga enishmagan taqdirda Mediatsiya
            tartibida nizolami hal qilishga haqli.
          </div>
          <div>
            "Taraflar" o'zaro kelishuvga enishmagan taqdirda esia nizoli
            holatlar va kelishmovchiliklar O'zbekiston Respublikasining amaldagi
            qonunchiligiga asosan Toshkent tumanlararo iqtisodiy sudida hal
            qilinadi.
          </div>
          <div className="font-bold text-center mt-5">
            VII. SHARTNOMANING AMAL QILISH MUDDATI
          </div>
          <div>
            <span className="font-bold">7.1.</span> Mazkur shartnoma "Taraflar"
            tomonidan imzolangan paytdan boshlab kuchga kiradi va "Taraflar" o'z
            majburiyatlarini to'liq bajargunga qadar amal qiladi.
          </div>
          <div>VIII. BOSHQA SHARTLAR</div>
          <div>
            <span className="font-bold">8.1.</span> Mazkur shartnoma bir xil
            yuridik kuchga ega bo'lgan ikki nusada o'zbek tilida tuzilgan
            bo'lib, bir nusxadan "Taraflar" da saqlanadi hamda u "Taraflar"
            ishtirokida imzolangan kundan boshlab kuchga kiradi.
          </div>
          <div>
            <span className="font-bold">8.2.</span> Ushbu shartnoma "Taraflar"
            kelishuviga ko'ra o'zgartinlishi yoki bekor qilinishi mumkin.
            Shartnoman o'zgartinshyoki bekor qilish yozma shaklda
            ramiylashtiriladi va "Taraflar" tomonidan imzolanadi.
          </div>
          <div>
            <span className="font-bold">8.3.</span> Shartnoma bo'yicha
            majburiyatlami bajarishdan bir tomonlama bosh tortish va ushbu
            shartnoma shartlarini bir tomonlama o'zgartinshga yo'l qo'yilmaydi.
          </div>
          <div>
            <span className="font-bold">8.4.</span> Shartnoma "Taraflar" dan
            birining talabiga ko'ra boshqa "Taraf" shartnomanid jiddiy ravishda
            buzgan taqdirda sud qaroriga asosan o'zgartinlishi yoki bekor
            qilinishi mumkin. "Taraflar"dan birining shartnoman buzishi ikkinchi
            "Taraf'ga u shartnoma tuzishda umid qilishga haqli bo'lgan narsadan
            ko'p darajada mahnum bo'ladigan qilib zurar yetkazishi shartnomani
            jiddiy buzish hisoblanadi.
          </div>
          <div>
            <span className="font-bold">8.5.</span> Mazkur shartnoma quyidagi
            hollarda bekor qilinadi:
          </div>
          <div>- o'zaro kelishuv asosida;</div>
          <div>-"Topshiriq benuvchi"ning topshiriqni bekor qilishi;</div>
          <div>-"Tjorat vakili"ning topshiriqni bajarishdan bosh tortishi;</div>
          <div>
            -qonunchilik hujatlarida belgilangan boshqa asoslar bo'yicha.
          </div>
          <div>
            Mazkur shartnomani bajarishdan voz kechayotgan "Taraf" bu haqda
            boshqa "Taraf'ni shartnomani bekor qilishning taxminiy sanasidan 15
            kun oldin xabardor qilishi kerak.
          </div>
          <div>
            Agar mazkur topshiriq shartnomasi topshiriq "Tijorat vakili"
            tomonidan to'liq bajarilishidan oldin bekor qilingan bo'lsa,
            "Topshiriq benuvchi" "Tijorat vakili"ga topshiriqni bajarish vaqtida
            qilingan chiqimlami to'lashi, "Tijorat vakili"ga haq benlishi kerak
            bo'lganida esa, unga bajanlgan ishga muvofiq haq to'lashi ham shart.
            Bu qoida "Tijorat vakili" topshiriqning bekor qilinganini bilgan
            yoki bilishi lozim bo'lganidan keyin bajargan topshiriqqa nisbatan
            tatbiq etilmaydi.
          </div>
          <div>
            <span className="font-bold">8.6.</span> Bir "Taraf" shartnomani
            o'zgartirish yoki bekor qilish haqidagi taklifga ikkinchi "Taraf"dan
            rad javobi olganidan keyingma shartnomani o'zgartirish yoki bekor
            qilish haqidagi talabni sudga taqdim etishi mumkin.
          </div>
          <div>
            <span className="font-bold">8.7.</span> Shartnomaga o'zgartirish va
            qo'shimcha kiritish "Taraflar"ning yozma murojaatlan asoida amalga
            oshinladi. Barcha kiritilgan o'zgartirish va qo'shimchalar,
            qo'shimcha kelishuvlar "Taraflar" ishtirokida imzolangan kundan
            boshlab mazkur shartnomaning ajralmas qismi hisoblanadi.
          </div>
          <div>
            <span className="font-bold">8.8.</span> Mazkur shartnomada nazarda
            tutilmagan boshqa holatlar amaldagi qonunchilik va nomativ xuijatlar
            asosida tartibga solinadi.
          </div>
          <div className="font-bold text-center mt-5 mb-2">
            IX. "TARAFLAR"NING YURIDIK MANZILLARI VA BOSHQA RYEKVIZITLARI:
          </div>
          <div className="flex items-start gap-0 border px-5 border-black">
            <div className="w-[47%] border-r border-black py-2 pb-5 text-center">
              <div className="font-bold">"TOPSHIRIQ BERUVCHI"</div>
              <div>
                O'zbekiston Respublikasi Iqtisodiyot va moliya vazirligi
                huzuridagi Qishloq xo'jaligini davlat tomonidan
                qo'llab-quvvatlash jamg'armasini boshqarish Departamenti
              </div>
              <div>
                Manzil: Toshkent sh., Yakkasaroy tumani Sh.Rustavelli ko'chasi
                8-uy
              </div>
              <div>x/v: 21510000200790352002</div>
              <div>bank kodi: 00014</div>
              <div>O'zbekiston Respublikasi Markaziy banki</div>
              <div>Toshkent shahar Bosh boshqarmasi XKKM</div>
              <div>STIR: 304967272</div>
              <div className="font-bold my-5">Departament direktori</div>
              <div className="font-bold">A.A.Isroilov</div>
            </div>
            <div className="w-[47%] text-center py-2">
              <div className="font-bold">"TIJORAT VAKILI"</div>
              <div>SHIMBAY DAN QO SHIMCHA MAS ULIYATLI JAMIYAT</div>
              <div className="my-5">
                Manzil:SHIMBAY RAYONI KAVEZOV KO'SHESI 2-JAY
              </div>
              <div>x/v: 20208000700559013001 bank kodi: 00605</div>
              <div>Agrobank ATB Chimboy filiali STIR: 200931996</div>
              <div className="font-bold my-3">Rahbar:</div>
              <div className="font-bold">KADIROV KAMIIDJAN KADIROVICH</div>
            </div>
          </div>
        </div>
        <div className="w-[25%] border rounded-md px-10 py-5 sticky top-0 right-7">
          <h3 className="text-lg mb-5">E-imzo bilan imzolash</h3>
          <Button
            onClick={() => {
              setSignReqAssign(true);
            }}
          >
            Imzolash
          </Button>
        </div>
      </div>

      {/* select "e-imzo" modal */}
      <SignReqAssignModal
        signReqAssign={signReqAssign}
        setSignReqAssign={setSignReqAssign}
      />
    </>
  );
}
