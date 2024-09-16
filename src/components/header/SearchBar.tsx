import { useDebounce } from '@uidotdev/usehooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTHOR, TITLE } from '../../constants';
import { Params } from '../../types/Params.type';
import { SearchByType } from '../../types/SearchBy.type';

export default function SearchBar() {
  const [searchType, setSearchType] = useState<SearchByType>(TITLE);
  const [inputValue, setInputValue] = useState<string>('');

  const { type, query } = useParams<Params>();
  const navigate = useNavigate();
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedInputValue) {
      const searchQuery = debouncedInputValue.trim().replaceAll(' ', '+').toLowerCase();
      navigate(`/${searchType}/${searchQuery}/`);
    }
  }, [debouncedInputValue, searchType]);

  useEffect(() => {
    if (type) {
      setSearchType(type);
    }

    if (query) {
      setInputValue(query.replaceAll('+', ' '));
    }
  }, []);

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setInputValue((e.target as HTMLInputElement).value);
  }

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setSearchType(e.target.value as SearchByType);
  }

  return (
    <div className="flex items-center text-black">
      <input
        className="border-r border-gray-300 h-full pt-2.5 pl-3 pb-3 w-20 md:w-60 lg:w-72 focus:outline-none rounded-l-md"
        type="text"
        placeholder="Find a book"
        value={inputValue}
        onChange={handleInput}
      />

      <select
        className="h-full p-2.5 pl-4 focus:outline-none rounded-r-md capitalize"
        onChange={handleSelect}
        value={searchType}
      >
        <option value={TITLE}>{TITLE}</option>

        <option value={AUTHOR}>{AUTHOR}</option>
      </select>
    </div>
  );
}
