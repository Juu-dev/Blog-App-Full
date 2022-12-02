import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./SideBar.module.scss";

import { Context } from "../../context/Context";

import avatarDefault from "../../assest/images/avatarDafault.jpg";

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    const { user, dispatch } = useContext(Context);

    const PF = "http://localhost:5000/images/";

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, []);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarItem}>
                <span className={styles.sidebarTitle}>ABOUT ME</span>
                <img
                    className={styles.sidebarImage}
                    src={user !== null ? PF + user.profilePic : avatarDefault}
                    alt=""
                />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore
                    mollit amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className={styles.sidebarItem}>
                <span className={styles.sidebarTitle}>CATEGORIES</span>
                <ul className={styles.sidebarList}>
                    {cats.map((cat) => {
                        <li className={styles.sidebarListItem}>
                            <Link
                                className="link"
                                to={`/posts?cat=${cat.name}`}
                            >
                                {cat.name}
                            </Link>
                        </li>;
                    })}
                </ul>
            </div>
            <div className={styles.sidebarItem}>
                <span className={styles.sidebarTitle}>FOLLOW US</span>
                <div className={styles.sidebarSocial}>
                    <i
                        className={` ${styles.sidebarIcon} + ${styles.topIconFace} fab fa-facebook-square`}
                    ></i>
                    <i
                        className={` ${styles.sidebarIcon} + ${styles.topIconInsta} fab fa-instagram-square`}
                    ></i>
                    <i
                        className={` ${styles.sidebarIcon} + ${styles.topIconPin} fab fa-pinterest-square`}
                    ></i>
                    <i
                        className={` ${styles.sidebarIcon} + ${styles.topIconTwit} fab fa-twitter-square`}
                    ></i>
                </div>
            </div>
        </div>
    );
}
