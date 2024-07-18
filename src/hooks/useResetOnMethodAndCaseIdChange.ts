import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetRequest, } from '../components/request/requestSlice';
import { resetAllIscochrones, setSlideOverStatusRedux } from '../components/map/marker/markerSlice';
import { resetDrawFeaturesRequest, setDrawFeaturesRestore, setMapReset, setMetaData } from '../components/map/mapSlice';
import { resetAnprState } from '../components/anpr/anprSlice';
import { resetAllVideoParameters } from '../components/video/videoSlice';
import { resetZones, setPickedCameraIds } from '../components/zone/zoneSlice';


const useResetOnMethodAndCaseIdChange = (caseId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset request
    dispatch(resetRequest());

    // Reset anpr state and video parameters
    dispatch(resetAnprState());
    dispatch(resetAllVideoParameters());

    // Reset map and draw features from new request
    dispatch(setMapReset(true));
    dispatch(resetDrawFeaturesRequest());
    dispatch(setDrawFeaturesRestore(''));
    dispatch(setPickedCameraIds([]));

    // Reset isocrhone
    dispatch(resetAllIscochrones());

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

    // Reset zones
    dispatch(resetZones());
  }, [caseId, dispatch]);
};

export default useResetOnMethodAndCaseIdChange;
