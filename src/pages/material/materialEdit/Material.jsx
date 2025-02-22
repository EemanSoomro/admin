import "./material.css";
import { useLocation } from "react-router-dom";
import { updateMaterial } from "../../../context/materialContext/apiCalls";
import { useContext, useState, useEffect } from "react";
import { MaterialContext } from "../../../context/materialContext/MaterialContext";
import swal from 'sweetalert';
import storage from "../../../firebase/firebase";
import { useHistory } from "react-router-dom";


export default function Material() {
    // Update Material
    const History = useHistory();
    const { dispatch } = useContext(MaterialContext);
    const location = useLocation();
    const material = location.material;
    const [inputs, setInputs] = useState(null);
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const [materialOutline, setOutline] = useState(null);
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    console.log(inputs);
    console.log(setOutline);


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
        updateMaterial(material._id, inputs, dispatch);
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
                const uploadTask = storage.ref(`/items/${FileName}`).put(item.file);
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
                file: file, label: "materialImage",
            },
            {
                file: materialOutline, label: "materialOutline",
            },
        ]);
    };
    console.log(inputs);





    return (
        <div className="material">
            <div className="materialTitleContainer">
                <h1 className="materialTitle">Material</h1>
            </div>
            <div className="materialTop">

                <div className="materialTopRight">
                    <div className="materialInfoTop">
                        <span className="materialName">{material.name}</span>
                    </div>
                    <div className="materialInfoBottom">
                        <div className="materialInfoItem">
                            <span className="materialInfoKey">id: </span>
                            <span className="materialInfoValue"> {material._id}</span>
                        </div>
                        <div className="materialInfoItem">
                            <span className="materialInfoKey">Course: </span>
                            <span className="materialInfoValue">
                                {/* Get Course Name from Course Array using this course_id */}
                                {
                                    courses.map((course) => {
                                        return course._id === material.course_id ? course.name : null;
                                    }
                                    )

                                }
                            </span>
                        </div>
                        <div className="materialInfoItem">
                            <span className="materialInfoKey">Teacher</span>
                            <span className="materialInfoValue">
                                {/* Get Teacher Name from Teacher Array using this teacher_id */}
                                {
                                    teachers.map((teacher) => {
                                        return teacher._id === material.teacher_id ? teacher.name : null;
                                    }
                                    )
                                }
                            </span>
                        </div>
                        <div className="materialInfoItem">
                            <span className="materialInfoKey">Type: </span>
                            <span className="materialInfoValue">{material.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="materialBottom">
                <form className="materialForm">
                    <div className="materialFormLeft">
                        <div className="AddItem">
                            <label>Material Name</label>
                            <input type="text" placeholder={material.name} id="name" name="name" onChange={handleChange} />
                        </div>
                        <div className="AddItem">
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
                        <div className="AddItem">
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

                    </div>
                    <div className="materialFormRight">
                        <div className="AddItem">
                            <label>Course</label>
                            <select name="course_id" id="course_id" onChange={handleChange}>
                                <option value="Core">Select</option>
                                {courses.map((course) => (
                                    <option value={course._id}>{course.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="AddItem">
                            <label>Teacher</label>
                            <select name="teacher_id" id="teacher_id" onChange={handleChange}>
                                <option value="Core">Select</option>
                                {teachers.map((teacher) => (
                                    <option value={teacher._id}>{teacher.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="AddItem">
                            <label>Upload File</label>
                            <input type="file" id="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        {uploaded > 0 ? (
                            <button className="addMaterialButton" onClick={handleSubmit}>
                                Create
                            </button>
                        ) : (
                            <button className="addMaterialButton" onClick={handleUpload}>
                                Upload
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
