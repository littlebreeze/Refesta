const PosterImage = () => {
  const imgurl =
    "https://cdnticket.melon.co.kr/resource/image/upload/product/2024/01/202401251756175728e950-d021-46ae-9b3d-d48593846055.png/melon/resize/180x254/strip/true/quality/90/optimize";

  return (
    <div className="relative h-myVh w-full flex justify-center">
      <div
        className="w-full opacity-30 overflow-hidden flex justify-center"
        style={{
          backgroundImage: `url(${imgurl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
        }}
      ></div>
      <div className="absolute w-myVw h-myVh overflow-hidden flex justify-center">
        <img className="h-full object-cover" src={imgurl} />
      </div>
    </div>
  );
};

export default PosterImage;
