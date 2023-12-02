import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
//provider, consumer - githubcontext.provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubRepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);

  // reques isLoading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //errors
  const [error, setError] = useState({ show: false, msg: "" });

  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          //throw new Error()
          toggleError(true, "sorry, you have exeeded your hourly rate limit");
        }
      })
      .catch((err) => console.log(err));
  };
  //errors
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    let resp = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    if (resp) {
      setGithubUser(resp.data);
      const { login, followers_url } = resp.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
      .then(results => { 
        const status = 'fulfilled'
        const [repos, followers] = results
        console.log(repos, followers)
        if(repos.status === status){
            setGithubRepos(repos.value.data)
        }
        if(followers.status === status){
            setGithubFollowers(followers.value.data)
        }
      })
      //repos
      //   axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(resp => setGithubRepos(resp.data))
      //followers
      //   axios(`${followers_url}?per_page=100`).then((resp) =>
      //     setGithubFollowers(resp.data)
      //   );
      // https://api.github.com/users/john-smilga/repos?per_page=100

      //followers
      //  https://api.github.com/users/john-smilga/followers
    } else {
      toggleError(true, "there it not user with that username");
    }
    checkRequests();
    setIsLoading(false);
  };

  useEffect(() => {
    checkRequests();
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        searchGithubUser,
        requests,
        error,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
