const Whatsapp = () => {
  return (
    <div className="whatsapp-button">
      <a
        href="https://api.whatsapp.com/send/?phone=13232504601&text&type=phone_number&app_absent=0"
        target="_blank"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png"
          alt="WhatsApp"
          width="50px"
        />
      </a>
    </div>
  );
};

export default Whatsapp;
