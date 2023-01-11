import React from "react";
import aboutImg from '../../assets/images/about-img.png'



function About() {
    return (
        <div className="about-div">
            <h2>About me</h2>
            <div className="about-text-container">
                <div className="left-about">
                    <p>I’m Toyosi Odukale (REINE), and I am constantly evolving.</p>
                    <p>I say that because right now I’m a frontend developer that aspires to be a fullstack blockchain engineer someday.</p>
                    <p>My first dive into development was in August 2021, when I decided to transition from conventional application technical support, and take time out to give this new found interest all my attention. </p>
                </div>

                <img src={aboutImg} alt="about reine dev" />
                <div className="right-about">
                    <p>So far I have learned a whole lot about programming languages like javascript and solidity and I am able to apply these skills in my daily life with how I create my art.</p>
                    <p>I am interested in gaming,technical writing,  creative development and music talent management</p>
                    <p>When I'm not coding, I'm listening to music or hanging out with my friends and listening to music with them 😀</p>
                </div>

            </div>
            {/* my stack */}
            {/* <Stack/> */}
        </div>


    )
}
export default About;