import "./course.css";
import { Publish } from "@material-ui/icons"; 
import { useLocation } from "react-router-dom";
import { updateCourse } from "../../../context/courseContext/apiCalls";
import { useContext, useState } from "react";
import { CourseContext } from "../../../context/courseContext/CourseContext";
import swal from 'sweetalert';
import storage from "../../../firebase/firebase";
import { useHistory } from "react-router-dom";


export default function Course() {
    // Update Course
    const History = useHistory();
    const { dispatch } = useContext(CourseContext);
    const location = useLocation();
    const course = location.course;
    const [inputs, setInputs] = useState(null);
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const [courseOutline, setOutline] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        updateCourse(course._id, inputs, dispatch);
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
                const uploadTask = storage.ref(`/Courses/${FileName}`).put(item.file);
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
                file: file, label: "courseImage",
            },
            {
                file: courseOutline, label: "courseOutline",
            },
        ]);
    };





    return (
        <div className="course">
            <div className="courseTitleContainer">
                <h1 className="courseTitle">Course</h1>
            </div>
            <div className="courseTop">

                <div className="courseTopRight">
                    <div className="courseInfoTop">
                        <img src={course.courseImage} alt="" className="courseInfoImg" />
                        <span className="courseName">{course.name}</span>
                    </div>
                    <div className="courseInfoBottom">
                        <div className="courseInfoItem">
                            <span className="courseInfoKey">id: </span>
                            <span className="courseInfoValue"> {course._id}</span>
                        </div>
                        <div className="courseInfoItem">
                            <span className="courseInfoKey">Core/Elective: </span>
                            <span className="courseInfoValue">{course.core_elective}</span>
                        </div>
                        <div className="courseInfoItem">
                            <span className="courseInfoKey">Upvotes:</span>
                            <span className="courseInfoValue">{course.upvote}</span>
                        </div>
                        <div className="courseInfoItem">
                            <span className="courseInfoKey">Downvotes: </span>
                            <span className="courseInfoValue">{course.downvote}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="courseBottom">
                <form className="courseForm">
                    <div className="courseFormLeft">
                        <label>Course Name</label>
                        <input type="text" placeholder={course.name} name="name" onChange={handleChange} />
                        <label>Course Code</label>
                        <input type="text" placeholder={course.coursecode} name="coursecode" onChange={handleChange} />
                        <label>Course Descriptionn</label>
                        <textarea type="text" placeholder={course.description} name="description" onChange={handleChange} />
                        <label>Credit Hours</label>
                        <input type="text" placeholder={course.credithours} name="credithours" onChange={handleChange} />

                        <label>Core / Elective</label>
                        <select name="core_elective" id="core_elective" onChange={handleChange}>
                            <option value="Core">Select</option>
                            <option value="Core">Core</option>
                            <option value="Elective">Elective</option>
                        </select>
                    </div>
                    <div className="courseFormRight">
                        <div className="courseUpload">
                            <img src={course.courseImage} alt="" className="courseUploadImg" />
                            <label for="courseImage">
                                <Publish />
                            </label>
                            <input type="file" id="courseImage" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className="courseUpload">
                            <h4>Course Outline</h4>
                            <label for="courseOutline">
                                <Publish />
                            </label>
                            <input type="file" id="courseOutline" style={{ display: "none" }} onChange={(e) => setOutline(e.target.files[0])} />
                        </div>
                        {uploaded > 1 ? (
                            <button className="addCourseButton" onClick={handleSubmit}>
                                Create
                            </button>
                        ) : (
                            <button className="addCourseButton" onClick={handleUpload}>
                                Upload
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
