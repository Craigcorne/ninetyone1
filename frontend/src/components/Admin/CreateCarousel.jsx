import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";

import { useFormik } from "formik";
import * as yup from "yup";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { RiCloseLine } from "react-icons/ri";
import styles from "../../styles/styles";
import CarouselCard from "./CarouselCard";

const carouselSchema = yup.object({
  imageUrl: yup.string().required("Image Url is required"),
  caption: yup.string().required("Caption is required"),
});

const CreateCarouselPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carouselData, setCarouselData] = useState([]);

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

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`${server}/carousel/carousel/${itemId}`);
      toast.success("Carousel item deleted successfully");
      fetchCarouselData(); // Fetch the updated carousel data
    } catch (error) {
      toast.error("Failed to delete carousel item");
    }
  };

  const formik = useFormik({
    initialValues: {
      imageUrl: "",
      caption: "",
    },
    validationSchema: carouselSchema,
    onSubmit: async (values, { resetForm }) => {
      const imageUrl = values.imageUrl;
      const caption = values.caption;

      setLoading(true);
      try {
        await axios.post(`${server}/carousel/carousel`, {
          imageUrl,
          caption,
        });
        setLoading(false);
        setSuccess(true);
        setError(false);
        toast.success("Carousel created successfully");
        setSuccessMessage("Carousel created successfully");
        fetchCarouselData(); // Fetch the updated carousel data

        // Reset the form after successful submission
        resetForm();
      } catch (error) {
        toast.error("Carousel creation failed");
        setLoading(false);
        setError(true);
        setSuccess(false);
        setErrorMessage("Carousel creation failed");
      }
    },
  });

  return (
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
              <form onSubmit={formik.handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="pb-2">Image URL:</label>
                    <input
                      type="text"
                      id="imageUrl"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.imageUrl}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                    <br />
                  </div>
                  <div className="w-full pb-4">
                    <label className="pb-2">Caption:</label>
                    <input
                      type="text"
                      id="caption"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.caption}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                    <br />
                    <div className="text-red-500 text-xs">
                      {formik.touched.caption && formik.errors.caption}
                    </div>
                  </div>

                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      value="Create"
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
              {carouselData.map((carouselItem) => (
                <div key={carouselItem._id} className="mr-4 mb-4">
                  <CarouselCard
                    imageUrl={carouselItem.imageUrl}
                    caption={carouselItem.caption}
                    handleDelete={() => handleDelete(carouselItem._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCarouselPage;
