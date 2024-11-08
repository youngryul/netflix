import React, {useState} from "react";
import {useQuery} from "react-query";
import {getMovies, IGetMoviesResult} from "../api";
import styled from "styled-components";
import {motion, AnimatePresence, useScroll} from "framer-motion";
import {makeImagePath} from "../utils";
import {useNavigate, useMatch, PathMatch} from "react-router-dom";



const Wrapper = styled(motion.div)`
    background-color: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${props => props.bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
    color: white;
`;

const Overview = styled.p`
    font-size: 30px;
    width: 50%;
    color: white;
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
    background-color: white;
    background-image: url(${props => props.bgPhoto});
    background-size: cover;
    background-position: center;
    height: 200px;
    cursor: pointer;
    &:first-child {
      transform-origin: center left;
    }
    &:last-child {
      transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
    text-align: center;
    font-size: 18px;
    }
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 5
    },
    visible: {
        x: 0
    },
    exit: {
        x: -window.outerWidth - 5
    }
}

const boxVariants = {
    normal: {
        scale: 1
    },
    hover: {
        scale: 1.3,
        y: -80,
        transition: {
            delay: 0.5,
            duration: 0.1,
            type: "tween"
        }
    }
};

const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.1,
            type: "tween",
        },
    },
};

const offset = 6;

function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const { scrollY } = useScroll();
    const navigate = useNavigate();
    const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:id");

    const incraseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length -1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => prev === maxIndex ? 0 :  prev + 1);
        }

    }

    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onBoxClicked = (movieId: number) => {
        navigate(`/movies/${movieId}`);
    };
    const onOverlayClick = () => navigate("/");
    const clickedMovie = moviePathMatch?.params.id &&
                        data?.results.find((movie) => movie.id === +moviePathMatch.params.id!);

    return(
        <Wrapper>{isLoading ? <Loader>Loading...</Loader> :
            <>
                <Banner onClick={incraseIndex} bgPhoto={makeImagePath(data?.results[1].backdrop_path || "")}>
                    <Title>{data?.results[1].title}</Title>
                    <Overview>{data?.results[1].overview}</Overview>
                </Banner>
                <Slider>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Row
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ type : "tween", duration: 1 }}
                            key={index}
                        >
                            {data?.results.slice(2).slice(offset*index, offset*index+offset).map((movie) => (
                                <Box
                                    layoutId={movie.id + ""}
                                    onClick={() => onBoxClicked(movie.id)}
                                    bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                                    whileHover="hover"
                                    initial="normal"
                                    variants={boxVariants}
                                    key={movie.id}>
                                    <Info variants={infoVariants}>
                                        <h4>{movie.title}</h4>
                                    </Info>
                                </Box>
                            ))}
                        </Row>
                    </AnimatePresence>
                </Slider>
                <AnimatePresence>
                    {moviePathMatch ? (
                        <>
                            <Overlay
                                onClick={onOverlayClick}
                                exit={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                            <BigMovie
                                style={{ top: scrollY.get() + 100 }}
                                layoutId={moviePathMatch.params.movieId}
                            >
                                {clickedMovie && (
                                    <>
                                        <BigCover
                                            style={{
                                                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                    clickedMovie.backdrop_path,
                                                    "w500"
                                                )})`,
                                            }}
                                        />
                                        <BigTitle>{clickedMovie.title}</BigTitle>
                                        <BigOverview>{clickedMovie.overview}</BigOverview>
                                    </>
                                )}
                            </BigMovie>
                        </>
                    ) : null}
                </AnimatePresence>
            </>
        }</Wrapper>
    );
}
export default Home;