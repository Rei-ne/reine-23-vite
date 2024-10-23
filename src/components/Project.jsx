import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import gsap from "gsap";

import githubIcon from "../assets/icons/mdi_github.svg";

const Project = ({ title, description, category, githubLink, liveLink }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const projectRef = useRef(null);

  useEffect(() => {
    const element = projectRef.current;

    const randomDelay = Math.random() * 2;

    // Create the floating animation
    gsap.to(element, {
      y: "8px",
      duration: 2,
      ease: "power1.inOut",
      repeat: -1, // Infinite repeat
      yoyo: true, // Animate back and forth
      delay: randomDelay,
    });

    return () => {
      // Cleanup animation
      gsap.killTweensOf(element);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl  mb-4">
      {/* Mobile Design */}
      <div className="md:hidden px-4">
        <div
          className={`
            bg-[#111111] border border-mint/20  rounded-lg
            transition-all duration-300 ease-in-out
            ${isExpanded ? "p-6" : "p-4"}
          `}
        >
          <div className="flex justify-between items-start ">
            <div className="flex-1">
              <h3 className="text-xl font-PPNeueMontreal text-mint mb-1">
                {title}
              </h3>
              <span className="text-xs text-gray-light uppercase tracking-wider">
                {category}
              </span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2"
              aria-label={isExpanded ? "Show less" : "Show more"}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-mint" />
              ) : (
                <ChevronDown className="w-5 h-5 text-mint" />
              )}
            </button>
          </div>

          <div className={`mt-2 ${isExpanded ? "block" : "hidden"}`}>
            <p className="text-sm leading-relaxed mb-4">{description}</p>

            <div className="flex gap-4 mt-4 ">
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-mint hover:text-mint/80 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Site</span>
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-mint hover:text-mint/80 text-sm"
                >
                  <img src={githubIcon} alt="GitHub" className="w-4 h-4" />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Design */}
      <div ref={projectRef} className="hidden md:block relative">
        <div
          className="
            w-[70%] group hover:w-full
            border border-mint/20 hover:border-mint
            transition-all duration-500 ease-in-out p-8
            hover:bg-gray-dark
          "
        >
          {/* Content container */}
          <div className="flex-1 relative z-10">
            {/* Category tag */}
            <span className="text-xs text-gray-light uppercase tracking-wider mb-2 inline-block">
              {category}
            </span>

            <h3 className="text-xl font-PPNeueMontreal text-mint mb-2 group-hover:transform group-hover:translate-y-[-2px] transition-transform duration-300">
              {title}
            </h3>

            <p className="text-sm leading-relaxed text-gray-light mb-4 max-w-prose transition-opacity duration-300">
              {description}
            </p>

            <div className="flex gap-4">
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 text-mint
                    hover:text-mint/80 text-sm
                    transition-all duration-300
                    hover:translate-x-1
                  "
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Site</span>
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 text-mint
                    hover:text-mint/80 text-sm
                    transition-all duration-300
                    hover:translate-x-1
                  "
                >
                  <img src={githubIcon} alt="GitHub" className="w-4 h-4" />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Project;
