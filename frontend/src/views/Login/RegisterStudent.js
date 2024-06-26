import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const RegisterStudent = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setname] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState("student");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      email == null ||
      password == null ||
      name == null ||
      phone == null ||
      role == null
    ) {
      swal.fire({
        title: "Oops!",
        text: "There are empty feilds",
        icon: "error",
      });
      return;
    } else if (!re.test(email)) {
      swal.fire({
        title: "Oops!",
        text: "Invalid Email",
        icon: "error",
      });
      return;
    } else {
      const registerDto = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: role,
      };

      try {
        const response = await axios.post(
          `http://localhost:4000/api/userSevice/users/register`,
          registerDto
        );

        console.log(response);

        if (response.status == 201) {
          swal.fire({
            title: "Good job!",
            text: "User Registered Successfully!",
            icon: "success",
          }).then(()=>{
            sendEmail()
          })
          console.log(response);
          navigate("/Login");
        } else {
          throw new error("Login error");
        }
      } catch (error) {
        setError(error.response?.data.message);
        console.error(error);
      }
    }
  };

  const sendEmail = () => {

    emailjs
      .send(
        "service_pg5ngyf",
        "template_fdvz8jd",
        {
          to_name: name,
          from_name: "Easy learn",
          message:"You have successfully created your account.",
          to_email: "tharindunethmal@gmail.com",
        },

        "YZdoo0Nr0so-f-j-Y"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="home">
      <section className="">
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="p-10 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register New student
          </h1>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="0123456789"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-800 dark:focus:ring-primary-800 "
                  onClick={handleSubmit}
                >
                  Sign in
                </button>
                {error && <div className="error">{error}</div>}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account{"   "}
                  <a
                    href="/Login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterStudent;
