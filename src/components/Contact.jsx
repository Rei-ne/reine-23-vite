import React, { useState, useRef } from "react";
import arrow from "../assets/icons/Nav-Arrow_1.png";
import "../styles/Contact.scss";
import validator from "validator";
import emailjs from "@emailjs/browser";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();

  const service_id = import.meta.env.VITE_APP_EMAIL_SERVICE_ID;
  const template_id = import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID;
  const public_key = import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validator.isEmail(email)) {
      emailjs.sendForm(service_id, template_id, form.current, public_key).then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

      setName("");
      setEmail("");
      setMessage("");
      alert(`Thank you for your message ${name}, Reine will be in touch `);
    } else {
      alert("Please enter a valid email!");
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const resetTextArea = () => {
    setMessage("");
  };

  return (
    <section
      className="h-fit font-PPNeueMontreal tracking-wider  mt-10 mb-10 flex flex-col md:flex-row md:flex-wrap justify-center  items-center md:h-full relative w-full"
      id="contact"
    >
      <h2 className="font-Bebas_Neue text-3xl md:text-3xl px-2 uppercase flex text-center justify-center items-center w-full mb-16 md:mb-4 ">
        GET IN TOUCH
      </h2>

      <div className="flex flex-col items-center justify-center md:justify-around h-auto w-4/5 mb-20 ">
        <div className="md:hidden">
          <button className="font-PPNeueMontreal tracking-wider uppercase border border-mint text-xl rounded-full w-auto px-6 h-8">
            <a className="no-underline" href="mailto:reinetoyosii@gmail.com">
              send a mail
            </a>
          </button>
        </div>
        {/* contact form */}
        <div className="sm:hidden md:flex md:max-w-md  w-full h-fit bg-gray-200 mt-6 relative">
          <form
            className="font-PPNeueMontreal tracking-wider text-gray-light md:w-4/5 max-h-md flex flex-col justify-center  bg-inherit rounded shadow mx-auto lg:h-17"
            ref={form}
            onSubmit={handleSubmit}
          >
            <div className="w-full pr-8">
              <div className="styled-input">
                <input
                  type="text"
                  required
                  value={name}
                  name="from_name"
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Name</label>
                <span></span>{" "}
              </div>
              <div className="styled-input">
                <input
                  required
                  value={email}
                  name="from_email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email</label>
                <span></span>{" "}
              </div>
              <div className="styled-input wide">
                <textarea
                  required
                  rows="3"
                  cols="12"
                  value={message}
                  name="message"
                  onChange={handleChange}
                  onClick={resetTextArea}
                ></textarea>
                <label>Message</label>
                <span></span>{" "}
              </div>
            </div>
            <div className="w-1/5 h-full absolute right-0  bottom-2 flex flex-row items-center justify-evenly">
              <button
                type="submit"
                className=" text-2xl flex flex-row font-bold w-fit items-center justify-center h-fit transform -rotate-90"
              >
                Shoot!
                <img
                  src={arrow}
                  alt="arrow-icon"
                  className="h-4 transform rotate-90"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
