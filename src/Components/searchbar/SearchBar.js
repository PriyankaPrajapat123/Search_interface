
import React, { useState, useEffect, useRef } from "react";
import data from "../../data/sampleData.json";
import "./searchbar.css";
import Suggestions from "../suggestion/Suggestions";
import heart from "../../images/loading.gif";
import Footer from "../footer/Footer"
import { ShimmerThumbnail, ShimmerText } from "react-shimmer-effects";
import searctButton from "../../images/search_icon.gif";
import Sidebar from "../sidebar/Sidebar"; // Import Sidebar component
import FeedbackPopup from "../feedback/FeedbackPopup";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [randomAnswer, setRandomAnswer] = useState(null);
  const [expandedAnswers, setExpandedAnswers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [relatedQuestion, setRelatedQuestion] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]); // State to store search history

  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(null); // Store submitted feedback
  // Other states...

  const handleFeedbackSubmit = (feedback) => {
    if (feedback.trim()) {
      setSubmittedFeedback(feedback);
      console.log("Feedback submitted:", feedback);
      setShowFeedbackPopup(false); // Close the popup after submission
    }
  };

  useEffect(() => {
    if (relatedQuestion) {
      console.log(relatedQuestion.answers, "Updated state");
    }
  }, [relatedQuestion]);

  const handleRelatedQuestion = (questionData) => {
    setQuery(questionData.input);
    setRelatedQuestion(questionData);
    setRandomAnswer(questionData.answers[0]);
  };

  const handleSearch = () => {
    if (!query.trim()) return; // Do nothing if the query is empty or contains only spaces

    setLoading(true);
    const matchedObject = data.find(
      (item) => item.input.toLowerCase() === query.toLowerCase()
    );

    setTimeout(() => {
      if (matchedObject) {
        setSelectedObject(matchedObject);
        const randomIndex = Math.floor(Math.random() * matchedObject.answers.length);
        setRandomAnswer(matchedObject.answers[randomIndex]);
      } else {
        setSelectedObject(null);
        setRandomAnswer(null);
      }

      setLoading(false);
      setShowSuggestions(false);
      setExpandedAnswers(true);
      setSearchHistory((prevHistory) => [...prevHistory, query]); // Add the search query to history
    }, 3000); // Simulating API call with a delay
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleButtonClick = () => {
    handleSearch();
  };

  const handleSuggestionClick = (input) => {
    setQuery(input);
    setShowSuggestions(false);
  };

  const filteredSuggestions = data.filter((item) => {
    const searchTerm = query.toLowerCase();
    const input = item.input.toLowerCase();
    return searchTerm && input.includes(searchTerm); 
  });

const formatAnswer = (text) => {
  return text
    .replace(/\n/g, "<br>") // Replace \n with <br>
    .replace(/\(([^)]+)\)/g, "<strong>$1</strong>"); // Wrap text inside parentheses with <strong>
};

  return (
    <>      {/* Sidebar Component */}
    <Sidebar searchHistory={searchHistory} />

    <div className="searchBarContent">
      <h1 className="typewriter-animation ">What can I help with?</h1>
      <div className="searchBar">
        <div className="searchButton">
          <input
            type="text"
            placeholder="What do you want to know?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setSelectedObject(null);
              setRandomAnswer(null);
            }}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleButtonClick}>
            <img src={searctButton} width={30} />
          </button>
        </div>
        {loading && <div className="heartImg"><img src={heart} alt="Loading..." /></div>}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="suggestions-list">
            {filteredSuggestions.map((item, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(item.input)}
              >
                {item.input}
              </div>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <ShimmerText line={5} gap={10} />
      ) : (
        selectedObject && randomAnswer && (
          <div className="answer-section">
            <h3>Your Search Result:</h3>
            
            <div className=" ">
            {/* <p
      dangerouslySetInnerHTML={{
        __html: `${formatAnswer(randomAnswer.answer)} <a href="${randomAnswer.context[0].metadata.source}" class="sourceLink">Source</a>`
      }}
    /> */}
     <div className="resultPara">
    <p
      dangerouslySetInnerHTML={{
        __html: formatAnswer(randomAnswer.answer)
      }}
    />
   <div className="morelinks">
   <a href={randomAnswer.context[0].metadata.source} className="sourceLink">Source</a>
    <div className="feedback">
      <i className="fa-solid fa-thumbs-up"></i>
      <i 
        className="fa-solid fa-thumbs-down" 
        onClick={() => setShowFeedbackPopup(true)}
      ></i>
    </div>
   </div>
  </div>
              {/* <p  >{randomAnswer.answer}
                 <a src={randomAnswer.context[0].metadata.source} className="sourceLink">Source</a>
              </p> */}
              {/* <div className="feedback"><i class="fa-solid fa-thumbs-up"></i> <i
                  className="fa-solid fa-thumbs-down"
                  onClick={() => setShowFeedbackPopup(true)}
                ></i></div> */}
            </div>
          </div>
        )
      )}

      {expandedAnswers && selectedObject?.related_questions && (
        <div>
          {loading ? (
            Array(3).fill(null).map((_, index) => (
              
              <div key={index} disabled >
                <ShimmerThumbnail height={50} width={350} rounded />
              </div>
            ))
          ) : (
            <>
              <h3>You may also like Search</h3>
              <div className="suggestions">
                {selectedObject.related_questions.map((relatedQuestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleRelatedQuestion(relatedQuestion)}
                  >
                    <p className="related-question-item">{relatedQuestion.input}</p>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {!expandedAnswers && <Suggestions />}

      {selectedObject && !randomAnswer && (
        <div className="no-answer-found">
          <h2>No answer found for "{query}"</h2>
        </div>
      )}

<Footer/>
<FeedbackPopup
          isOpen={showFeedbackPopup}
          onClose={() => setShowFeedbackPopup(false)}
          onSubmitFeedback={handleFeedbackSubmit}
        />
    </div>
    </>
  );
}

export default SearchBar;
