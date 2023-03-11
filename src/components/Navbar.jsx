import AnchorLink from 'react-anchor-link-smooth-scroll'


const Navbar = () => {


    return (

        <header className="navbar z-10 font-Bebas_Neue relative flex ">
            {/* desktop nav --- tab and big screens */}
            <nav className="sm:hidden md:flex h-2 lg:flex md:items-center md:justify-end font-GT_Flexa bg-black px-10 py-10  w-full text-sm text-mint gap-5 ">
                <div className="flex font-light h-2 px-10 py-5 justify-around items-center w-2/5 ">
                    <AnchorLink href="#hero" className='tracking-wide text-left text-mint p-2 no-underline'>HOME</AnchorLink>
                    <AnchorLink href="#about" className='tracking-wide text-left p-2 no-underline' >ABOUT</AnchorLink>
                    <AnchorLink href="#work" className='tracking-wide p-2 text-left no-underline'>WORKS</AnchorLink>
                    <AnchorLink href="#contact" className='tracking-wide p-2 text-left no-underline' >CONTACT</AnchorLink>
                </div>

            </nav>
            {/* moble nav --- small screens */}
            <nav className="flex w-full fixed bottom-0 left-2 h-5 text-sm justify-around items-center border-t-2 border-b-2 border-mint md:hidden lg:hidden text-mint bg-black">
                <AnchorLink href="#hero" className='tracking-wide'>HOME</AnchorLink>
                <AnchorLink href="#about" className='tracking-wide'>ABOUT</AnchorLink>
                <AnchorLink href="#work" className='tracking-wide'>WORKS</AnchorLink>
                <AnchorLink href="#contact" className='tracking-wide'>CONTACT</AnchorLink>
            </nav>
        </header>
    )

}
export default Navbar;

