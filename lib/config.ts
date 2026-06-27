// ============================================================
//  lib/config.ts — EDIT SEMUA KONTEN WEB DI SINI
// ============================================================

export const siteConfig = {
  couple: {
    name1: "Raka",
    name2: "Rara",
  },

  dateTarget: "2026-06-28T07:00:00",
  dateLabel: "Minggu, 28 Juni 2026",

  siteUrl: "https://sunday-date-raka-rara.vercel.app",

  loveNote: {
    message:
      "Tulis pesanmu yang spesial untuk Rara di sini. Ceritakan betapa berartinya hari ini bagimu, dan kenapa kamu bersyukur punya dia.",
    from: "Raka",
  },

  schedule: {
    part1: {
      label: "Part 1",
      title: "Morning Fresh Air",
      emoji: "☀️",
      items: [
        {
          time: "07.00",
          title: "Aku jemput kamu!",
          desc: "Siap-siap ya, cantik — aku jemput jam 7 pagi. Don't be late!",
          emoji: "🚗",
        },
        {
          time: "07.15 – 08.30",
          title: "Jalan santai di bantaran",
          desc: "Jalan-jalan pagi sambil beli jajan dan sarapan. Fresh air, happy mood!",
          emoji: "🌿",
        },
      ],
    },
    part2: {
      label: "Part 2",
      title: "Movie & Dinner Date",
      emoji: "🎬🍿",
      items: [
        {
          time: "14.30",
          title: "Aku jemput kamu lagi!",
          desc: "Siap-siap lagi ya — sesi sore dimulai sekarang.",
          emoji: "🚗",
        },
        {
          time: "14.50 – 16.42",
          title: "Movie time!",
          desc: "Nonton film di bioskop. Popcorn wajib hukumnya.",
          emoji: "🎬",
        },
        {
          time: "16.42 – 18.15",
          title: "Jalan-jalan di mall",
          desc: "Muter-muter santai, mampir ke Gramedia juga buat kamu.",
          emoji: "🛍️",
        },
        {
          time: "18.15 – 21.00",
          title: "Dinner time!",
          desc: "Cari cafe atau tempat makan yang enak. Yang penting bareng kamu!",
          emoji: "🍽️",
        },
        {
          time: "21.00",
          title: "Otw pulang",
          desc: "Biar kamu ga kemaleman dan ga kecapean. Selamat istirahat ya!",
          emoji: "🌙",
        },
      ],
    },
  },

  footerNote: "Pokonya besok fleksibel aja ya, yang penting kamu happy 💕",
}

export type ScheduleItem = {
  time: string
  title: string
  desc: string
  emoji: string
}