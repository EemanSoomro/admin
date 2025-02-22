import "./society.css";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { updateSociety } from "../../../context/societyContext/apiCalls";
import { useContext, useState } from "react";
import { SocietyContext } from "../../../context/societyContext/SocietyContext";
import swal from 'sweetalert';
import storage from "../../../firebase/firebase";
import { useHistory } from "react-router-dom";

export default function Society() {
  // Update Society
  const History = useHistory();
  const { dispatch } = useContext(SocietyContext);
  const location = useLocation();
  const society = location.society;
  const [inputs, setInputs] = useState(null);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [backgroundpicture, setbackgroundimage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSociety(society._id, inputs, dispatch);
    History.push("/");
  };

  const upload = (items) => {
    if (items === null) return;
    items.forEach((item) => {
      if (item.file === null) {
        setUploaded(uploaded + 1);
        // Go to the next item without returning
      }
      else {
        const FileName = Date.now() + item.label + society.name;
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
              setUploaded(uploaded + 1);
              setInputs((prev) => ({ ...prev, [item.label]: url }));
            });
          }
        );
      }
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: file, label: "picture" },
      {
        file: backgroundpicture, label: "background",
      }
    ]);
  };

  console.log(society)
  console.log(inputs)

  return (
    <div className="society">
      <div className="societyTitleContainer">
        <h1 className="societyTitle">Society</h1>
      </div>
      <div className="societyTop">
        <div className="societyTopRight">
          <div className="societyInfoTop">
            <img src={society.picture} alt="" className="societyInfoImg" />
            <span className="societyName">{society.name}</span>
          </div>
          <div className="societyInfoBottom">
            <div className="societyInfoItem">
              <span className="societyInfoKey">id:</span>
              <span className="societyInfoValue">{society._id}</span>
            </div>
            <div className="societyInfoItem">
              <span className="societyInfoKey">Code:</span>
              <span className="societyInfoValue">{society.code}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="societyBottom">
        <form className="societyForm">
          <div className="societyFormLeft">
            <label>Society Name</label>
            <input type="text" placeholder={society.name} name="name" onChange={handleChange} />
            <label>Code</label>
            <select name="code" id="code" onChange={handleChange}>
              <option value={society.code}>{society.code}</option>
            </select>
            <label>About</label>
            <textarea type="text" placeholder={society.description} name="description" onChange={handleChange} />
          </div>
          <div className="societyFormRight">
            <div className="societyUpload">
              <img src={society.picture} alt="" className="societyUploadImg" />
              <label for="picture">
                <Publish />
              </label>
              <input type="file" id="picture" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="societyUpload">
              <img src={society.background} alt="" className="societyUploadImg" />
              <label for="background">
                <Publish />
              </label>
              <input type="file" id="background" style={{ display: "none" }} onChange={(e) => setbackgroundimage(e.target.files[0])} />
            </div>
            {uploaded > 1 ? (
              <button className="addSocietyButton" onClick={handleSubmit}>
                Create
              </button>
            ) : (
              <button className="addSocietyButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
