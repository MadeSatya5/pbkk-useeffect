import { useEffect, useState } from "react";

const BASE_URL = "https://api.jikan.moe/v4/characters/1";

interface Character {
  data: {
    mal_id: number;
    url: string;
    images: {
      jpg: ImageFormat;
      webp: ImageFormat;
    };
    name: string;
    name_kanji: string;
    nicknames: string[];
    favorites: number;
    about: string;
  };
}

interface ImageFormat {
  image_url: string;
  small_image_url: string;
}

export default function Demo() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Character | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}`);
        const data = (await response.json()) as Character;
        setPost(data);
        console.log(data);
      } catch (e) {
        setError(e as string);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error}</div>;
  }

  if (!post) {
    return <div>No data</div>;
  }

  return (
    <div>
      <h1>Character Info</h1>
      <div>
        <img src={post.data.images.jpg.image_url} alt={post.data.name} />
        <h2>{post.data.name}</h2>
        <p>{post.data.name_kanji}</p>
        <p>{post.data.about}</p>
        <p>Favorites: {post.data.favorites}</p>
      </div>
    </div>
  );
}
