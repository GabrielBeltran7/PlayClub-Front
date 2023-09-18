import style from "./Register.module.css";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useDispatch } from "react-redux";
import { postUser } from "../../Redux/Actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    imagen: "https://cdn-icons-png.flaticon.com/128/213/213923.png",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeimage = (info) => {
    console.log("infoooo handlechangeimage", info);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // console.log("respuesta cloudinary", info.file.response);
      console.log("respuesta cloudinary", info.file.originFileObj);
      // Get this url from response in real world.
      const imageUrl = info.file.response.secure_url; // Utiliza "secure_url" para obtener la URL de la imagen desde la respuesta de Cloudinary
      // Actualiza el estado con la URL de la imagen
      setImageUrl(imageUrl);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(postUser(usuario));
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Bienvenido a WIN123...",
          text: `Registro completado logueate`,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log("errrrrrr", error);
      if (error) {
        const errorAviso = error.response.data.error;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorAviso,
          timerProgressBar: true,
          timer: 5000,
        });
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.registrate}>
        <h1 className={style.title}>
          Registrate en <span className={style.span}>WIN123</span>
        </h1>
        <p>
          Ya tienes cuenta? <a href="/login">Ingresar</a>
        </p>
      </div>
      <div className={style.containerForm}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/account_hjcmcp.png"
              alt=""
              width="25"
            />
            <input
              type="text"
              placeholder=" Usuario"
              name="username"
              onChange={handleChange}
            />
          </div>{" "}
          <br />
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/arroba_rzzcre.png"
              alt=""
              width="25"
            />
            <input
              type="mail"
              placeholder=" Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/secured-lock_slyfz7.png"
              alt=""
              width="25"
            />
            <input
              type="password"
              placeholder=" Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://api.cloudinary.com/v1_1/dou3yyisb/image/upload?upload_preset=Playclub"
            beforeUpload={beforeUpload}
            onChange={handleChangeimage}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <br />
          <div className={style.termCondic}>
            <input type="checkbox" />
            <p>
              Yo estoy de acuerdo con los <a href="">terminos y condiciones</a>
            </p>
          </div>
          <button className={style.button}>Registrate</button>
        </form>
        <div className={style.logo}>
          <img
            src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

{
  /* <div className={style.registerContainer}>
  <div className={style.formContainer}>
    <div className={style.pruebaCont}>
      <div className={style.prueba2}>
        <div className={style.registrate}>
          <h1 className={style.title}>Registrate en PLAYCLUB</h1>
          <p>
            Ya tienes cuenta? <a href="/login">Ingresar</a>
          </p>
        </div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/account_hjcmcp.png"
              alt=""
              width="25"
            />
            <input
              type="text"
              placeholder=" Usuario"
              name="username"
              onChange={handleChange}
            />
          </div>{" "}
          <br />
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/arroba_rzzcre.png"
              alt=""
              width="25"
            />
            <input
              type="mail"
              placeholder=" Email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className={style.campoForm}>
            <img
              src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694446492/PlayGame/secured-lock_slyfz7.png"
              alt=""
              width="25"
            />
            <input
              type="password"
              placeholder=" Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://api.cloudinary.com/v1_1/dou3yyisb/image/upload?upload_preset=Playclub"
            beforeUpload={beforeUpload}
            onChange={handleChangeimage}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <br />
          <div className={style.termCondic}>
            <input type="checkbox" />
            <p>
              Yo estoy de acuerdo con los <a href="">terminos y condiciones</a>
            </p>
          </div>
          <button className={style.button}>Registrate</button>
        </form>
      </div>
      <div className={style.logo}>
        <img
          src="https://res.cloudinary.com/dou3yyisb/image/upload/v1694444797/PlayGame/logo-removebg_haqooq.png"
          alt=""
        />
      </div>
    </div>
  </div>
</div>; */
}
