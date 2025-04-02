import { Link } from 'react-router';
import g from '../global.module.css';

import bannerImage from '../assets/images/home-bg.jpg';

function Home() {

    return (
        <main style={{backgroundImage: `url(${bannerImage})`}} className={`${g['container']} ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g['grid-container']} ${g["banner__content"]} ${g["text-center"]}`}>
                <div className={g['col-12']}>
                    <h1 className={g['h1']}>Welcome, collector</h1>
                    <h3>Sign up and share your library</h3>
                    <div className={g["banner__buttons"]}>
                        <Link to="/sign-up" className={`${g['button']} ${g["success"]}`}>Sign Up</Link>
                        <Link to="/sign-in" className={`${g['button']}`}>Sign In</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;