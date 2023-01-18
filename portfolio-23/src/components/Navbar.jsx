import AnchorLink from 'react-anchor-link-smooth-scroll'


const Navbar = () => {


    return (

        <header className="navbar font-Bebas_Neue bg-black flex justify-around items-center py-[25px] border-2 border-b-black">
            {/* desktop nav --- tab and big screens */}
            <nav className="sm:hidden md:flex lg:flex fixed w-full text-mint gap-5 bg-black">
                <AnchorLink href="#hero" className='text-mint nav-link'>HOME</AnchorLink>
                <AnchorLink href="#about">ABOUT</AnchorLink>
                <AnchorLink href="#work">WORKS</AnchorLink>
                <AnchorLink href="#contact">CONTACT</AnchorLink>
            </nav>
            {/* moble nav --- small screens */}
            <nav className="flex md:hidden lg:hidden text-mint bg-black">
                <AnchorLink href="#hero" className='nav-link'>HOME</AnchorLink>
                <AnchorLink href="#about" className='nav-link'>ABOUT</AnchorLink>
                <AnchorLink href="#work" className='nav-link'>WORKS</AnchorLink>
                <AnchorLink href="#contact" className='nav-link'>CONTACT</AnchorLink>
            </nav>
        </header>
    )

}
export default Navbar;

