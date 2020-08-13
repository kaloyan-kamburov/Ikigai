import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <>
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <h1>Realise your reason for being.</h1>
          </div>
          <div className="section-body">
            <div className="section-btn">
              <button
                className="btn-lg"
                onClick={() => history.push("/what-you-love")}
              >
                Start here
              </button>
            </div>
            <div className="section-content">
              <h3>We will help you find a purpose you strongly believe in.</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-section">
        <div className="shell">
          <aside className="aside">
            <div className="aside-head">
              <h2>What is Ikigai?</h2>
            </div>
            <div className="aside-content">
              <p>
                Ikigai is a Japanese concept that means “a reason for being”.
                The word refers to having a direction or purpose in life, that
                which makes one’s life worthwhile. By discovering your Ikigai
                you can focus on the things that matter most, get satisfaction
                from your routine and a sense of meaning to your life.
              </p>
              <p>
                Is Ikigai for you? Absolutely. It can be a great tool in many
                stages of your personal and professional life.
              </p>
              <ul className="aside-list">
                <li>You don’t know what is the right career for you</li>
                <li>
                  You are stuck between jobs and look for something different
                </li>
                <li>Life has lost meaning and everyday is exactly the same</li>
              </ul>
            </div>
            <div className="aside-head">
              <h2>How it works</h2>
            </div>
            <div className="aside-content">
              <p>
                When we look for our ikigai, we can ask ourselves four questions
                and narrow down what we love to do, what we’re good at and how
                we can impact the world around us. By going through a short
                questionnaire you will find your Ikigai - it lies in the
                intersection where your passion, mission, vocation and
                profession meet.
              </p>
            </div>
            <div className="aside-foot">
              <button
                className="btn-small"
                onClick={() => history.push("/what-are-you-good-at")}
              >
                Start here
              </button>
              <button className="btn-viewExamples">View examples</button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Home;
