import { Link } from "react-router-dom";
import { useContext } from "react";

import styles from "./TopBar.module.scss";

import { Context } from "../../context/Context";

import avatarDefault from "../../assest/images/avatarDafault.jpg";

export default function TopBar() {
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className={styles.top}>
            <div className={styles.topLeft}>
                <a href="https://www.facebook.com/">
                    <i
                        className={`${styles.topIcon} + ${styles.topIconFace} sytles fab fa-facebook-square`}
                    ></i>
                </a>
                <a href="https://www.instagram.com/">
                    <i
                        className={`${styles.topIcon} + ${styles.topIconInsta} sytles fab fa-instagram-square`}
                    ></i>
                </a>
                <a href="https://www.pinterest.com/">
                    <i
                        className={`${styles.topIcon} + ${styles.topIconPin} sytles fab fa-pinterest-square`}
                    ></i>
                </a>
                <a href="https://twitter.com/">
                    <i
                        className={`${styles.topIcon} + ${styles.topIconTwit} sytles fab fa-twitter-square`}
                    ></i>
                </a>
            </div>
            <div className={styles.topCenter}>
                <ul className={styles.topList}>
                    <li className={styles.topListItem}>
                        <Link className="link" to="/">
                            HOME
                        </Link>
                    </li>
                    <li className={styles.topListItem}>
                        <Link className="link" to="/">
                            ABOUT
                        </Link>
                    </li>
                    <li className={styles.topListItem}>
                        <Link className="link" to="/">
                            CONTACT
                        </Link>
                    </li>
                    <li className={styles.topListItem}>
                        <Link className="link" to="/write">
                            WRITE
                        </Link>
                    </li>
                    {user && (
                        <li
                            className={styles.topListItem}
                            onClick={handleLogout}
                        >
                            <Link className="link" to="/">
                                LOGOUT
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
            <div className={styles.topRight}>
                {user ? (
                    <Link className="link" to="/settings">
                        <img
                            className={styles.topImg}
                            src={
                                user.profilePic
                                    ? PF + user.profilePic
                                    : avatarDefault
                            }
                            alt=""
                        />
                    </Link>
                ) : (
                    <ul className={styles.topList}>
                        <li className={styles.topListItem}>
                            <Link className="link" to="/login">
                                LOGIN
                            </Link>
                        </li>
                        <li className={styles.topListItem}>
                            <Link className="link" to="/register">
                                REGISTER
                            </Link>
                        </li>
                    </ul>
                )}
                <i className={`${styles.topSearchIcon} fas fa-search`}></i>
            </div>
        </div>
    );
}
