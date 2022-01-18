import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import CollectionImageContainer from "./CollectionImageContainer";
import CollectionFeatures from "./CollectionFeatures";

import InfiniteScroll from "react-infinite-scroll-component";


const CollectionPage = () => {

    let SeenCollection = useSelector(state => state.CollectionObj);

    let [pageCount, setPageCount] = useState(1);

    const SubCollection = () => {
        return SeenCollection.slice(0, pageCount * 10);
    }

    let theme = useTheme();

    let smBreak = useMediaQuery(theme.breakpoints.up('sm'));

    let mdBreak = useMediaQuery(theme.breakpoints.up('md'));

    let lgBreak = useMediaQuery(theme.breakpoints.up('lg'));

    let columns = 1;

    if (lgBreak) {
        columns = 5;
    } else if (mdBreak) {
        columns = 3;
    } else if (smBreak) {
        columns = 2;
    }


    return (
        <div id="collection-page">
            <CollectionFeatures />
            <InfiniteScroll
                dataLength={pageCount * 10}
                next={() => { setPageCount(pageCount + 1) }}
                hasMore={(pageCount * 10 < SeenCollection.length)}
                loader={<h4>Loading...</h4>}
                component={null}
            >
                <ImageList cols={columns} gap={8} id="collection-container">
                    {
                        SubCollection().map(x => (
                            <ImageListItem key={x.date}>
                                <CollectionImageContainer imgSrc={x.imgSrc} title={x.title} date={x.date} desc={x.desc} status={x.status} />
                            </ImageListItem>
                        ))}

                </ImageList>
            </InfiniteScroll>
        </div>

    );
}

export default CollectionPage;