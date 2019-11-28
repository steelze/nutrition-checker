import React, { Component } from 'react';
import Paginator from './Paginator/Paginator';
import NutritionalCodes from '../NutritionalCodes';

function showNutrients(nutrients) {
  let counter = 1;
  let jsx = [];
  for (const [key, value] of Object.entries(nutrients)) {
      const data = NutritionalCodes.find((nutrition) => nutrition.code === key);
      jsx.push(
        <tr key={counter}>
          <td>{ data.name }</td>
          <td>{ value.toFixed(2) }{ data.unit }</td>
        </tr>
      );
      counter++;
  }
  return jsx;
}

class Result extends Component {
  state = {
    current: 1,
    perPage: 5,
  }

  paginateData = (e, current) => {
    this.setState({ current });
  }

  render() {
    const { data } = this.props;
    const lastIndex = this.state.current * this.state.perPage;
    const firstIndex = lastIndex - this.state.perPage;
    const paginatedData = data.slice(firstIndex, lastIndex);
    const maxPage = Math.ceil(data.length / this.state.perPage);
    return (
      <>
        {
          paginatedData.map(({ food }, index) => {
            const nutrients = food.nutrients;
            return (
              <div className="col s12" key={ index }>
                <div className="card">
                  {/* <div className="card-image">
                    <img src={ food.image ? food.image : 'https://www.edamam.com/food-img/ae1/ae1eaa2ca2ba8209fa915d8a007ecac7.JPG' } alt="pop" />
                  </div> */}
                  <div className="card-content">
                    { (food.label) ? <span className="card-title blue-text"><strong>{ food.label }</strong></span> : null}
                    { (food.brand) ? <p><strong>Brand: </strong>{ food.brand }</p> : null }
                    { (food.category) ? <p><strong>Category: </strong>{ food.category }</p> : null }
                    { (food.categoryLabel) ? <p><strong>Category Label: </strong>{ food.categoryLabel }</p> : null }
                    <table className="striped highlight responsive-table">
                      <thead>
                        <tr>
                          <th>Nutrient</th>
                          <th>Value</th>
                        </tr>
                      </thead>

                      <tbody>
                        { showNutrients(nutrients) }
                      </tbody>
                    </table>
                    {/* { (food.foodContentsLabel) ? <p><strong>Food ContentsLabel Label: </strong>{ food.foodContentsLabel }</p> : null } */}
                  </div>
                </div>
              </div>
            )
          })
        }
        <Paginator maxPage={ maxPage } current={ this.state.current } handleCLick={ this.paginateData } />
      </>
    )
  }
}

export default Result;
