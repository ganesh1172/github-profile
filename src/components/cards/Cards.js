import React, { useState } from 'react';
import { Card, CardContent, Typography, CardHeader } from '@material-ui/core';

const Repos = ({ repos }) => {
    const [topRepos, setTopRepos] = useState([]);
}

const getTopRepos = types => {
    const LIMIT = 8;
    const map = {
        start: 'stargazers_count',
        forks: 'forks_count',
        size: 'size',
    };
    const sortProperty = map[type];
    const sorted = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => b[sortProperty] - a[sortProperty])
        .slice(0, LIMIT);

    setTopRepos(sorted);
};
return (


    {
        topRepos.length > 0 ? (
            topRepos.map(repo => (
                <Card>
                    <CardHeader><Typography>{repo.id}</Typography>
                        <Typography>{repo.html_url}</Typography></CardHeader>    </Card >))
        )}


)

export default Repos;