import React, { useState, useEffect } from 'react';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

const AppHeader = () => {
    const { width } = useWindowDimensions();

    const [displayMenu, setdisplayMenu] = useState(false);
    useEffect(() => {
        if (width > 819) {
            setdisplayMenu(true)
        } else {
            setdisplayMenu(false)
        }
    }, [width]);
    return <> <header id="content-header">
        <div className="container">
            <div id="portal-header">
                <a id="portal-logo" title="Unmasked" href="https://unmasked.nation.africa">
                    <img src="https://unmasked.nation.africa/@@site-logo/logo (1).png" alt="Unmasked" title="Unmasked" /></a>
                <div id="portal-searchbox">
                    <form id="searchGadget_form" action="https://unmasked.nation.africa/@@search" role="search" data-pat-livesearch="ajaxUrl:https://unmasked.nation.africa/@@ajax-search" className="pat-livesearch">
                        <div className="LSBox">
                            <label className="hiddenStructure" htmlFor="searchGadget">Search Site</label>
                            <input name="SearchableText" type="text" id="searchGadget" title="Search Site" placeholder="Search Site" className="searchField" autoComplete="off" /><ul className="livesearch-results" style={{ display: "none" }}></ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </header>
        <div id="mainnavigation-wrapper" className="row">
            <div id="section-title"><h5><a href="https://unmasked.nation.africa">Unmasked</a></h5></div>
            <div id="mainnavigation">
                <nav className="plone-navbar pat-navigationmarker" id="portal-globalnav-wrapper">
                    <div className="container">
                        <div className="plone-navbar-header">
                            <button onClick={() => setdisplayMenu(!displayMenu)} type="button" className="plone-navbar-toggle collapsed" data-toggle="collapse" data-target="#portal-globalnav-collapse" aria-expanded="false">
                                {/* <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span> */}
                                Menu
                            </button>
                        </div>
                        <div style={{ display: width <= 819 ? 'none' : 'block' }} className="plone-collapse plone-navbar-collapse collapse" id="portal-globalnav-collapse" aria-expanded="false">
                            <ul className="plone-nav plone-navbar-nav" id="portal-globalnav">
                                <li className="index_html"><a href="https://unmasked.nation.africa" className="state-None">Home</a></li>
                                <li className="issues inPath"><a href="https://unmasked.nation.africa/issues" className="state-published">Issues</a></li>
                                <li className="people"><a href="https://unmasked.nation.africa/people" className="state-published">People</a></li>
                                <li className="organisations"><a href="https://unmasked.nation.africa/organisations" className="state-published">Organisations</a></li>
                                <li className="procurement"><a href="https://unmasked.nation.africa/procurement" className="state-published">Procurement</a></li>
                                <li className="procurement"><a href={process.env.REACT_APP_URL} className="state-published active">Relationships</a></li>
                            </ul>
                        </div>
                        <div style={{ display: width > 819 ? 'none' : 'block' }} >
                            <div  style={{ display: displayMenu === true ? 'block' : 'none', paddingTop: '60px' }} className="phone-nav plone-collapse plone-navbar-collapse collapse" id="portal-globalnav-collapse" aria-expanded="false">
                                <ul className="plone-nav plone-navbar-nav" id="portal-globalnav">
                                    <li className="index_html"><a href="https://unmasked.nation.africa" className="state-None">Home</a></li>
                                    <li className="issues inPath"><a href="https://unmasked.nation.africa/issues" className="state-published">Issues</a></li>
                                    <li className="people"><a href="https://unmasked.nation.africa/people" className="state-published">People</a></li>
                                    <li className="organisations"><a href="https://unmasked.nation.africa/organisations" className="state-published">Organisations</a></li>
                                    <li className="procurement"><a href="https://unmasked.nation.africa/procurement" className="state-published">Procurement</a></li>
                                    <li className="procurement"><a href={process.env.REACT_APP_URL} className="state-published">Relationships</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </nav>
            </div>
        </div>
    </>
}

export default AppHeader;


