import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";

import { toast } from "react-toastify";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "../../styles/styles";
import CarouselCard from "./CarouselCard";
import CustomModal from "../CustomModal";

const CreateCarouselPage = () => {
  const [open, setOpen] = useState(false);
  const [carouselData, setCarouselData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const fetchCarouselData = async () => {
    try {
      const response = await axios.get(`${server}/carousel/get-carousel`);
      setCarouselData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateCarousel = async () => {
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", image);
      const response = await axios.post(
        `${server}/carousel/carousel`,
        formData
      );

      // Get the ID of the created category
      const categoryId = response.data._id;

      toast.success("Carousel created!");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${server}/carousel/carousel/${itemId}`);
      toast.success("Carousel item deleted successfully");
      fetchCarouselData(); // Fetch the updated carousel data
    } catch (error) {
      toast.error("Failed to delete carousel item");
    }
  };

  return (
    <>
      <div className="w-full px-5">
        {open && (
          <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
            <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
              <div className="w-full flex justify-end p-3">
                <RiCloseLine
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Add Image To Carousel
              </h1>
              <div className="w-full">
                <form
                  aria-required
                  onSubmit={handleCreateCarousel}
                  className="w-full"
                >
                  <div className="w-full block p-4">
                    <div className="w-full pb-2">
                      <label className="pb-2">Name:</label>
                      <input
                        type="text"
                        name="text"
                        onChange={(e) => setCaption(e.target.value)}
                        value={caption}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter carousel details"
                        required
                      />
                      <br />
                    </div>
                    <div className="w-full pb-4">
                      <label className="block pb-2 text-lg font-semibold">
                        Upload Image <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center">
                        <label htmlFor="upload" className="cursor-pointer">
                          <AiOutlinePlusCircle size={40} color="#555" />
                        </label>
                        <input
                          type="file"
                          className="hidden"
                          id="upload"
                          required
                          name=""
                          onChange={handleImageChange}
                        />
                        {/* Image preview */}
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="ml-4 h-24 w-24 object-cover rounded-md"
                          />
                        )}
                      </div>
                    </div>
                    <div className=" w-full pb-2">
                      <input
                        type="submit"
                        value="Create Category"
                        className={`${styles.input} mt-5 cursor-pointer`}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
            onClick={() => setOpen(true)}
          >
            Add Image To Carousel
          </button>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-xl font-semibold">Carousel Images</h2>
            <div className="mt-4 overflow-x-auto">
              <div className="flex flex-nowrap">
                {carouselData.map((i) => (
                  <div key={i._id} className="mr-4 mb-4">
                    {modalOpen && (
                      <CustomModal
                        message={
                          "Are you sure you want to delete this Carousel?"
                        }
                        ok={" Yes, I'm sure"}
                        cancel={"No, cancel"}
                        setModalOpen={setModalOpen}
                        performAction={() => handleDelete(i._id)}
                        closeModel={() => setModalOpen(false)}
                      />
                    )}
                    <CarouselCard
                      image={i.image}
                      caption={i.caption}
                      handleDelete={() => setModalOpen(true)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateCarouselPage;
