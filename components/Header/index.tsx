export default function Header({ fetchPlaylists }: { fetchPlaylists: () => void }) {
    return (
      <header className="flex items-center w-full justify-between p-4 bg-indigo-600 text-white">
        <h1 className="text-xl font-bold">YouTube Playlist Manager</h1>
        <button
          onClick={fetchPlaylists}
          className="py-2 px-4 bg-white text-indigo-600 rounded-md hover:bg-gray-200"
        >
          Fetch Playlists
        </button>
      </header>
    );
  }
  