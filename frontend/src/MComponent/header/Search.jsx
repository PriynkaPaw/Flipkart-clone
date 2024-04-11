import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const Search = () => {
  const productList = useSelector((state) => state.getProduct.data);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setSearchResults(productList.name);
    } else {
      const filteredResults = productList?.filter(product =>
        product.brand.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log('filteredResults: ', filteredResults);

      setSearchResults(filteredResults);
    }
  };
  const navigate = useNavigate()
  const handleOnclick = ()=>{
    navigate('/electronics')
  }

  return (
    <>
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products, brands and more"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
      />
      <SearchIconWrapper>
        <button onClick={handleSearch}>
          <SearchIcon />
        </button>
      </SearchIconWrapper>
     
    </SearchContainer>
    <ul>
        {
          searchResults?.map((item)=>(
            <li onClick={handleOnclick}  className='bg-gray-400'>{item.brand}</li>
          ))
        }
      </ul>
    </>

  );
};

export default Search;
