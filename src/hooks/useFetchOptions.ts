import { useEffect, useState } from 'react';
import { FilterLabels, RequestDataFilter, SingleFilterSocMed } from '../components/ipa/IpaAnalyzer.types';
import { SelectOption } from '../lib/components/select/Select';
import { getPlatforms } from '../api/ipa/ipaSocMed';
import { getSocMedFilter } from '../api/ipa/ipaSocMedFilters';

interface FetchOptionsParams {
  labels: FilterLabels[];
  data: RequestDataFilter;
  selectedCards: string[];
  stateFilterValues: { [key in SingleFilterSocMed]?: SelectOption[] };
  searchTerms: { [key in SingleFilterSocMed]?: string };
}

const useFetchOptions = ({ labels, data, selectedCards, stateFilterValues, searchTerms }: FetchOptionsParams) => {
  const [optionsMap, setOptionsMap] = useState<{ [key in SingleFilterSocMed]?: SelectOption[] }>({});

  useEffect(() => {
    const fetchOptions = async () => {
      if (selectedCards.length === 0 || labels.length === 0) return;

      const map: { [key in SingleFilterSocMed]?: SelectOption[] } = {};

      // Fetch platforms
      const platformResponse = await getPlatforms();
      const platforms = Object.entries(platformResponse.data).map(([key, value]) => ({
        label: value as string,
        value: key,
      }));
      map['platform'] = platforms;

      for (const label of labels) {
        if (label.type === 'timeInterval') continue;
        if (label.type === 'hasComment') continue;
        if (label.type === 'frequencyGreater') continue;
        if (label.type === 'frequencyLesser') continue;
        if (label.type === 'platform') continue; // already handled

        const searchTerm = searchTerms[label.type];
        if (searchTerm) {
          const response = await getSocMedFilter({ ...data, searchTerm }, label.type);
          map[label.type] = Object.entries(response.data).map(([key, value]) => ({
            label: value === '' ? 'No Name' : value as string,
            value: key,
          }));
        }
      }

      setOptionsMap(map);
    };

    fetchOptions();
  }, [labels, data, selectedCards, searchTerms, stateFilterValues]);

  return optionsMap;
};

export default useFetchOptions;
