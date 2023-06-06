import React from "react";
import axios from "../../axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";
import { useAuth } from "../../context/Auth";
export default function RegisterModal(props) {
  const { registerModal, setRegisterModal, setLoginModal } = props;
  const auth = useAuth();
  const validate = (values) => {
    let errors = {};
    const { username, email, password, password_repeat } = values;
    if (!username) {
      errors.username = "Prašome užpildyti laukelį (Slapyvardis)";
    } else if (username.length < 2) {
      errors.username = "Slapyvardis turi būti min. 2 simbolių!";
    } else if (username.length > 15) {
      errors.username = "Slapyvardis turi būti max. 15 simbolių!";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(username)) {
      errors.username =
        "Slapyvardis turi būti sudarytas tik iš lotyniškų raidžių ir skaičių!";
    }
    if (!email) {
      errors.email = "Prašome užpildyti laukelį (El. paštas)";
    } else if (
      !/^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+)*@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9][a-zA-Z0-9\-]*)+$/.test(
        email
      )
    ) {
      errors.email = "Neteisingas El. pašto formatas";
    }
    if (!password) {
      errors.password = "Prašome užpildyti laukelį (Slaptažodis)";
    } else if (password.length < 7) {
      errors.password = "Slaptažodis turi būti min. 7 simbolių!";
    } else if (password.length > 50) {
      errors.password = "Slaptažodis turi būti max. 50 simbolių!";
    } else if (!/\d/.test(password)) {
      errors.password = "Slaptažodis turi turėti min. 1 skaičių";
    }
    if (!password_repeat) {
      errors.password_repeat =
        "Prašome užpildyti laukelį (Patvirtinti naują slaptažodį)";
    } else if (password_repeat !== password) {
      errors.password_repeat = "Slaptažodžiai nesutampa";
    }
    return errors;
  };

  const onSubmit = async (values) => {
    try {
      let { username, email, password, password_repeat } = values;
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        password_repeat,
      });
      formik.resetForm();
      auth.login(res.data.data);
      closeModal();
      toast.success("Paskyra sėkmingai sukurta");
    } catch (err) {
      toast.error(err.response.data.mess);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_repeat: "",
    },
    onSubmit,
    validate,
  });

  // Modal close on background click
  const modalOnMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  // Modal close
  const closeModal = () => {
    setRegisterModal(false);
  };
  return (
    <>
      {registerModal ? (
        <div className="modal-container" onMouseDown={modalOnMouseDown}>
          <div className="modal-inner">
            <div className="modal-content">
              <div className="modal-title-container">
                <h2 className="modal-title">Registracija</h2>
                <span className="modal-close-btn" onClick={() => closeModal()}>
                  <AiOutlineClose />
                </span>
              </div>
              <form
                noValidate
                className="sign-in-form"
                onSubmit={formik.handleSubmit}
              >
                <input
                  className={`input-user-img input-with-img ${
                    formik.touched.username && formik.errors.username
                      ? "error"
                      : ""
                  }`}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Slapyvardis"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="error-mess-box">
                    <AiFillWarning className="error-mess-icon" />
                    <span>{formik.errors.username}</span>
                  </div>
                ) : null}
                <input
                  className={`input-email-img input-with-img ${
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }`}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="El.paštas"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-mess-box">
                    <AiFillWarning className="error-mess-icon" />
                    <span>{formik.errors.email}</span>
                  </div>
                ) : null}
                <input
                  className={`input-pass-img input-with-img ${
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }`}
                  type="password"
                  name="password"
                  placeholder="Slaptažodis"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error-mess-box">
                    <AiFillWarning className="error-mess-icon" />
                    <span>{formik.errors.password}</span>
                  </div>
                ) : null}
                <input
                  className={`input-pass-img input-with-img ${
                    formik.touched.password_repeat &&
                    formik.errors.password_repeat
                      ? "error"
                      : ""
                  }`}
                  type="password"
                  name="password_repeat"
                  placeholder="Pakartokite slaptažodį"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_repeat}
                />
                {formik.touched.password_repeat &&
                formik.errors.password_repeat ? (
                  <div className="error-mess-box">
                    <AiFillWarning className="error-mess-icon" />
                    <span>{formik.errors.password_repeat}</span>
                  </div>
                ) : null}
                <button type="submit" className="btn-primary">
                  Užsiregistruoti
                </button>
              </form>
              <p className="modal-no-account">
                Jau turi paskyrą?
                <b>
                  <span
                    className="sign-up-in-span"
                    onClick={() => {
                      closeModal();
                      setLoginModal(true);
                    }}
                  >
                    Prisijungti
                  </span>
                </b>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
