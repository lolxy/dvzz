// API
const apiURL = 'https://www.dovzs.com/APPDWERP';

const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

// 获取主材商城首页banner图片
const getMallBanner = (params) => {
  wxRequest(params, `${apiURL}/app/picture/loadBanner.do`);
};

// 获取主材商城首页菜单
const getMallMenu = (params) => {
  wxRequest(params, `${apiURL}/wx/shop/indexMenu.do`);
};

module.exports = {
  getMallBanner,
  getMallMenu
};