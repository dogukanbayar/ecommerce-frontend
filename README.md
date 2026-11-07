# Bandage - E-Commerce Frontend

Modern ve kullanıcı odaklı bir e-ticaret deneyimi sunmak amacıyla geliştirilen bu proje, React ve Vite tabanlı kapsamlı bir tek sayfa uygulamasıdır (SPA). Figma spesifikasyonlarına sadık kalınarak geliştirilmiş olup ürün keşfinden filtrelemeye, canlı aramadan sepet yönetimine ve güvenli sipariş adımlarına kadar uçtan uca e-ticaret akışlarını barındırır.

## 🔗 Bağlantılar

- Canlı Demo (Production): [https://ecommerce-frontend-black-xi.vercel.app](https://ecommerce-frontend-black-xi.vercel.app)
- Kaynak Kod (GitHub): [https://github.com/dogukanbayar/ecommerce-frontend](https://github.com/dogukanbayar/ecommerce-frontend)

## ✨ Öne Çıkan Özellikler

- Dinamik Vitrin & Hero Slider: Figma tasarımına uygun banner ve kategori alanları.
- Canlı Autocomplete Arama: Başlıkta harf girildiği anda backend endpoint'ine debounced istek atarak görsel, ad ve fiyatla anlık listeleme.
- Kategori & Filtreleme Mimarisi: Cinsiyet ve kategori kırılımlarında slug URL yapısı (`/shop/:gender/:categoryName/:categoryId`), fiyata/puana göre sıralama ve URL query (`?filter=...&sort=...`) senkronizasyonu.
- Ürün Detay & Galeri: Oranları bozulmayan çoklu görsel galerisi, varyant seçimi ve dinamik sekmeler (*Description / Additional Information / Reviews*).
- Sepet Yönetimi & Kalıcılık: Adet güncelleme, ürün silme, dinamik kargo/indirim hesaplamaları ve `localStorage` ile durum senkronizasyonu.
- Adım Adım Sipariş Akışı (Checkout):
  - Fatura ve teslimat için tam CRUD adres yönetimi (`/user/address`)
  - Kredi kartı formatlama, taksit tablosu, CVV ve 3D Secure onay adımları (`/user/card`)
  - `POST /order` çağrısı ile siparişi tamamlama ve sipariş özeti ekranı
- Korumalı Rotalar (`ProtectedRoute`): Giriş yapmamış kullanıcıların ödeme ve profil adımlarına erişiminin sınırlandırılması.
- Sipariş Geçmişi Paneli: Geçmiş siparişlerin durumunu, tutarını ve ürünlerini collapsible kartlarla listeleyen panel.

## 🛠️ Teknoloji Stack

- Core: React 19, Vite
- State Management: Redux, Redux Thunk
- Routing: React Router DOM
- HTTP Client: Axios (Interceptor, Bearer Token Injection)
- Styling: Tailwind CSS, Lucide React
- Notifications: React Toastify
- Deployment: Vercel

## 📂 Proje Yapısı

```bash
src/
├── api/                 # Axios instance & token interceptors
├── assets/              # Statik görseller ve vektör logolar
├── components/          # Adres, kart modalları, ürün kartları ve korumalı rotalar
│   ├── AddressModal.jsx
│   ├── CardModal.jsx
│   ├── Clients.jsx
│   ├── ProductCard.jsx
│   └── ProtectedRoute.jsx
├── layout/              # Header, Footer ve PageContent yapıları
├── pages/               # Sayfa bileşenleri (Shop, Cart, Order, PreviousOrders...)
├── store/               # Redux store, reducer ve thunk aksiyonları
│   ├── actions/
│   ├── reducers/
│   └── store.js
├── App.jsx              # Ana rota tanımları ve oturum kontrolü
├── main.jsx             # Uygulama giriş noktası ve Provider bağlayıcısı
├── App.css
├── index.css
└── ...
```

## 💻 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Kurulum Adımları

```bash
git clone https://github.com/dogukanbayar/ecommerce-frontend.git
cd ecommerce-frontend
npm install
```

### Geliştirme Sunucusu

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Lint Kontrolü

```bash
npm run lint
```

## 🌐 API Yapılandırması

Uygulama arka uç olarak `https://workintech-fe-ecommerce.onrender.com` RESTful servislerini tüketmektedir. İstemci yapılandırması `src/api/api.js` üzerinde merkezi olarak yönetilir.

```js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});
```

## 🔄 Ana Akışlar

- Kullanıcı ana sayfa veya mağaza ekranından ürünleri keşfeder.
- Kategori ve filtre seçenekleri ile ürünler daraltılır.
- Ürün detay sayfasında ürün bilgileri, görseller ve seçenekler gösterilir.
- Ürün sepete eklenir ve sepet sayfasında yönetilir.
- Sipariş süreci adres ve kart bilgileri ile tamamlanır.
- Kullanıcı giriş kontrolü sonrası geçmiş siparişler ve korumalı sayfalara erişim sağlanır.

## 🧩 Mimari Notlar

- `App.jsx` içerisinde router yapısı ve `ProtectedRoute` korumaları tanımlanmıştır.
- `shoppingCartReducer.js` içerisinde `localStorage` ile sepet durumu kalıcı hale getirilmiştir.
- `ShopPage.jsx` üzerinde kategori gezinimi, `filter`/`sort` senkronizasyonu ve URL tabanlı kullanıcı deneyimi bulunmaktadır.
- Redux store yapısı ile ürün, kullanıcı ve sipariş verileri tek bir state akışında yönetilmektedir.

## 👤 Geliştirici

**Doğukan Bayar**

- GitHub: [@dogukanbayar](https://github.com/dogukanbayar)
