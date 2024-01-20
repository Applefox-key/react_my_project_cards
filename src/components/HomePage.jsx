import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const router = useNavigate();
  const toLogin = () => {
    router("/login");
  };
  return (
    <div>
      {" "}
      <br />
      <div className="main_container home-page">
        {" "}
        <div className="home-text">
          <span>
            WELCOME TO FLASHMINDS – YOUR GATEWAY TO EFFORTLESS LEARNING!
          </span>
          <p>
            Unlock the power of your mind with our innovative digital platform
            designed to enhance your learning experience through the art of
            flashcards. At FlashMinds, we believe in the simplicity and
            effectiveness of flashcards to help you retain knowledge and
            accelerate your learning journey.
          </p>{" "}
          <span className="secondS">Why Choose FlashMinds?</span>
          <p>
            <ul>
              <li>
                <span>Efficient Learning:</span> Our platform is crafted to make
                learning efficient and enjoyable. Experience a seamless
                memorization process that fits into your busy lifestyle.
              </li>
              <li>
                {" "}
                <span>Personalized Learning:</span> Tailor your learning
                experience by creating and customizing your own flashcards.
                Whether you're studying for exams, learning a new language, or
                mastering a skill, FlashMinds adapts to your unique needs.
              </li>
              <li>
                <span>Learn from Mistakes:</span> Mistakes are an integral part
                of the learning process. Our platform encourages a growth
                mindset by allowing you to analyze your mistakes and learn from
                them. Easily review flashcards you're confused on, turning
                mistakes into valuable learning opportunities.
              </li>
            </ul>
          </p>
        </div>
        <div className="color-boxes">
          {/* <div className="position-reletive"> */}
          <div className="green">SUCCEED!!!</div>
          <div className="blue">Learn</div>
          <div className="orange">Grow</div>{" "}
          <div className="yellow" onClick={toLogin}>
            Let's get to know each other better!
          </div>
          {/* </div> */}
        </div>
      </div>
      <div className="w-10">{/* <Logo /> */}</div>
    </div>
  );
};

export default HomePage;
