import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';


const Cards = ({ data: { public_repos, followers_url, following_url } }) => {
    if (!public_repos) {
        return '...Loading';
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card}>
                    <CardContent>
                        <Typography variant="h5">{public_repos}</Typography>
                        <Typography color="textSecondary">REPOSITORIES</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card}>
                    <CardContent>
                        <Typography variant="h5">{followers_url}</Typography>
                        <Typography color="textSecondary">FOLLOWERS</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card}>
                    <CardContent>
                        <Typography variant="h5">{following_url}</Typography>
                        <Typography color="textSecondary">FOLLOWING</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div >
    )
}

export default Cards;