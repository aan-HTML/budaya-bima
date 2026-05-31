# Budaya Bima — Maja Labo Dahu

> *"Malu berbuat hal yang menyimpang, Takut kepada Tuhan."*
> Platform digital interaktif untuk mengeksplorasi kekayaan budaya Bima — sejarah, tenun, kuliner, dan tradisi masyarakat Mbojo.

🌐 **Live Demo:** [budaya-bima.vercel.app](https://budaya-bima.vercel.app)

---

## Fitur Utama

- **Sejarah Bima** — Perjalanan dari era Masa Naka, Kerajaan Bima, Kesultanan Islam, hingga Bima Modern
- **Galeri** — Koleksi foto dan visual budaya masyarakat Mbojo
- **Tenun Nggoli** — Showcase 100+ motif tenun klasik khas Bima
- **Kamus Interaktif** — Kamus bahasa Mbojo yang dapat dijelajahi
- **Peta Budaya** — Peta interaktif persebaran lokasi dan tradisi budaya Bima
- **Kuliner & Event** — Informasi kuliner khas dan event budaya lokal
- **Multibahasa** — Tersedia dalam Bahasa Indonesia dan Bahasa Inggris (i18n)

---

## Tech Stack

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.6 | Framework utama (App Router) |
| [React](https://react.dev) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Styling |
| [next-intl](https://next-intl-docs.vercel.app) | ^4.13.0 | Internasionalisasi (ID & EN) |
| [Framer Motion](https://www.framer.com/motion) | ^12.40.0 | Animasi |
| [Leaflet](https://leafletjs.com) + [React Leaflet](https://react-leaflet.js.org) | ^1.9.4 / ^5.0.0 | Peta interaktif |
| [Lucide React](https://lucide.dev) | ^1.17.0 | Icon library |

---

## Struktur Proyek

```
budaya-bima/
├── messages/
│   ├── en.json          # Terjemahan Bahasa Inggris
│   └── id.json          # Terjemahan Bahasa Indonesia
├── public/
│   └── images/          # Aset gambar statis
├── src/
│   └── app/
│       ├── [locale]/    # Routing berbasis locale (id / en)
│       │   ├── page.tsx
│       │   └── layout.tsx
│       ├── components/  # Komponen UI
│       │   ├── ClientSections.tsx
│       │   ├── FadeIn.tsx
│       │   ├── Footer.tsx
│       │   ├── Galeri.tsx
│       │   ├── Hero.tsx
│       │   ├── Kamus.tsx
│       │   ├── Kuliner.tsx
│       │   ├── MapExplorer.tsx
│       │   ├── Navbar.tsx
│       │   ├── Sejarah.tsx
│       │   └── Tenun.tsx
│       └── lib/
│           └── i18n.ts  # Konfigurasi internasionalisasi
```

---

## Memulai Pengembangan

### Prasyarat

Pastikan sudah terinstal:
- [Node.js](https://nodejs.org) versi 18 atau lebih baru
- npm, yarn, atau pnpm

### Instalasi

```bash
# Clone repositori
git clone https://github.com/username/budaya-bima.git
cd budaya-bima

# Install dependensi
npm install
```

### Menjalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser. Aplikasi secara otomatis akan redirect ke locale default (`/id`).

### Build untuk Produksi

```bash
npm run build
npm run start
```

---

## Internasionalisasi (i18n)

Proyek ini menggunakan `next-intl` dengan App Router. Semua teks UI tersimpan di folder `messages/`:

```
messages/
├── id.json   → Bahasa Indonesia (default)
└── en.json   → English
```

Routing locale ditangani secara otomatis melalui folder `[locale]` di dalam `app/`. Untuk menambahkan bahasa baru, tambahkan file JSON baru di `messages/` dan daftarkan locale-nya di konfigurasi `next-intl`.

---

## Deployment

Proyek ini di-deploy di **[Vercel](https://vercel.com)**. Setiap push ke branch `main` akan men-trigger deployment otomatis.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/budaya-bima)

---

## Kontribusi

Kontribusi sangat disambut! Jika kamu ingin berkontribusi:

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b fitur/nama-fitur`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur baru'`)
4. Push ke branch (`git push origin fitur/nama-fitur`)
5. Buka Pull Request

---

## Lisensi

Proyek ini dibuat untuk pelestarian budaya Bima. Silakan gunakan dan kembangkan untuk tujuan edukatif dan non-komersial.

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk melestarikan warisan budaya <strong>Mbojo</strong></p>
  <p><em>Maja Labo Dahu</em></p>
</div>
