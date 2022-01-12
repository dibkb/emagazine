import React, {
  useState,
  FunctionComponent,
  useCallback,
  useEffect,
} from "react";
import styles from "../../styles/Gallary.module.scss";
// react icons
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
// swipeable
import { useSwipeable } from "react-swipeable";
// import images
import { images } from "../../helper/images";
const Gallary: FunctionComponent = () => {
  const [currImg, setCurrImg] = useState(0);
  const [pause, setPause] = useState<Boolean>(false);
  const [auto, setAuto] = useState<Boolean>(true);
  const toggleIconStyle = {
    fontSize: "3rem",
    color: "#fff",
  };
  const instagramIcon = {
    fontSize: "1.8rem",
    color: "#fff",
  };
  const switchIconStyle = {
    fontSize: "3.6rem",
    color: "#c3f631",
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
  const toggleAuto = useCallback(() => {
    setAuto((auto) => !auto);
  }, [setAuto]);
  // auto cycle
  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause && auto) {
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
      <div className={styles["toggle-container"]} onClick={toggleAuto}>
        {!auto && <p>Slideshow Off</p>}
        {auto && <p>Slideshow On</p>}
        {!auto && <p>Auto Off</p> && <BsToggle2Off style={switchIconStyle} />}
        {auto && <p>Auto On</p> && <BsToggle2On style={switchIconStyle} />}
      </div>
      <div
        className={styles["img-container"]}
        onMouseEnter={useCallback(() => setPause(true), [setPause])}
        onMouseLeave={useCallback(() => setPause(false), [setPause])}
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
        {images[currImg].semester && (
          <span className={styles["semester"]}>{images[currImg].semester}</span>
        )}
        {currImg === 19 && (
          <a
            href="https://www.instagram.com/aversitymedia/?hl=en"
            className={styles["instagram-link"]}
          >
            <AiOutlineInstagram style={instagramIcon} />
            <p>aversitymedia</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default Gallary;
