export type UnsplashPicture = {
  id: string;
  slug: string;
  alternative_slugs: {
    pt: string;
  };
  color: string,
  description?: string,
  urls: {
    regular: string,
  },
  links: {
    download: string,
  } 
  likes: number,
  user: {
    username: string,
    profile_image: {
      medium: string
    }
  }
};
