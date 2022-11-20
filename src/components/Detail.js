import styled from "styled-components";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";

const Detail = (props) => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        // Grab the movie info from DB
        db.collection("movies")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    // Save the movie data
                    setMovie(doc.data());
                } else {
                    // Redirect to home page
                }
            });
    }, [id]);

    return (
        <Container>
            <Background>
                <img src={movie.backgroundImg} alt={movie.title} />
            </Background>
            <ImageTitle>
                <img src={movie.titleImg} alt={movie.title} />
            </ImageTitle>
            <ContentMeta>
                <Controls>
                    <PlayButton>
                        <img src="/images/play-icon-black.png" />
                        <span>PLAY</span>
                    </PlayButton>
                    <TrailerButton>
                        <img src="/images/play-icon-white.png" />
                        <span>TRAILER</span>
                    </TrailerButton>
                    <AddButton>
                        <span>+</span>
                    </AddButton>
                    <GroupWatchButton>
                        <img src="/images/group-icon.png" />
                    </GroupWatchButton>
                </Controls>
            </ContentMeta>
            <SubTitle>
                {movie.subTitle}
            </SubTitle>
            <Description>
                {movie.description}
            </Description>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    top: 70px;
    overflow-x: hidden;
    display: block;
`

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        @media (max-width: 768px) {
            width: initial;
        }
    }
`

const ImageTitle = styled.div`
    align-items: flex-end;
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: 0px auto;
    height: 30vw;
    min-height: 170px;
    padding-bottom: 24px;
    width: 100%;
    img {
        max-width: 600px;
        min-width: 200px;
        width: 35vw;
    }
`

const ContentMeta = styled.div`
    max-width: 874px;
`

const Controls = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    margin: 24px 0px;
    min-height: 56px;
`

const PlayButton = styled.button`
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 56px;
    background: rgb(249, 249, 249);
    border: transparent;
    padding: 0px 24px;
    margin-right: 22px;
    letter-spacing: 1.8px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img {
        width: 32px;
    }

    &:hover {
        /* background: rgb(198, 198, 198); */
        background: transparent;
        color: white;
        img {
            filter: brightness(0) invert(1);
        }
        border: 1px solid white;
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        height: 45px;
        padding: 0px 22px;
        font-size: 12px;
        margin-right: 10px;

        img {
            width: 25px;
        }
    }
`

const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
    text-transform: uppercase;
`

const AddButton = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    span {
        font-size: 30px;
        color: white;
    }
    &:hover {
        transform: scale(1.1);
    }
`

const GroupWatchButton = styled(AddButton)`
    background: rgb(0, 0, 0);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`

const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 760px;
`

export default Detail