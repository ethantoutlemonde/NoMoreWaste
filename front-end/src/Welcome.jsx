import React from "react";
import Footer from "./Components/Footer/Footer.jsx";
import "./css/home.css";
// import MainNavBar from "@/Components/Navigation/MainNavBar3";

export default function Welcome() {
    return (
        <>
            {/* <MainNavBar /> */}
            <div className="HomePageBody">
                <div>
                    <img
                        className="homepageFirstImage"
                        src="/assets/img/homepage.png"
                    />
                </div>
            </div>
            <div className="LogoSectionHome">
                <img
                    className="LogoSectionHome"
                    src="/assets/img/nomorewasteHomepage.png"
                />
            </div>
            <div className="DevenezBenevoleSection">
                <div className="DevenezBenevoleSectionLeft">
                    <h1>Devenez Bénévole</h1>
                    <button className="DevenezBenevoleButton">
                        Rejoindre !
                    </button>
                </div>
                <div className="DevenezBenevoleSectionRight">
                    <img
                        className="DevenezBenevoleImg"
                        src="/assets/img/DevenezBenevoleImg.png"
                    />
                </div>
            </div>
            <div className="BenevoleCentreInteret">
                <div className="BenevoleCentreInteretText">
                    <div>
                        <h1>Le bénévolat et plus si affinités</h1>
                    </div>
                    <div>
                        <h2>Contribuez à une cause qui vous touche a cœur</h2>
                    </div>
                </div>
                <div className="BenevoleCentreInteretButtonSection">
                    <div className="BenevoleCentreInteretButton">
                        🍵 Maraude
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        👵 Aide à la personne
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        📚 Aide administrative
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        💼 Aide à l'emploi
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        🐰 Soins des annimaux
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        🚛 Logisique
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        📅 Evénementiel
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        🙋‍♂️ Soutien Scolaire et formation
                    </div>
                </div>
            </div>
            <div className="HomePageAvisSection"></div>
            <Footer></Footer>
        </>
    );
}
