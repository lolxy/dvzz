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

// 获取主材商城首页推荐商品列表
const getHomeRecommonList = (params) => {
  wxRequest(params, `${apiURL}/wx/shop/recommendMatList.do`);
};

// 获取一二级分类列表
const getCategoryList = (params) => {
  wxRequest(params, `${apiURL}/app/mat/queryMatType.do`);
};

// 获取商品详情信息
const getDetail = (params) => {
  wxRequest(params, `${apiURL}/wx/shopmat/queryMatByID.do`);
};

// 获取商品详情信息的商城列表
const getDetailMallList = (params) => {
  wxRequest(params, `${apiURL}/wx/shopmat/queryMatByShopcity.do`);
};

// 根据分类获取主材商城商品品牌列表
const getBrandList = (params) => {
  wxRequest(params, `${apiURL}/wx/shopmat/queryBrandList.do`);
};

// 根据分类获取主材商城商品列表
const getGoodsList = (params) => {
  wxRequest(params, `${apiURL}/wx/shopmat/queryMatList.do`);
};

// 获取商品列表可供筛选的数据
const getFilterField = (params) => {
  wxRequest(params, `${apiURL}/wx/shopmat/morefilterinit.do`);
};

module.exports = {
  getMallBanner,
  getMallMenu,
  getHomeRecommonList,
  getCategoryList,
  getDetail,
  getDetailMallList,
  getBrandList,
  getGoodsList,
  getFilterField
};