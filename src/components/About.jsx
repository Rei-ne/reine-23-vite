import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import Stack from "./Stack";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function About() {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kill any existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // Set initial state
      textRefs.current.forEach((ref) => {
        gsap.set(ref, { opacity: 0, y: 30 });
      });

      textRefs.current.forEach((ref, index) => {
        ScrollTrigger.create({
          trigger: ref,
          start: "top 85%",
          end: "top 80%",
          markers: false,
          onEnter: () => {
            gsap.to(ref, {
              opacity: 1,
              y: 0,
              duration: 1, // Slower animation
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          },
          onLeaveBack: () => {
            gsap.to(ref, {
              opacity: 0,
              y: 30,
              duration: 0.5,
              ease: "power2.in",
            });
          },
          once: false,
          preventOverlaps: true,
          fastScrollEnd: true,
        });
      });

      // Add a main section trigger for better control
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 10%",
        markers: false,
        onLeave: () => {
          textRefs.current.forEach((ref) => {
            gsap.set(ref, { opacity: 0, y: 30 });
          });
        },
        onEnterBack: () => {
          textRefs.current.forEach((ref, index) => {
            gsap.to(ref, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.2,
              ease: "power2.out",
            });
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen w-full max-w-6xl mx-auto px-4 py-12"
    >
      <h2
        className="text-3xl md:text-5xl mb-12 text-center font-Bebas_Neue opacity-0"
        ref={(el) => (textRefs.current[0] = el)}
      >
        About me
      </h2>
      <div className="grid md:grid-cols-2 justify-center lg:grid-cols-3 gap-8">
        {/* Introduction Card */}
        <div
          ref={(el) => (textRefs.current[1] = el)}
          className=" border-gray-light backdrop-blur-sm p-6 rounded-lg"
        >
          <h3 className="text-xl mb-4 font-PPNeueMontreal text-mint">
            Hello there 👋
          </h3>
          <p className="text-gray text-base md:text-lg leading-relaxed">
            I'm Toyosi Odukale (REINE), an innovative frontend engineer with a
            BSc in Information Technology, passionate about building immersive
            digital experiences.
          </p>
        </div>

        {/* Journey Card */}
        <div
          ref={(el) => (textRefs.current[2] = el)}
          className="bg-black/20 backdrop-blur-sm p-6 rounded-lg"
        >
          <h3 className="text-xl mb-4 font-PPNeueMontreal text-mint">
            My Journey
          </h3>
          <p className="text-gray text-base md:text-lg leading-relaxed">
            Since August 2021, I've transitioned from banking support to
            frontend development, constantly evolving and pushing the boundaries
            of web technology.
          </p>
        </div>

        {/* Skills Card */}
        <div
          ref={(el) => (textRefs.current[3] = el)}
          className="bg-black/20 backdrop-blur-sm p-6 rounded-lg"
        >
          <h3 className="text-xl mb-4 font-PPNeueMontreal  text-mint">
            Beyond Code
          </h3>
          <p className="text-gray text-sm md:text-lg leading-relaxed">
            I bridge technical expertise with creative pursuits, from writing
            code to music talent management and digital creative consultation.
          </p>
        </div>
      </div>

      {/* Stack Section */}
      <div className="mt-12" ref={(el) => (textRefs.current[4] = el)}>
        <h3 className="text-xl text-mint text-center mb-8 font-PPNeueMontreal ">
          MY STACK
        </h3>
        <Stack />
      </div>

      {/* Call to Action */}
      <div
        className="mt-12 text-center border-t border-gray-light pt-8"
        ref={(el) => (textRefs.current[5] = el)}
      >
        <p className="text-base font-PPNeueMontreal">
          ENOUGH TALK 🤫, TIME TO SEE WHAT I'VE BUILT.
        </p>
      </div>
    </section>
  );
}

export default About;
