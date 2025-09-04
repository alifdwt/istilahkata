import { eq } from "drizzle-orm";

import {
  users,
  words,
  explanations,
  wordGenerations,
  wordLanguages,
  generations,
  languages,
} from "./schema";

import { db } from "./index";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Create reference data first
    console.log("📚 Creating reference tables...");

    // Create generations
    const sampleGenerations = await db
      .insert(generations)
      .values([
        {
          code: "gen-alpha",
          name: "Generasi Alpha",
          shortName: "Gen Alpha",
          description:
            "Digital natives yang lahir di era TikTok, AI, dan teknologi imersif. Generasi pertama yang benar-benar tumbuh dengan tablet dan smartphone.",
          startYear: 2010,
          endYear: 2025,
          colorClass: "bg-purple-100 text-purple-700",
          iconClass: "sparkles",
          sortOrder: 1,
        },
        {
          code: "gen-z",
          name: "Generasi Z",
          shortName: "Gen Z",
          description:
            "Social media natives yang tumbuh dengan meme culture, YouTube, dan Instagram. Pelopor bahasa gaul digital.",
          startYear: 1997,
          endYear: 2012,
          colorClass: "bg-blue-100 text-blue-700",
          iconClass: "smartphone",
          sortOrder: 2,
        },
        {
          code: "millennial",
          name: "Generasi Milenial",
          shortName: "Milenial",
          description:
            "Internet pioneers yang mengalami transisi dari analog ke digital. Menciptakan budaya workplace humor dan coffee culture.",
          startYear: 1981,
          endYear: 1996,
          colorClass: "bg-green-100 text-green-700",
          iconClass: "coffee",
          sortOrder: 3,
        },
        {
          code: "gen-x",
          name: "Generasi X",
          shortName: "Gen X",
          description:
            "MTV generation yang tumbuh dengan grunge culture dan awal era internet. Sandwich generation antara Boomer dan Milenial.",
          startYear: 1965,
          endYear: 1980,
          colorClass: "bg-orange-100 text-orange-700",
          iconClass: "music",
          sortOrder: 4,
        },
        {
          code: "cross-gen",
          name: "Lintas Generasi",
          shortName: "Universal",
          description:
            "Kata-kata yang digunakan dan dipahami oleh semua generasi. Biasanya sudah menjadi bagian dari bahasa sehari-hari.",
          startYear: 1960,
          endYear: 2025,
          colorClass: "bg-gray-100 text-gray-700",
          iconClass: "users",
          sortOrder: 5,
        },
      ])
      .returning();

    console.log("✅ Generations created");

    // Create languages
    const sampleLanguages = await db
      .insert(languages)
      .values([
        {
          code: "indonesian",
          name: "Bahasa Indonesia",
          nativeName: "Bahasa Indonesia",
          description:
            "Bahasa resmi Republik Indonesia yang menjadi lingua franca untuk komunikasi nasional.",
          colorClass: "bg-red-100 text-red-700",
          flag: "🇮🇩",
          sortOrder: 1,
        },
        {
          code: "english",
          name: "Bahasa Inggris",
          nativeName: "English",
          description:
            "Bahasa internasional yang banyak diadopsi dalam bahasa gaul Indonesia, terutama di era digital.",
          colorClass: "bg-blue-100 text-blue-700",
          flag: "🇺🇸",
          sortOrder: 2,
        },
        {
          code: "javanese",
          name: "Bahasa Jawa",
          nativeName: "Basa Jawa",
          description:
            "Bahasa daerah terbesar di Indonesia yang memberikan banyak kontribusi kata ke bahasa gaul nasional.",
          colorClass: "bg-amber-100 text-amber-700",
          flag: "🏛️",
          sortOrder: 3,
        },
        {
          code: "sundanese",
          name: "Bahasa Sunda",
          nativeName: "Basa Sunda",
          description:
            "Bahasa daerah dari Jawa Barat yang turut memperkaya khasanah bahasa gaul Indonesia.",
          colorClass: "bg-emerald-100 text-emerald-700",
          flag: "🌾",
          sortOrder: 4,
        },
        {
          code: "betawi",
          name: "Bahasa Betawi",
          nativeName: "Basa Betawi",
          description:
            "Bahasa asli Jakarta yang menjadi sumber banyak kata gaul di Indonesia, terutama di era 80-90an.",
          colorClass: "bg-orange-100 text-orange-700",
          flag: "🏙️",
          sortOrder: 5,
        },
        {
          code: "hokkien",
          name: "Bahasa Hokkien",
          nativeName: "閩南語",
          description:
            "Dialek Tionghoa yang berkontribusi pada beberapa kata dalam bahasa gaul Indonesia.",
          colorClass: "bg-pink-100 text-pink-700",
          flag: "🏮",
          sortOrder: 6,
        },
        {
          code: "mixed",
          name: "Campuran",
          nativeName: "Mixed Languages",
          description:
            "Kata-kata yang merupakan hasil pencampuran dari berbagai bahasa atau tidak dapat dikategorikan secara spesifik.",
          colorClass: "bg-purple-100 text-purple-700",
          flag: "🌈",
          sortOrder: 7,
        },
      ])
      .returning();

    console.log("✅ Languages created");

    // Create sample users
    const sampleUsers = await db
      .insert(users)
      .values([
        {
          username: "david",
          email: "david@example.com",
          displayName: "David Pratama",
          bio: "Gen Z enthusiast yang suka ngikutin trend bahasa gaul terbaru dari TikTok dan Twitter",
          role: "user",
        },
        {
          username: "daud",
          email: "daud@example.com",
          displayName: "Daud Wijaya",
          bio: "Millennial dengan pengalaman corporate, paham seluk beluk bahasa kantor dan workplace humor",
          role: "moderator",
        },
        {
          username: "sinta",
          email: "sinta@example.com",
          displayName: "Sinta Maharani",
          bio: "Language enthusiast dari Gen Z, senang explore bahasa daerah dan etimologi kata",
          role: "user",
        },
        {
          username: "rani",
          email: "rani@example.com",
          displayName: "Rani Susanti",
          bio: "Gen Alpha yang aktif di social media, sering pakai bahasa gaul terbaru dari platform digital",
          role: "user",
        },
        {
          username: "budi",
          email: "budi@example.com",
          displayName: "Budi Santoso",
          bio: "Gen X yang mulai belajar bahasa gaul dari anak-anak, kadang bingung tapi antusias",
          role: "user",
        },
        {
          username: "maya",
          email: "maya@example.com",
          displayName: "Maya Sari",
          bio: "Linguist millennial yang peneliti bahasa gaul Jakarta dan sekitarnya",
          role: "moderator",
        },
      ])
      .returning();

    console.log("✅ Users created");

    // Create sample words with realistic contexts
    const sampleWords = await db
      .insert(words)
      .values([
        {
          term: "gabut",
          slug: "gabut",
          context:
            "Duh gabut banget hari ini, gak ada kerjaan di kantor, mau ngapain ya?",
          requestedBy: sampleUsers[0].id, // david
          status: "approved",
          totalExplanations: 3,
          totalViews: 1256,
          totalVotes: 47,
        },
        {
          term: "skuy",
          slug: "skuy",
          context: "Skuy makan di warteg depan kampus, lagi promo nih!",
          requestedBy: sampleUsers[1].id, // daud
          status: "approved",
          totalExplanations: 2,
          totalViews: 890,
          totalVotes: 35,
        },
        {
          term: "kepo",
          slug: "kepo",
          context:
            "Jangan kepo deh sama urusan orang lain, fokus sama hidup kamu aja",
          requestedBy: sampleUsers[2].id, // sinta
          status: "approved",
          totalExplanations: 3,
          totalViews: 2340,
          totalVotes: 89,
        },
        {
          term: "baper",
          slug: "baper",
          context: "Gue baper banget liat film tadi, sampe nangis di bioskop",
          requestedBy: sampleUsers[3].id, // rani
          status: "approved",
          totalExplanations: 2,
          totalViews: 678,
          totalVotes: 28,
        },
        {
          term: "fomo",
          slug: "fomo",
          context:
            "Aku fomo banget liat temen-temen pada liburan ke Bali, pengen ikut juga",
          requestedBy: sampleUsers[0].id, // david
          status: "pending",
          totalExplanations: 1,
          totalViews: 123,
          totalVotes: 5,
        },
        {
          term: "vibes",
          slug: "vibes",
          context:
            "Vibes cafe ini enak banget buat nongkrong sambil ngerjain tugas",
          requestedBy: sampleUsers[2].id, // sinta
          status: "approved",
          totalExplanations: 3,
          totalViews: 456,
          totalVotes: 22,
        },
        {
          term: "anjay",
          slug: "anjay",
          context: "Anjay, nilai ujianku bagus banget! Gak nyangka bisa segini",
          requestedBy: sampleUsers[4].id, // budi
          status: "approved",
          totalExplanations: 2,
          totalViews: 1789,
          totalVotes: 156,
        },
        {
          term: "bestie",
          slug: "bestie",
          context:
            "Bestie, kamu udah denger gossip terbaru belum? Cerita dong!",
          requestedBy: sampleUsers[3].id, // rani
          status: "approved",
          totalExplanations: 1,
          totalViews: 234,
          totalVotes: 12,
        },
      ])
      .returning();

    console.log("✅ Words created");

    // Map generation codes to IDs for easier reference
    const genMap = {
      "gen-alpha": sampleGenerations.find((g) => g.code === "gen-alpha")!.id,
      "gen-z": sampleGenerations.find((g) => g.code === "gen-z")!.id,
      millennial: sampleGenerations.find((g) => g.code === "millennial")!.id,
      "gen-x": sampleGenerations.find((g) => g.code === "gen-x")!.id,
      "cross-gen": sampleGenerations.find((g) => g.code === "cross-gen")!.id,
    };

    // Map language codes to IDs
    const langMap = {
      indonesian: sampleLanguages.find((l) => l.code === "indonesian")!.id,
      english: sampleLanguages.find((l) => l.code === "english")!.id,
      javanese: sampleLanguages.find((l) => l.code === "javanese")!.id,
      betawi: sampleLanguages.find((l) => l.code === "betawi")!.id,
      hokkien: sampleLanguages.find((l) => l.code === "hokkien")!.id,
      mixed: sampleLanguages.find((l) => l.code === "mixed")!.id,
    };

    // Add generation tags
    await db.insert(wordGenerations).values([
      // gabut
      {
        wordId: sampleWords[0].id,
        generationId: genMap["gen-z"],
        isPrimary: true,
        startYear: 2018,
        confidence: 0.9,
      },
      {
        wordId: sampleWords[0].id,
        generationId: genMap["millennial"],
        isPrimary: false,
        startYear: 2020,
        confidence: 0.7,
      },

      // skuy
      {
        wordId: sampleWords[1].id,
        generationId: genMap["gen-z"],
        isPrimary: true,
        startYear: 2019,
        confidence: 0.95,
      },

      // kepo
      {
        wordId: sampleWords[2].id,
        generationId: genMap["cross-gen"],
        isPrimary: true,
        startYear: 2015,
        confidence: 0.8,
      },

      // baper
      {
        wordId: sampleWords[3].id,
        generationId: genMap["gen-z"],
        isPrimary: true,
        startYear: 2017,
        confidence: 0.85,
      },
      {
        wordId: sampleWords[3].id,
        generationId: genMap["gen-alpha"],
        isPrimary: false,
        startYear: 2022,
        confidence: 0.6,
      },

      // fomo
      {
        wordId: sampleWords[4].id,
        generationId: genMap["gen-z"],
        isPrimary: true,
        startYear: 2020,
        confidence: 0.9,
      },
      {
        wordId: sampleWords[4].id,
        generationId: genMap["millennial"],
        isPrimary: false,
        startYear: 2021,
        confidence: 0.7,
      },

      // vibes
      {
        wordId: sampleWords[5].id,
        generationId: genMap["gen-z"],
        isPrimary: true,
        startYear: 2020,
        confidence: 0.9,
      },
      {
        wordId: sampleWords[5].id,
        generationId: genMap["gen-alpha"],
        isPrimary: false,
        startYear: 2023,
        confidence: 0.8,
      },

      // anjay
      {
        wordId: sampleWords[6].id,
        generationId: genMap["gen-z"],
        isPrimary: true,
        startYear: 2016,
        confidence: 0.95,
      },
      {
        wordId: sampleWords[6].id,
        generationId: genMap["millennial"],
        isPrimary: false,
        startYear: 2018,
        confidence: 0.6,
      },

      // bestie
      {
        wordId: sampleWords[7].id,
        generationId: genMap["gen-alpha"],
        isPrimary: true,
        startYear: 2021,
        confidence: 0.9,
      },
      {
        wordId: sampleWords[7].id,
        generationId: genMap["gen-z"],
        isPrimary: false,
        startYear: 2020,
        confidence: 0.8,
      },
    ]);

    // Add language tags
    await db.insert(wordLanguages).values([
      // gabut - Indonesian
      {
        wordId: sampleWords[0].id,
        languageId: langMap["indonesian"],
        isPrimary: true,
      },

      // skuy - Indonesian
      {
        wordId: sampleWords[1].id,
        languageId: langMap["indonesian"],
        isPrimary: true,
      },

      // kepo - Hokkien origin, adopted into Indonesian
      {
        wordId: sampleWords[2].id,
        languageId: langMap["hokkien"],
        isPrimary: true,
      },
      {
        wordId: sampleWords[2].id,
        languageId: langMap["indonesian"],
        isPrimary: false,
      },

      // baper - Indonesian
      {
        wordId: sampleWords[3].id,
        languageId: langMap["indonesian"],
        isPrimary: true,
      },

      // fomo - English adopted
      {
        wordId: sampleWords[4].id,
        languageId: langMap["english"],
        isPrimary: true,
      },

      // vibes - English adopted
      {
        wordId: sampleWords[5].id,
        languageId: langMap["english"],
        isPrimary: true,
      },

      // anjay - Betawi/Indonesian
      {
        wordId: sampleWords[6].id,
        languageId: langMap["betawi"],
        isPrimary: true,
      },
      {
        wordId: sampleWords[6].id,
        languageId: langMap["indonesian"],
        isPrimary: false,
      },

      // bestie - English adopted
      {
        wordId: sampleWords[7].id,
        languageId: langMap["english"],
        isPrimary: true,
      },
    ]);

    console.log("✅ Generation and language tags created");

    // Create sample explanations
    await db.insert(explanations).values([
      // Explanations for "gabut"
      {
        wordId: sampleWords[0].id,
        userId: sampleUsers[1].id, // daud
        content:
          'Gabut sebagai akronim dari "gaji buta". Ini adalah arti yang paling umum dan sering digunakan. Awalnya, kata ini digunakan di lingkungan kerja untuk menggambarkan kondisi di mana seseorang tidak memiliki pekerjaan atau tugas yang harus dikerjakan, tetapi tetap dibayar. Jadi, mereka seperti mendapat gaji tanpa melakukan apa pun, atau "gaji buta".',
        example:
          "Hari ini aku gabut banget di kantor, bos lagi meeting seharian.",
        votes: 25,
        wordCount: 120,
        isAccepted: true,
        isFeatured: true,
      },
      {
        wordId: sampleWords[0].id,
        userId: sampleUsers[2].id, // sinta
        content:
          "Gabut untuk menggambarkan perasaan bosan atau tidak ada kegiatan. Gabut bisa digunakan untuk mengekspresikan perasaan bosan, jenuh, atau lelah karena tidak ada kegiatan yang berarti. Kata ini sering digunakan saat seseorang sedang sendirian dan tidak tahu harus melakukan apa.",
        example: "Aku gabut banget hari ini, enaknya ngapain ya?",
        votes: 18,
        wordCount: 85,
        isAccepted: true,
      },
      {
        wordId: sampleWords[0].id,
        userId: sampleUsers[4].id, // budi
        content:
          "Gabut juga bisa digunakan untuk merujuk pada perasaan malas atau enggan melakukan sesuatu. Ini seperti perasaan yang membuat seseorang hanya ingin bersantai atau bermalas-malasan meskipun ada tugas yang menunggu.",
        example: "Tugasku numpuk, tapi aku lagi gabut banget buat mulai.",
        votes: 4,
        wordCount: 75,
        isAccepted: false,
      },

      // Explanations for "skuy"
      {
        wordId: sampleWords[1].id,
        userId: sampleUsers[0].id, // david
        content:
          'Skuy adalah singkatan dari "ayo" atau ajakan dalam bahasa gaul. Kata ini sering digunakan sebagai ajakan untuk melakukan sesuatu bersama-sama, biasanya digunakan oleh anak muda untuk mengajak teman mereka melakukan aktivitas tertentu dengan cara yang lebih kekinian dan energik.',
        example: "Skuy makan di warteg, lagi laper nih!",
        votes: 21,
        wordCount: 65,
        isAccepted: true,
        isFeatured: true,
      },
      {
        wordId: sampleWords[1].id,
        userId: sampleUsers[3].id, // rani
        content:
          'Skuy berasal dari adaptasi kata "let\'s go" dalam bahasa Inggris yang kemudian diserap dan dimodifikasi menjadi kata yang mudah diucapkan dalam konteks bahasa gaul Indonesia. Populer di kalangan Gen Z sebagai pengganti kata "ayo" yang terasa lebih formal.',
        example: "Skuy main game online bareng, udah pada ready belum?",
        votes: 14,
        wordCount: 55,
        isAccepted: true,
      },

      // Explanations for "kepo"
      {
        wordId: sampleWords[2].id,
        userId: sampleUsers[1].id, // daud
        content:
          'Kepo berasal dari bahasa Hokkien "kiasu" yang berarti "ingin tahu" atau "penasaran". Dalam konteks bahasa gaul Indonesia, kepo digunakan untuk menggambarkan seseorang yang terlalu ingin tahu tentang urusan orang lain, biasanya dengan konotasi negatif seperti tukang gosip atau orang yang suka ikut campur.',
        example:
          "Dia tuh orangnya kepo banget, selalu nanya-nanya kehidupan pribadi orang.",
        votes: 45,
        wordCount: 95,
        isAccepted: true,
        isFeatured: true,
      },
      {
        wordId: sampleWords[2].id,
        userId: sampleUsers[2].id, // sinta
        content:
          "Kepo juga bisa digunakan dalam konteks positif ketika seseorang menunjukkan rasa ingin tahu yang wajar atau antusiasme terhadap sesuatu. Tergantung pada konteks dan cara penyampaiannya, kepo tidak selalu bermakna negatif.",
        example:
          "Maaf ya aku kepo, tapi kamu beli tas itu dimana? Bagus banget!",
        votes: 32,
        wordCount: 65,
        isAccepted: true,
      },
      {
        wordId: sampleWords[2].id,
        userId: sampleUsers[5].id, // maya
        content:
          "Dari perspektif linguistik, kata kepo menunjukkan bagaimana bahasa daerah dan etnis Tionghoa terintegrasi dalam bahasa gaul nasional Indonesia. Proses adopsi ini mencerminkan dinamika multikultural dalam pembentukan identitas bahasa generasi muda.",
        example:
          "Penelitian menunjukkan kata kepo sudah diterima lintas etnis di Indonesia.",
        votes: 12,
        wordCount: 85,
        isAccepted: true,
      },

      // Explanation for "baper"
      {
        wordId: sampleWords[3].id,
        userId: sampleUsers[0].id, // david
        content:
          'Baper adalah singkatan dari "bawa perasaan". Kata ini digunakan untuk menggambarkan kondisi dimana seseorang terlalu larut dalam emosi atau perasaan, biasanya setelah menonton film, mendengar lagu, atau mengalami situasi tertentu yang menyentuh hati dan membuat perasaan menjadi sensitif.',
        example:
          "Habis nonton drama Korea, aku jadi baper sendiri, pengen punya pacar kayak main character-nya.",
        votes: 19,
        wordCount: 80,
        isAccepted: true,
      },
      {
        wordId: sampleWords[3].id,
        userId: sampleUsers[3].id, // rani
        content:
          "Baper juga sering dipakai untuk menggambarkan reaksi berlebihan terhadap candaan atau komentar yang sebenarnya tidak dimaksudkan serius. Dalam konteks ini, baper menunjukkan seseorang yang terlalu sensitive atau mudah tersinggung.",
        example: "Santai aja, jangan baper dong! Itu kan cuma becanda.",
        votes: 8,
        wordCount: 60,
        isAccepted: true,
      },

      // Explanation for "fomo"
      {
        wordId: sampleWords[4].id,
        userId: sampleUsers[2].id, // sinta
        content:
          'FOMO adalah singkatan dari "Fear of Missing Out" - rasa takut ketinggalan atau melewatkan sesuatu. Biasanya muncul saat melihat orang lain melakukan aktivitas menarik di media sosial, membuat kita merasa perlu ikut atau menyesal tidak berpartisipasi.',
        example:
          "Liat Instagram story temen-temen yang lagi liburan, jadi fomo pengen ikut traveling juga.",
        votes: 5,
        wordCount: 70,
        isAccepted: false,
      },

      // Explanations for "vibes"
      {
        wordId: sampleWords[5].id,
        userId: sampleUsers[2].id, // sinta
        content:
          'Vibes berasal dari bahasa Inggris "vibrations" yang dalam bahasa gaul Indonesia digunakan untuk menggambarkan suasana, atmosfer, atau energi dari suatu tempat, situasi, atau orang. Biasanya digunakan untuk mendeskripsikan kesan atau perasaan yang ditimbulkan oleh lingkungan sekitar.',
        example:
          "Vibes cafe ini chill banget, cocok buat ngerjain tugas sambil dengerin musik.",
        votes: 15,
        wordCount: 75,
        isAccepted: true,
        isFeatured: true,
      },
      {
        wordId: sampleWords[5].id,
        userId: sampleUsers[3].id, // rani
        content:
          "Vibes juga bisa digunakan untuk menggambarkan chemistry atau kecocokan antara dua orang atau lebih. Dalam konteks ini, vibes yang bagus berarti ada keharmonisan atau keselarasan dalam hubungan, percakapan, atau interaksi sosial.",
        example: "Vibes kita cocok banget, kayaknya bisa jadi teman baik nih!",
        votes: 7,
        wordCount: 55,
        isAccepted: true,
      },
      {
        wordId: sampleWords[5].id,
        userId: sampleUsers[0].id, // david
        content:
          "Di era social media, vibes sering dipakai untuk caption atau comment mengomentari aesthetic atau mood dari foto/video. Kata ini membantu mengekspresikan perasaan tentang konten visual dengan cara yang singkat tapi bermakna.",
        example: "Vibes foto ini aesthetic banget! Filter apa yang kamu pakai?",
        votes: 0,
        wordCount: 50,
        isAccepted: false,
      },

      // Explanations for "anjay"
      {
        wordId: sampleWords[6].id,
        userId: sampleUsers[4].id, // budi
        content:
          "Anjay adalah kata seru yang digunakan untuk mengekspresikan berbagai emosi seperti kagum, terkejut, atau senang. Berasal dari bahasa Betawi dan populer di kalangan anak muda sebagai pengganti kata seru lainnya. Bisa dipakai dalam konteks positif maupun negatif tergantung intonasi.",
        example: "Anjay, nilai ujianku bagus banget! Gak nyangka bisa dapat A.",
        votes: 89,
        wordCount: 85,
        isAccepted: true,
        isFeatured: true,
      },
      {
        wordId: sampleWords[6].id,
        userId: sampleUsers[5].id, // maya
        content:
          "Anjay menunjukkan evolusi bahasa daerah Jakarta yang kemudian menyebar ke seluruh Indonesia melalui media dan internet. Kata ini mencerminkan bagaimana bahasa lokal bisa menjadi fenomena nasional di era digital.",
        example:
          "Anjay, video TikTok kamu viral banget! Udah berapa juta views?",
        votes: 67,
        wordCount: 70,
        isAccepted: true,
      },

      // Explanation for "bestie"
      {
        wordId: sampleWords[7].id,
        userId: sampleUsers[3].id, // rani
        content:
          'Bestie adalah singkatan dari "best friend" dalam bahasa Inggris yang diadopsi ke dalam bahasa gaul Indonesia. Digunakan untuk memanggil atau merujuk kepada sahabat terdekat dengan cara yang lebih casual dan akrab. Populer di kalangan Gen Alpha dan Gen Z.',
        example: "Bestie, kamu udah denger gossip terbaru belum? Cerita dong!",
        votes: 12,
        wordCount: 60,
        isAccepted: true,
      },
    ]);

    console.log("✅ Explanations created");

    // Update user stats based on contributions
    await db
      .update(users)
      .set({
        totalVotes: 45,
        totalWordCount: 200,
      })
      .where(eq(users.id, sampleUsers[1].id)); // daud

    await db
      .update(users)
      .set({
        totalVotes: 36,
        totalWordCount: 140,
      })
      .where(eq(users.id, sampleUsers[0].id)); // david

    await db
      .update(users)
      .set({
        totalVotes: 47,
        totalWordCount: 195,
      })
      .where(eq(users.id, sampleUsers[2].id)); // sinta

    await db
      .update(users)
      .set({
        totalVotes: 29,
        totalWordCount: 115,
      })
      .where(eq(users.id, sampleUsers[3].id)); // rani

    await db
      .update(users)
      .set({
        totalVotes: 93,
        totalWordCount: 155,
      })
      .where(eq(users.id, sampleUsers[4].id)); // budi

    await db
      .update(users)
      .set({
        totalVotes: 79,
        totalWordCount: 155,
      })
      .where(eq(users.id, sampleUsers[5].id)); // maya

    console.log("✅ User stats updated");
    console.log("🎉 Database seeded successfully!");

    // Print comprehensive summary
    console.log("\n📊 Seed Summary:");
    console.log(`- Users: ${sampleUsers.length}`);
    console.log(`- Words: ${sampleWords.length}`);
    console.log(`- Generations: ${sampleGenerations.length}`);
    console.log(`- Languages: ${sampleLanguages.length}`);
    console.log("- Explanations: 15");
    console.log("- Generation tags: 13");
    console.log("- Language tags: 10");

    console.log("\n🎯 Reference Data Created:");
    console.log("Generations:");
    sampleGenerations.forEach((gen) => {
      console.log(
        `  - ${gen.name} (${gen.startYear}-${gen.endYear || "present"})`
      );
    });

    console.log("\nLanguages:");
    sampleLanguages.forEach((lang) => {
      console.log(`  - ${lang.name} ${lang.flag}`);
    });

    console.log("\n🔥 Featured Words:");
    const featuredWords = sampleWords.slice(0, 4);
    featuredWords.forEach((word) => {
      console.log(
        `  - ${word.term}: ${word.totalViews} views, ${word.totalVotes} votes`
      );
    });

    console.log("\n👥 Top Contributors:");
    const contributors = [
      { name: sampleUsers[4].displayName, votes: 93, words: 155 }, // budi
      { name: sampleUsers[5].displayName, votes: 79, words: 155 }, // maya
      { name: sampleUsers[2].displayName, votes: 47, words: 195 }, // sinta
      { name: sampleUsers[1].displayName, votes: 45, words: 200 }, // daud
    ];
    contributors.forEach((user) => {
      console.log(
        `  - ${user.name}: ${user.votes} votes, ${user.words} word count`
      );
    });
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
