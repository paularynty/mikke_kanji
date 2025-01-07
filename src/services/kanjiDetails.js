// import axios from "axios";

// export default async function handler(req, res) {
//   const { character } = req.query;

//   try {
//     const options = {
//       method: "GET",
//       url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${encodeURIComponent(
//         character
//       )}`,
//       headers: {
//         "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//         "x-rapidapi-host": process.env.RAPIDAPI_HOST,
//       },
//     };

//     const response = await axios.request(options);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error fetching Kanji details:", error);
//     res.status(500).json({ error: "Failed to fetch Kanji details" });
//   }
// }
