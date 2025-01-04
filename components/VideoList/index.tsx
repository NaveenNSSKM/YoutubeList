import React, { useState } from "react";  // Removed useEffect

import Image from "next/image";  // Import Image from next/image

interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  videoCount: number;
}

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export default function YouTubeIntegration() {
  const playlists: Playlist[] = [
    {
      id: "1",
      title: "Tech Tutorials",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoCount: 5,
    },
    {
      id: "2",
      title: "Travel Vlogs",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoCount: 3,
    },
    {
      id: "3",
      title: "Cooking Recipes",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      videoCount: 4,
    },
  ];

  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const mockVideos: Record<string, Video[]> = {
    "1": [
      {
        id: "v1",
        title: "Learn React",
        description: "An introduction to React.js",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
      {
        id: "v2",
        title: "Advanced JavaScript",
        description: "Understanding closures and async/await",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    ],
    "2": [
      {
        id: "v6",
        title: "Exploring Japan",
        description: "A journey through Tokyo",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    ],
    "3": [
      {
        id: "v11",
        title: "Pasta Recipe",
        description: "Quick and easy pasta dish",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      },
    ],
  };

  const fetchVideos = (playlistId: string) => {
    setVideos(mockVideos[playlistId] || []);
    setSelectedPlaylist(playlistId);
  };

  const handleImportFromYouTube = () => {
    console.log("Import from YouTube clicked");
    // Add your logic to handle YouTube import here.
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-cover bg-center">
      {/* Fixed Header */}
      <header className="w-full bg-indigo-700 text-white p-4 shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">YouTube Integration</h1>
          <button
            onClick={handleImportFromYouTube}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-indigo-600 hover:border-1 hover:border-white hover:text-white"
          >
            Import From YouTube
          </button>
        </div>
      </header>

      {/* Left Sidebar with fixed width */}
      <aside
        className={`w-[300px] bg-indigo-700 text-white p-4 shadow-lg fixed top-16 left-0 bottom-0 overflow-y-auto sm:w-[250px] md:w-[300px] transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white sm:block lg:hidden"
        >
          &#x2715; {/* Close button (X) */}
        </button>
        <h2 className="text-lg font-bold mb-4">Playlists</h2>
        {playlists.length ? (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={`flex items-center text-white mb-4 cursor-pointer p-2 rounded-md transition 
                ${selectedPlaylist === playlist.id
                  ? "bg-indigo-800" // Active (selected) state background
                  : "hover:bg-indigo-700"}  // Hover state background`}
              onClick={() => fetchVideos(playlist.id)}
            >
              <Image
                src={playlist.thumbnail}
                alt={playlist.title}
                width={64}  // Set width
                height={64} // Set height
                className="rounded-md"
              />
              <div className="ml-4">
                <h3 className="font-semibold">{playlist.title}</h3>
                <p className="text-sm text-gray-200">
                  {playlist.videoCount > 5 ? "5+ Videos" : `${playlist.videoCount} Videos`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No playlists found.</p>
        )}
      </aside>

      {/* Main content area */}
      <main
        className={`flex-1 p-4 bg-white overflow-auto pt-20 transition-all duration-300 ${
          isSidebarOpen ? "ml-[300px]" : "ml-0"
        } sm:ml-[250px] lg:ml-[300px]`}
      >
        <h2 className="text-lg font-bold mb-4">
          {selectedPlaylist ? "Videos" : "Select a Playlist"}
        </h2>
        {videos.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={320}  // Set width
                  height={180} // Set height
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-sm mb-2">{video.title}</h3>
                  <p className="text-xs text-gray-600">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No videos found for the selected playlist.</p>
        )}
      </main>
    </div>
  );
}
