import React from "react";
import pct from "../img/pngkey.png";
const About = () => {
  return (
    // <div className="d-flex mx-3">
    <div className="mx-4 mt-3">
      <img src={pct} className="aboutImg" alt="about" />
      <h1 className="display-5 text-center aboutH">One card - one fact!</h1>
      <p className="aboutP">
        Flash cards are the greate way to remember any information you want.
        It's a litle double-sided card on the one side of which is a question
        and on the other side is an answer.
      </p>
      <p className="aboutP">
        These can be words in another language, historical dates or definitions
        of terms. The main rool is one card - one short fact.
      </p>
      <p className="aboutP">
        {" "}
        Create your card's collection, test yourself with a shot games and train
        your brain!
      </p>
    </div>
    // </div>
  );
};

export default About;
