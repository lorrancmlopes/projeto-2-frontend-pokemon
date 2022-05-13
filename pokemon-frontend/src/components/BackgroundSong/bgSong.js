import Sound from 'react-sound';

import PokemonTheme from "./PokemonTheme.mp3";

const PlaySound = (
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying,
) => {
    return(
        <div>
            <Sound
            url={PokemonTheme}
            playStatus={Sound.status.PLAYING}
            playFromPosition={2000}
            onLoading={handleSongLoading}
            onPlaying={handleSongPlaying}
            onFinishedPlaying={handleSongFinishedPlaying}
            loop = {true}
            />
        </div>
    );
};

export default PlaySound;