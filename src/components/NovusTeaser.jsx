import React, { useState, useEffect, useRef, useCallback } from "react";
import Particles from "./Particles";
import LightRays from "./LightRays";
import TextPressure from "./TextPressure";
import DecryptedText from "./DecryptedText";
import FuzzyText from "./FuzzyText";

const NovusTeaser = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showLightRays, setShowLightRays] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const mouseRef = useRef({ x: 50, y: 50 });

  // Optimized mouse movement with RAF and throttling
  const handleMouseMove = useCallback((e) => {
    const newX = (e.clientX / window.innerWidth) * 100;
    const newY = (e.clientY / window.innerHeight) * 100;
    
    mouseRef.current = { x: newX, y: newY };
    
    // Use RAF for smooth updates
    requestAnimationFrame(() => {
      setMousePosition({ x: newX, y: newY });
    });
  }, []);

  // Handle click counting with visual feedback
  const handleClick = (e) => {
    if(clickCount<5)
    setClickCount((prev) => prev + 1);
    
    // Create click ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'absolute pointer-events-none animate-ping';
    ripple.innerHTML = '<div class="w-20 h-20 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full"></div>';
    ripple.style.left = e.clientX - 40 + 'px';
    ripple.style.top = e.clientY - 40 + 'px';
    ripple.style.zIndex = '100';
    
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
  };

  // When 5 clicks reached → show LightRays
  useEffect(() => {
    if (clickCount === 5) {
      setShowLightRays(true);
      // Hide LightRays after 5 seconds (changed from 4 to 5)
      const timer = setTimeout(() => {
        setShowLightRays(false);
        setClickCount(0); // reset click count
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  function handleClickClose(){
    setShowLightRays(false);
    setClickCount(0);
  }

  return (
    <div
      className="bg-black h-dvh w-dvw relative overflow-hidden cursor-none"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {/* Optimized Custom Cursor */}
      <div
        className="fixed w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full pointer-events-none z-50 will-change-transform"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease-out',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* Enhanced Click Counter */}
      <div className="absolute top-8 left-8 z-50">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
          <div className="flex space-x-3 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    i < clickCount
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50 scale-110'
                      : 'bg-gray-700 shadow-inner'
                  }`}
                />
                {i < clickCount && (
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-ping opacity-30" />
                )}
              </div>
            ))}
          </div>
          <p className="text-cyan-400 text-xs font-mono tracking-wider">
            CLICKS: {clickCount}/5
          </p>
        </div>
      </div>

      {/* Animated Progress Ring */}
      <div className="absolute top-8 right-8 z-50">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="stroke-gray-700"
              strokeDasharray="100, 100"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="stroke-cyan-400 transition-all duration-700 ease-out drop-shadow-lg"
              strokeDasharray={`${(clickCount / 5) * 100}, 100`}
              strokeWidth="3"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.8))',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-cyan-400 text-xs font-mono">{Math.round((clickCount / 5) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Optimized Dynamic Background Glow */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none will-change-transform"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Floating Particles for Ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {showLightRays ? (
        <div className="animate-fadeIn">
          {/* LightRays Background */}
          <div className="absolute inset-0">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={2}
              lightSpread={0.8}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.8}
              noiseAmount={0.1}
              distortion={0.05}
              className="w-full h-full"
            />
          </div>

          {/* Enhanced Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

          {/* DecryptedText Foreground */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <DecryptedText
                text="NOVUS'25"
                speed={25}
                maxIterations={75}
                characters="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM43'"
                className="revealed text-white text-6xl lg:text-9xl font-bold text-center drop-shadow-2xl"
                parentClassName="all-letters text-white text-6xl lg:text-9xl font-bold"
                encryptedClassName="encrypted"
                animateOn="view"
              />
              {/* Text Glow Effect */}
              <div 
                className="absolute inset-0 text-7xl md:text-9xl font-bold text-center text-cyan-400/20 blur-xl -z-10"
                style={{ textShadow: '0 0 50px rgba(0, 255, 255, 0.5)' }}
              >
                NOVUS25
              </div>
            </div>
          </div>

          {/* Success Notification */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-slideUp">
            <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 backdrop-blur-md rounded-full px-8 py-4 border border-cyan-400/50 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <p className="text-cyan-300 font-mono text-sm tracking-wide">
                  ⚡ SEQUENCE ACTIVATED
                </p>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping animation-delay-300"></div>
              </div>
            </div>
          </div>

          <div className="absolute right-10 bottom-3/4" onClick={handleClickClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24"><g fill="none" stroke="#06edff" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 7l10 10"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0"/></path><path d="M17 7l-10 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="16;0"/></path></g></svg>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          {/* Particles Background */}
          <div className="absolute inset-0 pointer-events-none">
            <Particles
              particleColors={["#ffffff", "#ffff00"]}
              particleCount={400}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={false}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>

          {/* Enhanced Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black to-gray-900/20" />

          {/* TextPressure at Top */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none tracking-widest">
            <div className="relative">
              <TextPressure
                text="Something is being cooked"
                flex={true}
                stroke={true}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#000000"
                minFontSize={45}
                className="w-full h-full drop-shadow-2xl"
              />
            </div>
          </div>

          {/* FuzzyText at Bottom */}
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <FuzzyText
                baseIntensity={0.75}
                hoverIntensity={0.1}
                enableHover={true}
                fontSize={window.innerWidth <= 480 ? "35px" : "100px"}
                className="text-white text-center drop-shadow-xl"
              >
                Presented by : BEC-IEEE
              </FuzzyText>
              {/* Text Underline Effect */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
          </div>

          {/* Interactive Hint */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-600/50 transition-all duration-300 hover:border-cyan-400/50">
              <p className="text-gray-300 font-mono text-sm animate-pulse">
                Click anywhere for a surprise • {clickCount}/5
              </p>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/30"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/30"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/30"></div>
        </div>
      )}

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 pointer-events-none" />

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) translateX(-50%);
          }
          to { 
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default NovusTeaser;