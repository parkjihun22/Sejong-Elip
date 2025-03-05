import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./UrlContainer.module.scss";
import urlList from "../../UrlList";

const UrlContainer = () => {
    const containerRef = useRef(null);
    const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
    const [scrollIndex, setScrollIndex] = useState(0);
    const visibleItems = isMobile ? 3 : 5;
    const itemWidth = isMobile ? 27 : 16; 

    const handleScroll = (direction) => {
        if (!containerRef.current) return;

        let newIndex = scrollIndex + (direction === "left" ? -3 : 3);
        if (newIndex < 0 || newIndex > urlList.length - visibleItems) return;

        setScrollIndex(newIndex);
        containerRef.current.scrollTo({
            left: newIndex * (itemWidth * window.innerWidth) / 100,
            behavior: "smooth",
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>전국 제휴현장 소개</div>

            <div className={styles.urlContainer}> {/* ✅ 대소문자 맞춤 */}
                <button
                    className={styles.navButton}
                    onClick={() => handleScroll("left")}
                    disabled={scrollIndex === 0}
                >
                    ◀
                </button>

                <div className={styles.innerContainer} ref={containerRef}>
                    {urlList.map((value, index) => (
                        <a key={index} className={styles.urlContent} href={value.url}>
                            <img src={value.image} alt={value.image_alt} />

                            <div>{value.name}</div>
                        </a>
                    ))}
                </div>

                <button
                    className={styles.navButton}
                    onClick={() => handleScroll("right")}
                    disabled={scrollIndex >= urlList.length - visibleItems}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default UrlContainer;
