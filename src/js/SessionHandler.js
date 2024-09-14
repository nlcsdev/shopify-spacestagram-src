const axios = require('axios');

// let apiURL = "https://api.nasa.gov/planetary/apod";
// let apiURL = "http://localhost:3100/nasa";
let apiURL = "Depreciated";
let key = "Depreciated";

var jsonh = require("./jsonh");

const FetchTwoRandomImg = () => {

    return axios.get(apiURL, {
        params: {
            //api_key: key,
            count: 2
        }
    }).then(
        (res) => {
            console.log(res.data);
            return res.data;
        },
        (e) => {
            console.log("no response: %s", e);
        })

}

const FetchAMonth = (start_date, end_date) => {
    return axios.get(apiURL, {
        params: {
            //api_key: key,
            start_date,
            end_date
        }
    }).then(
        (res) => {
            //console.log(res.data);
            return res.data;
        },
        (e) => {
            console.log("no response: %s", e);
        })
}

export class SessionManager {
    constructor() {
        this.NASAImgObjList = [];
        let localCache = localStorage.getItem('myCache');
        let localCacheDate = localStorage.getItem('myDate');
        let localSortStyle = localStorage.getItem('myStyle');

        if (!!localCache) {
            this.NASAImgObjList = jsonh.unpack(JSON.parse(localCache));
            this.ready = true;
        } else {
            this.ready = false;
        }

        if (!!localCacheDate) {
            this.lastCacheDate = localCacheDate;
        } else {
            //this.lastCacheDate = "1995-06-16";
            this.lastCacheDate = "2000-01-01";
            localStorage.setItem('myDate', this.lastCacheDate);
        }

        if (!!localSortStyle) {
            this.sortStyle = parseInt(localSortStyle);
        } else {
            this.sortStyle = 0;
            localStorage.setItem('myStyle', 0);
        }

        this.endlessCacheOngoing = false;

        console.log("Manager created.");

    }

    Initialize = async () => {
        let promis = FetchTwoRandomImg();
        console.log("Initialize called");
        return promis.then(res => {
            let initialFetchList = res;
            let Obj1 = NASAImgObj(initialFetchList[0]);
            let Obj2 = NASAImgObj(initialFetchList[1]);
            this.NASAImgObjList = [Obj1, Obj2];
            localStorage.setItem('myCache', JSON.stringify(jsonh.pack(this.NASAImgObjList)));
            console.log("Initial Cache Generated.");
            this.ready = true;
        });
    }

    EndlessCache = async () => {
        this.endlessCacheOngoing = true;

        let today = new Date();
        let fToday = this.DateFormatter(today.getFullYear(), today.getMonth() + 1, today.getDate());
        let lastCacheDateVal = this.DateToVal(this.lastCacheDate);
        let todayVal = this.DateToVal(fToday);

        while (lastCacheDateVal < todayVal) {
            let startObj = this.DateToObj(this.lastCacheDate);
            let endDate = new Date(startObj.year, startObj.month - 1, startObj.day);
            endDate.setDate(endDate.getDate() + 30);
            let fendDate = this.DateFormatter(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());
            if (this.DateToVal(fendDate) >= todayVal) {
                endDate = today;
                endDate.setDate(endDate.getDate() - 1);
                fendDate = this.DateFormatter(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());
            }
            let dataProcessed = false;
            await FetchAMonth(this.lastCacheDate, fendDate).then(res => {
                for (let i in res) {
                    let Obj = NASAImgObj(res[i]);
                    if (!this.ImgInCache(Obj.date)) {
                        if (Math.random() > 0.5) {
                            this.NASAImgObjList.push(Obj);
                        }

                    }

                }

                localStorage.setItem("myCache", JSON.stringify(jsonh.pack(this.NASAImgObjList)));
                //console.log(JSON.stringify(localStorage).length);

                dataProcessed = true;
            },
                e => console.log(e));

            if (dataProcessed) {
                endDate.setDate(endDate.getDate() + 1);
                this.lastCacheDate = this.DateFormatter(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());
                lastCacheDateVal = this.DateToVal(this.lastCacheDate);
                localStorage.setItem('myDate', this.lastCacheDate);
            }
        }
        this.endlessCacheOngoing = false;
    }

    DateFormatter = (year, month, day) => {
        let fyear = year;
        let fmonth = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(month);
        let fday = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(day);
        return `${fyear}-${fmonth}-${fday}`;
    }

    DateToVal = (date) => {
        let regex = /(\d\d\d\d)-(\d\d)-(\d\d)/;

        let match = date.match(regex);
        let val = parseInt(match[1]) * 365 + parseInt(match[2]) * 30 + parseInt(match[3]);
        return val;
    }

    DateToObj = (date) => {
        let regex = /(\d\d\d\d)-(\d\d)-(\d\d)/;

        let match = date.match(regex);
        let obj = {
            year: parseInt(match[1]),
            month: parseInt(match[2]),
            day: parseInt(match[3])
        }
        return obj;
    }

    GetImgIndex = (date) => {
        return this.NASAImgObjList.findIndex(x => x.date == date);
    }

    ImgInCache = (date) => {
        return (this.GetImgIndex(date) >= 0);
    }

    GetSeenImgs = () => {
        return this.NASAImgObjList.filter(x => x.seen).map(a => ({ ...a }));
    }

    GetUnseenImgs = () => {
        return this.NASAImgObjList.filter(x => !(x.seen)).map(a => ({ ...a }));
    }

    SetImgStatus = (date, status) => {
        let index = this.GetImgIndex(date);
        if (index >= 0) {
            let nasaImgObj = this.NASAImgObjList[index];
            nasaImgObj.seen = true;
            nasaImgObj.status = status;

            // let tempList = JSON.parse(localStorage.getItem("Cache" + nasaImgObj.cacheID.toString()));

            // index = tempList.findIndex(x => (x.date == date));

            // tempList[index].seen = true;
            // tempList[index].status = status;

            localStorage.setItem("myCache", JSON.stringify(jsonh.pack(this.NASAImgObjList)));
        }

    }

    GetRandomUnseen = (list) => {
        let ran = Math.floor(Math.random() * list.length);
        return list[ran];
    }

    SortListByStyle = (list, i) => {

        switch (i) {

            case 3:
                return this.SortListByDislike(list);

            case 2:
                return this.SortListByLike(list);

            case 1:
                return this.SortListByDate(list, true);

            case 0:
            default:
                return this.SortListByDate(list, false);

        }
    }

    SortListByDate = (list, ascend) => {
        return list.sort((a, b) => {

            let res = 1;

            if (!ascend) {
                res = res * -1;
            }

            let aVal = this.DateToVal(a.date);
            let bVal = this.DateToVal(b.date);

            if (aVal > bVal) {
                return res;
            } else if (aVal < bVal) {
                return -res;
            } else {
                return 0;
            }

        });
    }

    SortListByLike = (list) => {
        return list.sort((a, b) => {
            if (a.status == b.status) {
                return 0;
            } else {
                if (a.status) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
    }

    SortListByDislike = (list) => {
        return list.sort((a, b) => {
            if (a.status == b.status) {
                return 0;
            } else {
                if (a.status) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
    }

}

export const NASAImgObj = (parsedData) => {
    return {
        seen: false,
        status: false,
        date: parsedData.date,
        title: parsedData.title,
        desc: parsedData.explanation,
        imgSrc: (parsedData.media_type == "image") ? parsedData.url : parsedData.thumbnail_url,
        //cacheID: 0
    }
}