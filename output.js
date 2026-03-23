//Mon Mar 23 2026 01:05:15 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const querystring = require("querystring");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const {
  SocksProxyAgent
} = require("socks-proxy-agent");
const dns = require("dns");
const {
  promisify
} = require("util");
const util = require("util");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "114.114.114.114", "223.5.5.5"]);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const CURRENT_VERSION = "1.8.6";
const UPDATE_CHECK_URL = "http://47.239.198.88:8080/ks-update-info";
let updateInfo = null;
let localPublicIP = null;
let GLOBAL_TOTAL_EARNED_COINS = 0;
function parseTaskConfig() {
  const _0x210aee = process.env.kstask || "food,2";
  if (!_0x210aee) {
    console.log("未设置 kstask 环境变量，将使用默认空配置");
    return [];
  }
  try {
    return _0x210aee.split(";").map(_0x1d5075 => {
      const _0x267c6a = _0x1d5075.split(",").map(_0x139df7 => _0x139df7.trim());
      if (_0x267c6a.length < 2) {
        return null;
      }
      const _0x23ed68 = _0x267c6a[0];
      const _0x19ff70 = parseInt(_0x267c6a[1]);
      if (!_0x23ed68 || isNaN(_0x19ff70) || _0x19ff70 <= 0) {
        return null;
      }
      return {
        type: _0x23ed68,
        targetCount: _0x19ff70
      };
    }).filter(_0x47a172 => _0x47a172 !== null);
  } catch (_0x4a4b05) {
    console.log("❌ 解析 kstask 变量失败，请检查格式，将使用默认配置：look,1;food,2");
    return [{
      type: "look",
      targetCount: 1
    }, {
      type: "food",
      targetCount: 2
    }];
  }
}
const ENV_CONFIG = {
  TASK_CONFIG: parseTaskConfig(),
  CYCLE_ROUNDS: parseInt(process.env.KS_CYCLE_ROUNDS || 0),
  WATCH_MIN: parseInt(process.env.KS_WATCH_MIN || 50),
  WATCH_MAX: parseInt(process.env.KS_WATCH_MAX || 61),
  AD_FAIL_LIMIT: parseInt(process.env.KS_AD_FAIL_LIMIT || 5),
  PHP_PROXY_URL: process.env.PHP_PROXY_URL || "http://115.191.27.229:54188/qm.php",
  PHP_PROXY_URL_DOUBLE: process.env.PHP_PROXY_URL_DOUBLE || process.env.PHP_PROXY_URL || "http://115.191.27.229:54188/qmfb.php",
  PHP_PROXY_URL_BASIC: process.env.PHP_PROXY_URL_BASIC || process.env.PHP_PROXY_URL || "http://115.191.27.229:54188/qmbd.php",
  CONTINUOUS_1COIN_LIMIT: parseInt(process.env.KS_CONTINUOUS_1COIN_LIMIT || 3),
  LOG_TARGET: process.env.KS_LOG_TARGET || "PO",
  LOG_LEVEL: process.env.KS_LOG_LEVEL || "simple",
  PROXY_CONNECT_TIMEOUT: parseInt(process.env.KS_PROXY_TIMEOUT || 100),
  PROXY_KEEP_ALIVE: process.env.KS_PROXY_KEEP_ALIVE === "true" || false,
  PLATFORM_CONFIG: {
    KUAISHOU: {
      name: "普通",
      accountInfoUrl: "https://encourage.kuaishou.com/rest/wd/encourage/account/basicInfo",
      host: "encourage.kuaishou.com",
      kpn: "KUAISHOU"
    },
    NEBULA: {
      name: "极速",
      accountInfoUrl: "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo",
      host: "nebula.kuaishou.com",
      kpn: "NEBULA"
    }
  }
};
function logDev(_0x2f0ec8, _0x218326 = null) {
  if (ENV_CONFIG.LOG_TARGET !== "DEV") {
    return;
  }
  console.log("\n🔧 [开发者日志] " + _0x2f0ec8);
  _0x218326 && console.log("   详情: " + util.inspect(_0x218326, {
    depth: ENV_CONFIG.LOG_LEVEL === "detail" ? 5 : 2
  }));
}
function logUser(_0x429563, _0x3b4cc0 = "info") {
  const _0x2d8c29 = {
    info: "ℹ️",
    success: "✅",
    warn: "⚠️",
    error: "❌"
  };
  const _0x528946 = _0x2d8c29[_0x3b4cc0] || "ℹ️";
  console.log(_0x528946 + " " + _0x429563);
}
function logError(_0x35b1c6, _0x38c912, _0x4e4a08 = "") {
  logUser(_0x35b1c6, "error");
  if (ENV_CONFIG.LOG_TARGET === "DEV") {
    console.log("\n❌ [开发者日志-错误详情] " + (_0x4e4a08 || "未知上下文"));
    console.log("   错误信息: " + (_0x38c912.message || "无"));
    ENV_CONFIG.LOG_LEVEL === "detail" && _0x38c912.stack && console.log("   错误堆栈: " + _0x38c912.stack.substring(0, 800));
    _0x38c912.config && console.log("   请求配置: " + util.inspect(_0x38c912.config, {
      depth: 2
    }));
    _0x38c912.response && (console.log("   响应状态: " + (_0x38c912.response.status || "无")), console.log("   响应数据: " + util.inspect(_0x38c912.response.data, {
      depth: 2
    })));
    console.log("----------------------------------------");
  }
}
const IP_DETECTION_APIS = ["http://icanhazip.com", "https://ipv4.icanhazip.com", "https://v4.ident.me", "https://ipv4.gdt.qq.com/get_client_ip", "https://myip.ipip.net", "http://ipinfo.io/ip", "http://httpbin.org/ip"];
async function getPublicIP() {
  logUser("🔍 正在检测本地直连公网IP...", "info");
  for (const _0x2c21dd of IP_DETECTION_APIS) {
    try {
      const _0x301988 = await axios.get(_0x2c21dd, {
        timeout: 5000,
        responseType: "text",
        proxy: false
      });
      const _0x19e2be = _0x301988.data.trim().match(/\d+\.\d+\.\d+\.\d+/);
      if (_0x19e2be && _0x19e2be[0]) {
        const _0x3b5bed = _0x19e2be[0];
        localPublicIP = _0x3b5bed;
        logUser(" 本地直连公网IP检测成功: " + _0x3b5bed, "success");
        return _0x3b5bed;
      }
    } catch (_0x31fa29) {
      logDev("本地IP检测失败-" + _0x2c21dd, _0x31fa29.message);
      continue;
    }
  }
  logError("本地直连公网IP检测失败，网络异常", new Error("所有IP检测接口请求失败"), "本地公网IP检测");
  process.exit(1);
}
async function checkSocks5ProxyHealth(_0x37f85c) {
  const _0x51ddb4 = 5;
  let _0x584816 = 0;
  const _0x2b6fba = "https://ipv4.gdt.qq.com/get_client_ip";
  if (!validateSocks5ProxyUrl(_0x37f85c)) {
    return {
      ok: false,
      msg: "❌ 无效的Socks5代理URL格式",
      ip: null
    };
  }
  logDev("开始SOCKS5代理健康检测，最多" + _0x51ddb4 + "次重试");
  while (_0x584816 < _0x51ddb4) {
    try {
      const _0x20717d = {
        timeout: ENV_CONFIG.PROXY_CONNECT_TIMEOUT,
        keepAlive: ENV_CONFIG.PROXY_KEEP_ALIVE,
        keepAliveMsecs: 30000,
        maxSockets: 1,
        maxFreeSockets: 0
      };
      const _0x26521e = new SocksProxyAgent(_0x37f85c, _0x20717d);
      const _0x70214 = await axios.get(_0x2b6fba, {
        httpAgent: _0x26521e,
        httpsAgent: _0x26521e,
        timeout: 10000,
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "*/*",
          Cookie: "pgv_pvid=2059158520; fqm_pvqid=28d9ba83-df83-4304-98c6-dbae8b6c200b"
        },
        proxy: false
      });
      if (_0x70214.status === 200 && _0x70214.data && typeof _0x70214.data === "string") {
        const _0x260e02 = _0x70214.data.trim();
        if (_0x260e02 && _0x260e02 !== "") {
          const _0x2cd8c3 = "SOCKS5代理正常，出口IP: " + _0x260e02;
          logUser(_0x2cd8c3, "success");
          return {
            ok: true,
            msg: _0x2cd8c3,
            ip: _0x260e02
          };
        }
      }
      throw new Error("接口返回无效IP数据");
    } catch (_0x1810e5) {
      _0x584816++;
      logDev("SOCKS5代理检测第" + _0x584816 + "次失败", _0x1810e5.message);
      if (_0x584816 >= _0x51ddb4) {
        return {
          ok: false,
          msg: "❌ SOCKS5代理检测失败（已重试" + _0x51ddb4 + "次）：" + _0x1810e5.message,
          ip: null
        };
      }
      await new Promise(_0x23ef1c => setTimeout(_0x23ef1c, 1000));
    }
  }
  return {
    ok: false,
    msg: "❌ SOCKS5代理检测未知错误",
    ip: null
  };
}
async function getProxyExitIP(_0xf2a625) {
  logUser("🔍 正在检测代理出口IP...", "info");
  const _0xa3d65 = await checkSocks5ProxyHealth(_0xf2a625);
  if (!_0xa3d65.ok) {
    logError(_0xa3d65.msg, new Error(_0xa3d65.msg), "代理IP检测-健康校验");
    return null;
  }
  return _0xa3d65.ip;
}
function validateSocks5ProxyUrl(_0x49b79d) {
  if (!_0x49b79d || typeof _0x49b79d !== "string") {
    logDev("代理URL校验失败", "代理URL为空或非字符串");
    return false;
  }
  const _0x534fb0 = /^socks5:\/\/(?:[a-zA-Z0-9:_.-]+@)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[?[a-fA-F0-9:]+\]?):\d{1,5}$/;
  if (!_0x534fb0.test(_0x49b79d)) {
    logDev("代理URL校验失败", "不符合Socks5格式要求：" + _0x49b79d + "，正确格式示例：socks5://127.0.0.1:1080");
    return false;
  }
  return true;
}
function compareVersions(_0x478713, _0x55891d) {
  const _0x4b7b9c = _0x478713.split(".").map(Number);
  const _0x1085c1 = _0x55891d.split(".").map(Number);
  const _0x250da7 = Math.max(_0x4b7b9c.length, _0x1085c1.length);
  for (let _0x5df0fc = 0; _0x5df0fc < _0x250da7; _0x5df0fc++) {
    const _0x5327ce = _0x4b7b9c[_0x5df0fc] || 0;
    const _0x4926ae = _0x1085c1[_0x5df0fc] || 0;
    if (_0x5327ce > _0x4926ae) {
      return 1;
    }
    if (_0x5327ce < _0x4926ae) {
      return -1;
    }
  }
  return 0;
}
async function checkForUpdates() {
  logUser("🔍 正在检查脚本更新... 当前版本: " + CURRENT_VERSION, "info");
  try {
    const _0x321b39 = await axios.get(UPDATE_CHECK_URL, {
      timeout: 10000,
      validateStatus: _0x273caa => _0x273caa === 200,
      proxy: false
    });
    updateInfo = _0x321b39.data;
    logDev("更新检查接口返回数据", updateInfo);
    if (!updateInfo.latestVersion) {
      logUser("未获取到最新版本信息", "warn");
      return false;
    }
    const _0x54f6a5 = compareVersions(CURRENT_VERSION, updateInfo.latestVersion);
    if (_0x54f6a5 === 0) {
      logUser("当前版本(" + CURRENT_VERSION + ")为最新版本", "info");
    } else {
      _0x54f6a5 === 1 ? logUser("当前版本(" + CURRENT_VERSION + ")高于最新版本(" + updateInfo.latestVersion + ")，可能是测试版本", "info") : logUser("检测到新版本(" + updateInfo.latestVersion + ")，当前版本(" + CURRENT_VERSION + ")可更新", "info");
    }
    return true;
  } catch (_0x4c7c68) {
    logError("脚本更新检查失败，跳过更新", _0x4c7c68, "脚本版本更新检查");
    return false;
  }
}
function cleanHeaderValue(_0x4a3233) {
  if (typeof _0x4a3233 !== "string") {
    _0x4a3233 = String(_0x4a3233 || "");
  }
  return _0x4a3233.replace(/[\x00-\x1F\x7F\u2000-\u200F\u3000]/g, "").trim().replace(/[^\x20-\x7E]/g, "");
}
async function request(_0x50d1a6, _0x5855e2 = null, _0x2b9d3a = "通用请求") {
  try {
    const _0x245319 = {
      method: _0x50d1a6.method || "GET",
      url: _0x50d1a6.url,
      headers: {},
      data: _0x50d1a6.body || _0x50d1a6.form,
      timeout: _0x50d1a6.timeout || 12000,
      https: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
      },
      validateStatus: () => true
    };
    if (_0x5855e2) {
      const _0x116edd = validateSocks5ProxyUrl(_0x5855e2);
      if (!_0x116edd) {
        throw new Error("无效的Socks5代理URL格式");
      }
      const _0x1cd480 = {
        timeout: ENV_CONFIG.PROXY_CONNECT_TIMEOUT,
        keepAlive: ENV_CONFIG.PROXY_KEEP_ALIVE,
        keepAliveMsecs: 30000,
        maxSockets: 1,
        maxFreeSockets: 0
      };
      const _0x13865c = new SocksProxyAgent(_0x5855e2, _0x1cd480);
      _0x245319.httpAgent = _0x13865c;
      _0x245319.httpsAgent = _0x13865c;
      _0x245319.proxy = false;
    } else {
      _0x245319.proxy = false;
    }
    if (_0x50d1a6.headers) {
      for (const [_0x3d391b, _0x27071b] of Object.entries(_0x50d1a6.headers)) {
        _0x245319.headers[_0x3d391b] = cleanHeaderValue(_0x27071b);
      }
    }
    _0x50d1a6.form && _0x50d1a6.method === "POST" && !_0x245319.headers["Content-Type"] && (_0x245319.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8", _0x245319.data = querystring.stringify(_0x50d1a6.form));
    logDev(_0x2b9d3a + " - 请求配置", {
      url: _0x245319.url,
      method: _0x245319.method,
      proxy: _0x5855e2 || "无"
    });
    const _0x4a97fc = await axios(_0x245319);
    logDev(_0x2b9d3a + " - 响应状态", _0x4a97fc.status);
    return {
      body: _0x4a97fc.data,
      status: _0x4a97fc.status
    };
  } catch (_0x22bdc1) {
    let _0x556eac = _0x22bdc1.message;
    _0x5855e2 && _0x556eac.includes("Socks") && (_0x556eac = "代理连接异常：" + _0x556eac + "（代理URL：" + _0x5855e2 + "）");
    logError(_0x2b9d3a + " 执行失败", new Error(_0x556eac), _0x2b9d3a);
    return {
      body: null,
      status: 0
    };
  }
}
function getPlatformFromCookie(_0x9b2244) {
  const _0x2c350a = _0x9b2244.match(/kpn=([^;]+)/);
  const _0x516524 = _0x2c350a ? _0x2c350a[1].toUpperCase() : "NEBULA";
  return ENV_CONFIG.PLATFORM_CONFIG[_0x516524] || ENV_CONFIG.PLATFORM_CONFIG.NEBULA;
}
async function getAdConfigFromPHP(_0x403e14, _0x31ea98, _0x646d36, _0x330fef, _0x236fb3, _0x17750c) {
  try {
    logDev("[" + _0x403e14.name + "] 请求" + _0x31ea98 + "广告配置-参数", {
      kpn: _0x403e14.kpn,
      taskType: _0x31ea98,
      ip: _0x236fb3
    });
    const {
      body: _0x3e85e1
    } = await request({
      method: "POST",
      url: ENV_CONFIG.PHP_PROXY_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanHeaderValue(_0x17750c)
      },
      body: JSON.stringify({
        action: "get_ad_config",
        key: cleanHeaderValue(_0x17750c),
        kpn: _0x403e14.kpn,
        task_type: _0x31ea98,
        salt: _0x646d36,
        ck: _0x330fef,
        ip: _0x236fb3
      }),
      timeout: 15000
    }, null, "[" + _0x403e14.name + "] 获取" + _0x31ea98 + "广告配置");
    logDev("[" + _0x403e14.name + "] " + _0x31ea98 + "广告配置-PHP返回", _0x3e85e1);
    if (_0x3e85e1 && _0x3e85e1.code === 200 && _0x3e85e1.data?.["request_config"]) {
      logUser("[" + _0x403e14.name + "] 成功获取" + _0x31ea98 + "广告配置", "success");
      return {
        requestConfig: _0x3e85e1.data.request_config,
        taskParams: _0x3e85e1.data.task_params
      };
    }
    logUser("[" + _0x403e14.name + "] 获取" + _0x31ea98 + "广告配置失败: " + (_0x3e85e1?.["msg"] || "PHP返回无有效配置"), "error");
    return null;
  } catch (_0x1608b5) {
    logError("[" + _0x403e14.name + "] 获取" + _0x31ea98 + "广告配置异常", _0x1608b5, "[" + _0x403e14.name + "] " + _0x31ea98 + "广告配置请求");
    return null;
  }
}
async function getReportConfigFromPHP(_0x25a37c, _0x3e23ba, _0x26b34a, _0x3cc0f5, _0x2f712a, _0x26be56, _0x177ba6, _0x5f155c) {
  try {
    const _0x5cf380 = ["creativeId", "llsid", "startTime", "endTime"];
    const _0x34e1af = _0x5cf380.filter(_0x300e16 => !_0x26be56[_0x300e16]);
    if (_0x34e1af.length > 0) {
      logError("[" + _0x25a37c.name + "] 获取" + _0x3e23ba + "报告配置失败", new Error("缺失必要参数: " + _0x34e1af.join(",")), "[" + _0x25a37c.name + "] " + _0x3e23ba + "报告配置参数校验");
      return null;
    }
    let _0x3a4cf2 = "get_report_config";
    let _0x33ebd1 = ENV_CONFIG.PHP_PROXY_URL;
    if (_0x5f155c > 1000) {
      _0x33ebd1 = ENV_CONFIG.PHP_PROXY_URL_DOUBLE;
    } else {
      if (_0x5f155c === 1) {
        _0x33ebd1 = ENV_CONFIG.PHP_PROXY_URL_BASIC;
      }
    }
    logDev("[" + _0x25a37c.name + "] 请求" + _0x3e23ba + "报告配置-参数", {
      kpn: _0x25a37c.kpn,
      taskType: _0x3e23ba,
      creativeId: _0x26be56.creativeId,
      action: _0x3a4cf2,
      expectedCoins: _0x5f155c,
      phpUrl: _0x33ebd1
    });
    const {
      body: _0x4dcdba
    } = await request({
      method: "POST",
      url: _0x33ebd1,
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanHeaderValue(_0x177ba6)
      },
      body: JSON.stringify({
        action: _0x3a4cf2,
        key: cleanHeaderValue(_0x177ba6),
        kpn: _0x25a37c.kpn,
        task_type: _0x3e23ba,
        salt: _0x26b34a,
        ck: _0x3cc0f5,
        ip: _0x2f712a,
        ..._0x26be56
      }),
      timeout: 15000
    }, null, "[" + _0x25a37c.name + "] 获取" + _0x3e23ba + "报告配置");
    logDev("[" + _0x25a37c.name + "] " + _0x3e23ba + "报告配置-PHP返回", _0x4dcdba);
    if (_0x4dcdba && _0x4dcdba.code === 200 && _0x4dcdba.data?.["request_config"]) {
      logUser("[" + _0x25a37c.name + "] 成功获取" + _0x3e23ba + "报告签名配置", "success");
      return _0x4dcdba.data.request_config;
    }
    logUser("[" + _0x25a37c.name + "] 获取" + _0x3e23ba + "报告配置失败: " + (_0x4dcdba?.["msg"] || "PHP返回无有效签名"), "error");
    return null;
  } catch (_0x3786f9) {
    logError("[" + _0x25a37c.name + "] 获取" + _0x3e23ba + "报告配置异常", _0x3786f9, "[" + _0x25a37c.name + "] " + _0x3e23ba + "报告配置请求");
    return null;
  }
}
async function getAccountBasicInfo(_0x11f9f1, _0x221eb2, _0x39b714) {
  try {
    logDev("[" + _0x221eb2.name + "] 账户信息请求-参数", {
      url: _0x221eb2.accountInfoUrl,
      proxy: _0x39b714 || "无"
    });
    const {
      body: _0x3ffb23
    } = await request({
      method: "GET",
      url: _0x221eb2.accountInfoUrl,
      headers: {
        Host: _0x221eb2.host,
        "User-Agent": "kwai-android aegon/3.56.0",
        Cookie: _0x11f9f1
      },
      timeout: 12000
    }, _0x39b714, "[" + _0x221eb2.name + "] 账户基础信息请求");
    logDev("[" + _0x221eb2.name + "] 账户信息返回数据", _0x3ffb23);
    if (!_0x3ffb23) {
      logError("[" + _0x221eb2.name + "] 账户信息请求无返回", new Error("接口返回空数据"), "[" + _0x221eb2.name + "] 账户基础信息请求");
      return {
        success: false,
        ckExpired: true
      };
    }
    if (_0x221eb2.kpn === "KUAISHOU" && _0x3ffb23.result === 1 && _0x3ffb23.data) {
      const _0x276b9f = Number(_0x3ffb23.data.coinAmount) || 0;
      const _0x2a67f2 = Number(_0x3ffb23.data.cashAmountDisplay) || 0;
      return {
        nickname: _0x3ffb23.data.userData?.["nickname"],
        totalCoin: _0x276b9f,
        allCash: _0x2a67f2,
        success: true,
        ckExpired: false
      };
    } else {
      if (_0x221eb2.kpn === "NEBULA" && _0x3ffb23.result === 1 && _0x3ffb23.data) {
        const _0x371b46 = Number(_0x3ffb23.data.totalCoin) || 0;
        const _0x2d3efb = Number(_0x3ffb23.data.allCash) || 0;
        return {
          nickname: _0x3ffb23.data.userData?.["nickname"],
          totalCoin: _0x371b46,
          allCash: _0x2d3efb,
          success: true,
          ckExpired: false
        };
      }
    }
    logUser("[" + _0x221eb2.name + "] 账户信息获取失败，Cookie可能已过期", "error");
    return {
      success: false,
      ckExpired: true
    };
  } catch (_0x5c16a1) {
    logError("[" + _0x221eb2.name + "] 账户信息请求异常", _0x5c16a1, "[" + _0x221eb2.name + "] 账户基础信息请求");
    return {
      success: false,
      ckExpired: true
    };
  }
}
class KuaishouAccount {
  constructor({
    index: _0x1bbc8a,
    salt: _0x58dc47,
    cookie: _0x346c07,
    remark = "未命名",
    proxyUrl = null,
    phpKey: _0x404bcf
  }) {
    this.index = _0x1bbc8a || 1;
    this.salt = _0x58dc47;
    this.cookie = _0x346c07;
    this.remark = remark;
    this.proxyUrl = proxyUrl;
    this.phpKey = _0x404bcf;
    this.platform = getPlatformFromCookie(_0x346c07);
    this.clientIP = null;
    this.stopAllTasks = false;
    this.continuous1CoinCount = 0;
    this.continuous1CoinLimit = ENV_CONFIG.CONTINUOUS_1COIN_LIMIT;
    this.adInfoFailCount = 0;
    this.maxAdInfoFailCount = ENV_CONFIG.AD_FAIL_LIMIT;
    this.taskQueue = ENV_CONFIG.TASK_CONFIG.map(_0xfebfcf => ({
      ..._0xfebfcf,
      currentCount: 0
    }));
    this.startTime = Date.now();
    this.endTime = this.startTime - 30000;
    this.taskStats = {};
    this.taskLimitReached = {};
    this.accountTotalEarned = 0;
    this.taskQueue.forEach(_0x3c339a => {
      this.taskStats[_0x3c339a.type] = {
        success: 0,
        failed: 0,
        totalReward: 0
      };
      this.taskLimitReached[_0x3c339a.type] = false;
    });
    logUser("[账号" + this.index + "] 初始化中...", "info");
    if (this.taskQueue.length > 0) {
      const _0x9dff37 = this.taskQueue.map(_0x211e42 => _0x211e42.type + "(" + _0x211e42.targetCount + "次)").join(", ");
      logUser("[账号" + this.index + "] 任务计划: " + _0x9dff37, "info");
    } else {
      logUser("[账号" + this.index + "] ⚠️ 没有配置任何任务 (kstask变量为空或格式错误)", "warn");
    }
    this.initExitIP();
  }
  async initExitIP() {
    try {
      if (this.proxyUrl) {
        const _0x2f6206 = await getProxyExitIP(this.proxyUrl);
        if (!_0x2f6206) {
          this.stopAllTasks = true;
          logError("[账号" + this.index + "] 初始化失败", new Error("代理IP检测无有效结果"), "[账号" + this.index + "] 代理IP初始化");
          return;
        }
        this.clientIP = _0x2f6206;
      } else {
        if (!localPublicIP) {
          await getPublicIP();
        }
        this.clientIP = localPublicIP;
      }
      logUser("[账号" + this.index + "] 初始化完成 | 出口IP: " + this.clientIP, "success");
    } catch (_0x4b5a9d) {
      this.stopAllTasks = true;
      logError("[账号" + this.index + "] 初始化失败", _0x4b5a9d, "[账号" + this.index + "] IP初始化");
    }
  }
  async retryOperation(_0x39e159, _0x45748a, _0x4dadb2 = 3) {
    let _0x1badfb = 0;
    while (_0x1badfb < _0x4dadb2 && !this.stopAllTasks) {
      try {
        const _0x5ba0eb = await _0x39e159();
        if (_0x5ba0eb) {
          return _0x5ba0eb;
        }
      } catch (_0x572adf) {
        logDev(_0x45748a + " 第" + (_0x1badfb + 1) + "次重试失败", _0x572adf.message);
      }
      _0x1badfb++;
      _0x1badfb < _0x4dadb2 && !this.stopAllTasks && (await new Promise(_0x3ec54a => setTimeout(_0x3ec54a, 2000)));
    }
    logError(_0x45748a + " 重试失败", new Error("已重试" + _0x4dadb2 + "次仍无有效结果"), "[" + this.platform.name + "---" + this.remark + "] " + _0x45748a + "重试");
    return null;
  }
  async getAdInfo(_0x536f9e) {
    if (this.stopAllTasks) {
      return null;
    }
    logUser("[" + this.platform.name + "---" + this.remark + "] 开始获取" + _0x536f9e + "广告信息", "info");
    const _0x1d8f92 = await this.retryOperation(() => getAdConfigFromPHP(this.platform, _0x536f9e, this.salt, this.cookie, this.clientIP, this.phpKey), "获取" + _0x536f9e + "广告配置");
    if (!_0x1d8f92 || this.stopAllTasks) {
      !this.stopAllTasks && (this.adInfoFailCount++, logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x536f9e + "广告配置获取失败", "累计失败" + this.adInfoFailCount + "/" + this.maxAdInfoFailCount), this.adInfoFailCount >= this.maxAdInfoFailCount && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 广告获取失败次数达上限(" + this.maxAdInfoFailCount + "次)，停止当前账号任务", "error")));
      return null;
    }
    const {
      body: _0x412c4e
    } = await request({
      method: _0x1d8f92.requestConfig.method,
      url: _0x1d8f92.requestConfig.url,
      headers: _0x1d8f92.requestConfig.headers,
      form: _0x1d8f92.requestConfig.form,
      timeout: _0x1d8f92.requestConfig.timeout || 12000
    }, this.proxyUrl, "[" + this.platform.name + "---" + this.remark + "] " + _0x536f9e + "广告内容请求");
    if (!_0x412c4e || this.stopAllTasks) {
      this.adInfoFailCount++;
      logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x536f9e + "广告内容获取失败", "累计失败" + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
      this.adInfoFailCount >= this.maxAdInfoFailCount && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 广告获取失败次数达上限(" + this.maxAdInfoFailCount + "次)，停止当前账号任务", "error"));
      return null;
    }
    if (_0x412c4e.errorMsg === "OK" && _0x412c4e.feeds && _0x412c4e.feeds[0] && _0x412c4e.feeds[0].ad) {
      const _0x54d2df = _0x412c4e.feeds[0];
      const _0x4c4f50 = _0x54d2df.caption || _0x54d2df.ad.caption || "未知广告";
      const _0x5f2a9a = _0x4c4f50.length > 50 ? _0x4c4f50.substring(0, 50) + "..." : _0x4c4f50;
      let _0x1541a5 = 0;
      try {
        if (_0x54d2df.ad.extData) {
          const _0x3f5949 = JSON.parse(_0x54d2df.ad.extData);
          _0x1541a5 = Number(_0x3f5949.awardCoin) || 0;
        }
        _0x1541a5 === 0 && (_0x1541a5 = parseInt(_0x54d2df.ad.adDataV2?.["inspirePersonalize"]?.["awardValue"] || _0x54d2df.ad.adDataV2?.["inspireAdInfo"]?.["inspirePersonalize"]?.["neoValue"] || _0x54d2df.ad.awardCoin || 0) || 0);
      } catch (_0xa864d6) {
        logError("[" + this.platform.name + "---" + this.remark + "] 解析广告预计金币失败", _0xa864d6, "[" + this.platform.name + "---" + this.remark + "] " + _0x536f9e + "广告金币解析");
        _0x1541a5 = 0;
      }
      const _0x3156d7 = _0x54d2df.exp_tag || "";
      const _0x25ef72 = _0x3156d7.split("/")[1]?.["split"]("_")?.[0] || "";
      if (!_0x25ef72 || _0x25ef72.trim() === "") {
        logUser("[" + this.platform.name + "---" + this.remark + "] 获取广告失败", "error");
        this.adInfoFailCount++;
        logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x536f9e + "广告llsid解析失败（为空）", "累计失败" + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
        this.adInfoFailCount >= this.maxAdInfoFailCount && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 广告获取失败次数达上限(" + this.maxAdInfoFailCount + "次)，停止当前账号任务", "error"));
        return null;
      }
      logUser("[" + this.platform.name + "---" + this.remark + "] 成功获取广告：" + _0x5f2a9a + " |  预计获得" + _0x1541a5 + "金币 | llsid: " + _0x25ef72, "success");
      let _0x1ce51c = false;
      try {
        _0x1ce51c = _0x54d2df.ad.adDataV2?.["onceAgainRewardInfo"]?.["hasMore"] || false;
      } catch (_0x1b18a3) {
        logDev("[" + this.platform.name + "---" + this.remark + "] 解析追加广告标识失败", _0x1b18a3.message);
      }
      return {
        cid: _0x54d2df.ad.creativeId,
        llsid: _0x25ef72,
        hasRewardEnd: _0x1ce51c,
        expectedCoins: _0x1541a5
      };
    }
    this.adInfoFailCount++;
    logUser("[" + this.platform.name + "---" + this.remark + "] 获取广告失败", "error");
    logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x536f9e + "广告内容解析失败", "累计失败" + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
    this.adInfoFailCount >= this.maxAdInfoFailCount && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 广告获取失败次数达上限(" + this.maxAdInfoFailCount + "次)，停止当前账号任务", "error"));
    return null;
  }
  async submitReport(_0x80774b, _0x571d6a, _0x3837df, _0x3f7b92) {
    if (this.stopAllTasks) {
      return {
        success: false,
        reward: 0
      };
    }
    logUser("[" + this.platform.name + "---" + this.remark + "] 开始提交" + _0x3837df + "任务报告", "info");
    const _0x1a0fb6 = {
      creativeId: _0x80774b,
      llsid: _0x571d6a,
      startTime: this.startTime,
      endTime: this.endTime
    };
    const _0x195c60 = await this.retryOperation(() => getReportConfigFromPHP(this.platform, _0x3837df, this.salt, this.cookie, this.clientIP, _0x1a0fb6, this.phpKey, _0x3f7b92), "获取" + _0x3837df + "报告签名配置");
    if (!_0x195c60 || this.stopAllTasks) {
      return {
        success: false,
        reward: 0
      };
    }
    const _0x548947 = {
      method: _0x195c60.method,
      url: _0x195c60.url,
      headers: _0x195c60.headers,
      timeout: _0x195c60.timeout || 12000
    };
    if (_0x195c60.body) {
      _0x548947.form = querystring.parse(_0x195c60.body);
    } else {
      if (_0x195c60.form) {
        _0x548947.form = _0x195c60.form;
      }
    }
    const {
      body: _0x524af9
    } = await request(_0x548947, this.proxyUrl, "[" + this.platform.name + "---" + this.remark + "] " + _0x3837df + "报告提交");
    if (!_0x524af9 || this.stopAllTasks) {
      return {
        success: false,
        reward: 0
      };
    }
    if (_0x524af9.result === 1) {
      const _0x344a23 = Number(_0x524af9.data?.["neoAmount"]) || 0;
      this.taskStats[_0x3837df].totalReward += _0x344a23;
      _0x344a23 > 0 ? (this.accountTotalEarned += _0x344a23, GLOBAL_TOTAL_EARNED_COINS += _0x344a23, logUser("[" + this.platform.name + "---" + this.remark + "] " + _0x3837df + "任务提交成功，获得" + _0x344a23 + "金币！", "success"), logUser("[累计统计] 本账号累计: " + this.accountTotalEarned + "金币 | 全局所有账号累计: " + GLOBAL_TOTAL_EARNED_COINS + "金币", "info")) : logUser("[" + this.platform.name + "---" + this.remark + "] " + _0x3837df + "任务提交成功，本次未获得金币", "success");
      this.checkContinuous1Coin(_0x344a23);
      return {
        success: true,
        reward: _0x344a23
      };
    }
    const _0x5d9fb5 = [20107, 20108, 1003, 415];
    if (_0x5d9fb5.includes(_0x524af9.result)) {
      this.taskLimitReached[_0x3837df] = true;
      logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x3837df + "任务达上限", "错误码:" + _0x524af9.result);
      return {
        success: false,
        reward: 0,
        limitReached: true
      };
    }
    logError("[" + this.platform.name + "---" + this.remark + "] " + _0x3837df + "报告提交失败", new Error("结果码:" + _0x524af9.result + ", 消息:" + _0x524af9.errorMsg), "[" + this.platform.name + "---" + this.remark + "] " + _0x3837df + "报告提交");
    return {
      success: false,
      reward: 0
    };
  }
  checkContinuous1Coin(_0x49e883) {
    if (_0x49e883 === 1) {
      this.continuous1CoinCount++;
      logUser("[" + this.platform.name + "---" + this.remark + "] 连续1金币: " + this.continuous1CoinCount + "/" + this.continuous1CoinLimit, "warn");
      this.continuous1CoinCount >= this.continuous1CoinLimit && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 连续" + this.continuous1CoinLimit + "次1金币，禁用账号", "error"));
    } else {
      this.continuous1CoinCount > 0 && (this.continuous1CoinCount = 0, logUser("[" + this.platform.name + "---" + this.remark + "] 重置连续1金币计数器", "info"));
    }
  }
  async executeTask(_0x2b5ed8) {
    if (this.taskLimitReached[_0x2b5ed8] || this.stopAllTasks) {
      return {
        success: false,
        reward: 0,
        hasRewardEnd: false
      };
    }
    const _0x4a9a27 = await this.getAdInfo(_0x2b5ed8);
    if (!_0x4a9a27 || this.stopAllTasks) {
      this.taskStats[_0x2b5ed8].failed++;
      logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x2b5ed8 + "任务执行失败", "广告信息获取失败（含llsid解析失败）");
      return {
        success: false,
        reward: 0,
        hasRewardEnd: false
      };
    }
    const _0x5d4412 = Math.floor(Math.random() * (ENV_CONFIG.WATCH_MAX - ENV_CONFIG.WATCH_MIN) + ENV_CONFIG.WATCH_MIN) * 1000;
    const _0x1f5d5c = Math.round(_0x5d4412 / 1000);
    const _0x5b92dd = _0x4a9a27.hasRewardEnd ? "|检测到追加广告" : "";
    logUser("[" + this.platform.name + "---" + this.remark + "] " + _0x2b5ed8 + " 浏览中 " + _0x1f5d5c + "秒 " + _0x5b92dd, "info");
    await new Promise(_0x262828 => setTimeout(_0x262828, _0x5d4412));
    this.endTime = Date.now();
    this.startTime = this.endTime - _0x5d4412;
    const _0x1701f1 = await this.submitReport(_0x4a9a27.cid, _0x4a9a27.llsid, _0x2b5ed8, _0x4a9a27.expectedCoins);
    if (!this.stopAllTasks) {
      if (_0x1701f1.success) {
        this.taskStats[_0x2b5ed8].success++;
      } else {
        this.taskStats[_0x2b5ed8].failed++;
      }
    }
    return {
      success: _0x1701f1.success,
      reward: _0x1701f1.reward,
      hasRewardEnd: _0x4a9a27.hasRewardEnd
    };
  }
  getNextTask() {
    if (this.stopAllTasks) {
      return null;
    }
    for (let _0x44399f of this.taskQueue) {
      if (_0x44399f.currentCount < _0x44399f.targetCount && !this.taskLimitReached[_0x44399f.type]) {
        return _0x44399f;
      }
    }
    return null;
  }
  async executeTaskLoop() {
    if (this.stopAllTasks) {
      return {
        success: false,
        index: this.index,
        remark: this.remark,
        platform: this.platform.name,
        taskCount: 0,
        totalReward: 0,
        exitIP: this.clientIP,
        stopReason: "初始化失败"
      };
    }
    const _0x5f54c9 = await getAccountBasicInfo(this.cookie, this.platform, this.proxyUrl);
    if (!_0x5f54c9.success) {
      logError("[" + this.platform.name + "---" + this.remark + "] 账号执行失败", new Error("Cookie过期或无效"), "[" + this.platform.name + "---" + this.remark + "] 账户信息校验");
      return {
        success: false,
        index: this.index,
        remark: this.remark,
        platform: this.platform.name,
        taskCount: 0,
        totalReward: 0,
        exitIP: this.clientIP,
        stopReason: "Cookie过期"
      };
    }
    const _0x31e58a = _0x5f54c9.allCash.toFixed(2);
    logUser("[" + this.platform.name + "---" + this.remark + "] 账户信息：金币=" + _0x5f54c9.totalCoin + "，现金=" + _0x31e58a, "success");
    logUser("[" + this.platform.name + "---" + this.remark + "] 开始任务循环", "success");
    let _0x4058af = 0;
    let _0x5ef6f6 = "正常结束";
    let _0x3a2c8e;
    while ((_0x3a2c8e = this.getNextTask()) && !this.stopAllTasks) {
      logUser("\n[进度] 执行 " + _0x3a2c8e.type + " 任务 (" + (_0x3a2c8e.currentCount + 1) + "/" + _0x3a2c8e.targetCount + ")", "info");
      await this.executeTask(_0x3a2c8e.type);
      _0x3a2c8e.currentCount++;
      _0x4058af++;
      if (this.getNextTask() && !this.stopAllTasks) {
        const _0x23bb1f = Math.floor(Math.random() * 20100) + 10000;
        logUser("[休息] 任务间隔 " + Math.round(_0x23bb1f / 1000) + " 秒...", "info");
        await new Promise(_0x329186 => setTimeout(_0x329186, _0x23bb1f));
      }
    }
    if (this.continuous1CoinCount >= this.continuous1CoinLimit) {
      _0x5ef6f6 = "连续" + this.continuous1CoinLimit + "次1金币";
    } else {
      if (this.adInfoFailCount >= this.maxAdInfoFailCount) {
        _0x5ef6f6 = "广告获取失败达上限(" + this.maxAdInfoFailCount + "次)（含llsid解析失败）";
      } else {
        if (!this.getNextTask()) {
          _0x5ef6f6 = "所有指定任务已完成";
        } else {
          if (_0x5f54c9.ckExpired) {
            _0x5ef6f6 = "Cookie过期";
          } else {
            if (this.stopAllTasks) {
              _0x5ef6f6 = "手动停止或其他异常";
            }
          }
        }
      }
    }
    const _0x12d197 = Object.values(this.taskStats).reduce((_0x5718e9, _0x4a00c2) => _0x5718e9 + _0x4a00c2.totalReward, 0);
    logUser("[" + this.platform.name + "---" + this.remark + "] 任务结束 | 本账号累计获得: " + this.accountTotalEarned + "金币 | 停止原因: " + _0x5ef6f6, "success");
    return {
      success: true,
      index: this.index,
      remark: this.remark,
      platform: this.platform.name,
      taskCount: _0x4058af,
      totalReward: _0x12d197,
      exitIP: this.clientIP,
      stopReason: _0x5ef6f6
    };
  }
}
async function runConcurrentTasks(_0x68589d) {
  logUser(" 启动并发执行，账号总数: " + _0x68589d.length, "success");
  const _0x36a30e = _0x68589d.map(_0x20cc42 => {
    return async () => {
      const _0x5b12d5 = new KuaishouAccount(_0x20cc42);
      await new Promise(_0x20802a => setTimeout(_0x20802a, 200));
      return await _0x5b12d5.executeTaskLoop();
    };
  });
  const _0x529694 = await Promise.all(_0x36a30e.map(_0x1dced4 => _0x1dced4()));
  return _0x529694;
}
function parseAccountConfig(_0xe0927a, _0x1974bd) {
  if (!_0xe0927a || typeof _0xe0927a !== "string") {
    logError("账号" + _0x1974bd + "解析失败", new Error("配置为空或非字符串"), "账号" + _0x1974bd + "配置解析");
    return null;
  }
  const _0x51481a = _0xe0927a.split("#").map(_0x5acf83 => _0x5acf83.trim());
  if (_0x51481a.length < 4) {
    logError("账号" + _0x1974bd + "解析失败", new Error("配置格式错误，需至少4段（备注#PHPKey#Cookie#Salt[#Proxy]）"), "账号" + _0x1974bd + "配置解析");
    return null;
  }
  const [_0x5ed4d3, _0x1ea5bf, _0x1dbf4c, _0x33a2e6, _0x4dc5bf] = _0x51481a;
  if (!_0x5ed4d3) {
    logDev("账号" + _0x1974bd + "解析警告", "备注为空，使用默认名");
  }
  if (!_0x1ea5bf) {
    logError("账号" + _0x1974bd + "解析失败", new Error("缺失PHP Key"), "账号" + _0x1974bd + "配置解析");
    return null;
  }
  if (!_0x1dbf4c) {
    logError("账号" + _0x1974bd + "解析失败", new Error("缺失Cookie"), "账号" + _0x1974bd + "配置解析");
    return null;
  }
  if (!_0x33a2e6) {
    logError("账号" + _0x1974bd + "解析失败", new Error("缺失Salt"), "账号" + _0x1974bd + "配置解析");
    return null;
  }
  let _0x26b236 = null;
  let _0x54285c = "本地模式";
  if (_0x4dc5bf && _0x4dc5bf.startsWith("socks5://")) {
    _0x26b236 = _0x4dc5bf;
    _0x54285c = "代理模式";
  } else {
    _0x4dc5bf && logDev("账号" + _0x1974bd + "代理配置警告", "非Socks5代理：" + _0x4dc5bf + "，将使用本地模式");
  }
  logUser("加载账号" + _0x1974bd + ": " + (_0x5ed4d3 || "未命名") + " (" + _0x54285c + ")", "success");
  return {
    index: _0x1974bd,
    remark: _0x5ed4d3 || "未命名",
    phpKey: _0x1ea5bf,
    cookie: _0x1dbf4c,
    salt: _0x33a2e6,
    proxyUrl: _0x26b236,
    runMode: _0x54285c
  };
}
function loadAccountsFromEnv() {
  const _0x330249 = [];
  const _0x3ec360 = new Set();
  let _0x5867c6 = 1;
  logUser("开始加载账号配置", "info");
  process.env.ksck && process.env.ksck.split("&").forEach(_0x5731ea => {
    _0x5731ea = _0x5731ea.trim();
    if (_0x5731ea && !_0x3ec360.has(_0x5731ea)) {
      const _0x41bcc0 = parseAccountConfig(_0x5731ea, _0x5867c6);
      _0x41bcc0 && (_0x330249.push(_0x41bcc0), _0x3ec360.add(_0x5731ea), _0x5867c6++);
    }
  });
  for (let _0x416ecd = 1; _0x416ecd <= 666; _0x416ecd++) {
    const _0xdfc42c = "ksck" + _0x416ecd;
    if (process.env[_0xdfc42c]) {
      const _0x409b0b = process.env[_0xdfc42c].trim();
      if (_0x409b0b && !_0x3ec360.has(_0x409b0b)) {
        const _0x2a2e9d = parseAccountConfig(_0x409b0b, _0x5867c6);
        _0x2a2e9d && (_0x330249.push(_0x2a2e9d), _0x3ec360.add(_0x409b0b), _0x5867c6++);
      }
    }
  }
  logUser(" 账号加载完成，有效账号总数: " + _0x330249.length + "个", "success");
  return _0x330249;
}
async function main() {
  logUser("本程序仅供学习参考，使用者非法牟利将由使用者承担所有后果，如果不慎启动请立即关闭删除本程序", "info");
  logUser("=========================================\n", "info");
  try {
    await getPublicIP();
    await checkForUpdates();
    logUser("\n=========================================", "info");
    !ENV_CONFIG.PHP_PROXY_URL && (logError("脚本执行失败", new Error("PHP_PROXY_URL环境变量未配置"), "环境变量校验"), process.exit(1));
    ENV_CONFIG.TASK_CONFIG.length === 0 && (logError("脚本执行失败", new Error("kstask 环境变量未配置或为空，请设置任务列表 (例如: kstask=look,10;food,10)"), "环境变量校验"), process.exit(1));
    logUser("\n=========================================", "info");
    const _0x345ef6 = loadAccountsFromEnv();
    _0x345ef6.length === 0 && (logError("脚本执行失败", new Error("无有效账号配置"), "账号加载"), process.exit(1));
    const _0x3bd596 = await runConcurrentTasks(_0x345ef6);
    logUser("\n=========================================", "info");
    logUser("📊 全局汇总统计", "info");
    const _0x34d269 = _0x3bd596.filter(_0x3dc12d => _0x3dc12d.success);
    const _0x1534ec = _0x3bd596.filter(_0x1871e6 => !_0x1871e6.success && _0x1871e6.stopReason === "Cookie过期").length;
    const _0x2b784d = _0x34d269.reduce((_0x314cca, _0x289f0e) => _0x314cca + _0x289f0e.taskCount, 0);
    logUser("  有效账号: " + _0x34d269.length + "/" + _0x345ef6.length, "info");
    logUser("  过期账号: " + _0x1534ec, "info");
    logUser("  总执行任务: " + _0x2b784d + "次", "info");
    logUser("  全局所有账号最终累计获得: " + GLOBAL_TOTAL_EARNED_COINS + "金币", "success");
    _0x34d269.length > 0 && (logUser("\n  各账号详情:", "info"), _0x34d269.forEach((_0x340e68, _0x23c7b) => {
      logUser("  " + (_0x23c7b + 1) + ". [" + _0x340e68.platform + "---" + _0x340e68.remark + "]: 执行" + _0x340e68.taskCount + "次 | 获" + _0x340e68.totalReward + "金币 | IP: " + _0x340e68.exitIP + " | 原因: " + _0x340e68.stopReason, "info");
    }));
    logUser("\n 脚本执行完毕！", "success");
    process.exit(0);
  } catch (_0xedb788) {
    logError("脚本执行异常", _0xedb788, "脚本主函数");
    process.exit(1);
  }
}
main();