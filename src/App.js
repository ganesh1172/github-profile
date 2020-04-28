import React, { useState } from "react";
import axiosInstance from './api';
import { Grid, Link, Typography, IconButton, Card, CardContent, Paper, AppBar, Toolbar, TextField, Switch, Tabs, Tab } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import cx from 'classnames';
import TodayIcon from '@material-ui/icons/Today';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { makeStyles } from '@material-ui/styles';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


function App() {
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
  const [error, setError] = useState("");
  const [darkMode, setDartmode] = useState(false);
  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   axiosInstance.get(`/users/examples`)
  //     .then(response => {
  //       const data = response.data;
  //       setData(data);
  //     })
  // }, []);

  const setData = ({ name, login, public_repos, followers, following, avatar_url, location, created_at, company, html_url }) => {
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

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    axiosInstance.get(`/users/${userInput}`)
      .then(response => {
        const data = response.data;
        setData(data);
        console.log(data)
        setError(null);
      })
      .catch(error => {
        setError(error.response.data.message)
      })
    e.preventDefault();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    TypographyStyles: {
      flex: 1,
    },
    size: {
      minWidth: 495,
      marginTop: 15,
    }
  }));

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    },
  });

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
              <form onSubmit={handleSubmit} autoComplete="off">
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

        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={8}>
            <div>
              <Avatar alt="profile" src={avatar_url} style={{ marginTop: '5' }} />
            </div>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4" color="Secondary">{name}ganesh</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">
              <Link href={html_url} underline="hover" color="primary" target="_blank">@{userName}ganesh1172</Link>
            </Typography>
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item sm={3}></Grid>
            <Grid item sm={2}>
              <Typography align="center"><IconButton><BusinessCenterIcon color="action" /></IconButton>ganesh{company}</Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography align="center"><IconButton><LocationOnIcon color="action" /></IconButton>navi mumbai{location}</Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography align="center"><IconButton><TodayIcon color="action" /></IconButton>8454866{new Date(created_at).toDateString()}</Typography>
            </Grid>
            <Grid item sm={3}></Grid>
          </Grid>
          <Grid container direction="row" justify="center">
            <Grid item component={Card}>
              <CardContent>
                <Typography variant="h5" align="center">8{public_repos}</Typography>
                <Typography color="textSecondary">REPOSITORIES</Typography>
              </CardContent>
            </Grid>
            <Grid item component={Card}>
              <CardContent>
                <Typography variant="h5" align="center">8{followers}</Typography>
                <Typography color="textSecondary">FOLLOWERS</Typography>
              </CardContent>
            </Grid>
            <Grid item component={Card}>
              <CardContent>
                <Typography variant="h5" align="center">8{following}</Typography>
                <Typography color="textSecondary">FOLLOWING</Typography>
              </CardContent>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item sm={3} />
            <Grid item sm={6}>
              <Tabs className={classes.size}
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="primary"
              >
                <Tab icon={<DescriptionIcon />} label="Repositories" />
                <Tab icon={<GroupIcon />} label="Followers" />
                <Tab icon={<GroupAddIcon />} label="following" />
              </Tabs>
            </Grid>
            <Grid item sm={3} />
          </Grid>
        </Grid >
      </Paper>
    </ThemeProvider >
  );
}

export default App;



