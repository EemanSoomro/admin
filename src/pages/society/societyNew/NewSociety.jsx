import "./newSociety.css";
import { useState } from "react";
import storage from "../../../firebase/firebase";
import { createSociety } from "../../../context/societyContext/apiCalls";
import { SocietyContext } from "../../../context/societyContext/SocietyContext";
import { useContext } from "react";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
// Import Navigate from react-router-dom
export default function NewSociety() {
  const History = useHistory();
  const { dispatch } = useContext(SocietyContext);
  const [uploaded, setUploaded] = useState(0);
  const [inputs, setInputs] = useState(null);
  const [file, setFile] = useState(null);
  const [background, setBackground] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    createSociety(inputs, dispatch);
    resetInputFields();
    History.push("/");

  };

  const resetInputFields = () => {
    setInputs(null);
    setFile(null);
    setUploaded(0);
  };


  const upload = (items) => {
    if (items === null) return;
    items.forEach((item) => {
      if (item.file === null) {
        setUploaded(uploaded + 1);
        // Go to the next item without returning
      }
      else {
        const FileName = Date.now() + item.label + (item.file ? item.file.name : "");
        const uploadTask = storage.ref(`/Societys/${FileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          swal({
            title: "Uploading File",
            // Round off progress to 2 decimal places
            text: Math.round(progress) + "%",
            icon: "success",
            button: false,
            timer: 1800
          })
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setInputs((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
      }
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {
        file: file, label: "picture",
      },
      {
        file: background, label: "background",
      }
    ]);
  };
  console.log(inputs);



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
          <input type="file" id="background" name="background" onChange={(e) => setBackground(e.target.files[0])} multiple />
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
          {/* TeaxtArea */}
          <textarea placeholder="" rows="2" id="description" name="description" onChange={handleChange} />
        </div>
        {uploaded > 2 ? (
          <button className="addSocietyButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addSocietyButton" onClick={handleUpload}>
            Upload
          </button>
        )}

      </form>
    </div>
  );
}
