import { useEffect, useState } from "react";
import "./Popup.css";

const Popup = ({}) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://history.ahmadiyya.uk/wp-json/wp/v2/time-line"
      );
      const data = await response.json();
      console.log("data", data);
      console.log("data", data[0].title);
      setTitle(data[0].title.rendered);
    };

    fetchData();
  }, []);

  return (
    <div className="popup-wrapper">
      <h4>{title}</h4>
    </div>
  );
};

export default Popup;
