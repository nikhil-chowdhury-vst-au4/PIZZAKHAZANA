import React from 'react'
import PizzaCard from './PizzaCard'

const PizzaCardList = (props) => {
  let allPiza = props.products
  let pizzaCardList = []
  for (let i = 0; i < allPiza.length; i += 3) {
    let pizzaCards = allPiza.slice(i, Math.min(i + 3, allPiza.length))
      .map(p => (
        <PizzaCard
          key={p._id}
          id={p._id}
          name={p.name}
          image={p.image}
          description={p.description}
          weight={p.weight}
          price = {p.price} />))

    let cardDeck = <div key={i} className='card-deck space-top'>{pizzaCards}</div>
    pizzaCardList.push(cardDeck)
  }

  return (
    <div className='container-fluid'>
      <div className="cardparent">
      {pizzaCardList}
      </div>
    </div>
  )
}

export default PizzaCardList
