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
    ];

    const insertedExplanations = await db
      .insert(explanations)
      .values(explanationsData)
      .returning();
    console.log(`✅ Inserted ${insertedExplanations.length} explanations`);

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
