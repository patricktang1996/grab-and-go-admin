import { useState, useEffect } from 'react';

const useSearch = (localAllConcat, initialCategory) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState(initialCategory);
    const [filteredData, setFilteredData] = useState(localAllConcat);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            let fieldToSearch;
            if (searchCategory === 'None') {
                fieldToSearch = 'Name'; // 当类别为 'None' 时，按照 'Name' 字段搜索
            } else if (searchCategory === 'Contact Person') {
                fieldToSearch = 'Name'; // 其他具体类别的处理
            } else {
                fieldToSearch = searchCategory;
            }

            const filteredEntities = searchTerm
                ? localAllConcat.filter(item => {
                    // 当类别不是 'None' 时，检查 item.Type 是否匹配
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
