import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select';


const ProductSearchBar = ({searchKeyword, sortOptions, setSortOption, sortOption}) => {
  const buttonRef = useRef(null);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      handleSearch(); // Call handleSearch directly
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    navigate(`/products/search?${params.toString()}`);
  };



  return (
    <>
        <div className='flex justify-center'>
            <div className="relative w-full max-w-sm">
            <Input
                type="text"
                placeholder="Search for your jewelry..."
                value={search}
                defaultValue={searchKeyword}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-none pl-12"
                onKeyDown={handleKeyDown}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            </div>
            
            <Button 
                onClick={handleSearch} 
                ref={buttonRef}
                className="ml-2 rounded-none bg-stone-900">
                Search
            </Button>
        </div>
        <div className='mx-auto'>
            Sort by 
            <Select onValueChange={value => setSortOption(value)} value={sortOption}>
                <SelectTrigger className="border w-40 border-stone-800" id="gemstone" aria-label="Select gemstone">
                    <SelectValue placeholder="Most relevant" />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map((option) => (
                        <SelectItem value={option} key={option}>
                            <p className="text-md">{option}</p>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </>
  );
};

export default ProductSearchBar;
