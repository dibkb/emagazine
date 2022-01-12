import React, {
  useState,
  FunctionComponent,
  useCallback,
  useEffect,
} from "react";
import styles from "../../styles/Gallary.module.scss";
// react icons
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
// swipeable
import { useSwipeable } from "react-swipeable";
// import images
import { images } from "../../helper/images";
const Gallary: FunctionComponent = () => {
  const [currImg, setCurrImg] = useState(0);
  const [pause, setPause] = useState<Boolean>(false);
  const toggleIconStyle = {
    fontSize: "3rem",
    color: "#fff",
  };
  const dotsArr = Array.from(Array(images.length).keys());
  // toggle hadlers
  const toggleLefthadler = useCallback(() => {
    if (currImg > 0) {
      setCurrImg((currImg) => currImg - 1);
    } else if (currImg === 0) {
      setCurrImg(images.length - 1);
    }
  }, [currImg]);
  const toggleRighthadler = useCallback(() => {
    if (currImg < images.length - 1) {
      setCurrImg((currImg) => currImg + 1);
    } else if (currImg === images.length - 1) {
      setCurrImg(0);
    }
  }, [currImg]);
  const handlers = useSwipeable({
    onSwipedLeft: toggleRighthadler,
    onSwipedRight: toggleLefthadler,
  });
  // auto cycle
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        toggleRighthadler();
      }
    }, 2700);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });
  return (
    <div className={styles["gallary-container"]} {...handlers}>
      <div
        className={styles["img-container"]}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <div className={styles["toggle-left"]} onClick={toggleLefthadler}>
          <MdOutlineNavigateBefore style={toggleIconStyle} />
        </div>
        <img
          src={images[currImg].img.src}
          alt={images[currImg].title}
          className={styles["image"]}
        />
        <div className={styles["toggle-right"]} onClick={toggleRighthadler}>
          <MdOutlineNavigateNext style={toggleIconStyle} />
        </div>
      </div>
      <div className={styles["dots"]}>
        {dotsArr.map((arr) => {
          if (arr === currImg) {
            return <div className={styles["dot-active"]} key={arr}></div>;
          } else {
            return <div className={styles["dot"]} key={arr}></div>;
          }
        })}
      </div>
      <div className={styles["info"]}>
        <span className={styles["title"]}>{images[currImg].title}</span>
        {images[currImg].credit && (
          <span className={styles["credit"]}>- {images[currImg].credit}</span>
        )}
      </div>
    </div>
  );
};

export default Gallary;
