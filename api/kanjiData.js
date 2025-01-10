// import axios from "axios";

// export default async function handler(req, res) {
//   try {
//     const options = {
//       method: "GET",
//       url: "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all/",
//       headers: {
//         "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//         "x-rapidapi-host": process.env.RAPIDAPI_HOST,
//       },
//     };

//     const response = await axios.request(options);
//     let kanjiData = response.data;

//     const formattedData = kanjiData.map((item) => ({
//       kanji: {
//         character: item.kanji.character,
//         strokes: item.kanji.strokes ? item.kanji.strokes.count : null,
//         onyomi: item.kanji.onyomi,
//         kunyomi: item.kanji.kunyomi,
//         meaning: item.kanji.meaning.english,
//       },
//     }));

//     res.status(200).json(formattedData);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Failed to fetch Kanji data" });
//   }
// }
