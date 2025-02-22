import "./teacher.css";
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { updateTeacher } from "../../../context/teacherContext/apiCalls";
import { useContext, useState } from "react";
import { TeacherContext } from "../../../context/teacherContext/TeacherContext";
import swal from 'sweetalert';
import storage from "../../../firebase/firebase";
import { useHistory } from "react-router-dom";

export default function Teacher() {
    // Update Teacher
    const History = useHistory();
    const { dispatch } = useContext(TeacherContext);
    const location = useLocation();
    const teacher = location.teacher;
    const [inputs, setInputs] = useState(null);
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(0);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        updateTeacher(teacher._id, inputs, dispatch);
        History.push("/");
    };

    const upload = (items) => {

        items.forEach((item) => {
            if (item.file === null) {
                setUploaded(uploaded + 1);
                // Go to the next item without returning
            }
            else {
                const FileName = Date.now() + item.label + item.file.name;
                const uploadTask = storage.ref(`/Teachers/${FileName}`).put(item.file);
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
        ]);
    };

    console.log(teacher)
    console.log(inputs)

    return (
        <div className="teacher">
            <div className="teacherTitleContainer">
                <h1 className="teacherTitle">Teacher</h1>
            </div>
            <div className="teacherTop">
                <div className="teacherTopRight">
                    <div className="teacherInfoTop">
                        <img src={teacher.picture} alt="" className="teacherInfoImg" />
                        <span className="teacherName">{teacher.name}</span>
                    </div>
                    <div className="teacherInfoBottom">
                        <div className="teacherInfoItem">
                            <span className="teacherInfoKey">id:</span>
                            <span className="teacherInfoValue">{teacher._id}</span>
                        </div>
                        <div className="teacherInfoItem">
                            <span className="teacherInfoKey">Department:</span>
                            <span className="teacherInfoValue">{teacher.department}</span>
                        </div>
                        <div className="teacherInfoItem">
                            <span className="teacherInfoKey">Email:</span>
                            <span className="teacherInfoValue">{teacher.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="teacherBottom">
                <form className="teacherForm">
                    <div className="teacherFormLeft">
                        <label>Teacher Name</label>
                        <input type="text" placeholder={teacher.name} name="name" onChange={handleChange} />
                        <label>Department</label>
                        <select name="department" id="department" onChange={handleChange}>
                            <option value={teacher.department}>{teacher.department}</option>
                            <option value={teacher.department}>{teacher.department}</option>
                        </select>
                        <label>Email</label>
                        <input type="email" placeholder={teacher.email} name="email" onChange={handleChange} />
                        <label>About</label>
                        <textarea type="text" placeholder={teacher.about} name="about" onChange={handleChange} />
                    </div>
                    <div className="teacherFormRight">
                        <div className="teacherUpload">
                            <img src={teacher.picture} alt="" className="teacherUploadImg" />
                            <label for="picture">
                                <Publish />
                            </label>
                            <input type="file" id="picture" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        {uploaded > 0 ? (
                            <button className="addTeacherButton" onClick={handleSubmit}>
                                Create
                            </button>
                        ) : (
                            <button className="addTeacherButton" onClick={handleUpload}>
                                Upload
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
