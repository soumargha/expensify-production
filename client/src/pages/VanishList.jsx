import { AnimatePresence, useAnimate, usePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiClock, FiPlus, FiTrash2 } from "react-icons/fi";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";
import bars from "../images/bars.png";

export const VanishList = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Take out trash",
      checked: false,
      time: "5 mins",
    },
    {
      id: 2,
      text: "Do laundry",
      checked: false,
      time: "10 mins",
    },
    {
      id: 3,
      text: "Have existential crisis",
      checked: true,
      time: "12 hrs",
    },
    {
      id: 4,
      text: "Get dog food",
      checked: false,
      time: "1 hrs",
    },
  ]);

  const handleCheck = (id) => {
    setTodos((pv) =>
      pv.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const removeElement = (id) => {
    setTodos((pv) => pv.filter((t) => t.id !== id));
  };

  return (
    
    <section
      className="relative min-h-screen bg-zinc-950 py-24 overflow-hidden"
      style={{
        
      }}
    >
      
<h1 class="text-center mt-[-4rem] mb-20 text-3xl font-extrabold text-gray-300  md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Have a glimpse</span> of what's going on.</h1>


      {/* Stars Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
      

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - To-Do List */}
          <div>
            <Header />
            <Todos
              removeElement={removeElement}
              todos={todos}
              handleCheck={handleCheck}
            />
            <Form setTodos={setTodos} />
          </div>

          {/* Right Side - Hero Section */}
          <div className="hidden lg:flex justify-center items-center bg-zinc-900 rounded-lg p-6 mt-8">
            <div className="text-center">
              <img src={bars} alt="Placeholder" className="rounded-lg" />
              <h2 className="mt-4 text-white text-2xl font-medium">
                See your data
              </h2>
              <p className="text-zinc-400 mt-2">
                being converted to visualization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Header = () => {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-medium text-white">Good morning! ☀️</h1>
      <p className="text-zinc-400">Let's see what we've got to do today.</p>
    </div>
  );
};

const Form = ({ setTodos }) => {
  const [time, setTime] = useState(15);
  const [text, setText] = useState("");
  const [unit, setUnit] = useState("mins");

  const handleSubmit = () => {
    if (!text.length) {
      return;
    }

    setTodos((pv) => [
      {
        id: Math.random(),
        text,
        checked: false,
        time: `${time} ${unit}`,
      },
      ...pv,
    ]);

    setTime(15);
    setText("");
    setUnit("mins");
  };

  return (
    <div className="bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
      <div className="flex flex-wrap gap-2 mt-5 ml-72">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border-white rounded bg-zinc-800 text-white"
          placeholder="Add a new task..."
        />
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-20 p-2 border-white rounded bg-zinc-800 text-white"
          placeholder="Time"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-24 p-2 border-white rounded bg-zinc-800 text-white"
        >
          <option value="mins">mins</option>
          <option value="hrs">hrs</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

const Todos = ({ todos, handleCheck, removeElement }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation once when the section comes into view
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each item animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 }, // Start off-screen to the left
    visible: { opacity: 1, x: 0 }, // Animate into view
  };

  return (
    <motion.div
      ref={ref}
      className="w-full space-y-3"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // Trigger animation when in view
    >
      {todos.map((t) => (
        <motion.div key={t.id} variants={itemVariants}>
          <Todo
            handleCheck={handleCheck}
            removeElement={removeElement}
            id={t.id}
            checked={t.checked}
            time={t.time}
          >
            {t.text}
          </Todo>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Todo = ({ removeElement, handleCheck, id, children, checked, time }) => {
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          "p",
          {
            color: checked ? "#6ee7b7" : "#fca5a5",
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );
        await animate(
          scope.current,
          {
            scale: 1.025,
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: checked ? 24 : -24,
          },
          {
            delay: 0.75,
          }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={scope}
      layout
      className="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCheck(id)}
        className="size-4 accent-indigo-400"
      />

      <p
        className={`text-white transition-colors ${checked && "text-zinc-400"}`}
      >
        {children}
      </p>
      <div className="ml-auto flex gap-1.5">
        <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
          <FiClock />
          <span>{time}</span>
        </div>
        <button
          onClick={() => removeElement(id)}
          className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};
