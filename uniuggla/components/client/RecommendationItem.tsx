// generatedRecommended.tsx
import React from "react";

const RecommendedItme: React.FC = () => {


  return (
    <div className="recommendedBox INFORMATIONSTEKNIKKungligaTekniskaHögskolan">
      <div className="recommendedHead">
        <p className="tilteReq">INFORMATIONSTEKNIK, CIVILINGENJÖR</p>
        <p className="schoolReq descriptionReq"> LÄROSÄTE: Kungliga Tekniska Högskolan</p>
        <p className="degreeReq descriptionReq">EXAMEN: Civilingenjör</p>
        <p className="pointsReq descriptionReq">POÄNG: 300 hp</p>
        <p className="yearsReq descriptionReq">ANTAL ÅR: 5</p>
        <button className="showDescription">
          <img className="expandArrow" src="../../arrow.svg" alt="" />
          <p>Visa beskriving</p>
        </button>
      </div>
      <div className="recommendedDescription"></div>
    </div>
  );
};

export default RecommendedItme;
