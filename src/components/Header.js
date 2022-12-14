import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { selectUserName, selectUserPhoto, setUserLoginDetails, selectUserEmail, setSignOutState } from "../features/user/userSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                history("/home");
            }
        });
    }, [userName]);


    const handleAuth = () => {
        if (!userName) {
            auth.signInWithPopup(provider).then((result) => {
                setUser(result.user);
            }).catch((error) => {
                alert(error.message);
            })
        } else if (userName) {
            auth.signOut().then(() => {
                dispatch(setSignOutState());
                history("/");
            }).catch((err) => alert(err.message));
        }
    };

    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }));
    };

    return (
        <Container>
            <Content>
                <Logo>
                    <img src="/images/logo.svg" alt="Disney+" />
                </Logo>
                {!userName ? (
                    <Login onClick={handleAuth}>Login</Login>) : <>

                    <Nav>
                        <Link to="/home">
                            <img src="/images/home-icon.svg" alt="" />
                            <span>HOME</span>
                        </Link>
                        <Link to="/search">
                            <img src="/images/search-icon.svg" alt="" />
                            <span>SEARCH</span>
                        </Link>
                        <Link to="/watchlist">
                            <img src="/images/watchlist-icon.svg" alt="" />
                            <span>WATCHLIST</span>
                        </Link>
                        <Link to="/originals">
                            <img src="/images/original-icon.svg" alt="" />
                            <span>ORIGINALS</span>
                        </Link>
                        <Link to="/movies">
                            <img src="/images/movie-icon.svg" alt="" />
                            <span>MOVIES</span>
                        </Link>
                        <Link to="/series">
                            <img src="/images/series-icon.svg" alt="" />
                            <span>SERIES</span>
                        </Link>
                    </Nav>
                    <SignOut>
                        <UserImg src={userPhoto} alt={userName.substring(0, userName.indexOf(' '))} />
                        <DropDown>
                            <span onClick={() => auth.signOut().then(() => {
                                dispatch(setSignOutState());
                                history("/");
                            })}>Sign out</span>
                        </DropDown>
                    </SignOut>
                </>
                }
            </Content>
        </Container>
    );
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background: #090b13; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    min-height: 100%;
    padding: 0 36px;
    margin-left: 36px;
    margin-right: 36px;
    justify-content: space-between;
    max-width: 1128px;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img {
        display: block;
        width: 100%;
    }
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;

        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }

        span {
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &:before {
                background-color: rgb(249, 249, 249);
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: "";
                height: 2px;
                left: 0px;
                opacity: 0;
                position: absolute;
                right: 0px;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
                width: auto;
            }
        }

        &:hover {
            span:before {
                transform: scaleX(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const Login = styled.a`
    position: absolute;
    right: 1vw;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const UserImg = styled.img`
    position: absolute;
    /* top: 32%; */
    right: 2vw;
    height: 62%;
    border-radius: 50%;
    letter-spacing: 1.5px;
    cursor: pointer;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
    cursor: pointer;
`;

const SignOut = styled.div`
    position: absolute;
    right: 0;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    
    ${UserImg} {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition: 0.4s ease-in-out;
        }
    }
`;


export default Header;