import "./newSociety.css";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { createSociety } from "../../../context/societyContext/apiCalls";
import { SocietyContext } from "../../../context/societyContext/SocietyContext";
import swal from "sweetalert";
import storage from "../../../firebase/firebase"; // Correct Firebase import

export default function NewSociety() {
  const history = useHistory();
  const { dispatch } = useContext(SocietyContext);
  const [inputs, setInputs] = useState({}); // Empty object to avoid null errors
  const [file, setFile] = useState(null);
  const [background, setBackground] = useState(null);
  const [uploaded, setUploaded] = useState(0); // Track number of uploaded files

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const upload = async (items) => {
    if (items.length === 0) return;
  
    let uploadedFiles = {};
  
    await Promise.all(
      items.map((item) => {
        return new Promise((resolve, reject) => {
          if (!item.file) {
            resolve();
          } else {
            const fileName = `${Date.now()}_${item.label}_${item.file.name}`;
            const uploadTask = storage.ref(`/Societys/${fileName}`).put(item.file);
  
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(`Upload progress: ${progress}%`);
              },
              (error) => {
                console.error(error);
                swal("Error", "There was an issue uploading the file", "error");
                reject(error);
              },
              async () => {
                const url = await uploadTask.snapshot.ref.getDownloadURL();
                console.log("File uploaded, URL: ", url);
                uploadedFiles[item.label] = url;
                resolve();
              }
            );
          }
        });
      })
    );
  
    return uploadedFiles;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!inputs.name || !inputs.code || !inputs.description || !inputs.mentor) {
      swal("Error", "All fields are required!", "error");
      return;
    }
  
    console.log("Submitting Data:", inputs);
  
    try {
      const uploadedFiles = await upload([
        { file: file, label: "picture" },
        { file: background, label: "background" },
      ]);
  
      // Merge uploaded file URLs into inputs
      setInputs((prev) => ({ ...prev, ...uploadedFiles }));
  
      // Proceed to create society once files are uploaded
      await createSociety({ ...inputs, ...uploadedFiles }, dispatch);
      resetInputFields();
      history.push("/");
      swal("Success", "Society Successfully Added!", "success");
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const resetInputFields = () => {
    setInputs({});
    setFile(null);
    setBackground(null);
  };

  return (
    <div className="newSociety">
      <h1 className="addSocietyTitle">New Society</h1>
      <form className="addSocietyForm">
        <div className="addSocietyItem">
          <label>Image</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addSocietyItem">
          <label>Background</label>
          <input
            type="file"
            id="background"
            name="background"
            onChange={(e) => setBackground(e.target.files[0])}
          />
        </div>
        <div className="addSocietyItem">
          <label>Code</label>
          <input
            type="text"
            placeholder="DECS"
            id="code"
            name="code"
            onChange={handleChange}
          />
        </div>
        <div className="addSocietyItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Dramatics and Extra-Curricular Society"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="addSocietyItem">
          <label>Mentor</label>
          <input
            type="text"
            placeholder="Enter Mentor's Name"
            id="mentor"
            name="mentor"
            onChange={handleChange}
          />
        </div>
        <div className="addSocietyItem">
          <label>Description</label>
          <textarea
            placeholder="Enter description"
            rows="2"
            id="description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <button className="addSocietyButton" onClick={handleSubmit}>
          Create
        </button>
      </form>

      {/* Display uploaded image */}
      {inputs.picture && <img src={inputs.picture} alt="Uploaded" />}
    </div>
  );
}
