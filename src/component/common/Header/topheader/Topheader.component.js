export const Topheader = () => {
    return (
        <>
         <section id="top-header">
                <div className="container-fluid">
                    <div className="px-3 d-flex justify-content-between align-items-center">
                        <span className="emergency">
                            <p>24/7 Emergency Service</p>
                        </span>
                        <span className="right-side d-flex align-items-center">
                            <span className="top-header-links">
                                <ul className="contact_links">
                                    <li><i className="fa fa-phone-square"></i><a href="#">Call : +977 9861546433</a></li>
                                    <li><i className="fa fa-envelope"></i><a href="#">Email : raycrank17@gmail.com</a></li>
                                </ul>
                            </span>
                            <span className="d-flex" id="login">
                                <a className="nav-link" href="login.html">Login /</a>
                                <a className="nav-link" href="register.html">Register</a>
                            </span>
                        </span>
                    </div>
                </div>
            </section>
            <header className="header header_area">
                <div className="container-fluid">
                    <div className="wrapper ml-auto">
                        <div className="header-item-left">
                            <h1><a href="#" className="navbar-brand"><img src="images/logo2.png" alt="logo" /></a></h1>
                        </div>
                        <div className="header-item-center ml-auto w-100 justify-content-center">
                            <div className="overlay"></div>
                            <nav className="menu h-100 navbar-expand-lg skew-menu">
                                <div className="menu-mobile-header">
                                    <button type="button" className="menu-mobile-arrow"><i
                                        className="fa fa-arrow-left fa-sm"></i></button>
                                    <div className="menu-mobile-title"></div>
                                    <button type="button" className="menu-mobile-close"><i className="fa fa-times fa-sm"></i></button>
                                </div>
                                <ul className="menu-section navbar-nav">
                                    <li className="nav-item">
                                        <a href="index.php" className="nav-link">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="about.php" className="nav-link">About</a>
                                    </li>
                                    <li className="menu-item-has-children nav-item">
                                        <a href="#" className="nav-link">Services</a>
                                        <div className="menu-subs menu-mega menu-column-4">
                                            <div className="list-item">
                                                <h4 className="title">Doctor at home</h4>
                                            </div>
                                            <div className="list-item">
                                                <h4 className="title">Online Medical Consultation</h4>
                                            </div>
                                            <div className="list-item">
                                                <h4 className="title">24/7 Nursing service at home</h4>
                                            </div>
                                            <div className="list-item">
                                                <h4 className="title">Lab Test At Home</h4>
                                            </div>
                                            <div className="list-item">
                                                <h4 className="title">Doctor at home</h4>
                                            </div>
                                            <div className="list-item">
                                                <h4 className="title">Online Medical Consultation</h4>
                                            </div>
                                            <div className="list-item">
                                                <h4 className="title">24/7 Nursing service at home</h4>
                                            </div>
                                            <div className="list-item">
                                                <h4 className="title">Lab Test At Home</h4>
                                            </div>
                                            <div className="list-item">
                                                <img src="images/bg.jpg" className="responsive" alt="SERVICES" />
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item"><a className="nav-link" href="">Lab Test</a></li>
                                    <li className="nav-item"><a className="nav-link" href="">Health Packages</a></li>
                                    <li className="nav-item"><a className="nav-link" href="">Special Packages</a></li>
                                    <li className="nav-item"><a className="nav-link" href="">Contact</a></li>
                                    <li id="search">
                                        <span className="search">
                                            <input className="search-txt" type="text" name="" placeholder="Search here.." />
                                            <a className="search-btn" href="#">
                                                <i className="fas fa-search"></i>
                                            </a>
                                        </span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="header-item-right">
                            <button type="button" className="menu-mobile-trigger">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}