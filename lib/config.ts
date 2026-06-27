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
    "anw uda 3 bulan ya raa ini, aku bersyukur bnget bsa dket sm rara. pokonya i'll always be here ya raa, no matter what happen i'm all ears buat rara. anytime, anywhere and anything. i love uu so much as always ya raa walaupun cuman just friend hahahah",
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
          title: "aku jemput kamu yaa raa",
          desc: "siap-siap yaa, aku udah otw! nnti aku tunggu didepan 🫣",
          emoji: "🚗",
        },
        {
          time: "07.15 – 10.30",
          title: "jalan-jalan santai di bantaran",
          desc: "jalan-jalan pagi sambil beli jajan sama sarapan. fresh air, happy mood!",
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
          title: "aku jemput kamu lagi yaa raa",
          desc: "sesi sore dimulai! siap-siap lagi yaa 🥰",
          emoji: "🚗",
        },
        {
          time: "14.50 – 16.42",
          title: "movie time!",
          desc: "di bioskop nonton film ini raa",
          emoji: "🎬",
        },
        {
          time: "16.42 – 18.15",
          title: "jalan-jalan santai di mall",
          desc: "muter-muter santai, sambil mampir ke gramed juga buat kamu 📚",
          emoji: "🛍️",
        },
        {
          time: "18.15 – 21.00",
          title: "dinner time",
          desc: "cari cafe atau tempat maem yg enak. yang penting bareng kamu!",
          emoji: "🍽️",
        },
        {
          time: "21.00",
          title: "kita otw pulang",
          desc: "biar kamu ga kemaleman dan ga kecapean lagi kaya hari inii 🌙",
          emoji: "🌙",
        },
      ],
    },
  },

  footerNote: "pokonya besok fleksibel aja yaa raa, yang penting kamu happy. see u tomorrow cantikk! 💕",
}

export type ScheduleItem = {
  time: string
  title: string
  desc: string
  emoji: string
}