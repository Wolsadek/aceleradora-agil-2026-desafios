import { sanitizeUnsplashSlug } from "../utils/sanitize-unsplash-slug";

interface PictureProps {
  image_url: string;
  name: string;
  author: string;
  author_photo: string;
  likes: number;
}

export function Photo({
  image_url,
  name,
  author,
  author_photo,
  likes,
}: PictureProps) {
  return (
    <div className="px-3">
      <div className="relative overflow-hidden">
        <img
          className="h-60 object-cover w-full transform transition-transform duration-300 ease-in-out hover:scale-125"
          src={image_url}
          alt={name}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 py-2">
          <img className="rounded-full h-8 " src={author_photo} alt="" />
          <div className="flex flex-col justify-center ">
            <p className="text-base font-medium">{author}</p>
            <p className="text-sm font-medium text-slate-600">Autor</p>
          </div>
        </div>
        <div className="flex items-center">{likes} ❤️</div>
      </div>

      <h1 className="text-left font-normal text-base">
        {sanitizeUnsplashSlug(name)}
      </h1>
    </div>
  );
}
