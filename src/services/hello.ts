// export default function handler(req, res) {
//   res.status(200).json({ message: "Hello from Vercel Backend!" });
// }

// import axios from "axios";

// export default async function handler(req, res) {
//   try {
//     const response = await axios.get(
//       "https://kanjialive-api.p.rapidapi.com/api/public/kanji/all/",
//       {
//         headers: {
//           "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//           "x-rapidapi-host": process.env.RAPIDAPI_HOST,
//         },
//       }
//     );
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// }
