import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // SEO 메타 태그 추가를 위한 Helmet 임포트

// PC, 모바일 전용 CSS 모듈 (Main.module.scss 안에 모든 스타일을 넣은 경우)
import styles from "./Main.module.scss";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FixIcon from "../../components/FixIcon/FixIcon";
import UnitplanBox from "../../components/UnitplanBox/UnitplanBox";
import MobilePopup from "../../components/MobilePopup/MobilePopup";
import Popup from "../../components/Popup/Popup";
import MobileSectionBox from "../../components/MobileSectionBox/MobileSectionBox";
import InterestPopup from "../../components/InterestPopup/InterestPopup";
// import UrlContainer from "../../components/UrlContainer/UrlContainer";

import mainImage from "../../assets/Main/Main1.jpg";
import section1_Image1 from "../../assets/Main/section1-img1.jpg";
import section2_Image1 from "../../assets/Main/section2-img1.jpg";
import section3_Image1 from "../../assets/Main/section3-img1.png";
import section3_Image2 from "../../assets/Main/section3-img2.png";
import section3_Image3 from "../../assets/Main/section3-img3.png";
import section3_Image4 from "../../assets/Main/section3-img4.png";
import section4_Image1 from "../../assets/Main/section4-img1.jpg";
import section4_Image2 from "../../assets/Main/section4-img2.jpg";
import section4_Image3 from "../../assets/Main/section4-img3.jpg";
import section8Img3 from "../../assets/Main/section8Img3.jpg";
import mobileImageMain from "../../assets/Main/mobileMain1.jpg";
import popupPage1 from "../../assets/Popup/page1.jpg";
import popupPage2 from "../../assets/Popup/page2.jpg";
import popupPage3 from "../../assets/Popup/page3.jpg";
import popupPage4 from "../../assets/Popup/page3.jpg";

import mobilePopupPage1 from "../../assets/Popup/mobilepage1.jpg";
import mobilePopupPage2 from "../../assets/Popup/mobilepage2.jpg";
import mobilePopupPage3 from "../../assets/Popup/mobilepage3.jpg";
import mobilePopupPage4 from "../../assets/Popup/mobilepage3.jpg";
import map1 from "../../assets/Main/map1.jpg";
import mobilemap1 from "../../assets/Main/mobilemap1.jpg";

import subpinkimg from "../../assets/Main/subpinkimg.jpg";

const section3Contents = [
  {
    imgSrc: section3_Image1,
    title: "PREMIUM 01",
    text1: `1990세대 랜드마크 계룡건설`,
    text2: `을 대표할<br />
			  대단지 브랜드 프리미엄`,
    link: "/BusinessGuide/intro",
    linkText: "더 알아보기 >",
  },
  {
    imgSrc: section3_Image2,
    title: "PREMIUM 02",
    text1: `여유로운 직주근접 단지`,
    text2: `세계최대규모 삼성전자 캠퍼스<br />
			  송탄·칠괴 산단,KG모빌리티 등`,
    link: "/LocationEnvironment/intro",
    linkText: "더 알아보기 >",
  },
  {
    imgSrc: section3_Image3,
    title: "PREMIUM 03",
    text1: `다 갖춘 고품격 커뮤니티`,
    text2: ` 내 최초 실내 수영장 및<br />
			  독서실 골프클럽 등 대규모 커뮤니티`,
    link: "/LocationEnvironment/intro",
    linkText: "더 알아보기 >",
  },
  {
    imgSrc: section3_Image4,
    title: "PREMIUM 04",
    text1: `합리적 분양가 상한제`,
    text2: `입주자의 경제적 부담을 낮춘<br />
			  내 집 마련의 기회`,
    link: "/LocationEnvironment/primium",
    linkText: "더 알아보기 >",
  },
];

