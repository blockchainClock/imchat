// 在线状态
export const getOnlineStateFromSvr = (userID) =>
  uni.$u?.http.post(
    "/user/get_users_status",
    JSON.stringify({
      userID,
      userIDs: [userID],
    }),
    {
      custom: {
        isIMApi: true,
      },
      header: {
        token: uni.getStorageSync("IMToken"),
      },
    },
  );

  export const getRtcConnectData = (room, identity) =>
  
    uni.$u?.http.post(
      "/user/rtc/get_token",
      JSON.stringify({
        room,
        identity,
      }),
      {
        header: {
          token: uni.getStorageSync("BusinessToken"),
        },
      }
    );
  
export const getBusinessInfo = (userID, targetID) =>
  uni.$u?.http.post(
    "/user/find/full",
    JSON.stringify({ userIDs: [userID] }),
    {
      headers: {
        token: getChatToken(),
      },
    },
  );
export const subUserOnlineStatus = (userID, targetID) =>
  uni.$u?.http.post(
    "/user/subscribe_users_status",
    JSON.stringify({
      userID,
      userIDs: [targetID],
      genre: 1,
    }),
    {
      custom: {
        isIMApi: true,
      },
      header: {
        token: uni.getStorageSync("IMToken"),
      },
    },
  );

export const unSubUserOnlineStatus = (userID, targetID) =>
  uni.$u?.http.post(
    "/user/unsubscribe_users_status",
    JSON.stringify({
      userID,
      userIDs: [targetID],
      genre: 2,
    }),
    {
      custom: {
        isIMApi: true,
      },
      header: {
        token: uni.getStorageSync("IMToken"),
      },
    },
  );
