import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import cl from "../UI/CARDS/MyCard.module.scss";
import clA from "./aboutPage.module.scss";
import OneCardG from "../games/OneCardG";
import SpinnerLg from "../UI/SpinnerLg/SpinnerLg";
import { MdOutlineNavigateNext } from "react-icons/md";

const AboutGallery = () => {
  const arr = [
    {
      answer: `This site for memorizing information using flashcards is a digital
      platform designed to help users retain knowledge more efficiently
      through the use of flash cards.`,
      question: `What is this page for?`,
      note: "",
    },
    {
      answer: `The site allows users to create, share, and study custom
      flashcards to aid in the memorization of information.`,
      question: `What features does the user have?`,
      note: "",
    },
    {
      answer: `Upon signing up, users can create their own flashcards by
    inputting text for the front and back of each card. Once users have created their flashcards, they can review and
    study them in a variety of ways.`,
      question: `Why you should create an account?`,
      note: "",
    },
    {
      answer: `It's a litle double-sided card on the one side of which is a
      question and on the other side is an answer.`,
      question: `What is the flash card?`,
      note: "",
    },
    {
      answer: `Flash cards are the greate way to remember any information you want.
      Flash card helps to move knowledge from your recent memory into your long-term memory.`,
      question: `How this method works?`,
      note: "",
    },
    {
      answer: `These can be words in another language, historical dates or
      definitions of terms. The main rool is one card - one short fact.`,
      question: `What can be remembered with flash cards?`,
      note: "",
    },
    {
      answer: ` Create your card's collection, test yourself with a shot games and
      train your brain! Sign up and get started!`,
      question: `What should I do?`,
      note: "",
    },
  ];
  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState(arr);
  const [direction, setDirection] = useState(true);
  const [itemNum, setItemNum] = useState(0);
  const [anim, setShowAnim] = useState(false);

  const prew = () => {
    if (direction) setDirection(false);
    setShowAnim(!anim);
    const nextNum = itemNum + 1 === items.length ? 0 : itemNum + 1;
    setItemNum(nextNum);
  };

  return (
    <div className={clA["cardbox"]}>
      <div className={clA.yellow}>Let's get to know each other better!</div>{" "}
      {items ? (
        <CSSTransition
          appear={true}
          in={true}
          timeout={500}
          classNames="result">
          <div>
            <div className=" me-5 position-relative">
              {/* <AnimatedArrowBtn onClick={prew} />{" "} */}
              <button onClick={prew} className={clA["collect_button"]}>
                <MdOutlineNavigateNext />
              </button>
              <OneCardG
                anim={anim}
                direction={direction}
                twoDir={true}
                item={items[itemNum]}
                clgal={cl.container_galleryAbout}
              />{" "}
            </div>
          </div>
        </CSSTransition>
      ) : (
        <SpinnerLg />
      )}
    </div>
  );
};

export default AboutGallery;
