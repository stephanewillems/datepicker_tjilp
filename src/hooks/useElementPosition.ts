import { useCallback, useEffect, useState } from 'react';


type ElementPosition = {
  top: number;
  left: number;
  height: number;
};

/* 
* Hook that returns the position of an element
* @param {React.RefObject<HTMLElement>} ref - Reference to the element to get the position of
* @return {ElementPosition} - Object containing the top, left and height of the element
* @author Stéphane
* @example
* const ref = useRef<HTMLDivElement>(null);
* const position = useElementPosition(ref);
* console.log(position.top, position.left, position.height);
* <div ref={ref}>Element</div>
*/
const useElementPosition = (ref: React.RefObject<HTMLElement>) => {
  const [position, setPosition] = useState<ElementPosition>({ top: 0, left: 0, height: 0 });

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        height: rect.height
      });
    }
  }, [ref]); 

  useEffect(() => {
    updatePosition(); 

    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [updatePosition]); 

  return position;
}

export default useElementPosition;
