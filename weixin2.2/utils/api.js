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

// 获取当前城市列表名称
const getCurrentCityInfo = (params) => {
  wxRequest(params, 'https://apis.map.qq.com/ws/geocoder/v1/');
};

// 获取扫码数据
const getScanCode = (params) => {
  wxRequest(params, `${apiURL}/app/selectmat/scanCode.do`);
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

// 获取当前商品的评论列表
const getCurrentGoodsEvaluate = (params) => {
  wxRequest(params, `${apiURL}/wx/shopCity/queryMatEvaluete.do`);
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

/**************
 *  预算接口 **
 * ************/
// 获取游客信息
const getTouristExpInfo = (params) => {
  wxRequest(params, `${apiURL}/wx / mainBudget / addTouristExp.do`);
};

//  获取预算首页分类
const getBudgetCate = (params) => {
  wxRequest(params, `${apiURL}/wx/mainBudget/queryType.do`);
};

// 获取预算首页分类列表
const getBudgetCatList = (params) => {
  wxRequest(params, `${apiURL}/wx/mainBudget/queryTypeList.do`);
}; 

// 获取预算分类
const getBudgetByIdCatList = (params) => {
  wxRequest(params, `${apiURL}/wx/mainBudget/queryfSeriesList.do`);
}; 

// 获取主材预算列表
const getBudgetGoodsList = (params) => {
  wxRequest(params, `${apiURL}/wx/mainBudget/querySelectMatList.do`);
}; 

// 获取新增选材参数列表
const getParamList = (params) => {
  wxRequest(params, `${apiURL}/app/data/query.do`);
}; 

// 新增选材提交
const postAddSelectMat = (params) => {
  wxRequest(params, `${apiURL}/wx/mainBudget/addSelectMatDetail.do`);
}; 

module.exports = {
  getScanCode,
  getCurrentCityInfo,
  getMallBanner,
  getMallMenu,
  getHomeRecommonList,
  getCategoryList,
  getDetail,
  getDetailMallList,
  getBrandList,
  getGoodsList,
  getFilterField,
  getCurrentGoodsEvaluate,
  getBudgetCate,
  getBudgetCatList,
  getTouristExpInfo,
  getBudgetByIdCatList,
  getBudgetGoodsList,
  getParamList,
  postAddSelectMat
};