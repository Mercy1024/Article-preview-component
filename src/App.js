import { useState, useEffect, act } from "react";

function useWindowSize() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 600);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 600);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

export default function App() {
  const [active, setActive] = useState(true);
  const isDesktop = useWindowSize();

  function handleClick() {
    setActive(!active);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="hero_image">
          <img src="../images/drawers.jpg" alt="hero" />
        </div>
        <div className="main">
          <div className="text1">
            Shift the overall look and feel by adding these wonderful touches to
            furniture in your home
          </div>
          <div className="text2">
            Ever been in a room and felt slightly bare and univiting. I've got
            some simple tips to help you make any room feel complete.
          </div>
          {(isDesktop || active) && (
            <ProfileComponent
              active={active}
              setActive={setActive}
              handleClick={handleClick}
            />
          )}
        </div>
        {!active && (
          <SocialComponent
            active={active}
            setActive={setActive}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
}

function ProfileComponent({ active, setActive, handleClick }) {
  return (
    <div className="profile">
      <div className="avatar_details">
        <div className="avatar">
          <img src="../images/avatar-michelle.jpg" alt="avatar" />
        </div>
        <div className="prof_details">
          <div className="name">Michelle Appleton</div>
          <div className="date">28 Jun 2020</div>
        </div>
      </div>
      <ShareButton
        active={active}
        setActive={setActive}
        handleClick={handleClick}
      >
        <path
          fill={active ? "#6E8098" : "#fff"}
          d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"
        />
      </ShareButton>
    </div>
  );
}

function ShareButton({ active, children, handleClick }) {
  return (
    <div
      onClick={() => handleClick()}
      className={`share ${!active ? "active-share" : ""} `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13">
        {children}
      </svg>
    </div>
  );
}

function SocialComponent({ active, setActive, handleClick }) {
  return (
    <div className="active-socials">
      <div className="social">
        <div className="txt">SHARE</div>
        <div className="icons">
          <img src="../images/icon-facebook.svg" alt="facebook" />
          <img src="../images/icon-twitter.svg" alt="twitter" />
          <img src="../images/icon-pinterest.svg" alt="pinterest" />
        </div>
      </div>
      <ShareButton
        active={active}
        setActive={setActive}
        handleClick={handleClick}
      >
        <path
          fill="#fff"
          d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"
        />
      </ShareButton>
    </div>
  );
}
