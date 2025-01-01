import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const API_KEY = 'AIzaSyC1lTT_RGPic5Br-cJU0FVrV3LwnS4pQTE';
  const SHEET_ID = '1dG0_jHTfJEvbX89u3-f7fujL50ozmLd3KRAuzD0CsHU';
  const SHEET_NAME = 'Gallery';


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const result = await response.json();
        const rows = result.values.slice(1); // Exclude header row
        const formattedAlbums = rows.reduce((acc, row) => {
          const [albumTitle, image, description] = row;
          if (!acc[albumTitle]) {
            acc[albumTitle] = { title: albumTitle, images: [] };
          }
          acc[albumTitle].images.push({ image, description });
          return acc;
        }, {});
        setAlbums(Object.values(formattedAlbums));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openAlbum = (album) => {
    setActiveAlbum(album);
  };

  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const generateCollage = (images) => {
    const collageImages = images.slice(0, 4); // Select up to 4 images
    return (
      <div className="grid grid-cols-2 grid-rows-2 w-80 h-80 rounded-lg overflow-hidden m-2">
        {collageImages.map((img, index) => (
          <img
            key={index}
            src={img.image}
            alt="Collage"
            className="w-full h-full object-cover"
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="py-10 bg-slate-50">
        <h2 className="font-lexend text-3xl text-center py-10 tracking-tight text-slate-900 sm:text-[40px]">
          Gallery
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-800"></div>
          </div>
        ) : activeAlbum ? (
          <div className="w-full px-10">
            <button
              className="text-gray-800 font-medium mb-4"
              onClick={() => setActiveAlbum(null)}
            >
              ← Back to Albums
            </button>
            <div className="flex justify-center items-center flex-wrap">
              {activeAlbum.images.map((img, index) => (
                <div
                  className="overflow-hidden relative max-w-none group block"
                  key={index}
                  onClick={() => openModal(img.image)}
                >
                  <img
                    src={img.image}
                    alt={img.description}
                    loading="lazy"
                    className="w-80 h-80 object-cover rounded-lg m-2 group-hover:brightness-[60%]"
                  />
                  <div className="text-center max-w-[90%] w-max items-center justify-center flex duration-100 ease-out opacity-0 left-1/2 translate-x-[-50%] bottom-2 px-3 py-2 z-10 font-medium text-xs uppercase bg-black text-white absolute translate-y-2 group-hover:opacity-100 group-hover:-translate-y-2">
                    {img.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="gallery-container w-full overflow-hidden px-10">
            <div className="flex justify-center items-center flex-wrap">
              {albums.map((album, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => openAlbum(album)}
                >
                  {generateCollage(album.images)}
                  <h3 className="text-center text-lg font-semibold mt-2">
                    {album.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-85 z-50 transition-opacity duration-200 ease-in-out"
          onClick={closeModal}
        >
          <div
            className="max-w-4xl bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={currentImage} alt="Large view" className="w-full rounded-lg" />
            <button
              className="absolute top-4 right-4 text-white text-4xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
