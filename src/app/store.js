import { configureStore } from '@reduxjs/toolkit';

import { createEpicMiddleware, combineEpics, ofType } from 'redux-observable';
import { mapTo, map, mergeMap } from 'rxjs/operators';

import { SessionManager } from '../js/SessionHandler';

import { REQUESTHOMEIMGEPIC, REQUESTHOMEIMG, LIKEDONHOME, DISLIKEONHOME, UPDATESTATUSEPIC, TOGGLESTATUSEPIC, UPDATESTATUS, PENDINGONHOME, DOTRANSITION, TRANSITIONCOMPLETE, SORTREQUESTEPIC, SORTREQUEST, SEENITALL } from './actions';

let myManager = new SessionManager();

const HomeImgObjReducer = (state = {}, action) => {
  switch (action.type) {

    case DOTRANSITION:
    case REQUESTHOMEIMG:
      let Obj = { ...myManager.GetRandomUnseen(myManager.GetUnseenImgs()) };
      if (!Obj) {
        return {};
      } else {
        return Obj;
      }

    default:
      return state;
  }

}

const HomeUserActionReduer = (state = "pending", action) => {

  switch (action.type) {

    case PENDINGONHOME:
      return "pending";

    case LIKEDONHOME:
      return "like";

    case DISLIKEONHOME:
      return "dislike";

    default:
      return state;
  }

}

const HomeImgTransitionReducer = (state = false, action) => {

  switch (action.type) {

    case DOTRANSITION:
      return true;

    case TRANSITIONCOMPLETE:
      return false;

    default:
      return state;
  }

}

const homeUpdateEpic = (action$, state$) => action$.pipe(
  ofType(UPDATESTATUSEPIC),
  map(action => {
    myManager.SetImgStatus(state$.value.HomeImgObj.date, action.data);
  }),
  mapTo({ type: UPDATESTATUS })
);

const toggleUpdateEpic = action$ => action$.pipe(
  ofType(TOGGLESTATUSEPIC),
  map(action => {
    myManager.SetImgStatus(action.data.date, action.data.status);
  }),
  mapTo({ type: UPDATESTATUS })
);

const sortRequestEpic = action$ => action$.pipe(
  ofType(SORTREQUESTEPIC),
  map(action => {
    myManager.sortStyle = action.data;
    localStorage.setItem('myStyle', myManager.sortStyle);
    return action;
  }),
  map(action => ({ type: SORTREQUEST, data: action.data }))
);

const requestImgEpic = action$ => action$.pipe(
  ofType(REQUESTHOMEIMGEPIC),
  map(action => {
    if (myManager.GetUnseenImgs().length == 0) {
      if (!(myManager.endlessCacheOngoing)) {
        return ({ type: SEENITALL });
      }
    } else {
      return ({ type: REQUESTHOMEIMG });
    }
  })
);

const SortyStyleReducer = (state = myManager.sortStyle, action) => {
  switch (action.type) {

    case SORTREQUEST:
      return action.data;

    default:
      return state;
  }
}

const CollectionObjReducer = (state = myManager.SortListByStyle(myManager.GetSeenImgs(), myManager.sortStyle), action) => {

  switch (action.type) {

    case SORTREQUEST:
      let unSortedList = [...state];
      return myManager.SortListByStyle(unSortedList, action.data);

    case UPDATESTATUS:
      return myManager.SortListByStyle(myManager.GetSeenImgs(), myManager.sortStyle);

    default:
      return state;
  }

}

const SeenAllReducer = (state = false, action) => {

  switch (action.type) {

    case SEENITALL:

      return true;

    default:
      return state;
  }

}

const rootEpic = combineEpics(
  homeUpdateEpic,
  toggleUpdateEpic,
  sortRequestEpic,
  requestImgEpic
);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    CollectionObj: CollectionObjReducer,
    SortStyle: SortyStyleReducer,
    HomeImgObj: HomeImgObjReducer,
    HomeUserAction: HomeUserActionReduer,
    HomeImgTransition: HomeImgTransitionReducer,
    SeenAll: SeenAllReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);

const InitializeManager = async () => {
  if (myManager.NASAImgObjList.length == 0) {
    console.log("manager empty");
    await myManager.Initialize();
    store.dispatch({ type: REQUESTHOMEIMGEPIC });
  }
}

InitializeManager().then(() => {
  myManager.EndlessCache();
  let intervalID = setInterval(() => {
    if (Object.keys(store.getState().HomeImgObj).length == 0) {
      console.log("Interval looking");
      if (myManager.GetUnseenImgs().length > 0) {
        console.log("Interval used");
        store.dispatch({ type: REQUESTHOMEIMGEPIC });
      }
    }
  }, 2500);
});
