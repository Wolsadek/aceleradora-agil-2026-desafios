import { useEffect, useState } from "react";
import { UNSPLASH_API_KEY } from "../api/constants";
import { UnsplashPicture } from "../types/unsplash/unsplash-picture";
import { UnsplashRequestParams } from "../types/unsplash/unsplash-request-params";
import { getPictures } from "../api/get-pictures";
import { Photo } from "./photo";
import { Spinner } from "./spinner";

interface PhotoGalleryProps {
  query: string;
  page: number;
}

export function PhotoGallery({ query, page }: PhotoGalleryProps) {
  const [data, setData] = useState<UnsplashPicture[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params: UnsplashRequestParams = {
          client_id: UNSPLASH_API_KEY,
          query,
          page,
          per_page: 20,
        };
        const response = await getPictures(params);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [query, page]);
  
  return (
    <div className="py-5">
      {isLoading === true && <Spinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {data && data.length > 0 ? (
          data.map((photo: UnsplashPicture) => (
            <Photo
              key={photo.id}
              image_url={photo.urls.regular}
              name={photo.alternative_slugs.pt}
              author={photo.user.username}
              author_photo={photo.user.profile_image.medium}
              likes={photo.likes}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-96">
            <p className="text-center">Nenhum produto foi encontrado na api.</p>
          </div>
        )}
      </div>
    </div>
  );
}
