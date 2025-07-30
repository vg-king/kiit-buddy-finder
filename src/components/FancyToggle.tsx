import React from 'react';
import { useTheme } from './theme-provider';
import './FancyToggle.css';
import gsap from 'gsap';

const FancyToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === 'dark';

  const sliderRef = React.useRef<HTMLSpanElement>(null);
  const knobRef = React.useRef<HTMLDivElement>(null);
  const starsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const slider = sliderRef.current;
    const knob = knobRef.current;
    const stars = starsRef.current;

    if (slider && knob && stars) {
      
      gsap.to(slider, {
        backgroundColor: isDarkMode ? '#1e293b' : '#87ceeb',
        duration: 0.4,
      });
      gsap.to(knob, {
        x: isDarkMode ? 36 : 0,
        backgroundColor: isDarkMode
          ? 'linear-gradient(180deg, #E0E0E0, #F5F5F5)'
          : 'linear-gradient(180deg, #FFC107, #FDB813)',
        duration: 0.4,
      });
      gsap.to(stars, {
        opacity: isDarkMode ? 1 : 0,
        duration: 0.4
      });
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <span className="slider" ref={sliderRef}>
        <div className="knob" ref={knobRef}></div>
        <div className="stars" ref={starsRef}>
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
        </div>
        <div className="clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
      </span>
    </label>
  );
};

export default FancyToggle;