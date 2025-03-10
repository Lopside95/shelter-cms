import { AnimatePresence, motion, useAnimationControls } from "framer";

const AnimatedCircle = () => {
  return (
    // <div className="w-92 h-92 flex items-center justify-center">
    <motion.div
      animate={{
        // scale: [1, 0.5, 1],
        height: ["14rem", "0", "14rem"],
        transition: { duration: 1, ease: "easeInOut" },
        // transition: { duration: 1, ease: "easeInOut", repeat: Infinity },

        // transform: ["scale(1)", "scale(0.5)", "scale(1)"],
      }}
      className="w-[26rem] rounded-[50%] border-4  border-black flex items-center justify-center"
    >
      <motion.div
        animate={{
          // scale: [1, 0.5, 1],
          // opacity: [1, 0, 1],

          height: ["10rem", "0%", "10rem"],
          transition: { duration: 1, ease: "easeInOut" },
          // transition: { duration: 1, ease: "easeInOut", repeat: Infinity },

          // transform: ["scale(1)", "scale(0.5)", "scale(1)"],
        }}
        className="w- h-40 bg-black rounded-"
      />
    </motion.div>
    // </div>
  );
};

export default AnimatedCircle;
