import "./newSociety.css";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { createSociety } from "../../../context/societyContext/apiCalls";
import { SocietyContext } from "../../../context/societyContext/SocietyContext";
import swal from "sweetalert";
import storage from "../../../firebase/firebase";

export default function NewSociety() {
  const history = useHistory();
  const { dispatch } = useContext(SocietyContext);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ Loading state added

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const upload = async (items) => {
    if (items.length === 0) return {};

    const uploadedFiles = {};

    await Promise.all(
      items.map(async (item) => {
        if (!item.file) return;

        const fileName = `${Date.now()}_${item.label}_${item.file.name}`;
        const uploadTask = storage.ref(`/Societys/${fileName}`).put(item.file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const url = await uploadTask.snapshot.ref.getDownloadURL();
              uploadedFiles[item.label] = url;
              resolve();
            }
          );
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

    setLoading(true); // ✅ Start loading when form is submitted

    try {
      const uploadedFiles = await upload([
        { file, label: "picture" },
        { file: background, label: "background" },
      ]);

      const newSocietyData = { ...inputs, ...uploadedFiles };
      await createSociety(newSocietyData, dispatch);
      swal("Success", "Society Successfully Added!", "success");

      setInputs({});
      setFile(null);
      setBackground(null);
      history.push("/");
    } catch (error) {
      console.error("Upload failed", error);
      swal("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false); // ✅ Stop loading after success/error
    }
  };

  return (
    <div className="newSociety">
      <h1 className="addSocietyTitle">New Society</h1>
      <form className="addSocietyForm" onSubmit={handleSubmit}>
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
          <label>Mentor</label>
          <input type="text" placeholder="Enter Mentor's Name" id="mentor" name="mentor" onChange={handleChange} />
        </div>
        <div className="addSocietyItem">
          <label>Description</label>
          <textarea placeholder="Enter description" rows="2" id="description" name="description" onChange={handleChange} />
        </div>
        <button type="submit" className="addSocietyButton" disabled={loading}>
          {loading ? "Creating..." : "Create"} {/* ✅ Button text changes when loading */}
        </button>
      </form>
    </div>
  );
}
