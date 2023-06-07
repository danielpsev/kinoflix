import React from "react";
import axios from "../../axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";

interface IPropsLoginModal{
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterModal: React.Dispatch<React.SetStateAction<boolean>>
}
interface IErrorsValues{
  username ?: string,
  password ?: string
}
interface ISubmitLoginValues{
  username : string;
  password : string;
}
const LoginModal : React.FC<IPropsLoginModal> = (props) =>{
  const { loginModal, setLoginModal, setRegisterModal } = props;
  // const auth = useAuth();
  const auth = useAuth() || { user: null, login: (data : object) => {} };
  const validate = (values : IErrorsValues) => {
    let errors : IErrorsValues= {};
    const { username, password } = values;
    if (!username) {
      errors.username = "Prašome užpildyti laukelį (Slapyvardis)";
    }
    if (!password) {
      errors.password = "Prašome užpildyti laukelį (Slaptažodis)";
    }
    return errors;
  };

  const onSubmit = async (values : ISubmitLoginValues) => {
    try {
      let { username, password } = values;
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      formik.resetForm();
      auth.login(res.data.data);
      closeModal();
      toast.success("Sėkmingai prisijungei");
    } catch (err : any) {
      toast.error(err.response.data.mess);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
    validate,
  });



  // Modal close on background click
  const modalOnMouseDown = (e : React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  // Modal close
  const closeModal = () => {
    setLoginModal(false);
  };

  return (
    <>
      {loginModal ? (
        <div className="modal-container" onMouseDown={modalOnMouseDown}>
          <div className="modal-inner">
            <div className="modal-content">
              <div className="modal-title-container">
                <h2 className="modal-title">Prisijungimas</h2>
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
                <button type="submit" className="btn-primary">
                  Prisijungti
                </button>
              </form>
              <p className="modal-no-account">
                Dar neturi paskyros?
                <b>
                  {" "}
                  <span
                    className="sign-up-in-span"
                    onClick={() => {
                      closeModal();
                      setRegisterModal(true);
                    }}
                  >
                    Registracija
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

export default LoginModal;