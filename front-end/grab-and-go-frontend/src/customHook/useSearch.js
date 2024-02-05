import { useState, useEffect } from 'react';

const useSearch = (localAllConcat, initialCategory) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState(initialCategory);
    const [filteredData, setFilteredData] = useState(localAllConcat);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            let fieldToSearch;
            if (searchCategory === 'None') {
                fieldToSearch = 'Name'; // when category is 'None' ，use 'Name' to search
            } else if (searchCategory === 'Contact Person') {
                fieldToSearch = 'Name'; // otherwise use the category to search
            } else {
                fieldToSearch = searchCategory;
            }
            const filteredEntities = searchTerm
                ? localAllConcat.filter(item => {
                    // when category is not 'None' ，check item.Type is matching or not
                    if (searchCategory !== 'None') {
                        if (searchCategory === 'Contact Person' && item.Type !== 'Person') {
                            return false;
                        } else if (searchCategory === 'Organisation' && item.Type !== 'Organisation') {
                            return false;
                        }
                    }
                    const valueToCheck = item[fieldToSearch] ? item[fieldToSearch].toLowerCase() : '';
                    return valueToCheck.includes(searchTerm.toLowerCase());
                })
                : localAllConcat;
            setFilteredData(filteredEntities);
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, searchCategory, localAllConcat]);

    return {
        searchTerm,
        setSearchTerm,
        searchCategory,
        setSearchCategory,
        filteredData
    };
};

export default useSearch;
