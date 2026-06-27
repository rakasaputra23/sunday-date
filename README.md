# Sunday Date — Raka & Rara ☀️💕

Web jadwal date spesial, dibangun dengan Next.js + Tailwind CSS.

---

## ✏️ Cara edit konten

Semua teks, jadwal, dan pesan cukup diubah di **satu file**:

```
lib/config.ts
```

Yang perlu kamu edit:
- `loveNote.message` — tulis pesanmu untuk Rara di sini!
- `siteUrl` — update setelah berhasil deploy di Vercel
- Jadwal di `schedule.part1.items` dan `schedule.part2.items` kalau ada perubahan

---

## 🚀 Cara deploy ke Vercel

### Langkah 1 — Install dependencies
```bash
npm install
```

### Langkah 2 — Coba di local dulu
```bash
npm run dev
```
Buka http://localhost:3000 — kalau sudah oke, lanjut deploy.

### Langkah 3 — Push ke GitHub
```bash
git init
git add .
git commit -m "first commit: sunday date web"
git remote add origin https://github.com/username/sunday-date.git
git push -u origin main
```

### Langkah 4 — Deploy di Vercel
1. Buka https://vercel.com dan login
2. Klik **"Add New Project"**
3. Import repo yang baru kamu push
4. Vercel otomatis detect Next.js — klik **Deploy**
5. Selesai! Kamu dapat URL seperti `sunday-date-raka-rara.vercel.app`

### Langkah 5 — Update URL di config
Buka `lib/config.ts`, update baris ini:
```ts
siteUrl: "https://sunday-date-raka-rara.vercel.app", // ← ganti dengan URL aslimu
```
Push lagi ke GitHub — Vercel auto re-deploy!

### Langkah 6 — Generate QR Code
QR code akan otomatis muncul di web sesuai `siteUrl` yang kamu set.
Bagikan ke Rara, atau print dan taruh di hadiah! 💝

---

## 📁 Struktur project

```
sunday-date/
├── app/
│   ├── layout.tsx      ← font & metadata
│   ├── page.tsx        ← halaman utama
│   └── globals.css
├── components/
│   ├── Hero.tsx        ← countdown timer
│   ├── Schedule.tsx    ← jadwal timeline
│   ├── LoveNote.tsx    ← pesan spesial
│   └── QRSection.tsx   ← QR code
└── lib/
    └── config.ts       ← ✏️ EDIT KONTEN DI SINI
```
