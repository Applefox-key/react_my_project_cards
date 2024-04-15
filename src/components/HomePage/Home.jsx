import React from "react";
import cl from "./home.module.scss";
import choice from "../../img/lady.png";
import { Image } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const router = useNavigate();
  const toLogin = () => {
    router("/login");
  };
  return (
    <div className={cl["home-wrap"]}>
      <div className={cl["greeting"]}>
        <h1> Welcome to flashminds – your gateway to effortless learning!</h1>
        <h3>Unlock the power of your mind</h3>
        <ul>
          <li>
            <span>
              <FaCheckCircle /> Efficient Learning:
            </span>
            <p>
              learn efficient and enjoyable. Experience a seamless memorization
              process that fits into your busy lifestyle.
            </p>
          </li>
          <li>
            <span>
              <FaCheckCircle />
              Personalized Learning:
            </span>
            <p>
              tailor your learning experience by creating and customizing your
              own flashcards.
            </p>
          </li>
          <li>
            <span>
              <FaCheckCircle />
              Learn from Mistakes:
            </span>
            <p>
              easily review flashcards you're confused on, turning mistakes into
              valuable learning opportunities.
            </p>
          </li>
        </ul>
      </div>
      <div className={cl.imghome}>
        <div className={cl.lables}>
          <div className={cl.yellow} onClick={toLogin}>
            Let's get to know each other better!
          </div>
          <div className={cl.blue}>Learn</div>
          <div className={cl.orange}>Grow</div>
          <div className={cl.green}>Succeed!</div>
        </div>
        <Image src={choice} /> <div></div>
      </div>
    </div>
  );
};

export default Home;
