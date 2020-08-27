import React, { useState, useEffect } from 'react';
import { Spotify } from './../../network';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#282A36',
        maxHeight: 60,
        minWidth: 200,
        overflow: 'hidden',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        boxShadow: '0px 1px 10px 5px rgba(0,0,0,0.1)',
    },
    image: {
        height: 63,
    },
    title: {
        position: 'relative',
        padding: 20,
        fontSize: 16,
        color: 'white',
        fontFamily: 'Lato',
        flexDirection: 'column',
        backdropFilter: 'blur(5px)  opacity(50%)',
        '-webkit-backdrop-filter': 'blur(5px)'
    },
    background: {
        position: "relative",
    },
    'background::before': {
        content: "",
        position: 'absolute',
        top: 0, 
        left: 0,
        width: '100%', 
        height: '100%',
    }
})

export default function SpotifyContainer() {
    const classes = useStyles();

    const [currentSong, setCurrentSong] = useState({});
    const [error, setError] = useState('');

    async function GetSpotifyCurrentTrack() {

        const res = await Spotify.getCurrentSong();

        if (res.status === 204) {
            setError("Não tem nada tocando.")
            return;
        }

        if (res.status !== 204 && res.status !== 200) {
            setError("Spotify não disponível.")
            return;
        }

        const data = await res.json();

        if (data) {
            console.log(data);

            let artists = '';
            if (data.item.artists.length > 1) {
                data.item.artists.map((i, idx) => {
                    if (idx !== (data.item.artists.length - 1)) {
                    artists += `${i.name}, `
                    return;
                    }

                    artists += `${i.name}`
                })
            }
            else {
                artists = data.item.artists[0].name
            }

            const song = {
                name: data.item.name,
                artists: artists,
                albumCover: data.item.album.images[0].url
            }

            setCurrentSong(song);
        }
    }

    useEffect(() => {
        GetSpotifyCurrentTrack();    

        setInterval(() => {
        GetSpotifyCurrentTrack();    
        }, 10000)
    }, [])

    return (
        <div className={classes.container}>
            {currentSong === {} && error === '' ? (
                <span style={{ color: 'white' }}>Carregando...</span>
            ) : (
                <>
                    <div>
                        <img className={classes.image} src={currentSong?.albumCover} />
                    </div>
                    <div className={classes.background} style={{ backgroundImage: `url(${currentSong.albumCover})` }}>
                        <div className={classes.title}>
                            <div>                        
                                <span style={{ fontWeight: 'bold'}}>{currentSong?.name}</span>
                            </div>
                            <div>
                                <span style={{ fontWeight: 200 }}>{currentSong?.artists}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}