import { useContext, useState } from "react";
import axios from "axios";

import { Context } from "../../context/Context";

import styles from "./Settings.module.scss";

import Sidebar from "../../components/SideBar/SideBar.jsx";

import avatarDefault from "../../assest/images/avatarDafault.jpg";

export default function Settings() {
  const { user, dispatch, isGoogle } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user === null ? "" : user.username);
  const [email, setEmail] = useState(user === null ? "" : user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log("Can't upload file");
      }
    }

    try {
      console.log("updatedUser: ", updatedUser);

      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settingsWrapper}>
        <div className={styles.settingsTitle}>
          <span className={styles.settingsTitleUpdate}>
            Update Your Account
          </span>
          <span className={styles.settingsTitleDelete}>Delete Account</span>
        </div>
        <form className={styles.settingsForm} onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className={styles.settingsPP}>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePic !== ""
                  ? isGoogle
                    ? user.profilePic
                    : PF + user.profilePic
                  : avatarDefault
              }
              alt=""
            />
            <label htmlFor="fileInput">
              <i className={`${styles.settingsPPIcon} far fa-user-circle`}></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              className={styles.settingsPPInput}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.settingsSubmitButton}
            type="submit"
            disabled={!password}
          >
            Update
          </button>
          {success && (
            <span
              style={{
                color: "green",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Profile has been updated...
            </span>
          )}
          {/* {success &&
                        setTimeout(
                            () => (
                                <span
                                    style={{
                                        color: "green",
                                        textAlign: "center",
                                        marginTop: "20px",
                                    }}
                                >
                                    Profile has been updated...
                                </span>
                            ),
                            3000
                        )} */}
        </form>
      </div>
    </div>
  );
}
