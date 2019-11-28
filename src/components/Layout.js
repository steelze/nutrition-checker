import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import axios from 'axios';
import Result from './Result';

const { REACT_APP_API_URL: BASE_URL,
  REACT_APP_API_KEY: APP_KEY,
  REACT_APP_API_ID: APP_ID,
} = process.env;

class Layout extends Component {
  state = {
    q: '',
    data: [],
    processing: false,
    searchValue: '',
  }

  handleSearch = async (e) => {
    e.preventDefault();
    try {
      this.setState({ processing: true});
      const { q } = this.state;
      if (q.trim() !== '') {
        const value = encodeURIComponent(q);
        const { data: { hints } } = await axios.get(`${BASE_URL}/food-database/parser?ingr=${value}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        this.setState({ data: [...hints], q: '', searchValue: q });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ processing: false});
    }

  }

  handleChange = (e) => {
    const q = e.target.value;
    this.setState({ q });
  }

  render() {
    let resultBar;
    if(this.state.searchValue) {
      if(this.state.data.length) {
        resultBar = <u>Search results for <strong>{ this.state.searchValue }</strong></u>
      } else {
        resultBar = <u>No results for <strong>{ this.state.searchValue }</strong></u>
      }
    }
    return (
      <>
        <SearchBar q={ this.state.q } handleSearch={ this.handleSearch } processing={ this.state.processing } handleChange= { this.handleChange } />
        {
          (this.state.processing) ?
          <Spinner /> :
          <h5 className="col s12 center">
            { resultBar }
          </h5>
        }
        <Result data={ this.state.data } />
      </>
    )
  }
}

export default Layout;
