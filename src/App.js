import React, { useState } from "react";
import axiosInstance from './api';
import { Grid, Link, Typography, IconButton, Card, CardContent, Paper, AppBar, Toolbar, TextField, Switch, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import cx from 'classnames';
import TodayIcon from '@material-ui/icons/Today';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/styles';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';


function App() {
  // General
  const [error, setError] = useState("");
  const [darkMode, setDartmode] = useState(false);

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  // Profile
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [public_repos, setPublicRepos] = useState("");
  const [following, setFollowing] = useState("");
  const [followers, setFollowers] = useState("");
  const [avatar_url, setAvatar_url] = useState('');
  const [location, setLocation] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [company, setCompany] = useState("");
  const [html_url, setHtml_url] = useState("");

  const setProfileData = ({ name, login, public_repos, followers, following, avatar_url, location, created_at, company, html_url }) => {
    setName(name);
    setUserName(login);
    setPublicRepos(public_repos);
    setFollowing(following);
    setFollowers(followers);
    setAvatar_url(avatar_url);
    setLocation(location);
    setCreated_at(created_at);
    setCompany(company);
    setHtml_url(html_url);
  };

  const handleProfile = (e) => {
    axiosInstance.get(`/users/${userInput}`)
      .then(response => {
        const data = response.data;
        setProfileData(data);
        setError(null);
      })
      .catch(error => {
        setError(error.response.data.message)
      })
    e.preventDefault();
  };

  // Repository
  const [repoName, setRepoName] = useState([]);
  const [repoUrl, setRepoUrl] = useState([]);
  const [repoSize, setRepoSize] = useState([]);

  const setRepositoryData = (r_name, r_htmlUrl, r_size) => {
    setRepoName(r_name);
    setRepoUrl(r_htmlUrl);
    setRepoSize(r_size);
  };

  const handleRepository = (e) => {
    axiosInstance.get(`/users/${userInput}/repos`)
      .then(response => {
        const data = response.data
        const r_name = []
        const r_htmlUrl = []
        const r_size = []
        for (const i in data) {
          r_name.push(data[i].name)
          r_htmlUrl.push(data[i].html_url)
          r_size.push(data[i].size)
        }
        console.log(r_name, r_htmlUrl, r_size)
        setRepositoryData(r_name, r_htmlUrl, r_size);
      })
    e.preventDefault();
  }

  // CSS
  const useStyles = makeStyles((theme) => ({
    TypographyStyles: {
      flex: 1,
    },
    button: {
      marginTop: 5,
    }
  }));

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    },
  });

  // HTML
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" className={cx(classes.TypographyStyles)}>
              Git-Glimpse
            </Typography>
            <div>
              <form onSubmit={handleProfile} autoComplete="off">
                <SearchTwoToneIcon />
                <TextField
                  id="filled-size-small"
                  // label="Search"
                  variant="standard"
                  color="secondary" size="medium" style={{ backgroundColor: "#3F51B5" }} onChange={handleSearch}
                /><Switch checked={darkMode} onChange={() => setDartmode(!darkMode)} />
              </form>
            </div>
          </Toolbar>
        </AppBar>

        {error ? (<div><h1>{error}</h1></div>) : (
          <div>
            {!userName ? (<h3>Welcome</h3>) : (
              <div>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item xs={8}>
                    <div>
                      <Avatar alt="profile" src={avatar_url} style={{ marginTop: '5' }} />
                    </div>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="h4" color="secondary">{name}</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="h5">
                      <Link href={html_url} underline="hover" color="primary" target="_blank">@{userName}</Link>
                    </Typography>
                  </Grid>

                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item sm={3}></Grid>
                    <Grid item sm={2}>
                      <Typography align="center"><IconButton><BusinessCenterIcon color="action" /></IconButton>{company}</Typography>
                    </Grid>
                    <Grid item sm={2}>
                      <Typography align="center"><IconButton><LocationOnIcon color="action" /></IconButton>{location}</Typography>
                    </Grid>
                    <Grid item sm={2}>
                      <Typography align="center"><IconButton><TodayIcon color="action" /></IconButton>{new Date(created_at).toDateString()}</Typography>
                    </Grid>
                    <Grid item sm={3}></Grid>
                  </Grid>

                  <Grid container direction="row" justify="space-evenly">
                    <Grid item component={Card}>
                      <CardContent>
                        <Typography variant="h5" align="center">{public_repos}</Typography>
                        <Typography color="textSecondary">REPOSITORIES</Typography>
                      </CardContent>
                    </Grid>
                    <Grid item component={Card}>
                      <CardContent>
                        <Typography variant="h5" align="center">{followers}</Typography>
                        <Typography color="textSecondary">FOLLOWERS</Typography>
                      </CardContent>
                    </Grid>
                    <Grid item component={Card}>
                      <CardContent>
                        <Typography variant="h5" align="center">{following}</Typography>
                        <Typography color="textSecondary">FOLLOWING</Typography>
                      </CardContent>
                    </Grid>
                  </Grid>

                  {/* <Button size="large" variant="contained" color="primary" className={classes.button} onClick={handleRepository} startIcon={<FolderIcon />}>
                    Repos
                  </Button> */}
                  <Grid container direction="row" justify="center">
                    <Grid item component={Card}>
                      <CardContent>
                        <Typography variant="h5" align="center">{repoName}</Typography>
                        <Link><Typography variant="h5" align="center">{repoUrl}</Typography></Link>
                        <Typography variant="h5" align="center">{repoSize}</Typography>
                      </CardContent>
                    </Grid>
                  </Grid>

                </Grid>
              </div>
            )}
          </div>
        )}
      </Paper>
    </ThemeProvider >
  );
}

export default App;



