import { Photo } from "./types";
import style from './index.module.scss';
import { useState } from "react";
import {MainPhoto} from './MainPhoto';
import {Navigation} from './Navigation';
import { PreviewGallery } from "./PreviewGallery";

interface WebElartGalleryProps {
  photos: Photo[];
}

export const WebElartGallery: React.FC<WebElartGalleryProps> = ({
  photos,
}) => {
  if(!photos.length){
    return;
  }

  const [indexActivePhoto, setIndexActivePhoto] = useState(0);
  const activePhoto = photos[indexActivePhoto];
  const prevPhoto = photos[indexActivePhoto - 1];
  const nextPhoto = photos[indexActivePhoto + 1];

  return (
    <div className={style.webelartGallery}>
      <div className={style.webelartGalleryContainer}>
        <MainPhoto
          prevPhoto={prevPhoto}
          activePhoto={activePhoto}
          nextPhoto={nextPhoto}
          className={style.webelartGalleryMainPhoto}
        />
        <Navigation
          className={style.webelartGalleryNavigation}
          disabledPrev={!prevPhoto}
          disabledNext={!nextPhoto}
          onPrevClick={() => {
            setIndexActivePhoto(indexActivePhoto-1);
          }}
          onNextClick={() => {
            setIndexActivePhoto(indexActivePhoto+1);
          }}
        />
      </div>
      <PreviewGallery
        activePhotoIndex = {indexActivePhoto}
        photos={photos}
        className={style.webelarGalleryPreviewList}
      />
    </div>
  )
}