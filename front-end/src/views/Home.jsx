import '../css/home.css';
import homePageImg from '../assets/img/homepage.png';
import DevenezBenevoleImg from '../assets/img/DevenezBenevoleImg.png';
import nomoreWasteHomepageImg from '../assets/img/nomorewasteHomepage.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Beneficiary from '../../../back-office/src/Views/users/Beneficiary';
import Footer from './Footer/Footer';

export default function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation("global");

    const handleButtonClick = () => {
        navigate('/connexion');
    };

    return (
        <>
        <div className="HomePageBody">
                <div>
                    <img
                        className="homepageFirstImage"
                        src={homePageImg}
                    />
                </div>
            </div>
            <div className="LogoSectionHome">
                <img
                    className="LogoSectionHome"
                    src={nomoreWasteHomepageImg}
                />
            </div>
            <div className="DevenezBenevoleSection">
                <div className="DevenezBenevoleSectionLeft">
                    <h1>{t('became beneficiary')}</h1>
                    <button className="DevenezBenevoleButton" onClick={handleButtonClick}>
                        {t('join !')}
                    </button>
                </div>
                <div className="DevenezBenevoleSectionRight">
                    <img
                        className="DevenezBenevoleImg"
                        src={DevenezBenevoleImg}
                    />
                </div>
            </div>
            <div className="BenevoleCentreInteret">
                <div className="BenevoleCentreInteretText">
                    <div>
                        <h1>{t('Volunteering and more if you like')}</h1>
                    </div>
                    <div>
                        <h2>{t('Contribute to a cause that matters to you')}</h2>
                    </div>
                </div>
                <div className="BenevoleCentreInteretButtonSection">
                    <div className="BenevoleCentreInteretButton">
                        🍵 {t('food distribution')}
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        👵 {t('personal assistance')}
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        📚 {t('adminstartive help')}
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        💼 {t('job help')}
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        🐰 {t('animals healing')}
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        🚛 {t('logistic')}
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        📅 {t('evenmential')}
                    </div>
                    <div className="BenevoleCentreInteretButton">
                        🙋‍♂️ {t('academic support')}
                    </div>
                </div>
            </div>
            <div className="HomePageAvisSection"></div>
            <Footer></Footer>
            </>
    )
}