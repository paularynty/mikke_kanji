import { useTheme } from "./LightDarkMode";
import { useMemo } from "react";

const KanjiSort = ({ data, sortType }) => {
  const { darkMode } = useTheme();
  const sortedData = useMemo(() => {
    let result = [...data];

    if (sortType === "descending") {
      result.sort((a, b) => b.kanji.strokes.count - a.kanji.strokes.count);
    } else if (sortType === "ascending") {
      result.sort((a, b) => a.kanji.strokes.count - b.kanji.strokes.count);
    }

    return result;
  }, [data, sortType]);

  return (
    <div className="grid-container">
      {sortedData.map((kanji, index) => (
        <div
          className={
            darkMode ? "grid-item-clickable dark-mode" : "grid-item-clickable"
          }
          key={index}
          onClick={() => (window.location.href = `/kanji/${kanji.ka_utf}`)}
        >
          {kanji.ka_utf}
        </div>
      ))}
    </div>
  );
};

export default KanjiSort;
