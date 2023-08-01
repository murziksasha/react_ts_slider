import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import cl from 'classnames';
import { Photo, CommonClassProps } from "../types";
import style from './index.module.scss';

interface MainPhotoProps extends CommonClassProps{
  photos: Photo[];
  indexActivePhoto: number;
}

type Reff = React.MutableRefObject<HTMLDivElement | null>;
const getPhotoByRef = (ref: Reff, index: number): HTMLElement | null => {
  return ref.current!.querySelector(`img:nth-of-type(${index+1})`);
};

const hidePhoto = (element: HTMLElement | null) => {
  if(!element) return;
  element.dataset.active = 'false';
  if(element.previousSibling){
    //@ts-ignore
    element.previousSibling.dataset.active = 'false'
  }
  if(element.nextSibling){
    //@ts-ignore
    element.nextSibling.dataset.active = 'false'
  }
}

const showPhoto = (element: HTMLElement | null) => {
  if(!element) return;
  element.dataset.active = 'true';
  if(element.previousSibling){
    //@ts-ignore
    element.previousSibling.dataset.active = 'prepared'
  }
  if(element.nextSibling){
    //@ts-ignore
    element.nextSibling.dataset.active = 'prepared'
  }
}

export const MainPhoto: React.FC<MainPhotoProps> = ({
  photos,
  indexActivePhoto,
  className,
}) => {
  const [prevActiveIndexPhoto, setPrevActivePhoto] = useState(indexActivePhoto);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if(!containerRef.current) return;
    const activePhoto = getPhotoByRef(
      containerRef,
      prevActiveIndexPhoto,
    );
    const nextActivePhoto = getPhotoByRef(
      containerRef,
      indexActivePhoto,
    );
    if(prevActiveIndexPhoto !== indexActivePhoto) {
      hidePhoto(activePhoto);
      showPhoto(nextActivePhoto);
    } else {
      showPhoto(activePhoto);
    }
    setPrevActivePhoto(indexActivePhoto);
  }, [indexActivePhoto]);
  return useMemo(() => (
    <div 
    className={cl(className, style.mainPhoto)}
    ref={containerRef}
    >
      {photos.map((photo, id) => (
        <img 
          key={photo.id}
          className={style.mainPhotoImagePrev}
          data-active={id === prevActiveIndexPhoto}
          src={photo.src}
          alt={photo.description}
          loading='lazy'
        />
      ))}
    </div>
  ), []);

};