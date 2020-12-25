import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeeCardList = (props) => {
  let allEmployee = props.employee;
  let EmployeeCardList = [];
  for (let i = 0; i < allEmployee.length; i += 3) {
    let EmployeeCards = allEmployee
      .slice(i, Math.min(i + 3, allEmployee.length))
      .map((p) => (
        <EmployeeCard
            key={p._id}
            id={p._id}
            name={p.name}
            email={p.email}
            photo={p.photo}
            mobile_no={p.mobile_no}
            adhar_card={p.adhar_card}
        />
      ));
    let cardDeck = (
      <div key={i} className="card-deck space-top">
        {EmployeeCards}
      </div>
    );
    EmployeeCardList.push(cardDeck);
  }
  return (
    <div className="container-fluid">
      <div className="cardparent">{EmployeeCardList}</div>
    </div>
  );
};
export default EmployeeCardList;