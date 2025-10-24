import React, { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);

  return (
    <section id="hero-section">
      <div className="hero">
        <div className="hero__content">
          <h1 className="hero__title">MacBook Pro</h1>
          <img className="hero__image" src="/title.png" alt="MacBook Title" />
          <video
            className="hero__video"
            ref={videoRef}
            src="/videos/hero.mp4"
            autoPlay
            muted
            playsInline
          />
        </div>

        <div className="hero__cta">
          <button className="hero__buy-btn button">Buy</button>
          <p className="hero__price">From $1599 or $133/mo for 12 months</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
