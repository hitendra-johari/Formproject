import React, { useState } from 'react'

const UserForm = ({ loadUsers }) => {




const [form, setForm] = useState({username: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    dob: "",
    skills: [],
    message: ""});
  const [error, setError] = useState("");
  
  const skillsOption = ["React", "Node", "MongoDB", "Express"];

    const handleSkills = (skill) => {
    const updatedSkills = form.skills.includes(skill)
      ? form.skills.filter(s => s !== skill)
      : [...form.skills, skill];

    setForm({ ...form, skills: updatedSkills });
  };


  const submitHandler = async (e) => {
    e.preventDefault();

   if (form.username.length < 3)
      return setError("Name must be at least 3 characters");
    if (!form.email.includes("@"))
      return setError("Please enter a valid Email!");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters!");
    if (!form.gender)
      return setError("Please select gender!");
    if (!form.country)
      return setError("Please select country!");
    setError("");



    await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: form.username,
  email: form.email,
  password: form.password,
  gender: form.gender,
  country: form.country,
  dob: form.dob,
  skills: form.skills,
  message: form.message})
    });

      setForm({username: "",
      email: "",
      password: "",
      gender: "",
      country: "",
      dob: "",
      skills: [],
      message: "" });
     

    
    loadUsers();
  };

  return (
    <>

     <form className="card p-4 mt-3" onSubmit={submitHandler}>

      <h4 className="mb-3 text-center">User Registration Form</h4>

      <input className="form-control mb-2" 
        value={form.username} placeholder="Full Name"
        onChange={(e)=>setForm({...form,username:e.target.value})}
      />

      <input className="form-control mb-2" type="email"
        value={form.email} placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}
      />

      <input className="form-control mb-2" type="password"
        value={form.password} placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}
      />

      {/* Gender - Radio Buttons */}
      <label className="mt-2 fw-bold">Gender:</label>
      <div>
        {["Male","Female","Other"].map(g=>(
          <label className="me-3" key={g}>
            <input type="radio"
              name="gender"
              checked={form.gender === g}
              onChange={()=>setForm({...form, gender:g})}
            /> {g}
          </label>
        ))}
      </div>

      {/* Country Dropdown */}
      <select className="form-select mt-2"
        value={form.country}
        onChange={(e)=>setForm({...form,country:e.target.value})}
      >
        <option value="">Select Country</option>
        <option>India</option>
        <option>USA</option>
        <option>UK</option>
      </select>

      {/* Date of Birth */}
      <input type="date" className="form-control mt-2"
        value={form.dob}
        onChange={(e)=>setForm({...form,dob:e.target.value})}
      />

      {/* Skills Checkboxes */}
      <label className="mt-3 fw-bold">Skills:</label>
      <div>
        {skillsOption.map(skill => (
          <label className="me-3" key={skill}>
            <input type="checkbox"
              checked={form.skills.includes(skill)}
              onChange={()=>handleSkills(skill)}
            /> {skill}
          </label>
        ))}
      </div>

      {/* Message Textarea */}
      <textarea className="form-control my-3"
        placeholder="Write about yourself..."
        value={form.message}
        onChange={(e)=>setForm({...form,message:e.target.value})}
      />

      <button className="btn btn-primary">Submit</button>

      {error && <p className="text-danger mt-2">{error}</p>}

    </form>
    
    </>
  )
}

export default UserForm