import { useContextInfo } from "../context/Context";

export default function SearchBar(props) {
  const { info } = useContextInfo();

  //sugestions
  const sugestionsHandler = (text) => {
    let matches = [];
    //regular expression to search for similar words as you are typing
    if (text.length > 0) {
      matches = info.filter((data) => {
        const formatter = text.replace(
          /[°"§%()\*\[\]{}=\\?´`'#<>|,;.:+_-]+/g,
          (x) => `\\${x}`,
        );
        const regex = new RegExp(`${formatter}`, "gi");
        return data.name.match(regex);
      });
    }
    // assign matches to a state
    props.setSuggestions(matches);
    props.setPage(1);
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Pokemon name here..."
        onChange={(e) => {
          sugestionsHandler(e.target.value);
        }}
      />
    </div>
  );
}
