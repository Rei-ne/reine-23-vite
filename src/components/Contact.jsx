import React from 'react'
import { useState } from 'react'
import arrow from '../assets/icons/Nav-Arrow_1.png'
import '../styles/Contact.scss';
// import validator from 'validator'

function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    // const [emailError, setEmailError] = useState('')
    // const validateEmail = (e) => {
    //     setEmail(e.target.value)

    //     if (validator.isEmail(email)) {
    //         setEmailError('Valid Email :)')


    //     } else {
    //         setEmailError('Enter valid Email!')
    //     }
    // }


    const handleSubmit = (event) => {
        event.preventDefault();

        setName("");
        setEmail("");
        setMessage("");
        alert(`Thank you for your message ${name}, Reine will be in touch `)

    }

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    const resetTextArea = () => {
        setMessage("");
    };

    return (
        <section className="font-PPNeueMontreal tracking-wider  mt-10 mb-10 flex flex-col md:flex-row md:flex-wrap justify-center  items-center h-screen relative w-full" id="contact">
            <h2 className="font-Bebas_Neue sm:text-3xl md:text-3xl px-2 uppercase flex text-center justify-center items-center w-full">GET IN TOUCH</h2>

            <div className='flex flex-col items-center justify-center md:justify-around h-auto w-4/5 '>
                <div className="flex flex-col items-center justify-center sm:h-10 h-12 font-PPNeueMontreal tracking-wider p-6 text-sm w-full max-w-prose text-left leading-8 text-gray-light ">
                    <div className='inline items-center h-auto w-fulljustify-center text-center'>
                        <p className='max-w-prose sm:leading-6 leading-8 text-gray-light sm:text-sm lg:text-base sm:text-center md:text-center' >Contact me if you’ve got remote job opportunities, web development gigs, collaborations or you just want to say hello 👋</p>
                    </div>
                    <div className='sm:hidden md:inline items-center h-fit w-full md:h-auto justify-start text-center'>
                        <p className='max-w-prose sm:hidden md:inline leading-8 text-gray-light sm:text-base lg:text-base' >You can send me an <a className='text-bold underline' href="mailto:reinetoyosii@gmail.com">
                            email
                        </a> if contact forms aren't your thing.</p>
                    </div>
                </div>
                <div className='md:hidden'>
                    <button className='font-PPNeueMontreal tracking-wider uppercase border border-mint rounded-full w-10 h-5'>
                        <a className='no-underline' href="mailto:reinetoyosii@gmail.com">
                            send a mail
                        </a>

                    </button>
                </div>
                {/* contact form */}
                <div className='sm:hidden md:flex md:max-w-md  w-full h-fit bg-gray-200 mt-6 relative'>
                    <form className="font-PPNeueMontreal tracking-wider text-gray-light md:w-4/5 max-h-md flex flex-col justify-center  bg-inherit rounded shadow mx-auto" onSubmit={handleSubmit}>
                        <div className='w-full pr-8'>
                            <div className="styled-input">
                                <input type="text" required value={name}
                                    onChange={e => setName(e.target.value)} />
                                <label>Name</label>
                                <span></span> </div>
                            <div className="styled-input">
                                <input required value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                <label>Email</label>
                                <span></span> </div>
                            <div className="styled-input wide">
                                <textarea required rows="3" cols="12" value={message} onChange={handleChange}
                                    onClick={resetTextArea}></textarea>
                                <label>Message</label>
                                <span></span> </div>
                        </div>
                        <div className='w-1/5 h-full absolute right-0  bottom-2 flex flex-row items-center justify-evenly'>
                            <button
                                type="submit"
                                className=" text-2xl flex flex-row font-bold w-fit items-center justify-center h-fit transform -rotate-90"
                            >
                                Shoot!
                                <img src={arrow} alt="arrow-icon"
                                    className='h-4 transform rotate-90' />
                            </button>
                        </div>

                    </form>


                </div>
            </div>
        </section>
    )
}

export default Contact;