import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@radix-ui/react-select';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductSearchBar = () => {
  const buttonRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isDescending, setIsDescending] = useState('true');
  const [sortBy, setSortBy] = useState('name'); // Static sort functionality

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      handleSearch(); // Call handleSearch directly
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchKeyword) params.append('SearchKeyWord', search);
    if (isDescending !== '') params.append('IsDescending', isDescending);
    params.append('SortBy', sortBy); // Static value

    navigate(`/products/search?${params.toString()}`);
  };



  return (
    <div className='flex justify-center'>
        <div className="relative w-full max-w-sm">
        <Input
            type="text"
            placeholder="Search for your jewelry..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="rounded-none pl-12"
            onKeyDown={handleKeyDown}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
        </div>
        
        <Button 
            onClick={handleSearch} 
            ref={buttonRef}
            className="ml-2">
            Search
        </Button>
    </div>
  );
};

export default ProductSearchBar;
