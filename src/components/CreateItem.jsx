import React from "react";
import { useState } from "react";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import Loader from "./Loader";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firbase.config";
import { saveItem } from "../utils/firebaseFunctions";
import { useEffect } from "react";

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [imageAsset, setImageAsset] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState();

  const validate = () => {
    return title.length && price.length;
  };

  const uploadImage = () => {
    setIsLoading(true);
    const imageFile = selectedImg;
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      `state_changed`,
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(uploadProgress));
      },
      (error) => {
        console.log(error);
        setAlert(true);
        setMsg("Error while uploading : Try AGain");
        setAlertStatus("danger");
        setTimeout(() => {
          setAlert(false);
          setIsLoading(false);
        }, 2000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setAlert(true);
          setMsg("Image uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setAlert(false);
          }, 2000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    setSelectedImg(null);
    setIsLoading(false);
  };

  const saveDetails = () => {
    setIsLoading(true);
    uploadImage();
  };

  useEffect(() => {
    if (!imageAsset) {
      return;
    } else {
      try {
        if (!title || !calories || !selectedImg || !price || !category) {
          setAlert(true);
          setMsg("Required fields can't be empty");
          setAlertStatus("danger");
          setTimeout(() => {
            setAlert(false);
            setIsLoading(false);
          }, 2000);
        } else {
          setIsLoading(true);
          const data = {
            id: `${Date.now()}`,
            title: title,
            imageURL: imageAsset,
            category: category,
            calories: calories,
            qty: 1,
            price: price,
          };
          saveItem(data);
          setIsLoading(false);
          setAlert(true);
          setMsg("Data Uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            window.location.reload();
            setAlert(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        setAlert(true);
        setMsg("Error while uploading : Try AGain");
        setAlertStatus("danger");
        setTimeout(() => {
          setAlert(false);
          setIsLoading(false);
        }, 2000);
      }
    }
  }, [imageAsset]);

  const handleDrop = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item) => {
        // If dropped items aren't files, reject them
        if (
          (item.kind === "file" && item.type == "image/png") ||
          item.type == "image/jpg" ||
          item.type == "image/svg" ||
          item.type == "image/jpeg"
        ) {
          const file = item.getAsFile();
          setSelectedImg(file);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...ev.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <form className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {alert && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        {/* title */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        {/* category */}
        <div className="w-full">
          <select
            name="category"
            id="category"
            required
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="outline-none w-full text-base border-b-2 border-gray-200 rounded-md cursor-pointer p-2"
          >
            <option value="" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {/* upload image */}
        <div
          className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            handleDrop(e);
          }}
        >
          {isLoading ? (
            <div className="w-full text-center">
              <Loader />
              <div className="p-5 text-center">
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-cartNumBg text-xs font-medium text-blue-100 p-0.5 leading-none rounded-full"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progress + "%" }}
                  >
                    {progress}%
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {!selectedImg ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                        Click here to upload
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={(e) => {
                        setSelectedImg(e.target.files[0]);
                      }}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={URL.createObjectURL(selectedImg)}
                      alt={selectedImg.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          {/* calories */}
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          {/* price */}
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        {/* button */}
        <div className="flex items-center w-full">
          <button
            type="button"
            disabled={!validate()}
            className="disabled:opacity-40 ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
