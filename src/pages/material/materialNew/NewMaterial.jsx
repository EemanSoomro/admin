import "./newMaterial.css";
import { useState, useEffect } from "react";
import storage from "../../../firebase/firebase";
import { createMaterial } from "../../../context/materialContext/apiCalls";
import { MaterialContext } from "../../../context/materialContext/MaterialContext";
import { useContext } from "react";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
// Import Navigate from react-router-dom
export default function NewMaterial() {
    const History = useHistory();
    const { dispatch } = useContext(MaterialContext);
    const [uploaded, setUploaded] = useState(0);
    const [inputs, setInputs] = useState(null);
    const [file, setFile] = useState(null);
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    console.log(inputs);


    useEffect(() => {
        const getCourses = async () => {
            const res = await fetch("/courses",
                {
                    method: "GET",
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
            const data = await res.json();
            setCourses(data);
        };
        const getTeachers = async () => {
            const res = await fetch("/facultys",
                {
                    method: "GET",
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
            const data = await res.json();
            setTeachers(data);
        };
        getCourses();
        getTeachers();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        createMaterial(inputs, dispatch);
        resetInputFields();
        // Refresh the page
        History.push("/materials");

    };

    const resetInputFields = () => {
        setInputs(null);
        setFile(null);
        setUploaded(0);
    };

    const upload = (items) => {

        if (items === null) return;
        items.forEach((item) => {
            const FileName = Date.now() + item.label + item.file.name;
            const uploadTask = storage.ref(`/Materials/${FileName}`).put(item.file);
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
        });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            {
                file: file, label: "file",
            }
        ]);
    };
    console.log(inputs);



    return (
        <div className="newMaterial">
            <h1 className="addMaterialTitle">New Material</h1>
            <form className="addMaterialForm">
                <div className="addMaterialItem">
                    <label>Upload File</label>
                    <input type="file" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="addMaterialItem">
                    <label>Material Name</label>
                    <input type="text" placeholder="DDR Week 01 Slides 01" id="name" name="name" onChange={handleChange} />
                </div>
                <div className="addMaterialItem">
                    <label>Semester</label>
                    <select name="semester" id="semester" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="1">Semester 01</option>
                        <option value="2">Semester 02</option>
                        <option value="3">Semester 03</option>
                        <option value="4">Semester 04</option>
                        <option value="5">Semester 05</option>
                        <option value="6">Semester 06</option>
                        <option value="7">Semester 07</option>
                        <option value="8">Semester 08</option>
                    </select>
                </div>
                <div className="addMaterialItem">
                    <label>Type</label>
                    <select name="type" id="type" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Slides">Slides</option>
                        <option value="Book">Book</option>
                        <option value="Outline">Outline</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Assignment">Assignment</option>
                        <option value="Past Paper">Past Paper</option>
                    </select>
                </div>
                <div className="addMaterialItem">
                    <label>Course</label>
                    <select name="course_id" id="course_id" onChange={handleChange}>
                        <option value="Core">Select</option>
                        {courses.map((course) => (
                            <option value={course._id}>{course.name}</option>
                        ))}
                    </select>
                </div>
                <div className="addMaterialItem">
                    <label>Teacher</label>
                    <select name="teacher_id" id="teacher_id" onChange={handleChange}>
                        <option value="Core">Select</option>
                        {teachers.map((teacher) => (
                            <option value={teacher._id}>{teacher.name}</option>
                        ))}
                    </select>
                </div>
                {uploaded === 1 ? (
                    <button className="addMaterialButton" onClick={handleSubmit}>
                        Create
                    </button>
                ) : (
                    <button className="addMaterialButton" onClick={handleUpload}>
                        Upload
                    </button>
                )}

            </form>
        </div>
    );
}
