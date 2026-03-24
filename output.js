//Tue Mar 24 2026 04:54:18 GMT+0000 (Coordinated Universal Time)
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
dns.setServers(["8.8.8.8", "114.114.114.114", "223.5.5.5", "1.1.1.1"]);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const CURRENT_VERSION = "1.8.8";
const UPDATE_CHECK_URL = "http://47.239.198.88:8080/ks-update-info";
let updateInfo = null;
let localPublicIP = null;
let GLOBAL_TOTAL_EARNED_COINS = 0;
function parseTaskConfig() {
  const _0x29ee4f = process.env.kstask || "food,2";
  if (!_0x29ee4f) {
    console.log("未设置 kstask 环境变量，将使用默认空配置");
    return [];
  }
  try {
    return _0x29ee4f.split(";").map(_0x3bdc24 => {
      const _0x5b0ea2 = _0x3bdc24.split(",").map(_0x3c5fb9 => _0x3c5fb9.trim());
      if (_0x5b0ea2.length < 2) {
        return null;
      }
      const _0x5d986b = _0x5b0ea2[0];
      const _0x524f0f = parseInt(_0x5b0ea2[1]);
      if (!_0x5d986b || isNaN(_0x524f0f) || _0x524f0f <= 0) {
        return null;
      }
      return {
        type: _0x5d986b,
        targetCount: _0x524f0f
      };
    }).filter(_0x5108f7 => _0x5108f7 !== null);
  } catch (_0x3a4eb2) {
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
  WATCH_MIN: parseInt(process.env.KS_WATCH_MIN || 20),
  WATCH_MAX: parseInt(process.env.KS_WATCH_MAX || 31),
  AD_FAIL_LIMIT: parseInt(process.env.KS_AD_FAIL_LIMIT || 5),
  PHP_PROXY_URL: process.env.PHP_PROXY_URL || "http://115.191.27.229:54188/qm.php",
  PHP_PROXY_URL_DOUBLE: process.env.PHP_PROXY_URL_DOUBLE || process.env.PHP_PROXY_URL || "http://115.191.27.229:54188/qmfb.php",
  PHP_PROXY_URL_BASIC: process.env.PHP_PROXY_URL_BASIC || process.env.PHP_PROXY_URL || "http://115.191.27.229:54188/qmbd.php",
  CONTINUOUS_1COIN_LIMIT: parseInt(process.env.KS_CONTINUOUS_1COIN_LIMIT || 3),
  LOG_TARGET: process.env.KS_LOG_TARGET || "DE",
  LOG_LEVEL: process.env.KS_LOG_LEVEL || "simple",
  PROXY_CONNECT_TIMEOUT: parseInt(process.env.KS_PROXY_TIMEOUT || 3000),
  PROXY_KEEP_ALIVE: process.env.KS_PROXY_KEEP_ALIVE === "true" || true,
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
function logDev(_0x11569f, _0x317770 = null) {
  if (ENV_CONFIG.LOG_TARGET !== "DEV") {
    return;
  }
  console.log("\n🔧 [开发者日志] " + _0x11569f);
  _0x317770 && console.log("   详情: " + util.inspect(_0x317770, {
    depth: ENV_CONFIG.LOG_LEVEL === "detail" ? 5 : 2
  }));
}
function logUser(_0x49e274, _0x35d55a = "info") {
  const _0x1a5ab5 = {
    info: "ℹ️",
    success: "✅",
    warn: "⚠️",
    error: "❌"
  };
  const _0x9b94b6 = _0x1a5ab5[_0x35d55a] || "ℹ️";
  console.log(_0x9b94b6 + " " + _0x49e274);
}
function logError(_0x4e7b06, _0x3d298e, _0x272283 = "") {
  logUser(_0x4e7b06, "error");
  if (ENV_CONFIG.LOG_TARGET === "DEV") {
    console.log("\n❌ [开发者日志-错误详情] " + (_0x272283 || "未知上下文"));
    console.log("   错误信息: " + (_0x3d298e.message || "无"));
    ENV_CONFIG.LOG_LEVEL === "detail" && _0x3d298e.stack && console.log("   错误堆栈: " + _0x3d298e.stack.substring(0, 800));
    _0x3d298e.config && console.log("   请求配置: " + util.inspect(_0x3d298e.config, {
      depth: 2
    }));
    _0x3d298e.response && (console.log("   响应状态: " + (_0x3d298e.response.status || "无")), console.log("   响应数据: " + util.inspect(_0x3d298e.response.data, {
      depth: 2
    })));
    console.log("----------------------------------------");
  }
}
const IP_DETECTION_APIS = ["http://icanhazip.com", "https://ipv4.icanhazip.com", "https://v4.ident.me", "https://ipv4.gdt.qq.com/get_client_ip", "https://myip.ipip.net", "http://ipinfo.io/ip", "http://httpbin.org/ip", "https://api.ipify.org?format=text"];
async function getPublicIP() {
  logUser("🔍 正在检测本地直连公网IP...", "info");
  for (const _0x1d46a4 of IP_DETECTION_APIS) {
    try {
      const _0x3ad859 = await axios.get(_0x1d46a4, {
        timeout: 8000,
        responseType: "text",
        proxy: false,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });
      const _0x3fc192 = _0x3ad859.data.trim().match(/\d+\.\d+\.\d+\.\d+/);
      if (_0x3fc192 && _0x3fc192[0]) {
        const _0x388d66 = _0x3fc192[0];
        localPublicIP = _0x388d66;
        logUser(" 本地直连公网IP检测成功: " + _0x388d66, "success");
        return _0x388d66;
      }
    } catch (_0x8e1525) {
      logDev("本地IP检测失败-" + _0x1d46a4, _0x8e1525.message);
      continue;
    }
  }
  logError("本地直连公网IP检测失败，网络异常", new Error("所有IP检测接口请求失败"), "本地公网IP检测");
  process.exit(1);
}
function generateAndroidHexStr(_0x5dfb00 = 16) {
  const _0x493729 = "0123456789abcdef";
  let _0x30567a = "";
  for (let _0x86e31c = 0; _0x86e31c < _0x5dfb00; _0x86e31c++) {
    _0x30567a += _0x493729[Math.floor(Math.random() * _0x493729.length)];
  }
  return "ANDROID_" + _0x30567a;
}
function generateDidOdid() {
  const _0x39161f = generateAndroidHexStr(16);
  const _0xad20cf = generateAndroidHexStr(16);
  return {
    did: _0x39161f,
    odid: _0xad20cf
  };
}
function replaceDidOdidInCookie(_0x4b4656, _0x3cd553, _0xa466f5) {
  let _0x3b9944 = _0x4b4656 || "";
  _0x3b9944 = _0x3b9944.replace(/did=[^;]+/g, "did=" + _0x3cd553);
  _0x3b9944 = _0x3b9944.replace(/odid=[^;]+/g, "odid=" + _0xa466f5);
  if (!_0x3b9944.includes("did=")) {
    _0x3b9944 += ";did=" + _0x3cd553;
  }
  if (!_0x3b9944.includes("odid=")) {
    _0x3b9944 += ";odid=" + _0xa466f5;
  }
  return _0x3b9944.trim();
}
async function checkSocks5ProxyHealth(_0x892a9f) {
  const _0x1c735c = 8;
  let _0x363bdf = 0;
  const _0x49d4e9 = ["https://ipv4.gdt.qq.com/get_client_ip", "http://httpbin.org/ip", "https://api.ipify.org?format=text"];
  if (!validateSocks5ProxyUrl(_0x892a9f)) {
    return {
      ok: false,
      msg: "❌ 无效的Socks5代理URL格式",
      ip: null
    };
  }
  logDev("开始SOCKS5代理健康检测，最多" + _0x1c735c + "次重试");
  while (_0x363bdf < _0x1c735c) {
    const _0x11deb7 = _0x49d4e9[_0x363bdf % _0x49d4e9.length];
    try {
      const _0x5eca5d = {
        timeout: ENV_CONFIG.PROXY_CONNECT_TIMEOUT,
        keepAlive: ENV_CONFIG.PROXY_KEEP_ALIVE,
        keepAliveMsecs: 60000,
        maxSockets: 5,
        maxFreeSockets: 2,
        timeoutSocket: 10000
      };
      const _0x151da5 = new SocksProxyAgent(_0x892a9f, _0x5eca5d);
      const _0x23bb6d = await axios.get(_0x11deb7, {
        httpAgent: _0x151da5,
        httpsAgent: _0x151da5,
        timeout: 15000,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "*/*",
          Connection: "keep-alive",
          Cookie: "pgv_pvid=2059158520; fqm_pvqid=28d9ba83-df83-4304-98c6-dbae8b6c200b"
        },
        proxy: false,
        https: {
          rejectUnauthorized: false
        }
      });
      if (_0x23bb6d.status === 200 && _0x23bb6d.data && typeof _0x23bb6d.data === "string") {
        const _0x449b91 = _0x23bb6d.data.trim().match(/\d+\.\d+\.\d+\.\d+/);
        const _0x3a02a2 = _0x449b91 ? _0x449b91[0] : _0x23bb6d.data.trim();
        if (_0x3a02a2 && _0x3a02a2 !== "") {
          const _0xb338bb = "SOCKS5代理正常，出口IP: " + _0x3a02a2;
          logUser(_0xb338bb, "success");
          return {
            ok: true,
            msg: _0xb338bb,
            ip: _0x3a02a2
          };
        }
      }
      throw new Error("接口返回无效IP数据");
    } catch (_0x191e86) {
      _0x363bdf++;
      logDev("SOCKS5代理检测第" + _0x363bdf + "次失败-" + _0x49d4e9[_0x363bdf % _0x49d4e9.length], _0x191e86.message);
      if (_0x363bdf >= _0x1c735c) {
        return {
          ok: false,
          msg: "❌ SOCKS5代理检测失败（已重试" + _0x1c735c + "次）：" + _0x191e86.message,
          ip: null
        };
      }
      await new Promise(_0x3350c4 => setTimeout(_0x3350c4, 1500 * _0x363bdf));
    }
  }
  return {
    ok: false,
    msg: "❌ SOCKS5代理检测未知错误",
    ip: null
  };
}
async function getProxyExitIP(_0x397c24) {
  logUser("🔍 正在检测代理出口IP...", "info");
  const _0xf6b490 = await checkSocks5ProxyHealth(_0x397c24);
  if (!_0xf6b490.ok) {
    logError(_0xf6b490.msg, new Error(_0xf6b490.msg), "代理IP检测-健康校验");
    return null;
  }
  return _0xf6b490.ip;
}
function validateSocks5ProxyUrl(_0x29330b) {
  if (!_0x29330b || typeof _0x29330b !== "string") {
    logDev("代理URL校验失败", "代理URL为空或非字符串");
    return false;
  }
  const _0x178905 = /^socks5h?:\/\/(?:[a-zA-Z0-9:_.-]+@)?(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[?[a-fA-F0-9:]+\]?):\d{1,5}$/;
  if (!_0x178905.test(_0x29330b)) {
    logDev("代理URL校验失败", "不符合Socks5格式要求：" + _0x29330b + "，正确格式示例：socks5://127.0.0.1:1080 | socks5h://127.0.0.1:1080");
    return false;
  }
  return true;
}
function compareVersions(_0x121575, _0x3283b4) {
  const _0x1db087 = _0x121575.split(".").map(Number);
  const _0x28df29 = _0x3283b4.split(".").map(Number);
  const _0x237a03 = Math.max(_0x1db087.length, _0x28df29.length);
  for (let _0x2bc0b6 = 0; _0x2bc0b6 < _0x237a03; _0x2bc0b6++) {
    const _0x1496c8 = _0x1db087[_0x2bc0b6] || 0;
    const _0x55e882 = _0x28df29[_0x2bc0b6] || 0;
    if (_0x1496c8 > _0x55e882) {
      return 1;
    }
    if (_0x1496c8 < _0x55e882) {
      return -1;
    }
  }
  return 0;
}
async function checkForUpdates() {
  logUser("🔍 正在检查脚本更新... 当前版本: " + CURRENT_VERSION, "info");
  try {
    const _0x28d373 = await axios.get(UPDATE_CHECK_URL, {
      timeout: 10000,
      validateStatus: _0x16fd8e => _0x16fd8e === 200,
      proxy: false,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    updateInfo = _0x28d373.data;
    logDev("更新检查接口返回数据", updateInfo);
    if (!updateInfo.latestVersion) {
      logUser("未获取到最新版本信息", "warn");
      return false;
    }
    const _0xa9cc8e = compareVersions(CURRENT_VERSION, updateInfo.latestVersion);
    if (_0xa9cc8e === 0) {
      logUser("当前版本(" + CURRENT_VERSION + ")为最新版本", "info");
    } else {
      _0xa9cc8e === 1 ? logUser("当前版本(" + CURRENT_VERSION + ")高于最新版本(" + updateInfo.latestVersion + ")，可能是测试版本", "info") : logUser("检测到新版本(" + updateInfo.latestVersion + ")，当前版本(" + CURRENT_VERSION + ")可更新", "info");
    }
    return true;
  } catch (_0x3c5e5f) {
    logError("脚本更新检查失败，跳过更新", _0x3c5e5f, "脚本版本更新检查");
    return false;
  }
}
function cleanHeaderValue(_0x3d907d) {
  if (typeof _0x3d907d !== "string") {
    _0x3d907d = String(_0x3d907d || "");
  }
  return _0x3d907d.replace(/[\x00-\x1F\x7F\u2000-\u200F\u3000]/g, "").trim().replace(/[^\x20-\x7E]/g, "");
}
async function request(_0x306491, _0x8f906b = null, _0x4620f3 = "通用请求") {
  try {
    const _0x602061 = {
      method: _0x306491.method || "GET",
      url: _0x306491.url,
      headers: {},
      data: _0x306491.body || _0x306491.form,
      timeout: _0x306491.timeout || 15000,
      https: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
        maxVersion: "TLSv1.3"
      },
      validateStatus: () => true,
      followRedirects: true,
      maxRedirects: 5
    };
    if (_0x8f906b) {
      const _0x185211 = validateSocks5ProxyUrl(_0x8f906b);
      if (!_0x185211) {
        throw new Error("无效的Socks5代理URL格式");
      }
      const _0x4b9b9f = {
        timeout: ENV_CONFIG.PROXY_CONNECT_TIMEOUT,
        keepAlive: ENV_CONFIG.PROXY_KEEP_ALIVE,
        keepAliveMsecs: 60000,
        maxSockets: 5,
        maxFreeSockets: 2,
        timeoutSocket: 12000
      };
      const _0xdac19d = new SocksProxyAgent(_0x8f906b, _0x4b9b9f);
      _0x602061.httpAgent = _0xdac19d;
      _0x602061.httpsAgent = _0xdac19d;
      _0x602061.proxy = false;
    } else {
      _0x602061.proxy = false;
    }
    if (_0x306491.headers) {
      for (const [_0x2b3098, _0x572453] of Object.entries(_0x306491.headers)) {
        _0x602061.headers[_0x2b3098] = cleanHeaderValue(_0x572453);
      }
    }
    !_0x602061.headers["User-Agent"] && (_0x602061.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
    !_0x602061.headers.Connection && (_0x602061.headers.Connection = "keep-alive");
    !_0x602061.headers["Accept-Encoding"] && (_0x602061.headers["Accept-Encoding"] = "gzip, deflate, br");
    _0x306491.form && _0x306491.method === "POST" && !_0x602061.headers["Content-Type"] && (_0x602061.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8", _0x602061.data = querystring.stringify(_0x306491.form));
    logDev(_0x4620f3 + " - 请求配置", {
      url: _0x602061.url,
      method: _0x602061.method,
      proxy: _0x8f906b || "无"
    });
    const _0x5a90a6 = await axios(_0x602061);
    logDev(_0x4620f3 + " - 响应状态", _0x5a90a6.status);
    return {
      body: _0x5a90a6.data,
      status: _0x5a90a6.status
    };
  } catch (_0x34b014) {
    let _0x29246e = _0x34b014.message;
    if (_0x8f906b && _0x29246e.includes("Socks")) {
      _0x29246e = "代理连接异常：" + _0x29246e + "（代理URL：" + _0x8f906b + "）";
    }
    logError(_0x4620f3 + " 执行失败", new Error(_0x29246e), _0x4620f3);
    return {
      body: null,
      status: 0
    };
  }
}
function getPlatformFromCookie(_0x4e149c) {
  const _0x531334 = _0x4e149c.match(/kpn=([^;]+)/);
  const _0x4e285b = _0x531334 ? _0x531334[1].toUpperCase() : "NEBULA";
  return ENV_CONFIG.PLATFORM_CONFIG[_0x4e285b] || ENV_CONFIG.PLATFORM_CONFIG.NEBULA;
}
async function getAdConfigFromPHP(_0xd8e225, _0x1f45e, _0x547b12, _0x3fc315, _0x55f076, _0x5eae0c) {
  try {
    logDev("[" + _0xd8e225.name + "] 请求" + _0x1f45e + "广告配置-参数", {
      kpn: _0xd8e225.kpn,
      taskType: _0x1f45e,
      ip: _0x55f076
    });
    const {
      body: _0x2e17a4
    } = await request({
      method: "POST",
      url: ENV_CONFIG.PHP_PROXY_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanHeaderValue(_0x5eae0c)
      },
      body: JSON.stringify({
        action: "get_ad_config",
        key: cleanHeaderValue(_0x5eae0c),
        kpn: _0xd8e225.kpn,
        task_type: _0x1f45e,
        salt: _0x547b12,
        ck: _0x3fc315,
        ip: _0x55f076
      }),
      timeout: 15000
    }, null, "[" + _0xd8e225.name + "] 获取" + _0x1f45e + "广告配置");
    logDev("[" + _0xd8e225.name + "] " + _0x1f45e + "广告配置-PHP返回", _0x2e17a4);
    if (_0x2e17a4 && _0x2e17a4.code === 200 && _0x2e17a4.data?.["request_config"]) {
      logUser("[" + _0xd8e225.name + "] 成功获取" + _0x1f45e + "广告配置", "success");
      return {
        requestConfig: _0x2e17a4.data.request_config,
        taskParams: _0x2e17a4.data.task_params
      };
    }
    logUser("[" + _0xd8e225.name + "] 获取" + _0x1f45e + "广告配置失败: " + (_0x2e17a4?.["msg"] || "PHP返回无有效配置"), "error");
    return null;
  } catch (_0x39a4de) {
    logError("[" + _0xd8e225.name + "] 获取" + _0x1f45e + "广告配置异常", _0x39a4de, "[" + _0xd8e225.name + "] " + _0x1f45e + "广告配置请求");
    return null;
  }
}
async function getReportConfigFromPHP(_0x3afda3, _0x5aefef, _0x5f34c1, _0x43f32c, _0x2ad027, _0x2140d9, _0x4484de, _0x5351a7) {
  try {
    const _0x3ddce2 = ["creativeId", "llsid", "startTime", "endTime"];
    const _0x128432 = _0x3ddce2.filter(_0x287535 => !_0x2140d9[_0x287535]);
    if (_0x128432.length > 0) {
      logError("[" + _0x3afda3.name + "] 获取" + _0x5aefef + "报告配置失败", new Error("缺失必要参数: " + _0x128432.join(",")), "[" + _0x3afda3.name + "] " + _0x5aefef + "报告配置参数校验");
      return null;
    }
    let _0x31f357 = "get_report_config";
    let _0x4409ce = ENV_CONFIG.PHP_PROXY_URL;
    if (_0x5351a7 > 1000) {
      _0x4409ce = ENV_CONFIG.PHP_PROXY_URL_DOUBLE;
    } else {
      if (_0x5351a7 === 1) {
        _0x4409ce = ENV_CONFIG.PHP_PROXY_URL_BASIC;
      }
    }
    logDev("[" + _0x3afda3.name + "] 请求" + _0x5aefef + "报告配置-参数", {
      kpn: _0x3afda3.kpn,
      taskType: _0x5aefef,
      creativeId: _0x2140d9.creativeId,
      action: _0x31f357,
      expectedCoins: _0x5351a7,
      phpUrl: _0x4409ce
    });
    const {
      body: _0x25d184
    } = await request({
      method: "POST",
      url: _0x4409ce,
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanHeaderValue(_0x4484de)
      },
      body: JSON.stringify({
        action: _0x31f357,
        key: cleanHeaderValue(_0x4484de),
        kpn: _0x3afda3.kpn,
        task_type: _0x5aefef,
        salt: _0x5f34c1,
        ck: _0x43f32c,
        ip: _0x2ad027,
        ..._0x2140d9
      }),
      timeout: 15000
    }, null, "[" + _0x3afda3.name + "] 获取" + _0x5aefef + "报告配置");
    logDev("[" + _0x3afda3.name + "] " + _0x5aefef + "报告配置-PHP返回", _0x25d184);
    if (_0x25d184 && _0x25d184.code === 200 && _0x25d184.data?.["request_config"]) {
      logUser("[" + _0x3afda3.name + "] 成功获取" + _0x5aefef + "报告签名配置", "success");
      return _0x25d184.data.request_config;
    }
    logUser("[" + _0x3afda3.name + "] 获取" + _0x5aefef + "报告配置失败: " + (_0x25d184?.["msg"] || "PHP返回无有效签名"), "error");
    return null;
  } catch (_0x5b5227) {
    logError("[" + _0x3afda3.name + "] 获取" + _0x5aefef + "报告配置异常", _0x5b5227, "[" + _0x3afda3.name + "] " + _0x5aefef + "报告配置请求");
    return null;
  }
}
async function getAccountBasicInfo(_0x46196c, _0x349390, _0x5f4c06) {
  try {
    logDev("[" + _0x349390.name + "] 账户信息请求-参数", {
      url: _0x349390.accountInfoUrl,
      proxy: _0x5f4c06 || "无"
    });
    const {
      body: _0x4cb4c8
    } = await request({
      method: "GET",
      url: _0x349390.accountInfoUrl,
      headers: {
        Host: _0x349390.host,
        "User-Agent": "kwai-android aegon/3.56.0",
        Cookie: _0x46196c
      },
      timeout: 12000
    }, _0x5f4c06, "[" + _0x349390.name + "] 账户基础信息请求");
    logDev("[" + _0x349390.name + "] 账户信息返回数据", _0x4cb4c8);
    if (!_0x4cb4c8) {
      logError("[" + _0x349390.name + "] 账户信息请求无返回", new Error("接口返回空数据"), "[" + _0x349390.name + "] 账户基础信息请求");
      return {
        success: false,
        ckExpired: true
      };
    }
    if (_0x349390.kpn === "KUAISHOU" && _0x4cb4c8.result === 1 && _0x4cb4c8.data) {
      const _0x177df4 = Number(_0x4cb4c8.data.coinAmount) || 0;
      const _0x1668f3 = Number(_0x4cb4c8.data.cashAmountDisplay) || 0;
      return {
        nickname: _0x4cb4c8.data.userData?.["nickname"],
        totalCoin: _0x177df4,
        allCash: _0x1668f3,
        success: true,
        ckExpired: false
      };
    } else {
      if (_0x349390.kpn === "NEBULA" && _0x4cb4c8.result === 1 && _0x4cb4c8.data) {
        const _0x49c1d0 = Number(_0x4cb4c8.data.totalCoin) || 0;
        const _0x1fdaf1 = Number(_0x4cb4c8.data.allCash) || 0;
        return {
          nickname: _0x4cb4c8.data.userData?.["nickname"],
          totalCoin: _0x49c1d0,
          allCash: _0x1fdaf1,
          success: true,
          ckExpired: false
        };
      }
    }
    logUser("[" + _0x349390.name + "] 账户信息获取失败，Cookie可能已过期", "error");
    return {
      success: false,
      ckExpired: true
    };
  } catch (_0x532da9) {
    logError("[" + _0x349390.name + "] 账户信息请求异常", _0x532da9, "[" + _0x349390.name + "] 账户基础信息请求");
    return {
      success: false,
      ckExpired: true
    };
  }
}
class KuaishouAccount {
  constructor({
    index: _0x31ab4d,
    salt: _0x2a4143,
    cookie: _0x393955,
    remark = "未命名",
    proxyUrl = null,
    phpKey: _0xe2eac3
  }) {
    this.index = _0x31ab4d || 1;
    this.salt = _0x2a4143;
    this.originalCookie = _0x393955;
    this.cookie = _0x393955;
    this.remark = remark;
    this.proxyUrl = proxyUrl;
    this.phpKey = _0xe2eac3;
    this.platform = getPlatformFromCookie(_0x393955);
    this.clientIP = null;
    this.stopAllTasks = false;
    this.continuous1CoinCount = 0;
    this.continuous1CoinLimit = ENV_CONFIG.CONTINUOUS_1COIN_LIMIT;
    this.adInfoFailCount = 0;
    this.maxAdInfoFailCount = ENV_CONFIG.AD_FAIL_LIMIT;
    this.taskQueue = ENV_CONFIG.TASK_CONFIG.map(_0x2d4317 => ({
      ..._0x2d4317,
      currentCount: 0
    }));
    this.startTime = Date.now();
    this.endTime = this.startTime - 30000;
    this.taskStats = {};
    this.taskLimitReached = {};
    this.accountTotalEarned = 0;
    this.initialCoinBalance = 0;
    this.currentCoinBalance = 0;
    this.taskQueue.forEach(_0x190842 => {
      this.taskStats[_0x190842.type] = {
        success: 0,
        failed: 0,
        totalReward: 0
      };
      this.taskLimitReached[_0x190842.type] = false;
    });
    logUser("[账号" + this.index + "] 初始化中...", "info");
    if (this.taskQueue.length > 0) {
      const _0x19ada7 = this.taskQueue.map(_0x5250e2 => _0x5250e2.type + "(" + _0x5250e2.targetCount + "次)").join(", ");
      logUser("[账号" + this.index + "] 任务计划: " + _0x19ada7, "info");
    } else {
      logUser("[账号" + this.index + "] ⚠️ 没有配置任何任务 (kstask变量为空或格式错误)", "warn");
    }
    this.initExitIP();
  }
  async initExitIP() {
    try {
      if (this.proxyUrl) {
        const _0x274795 = await getProxyExitIP(this.proxyUrl);
        if (!_0x274795) {
          this.stopAllTasks = true;
          logError("[账号" + this.index + "] 初始化失败", new Error("代理IP检测无有效结果"), "[账号" + this.index + "] 代理IP初始化");
          return;
        }
        this.clientIP = _0x274795;
      } else {
        if (!localPublicIP) {
          await getPublicIP();
        }
        this.clientIP = localPublicIP;
      }
      logUser("[账号" + this.index + "] 初始化完成 | 出口IP: " + this.clientIP, "success");
    } catch (_0x26b692) {
      this.stopAllTasks = true;
      logError("[账号" + this.index + "] 初始化失败", _0x26b692, "[账号" + this.index + "] IP初始化");
    }
  }
  async retryOperation(_0x44c9de, _0x448587, _0x8294a1 = 3) {
    let _0x1370e3 = 0;
    while (_0x1370e3 < _0x8294a1 && !this.stopAllTasks) {
      try {
        const _0x5e63c6 = await _0x44c9de();
        if (_0x5e63c6) {
          return _0x5e63c6;
        }
      } catch (_0x4aecfa) {
        logDev(_0x448587 + " 第" + (_0x1370e3 + 1) + "次重试失败", _0x4aecfa.message);
      }
      _0x1370e3++;
      if (_0x1370e3 < _0x8294a1 && !this.stopAllTasks) {
        await new Promise(_0x4c1fe1 => setTimeout(_0x4c1fe1, 2000));
      }
    }
    logError(_0x448587 + " 重试失败", new Error("已重试" + _0x8294a1 + "次仍无有效结果"), "[" + this.platform.name + "---" + this.remark + "] " + _0x448587 + "重试");
    return null;
  }
  async getAdInfo(_0x583585) {
    if (this.stopAllTasks) {
      return null;
    }
    logUser("[" + this.platform.name + "---" + this.remark + "] 开始获取" + _0x583585 + "广告信息", "info");
    const _0x272496 = await this.retryOperation(() => getAdConfigFromPHP(this.platform, _0x583585, this.salt, this.cookie, this.clientIP, this.phpKey), "获取" + _0x583585 + "广告配置");
    if (!_0x272496 || this.stopAllTasks) {
      !this.stopAllTasks && (this.adInfoFailCount++, logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x583585 + "广告配置获取失败", "累计失败" + this.adInfoFailCount + "/" + this.maxAdInfoFailCount), this.adInfoFailCount >= this.maxAdInfoFailCount && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 广告获取失败次数达上限(" + this.maxAdInfoFailCount + "次)，停止当前账号任务", "error")));
      return null;
    }
    const {
      body: _0x1a181c
    } = await request({
      method: _0x272496.requestConfig.method,
      url: _0x272496.requestConfig.url,
      headers: _0x272496.requestConfig.headers,
      form: _0x272496.requestConfig.form,
      timeout: _0x272496.requestConfig.timeout || 12000
    }, this.proxyUrl, "[" + this.platform.name + "---" + this.remark + "] " + _0x583585 + "广告内容请求");
    if (!_0x1a181c || this.stopAllTasks) {
      this.adInfoFailCount++;
      logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x583585 + "广告内容获取失败", "累计失败" + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
      this.adInfoFailCount >= this.maxAdInfoFailCount && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 广告获取失败次数达上限(" + this.maxAdInfoFailCount + "次)，停止当前账号任务", "error"));
      return null;
    }
    if (_0x1a181c.errorMsg === "OK" && _0x1a181c.feeds && _0x1a181c.feeds[0] && _0x1a181c.feeds[0].ad) {
      const _0x422541 = _0x1a181c.feeds[0];
      const _0x361ed9 = _0x422541.caption || _0x422541.ad.caption || "未知广告";
      const _0x13ca83 = _0x361ed9.length > 50 ? _0x361ed9.substring(0, 50) + "..." : _0x361ed9;
      let _0x3e2671 = 0;
      try {
        if (_0x422541.ad.extData) {
          const _0x1b9e13 = JSON.parse(_0x422541.ad.extData);
          _0x3e2671 = Number(_0x1b9e13.awardCoin) || 0;
        }
        _0x3e2671 === 0 && (_0x3e2671 = parseInt(_0x422541.ad.adDataV2?.["inspirePersonalize"]?.["awardValue"] || _0x422541.ad.adDataV2?.["inspireAdInfo"]?.["inspirePersonalize"]?.["neoValue"] || _0x422541.ad.awardCoin || 0) || 0);
      } catch (_0x40c7ed) {
        logError("[" + this.platform.name + "---" + this.remark + "] 解析广告预计金币失败", _0x40c7ed, "[" + this.platform.name + "---" + this.remark + "] " + _0x583585 + "广告金币解析");
        _0x3e2671 = 0;
      }
      const _0x35ce32 = _0x422541.exp_tag || "";
      const _0x582c97 = _0x35ce32.split("/")[1]?.["split"]("_")?.[0] || "";
      if (!_0x582c97 || _0x582c97.trim() === "") {
        logUser("[" + this.platform.name + "---" + this.remark + "] 获取广告失败", "error");
        this.adInfoFailCount++;
        logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x583585 + "广告llsid解析失败（为空）", "累计失败" + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
        this.adInfoFailCount >= this.maxAdInfoFailCount && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 广告获取失败次数达上限(" + this.maxAdInfoFailCount + "次)，停止当前账号任务", "error"));
        return null;
      }
      logUser("[" + this.platform.name + "---" + this.remark + "] 成功获取广告：" + _0x13ca83 + " |  预计获得" + _0x3e2671 + "金币 | llsid: " + _0x582c97, "success");
      let _0x47652f = false;
      try {
        _0x47652f = _0x422541.ad.adDataV2?.["onceAgainRewardInfo"]?.["hasMore"] || false;
      } catch (_0x84d673) {
        logDev("[" + this.platform.name + "---" + this.remark + "] 解析追加广告标识失败", _0x84d673.message);
      }
      return {
        cid: _0x422541.ad.creativeId,
        llsid: _0x582c97,
        hasRewardEnd: _0x47652f,
        expectedCoins: _0x3e2671
      };
    }
    this.adInfoFailCount++;
    logUser("[" + this.platform.name + "---" + this.remark + "] 获取广告失败", "error");
    logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x583585 + "广告内容解析失败", "累计失败" + this.adInfoFailCount + "/" + this.maxAdInfoFailCount);
    this.adInfoFailCount >= this.maxAdInfoFailCount && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 广告获取失败次数达上限(" + this.maxAdInfoFailCount + "次)，停止当前账号任务", "error"));
    return null;
  }
  async submitReport(_0x5aa4ba, _0x451327, _0x2d0573, _0x2a094e) {
    if (this.stopAllTasks) {
      return {
        success: false,
        reward: 0
      };
    }
    logUser("[" + this.platform.name + "---" + this.remark + "] 开始提交" + _0x2d0573 + "任务报告", "info");
    const _0xbea480 = await getAccountBasicInfo(this.cookie, this.platform, this.proxyUrl);
    if (!_0xbea480.success) {
      logError("[" + this.platform.name + "---" + this.remark + "] 提交报告前获取账户信息失败", new Error("Cookie过期或接口异常"), "[" + this.platform.name + "---" + this.remark + "] " + _0x2d0573 + "报告提交-前置校验");
      return {
        success: false,
        reward: 0
      };
    }
    const _0x489fd0 = _0xbea480.totalCoin;
    logDev("[" + this.platform.name + "---" + this.remark + "] 提交报告前账户金币余额: " + _0x489fd0, "前置余额记录");
    const _0x37d87e = {
      creativeId: _0x5aa4ba,
      llsid: _0x451327,
      startTime: this.startTime,
      endTime: this.endTime
    };
    const _0x3414a0 = await this.retryOperation(() => getReportConfigFromPHP(this.platform, _0x2d0573, this.salt, this.cookie, this.clientIP, _0x37d87e, this.phpKey, _0x2a094e), "获取" + _0x2d0573 + "报告签名配置");
    if (!_0x3414a0 || this.stopAllTasks) {
      return {
        success: false,
        reward: 0
      };
    }
    const _0x4ab5c7 = {
      method: _0x3414a0.method,
      url: _0x3414a0.url,
      headers: _0x3414a0.headers,
      timeout: _0x3414a0.timeout || 12000
    };
    if (_0x3414a0.body) {
      _0x4ab5c7.form = querystring.parse(_0x3414a0.body);
    } else {
      if (_0x3414a0.form) {
        _0x4ab5c7.form = _0x3414a0.form;
      }
    }
    const {
      body: _0x545c20
    } = await request(_0x4ab5c7, this.proxyUrl, "[" + this.platform.name + "---" + this.remark + "] " + _0x2d0573 + "报告提交");
    if (!_0x545c20 || this.stopAllTasks) {
      return {
        success: false,
        reward: 0
      };
    }
    if (_0x545c20.result === 1) {
      await new Promise(_0x503130 => setTimeout(_0x503130, 2000));
      const _0x5467f5 = await getAccountBasicInfo(this.cookie, this.platform, this.proxyUrl);
      if (!_0x5467f5.success) {
        logError("[" + this.platform.name + "---" + this.remark + "] 提交报告后获取账户信息失败", new Error("Cookie过期或接口异常"), "[" + this.platform.name + "---" + this.remark + "] " + _0x2d0573 + "报告提交-后置校验");
        return {
          success: true,
          reward: 0
        };
      }
      const _0x144519 = _0x5467f5.totalCoin;
      const _0x480430 = Math.max(0, _0x144519 - _0x489fd0);
      this.currentCoinBalance = _0x144519;
      this.taskStats[_0x2d0573].totalReward += _0x480430;
      if (_0x480430 > 0) {
        this.accountTotalEarned += _0x480430;
        GLOBAL_TOTAL_EARNED_COINS += _0x480430;
        logUser("[" + this.platform.name + "---" + this.remark + "] " + _0x2d0573 + "任务提交成功！", "success");
        logUser("[奖励明细] 本次获得" + _0x480430 + "金币 | 当前账户金币余额: " + _0x144519 + " | 现金余额: " + _0x5467f5.allCash.toFixed(2), "success");
        logUser("[累计统计] 本账号累计: " + this.accountTotalEarned + "金币 | 全局所有账号累计: " + GLOBAL_TOTAL_EARNED_COINS + "金币", "info");
      } else {
        logUser("[" + this.platform.name + "---" + this.remark + "] " + _0x2d0573 + "任务提交成功，本次未获得金币", "success");
        logUser("[账户余额] 当前账户金币余额: " + _0x144519 + " | 现金余额: " + _0x5467f5.allCash.toFixed(2), "info");
      }
      this.checkContinuous1Coin(_0x480430);
      return {
        success: true,
        reward: _0x480430
      };
    }
    const _0x3ef7f9 = [20107, 20108, 1003, 415];
    if (_0x3ef7f9.includes(_0x545c20.result)) {
      this.taskLimitReached[_0x2d0573] = true;
      logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x2d0573 + "任务达上限", "错误码:" + _0x545c20.result);
      return {
        success: false,
        reward: 0,
        limitReached: true
      };
    }
    logError("[" + this.platform.name + "---" + this.remark + "] " + _0x2d0573 + "报告提交失败", new Error("结果码:" + _0x545c20.result + ", 消息:" + _0x545c20.errorMsg), "[" + this.platform.name + "---" + this.remark + "] " + _0x2d0573 + "报告提交");
    return {
      success: false,
      reward: 0
    };
  }
  checkContinuous1Coin(_0x4f9026) {
    if (_0x4f9026 < 10) {
      this.continuous1CoinCount++;
      const {
        did: _0x1ac0c8,
        odid: _0x2c2fe7
      } = generateDidOdid();
      this.cookie = replaceDidOdidInCookie(this.cookie, _0x1ac0c8, _0x2c2fe7);
      this.continuous1CoinCount >= this.continuous1CoinLimit && (this.stopAllTasks = true, logUser("[" + this.platform.name + "---" + this.remark + "] 连续" + this.continuous1CoinLimit + "次1金币，禁用账号", "error"));
    } else {
      this.continuous1CoinCount > 0 && (this.continuous1CoinCount = 0, logUser("[" + this.platform.name + "---" + this.remark + "] 重置连续1金币计数器", "info"));
    }
  }
  async executeTask(_0x5f11dd) {
    if (this.taskLimitReached[_0x5f11dd] || this.stopAllTasks) {
      return {
        success: false,
        reward: 0,
        hasRewardEnd: false
      };
    }
    const _0x1cffbe = await this.getAdInfo(_0x5f11dd);
    if (!_0x1cffbe || this.stopAllTasks) {
      this.taskStats[_0x5f11dd].failed++;
      logDev("[" + this.platform.name + "---" + this.remark + "] " + _0x5f11dd + "任务执行失败", "广告信息获取失败（含llsid解析失败）");
      return {
        success: false,
        reward: 0,
        hasRewardEnd: false
      };
    }
    const _0x202dba = Math.floor(Math.random() * (ENV_CONFIG.WATCH_MAX - ENV_CONFIG.WATCH_MIN) + ENV_CONFIG.WATCH_MIN) * 1000;
    const _0x19d822 = Math.round(_0x202dba / 1000);
    const _0x211168 = _0x1cffbe.hasRewardEnd ? "|检测到追加广告" : "";
    logUser("[" + this.platform.name + "---" + this.remark + "] " + _0x5f11dd + " 浏览中 " + _0x19d822 + "秒 " + _0x211168, "info");
    await new Promise(_0x40e7ee => setTimeout(_0x40e7ee, _0x202dba));
    this.endTime = Date.now();
    this.startTime = this.endTime - _0x202dba;
    const _0xffa58d = await this.submitReport(_0x1cffbe.cid, _0x1cffbe.llsid, _0x5f11dd, _0x1cffbe.expectedCoins);
    if (!this.stopAllTasks) {
      if (_0xffa58d.success) {
        this.taskStats[_0x5f11dd].success++;
      } else {
        this.taskStats[_0x5f11dd].failed++;
      }
    }
    return {
      success: _0xffa58d.success,
      reward: _0xffa58d.reward,
      hasRewardEnd: _0x1cffbe.hasRewardEnd
    };
  }
  getNextTask() {
    if (this.stopAllTasks) {
      return null;
    }
    for (let _0x549c61 of this.taskQueue) {
      if (_0x549c61.currentCount < _0x549c61.targetCount && !this.taskLimitReached[_0x549c61.type]) {
        return _0x549c61;
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
    const _0x3d30d9 = await getAccountBasicInfo(this.cookie, this.platform, this.proxyUrl);
    if (!_0x3d30d9.success) {
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
    this.initialCoinBalance = _0x3d30d9.totalCoin;
    this.currentCoinBalance = _0x3d30d9.totalCoin;
    const _0x19baea = _0x3d30d9.allCash.toFixed(2);
    logUser("[" + this.platform.name + "---" + this.remark + "] 账户信息：初始金币=" + _0x3d30d9.totalCoin + "，初始现金=" + _0x19baea, "success");
    logUser("[" + this.platform.name + "---" + this.remark + "] 开始任务循环", "success");
    let _0x48a09c = 0;
    let _0x3a82ad = "正常结束";
    let _0x1173aa;
    while ((_0x1173aa = this.getNextTask()) && !this.stopAllTasks) {
      logUser("\n[进度] 执行 " + _0x1173aa.type + " 任务 (" + (_0x1173aa.currentCount + 1) + "/" + _0x1173aa.targetCount + ")", "info");
      await this.executeTask(_0x1173aa.type);
      _0x1173aa.currentCount++;
      _0x48a09c++;
      if (this.getNextTask() && !this.stopAllTasks) {
        const _0x27a247 = Math.floor(Math.random() * 20100) + 10000;
        logUser("[休息] 任务间隔 " + Math.round(_0x27a247 / 1000) + " 秒...", "info");
        await new Promise(_0x20619c => setTimeout(_0x20619c, _0x27a247));
      }
    }
    if (this.continuous1CoinCount >= this.continuous1CoinLimit) {
      _0x3a82ad = "连续" + this.continuous1CoinLimit + "次1金币";
    } else {
      if (this.adInfoFailCount >= this.maxAdInfoFailCount) {
        _0x3a82ad = "广告获取失败达上限(" + this.maxAdInfoFailCount + "次)（含llsid解析失败）";
      } else {
        if (!this.getNextTask()) {
          _0x3a82ad = "所有指定任务已完成";
        } else {
          if (_0x3d30d9.ckExpired) {
            _0x3a82ad = "Cookie过期";
          } else {
            if (this.stopAllTasks) {
              _0x3a82ad = "手动停止或其他异常";
            }
          }
        }
      }
    }
    const _0x18bc02 = await getAccountBasicInfo(this.cookie, this.platform, this.proxyUrl);
    const _0x575be8 = _0x18bc02.success ? _0x18bc02.totalCoin : this.currentCoinBalance;
    const _0x551b51 = _0x18bc02.success ? _0x18bc02.allCash.toFixed(2) : "未知";
    logUser("[" + this.platform.name + "---" + this.remark + "] 任务结束 | 本账号累计获得: " + this.accountTotalEarned + "金币 | 最终账户金币余额: " + _0x575be8 + " | 最终现金余额: " + _0x551b51 + " | 停止原因: " + _0x3a82ad, "success");
    return {
      success: true,
      index: this.index,
      remark: this.remark,
      platform: this.platform.name,
      taskCount: _0x48a09c,
      totalReward: this.accountTotalEarned,
      exitIP: this.clientIP,
      stopReason: _0x3a82ad
    };
  }
}
async function runConcurrentTasks(_0x1a9a9b) {
  logUser(" 启动并发执行，账号总数: " + _0x1a9a9b.length, "success");
  const _0xe46816 = _0x1a9a9b.map(_0x9d478 => {
    return async () => {
      const _0x2d8a8e = new KuaishouAccount(_0x9d478);
      await new Promise(_0x181f20 => setTimeout(_0x181f20, 200));
      return await _0x2d8a8e.executeTaskLoop();
    };
  });
  const _0x5341d5 = await Promise.all(_0xe46816.map(_0x4ec611 => _0x4ec611()));
  return _0x5341d5;
}
function parseAccountConfig(_0x56ad46, _0x5002d4) {
  if (!_0x56ad46 || typeof _0x56ad46 !== "string") {
    logError("账号" + _0x5002d4 + "解析失败", new Error("配置为空或非字符串"), "账号" + _0x5002d4 + "配置解析");
    return null;
  }
  const _0x5d28e2 = _0x56ad46.split("#").map(_0x30ac9a => _0x30ac9a.trim());
  if (_0x5d28e2.length < 4) {
    logError("账号" + _0x5002d4 + "解析失败", new Error("配置格式错误，需至少4段（备注#PHPKey#Cookie#Salt[#Proxy]）"), "账号" + _0x5002d4 + "配置解析");
    return null;
  }
  const [_0x918ab, _0x43f3b9, _0x1432ff, _0x25a7f8, _0x52cff7] = _0x5d28e2;
  if (!_0x918ab) {
    logDev("账号" + _0x5002d4 + "解析警告", "备注为空，使用默认名");
  }
  if (!_0x43f3b9) {
    logError("账号" + _0x5002d4 + "解析失败", new Error("缺失PHP Key"), "账号" + _0x5002d4 + "配置解析");
    return null;
  }
  if (!_0x1432ff) {
    logError("账号" + _0x5002d4 + "解析失败", new Error("缺失Cookie"), "账号" + _0x5002d4 + "配置解析");
    return null;
  }
  if (!_0x25a7f8) {
    logError("账号" + _0x5002d4 + "解析失败", new Error("缺失Salt"), "账号" + _0x5002d4 + "配置解析");
    return null;
  }
  let _0x4806d1 = null;
  let _0x3659eb = "本地模式";
  if (_0x52cff7 && _0x52cff7.startsWith("socks5")) {
    _0x4806d1 = _0x52cff7;
    _0x3659eb = "代理模式";
  } else {
    _0x52cff7 && logDev("账号" + _0x5002d4 + "代理配置警告", "非Socks5代理：" + _0x52cff7 + "，将使用本地模式");
  }
  logUser("加载账号" + _0x5002d4 + ": " + (_0x918ab || "未命名") + " (" + _0x3659eb + ")", "success");
  return {
    index: _0x5002d4,
    remark: _0x918ab || "未命名",
    phpKey: _0x43f3b9,
    cookie: _0x1432ff,
    salt: _0x25a7f8,
    proxyUrl: _0x4806d1,
    runMode: _0x3659eb
  };
}
function loadAccountsFromEnv() {
  const _0x52edcd = [];
  const _0xb3db94 = new Set();
  let _0x5e6402 = 1;
  logUser("开始加载账号配置", "info");
  process.env.ksck && process.env.ksck.split("&").forEach(_0x5e0426 => {
    _0x5e0426 = _0x5e0426.trim();
    if (_0x5e0426 && !_0xb3db94.has(_0x5e0426)) {
      const _0xda81bb = parseAccountConfig(_0x5e0426, _0x5e6402);
      _0xda81bb && (_0x52edcd.push(_0xda81bb), _0xb3db94.add(_0x5e0426), _0x5e6402++);
    }
  });
  for (let _0x53dce9 = 1; _0x53dce9 <= 666; _0x53dce9++) {
    const _0x1d0f27 = "ksck" + _0x53dce9;
    if (process.env[_0x1d0f27]) {
      const _0x56b8b1 = process.env[_0x1d0f27].trim();
      if (_0x56b8b1 && !_0xb3db94.has(_0x56b8b1)) {
        const _0x220634 = parseAccountConfig(_0x56b8b1, _0x5e6402);
        _0x220634 && (_0x52edcd.push(_0x220634), _0xb3db94.add(_0x56b8b1), _0x5e6402++);
      }
    }
  }
  logUser(" 账号加载完成，有效账号总数: " + _0x52edcd.length + "个", "success");
  return _0x52edcd;
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
    const _0x7fb952 = loadAccountsFromEnv();
    _0x7fb952.length === 0 && (logError("脚本执行失败", new Error("无有效账号配置"), "账号加载"), process.exit(1));
    const _0x4e6958 = await runConcurrentTasks(_0x7fb952);
    logUser("\n=========================================", "info");
    logUser("📊 全局汇总统计", "info");
    const _0x5b1367 = _0x4e6958.filter(_0x5c26a2 => _0x5c26a2.success);
    const _0x5af34d = _0x4e6958.filter(_0x4e9b2d => !_0x4e9b2d.success && _0x4e9b2d.stopReason === "Cookie过期").length;
    const _0x3959d0 = _0x5b1367.reduce((_0x127255, _0x5cbc26) => _0x127255 + _0x5cbc26.taskCount, 0);
    logUser("  有效账号: " + _0x5b1367.length + "/" + _0x7fb952.length, "info");
    logUser("  过期账号: " + _0x5af34d, "info");
    logUser("  总执行任务: " + _0x3959d0 + "次", "info");
    logUser("  全局所有账号最终累计获得: " + GLOBAL_TOTAL_EARNED_COINS + "金币", "success");
    _0x5b1367.length > 0 && (logUser("\n  各账号详情:", "info"), _0x5b1367.forEach((_0x47f06c, _0x394235) => {
      logUser("  " + (_0x394235 + 1) + ". [" + _0x47f06c.platform + "---" + _0x47f06c.remark + "]: 执行" + _0x47f06c.taskCount + "次 | 获" + _0x47f06c.totalReward + "金币 | IP: " + _0x47f06c.exitIP + " | 原因: " + _0x47f06c.stopReason, "info");
    }));
    logUser("\n 脚本执行完毕！", "success");
    process.exit(0);
  } catch (_0x398d13) {
    logError("脚本执行异常", _0x398d13, "脚本主函数");
    process.exit(1);
  }
}
main();