import { useEffect, useState } from "react";
import heroImage1x from "../../assets/images/Hero-image-1x.png";
import heroImage2x from "../../assets/images/Hero-image-2x.png";
import s from "./Home.module.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };
  const [imageSrc, setImageSrc] = useState(heroImage1x);

  useEffect(() => {
    if (window.devicePixelRatio > 1) {
      setImageSrc(heroImage2x); // Заміна зображення для Retina дисплеїв
    }
  }, []);

  return (
    <div
      className={s.container}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "1440px",
        height: "696px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className={s.container_button}>
        <h2 className={s.title}>Campers of your dreams</h2>
        <p className={s.item}>
          You can find everything you want in your catalog
        </p>
        <button className={s.button} onClick={handleClick}>
          View Now
        </button>
      </div>
    </div>
  );
};

export default Home;
