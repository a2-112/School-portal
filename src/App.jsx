import { useState, useEffect } from "react";

export default function App() {
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );
  const [formData, setFormData] = useState({ name: "", email: "", gender: "", course: "" });
  const [message, setMessage] = useState("");
  const [showStudentList, setShowStudentList] = useState(false);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.gender && formData.course) {
      setStudents([...students, formData]);
      setMessage("You have registered successfully!");
      setTimeout(() => {
        setMessage("");
        setShowStudentList(true);
      }, 2000);
      setFormData({ name: "", email: "", gender: "", course: "" });
    }
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {showStudentList ? (
        <div className="w-full max-w-8xl ">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 text-center">
            Registered Students
          </h1>

          {students.length === 0 ? (
            <p className="text-gray-500 text-center">No students registered yet.</p>
          ) : (
            <div className="bg-white p-4 shadow-lg rounded-lg w-full overflow-hidden">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="bg-blue-500 text-white text-left">
                    <th className="p-2 md:p-4">Name</th>
                    <th className="p-2 md:p-4">Email</th>
                    <th className="p-2 md:p-4">Gender</th>
                    <th className="p-2 md:p-4">Course</th>
                    <th className="p-2 md:p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="border-b text-left">
                      <td className="p-2 md:p-4">{student.name}</td>
                      <td className="p-2 md:p-4 break-all">{student.email}</td>
                      <td className="p-2 md:p-4">{student.gender}</td>
                      <td className="p-2 md:p-4">{student.course}</td>
                      <td className="p-2 md:p-4">
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            onClick={() => setShowStudentList(false)}
            className="mt-6 text-blue-500 hover:underline"
          >
            Register Another Student
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl flex-col items-center Intro">
        
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 text-center">Judy's Tech Hub</h1>

          {message && <p className="text-green-600 font-bold mb-4 text-center">{message}</p>}

          <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg flex-col items-center user-detail">
            <div className="mb-4 ">
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button type="submit" className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-blue-600 transition ">
              Register Student
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
