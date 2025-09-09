import { getDailyWords } from "../lib/db/queries/homepage";

async function testDailyWords() {
  try {
    console.log("🧪 Testing getDailyWords query...");

    const dailyWords = await getDailyWords(6);

    console.log(`✅ Retrieved ${dailyWords.length} daily words`);

    dailyWords.forEach((word, index) => {
      console.log(`\n${index + 1}. ${word.term}`);
      console.log(`   Views: ${word.totalViews}`);
      console.log(`   Explanations: ${word.totalExplanations}`);
      console.log(
        `   Languages: ${word.languages.map((l) => l.name).join(", ")}`
      );
      console.log(
        `   Generations: ${word.generations.map((g) => g.name).join(", ")}`
      );
      if (word.topExplanation) {
        console.log(
          `   Top explanation: ${word.topExplanation.votes} votes by @${word.topExplanation.author.username}`
        );
        console.log(
          `   Content: ${word.topExplanation.content.substring(0, 50)}...`
        );
      }
    });
  } catch (error) {
    console.error("❌ Error testing daily words:", error);
  }
}

testDailyWords();