const Main = () => {
  // 기존 상태 변수들
  const [isScroll, setIsScroll] = useState(false);
  const [page, setPage] = useState(1); // 페이지 세션 번호
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 중 여부
  const [isOpenPopup1, setIsOpenPopup1] = useState(true);
  const [isOpenPopup2, setIsOpenPopup2] = useState(true);
  const [isOpenPopup3, setIsOpenPopup3] = useState(true);
  const [isOpenPopup4, setIsOpenPopup4] = useState(true);
  const [isInterestPopupOpen, setIsInterestPopupOpen] = useState(false); // 방문예약 팝업 상태
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  // 관심고객 등록 폼 상태 관리 (방문일자 필드 포함)
  const [registration, setRegistration] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistration((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 기존 제출 핸들러는 Formspree를 사용할 것이므로 제거(또는 사용하지 않음)
  // const handleRegistrationSubmit = (e) => {
  //   e.preventDefault();
  //   alert(
  //     `등록되었습니다!\n이름: ${registration.name}\n연락처: ${registration.phone}\n이메일: ${registration.email}\n방문일자: ${registration.visitDate}`
  //   );
  //   setRegistration({ name: "", phone: "", email: "", visitDate: "" });
  // };

  // 스크롤 시 헤더 변경 처리
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // PC에서만 페이지 전환 스크롤 이벤트 처리
  useEffect(() => {
    if (isMobile) return; // 모바일은 해당 없음

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling) return;
      setIsScrolling(true);
      if (e.deltaY > 0) {
        if (page < 8.5) {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        if (page > 1) {
          setPage((prevPage) => prevPage - 1);
        }
      }
      setTimeout(() => setIsScrolling(false), 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [page, isScrolling, isMobile]);

  // PC에서 페이지 번호에 따라 스크롤 이동
  useEffect(() => {
    if (isMobile) return;
    const posTop = (page - 1) * window.innerHeight;
    window.scrollTo({
      top: posTop,
      behavior: "smooth",
    });
  }, [page, isMobile]);

  return (
    <>
      <Helmet>
        {/* 기본 문자셋 및 모바일 최적화를 위한 meta 태그 */}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        {/* SEO 최적화를 위한 메타 태그 추가 */}
        <title>「엘리프 세종 5-1」</title>
        <meta
          name="description"
          content="엘리프 세종 5-1ㅣ☎(대표)1533-8848ㅣ모델하우스ㅣ엘리프세종ㅣ세종 엘리프 5-1ㅣ분양일정ㅣ9BLㅣ세종엘리프ㅣ방문예약ㅣ오픈일정"
        />
        <meta
          name="keywords"
          content="엘리프세종, 엘리프세종5-1, 세종엘리프,엘리프세종모델하우스"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.sekailog.com/" />

        {/* 모바일 친화성을 위한 추가 태그 */}
        <meta name="HandheldFriendly" content="True" />
        <meta name="theme-color" content="#ffffff" />

        {/* Open Graph - 소셜 미디어(페이스북, LinkedIn 등) 공유 최적화 */}
        <meta
          property="og:title"
          content="「엘리프 세종 5-1」"
        />
        <meta
          property="og:description"
          content="엘리프 세종 5-1ㅣ☎(대표)1533-8848ㅣ모델하우스ㅣ엘리프세종ㅣ세종 엘리프 5-1ㅣ분양일정ㅣ9BLㅣ세종엘리프ㅣ방문예약ㅣ오픈일정약"
        />
        <meta property="og:url" content="https://www.sekailog.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.sekailog.com/Main1.png" // 실제 메인 이미지 URL로 변경하세요.
        />

        {/* Twitter 카드 설정 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="「엘리프 세종 5-1」"
        />
        <meta
          name="twitter:description"
          content="엘리프 세종 5-1ㅣ☎(대표)1533-8848ㅣ모델하우스ㅣ엘리프세종ㅣ세종 엘리프 5-1ㅣ분양일정ㅣ9BLㅣ세종엘리프ㅣ방문예약ㅣ오픈일정"
        />
        <meta
          name="twitter:image"
          content="https://www.sekailog.com/Main1.png" // 실제 이미지 URL로 변경하세요.
        />

        {/* 구조화된 데이터 (JSON-LD) - 검색엔진 이해도를 높이기 위한 스키마 마크업 */}
        <script type="application/ld+json">
          {`
      {
        "@context": "http://schema.org",
        "@type": "ApartmentComplex",
        "name": "세종 엘리프",
        "description": "프리미엄 아파트. 방문 예약 시 신세계상품권 증정 등 다양한 혜택을 제공합니다.",
        "url": "https://www.sekailog.com/",
        "image": "https://www.sekailog.com/Main1.png",
        "telephone": "1533-8848",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "세종특별자치시 5-1 9BL",
          "addressLocality": "",
          "addressRegion": "세종특별자치시",
          "postalCode": ""
        }
      }
    `}
        </script>
      </Helmet>

      {!isMobile ? (
        // PC 버전
        <>
          <Header isChanged={isScroll} />
          {isOpenPopup1 && (
            <Popup
              onClosed={() => setIsOpenPopup1(false)}
              popupImage={popupPage1}
              numbering={1}
            />
          )}
          {!isOpenPopup1 && isOpenPopup2 && (
            <Popup
              onClosed={() => setIsOpenPopup2(false)}
              popupImage={popupPage2}
              numbering={2}
            />
          )}
          {!isOpenPopup2 && isOpenPopup3 && (
            <Popup
              onClosed={() => setIsOpenPopup3(false)}
              popupImage={popupPage3}
              numbering={3}
            />
          )}

          <div className={styles.imageContainer}>
            <img
              src={mainImage}
              className={styles.mainImage}
              alt="세종 엘리프-mainimage1"
            />
            <div className={styles.overlay}></div>
            <div className={styles.mainImageTextBox}>
              <div className={styles.mainImageTextSub}>
                브랜드 평판 1위 엘리프 세종 {" "}
                <span className={styles.greyText}>브랜드 프리미엄</span>
              </div>
              <div className={styles.mainImageTitleBox}>
                <div className={styles.mainImageText}>모든사람이 기다린</div>
                <div className={styles.mainImageLine}></div>
                <div className={styles.mainImageText}>
                  5-1 세종 엘리프
                </div>
                <div className={styles.grandOpenText}>4월 GRAND OPEN 예정</div>
              </div>
              <div>
              <button
                  onClick={() => setIsInterestPopupOpen(true)}
                  className={styles.subPinkBtn}
                >
                  <img
                    src={subpinkimg}
                    className={styles.subPinkImg}
                    alt="브레인시티푸르지오 관심고객등록"
                  />
                </button>
              </div>
            </div>
            <FixIcon type="absolute" />
          </div>

          <div className={styles.section}>
            <div className={styles.section1}>
              <div className={styles.textBox}>
                <div className={styles.text1}>Location</div>
                <div className={styles.text2}>
                  " 방문 예약 고객 전원 신세계상품권 100% 증정 "
                </div>
                <div className={styles.text3}>
                  -  중심상업지구 매우인접 <br />
                  - 첨단 아주대학교 종합병원 도보 5분 <br />
                  - 평택 지제역 1호선, STR, KTX, GTX-A · C 확정으로 펜타역세권{" "}
                  <br />- 모두를 누리는 세종 엘리프
                </div>
                <div className={styles.text4}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsInterestPopupOpen(true);
                    }}
                  >
                    관심고객 등록하기 {">"}
                  </a>
                </div>
              </div>
              <div className={styles.menuBox}>
                <img
                  src={section1_Image1}
                  alt="세종 엘리프 브랜드소개-image2"
                />
                <Link to="/Brand/video" className={styles.btn}>
                  브랜드 소개 {">"}
                </Link>
              </div>
            </div>
          </div>

          {/* <div className={styles.section}>
            <div className={styles.section8}>
              <div className={styles.textBox}>
                <div className={styles.title}>
                  소수만 누릴 수 있는<br />
                  <span>최고의 브랜드 아파트 세종 엘리프</span>
                </div>
                <div className={styles.subTitle}>
                  <div className={styles.textLine}></div>
                  <div className={styles.subText}>
                    찬란한 비전에 완벽한 주거가치까지 더해<br />
                    세종 엘리프가 함께합니다
                  </div>
                </div>
              </div>
              <img src={section8Img3} alt="세종 엘리프 입지환경소개-image2" />
            </div>
          </div> */}

          <div className={styles.section}>
            <div className={styles.section2}>
              <div className={styles.textBox}>
                <div className={`${styles.text1} fadeUpRepeat`}>
                  완벽한 생활에서 준비된 미래까지
                </div>
                <div className={`${styles.text2} fadeUpRepeat`}>
                  기대한 모든 프리미엄이
                  <br />
                  세종 엘리프에서 펼쳐집니다
                </div>
                <div className={`${styles.text3} fadeUpRepeat`}>
                  SPECIAL PLAN
                </div>
                <div className={`${styles.text4} fadeUpRepeat`}>
                  살수록 자부심이 차원이 다른
                  <br />
                  프리미엄 주거라이프를 실현합니다
                </div>
                <div className={`${styles.text5} fadeUpRepeat`}>
                  주거의 품격과 가치를 높이는 <span>특화설계</span>
                  <br />
                  안전한 이동을 위한 세심한 <span>단지설계</span>
                  <br />
                  편리한 생활을 위한 최적의 <span>공간설계</span>
                </div>
              </div>
              <img
                src={section2_Image1}
                alt="세종 엘리프아파트 조감도-image3"
              />
            </div>
          </div>

          {/* <div className={styles.section}>
            <div className={styles.section3}>
              {section3Contents.map((section, index) => (
                <div key={index} className={styles.box}>
                  <img src={section.imgSrc} alt={section.title} />
                  <div className={styles.boxTitle}>{section.title}</div>
                  <div className={styles.boxText1} dangerouslySetInnerHTML={{ __html: section.text1 }} />
                  <div className={styles.boxText2} dangerouslySetInnerHTML={{ __html: section.text2 }} />
                  <Link to={section.link} className={styles.boxText3}>
                    {section.linkText}
                  </Link>
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className={styles.section}>
            <div className={styles.section4}>
              <div className={styles.imageBox}>
                <img src={section4_Image1} alt="세종 엘리프 브랜드소개-image4" />
                <div className={styles.text1}>세종 엘리프</div>
                <div className={styles.text2}>THE NATURAL NOBILITY</div>
                <div className={styles.text3}>당신의 삶, 그 고귀함이 계속되길</div>
              </div>
              <div className={styles.textBox}>
                <div className={styles.text1}>UNITPLAN</div>
                <UnitplanBox />
                <Link to="/FloorPlan/84A" className={styles.text2}>더 알아보기 {">"}</Link>
              </div>
            </div>
          </div>*/}
          <div id="interestForm" className={styles.section}></div>

          {/* 관심고객 등록 섹션 (PC 버전) */}
          <div className={styles.section}>
            <div className={styles.registrationContainer}>
              {/* 왼쪽 안내 문구 영역 */}
              <div className={styles.registrationInfo}>
                <div className={styles.text1}>
                  <p>
                    세종 엘리프
                    <br />
                    주변이 궁금하시나요?
                  </p>
                </div>
                <div className={styles.text2}>
                  <p>
                    세종 엘리프
                    <br />
                    현장 정보 및 견본주택 정보를 보실 수 있습니다.
                  </p>
                  <p>
                    상담신청을 남겨주시거나 전화로 문의주시면
                    <br />
                    친절하고 자세히 안내해 드리겠습니다.
                  </p>
                </div>
                <div className={styles.text3}>
                  <p>상담문의</p>
                </div>
                <div className={styles.text4}>
                  <p>1533-8848</p>
                </div>
              </div>
              {/* 오른쪽 관심고객 등록 폼 영역 */}
              <div className={styles.registrationSection}>
                <div className={styles.registrationHeader}>
                  세종 5-1 엘리프 
                </div>
                <div className={styles.registrationDescription}>
                  사전관심고객 등록
                </div>
                {/* Formspree 연동: onSubmit 제거, action, method 추가 */}
                <form
                  className={styles.registrationForm}
                  action="https://formspree.io/f/xrbpzzgp"
                  method="POST"
                >
                  <label htmlFor="name">
                    이름<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder=""
                    value={registration.name}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="phonenumber">
                    연락처<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder=""
                    value={registration.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="date of birth">
                    생년월일 [6자리]<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="date of birth"
                    placeholder=""
                    value={registration.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="adrees">
                    주소<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="date of birth"
                    placeholder=""
                    value={registration.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit">등록하기</button>
                </form>
              </div>
            </div>
          </div>

          {/* <div className={styles.section}>
            <div className={styles.section9}>
              <div className={styles.textBox}>
                <div className={styles.title}>
                세종 엘리프<br />
                  <span>견본주택 오시는길</span>
                </div>
                <div className={styles.subTitle}>
                  <div className={styles.textLine}></div>
                  <div className={styles.subText}>
                    찬란한 비전에 완벽한 주거가치까지 더해<br />
                    세종 엘리프가 함께합니다
                  </div>
                </div>
              </div>
              <img src={map1} alt="세종 엘리프 오시는길안내-image1" />
            </div>
          </div> */}

          <div className={styles.section5}>
            <Footer />
          </div>
          {/* 방문예약 팝업 (PC) */}
          {isInterestPopupOpen && (
            <InterestPopup
              onClose={() => setIsInterestPopupOpen(false)}
              registration={registration}
              handleInputChange={handleInputChange}
            />
          )}
        </>
      ) : (
        // 모바일 버전
        <div className={styles.mobileMain}>
          {isOpenPopup1 && (
            <MobilePopup
              onClosed={() => setIsOpenPopup1(!isOpenPopup1)}
              popupImage={mobilePopupPage1}
              numbering={1}
            />
          )}
          {isOpenPopup2 && (
            <MobilePopup
              onClosed={() => setIsOpenPopup2(!isOpenPopup2)}
              popupImage={mobilePopupPage2}
              numbering={2}
            />
          )}
          {isOpenPopup3 && (
            <MobilePopup
              onClosed={() => setIsOpenPopup3(!isOpenPopup3)}
              popupImage={mobilePopupPage3}
              numbering={3}
            />
          )}
          {isOpenPopup4 && (
            <MobilePopup
              onClosed={() => setIsOpenPopup4(!isOpenPopup4)}
              popupImage={mobilePopupPage3}
              numbering={4}
            />
          )}

          <Header isChanged={isScroll} />

          <div className={styles.imageContainer}>
            <img
              src={mobileImageMain}
              className={styles.mainImage}
              alt="세종 엘리프 mobilemain-image1"
            />
            <div className={styles.overlay}></div>
            <div className={styles.mainImageTextBox1}>
              <div className={styles.mainImageTextSub1}>
                브랜드 평판 1위 엘리프 세종 
                <br />
                <span className={styles.greyText1}>브랜드 프리미엄 </span>
                <br />
              </div>
              <div className={styles.mainImageTitleBox1}>
                <div className={styles.mainImageText1}>
                  5-1 세종 엘리프
                </div>
                <div className={styles.grandOpenText1}>3월 GRAND OPEN 예정</div>
              </div>
            </div>
          </div>

          <div className={styles.container1}>
            <div className={styles.text1}>Location</div>
            <div className={styles.text2}>
              "방문예약을 하시면 신세계 상품권 100% 증정 "
            </div>
            <div className={styles.text3}>
              -  중심상업지구 가장인접한 입지
              <br />
              - 첨단 아주대학교 AI종합병원, 의료R＆D센터 도보 5분
              <br />
              - 평택 지제역 KTX, GTX-A · C 확정 삼성전자 평택캠퍼스, 초등학교,
              수변공원
              <br />- 모두를 누리는 반도체밸리 주거 타운의 완성
            </div>
            <div className={styles.text4}>
              {/* 외부 링크 대신 방문예약 클릭 시 팝업 호출 */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsInterestPopupOpen(true);
                }}
                className={styles.popupBtn}
              >
                관심고객 등록하기 {">"}
              </a>
            </div>
          </div>

          <div className={styles.container7}>
            <div className={styles.textBox}>
              <div className={styles.title}>
                의 중심으로 사는
                <br />
                <span>최고의 브랜드 아파트</span>
              </div>
              <div className={styles.subTitle}>
                <div className={styles.textLine}></div>
                <div className={styles.subText}>
                  완벽한 비전중심에서 완벽한 주거가치까지 더해
                  <br />
                  세종 엘리프가 함께합니다
                </div>
              </div>
            </div>
            <img
              src={section8Img3}
              alt="세종 엘리프 mobile입지안내-image1"
            />
          </div>

          <div className={styles.container3}>
            <div className={styles.textbox}>
              <div className={`${styles.text1} fadeUpRepeat`}>
                완벽한 생활에서 준비된 미래까지
              </div>
              <div className={`${styles.text2} fadeUpRepeat`}>
                기대한 모든 프리미엄이
                <br />
                세종 엘리프에서 펼쳐집니다
              </div>
              <div className={`${styles.text3} fadeUpRepeat`}>SPECIAL PLAN</div>
              <div className={`${styles.text4} fadeUpRepeat`}>
                살수록 자부심이 차원이 다른
                <br />
                프리미엄 주거라이프를 세종 엘리프 <br />
                모델하우스에서 확인하세요
              </div>
            </div>
            <img
              src={section2_Image1}
              alt="세종 엘리프 mobile조감도-image1"
            />
          </div>

          <div className={styles.container4}>
            <div className={styles.text1}>UNITPLAN</div>
            <UnitplanBox />
            <Link to="/FloorPlan/84A" className={styles.text2}>
              <div>더 알아보기 &gt;</div>
            </Link>
          </div>

          <div className={styles.container6}>
            {section3Contents.map((section, idx) => (
              <MobileSectionBox
                key={idx}
                type={idx % 2 === 0 ? "left" : "right"}
                titleImag={section.imgSrc}
                title={section.title}
                subText1={section.text1}
                subText2={section.text2}
              />
            ))}
          </div>

          {/* 관심고객 등록 섹션 (모바일 버전) */}
          <div className={styles.containerRegistration}>
            <div className={styles.registrationHeader}>
              세종 엘리프
            </div>
            <div className={styles.registrationDescription}>방문예약</div>
            {/* Formspree 연동: onSubmit 제거, action, method 추가 */}
            <form
              className={styles.registrationForm}
              action="https://formspree.io/f/xvgzvlvr"
              method="POST"
            >
              <label htmlFor="name">
                이름<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder=""
                value={registration.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="phonenumber">
                연락처<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder=""
                value={registration.phone}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="date of birth">
                생년월일 [6자리]<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="date of birth"
                placeholder=""
                value={registration.phone}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="adrees">
                주소<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="date of birth"
                placeholder=""
                value={registration.phone}
                onChange={handleInputChange}
                required
              />

              <button type="submit">등록하기</button>
            </form>
          </div>

          <div className={styles.container2}>
            <div>
              <img
                src={section1_Image1}
                alt="세종 엘리프 브랜드소개 mobile-image5"
              />
              <Link to="/Brand/intro" className={styles.btn}>
                브랜드 소개 {">"}
              </Link>
            </div>
          </div>

          {/* <div className={styles.section}>
            <div className={styles.section9}>
              <img src={mobilemap1} alt="세종 엘리프 오시는길안내-mobileimage2" />
            </div>
          </div> */}

          <div className={styles.section5}>
  
            <Footer />
            <FixIcon />
          </div>

          {/* 방문예약 팝업 (모바일) */}
          {isInterestPopupOpen && (
            <InterestPopup
              onClose={() => setIsInterestPopupOpen(false)}
              registration={registration}
              handleInputChange={handleInputChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Main;
