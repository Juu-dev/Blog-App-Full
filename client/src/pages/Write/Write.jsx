import { useContext, useState, useRef, useMemo } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";

import { Context } from "../../context/Context";

import styles from "./Write.module.scss";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
      width: "100%",
      height: "90%",
    }),
    []
  );

  const handleSubmit = async (e) => {
    console.log("submit: ", e);
    e.preventDefault();

    const newPost = {
      username: user.username,
      user_id: user._id,
      title_post: title,
      desc,
      category: "life",
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className={styles.write}>
      {file && (
        <img
          className={styles.writeImg}
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className={styles.writeForm} onSubmit={handleSubmit}>
        <div className={styles.writeFormGroup}>
          <label htmlFor="fileInput">
            <i className={`${styles.writeIcon} fas fa-plus`}></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className={styles.writeInput}
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.writeFormGroup} style={{ height: "100%" }}>
          {/* <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className={styles.writeInput + styles.writeText}
                        autoFocus={true}
                        onChange={(e) => setDesc(e.target.value)}
                    /> */}
          <JoditEditor
            ref={editor}
            value={desc}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setDesc(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => setDesc(newContent)}
          />
        </div>
        <div
          style={{
            textAlign: "right",
            marginTop: "20px",
            marginLeft: "150px",
            marginRight: "150px",
          }}
        >
          <button className={styles.button_7} type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
