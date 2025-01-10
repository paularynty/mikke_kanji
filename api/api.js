// import axios from "axios";

// export const fetchKanjiSearchResults = async (word) => {
//   try {
//     const response = await axios.get(
//       `https://kanjialive-api.p.rapidapi.com/api/public/search/${encodeURIComponent(
//         word
//       )}`,
//       {
//         headers: {
//           "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
//           "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
//         },
//       }
//     );
//     return response.data; // Return the data fetched from the external API
//   } catch (error) {
//     console.error("Error fetching Kanji search results:", error);
//     console.log("API Key:", process.env.REACT_APP_RAPIDAPI_KEY);
//     console.log("API Host:", process.env.REACT_APP_RAPIDAPI_HOST);
//     throw error; // Throw an error so that kanjiSearch.js can handle it
//   }
// };
