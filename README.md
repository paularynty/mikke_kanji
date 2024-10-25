# Mikke: Kanji Lookup/Learning App

This is my submission to the Web Dev Express coding challenge at Hive Helsinki, which challenges students to create a full stack web app in the span of two weeks.

## Overview

Mikke is a quick, low-threshold way to look up kanji (Japanese characters/ideograms adapted from Chinese characters). The app is aimed at people with already some knowledge of kanji.

The app displays a full list of kanji from the external API kindly provided by [kanji alive](https://rapidapi.com/KanjiAlive/api/learn-to-read-and-write-japanese-kanji/). The list may be sorted by stroke order (how many brushstrokes needed to write the entire character). 

Individual kanji search by English word is also available. By clicking on any kanji in the search result or list, you may view information about said kanji such as all possible meanings, onyomi/kunyomi (Chinese/Japanese) readings, and stroke count.

Project has been built with React and JavaScript. Backend is currently being built using Node.js, and PostgreSQL and Docker for the database.

## Installation

1. Clone repository
2. Go to directory with `cd mikke_kanji`
3. `cd backend && npm install`
4. `node index.js` to start the backend server
4. `cd ../frontend && npm install`
5. `npm start` to launch the frontend
   - (If `npm start` does not work, ensure you have React installed on your computer.)
6. If not opened automatically, open [http://localhost:3000](http://localhost:3000) in your chosen browser to display the app.
