import { useRouter } from 'next/router';
import { useState } from 'react';

export interface ISearch {}

const Search: React.FC<ISearch> = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/results?search=${searchTerm}`);
  };

  return (
    <form
      className="flex flex-col items-center gap-y-5"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="rounded-full border-2 w-5/6 sm:w-128 h-12 px-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="e.g. dog | cat"
      />
      <div className="space-x-3">
        <button type="submit" className="btn-primary">
          Google Search
        </button>
        <button type="submit" className="btn-primary">
          I&apos;m Feeling Lucky
        </button>
      </div>
    </form>
  );
};

export default Search;
