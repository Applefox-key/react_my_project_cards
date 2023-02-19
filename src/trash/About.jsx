import React from "react";
import pct from "../img/aboutimg.png";
import MyCardMini from "../components/UI/CARDS/MyCardMini";

const About = () => {
  const p0 = `Flash cards are the greate way to remember any information you want. `;
  const a0 = `Paper flashcards have been used since at least the 19th century.`;
  const p1 = `
  It's a litle double-sided card on the one side of which is a
  question and on the other side is an answer.`;
  const a1 = `Flashcard helps to move knowledge from your recent memory into your long-term memory.`;
  const p2 = ` These can be words in another language, historical dates or
  definitions of terms. The main rool is one card - one short fact.`;
  const a2 = ` Flashcard is one of the most effective ways to learn foreign language vocabulary.`;
  const p3 = ` Create your card's collection, test yourself with a shot games and
  train your brain!`;
  const a3 = `Sign up and get started!`;
  return (
    <div className="aboutpageImg">
      <div className="aboutcontent">
        <img src={pct} className="aboutImg" alt="about" />
        <h1 className="display-5 text-center aboutH">One card - one fact!</h1>
        <div className="d-flex flex-column">
          <MyCardMini
            item={{
              answer: a0,
              question: p0,
              note: "",
            }}
          />{" "}
          <MyCardMini
            item={{
              answer: a1,
              question: p1,
              note: "",
            }}
          />{" "}
          {/* </div>
        <div className="d-flex"> */}
          <MyCardMini
            item={{
              answer: a2,
              question: p2,
              note: "",
            }}
          />
          <MyCardMini
            item={{
              answer: a3,
              question: p3,
              note: "",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
