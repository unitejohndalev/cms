import React, { useEffect, useState } from 'react'
import Nav from './Nav';

const Home = () => {
  //react hook for user db data
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Nav/>
      <div className="w-full h-[100vh] flex flex-wrap justify-between p-10 mt-10">
        {courses.map((c, idx) => {
          return (
            <div
              key={idx}
              className="w-[30%] h-[25vh] border-solid border-2
              border-black-600 flex items-center justify-center">
              <p>{c.CourseName}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home
