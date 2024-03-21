const PosterImage = () => {
  const imgurl =
    "https://cdn.imweb.me/upload/S20200106a105fd03f4b57/40ff2b61f79dc.jpg";

  return (
    <div className="relative flex justify-center w-full h-myVh">
      <div
        className="flex justify-center w-full overflow-hidden opacity-30"
        style={{
          backgroundImage: `url(${imgurl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
        }}
      ></div>
      <div className="absolute flex justify-center overflow-hidden w-myVw h-myVh">
        <img className="object-cover h-full" src={imgurl} />
      </div>
    </div>
  );
};

export default PosterImage;
