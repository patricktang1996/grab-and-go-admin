import { useState, useEffect } from 'react';

const useSearch = (localAllConcat, initialCategory) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState(initialCategory);
    const [filteredData, setFilteredData] = useState(localAllConcat);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            let filteredEntities;
            let fieldToSearch = 'Name';
            if (searchCategory === 'Contact Person') {
                fieldToSearch = 'Name';
            } else if (searchCategory === 'Organisation') {
                fieldToSearch = 'Organisation';
            }
            if (!searchTerm) {
                filteredEntities = localAllConcat;
            } else {
                filteredEntities = localAllConcat.filter(item => {
                    if (searchCategory === 'None') {
                        if (item.Organisation.startsWith(searchTerm)) {
                            return true;
                        }
                    }
                    if (searchCategory !== 'None') {
                        if (searchCategory === 'Contact Person' && item.Type !== 'Person') {
                            return false;
                        } else if (searchCategory === 'Organisation' && item.Type !== 'Organisation') {
                            return false;
                        }
                    }
                    let valueToCheck = '';
                    if (item[fieldToSearch]) {
                        valueToCheck = item[fieldToSearch].toLowerCase();
                    }
                    return valueToCheck.includes(searchTerm.toLowerCase());
                });
            }
            setFilteredData(filteredEntities);
        }, 200);

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

