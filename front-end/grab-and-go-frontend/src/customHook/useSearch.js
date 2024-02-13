import { useState, useEffect } from 'react';

const useSearch = (localAllConcat, initialCategory) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState(initialCategory);
    const [filteredData, setFilteredData] = useState(localAllConcat);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            let filteredEntities;
            let fieldToSearch = 'name';
            if (searchCategory === 'Job Number') {
                fieldToSearch = 'job_number';
            }
            if (searchCategory === 'Contact Person') {
                fieldToSearch = 'name';
            } else if (searchCategory === 'Organisation') {
                fieldToSearch = 'organisation_name';
            }
            if (!searchTerm) {
                filteredEntities = localAllConcat;
            } else {
                filteredEntities = localAllConcat.filter(item => {
                    if (searchCategory === 'Job Number') {
                        if (String(item.job_number).startsWith(searchTerm)) {
                            return true;
                        }
                    }
                    if (searchCategory === 'None') {
                        if (item.name.startsWith(searchTerm)) {
                            return true;
                        }
                    }
                    if (searchCategory === 'Organisation') {
                        if (item.organisation_name.startsWith(searchTerm)) {
                            return true;
                        }
                    }
                    if (searchCategory === 'Contact Person') {
                        if (item.name.startsWith(searchTerm)) {
                            return true;
                        }
                    }
                    let valueToCheck = '';
                    if (item[fieldToSearch] && searchCategory !== 'Job Number') {
                        valueToCheck = item[fieldToSearch].toLowerCase();
                    }
                    if (searchCategory !== 'Job Number') {
                        return valueToCheck.includes(searchTerm.toLowerCase());
                    }
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

