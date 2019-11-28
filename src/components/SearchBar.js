import React from 'react'

const SearchBar = ({ handleChange, handleSearch, q, processing }) => (
  <div className="col s12" style={{ marginTop: '20px' }}>
    <form onSubmit={ handleSearch }>
      <label>Search</label>
      <input type="text" name="q" value={ q } onChange={ handleChange } readOnly={ processing } />
      <button className="waves-effect waves-light blue btn right" disabled={ processing }>Submit</button>
    </form>
  </div>
);

export default SearchBar;
