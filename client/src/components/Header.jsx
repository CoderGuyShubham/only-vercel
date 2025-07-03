import React, { useContext } from "react"
import { assets } from "../assets/assets"
import { motion } from "motion/react"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import InfiniteCarousel from "./InfiniteCarousel";

const Header = () => {

  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    }
    else {
      setShowLogin(true)
    }
  }

  const sampleImages = [
    assets.sample_img_1,
    assets.sample_img_2,
    assets.sample_img_3,
    assets.sample_img_4,
    assets.sample_img_5,
    assets.sample_img_6,
  ];

  return (
    <motion.div className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}>
        Turn text into <span className="text-blue-600">image</span>, in seconds.
      </motion.h1>
      <motion.p className="text-center max-w-xl mx-auto mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}>
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.
      </motion.p>
      <motion.button onClick={onClickHandler} className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}>
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>

      {/* <div className="mt-10 py-10 border-4 flex gap-5 justify-center overflow-hidden min-w-[100%]">
        <div className=" border-2 flex gap-5 animate-[slide_5s_infinite_linear]">
          <img className="w-20 rounded-md" src={assets.sample_img_1} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_2} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_3} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_4} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_5} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_6} alt="" />
        </div>
        <div className=" border-2 flex gap-5 animate-[slide_5s_infinite_linear]">
          <img className="w-20 rounded-md" src={assets.sample_img_1} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_2} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_3} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_4} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_5} alt="" />
          <img className="w-20 rounded-md" src={assets.sample_img_6} alt="" />
        </div>
      </div> */}

      {/* <div className="infinite-carousel">
        <div className="infinite-carousel-track">
          <img src={assets.sample_img_1} alt="sample 1" />
          <img src={assets.sample_img_2} alt="sample 2" />
          <img src={assets.sample_img_3} alt="sample 3" />
          <img src={assets.sample_img_4} alt="sample 4" />
          <img src={assets.sample_img_5} alt="sample 5" />
          <img src={assets.sample_img_6} alt="sample 6" />
          <img src={assets.sample_img_1} alt="sample 1 duplicate" />
          <img src={assets.sample_img_2} alt="sample 2 duplicate" />
          <img src={assets.sample_img_3} alt="sample 3 duplicate" />
          <img src={assets.sample_img_4} alt="sample 4 duplicate" />
          <img src={assets.sample_img_5} alt="sample 5 duplicate" />
          <img src={assets.sample_img_6} alt="sample 6 duplicate" />
        </div>
      </div> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }} className="mt-10 w-full max-w-xl">
        <InfiniteCarousel images={sampleImages} imageWidth={80} gap={20} speed={0.5} />
      </motion.div>

      {/* <motion.div className="flex flex-wrap justify-center mt-16 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}>
        {Array(6).fill('').map((item, index) => (
          <motion.img className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
            whileHover={{ scale: 1.05, duration: 0.1 }}
            src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} alt="" key={index} width={70} />
        ))}
      </motion.div> */}
      <motion.p className="mt-2 text-neutral-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}>
        Generated images from Imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
