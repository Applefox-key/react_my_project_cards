import React from "react";
import MyCardMini from "../UI/CARDS/MyCardMini";
import cl from "./login.module.css";
const AboutBox = () => {
  const a0 = `This site for memorizing information using flashcards is a digital
    platform designed to help users retain knowledge more efficiently
    through the use of flash cards.`;
  const a1 = ` The site allows users to create, share, and study custom
    flashcards to aid in the memorization of information.`;
  const a2 = `  Upon signing up, users can create their own flashcards by
    inputting text for the front and back of each card.`;
  const a3 = `    Once users have created their flashcards, they can review and
    study them in a variety of ways.`;
  return (
    <div className={cl["info-box"]}>
      <h1
        className="display-1"
        style={{ fontFamily: "cursive", fontWeight: "bold" }}>
        {" "}
        FLASH CARDS
      </h1>
      <h1 className="display-1">YOUR EFFECTIVE TEACHING ASSISTANT</h1>
      <div
        className={
          "display-6 ms-5 mt-5 d-flex justify-content-center " + cl.infoCards
        }>
        <div>
          <MyCardMini
            item={{
              answer: a0,
              question: a0,
              note: "",
            }}
          />{" "}
          <MyCardMini
            item={{
              answer: a1,
              question: a1,
              note: "",
            }}
          />{" "}
        </div>
        <div className="ms-3">
          <MyCardMini
            item={{
              answer: a2,
              question: a2,
              note: "",
            }}
          />{" "}
          <MyCardMini
            item={{
              answer: a3,
              question: a3,
              note: "",
            }}
          />
        </div>{" "}
      </div>
    </div>
  );
};

export default AboutBox;
