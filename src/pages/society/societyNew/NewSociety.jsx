import "./newSociety.css";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import storage from "../../../firebase/firebase";
import { createSociety } from "../../../context/societyContext/apiCalls";
import { SocietyContext } from "../../../context/societyContext/SocietyContext";
import swal from "sweetalert";

export default function NewSociety() {
  const history = useHistory();
  const { dispatch } = useContext(SocietyContext);
  const [uploaded, setUploaded] = useState(0);
  const [inputs, setInputs] = useState({}); // Empty object to avoid null errors
  const [file, setFile] = useState(null);
  const [background, setBackground] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputs.name || !inputs.code || !inputs.description) {
      swal("Error", "All fields are required!", "error");
      return;
    }

    createSociety(inputs, dispatch);
    resetInputFields();
    history.push("/");
  };

  const resetInputFields = () => {
    setInputs({});
    setFile(null);
    setBackground(null);
    setUploaded(0);
  };

  const upload = (items) => {
    if (items.length === 0) return;

    items.forEach((item) => {
      if (!item.file) {
        setUploaded((prev) => prev + 1);
      } else {
        const fileName = `${Date.now()}_${item.label}_${item.file.name}`;
        const uploadTask = storage.ref(`/Societys/${fileName}`).put(item.file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            swal({ title: "Uploading File", text: `${progress}%`, icon: "success", button: false, timer: 1800 });
          },
          (error) => console.error(error),
          async () => {
            const url = await uploadTask.snapshot.ref.getDownloadURL();
            setInputs((prev) => ({ ...prev, [item.label]: url }));
            setUploaded((prev) => prev + 1);
          }
        );
      }
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: file, label: "picture" },
      { file: background, label: "background" }
    ]);
  };

  return (
    <div className="newSociety">
      <h1 className="addSocietyTitle">New Society</h1>
      <form className="addSocietyForm">
        <div className="addSocietyItem">
          <label>Image</label>
          <input type="file" id="picture" name="picture" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addSocietyItem">
          <label>Background</label>
          <input type="file" id="background" name="background" onChange={(e) => setBackground(e.target.files[0])} />
        </div>
        <div className="addSocietyItem">
          <label>Code</label>
          <input type="text" placeholder="DECS" id="code" name="code" onChange={handleChange} />
        </div>
        <div className="addSocietyItem">
          <label>Name</label>
          <input type="text" placeholder="Dramatics and Extra-Curricular Society" id="name" name="name" onChange={handleChange} />
        </div>
        <div className="addSocietyItem">
          <label>Description</label>
          <textarea placeholder="Enter description" rows="2" id="description" name="description" onChange={handleChange} />
        </div>
        {uploaded >= 2 ? (
          <button className="addSocietyButton" onClick={handleSubmit}>Create</button>
        ) : (
          <button className="addSocietyButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}
