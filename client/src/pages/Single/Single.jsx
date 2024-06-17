import styles from "./Single.module.scss";

import SideBar from "../../components/SideBar/SideBar";
import SinglePost from "../../components/SinglePost/SignlePost";

export default function Single() {
  return (
    <div className={styles.single}>
      <SinglePost />
    </div>
  );
}
