import React from 'react';
import './Footer.css'

const AppFooter = () => {
    return (
        <footer id="portal-footer-wrapper">
            <div className="container" id="portal-footer">
                <div className="doormat row">
                    <div className="footer-links">
                        <div className="headline">
                            <h2>
                                Quick Links
                        </h2>
                        </div>
                        <section className="portletContent">
                            <ul>
                                <li>
                                    <a href="https://unmasked.nation.africa/issues">Issues</a></li>
                                <li>
                                    <a href="https://unmasked.nation.africa/people">People</a></li>
                                <li>
                                    <a href="https://unmasked.nation.africa/organisations">Organisations</a></li>
                                <li>
                                    <a href="https://unmasked.nation.africa/procurement">Procurement</a></li>
                            </ul>
                        </section>
                    </div>
                    <div className="footer-links">
                        <div className="headline">
                            <h2>
                                Our Partners
                        </h2>
                        </div>
                        <section className="portletContent">
                            <p>Public procurement portal built in partnership with Hivos and the Institute of Economic Affairs</p>
                            <div className="logos">
                                <a href="https://www.nationmedia.com/" target="_blank" rel="noopener noreferrer">
                                    <img alt="Nation Media Group" className="image-richtext" height="" src="https://unmasked.nation.africa/++theme++nmg-unmasked/img/nation-media-group.jpg" width="" />
                                </a><span>&nbsp;</span><a href="https://www.hivos.org/" target="_blank" rel="noopener noreferrer">
                                    <img alt="Hivos" className="image-richtext" height="" src="https://unmasked.nation.africa/++theme++nmg-unmasked/img/hivos.jpg" width="" />
                                </a><span>&nbsp;</span><a href="https://www.ieakenya.or.ke/" target="_blank" rel="noopener noreferrer">
                                    <img alt="Institute of Economic Affairs" className="image-richtext" height="" src="https://unmasked.nation.africa/++theme++nmg-unmasked/img/institute-of-economic-affires.jpg" width="" /></a></div>
                        </section>
                    </div>
                </div>
                <div className="copyright row"><div className="col-xs-12">
                    Nation Media Group ©2020 Nation Part of Nation Media Group
                </div>
                </div>

            </div>
        </footer>
    )
}

export default AppFooter;