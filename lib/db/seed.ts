import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  users,
  generations,
  languages,
  words,
  explanations,
  votes,
  comments,
  wordGenerations,
  wordLanguages,
  wordViews,
} from "./schema";

// Load environment variables for script
config({ path: ".env.local" });

// Validate required environment variables
const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL!,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    console.error(`❌ Missing required environment variable: ${key}`);
    console.error(`Please check your .env.local file`);
    process.exit(1);
  }
}

// Create database connection for seeding only
const queryClient = postgres(requiredEnvVars.DATABASE_URL);
const db = drizzle(queryClient, {
  schema: {
    users,
    generations,
    languages,
    words,
    explanations,
    votes,
    comments,
    wordGenerations,
    wordLanguages,
    wordViews,
  },
});

async function main() {
  console.log("🌱 Starting database seeding...");
  console.log(
    `📍 Using database: ${requiredEnvVars.DATABASE_URL!.split("@")[1]}`
  );

  try {
    // Test database connection first
    console.log("🔍 Testing database connection...");
    await db.execute("SELECT 1");
    console.log("✅ Database connection successful");

    // Clear existing data (for development only)
    console.log("🗑️ Clearing existing data...");
    await db.delete(wordViews);
    await db.delete(comments);
    await db.delete(votes);
    await db.delete(wordLanguages);
    await db.delete(wordGenerations);
    await db.delete(explanations);
    await db.delete(words);
    await db.delete(users);
    await db.delete(languages);
    await db.delete(generations);

    // Seed generations
    console.log("👥 Seeding generations...");
    const generationsData = [
      {
        code: "gen-alpha",
        name: "Generasi Alpha",
        shortName: "Gen Alpha",
        description: "Generasi yang lahir setelah 2010, digital native sejati",
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
        description: "Generasi internet dan media sosial",
        startYear: 1997,
        endYear: 2012,
        colorClass: "bg-blue-100 text-blue-700",
        iconClass: "smartphone",
        sortOrder: 2,
      },
      {
        code: "milenial",
        name: "Generasi Milenial",
        shortName: "Milenial",
        description: "Generasi peralihan digital",
        startYear: 1981,
        endYear: 1996,
        colorClass: "bg-green-100 text-green-700",
        iconClass: "laptop",
        sortOrder: 3,
      },
      {
        code: "gen-x",
        name: "Generasi X",
        shortName: "Gen X",
        description: "Generasi MTV dan grunge",
        startYear: 1965,
        endYear: 1980,
        colorClass: "bg-orange-100 text-orange-700",
        iconClass: "music",
        sortOrder: 4,
      },
      {
        code: "lintas-generasi",
        name: "Lintas Generasi",
        shortName: "Universal",
        description: "Kata yang digunakan di berbagai generasi",
        startYear: 1950,
        endYear: 2025,
        colorClass: "bg-gray-100 text-gray-700",
        iconClass: "users",
        sortOrder: 5,
      },
    ];

    const insertedGenerations = await db
      .insert(generations)
      .values(generationsData)
      .returning();
    console.log(`✅ Inserted ${insertedGenerations.length} generations`);

    // Seed languages
    console.log("🌐 Seeding languages...");
    const languagesData = [
      {
        code: "id",
        name: "Bahasa Indonesia",
        nativeName: "Bahasa Indonesia",
        description: "Bahasa resmi Indonesia",
        colorClass: "bg-red-100 text-red-700",
        flag: "🇮🇩",
        sortOrder: 1,
      },
      {
        code: "en",
        name: "English",
        nativeName: "English",
        description: "International language",
        colorClass: "bg-blue-100 text-blue-700",
        flag: "🇺🇸",
        sortOrder: 2,
      },
      {
        code: "jv",
        name: "Bahasa Jawa",
        nativeName: "Basa Jawa",
        description: "Bahasa daerah Jawa",
        colorClass: "bg-yellow-100 text-yellow-700",
        flag: "🏛️",
        sortOrder: 3,
      },
      {
        code: "su",
        name: "Bahasa Sunda",
        nativeName: "Basa Sunda",
        description: "Bahasa daerah Sunda",
        colorClass: "bg-green-100 text-green-700",
        flag: "🏔️",
        sortOrder: 4,
      },
    ];

    const insertedLanguages = await db
      .insert(languages)
      .values(languagesData)
      .returning();
    console.log(`✅ Inserted ${insertedLanguages.length} languages`);

    // Seed users
    console.log("👤 Seeding users...");
    const usersData = [
      {
        username: "admin",
        email: "admin@istilahkata.id",
        emailVerified: true,
        displayName: "Administrator",
        avatar: "/placeholder/potrait-placeholder.png",
        bio: "Administrator platform IstilahKata",
        totalVotes: 500,
        totalWordCount: 1500,
        role: "admin" as const,
      },
      {
        username: "daud",
        email: "daud@example.com",
        emailVerified: true,
        displayName: "Daud Simbolon",
        avatar: "/placeholder/potrait-placeholder.png",
        bio: "Milenial yang concern dengan evolusi bahasa",
        totalVotes: 189,
        totalWordCount: 620,
        role: "user" as const,
      },
      {
        username: "sinta",
        email: "sinta@example.com",
        emailVerified: true,
        displayName: "Sinta Maharani",
        avatar: "/placeholder/potrait-placeholder.png",
        bio: "Content creator yang rajin berbagi pengetahuan",
        totalVotes: 167,
        totalWordCount: 480,
        role: "moderator" as const,
      },
      {
        username: "david",
        email: "david@example.com",
        emailVerified: true,
        displayName: "David Pratama",
        avatar: "/placeholder/potrait-placeholder.png",
        bio: "Gen Z enthusiast yang suka berbagi kata-kata gaul",
        totalVotes: 245,
        totalWordCount: 850,
        role: "user" as const,
      },
      {
        username: "rani",
        email: "rani@example.com",
        emailVerified: true,
        displayName: "Rani Kusuma",
        avatar: "/placeholder/potrait-placeholder.png",
        bio: "Digital native yang memahami tren terbaru",
        totalVotes: 203,
        totalWordCount: 710,
        role: "user" as const,
      },
      {
        username: "budi",
        email: "budi@example.com",
        emailVerified: true,
        displayName: "Budi Santoso",
        avatar: "/placeholder/potrait-placeholder.png",
        bio: "Pengusaha yang suka berbagi pengetahuan",
        totalVotes: 157,
        totalWordCount: 500,
        role: "user" as const,
      },
      // dewi
      {
        username: "dewi",
        email: "dewi@example.com",
        emailVerified: true,
        displayName: "Dewi Kusuma",
        avatar: "/placeholder/potrait-placeholder.png",
        bio: "Pengusaha yang suka berbagi pengetahuan",
        totalVotes: 157,
        totalWordCount: 500,
        role: "user" as const,
      },
    ];

    const insertedUsers = await db.insert(users).values(usersData).returning();
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Create mapping objects
    const userMap = Object.fromEntries(
      insertedUsers.map((user) => [user.username, user])
    );
    const generationMap = Object.fromEntries(
      insertedGenerations.map((gen) => [gen.code, gen])
    );
    const languageMap = Object.fromEntries(
      insertedLanguages.map((lang) => [lang.code, lang])
    );

    // Seed words with realistic context
    console.log("📝 Seeding words with realistic context...");
    const wordsData = [
      {
        term: "gabut",
        slug: "gabut",
        context:
          "Gw lagi gabut nih di rumah, mau ngapain ya? Udah main game dari tadi pagi.",
        requestedBy: userMap.david.id,
        totalViews: 1250,
        totalExplanations: 3,
        totalVotes: 105,
        status: "approved" as const,
      },
      {
        term: "kepo",
        slug: "kepo",
        context:
          "Lu jangan kepo deh sama urusan orang! Biarin aja mereka pacaran.",
        requestedBy: userMap.sinta.id,
        totalViews: 890,
        totalExplanations: 2,
        totalVotes: 89,
        status: "approved" as const,
      },
      {
        term: "baper",
        slug: "baper",
        context:
          "Jangan baper dong, gw cuma bercanda aja kok. Lu serius amat sih.",
        requestedBy: userMap.david.id,
        totalViews: 1890,
        totalExplanations: 3,
        totalVotes: 129,
        status: "approved" as const,
      },
      {
        term: "ghosting",
        slug: "ghosting",
        context:
          "Jadi temen gw kek ditinggalin gitu sama gebetannya, terus dia bilang kata ghosting.",
        requestedBy: userMap.sinta.id,
        totalViews: 2100,
        totalExplanations: 2,
        totalVotes: 134,
        status: "approved" as const,
      },
      {
        term: "flex",
        slug: "flex",
        context:
          "Dia suka flex iPhone barunya di Instagram story, padahal belinya nyicil.",
        requestedBy: userMap.rani.id,
        totalViews: 1120,
        totalExplanations: 2,
        totalVotes: 70,
        status: "approved" as const,
      },
      {
        term: "vibes",
        slug: "vibes",
        context:
          "Vibes cafe ini enak banget buat nongkrong, cozy dan musiknya bagus.",
        requestedBy: userMap.david.id,
        totalViews: 987,
        totalExplanations: 2,
        totalVotes: 79,
        status: "approved" as const,
      },
      {
        term: "skuy",
        slug: "skuy",
        context: "Skuy, kita makan nasi padang! Gw udah laper dari tadi.",
        requestedBy: userMap.rani.id,
        totalViews: 756,
        totalExplanations: 1,
        totalVotes: 63,
        status: "approved" as const,
      },
      {
        term: "bucin",
        slug: "bucin",
        context:
          "Lu bucin banget deh sama pacar, sampe temen-temen ditinggalin.",
        requestedBy: userMap.sinta.id,
        totalViews: 2340,
        totalExplanations: 2,
        totalVotes: 178,
        status: "approved" as const,
      },
      // Gen Alpha specific words
      {
        term: "ohio",
        slug: "ohio",
        context: "This place is so ohio, everything is weird and chaotic here.",
        requestedBy: userMap.rani.id,
        totalViews: 432,
        totalExplanations: 1,
        totalVotes: 28,
        status: "approved" as const,
      },
      {
        term: "gyatt",
        slug: "gyatt",
        context: "Gyatt! That car is absolutely insane looking!",
        requestedBy: userMap.david.id,
        totalViews: 298,
        totalExplanations: 1,
        totalVotes: 15,
        status: "approved" as const,
      },

      // Milenial specific words
      {
        term: "galau",
        slug: "galau",
        context: "Gw lagi galau nih mikirin masa depan, bingung mau ngapain.",
        requestedBy: userMap.daud.id,
        totalViews: 756,
        totalExplanations: 2,
        totalVotes: 45,
        status: "approved" as const,
      },
      {
        term: "lebay",
        slug: "lebay",
        context: "Lu lebay banget deh, masa gitu aja sampai drama segala.",
        requestedBy: userMap.sinta.id,
        totalViews: 634,
        totalExplanations: 1,
        totalVotes: 38,
        status: "approved" as const,
      },

      // Gen X words
      {
        term: "mantap",
        slug: "mantap",
        context: "Mantap jiwa! Pertunjukan tadi malam benar-benar luar biasa.",
        requestedBy: userMap.admin.id,
        totalViews: 892,
        totalExplanations: 1,
        totalVotes: 52,
        status: "approved" as const,
      },

      // Cross-generational words
      {
        term: "keren",
        slug: "keren",
        context: "Wah keren banget motornya, pasti mahal tuh.",
        requestedBy: userMap.daud.id,
        totalViews: 1124,
        totalExplanations: 2,
        totalVotes: 67,
        status: "approved" as const,
      },
      {
        term: "oke",
        slug: "oke",
        context: "Oke deh, gw setuju sama rencana lu.",
        requestedBy: userMap.sinta.id,
        totalViews: 445,
        totalExplanations: 1,
        totalVotes: 23,
        status: "approved" as const,
      },
      {
        term: "santuy",
        slug: "santuy",
        context: "Santuy, gak perlu khawatir.",
        requestedBy: userMap.rani.id,
        totalViews: 1120,
        totalExplanations: 2,
        totalVotes: 70,
        status: "approved" as const,
      },
      {
        term: "salty",
        slug: "salty",
        context: "Kalo jadi orang jangan salty deh.",
        requestedBy: userMap.david.id,
        totalViews: 1120,
        totalExplanations: 2,
        totalVotes: 70,
        status: "approved" as const,
      },
      {
        term: "toxic",
        slug: "toxic",
        context: "Toxic, toxic, toxic.",
        requestedBy: userMap.admin.id,
        totalViews: 1120,
        totalExplanations: 2,
        status: "approved" as const,
      },
    ];

    const insertedWords = await db.insert(words).values(wordsData).returning();
    console.log(`✅ Inserted ${insertedWords.length} words`);

    // Create word mapping
    const wordMap = Object.fromEntries(
      insertedWords.map((word) => [word.term, word])
    );

    // Seed word-language relationships
    console.log("🌐 Seeding word-language relationships...");
    const wordLanguageData = [
      // Indonesian words
      {
        wordId: wordMap.gabut.id,
        languageId: languageMap.id.id,
        isPrimary: true,
      },
      {
        wordId: wordMap.kepo.id,
        languageId: languageMap.id.id,
        isPrimary: true,
      },
      {
        wordId: wordMap.baper.id,
        languageId: languageMap.id.id,
        isPrimary: true,
      },
      {
        wordId: wordMap.skuy.id,
        languageId: languageMap.id.id,
        isPrimary: true,
      },
      {
        wordId: wordMap.bucin.id,
        languageId: languageMap.id.id,
        isPrimary: true,
      },

      // English words with secondary Indonesian
      {
        wordId: wordMap.ghosting.id,
        languageId: languageMap.en.id,
        isPrimary: true,
      },
      {
        wordId: wordMap.ghosting.id,
        languageId: languageMap.id.id,
        isPrimary: false,
      },
      {
        wordId: wordMap.flex.id,
        languageId: languageMap.en.id,
        isPrimary: true,
      },
      {
        wordId: wordMap.flex.id,
        languageId: languageMap.id.id,
        isPrimary: false,
      },
      {
        wordId: wordMap.vibes.id,
        languageId: languageMap.en.id,
        isPrimary: true,
      },
      {
        wordId: wordMap.vibes.id,
        languageId: languageMap.id.id,
        isPrimary: false,
      },
    ];

    await db.insert(wordLanguages).values(wordLanguageData);
    console.log(
      `✅ Inserted ${wordLanguageData.length} word-language relationships`
    );

    // Seed word-generation relationships
    console.log("🔗 Seeding word-generation relationships...");
    const wordGenerationData = [
      {
        wordId: wordMap.gabut.id,
        generationId: generationMap["gen-z"].id,
        isPrimary: true,
        confidence: 0.9,
      },
      {
        wordId: wordMap.gabut.id,
        generationId: generationMap.milenial.id,
        isPrimary: false,
        confidence: 0.8,
      },
      {
        wordId: wordMap.kepo.id,
        generationId: generationMap["lintas-generasi"].id,
        isPrimary: true,
        confidence: 0.85,
      },
      {
        wordId: wordMap.baper.id,
        generationId: generationMap["gen-z"].id,
        isPrimary: true,
        confidence: 0.95,
      },
      {
        wordId: wordMap.ghosting.id,
        generationId: generationMap["gen-z"].id,
        isPrimary: true,
        confidence: 0.9,
      },
      {
        wordId: wordMap.ghosting.id,
        generationId: generationMap.milenial.id,
        isPrimary: false,
        confidence: 0.7,
      },
      {
        wordId: wordMap.flex.id,
        generationId: generationMap["gen-z"].id,
        isPrimary: true,
        confidence: 0.9,
      },
      {
        wordId: wordMap.vibes.id,
        generationId: generationMap["gen-z"].id,
        isPrimary: true,
        confidence: 0.85,
      },
      {
        wordId: wordMap.skuy.id,
        generationId: generationMap["gen-z"].id,
        isPrimary: true,
        confidence: 0.95,
      },
      {
        wordId: wordMap.bucin.id,
        generationId: generationMap["gen-z"].id,
        isPrimary: true,
        confidence: 0.95,
      },
      // Gen Alpha words
      {
        wordId: wordMap.ohio.id,
        generationId: generationMap["gen-alpha"].id,
        isPrimary: true,
        confidence: 0.95,
      },
      {
        wordId: wordMap.gyatt.id,
        generationId: generationMap["gen-alpha"].id,
        isPrimary: true,
        confidence: 0.9,
      },

      // Milenial words
      {
        wordId: wordMap.galau.id,
        generationId: generationMap.milenial.id,
        isPrimary: true,
        confidence: 0.9,
      },
      {
        wordId: wordMap.lebay.id,
        generationId: generationMap.milenial.id,
        isPrimary: true,
        confidence: 0.85,
      },

      // Gen X words
      {
        wordId: wordMap.mantap.id,
        generationId: generationMap["gen-x"].id,
        isPrimary: true,
        confidence: 0.8,
      },

      // Cross-generational
      {
        wordId: wordMap.keren.id,
        generationId: generationMap["lintas-generasi"].id,
        isPrimary: true,
        confidence: 0.9,
      },
      {
        wordId: wordMap.oke.id,
        generationId: generationMap["lintas-generasi"].id,
        isPrimary: true,
        confidence: 0.95,
      },
    ];

    await db.insert(wordGenerations).values(wordGenerationData);
    console.log(
      `✅ Inserted ${wordGenerationData.length} word-generation relationships`
    );

    // Seed explanations
    console.log("💭 Seeding explanations...");
    const explanationsData = [
      {
        wordId: wordMap.gabut.id,
        userId: userMap.daud.id,
        content:
          'Akronim dari "gaji buta". Kondisi bosan atau tidak ada kegiatan yang berarti, awalnya digunakan di lingkungan kerja untuk menggambarkan situasi tidak ada pekerjaan tapi tetep harus standby.',
        example:
          "Hari ini gabut banget di kantor, gak ada kerjaan sama sekali tapi tetep harus standby.",
        votes: 156,
        wordCount: 32,
        isAccepted: true,
      },
      {
        wordId: wordMap.kepo.id,
        userId: userMap.sinta.id,
        content:
          'Berasal dari bahasa Hokkien "kay poh" yang berarti suka mencampuri urusan orang lain atau terlalu ingin tahu hal-hal yang bukan urusan kita.',
        example: "Jangan kepo deh sama hubungan mereka, itu kan privasi.",
        votes: 89,
        wordCount: 28,
        isAccepted: true,
      },
      {
        wordId: wordMap.baper.id,
        userId: userMap.david.id,
        content:
          'Singkatan dari "bawa perasaan". Digunakan ketika seseorang terlalu serius menanggapi candaan atau komentar yang sebenarnya tidak perlu diambil hati.',
        example: "Jangan baper dong, itu kan cuma bercandaan doang.",
        votes: 87,
        wordCount: 25,
        isAccepted: true,
      },
      {
        wordId: wordMap.ghosting.id,
        userId: userMap.rani.id,
        content:
          "Praktik tiba-tiba menghilang dari komunikasi tanpa penjelasan, seperti hantu yang menghilang. Biasa terjadi dalam hubungan dating atau pertemanan.",
        example:
          "Dia nge-ghost aku setelah kencan ketiga, padahal kayaknya fine-fine aja.",
        votes: 76,
        wordCount: 23,
        isAccepted: true,
      },
      {
        wordId: wordMap.flex.id,
        userId: userMap.rani.id,
        content:
          "Memamerkan atau show off sesuatu dengan sengaja, biasanya pencapaian, barang mahal, atau keunggulan tertentu untuk mendapat pengakuan.",
        example: "Dia suka flex mobil barunya di sosmed terus.",
        votes: 65,
        wordCount: 22,
        isAccepted: true,
      },
      {
        wordId: wordMap.vibes.id,
        userId: userMap.david.id,
        content:
          "Suasana, energi, atau aura yang dirasakan dari seseorang, tempat, atau situasi. Bisa positif atau negatif tergantung konteks.",
        example: "Vibes kafe ini enak banget, cocok buat kerja sambil ngopi.",
        votes: 58,
        wordCount: 21,
        isAccepted: true,
      },
      {
        wordId: wordMap.skuy.id,
        userId: userMap.david.id,
        content:
          'Kata ajakan yang berasal dari "yuk" yang dibalik. Digunakan untuk mengajak seseorang melakukan sesuatu dengan antusias.',
        example: "Skuy ke mall, lagi ada sale besar-besaran!",
        votes: 45,
        wordCount: 19,
        isAccepted: true,
      },
      {
        wordId: wordMap.bucin.id,
        userId: userMap.sinta.id,
        content:
          'Singkatan dari "budak cinta". Menggambarkan seseorang yang terlalu menuruti kemauan pasangan hingga mengabaikan hal lain.',
        example: "Dia bucin banget sama pacarnya, temen-temen jadi terabaikan.",
        votes: 42,
        wordCount: 20,
        isAccepted: true,
      },
      {
        wordId: wordMap.gabut.id,
        userId: userMap.sinta.id, // @sinta
        content:
          "Gabut itu perasaan bosan ekstrem ketika tidak ada yang bisa dikerjain. Biasanya terjadi pas weekend atau liburan panjang. Rasanya kayak waktu berjalan lambat banget dan pengen ngapa-ngapain tapi bingung mau ngapain.",
        example:
          "Udah 3 hari gabut di rumah, film udah ditontonin semua, games udah bosen.",
        votes: 89,
        wordCount: 28,
        isAccepted: false,
      },
      {
        wordId: wordMap.gabut.id,
        userId: userMap.rani.id, // @rani
        content:
          "Gabut dalam konteks media sosial artinya lagi gak ada konten menarik buat di-scroll. Jadi cuma bisa lihat-lihat timeline berulang kali sambil nunggu ada yang update status atau post foto baru.",
        example: "Gabut banget, udah scroll TikTok dari atas ke bawah 5 kali.",
        votes: 67,
        wordCount: 22,
        isAccepted: false,
      },
      {
        wordId: wordMap.gabut.id,
        userId: userMap.budi.id, // @budi
        content:
          "Menurut gue gabut itu kondisi mental ketika otak butuh stimulasi tapi gak tau mau ngapain. Beda sama malas ya, kalau malas itu tau ada kerjaan tapi gak mau ngerjain. Kalau gabut ini genuinely gak ada aktivitas.",
        example: "Gabut parah nih, otak rasanya kayak mau melted.",
        votes: 45,
        wordCount: 32,
        isAccepted: false,
      },

      // SKUY explanations
      {
        wordId: wordMap.skuy.id,
        userId: userMap.sinta.id, // @sinta
        content:
          "Skuy itu singkatan dari 'ayo skuy' yang artinya ayo pergi atau ayo lakukan sesuatu. Kata ini populer banget di kalangan anak muda buat ngajak temen-temen melakukan aktivitas bareng.",
        example: "Skuy ke mall, lagi ada sale besar-besaran!",
        votes: 234,
        wordCount: 25,
        isAccepted: false,
      },
      {
        wordId: wordMap.skuy.id,
        userId: userMap.rani.id, // @rani
        content:
          "Skuy bisa juga dipake buat nyemangatin diri sendiri atau orang lain. Kayak kata motivasi gitu, biar lebih semangat ngerjain sesuatu atau berangkat ke suatu tempat.",
        example: "Besok ujian, skuy belajar dari sekarang!",
        votes: 178,
        wordCount: 21,
        isAccepted: false,
      },
      {
        wordId: wordMap.skuy.id,
        userId: userMap.dewi.id, // @dewi
        content:
          "Skuy itu evolusi dari kata 'yuk' tapi kedengerannya lebih modern dan gaul. Fungsinya sama sih, buat ngajak orang, tapi skuy ini lebih catchy dan sering dipake di social media.",
        example: "Skuy nonton bioskop, film baru lagi bagus katanya.",
        votes: 156,
        wordCount: 24,
        isAccepted: false,
      },

      // SANTUY explanations
      {
        wordId: wordMap.santuy.id,
        userId: userMap.budi.id, // @budi
        content:
          "Santuy itu gabungan dari 'santai' dan 'enjoy'. Artinya rileks, gak stress, dan menikmati hidup apa adanya. Biasanya dipake buat bilang ke orang lain supaya gak terlalu tegang.",
        example: "Santuy aja bro, masalah pasti ada solusinya.",
        votes: 198,
        wordCount: 26,
        isAccepted: true,
      },
      {
        wordId: wordMap.santuy.id,
        userId: userMap.david.id, // @david
        content:
          "Santuy bisa juga berarti approach hidup yang gak terlalu ambisius. Lebih memilih kebahagiaan sederhana daripada ngejar target yang bikin stress. Hidup yang balance gitu.",
        example: "Gaji pas-pasan tapi santuy, yang penting keluarga bahagia.",
        votes: 134,
        wordCount: 23,
        isAccepted: false,
      },

      // BUCIN explanations (update existing + add new)
      {
        wordId: wordMap.bucin.id,
        userId: userMap.dewi.id, // @dewi
        content:
          "Bucin singkatan dari 'budak cinta'. Ini sebutan buat orang yang udah terlalu dalam cintanya sampai rela ngelakuin apa aja demi pasangan, bahkan hal-hal yang sebenernya memalukan atau merugikan diri sendiri.",
        example: "Dia bucin banget sama pacarnya, temen-temen jadi terabaikan.",
        votes: 167,
        wordCount: 30,
        isAccepted: true,
      },
      {
        wordId: wordMap.bucin.id,
        userId: userMap.sinta.id, // @sinta
        content:
          "Bucin itu kondisi ketika seseorang kehilangan identitas dirinya karena terlalu fokus sama pasangan. Biasanya jadi gak punya waktu buat temen, hobi, atau hal-hal lain selain pacaran.",
        example:
          "Sejak jadian, dia jadi bucin parah, gak pernah nongkrong lagi.",
        votes: 89,
        wordCount: 24,
        isAccepted: false,
      },
      {
        wordId: wordMap.bucin.id,
        userId: userMap.rani.id, // @rani
        content:
          "Bucin dalam konteks positif bisa juga berarti orang yang loyal dan setia sama pasangan. Tergantung konteks sih, kadang dipake buat ngeledek, kadang buat apresiasi kesetiaan seseorang.",
        example: "Bucin tapi loyal, 10 tahun pacaran gak pernah selingkuh.",
        votes: 156,
        wordCount: 22,
        isAccepted: false,
      },

      // FLEX explanations
      {
        wordId: wordMap.flex.id,
        userId: userMap.david.id, // @david
        content:
          "Flex artinya pamer atau show off sesuatu yang dimiliki, biasanya harta, pencapaian, atau privilege. Tujuannya biar orang lain tau kalau kita punya sesuatu yang keren atau mahal.",
        example: "Flex mobil baru di Instagram story terus.",
        votes: 203,
        wordCount: 26,
        isAccepted: false,
      },
      {
        wordId: wordMap.flex.id,
        userId: userMap.budi.id, // @budi
        content:
          "Flex bisa juga berarti menunjukkan kemampuan atau skill yang dimiliki. Gak selalu soal barang material, tapi juga bisa achievement, talent, atau pengalaman unik yang jarang dimiliki orang lain.",
        example: "Dia flex skill coding-nya dengan bikin app keren.",
        votes: 178,
        wordCount: 25,
        isAccepted: false,
      },

      // SALTY explanations
      {
        wordId: wordMap.salty.id,
        userId: userMap.rani.id, // @rani
        content:
          "Salty itu perasaan kesel, iri, atau bitter karena kalah atau gak dapet sesuatu yang diinginkan. Biasanya muncul ketika orang lain berhasil sedangkan kita gagal, jadi mood jadi kayak asin gitu.",
        example:
          "Salty banget lihat mantan udah nikah, padahal baru putus 2 bulan.",
        votes: 145,
        wordCount: 28,
        isAccepted: true,
      },
      {
        wordId: wordMap.salty.id,
        userId: userMap.dewi.id, // @dewi
        content:
          "Salty juga bisa berarti attitude yang defensive atau mudah tersinggung ketika dikritik atau disindir. Orang yang salty biasanya gampang triggered dan responnya cenderung emosional.",
        example:
          "Dikritik dikit langsung salty, padahal cuma saran konstruktif.",
        votes: 98,
        wordCount: 21,
        isAccepted: false,
      },

      // GHOSTING explanations
      {
        wordId: wordMap.ghosting.id,
        userId: userMap.sinta.id, // @sinta
        content:
          "Ghosting itu tindakan menghilang tiba-tiba dari kehidupan seseorang tanpa penjelasan. Biasanya terjadi dalam konteks dating atau pertemanan, di mana seseorang tiba-tiba berhenti membalas chat atau telepon.",
        example:
          "Udah 2 minggu di-ghosting, chat gak dibales, telepon gak diangkat.",
        votes: 267,
        wordCount: 28,
        isAccepted: false,
      },
      {
        wordId: wordMap.ghosting.id,
        userId: userMap.budi.id, // @budi
        content:
          "Ghosting adalah bentuk komunikasi pasif-agresif ketika seseorang gak mau konfrontasi langsung. Daripada ngomong jujur kalau udah gak tertarik, mereka milih menghilang aja.",
        example: "Dia ghosting daripada bilang langsung kalau udah gak suka.",
        votes: 189,
        wordCount: 23,
        isAccepted: false,
      },

      // VIBES explanations
      {
        wordId: wordMap.vibes.id,
        userId: userMap.david.id, // @david
        content:
          "Vibes itu energi atau aura yang dipancarkan seseorang atau suatu tempat. Bisa positif atau negatif, dan biasanya kita bisa ngerasain vibes ini secara intuisi tanpa harus dijelaskan secara detail.",
        example: "Vibes tempat ini enak banget, bikin betah berlama-lama.",
        votes: 187,
        wordCount: 25,
        isAccepted: false,
      },
      {
        wordId: wordMap.vibes.id,
        userId: userMap.sinta.id, // @sinta
        content:
          "Vibes juga bisa berarti suasana hati atau mood yang sedang dirasakan. Kadang kita bilang 'lagi good vibes' atau 'bad vibes' tergantung perasaan saat itu.",
        example: "Hari ini vibes-nya lagi gak enak, pengen di rumah aja.",
        votes: 134,
        wordCount: 20,
        isAccepted: false,
      },

      // TOXIC explanations
      {
        wordId: wordMap.toxic.id,
        userId: userMap.rani.id, // @rani
        content:
          "Toxic artinya perilaku yang merusak dan merugikan orang lain atau diri sendiri. Biasanya dalam konteks relationship atau friendship, toxic behavior ini bisa berupa manipulasi, possessive, atau selalu menyalahkan orang lain.",
        example:
          "Hubungan mereka toxic banget, selalu bertengkar dan saling menyakiti.",
        votes: 198,
        wordCount: 28,
        isAccepted: true,
      },
      {
        wordId: wordMap.toxic.id,
        userId: userMap.budi.id, // @budi
        content:
          "Toxic juga bisa merujuk pada lingkungan atau situasi yang gak sehat secara mental. Misalnya workplace yang toxic, di mana ada bullying, politik kantor, atau tekanan berlebihan yang bikin stress.",
        example: "Kantor lama gue toxic parah, makanya gue resign.",
        votes: 145,
        wordCount: 26,
        isAccepted: false,
      },

      // Add more explanations for other words...
      // KEPO explanations
      {
        wordId: wordMap.kepo.id,
        userId: userMap.dewi.id, // @dewi
        content:
          "Kepo singkatan dari 'Knowing Every Particular Object' tapi sekarang artinya lebih ke penasaran berlebihan atau suka ngurusin urusan orang lain. Biasanya dipakai buat ngeledek orang yang terlalu ingin tahu.",
        example: "Jangan kepo dong, itu urusan dia sama pacarnya.",
        votes: 176,
        wordCount: 24,
        isAccepted: false,
      },
    ];

    const insertedExplanations = await db
      .insert(explanations)
      .values(explanationsData)
      .returning();
    console.log(`✅ Inserted ${insertedExplanations.length} explanations`);

    console.log("💬 Seeding comments...");
    const commentsData = [
      // Comments untuk explanation gabut pertama (daud's explanation)
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes('Akronim dari "gaji buta"')
        )?.id,
        userId: userMap.sinta.id,
        content:
          "Nah ini penjelasan yang paling masuk akal! Di tempat kerja gw juga sering dengar istilah ini.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes('Akronim dari "gaji buta"')
        )?.id,
        userId: userMap.rani.id,
        content:
          "Tapi sekarang gabut udah meluas penggunaannya ya, gak cuma di kantor aja.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes('Akronim dari "gaji buta"')
        )?.id,
        userId: userMap.budi.id,
        content:
          "Betul banget, ini asal muasal kata gabut yang sebenarnya. Good explanation!",
      },

      // Comments untuk explanation gabut kedua (sinta's explanation)
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("perasaan bosan ekstrem")
        )?.id,
        userId: userMap.david.id,
        content:
          "Ini relate banget sama kondisi gw pas liburan panjang kemarin 😅",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("perasaan bosan ekstrem")
        )?.id,
        userId: userMap.dewi.id,
        content:
          "Gabut weekend tuh real banget, udah gak tau mau ngapain lagi.",
      },

      // Comments untuk skuy explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("singkatan dari 'ayo skuy'")
        )?.id,
        userId: userMap.daud.id,
        content:
          "Wah baru tau skuy itu kepanjangan dari ayo skuy. Kirain cuma slang biasa.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("singkatan dari 'ayo skuy'")
        )?.id,
        userId: userMap.budi.id,
        content: "Anak-anak sekarang kreatif banget bikin kata-kata baru ya 👍",
      },

      // Comments untuk bucin explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("budak cinta")
        )?.id,
        userId: userMap.david.id,
        content:
          "Definisi yang akurat! Pernah jadi korban bucin juga sih dulu 😂",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("budak cinta")
        )?.id,
        userId: userMap.rani.id,
        content:
          "Bucin ini emang fenomena yang sering banget terjadi di relationship anak muda.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("budak cinta")
        )?.id,
        userId: userMap.sinta.id,
        content:
          "Yang penting ada balance ya antara sayang sama pasangan tapi tetap jaga diri sendiri.",
      },

      // Comments untuk ghosting explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("menghilang tiba-tiba")
        )?.id,
        userId: userMap.dewi.id,
        content:
          "Ghosting ini toxic behavior banget menurutku. Better komunikasi yang jujur.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("menghilang tiba-tiba")
        )?.id,
        userId: userMap.budi.id,
        content:
          "Setuju, ghosting itu nyakitin dan bikin orang bingung. Mending speak up aja.",
      },

      // Comments untuk flex explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("pamer atau show off")
        )?.id,
        userId: userMap.sinta.id,
        content:
          "Flex yang berlebihan emang cringe sih, tapi kalo sewajarnya ya gak masalah.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("pamer atau show off")
        )?.id,
        userId: userMap.rani.id,
        content:
          "Social media jaman sekarang penuh dengan orang yang suka flex 📱",
      },

      // Comments untuk toxic explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("perilaku yang merusak")
        )?.id,
        userId: userMap.david.id,
        content:
          "Penting banget recognize toxic behavior ini. Red flags yang harus dihindari!",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("perilaku yang merusak")
        )?.id,
        userId: userMap.dewi.id,
        content:
          "Toxic relationship/friendship memang harus segera ditinggalkan demi mental health.",
      },

      // Comments untuk salty explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("perasaan kesel, iri")
        )?.id,
        userId: userMap.budi.id,
        content:
          "Salty ini natural human emotion sih, yang penting gimana cara handle-nya.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("perasaan kesel, iri")
        )?.id,
        userId: userMap.sinta.id,
        content:
          "Kadang kita salty tanpa sadar ya, apalagi kalo lagi down mood.",
      },

      // Comments untuk vibes explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("energi atau aura")
        )?.id,
        userId: userMap.rani.id,
        content:
          "Vibes ini emang something yang bisa dirasain tapi susah dijelasin ya.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("energi atau aura")
        )?.id,
        userId: userMap.budi.id,
        content:
          "First impression itu mostly dari vibes yang kita pancarkan ke orang lain.",
      },

      // Comments untuk santuy explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("santai dan enjoy")
        )?.id,
        userId: userMap.dewi.id,
        content:
          "Santuy mindset ini healthy banget di era yang serba fast-paced kayak sekarang.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("santai dan enjoy")
        )?.id,
        userId: userMap.david.id,
        content:
          "Work-life balance yang santuy tapi tetep produktif, that's the goal!",
      },

      // Comments untuk kepo explanation
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("Knowing Every Particular Object")
        )?.id,
        userId: userMap.sinta.id,
        content:
          "Wah baru tau kepanjangan KEPO yang ini! Selama ini tahunya dari bahasa Hokkien.",
      },
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("Knowing Every Particular Object")
        )?.id,
        userId: userMap.rani.id,
        content:
          "Ada dua versi ya ternyata etimologi kata kepo. Interesting! 🤔",
      },

      // Additional comments untuk diversifikasi
      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("kondisi mental ketika otak")
        )?.id,
        userId: userMap.dewi.id,
        content:
          "Analisis psikologis yang menarik! Gabut vs malas emang beda ya ternyata.",
      },

      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("komunikasi pasif-agresif")
        )?.id,
        userId: userMap.sinta.id,
        content:
          "Ghosting sebagai passive-aggressive behavior, perspective yang bagus ini.",
      },

      {
        explanationId: insertedExplanations.find((exp) =>
          exp.content.includes("kehilangan identitas")
        )?.id,
        userId: userMap.david.id,
        content:
          "Bucin yang sampai lose identity, this hits different. Harus aware sama hal ini.",
      },
    ];

    // Filter out any comments with null explanationId
    const validCommentsData = commentsData.filter(
      (comment) => comment.explanationId
    );

    if (validCommentsData.length > 0) {
      const insertedComments = await db
        .insert(comments)
        .values(validCommentsData)
        .returning();
      console.log(`✅ Inserted ${insertedComments.length} comments`);
    } else {
      console.log("⚠️ No valid comments to insert");
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📝 Context Examples Added:");
    wordsData.forEach((word, index) => {
      console.log(`${index + 1}. ${word.term}: "${word.context}"`);
    });

    console.log("\n🏠 Expected Daily Words (sorted by votes):");
    explanationsData
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 6)
      .forEach((exp, index) => {
        // const word = wordsData.find((w) => w.requestedBy === exp.userId);
        console.log(
          `${index + 1}. ${Object.keys(wordMap).find(
            (k) => wordMap[k].id === exp.wordId
          )} - ${exp.votes} votes`
        );
      });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close database connection
    await queryClient.end();
    console.log("🔌 Database connection closed");
  }
}

// Run the seeding
main()
  .then(() => {
    console.log("✅ Seeding process completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  });
