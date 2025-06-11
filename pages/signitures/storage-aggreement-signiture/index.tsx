import SignReqAssignModal from "@/components/signitures/req-assign/sign-modal";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { Check } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignContract() {
  const router = useRouter();
  const { data }: any = router.query;
  const parsedData = data ? JSON.parse(data) : null;

  console.log("parsedData: ", parsedData);

  // states
  const [signReqAssign, setSignReqAssign] = useState(false);

  return (
    <>
      <div className="flex relative items-start justify-between gap-10">
        <div className="w-[70%] pl-20 pr-10 overflow-auto h-[95vh]">
          <h1 className="font-bold text-xl text-center">
            BUG’DOY YETISHTIRUVCHILARNING TOVAR OMBORIDA BUG’DOY SAQLASH
            XARAJATLARINI QOPLAB BERISH BO’YICHA{" "}
          </h1>
          <p className="text-xl font-bold text-center">
            № {parsedData?.number}
          </p>
          <div className="flex items-center justify-between gap-10 my-5">
            <p>{parsedData?.partnersDto?.location?.name || "-----"}</p>
            <p>
              {parsedData?.contractDate
                ? format(parseISO(parsedData.contractDate), "dd.MM.yyyy")
                : ""}
            </p>
          </div>
          <div>
            <p className="text-lg">
              O’zbekiston Respublikasi Iqtisodiyot va moliya vazirligi
              huzuridagi Qishloq xo‘jaligini davlat tomonidan qo‘llab-quvvatlash
              jamg‘armasini boshqarish departamenti (keyingi o‘rinlarda –
              “Jamg‘arma” deb yuritiladi) nomidan Jamg‘arma nizomiga asosan
              faoliyat yurituvchi Jamg‘armani boshqarish departamenti direktori
              A.A.Isroilov bir tomondan, TO'RTKO'L DON MAXSULOTI MAS'ULIYATI
              CHEKLANGAN JAMIYAT (keyingi o‘rinlarda – “Omonat saqlovchi” deb
              yuritiladi) nomidan Nizom asosida faoliyat yurituvchi TO'RTKO'L
              DON MAXSULOTI MAS'ULIYATI CHEKLANGAN JAMIYAT aksiyadorlik jamiyati
              Boshqaruvi raisi ROZMETOV AYBEK MAXMUDOVICH ikkinchi tomondan,
              birgalikda “Taraflar”, alohida esa “Taraf” deb ataluvchilar
              O’zbekiston Respublikasi Vazirlar Mahkamasining 2024 yil 11
              iyundagi “2024 yil hosilidan bug‘doy xarid qilish va ichki bozorda
              narxlar barqarorligini ta’minlash chora-tadbirlari to‘g‘risida”gi
              325-sonli qarori (keyingi o‘rinlarda “Qaror” deb yuritiladi)
              ijrosini ta’minlash maqsadida mazkur Bitimni quyidagilar
              to‘g‘risida tuzdilar:
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl text-center my-5">
              I. BITIM PREDMETI
            </h3>
            <div>
              <p className="text-lg">
                1.1. “Omonat saqlovchi” fermer ho‘jaliklari hamda boshqa g‘alla
                yetishtiruvchilar (keyingi o‘rinlarda{" "}
                <span className="font-bold">“bug‘doy yetishtiruvchilar”</span>{" "}
                deb yuritiladi) tomonidan belgilangan standart talablariga
                muvofiq sifat ko‘rsatkichlari (namlik, ifloslik, donli
                aralashmasi, natura og‘irligi, kleykovina miqdori va sifati)ga
                ega bo‘lgan, Qarorning 1-ilovasida (dislokatsiya) ko‘rsatib
                o‘tilgan miqdorda topshirilgan bug‘doyni (Vaqtincha saqlashga
                qabul qilinadigan bug‘doy) mazkur Bitimda nazarda tutilgan
                shartlar asosida vaqtincha saqlash uchun qabul qilish, Jamg‘arma
                esa “Omonat saqlovchi”ga “bug‘doy yetishtiruvchilar” tomonidan
                vaqtincha saqlash uchun topshirilgan bug‘doyni, saqlash
                xizmatlari ko‘rsatganligi uchun haq to‘lash majburiyatini oladi.
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              II. OBYEKTNI TOPSHIRISH TARTIBI VA MUDDATLARI
            </h3>
            <div>
              <p>
                2.1. “Omonat saqlovchi” “bug‘doy yetishtiruvchilar” tomonidan
                vaqtinchalik saqlash uchun topshirilgan bug‘doyni “Omonat
                saqlovchi” va “bug‘doy yetishtiruvchilar” o‘rtasida mazkur bitim
                shartlaridan kelib chiqqan holda tuzilgan omonat saqlash
                shartnomasi va uning asosida tuzilgan tegishli miqdordagi
                bug‘doyni topshirish-qabul qilish dalolatnomasiga asosan
                vaqtinchalik saqlash uchun qabul qilib oladi.
              </p>
              <p>
                2.2. “Omonat saqlovchi” tomonidan bug‘doyni “bug‘doy
                yetishtiruvchilar”dan vaqtinchalik saqlash uchun qabul qilib
                olish muddati – 2024 yil 1 avgustgacha.
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              III. OMONAT SAQLASH JOYI VA BOSHQA SHARTLARI
            </h3>
            <div>
              <p>
                3.1. “Bug‘doy yetishtiruvchilar” tomonidan vaqtinchalik saqlash
                uchun topshirilgan tovar bug‘doyning saqlash joyi “Omonat
                saqlovchi”ning bosh korxonasi, filiallari va don qabul qilish
                shaxobchalari hisoblanadi.
              </p>
              <p>
                3.2. Omonat saqlash joyi belgilangan talablarga javob berishi
                shart.
              </p>
              <p>
                3.3. “Omonat saqlovchi” “bug‘doy yetishtiruvchilar” roziligisiz
                omonat saqlash joyi va shartlarini o‘zgartirishga haqli emas.
                Omonat saqlovchi omonat saqlash shartlarini o‘zgartirish
                zarurligi to‘g‘risidagi xabarnomani “bug‘doy yetishtiruvchilar”
                va Jamg‘armaga bunga asos bo‘lgan holatlar vujudga kelgan
                paytdan boshlab 3 kun muddatda yozma shaklda yuboradi.
              </p>
              <p>
                3.4. Xabarnomada “bug‘doy yetishtiruvchilar” roziligisiz omonat
                saqlash joyi va shartlarini o‘zgartirishga asos bo‘lgan
                holatlar, uni vujudga kelish sabablari, yangi omonat saqlash
                joyi va shartlari kabi ma’lumotlar bo‘lishi kerak.
              </p>
              <p>
                Jamg‘armaning xabarnomaga javob berish muddati 5 (besh) ish
                kunni tashkil etadi.
              </p>
              <p>
                3.5. “Omonat saqlovchi” “bug‘doy yetishtiruvchilar” tomonidan
                vaqtinchalik saqlash uchun topshirilgan bug‘doyning butligini,
                shu jumladan uni boshqa shaxslarning tajovuz qilishidan himoya
                qilish choralarini ta’minlashi hamda uning xususiyatlari va
                joriy holatining yomonlashishiga yo‘l qo‘ymasligi shart.
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              IV. OMONAT SAQLASH MUDDATI
            </h3>
            <div>
              <p>
                4.1. “Omonat saqlovchi” “bug‘doy yetishtiruvchilar” tomonidan
                vaqtinchalik saqlash uchun topshirilgan bug‘doyni 2025 yil 1
                yanvargacha omonat saqlash joyida belgilangan talablarga muvofiq
                saqlaydi.
              </p>
              <p>
                Bunda “Omonat saqlovchi”ning vaqtinchalik saqlash uchun
                bug‘doyni saqlash bo‘yicha xizmat haqi 2025 yil 1 yanvardan
                boshlab “bug‘doy yetishtiruvchilar” hisobidan tuziladigan
                shartnomalarga muvofiq undiriladi.
              </p>
              <p>
                4.2. Jamg‘arma tomonidan “Omonat saqlovchi”dan vaqtinchalik
                saqlash bo‘yicha ko‘rsatilgan xizmatlar uchun hisob varaq
                fakturalar 2025 yilning 15 yanvariga qadar qabul qilinadi. Ushbu
                muddatdan kechikib taqdim qilingan hisob varaq-fakturalar
                Jamg‘arma tomonidan qabul qilinmaydi.
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              V. HAQ TO’LASH VA HISOB-KITOBLAR TARTIBI
            </h3>
            <div>
              <p>
                5.1. Mazkur bitimning 1.1.-bandida ko‘rsatib o‘tilgan miqdordagi
                bug‘doyni omonat saqlash joyida saqlash bo‘yicha xizmatlarni
                ko‘rsatganlik uchun Jamg‘arma “Omonat saqlovchi”ga tegishli
                hududiy don korxonalari, viloyat Moliya bosh boshqarmalari va
                Raqobatni rivojlantirish va iste’molchilar huquqlarini himoya
                qilish qo‘mitasining hududiy boshqarmalari tomonidan bug‘doyni
                saqlash bo‘yicha xizmatlarning tasdiqlangan tariflaridan kelib
                chiqib, “Omonat saqlovchi” tomonidan taqdim etilgan hisob
                varaqfakturasiga asosan haq to‘laydi.
              </p>
              <p>
                5.2. Jamg‘arma mazkur bitimning 5.1.-bandida ko‘rsatib o‘tilgan
                “Omonat saqlovchi”ning xizmat haqini har oy uchun keyingi oyning
                5-sanasidan kechiktirmasdan “Omonat saqlovchi”ning 23210-sonli
                maxsus hisob raqamiga o‘tkazishi shart.
              </p>
              <p>
                5.3. Bug‘doyni vaqtinchalik saqlash bo‘yicha “Omonat saqlovchi”
                amalga oshirgan xarajatlar mazkur bitimning 5.1-bandida
                ko‘rsatilgan haq summasiga kiritiladi va alohida qoplanmaydi,
                mazkur bitimning 5.4-bandida ko‘rsatilgan hollar bundan
                mustasno.
              </p>
              <p>
                5.4. Jamg‘arma mazkur bitimning 5.1-bandida ko‘rsatilgan haqni
                to‘lashdan qat’iy nazar “Omonat saqlovchi”ga quyidagi omonat
                saqlash bilan bog‘liq favqulodda xarajatlarni qoplaydi:
              </p>
              <p>
                5.4.1. Tabiiy ofatlar (suv toshqini, zilzila, yong‘in va
                boshqalar) natijasida vaqtinchalik saqlashga topshirilgan
                bug‘doyga yetkazilgan zararni bartaraf etish bo‘yicha
                xarajatlar.
              </p>
              <p>
                5.5. Jamg‘arma mazkur bitimning 5.4-bandiga binoan qilingan
                favqulodda xarajatlar summasini “Omonat saqlovchi” tomonidan
                Jamg‘armaga ular haqida hisobot taqdim etilgan paytdan boshlab
                10 bank ish kunida “Omonat saqlovchi”ga qoplab beradi.
              </p>
              <p>
                5.6. “Omonat saqlovchi” tomonidan Jamg‘armaga taqdim etiladigan
                mazkur bitimning 5.1.-bandida nazarda tutilgan hujjatlar va
                vaqtinchalik saqlash xarajatlarini qoplash uchun taqdim
                etiladigan hisob varaq-fakturalarning qonunga asosan to‘g‘ri
                tuzilganligi, to‘g‘ri hisob-kitob asosida to‘l
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              VI. TARAFLARNING HUQUQ VA MAJBURIYATLARI
            </h3>
            <div>
              <p className="font-bold text-lg">
                6.1. Jamg‘arma quyidagi huquqlarga ega:
              </p>
              <p>
                6.1.1. “Omonat saqlovchi”ga “bug‘doy yetishtiruvchilar”
                tomonidan vaqtinchalik saqlash uchun topshirilgan bug‘doyni
                saqlash xarajatlarini to‘lab berishlik uchun mazkur bitimning
                5.1.-bandida nazarda tutilgan hujjatlarni taqdim etilishini
                talab qilish;
              </p>
              <p>
                6.1.2. Mazkur bitimning 5.1.-bandida nazarda tutilgan hujjatlar
                Jamg‘armaga taqdim etilmaganda “Omonat saqlovchi”ga saqlash
                xarajatlarini to‘lamaslik.
              </p>
              <p>
                6.1.3. “Omonat saqlovchi” tomonidan vaqtinchalik saqlash xizmati
                uchun Jamg‘armadan olingan pul mablag‘lari to‘g‘ri va asosli
                olinganligini tekshirish maqsadida Jamg‘armaning “Jamg‘arma
                mablag‘laridan samarali foydalanilishini monitoring qilish”
                bo‘limi hamda Davlat moliyaviy nazorati inspeksiyasi va uning
                hududiy boshqarmalarini jalb etish.
              </p>
              <p className="font-bold text-lg">
                6.2. Jamg‘arma quyidagi majburiyatlarga ega:
              </p>
              <p>
                6.2.1. Mazkur bitimning 5.1.-bandida nazarda tutilgan hujjatlar
                taqdim etilganida “Omonat saqlovchi”ga saqlash bo‘yicha
                xizmatlarni ko‘rsatganlik uchun ushbu bitimning 5.1.-bandida
                ko‘rsatib o‘tilgan oylik xizmat haqini keyingi oyning
                5-sanasidan kechiktirmay “Omonat saqlovchi”ning hisobraqamiga
                to‘lab berish.
              </p>
              <p className="font-bold text-lg">
                6.3. “Omonat saqlovchi” quyidagi huquqlarga ega:
              </p>
              <p>
                6.3.1. mazkur bitim shartlariga muvofiq “bug‘doy
                yetishtiruvchilar” tomonidan vaqtinchalik saqlash uchun
                topshirilgan bug‘doyni saqlash xizmatini ko‘rsatganlik bo‘yicha
                haq to‘lanishini talab etish;
              </p>
              <p>
                6.3.2. tabiiy ofatlar (suv toshqini, zilzila, yong‘in va
                boshqalar) natijasida vaqtinchalik saqlashga topshirilgan
                bug‘doyga yetkazilgan zararni bartaraf etish bo‘yicha
                xarajatlarni to‘lanishini talab etish;
              </p>
              <p className="font-bold text-lg">
                6.4. “Omonat saqlovchi” quyidagi majburiyatlarga ega:
              </p>
              <p>
                6.4.1. Mazkur bitim shartlariga muvofiq “bug‘doy
                yetishtiruvchilar” tomonidan vaqtinchalik saqlash uchun
                topshirilgan bug‘doyni omonat saqlash joyida saqlash xizmatini
                ko‘rsatish;
              </p>
              <p>
                6.4.2. Mazkur bitimning 5.1.-bandida nazarda tutilgan
                hujjatlarni Jamg‘armaga taqdim etish;
              </p>
              <p>
                6.4.3. saqlash shartlarini o‘zgartirish zarurligi to‘g‘risidagi
                xabarnomani “bug‘doy yetishtiruvchilar” va Jamg‘armaga bunga
                asos bo‘lgan holatlar vujudga kelgan paytdan boshlab 3 kun
                muddatda yozma shaklda yuborish.
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              VII. TARAFLARNING JAVOBGARLIGI
            </h3>
            <div>
              <p>
                7.1. Mazkur bitimda nazarda tutilgan majburiyatlarni
                bajarmaganlik uchun Taraflar Fuqarolik kodeksi, “Xo‘jalik
                yurituvchi sub’ektlar faoliyatining shartnomaviy-huquqiy bazasi
                to‘g‘risida”gi Qonun va O’zbekiston Respublikasi boshqa qonun
                hujjatlariga muvofiq javobgar bo‘ladi.
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              VIII. FORS-MAJOR HOLATLAR
            </h3>
            <div>
              <p>
                8.1. Taraflar mazkur bitim bo‘yicha majburiyatlarni
                bajarmaganligi yoki lozim darajada bajarmaganligi uchun, agar bu
                mazkur bitim tuzilgandan keyin paydo bo‘lgan, Taraflar oldindan
                ko‘rishi, oqilona choralar bilan bartaraf etishi mumkin
                bo‘lmagan favqulodda va yengib bo‘lmas kuch holatlari
                (fors-major) oqibatida yuzaga kelgan bo‘lsa hamda Taraflar o‘z
                majburiyatlarini lozim darajada bajarish uchun o‘zlariga bog‘liq
                barcha choralarni ko‘rganligini isbotlab bersa, javobgar
                bo‘lmaydi. Fors-major holatlarga, xususan: harbiy harakatlar,
                tabiiy kuch ta’siri (zilzila, suv toshqini va h.k.), davlat
                organlarining qarorlari kiradi
              </p>
              <p>
                8.2. Fors-major holatlar yuzaga kelganligi to‘g‘risida Taraflar
                bir-birlarini ular yuzaga kelgan paytdan boshlab 3 kun ichida
                xabardor qilishi kerak.
              </p>
              <p>
                8.3. Fors-major holatlar yuzaga kelgan taqdirda mazkur bitim
                bo‘yicha majburiyatlarni bajarish muddati shunday holatlar va
                ularning oqibatlari amalda bo‘lgan davrga ko‘chiriladi.
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              IX. BOSHQA SHARTLAR
            </h3>
            <div>
              <p>
                9.1. Mazkur bitimning amal qilishi quyidagi hollarda bekor
                qilinadi:
              </p>
              <p>
                9.1.1. Jamg‘arma uzrli sabablarsiz “Omonat saqlovchi”ga
                bug‘doyni vaqtinchalik saqlash xizmatini ko‘rsatganlik uchun
                xizmat haqi to‘lovini surunkasiga 2 oy ketma-ket to‘lamaganida;
              </p>
              <p>9.1.3. Taraflarning o‘zaro kelishuviga ko‘ra.</p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              X. YAKUNLOVCHI QOIDALAR
            </h3>
            <div>
              <p>
                10.1. Ushbu Bitim bo‘yicha Tomonlar o‘rtasida yuzaga keladigan
                barcha kelishmovchiliklar muzokaralar o‘tkazish yo‘li bilan hal
                qilinishi lozim.
              </p>
              <p>
                10.2. Agarda Tomonlar muzokaralar o‘tkazish yo‘li bilan
                kelishuvga erishmasalar, u holda kelishmovchiliklar O’zbekiston
                Respublikasining amaldagi qonunchiligiga asosan Toshkent
                tumanlararo iqtisodiy sudida ko‘rib chiqilishi lozim.
              </p>
              <p>
                10.3. Mazkur Bitim ikki nusxada tuzilib, bir xil yuridik kuchga
                ega va u tomonlar ishtirokida imzolangan kundan boshlab kuchga
                kiradi.
              </p>
              <p>
                10.4. Bitimga o‘zgartirish va qo‘shimcha kiritish tomonlarning
                yozma murojaatlari asosida amalga oshiriladi. Barcha kiritilgan
                o‘zgartirish va qo‘shimchalar, qo‘shimcha kelishuvlar tomonlar
                ishtirokida imzolangan kundan boshlab mazkur Bitimning ajralmas
                qismi hisoblanadi.
              </p>
              <p>
                10.5. Mazkur Bitim Tomonlarning o‘z zimmalariga olgan
                majburiyatlarini to‘liq bajargunga qadar amal qiladi.{" "}
              </p>
            </div>
          </div>
          <div className="my-5">
            <h3 className="font-bold text-xl text-center">
              XI. TARAFLARNING MANZILLARI, BOSHQA REKVIZITLARI
            </h3>
            <div className="flex items-start gap-0 mt-2 border px-5 border-black">
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
