import { useEffect, useState } from 'react';
import { FilterLabelsIsp, RequestDataFilter, SingleFilterIsp } from '../components/ipa/IpaAnalyzer.types';
import { SelectOption } from '../lib/components/select/Select';
import { getProviders } from '../api/ipa/ipaISP';
import { getIspFilter } from '../api/ipa/ipaIspFilters';

interface FetchOptionsParams {
  labels: FilterLabelsIsp[];
  collaborationId: string;
  pNumber: string;
  data: RequestDataFilter;
  selectedCards: string[];
  stateFilterValues: { [key in SingleFilterIsp]?: SelectOption[] };
  searchTerms: { [key in SingleFilterIsp]?: string };
}

const useFetchOptionsIsp = ({ labels,  data, selectedCards, stateFilterValues, searchTerms }: FetchOptionsParams) => {
  const [optionsMap, setOptionsMap] = useState<{ [key in SingleFilterIsp]?: SelectOption[] }>({});

  useEffect(() => {
    const fetchOptions = async () => {
      if (selectedCards.length === 0 || labels.length === 0) return;

      const map: { [key in SingleFilterIsp]?: SelectOption[] } = {};

      // Fetch platforms
      const platformResponse = await getProviders();
      const providers = Object.entries(platformResponse.data).map(([key, value]) => ({
        label: value as string,
        value: key,
      }));
      map['isps'] = providers;

      for (const label of labels) {
        if (label.type === 'isps') continue; // already handled

        const searchTerm = searchTerms[label.type];
        if (searchTerm) {
          const response = await getIspFilter({ ...data, searchTerm }, label.type);
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

export default useFetchOptionsIsp;
