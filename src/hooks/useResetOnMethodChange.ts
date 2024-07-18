import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetProgress, resetRequest, setRequestTabId } from '../components/request/requestSlice';
import { defaultTabIdPerMethod } from '../components/root/RootConfig';
import { setResultTabId } from '../components/result/resultSlice';
import { resetPanelExpanded } from '../components/root/rootSlice';
import { setMetaData } from '../components/map/mapSlice';
import { setSlideOverStatusRedux } from '../components/map/marker/markerSlice';


const useResetOnMethodChange = (method: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset current progress (otherwise fetch result in History.tsx can trigger again if tab is on history)
    dispatch(resetProgress('request'));

    // Reset current request
    dispatch(resetRequest());

    // Go to new tab unless it's geocoder method
    dispatch(setRequestTabId(defaultTabIdPerMethod[method] || 'new'));

    // Set result tab on table by default
    dispatch(setResultTabId('table'));

    // Reset expanded panels
    dispatch(resetPanelExpanded());

    // Close slide over
    dispatch(
      setSlideOverStatusRedux({
        status: false,
        markerId: '',
        aggregatedId: '',
        extraData: {},
      })
    );

    // Reset meta data
    dispatch(
      setMetaData({
        active: false,
        mapId: '',
      })
    );
  }, [method, dispatch]);
};

export default useResetOnMethodChange;
