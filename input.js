//Mon Mar 23 2026 11:17:54 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
const MAX_EXTRA_AD_COUNT = 200,
  FIXED_DEVICE_CONFIG = {
    "ua": "kwai-android aegon/4.32.0",
    "model": "Xiaomi(24129PN5BC)",
    "android": {
      "sys": "ANDROID_15",
      "apiLevel": "35"
    },
    "screen": {
      "sw": "1440",
      "sh": "3200"
    },
    "net": "WIFI",
    "kcv": "1605",
    "boardPlatform": "kalama"
  },
  SCRIPT_VERSION = "版本1.2",
  VERSION_CHECK_URL = "https://xinghe.uu.pe/版本.html",
  UPDATE_TIP = "版本已有最新版，前往QQ群1076179487更新",
  fs = require("fs"),
  path = require("path"),
  https = require("https"),
  axios = require("axios"),
  querystring = require("querystring"),
  {
    SocksProxyAgent
  } = require("socks-proxy-agent");
process.noDeprecation = true;
async function checkScriptVersion() {
  console.log("🔍 开始版本验证 - 本地版本：" + SCRIPT_VERSION);
  try {
    const {
      response: _0x23a59d,
      body: _0x25112a
    } = await sendRequest({
      "method": "GET",
      "url": VERSION_CHECK_URL,
      "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9"
      },
      "timeout": 10000
    }, null, "版本验证请求");
    if (!_0x23a59d || _0x23a59d.statusCode !== 200 || !_0x25112a) return console.log("⚠️ 版本验证页面请求失败，跳过验证继续执行"), true;
    const _0x5e4931 = _0x25112a.match(/版本[\d\.]+/);
    if (!_0x5e4931) return console.log("⚠️ 版本验证页面未找到有效版本信息，跳过验证继续执行"), true;
    const _0x51ac4b = _0x5e4931[0];
    console.log("🌐 远程版本：" + _0x51ac4b);
    if (_0x51ac4b !== SCRIPT_VERSION) {
      console.log("\n❌ " + UPDATE_TIP + "\n");
      return false;
    }
    console.log("✅ 版本验证通过 - 本地版本与远程版本一致");
    console.log("✅ 永久免费公益群1076179487");
    return true;
  } catch (_0x53d090) {
    console.log("⚠️ 版本验证异常：" + _0x53d090.message + "，跳过验证继续执行");
    return true;
  }
}
function generateRandomInteractionMessage() {
  const _0x2a0887 = ["正在观看广告", "认真观看中...", "浏览广告内容", "模拟用户行为", "观看视频广告", "保持活跃状态", "广告浏览中", "正常观看时长"];
  return _0x2a0887[Math.floor(Math.random() * _0x2a0887.length)];
}
const enableDidChange = process.env.ENABLE_DID_CHANGE === "1" || process.env.ENABLE_DID_CHANGE === "true";
function getEnvNumber(_0x38bb94, _0x486bf0) {
  const _0x19eb33 = parseInt(process.env[_0x38bb94], 10);
  return isNaN(_0x19eb33) ? _0x486bf0 : _0x19eb33;
}
const KSLOW_REWARD_THRESHOLD = getEnvNumber("KSLOW_REWARD_THRESHOLD", 5),
  KSROUNDS = getEnvNumber("KSROUNDS", 10),
  KSCOIN_LIMIT = getEnvNumber("KSCOIN_LIMIT", 25000),
  KSLOW_REWARD_LIMIT = getEnvNumber("KSLOW_REWARD_LIMIT", 3),
  enableExtraTaskCheck = process.env.ewrw === "1";
function getTasksToExecute() {
  const _0x28d46b = process.env.Task;
  if (!_0x28d46b) return ["look", "looks", "food", "foods"];
  const _0x41a81c = _0x28d46b.split(",").map(_0x1fa1d8 => _0x1fa1d8.trim().toLowerCase()).filter(Boolean),
    _0x4c7ee1 = ["content", "contents", "look", "looks", "food", "foods", "box", "boxs"],
    _0x34980d = _0x41a81c.filter(_0x15ca5b => _0x4c7ee1.includes(_0x15ca5b));
  if (_0x34980d.length === 0) {
    return ["look", "looks", "food", "foods"];
  }
  console.log("📋 从Task环境变量中解析到要执行的任务: " + _0x34980d.join(", "));
  return _0x34980d;
}
function getAccountConfigsFromEnv() {
  const _0x46b5f2 = [],
    _0x2bbefb = new Set();
  if (process.env.ksck) {
    const _0x221299 = process.env.ksck,
      _0x5097c1 = _0x221299.split("&").map(_0x54153d => _0x54153d.trim()).filter(Boolean);
    _0x46b5f2.push(..._0x5097c1);
  }
  for (let _0x53b148 = 1; _0x53b148 <= 999; _0x53b148++) {
    {
      const _0x9da02a = "ksck" + _0x53b148;
      if (process.env[_0x9da02a]) {
        {
          const _0x4af9b4 = process.env[_0x9da02a],
            _0x4423e1 = _0x4af9b4.split("&").map(_0xd2b9b0 => _0xd2b9b0.trim()).filter(Boolean);
          _0x46b5f2.push(..._0x4423e1);
        }
      }
    }
  }
  const _0x3e1034 = [];
  for (const _0x5adc88 of _0x46b5f2) {
    !_0x2bbefb.has(_0x5adc88) && (_0x2bbefb.add(_0x5adc88), _0x3e1034.push(_0x5adc88));
  }
  return _0x3e1034;
}
let accountConfigs, accountCount, tasksToExecute, taskNameMap, maxConcurrency;
async function sendRequest(_0x393336, _0x4ddd59 = null, _0x32b3b6 = "Unknown Request") {
  const _0x4b0f8c = {
    "method": _0x393336.method || "GET",
    "url": _0x393336.url,
    "headers": _0x393336.headers || {},
    "timeout": _0x393336.timeout || 15000,
    "validateStatus": () => true,
    "httpsAgent": new https.Agent({
      "rejectUnauthorized": false
    })
  };
  if (_0x393336.body) _0x4b0f8c.data = _0x393336.body;else _0x393336.form && (_0x4b0f8c.data = querystring.stringify(_0x393336.form), _0x4b0f8c.headers["Content-Type"] = "application/x-www-form-urlencoded");
  if (_0x4ddd59) try {
    _0x4b0f8c.httpsAgent = new SocksProxyAgent(_0x4ddd59);
    _0x4b0f8c.httpAgent = new SocksProxyAgent(_0x4ddd59);
  } catch (_0x5cf2d2) {
    console.log("❌ [错误] " + _0x32b3b6 + " 代理URL无效(" + _0x5cf2d2.message + ")，尝试直连模式");
  }
  try {
    const _0x1f7c31 = await axios(_0x4b0f8c),
      _0x5c91f5 = _0x1f7c31.data;
    if (_0x1f7c31.status !== 200) {
      console.log("❌ [" + _0x32b3b6 + "] HTTP " + _0x1f7c31.status + ": " + (typeof _0x5c91f5 === "string" ? _0x5c91f5.substring(0, 200) : JSON.stringify(_0x5c91f5).substring(0, 200)));
      return {
        "response": {
          "statusCode": _0x1f7c31.status
        },
        "body": null
      };
    }
    return {
      "response": {
        "statusCode": _0x1f7c31.status
      },
      "body": _0x5c91f5
    };
  } catch (_0xbdb740) {
    {
      console.log("❌ [" + _0x32b3b6 + "] 请求异常: " + _0xbdb740.message);
      if (_0xbdb740.name === "AggregateError" && Array.isArray(_0xbdb740.errors)) return {
        "response": null,
        "body": null
      };
      return {
        "response": null,
        "body": null
      };
    }
  }
}
async function testProxyConnectivity(_0x266636, _0x2bfdd8 = "代理连通性检测") {
  if (!_0x266636) {
    return {
      "ok": true,
      "msg": "✅ 未配置代理（直连模式）",
      "ip": "localhost"
    };
  }
  const {
    response: _0x5b17a2,
    body: _0x46c122
  } = await sendRequest({
    "method": "GET",
    "url": "https://ip9.com.cn/get",
    "headers": {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    },
    "timeout": 8000
  }, _0x266636, _0x2bfdd8 + " → ip9.com.cn");
  if (!_0x46c122) return {
    "ok": false,
    "msg": "❌ 无法通过代理访问 ip9.com.cn",
    "ip": ""
  };
  let _0x354867 = "";
  if (typeof _0x46c122 === "string") {
    try {
      const _0x146787 = JSON.parse(_0x46c122);
      _0x354867 = _0x146787.ip || _0x146787.IP || _0x146787.addr || _0x146787.ip_address || _0x146787.query || _0x146787.data && _0x146787.data.ip || "";
    } catch {
      {
        const _0x2934ec = String(_0x46c122).match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
        _0x354867 = _0x2934ec ? _0x2934ec[0] : "";
      }
    }
  } else _0x46c122 && typeof _0x46c122 === "object" && (_0x354867 = _0x46c122.ip || _0x46c122.IP || _0x46c122.addr || _0x46c122.ip_address || _0x46c122.query || _0x46c122.data && _0x46c122.data.ip || "");
  return {
    "ok": true,
    "msg": "✅ SOCKS5代理正常，出口IP: " + (_0x354867 || "未知"),
    "ip": _0x354867 || "未知"
  };
}
async function getNickname(_0x4712b6, _0x5eee46, _0x574293 = "?") {
  const _0x3e2487 = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=timer",
    _0x5b5367 = _0x4712b6.replace(/kpn=KUAISHOU/, "kpn=NEBULA"),
    {
      response: _0x53ce8c,
      body: _0x2eea28
    } = await sendRequest({
      "method": "GET",
      "url": _0x3e2487,
      "headers": {
        "Host": "nebula.kuaishou.com",
        "User-Agent": FIXED_DEVICE_CONFIG.ua,
        "Cookie": _0x5b5367,
        "referer": "https://nebula.kuaishou.com/nebula/task/earning",
        "X-Requested-With": "com.kuaishou.nebula"
      },
      "timeout": 12000
    }, _0x5eee46, "账号[" + _0x574293 + "] 获取昵称");
  if (_0x2eea28 && _0x2eea28.result === 1 && _0x2eea28.data) return {
    "nickname": _0x2eea28.data.userData?.["nickname"] || null,
    "totalCoin": _0x2eea28.data.totalCoin ?? null,
    "totalCash": _0x2eea28.data.totalCash ?? null
  };
  return null;
}
async function getAccountBasicInfo(_0x27d182, _0x32190c, _0x1e29c7 = "?") {
  const _0x998f19 = "https://encourage.kuaishou.com/rest/wd/encourage/account/basicInfo",
    _0x241333 = _0x27d182.replace(/kpn=NEBULA/, "kpn=KUAISHOU"),
    {
      response: _0x2c7edf,
      body: _0x251092
    } = await sendRequest({
      "method": "GET",
      "url": _0x998f19,
      "headers": {
        "Host": "encourage.kuaishou.com",
        "User-Agent": FIXED_DEVICE_CONFIG.ua,
        "Cookie": _0x241333,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "timeout": 12000
    }, _0x32190c, "账号[" + _0x1e29c7 + "] 获取基本信息");
  if (_0x251092 && _0x251092.result === 1 && _0x251092.data) return {
    "nickname": _0x251092.data.userData?.["nickname"] || _0x1e29c7,
    "totalCoin": _0x251092.data.coinAmount ?? null,
    "allCash": _0x251092.data.cashAmountDisplay ?? null
  };
  return null;
}
function centerAlign(_0x93e46f, _0x2f1069) {
  _0x93e46f = String(_0x93e46f);
  if (_0x93e46f.length >= _0x2f1069) return _0x93e46f.substring(0, _0x2f1069);
  const _0x5de9e2 = _0x2f1069 - _0x93e46f.length,
    _0x54de7f = Math.floor(_0x5de9e2 / 2),
    _0x5cdc44 = _0x5de9e2 - _0x54de7f;
  return " ".repeat(_0x54de7f) + _0x93e46f + " ".repeat(_0x5cdc44);
}
async function simulatePreheat() {
  const _0x52beab = Math.floor(Math.random() * 2) + 1;
  console.log("🔥 模拟刷" + _0x52beab + "条短视频预热...");
  for (let _0x5963dd = 0; _0x5963dd < _0x52beab; _0x5963dd++) {
    const _0x47a20b = Math.floor(Math.random() * 10) + 10;
    await new Promise(_0x537077 => setTimeout(_0x537077, _0x47a20b * 1000));
    console.log("   第" + (_0x5963dd + 1) + "条短视频观看完成，等待" + _0x47a20b + "秒");
  }
}
async function simulateAdWatch(_0x52d1a7) {
  const _0x55ea96 = Math.floor(Math.random() * 10) + 35;
  console.log("👀 预计奖励" + _0x52d1a7 + "金币，" + generateRandomInteractionMessage() + " " + _0x55ea96 + "秒");
  let _0x3beb21 = 0;
  while (_0x3beb21 < _0x55ea96 * 1000) {
    {
      const _0x572646 = Math.floor(Math.random() * 5) + 5,
        _0x2cb67c = Math.min(_0x3beb21 + _0x572646 * 1000, _0x55ea96 * 1000),
        _0x1cac8a = _0x2cb67c - _0x3beb21;
      await new Promise(_0xbe2a69 => setTimeout(_0xbe2a69, _0x1cac8a));
      _0x3beb21 = _0x2cb67c;
      _0x3beb21 < _0x55ea96 * 1000 && console.log("   模拟点击屏幕空白处");
    }
  }
}
async function simulateAdClick(_0x528aae) {
  if (!_0x528aae.adUrl || _0x528aae.estimatedReward < 30) return;
  console.log("🎯 高价值广告，模拟点击广告按钮...");
  await new Promise(_0x5ef9d2 => setTimeout(_0x5ef9d2, (Math.floor(Math.random() * 3) + 2) * 1000));
  console.log("🔗 模拟访问广告落地页...");
  try {
    const _0x31091a = {
      "method": "GET",
      "url": _0x528aae.adUrl,
      "headers": {
        "User-Agent": FIXED_DEVICE_CONFIG.ua,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "zh-CN,zh;q=0.9"
      },
      "timeout": 60000
    };
    await axios(_0x31091a);
    const _0x1b350d = Math.floor(Math.random() * 5) + 10;
    await new Promise(_0xe9dea6 => setTimeout(_0xe9dea6, _0x1b350d * 1000));
    console.log("   广告落地页访问完成，等待" + _0x1b350d + "秒");
  } catch (_0x2cb910) {
    console.log("   广告落地页访问失败（不影响任务提交）: " + _0x2cb910.message);
  }
}
class KuaishouAdTask {
  constructor({
    index: _0x5a85ba,
    salt: _0x4a8fa5,
    cookie: _0x31fc97,
    nickname = "",
    proxyUrl = null,
    tasksToExecute = [],
    remark = ""
  }) {
    this.index = _0x5a85ba;
    this.salt = _0x4a8fa5;
    this.cookie = _0x31fc97;
    this.nickname = nickname || remark || "账号" + _0x5a85ba;
    this.remark = remark;
    this.proxyUrl = proxyUrl;
    this.coinLimit = KSCOIN_LIMIT;
    this.coinExceeded = false;
    this.tasksToExecute = tasksToExecute;
    this.maxExtraAdCount = MAX_EXTRA_AD_COUNT;
    this.extraAdExecutedCount = 0;
    this.extraTaskKeys = tasksToExecute.filter(_0xb68721 => _0xb68721.endsWith("s"));
    this.normalTaskKeys = tasksToExecute.filter(_0x5550c7 => !_0x5550c7.endsWith("s"));
    this.extractCookieInfo();
    this.headers = {
      "Host": "nebula.kuaishou.com",
      "User-Agent": FIXED_DEVICE_CONFIG.ua,
      "Accept-Language": "zh-cn",
      "Cookie": this.cookie,
      "Content-Type": "application/json"
    };
    this.taskReportPath = "/rest/r/ad/task/report";
    this.queryParams = "mod=" + encodeURIComponent(FIXED_DEVICE_CONFIG.model) + "&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
    this.sessionStore = {};
    this.extraToNormalMap = {
      "boxs": "box",
      "looks": "look",
      "foods": "food",
      "contents": "content",
      "bizstrs": "bizstr"
    };
    this.taskConfigsOfficial = {
      "box": {
        "name": "宝箱广告",
        "businessId": 604,
        "posId": 20347,
        "subPageId": 100024063,
        "pageId": 100011251,
        "requestSceneType": 1,
        "taskType": 1
      },
      "boxs": {
        "name": "宝箱广告[追加]",
        "businessId": 604,
        "posId": 20347,
        "subPageId": 100024063,
        "pageId": 100011251,
        "requestSceneType": 7,
        "taskType": 2
      },
      "look": {
        "name": "看广告得金币",
        "businessId": 671,
        "posId": 24068,
        "subPageId": 100026368,
        "pageId": 100011251,
        "requestSceneType": 1,
        "taskType": 1
      },
      "looks": {
        "name": "看广告得金币[追加]",
        "businessId": 671,
        "posId": 24068,
        "subPageId": 100026368,
        "pageId": 100011251,
        "requestSceneType": 7,
        "taskType": 2
      },
      "food": {
        "name": "饭补",
        "businessId": 921,
        "posId": 29742,
        "subPageId": 100029908,
        "requestSceneType": 1,
        "taskType": 1
      },
      "foods": {
        "name": "饭补[追加]",
        "businessId": 921,
        "posId": 29742,
        "subPageId": 100029908,
        "requestSceneType": 7,
        "taskType": 2
      },
      "content": {
        "name": "看内容广告得金币",
        "businessId": 7044,
        "posId": 182533,
        "subPageId": 100138797,
        "pageId": 11101,
        "requestSceneType": 1,
        "taskType": 1
      },
      "contents": {
        "name": "看内容广告得金币[追加]",
        "businessId": 7044,
        "posId": 182533,
        "subPageId": 100138797,
        "pageId": 11101,
        "requestSceneType": 7,
        "taskType": 2
      }
    };
    this.taskConfigsNebula = {
      "box": {
        "name": "宝箱广告",
        "businessId": 606,
        "posId": 20346,
        "subPageId": 100024064,
        "pageId": 11101,
        "requestSceneType": 1,
        "taskType": 1
      },
      "boxs": {
        "name": "宝箱广告[追加]",
        "businessId": 606,
        "posId": 20346,
        "subPageId": 100024064,
        "pageId": 11101,
        "requestSceneType": 7,
        "taskType": 2
      },
      "look": {
        "name": "看广告得金币",
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "pageId": 11101,
        "requestSceneType": 1,
        "taskType": 1
      },
      "looks": {
        "name": "看广告得金币[追加]",
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "pageId": 11101,
        "requestSceneType": 7,
        "taskType": 2
      },
      "food": {
        "name": "饭补",
        "businessId": 9362,
        "posId": 24067,
        "subPageId": 100026367,
        "pageId": 11101,
        "requestSceneType": 1,
        "taskType": 1
      },
      "foods": {
        "name": "饭补[追加]",
        "businessId": 9362,
        "posId": 24067,
        "subPageId": 100026367,
        "pageId": 11101,
        "requestSceneType": 7,
        "taskType": 2
      },
      "content": {
        "name": "看内容广告得金币",
        "businessId": 7044,
        "posId": 182533,
        "subPageId": 100138797,
        "pageId": 11101,
        "requestSceneType": 1,
        "taskType": 1
      },
      "contents": {
        "name": "看内容广告得金币[追加]",
        "businessId": 7044,
        "posId": 182533,
        "subPageId": 100138797,
        "pageId": 11101,
        "requestSceneType": 7,
        "taskType": 2
      }
    };
    this.taskConfigs = this.isKuaishouOfficial ? this.taskConfigsOfficial : this.taskConfigsNebula;
    this.taskStats = {};
    tasksToExecute.forEach(_0x40c949 => {
      this.taskConfigs[_0x40c949] && (this.taskStats[_0x40c949] = {
        "success": 0,
        "failed": 0,
        "totalReward": 0
      });
    });
    this.lowRewardStreak = 0;
    this.lowRewardThreshold = KSLOW_REWARD_THRESHOLD;
    this.lowRewardLimit = KSLOW_REWARD_LIMIT;
    this.stopAllTasks = false;
    this.stopExtraTasks = false;
    this.totalReward = 0;
    this.taskLimitReached = {};
    tasksToExecute.forEach(_0x3e061d => {
      if (this.taskConfigs[_0x3e061d]) {
        this.taskLimitReached[_0x3e061d] = false;
      }
    });
  }
  async ["checkCoinLimit"]() {
    try {
      {
        const _0x24cbb9 = await getAccountBasicInfo(this.cookie, this.proxyUrl, this.index);
        if (_0x24cbb9 && _0x24cbb9.totalCoin) {
          const _0x25711e = parseInt(_0x24cbb9.totalCoin);
          if (_0x25711e >= this.coinLimit) {
            {
              console.log("⚠️ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币已达 " + _0x25711e + "，超过 " + this.coinLimit + " 阈值，停止任务");
              this.coinExceeded = true;
              this.stopAllTasks = true;
              this.stopExtraTasks = true;
              return true;
            }
          }
        }
        return false;
      }
    } catch (_0x5483a9) {
      console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币检查异常: " + _0x5483a9.message);
      return false;
    }
  }
  ["extractCookieInfo"]() {
    try {
      const _0x45ac7e = this.cookie.match(/egid=([^;]+)/),
        _0x30fdf2 = this.cookie.match(/did=([^;]+)/),
        _0x175e78 = this.cookie.match(/userId=([^;]+)/),
        _0x3161ea = this.cookie.match(/kuaishou\.api_st=([^;]+)/),
        _0x18a306 = this.cookie.match(/kpn=([^;]+)/),
        _0xd86d5d = this.cookie.match(/earphoneMode=([^;]+)/);
      this.egid = _0x45ac7e ? _0x45ac7e[1] : "";
      this.did = _0x30fdf2 ? _0x30fdf2[1] : "";
      this.userId = _0x175e78 ? _0x175e78[1] : "";
      this.kuaishouApiSt = _0x3161ea ? _0x3161ea[1] : "";
      this.kpn = _0x18a306 ? _0x18a306[1] : "KUAISHOU";
      this.earphoneMode = _0xd86d5d ? _0xd86d5d[1] : "1";
      this.mod = FIXED_DEVICE_CONFIG.model;
      this.sys = FIXED_DEVICE_CONFIG.android.sys;
      this.androidApiLevel = FIXED_DEVICE_CONFIG.android.apiLevel;
      this.sw = FIXED_DEVICE_CONFIG.screen.sw;
      this.sh = FIXED_DEVICE_CONFIG.screen.sh;
      this.net = FIXED_DEVICE_CONFIG.net;
      this.kcv = FIXED_DEVICE_CONFIG.kcv;
      this.boardPlatform = FIXED_DEVICE_CONFIG.boardPlatform;
      this.isKuaishouOfficial = this.kpn === "KUAISHOU";
      this.versionLabel = this.isKuaishouOfficial ? "普通" : "极速";
      this.appver = "13.9.10.10684";
      this.signServiceUrl = this.isKuaishouOfficial ? "http://111.170.14.34:16668" : "http://111.170.14.34:16667";
      this.clientKey = this.isKuaishouOfficial ? "3c2cd3f3" : "2ac2a76d";
      this.appId = this.isKuaishouOfficial ? "kuaishou" : "kuaishou_nebula";
      this.appName = this.isKuaishouOfficial ? "快手" : "快手极速版";
      this.packageName = this.isKuaishouOfficial ? "com.smile.gifmaker" : "com.kuaishou.nebula";
      (!this.egid || !this.did) && console.log("⚠️ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " cookie无egid/did，继续尝试执行");
    } catch (_0x29fd23) {
      console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 解析cookie失败: " + _0x29fd23.message);
    }
  }
  ["getTaskStats"]() {
    return this.taskStats;
  }
  ["printTaskStats"]() {
    console.log("\n👤 [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 任务执行统计:");
    console.log("📊 追加广告已执行：" + this.extraAdExecutedCount + "/" + this.maxExtraAdCount + " 个");
    for (const [_0x591dd0, _0x49b03c] of Object.entries(this.taskStats)) {
      const _0x2cd2d3 = this.taskConfigs[_0x591dd0].name;
      console.log(" " + _0x2cd2d3 + ": 成功" + _0x49b03c.success + "次, 失败" + _0x49b03c.failed + "次, 总奖励" + _0x49b03c.totalReward + "金币");
    }
  }
  async ["retryOperation"](_0x3059e9, _0x511b33, _0x581bba = 3, _0x38ce21 = 2000) {
    let _0x225db3 = 0,
      _0x1b314e = null;
    while (_0x225db3 < _0x581bba) {
      {
        try {
          const _0x397caf = await _0x3059e9();
          if (_0x397caf) return _0x397caf;
          _0x1b314e = new Error(_0x511b33 + " 返回空结果");
        } catch (_0x2bdba6) {
          _0x1b314e = _0x2bdba6;
        }
        _0x225db3++;
        _0x225db3 < _0x581bba && (await new Promise(_0x25a42c => setTimeout(_0x25a42c, _0x38ce21)));
      }
    }
    console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x511b33 + " 失败");
    return null;
  }
  async ["getAdInfo"](_0x3be9ab, _0x59fbbd) {
    try {
      {
        const _0x186e56 = "/rest/e/reward/mixed/ad",
          _0x39d28e = {
            "encData": "|encData|",
            "sign": "|sign|",
            "cs": "false",
            "client_key": this.clientKey,
            "videoModelCrowdTag": "1_23",
            "os": "android",
            "kuaishou.api_st": this.kuaishouApiSt,
            "uQaTag": "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
          },
          _0x3c93ef = {
            "earphoneMode": this.earphoneMode,
            "mod": this.mod,
            "appver": this.appver,
            "isp": "CUCC",
            "language": "zh-cn",
            "ud": this.userId,
            "did_tag": "0",
            "net": this.net,
            "kcv": this.kcv,
            "app": "0",
            "kpf": "ANDROID_PHONE",
            "ver": "11.6",
            "android_os": "0",
            "boardPlatform": this.boardPlatform,
            "kpn": this.kpn,
            "androidApiLevel": this.androidApiLevel,
            "country_code": "cn",
            "sys": this.sys,
            "sw": this.sw,
            "sh": this.sh,
            "abi": "arm64",
            "userRecoBit": "0"
          },
          _0x4453e2 = {
            "appInfo": {
              "appId": this.appId,
              "name": this.appName,
              "packageName": this.packageName,
              "version": this.appver,
              "versionCode": -1
            },
            "deviceInfo": {
              "osType": 1,
              "osVersion": this.sys.replace("ANDROID_", ""),
              "deviceId": this.did,
              "screenSize": {
                "width": parseInt(this.sw) || 1080,
                "height": parseInt(this.sh) || 2249
              },
              "ftt": ""
            },
            "userInfo": {
              "userId": this.userId,
              "age": 0,
              "gender": ""
            },
            "impInfo": [{
              "pageId": _0x59fbbd.pageId || 100011251,
              "subPageId": _0x59fbbd.subPageId,
              "action": 0,
              "browseType": 3,
              "impExtData": "{}",
              "mediaExtData": "{}"
            }]
          },
          _0x3cc37f = Buffer.from(JSON.stringify(_0x4453e2)).toString("base64");
        let _0x1f2797 = await this.getSign(_0x3cc37f);
        if (!_0x1f2797) return console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " getSign失败，无法获取" + _0x59fbbd.name), null;
        _0x39d28e.encData = _0x1f2797.encdata;
        _0x39d28e.sign = _0x1f2797.sign;
        let _0x28622b = await this.requestSignService({
          "urlpath": _0x186e56,
          "reqdata": querystring.stringify(_0x39d28e) + "&" + querystring.stringify(_0x3c93ef),
          "api_client_salt": this.salt
        });
        if (!_0x28622b) return console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " requestSignService失败，无法获取" + _0x59fbbd.name), null;
        _0x28622b.kaw && _0x28622b.kas && (this.headers.kaw = _0x28622b.kaw, this.headers.kas = _0x28622b.kas);
        const _0x211d95 = {
            ..._0x3c93ef,
            "sig": _0x28622b.sig,
            "__NS_sig3": _0x28622b.nssig3,
            "__NS_xfalcon": _0x28622b.xfalcon,
            "__NStokensig": _0x28622b.nstokensig
          },
          _0x3b2c68 = "https://api.e.kuaishou.com" + _0x186e56 + "?" + querystring.stringify(_0x211d95),
          {
            response: _0x5de352,
            body: _0x343e98
          } = await sendRequest({
            "method": "POST",
            "url": _0x3b2c68,
            "headers": {
              "Host": "api.e.kuaishou.com",
              "Accept-Language": "zh-cn",
              "X-REQUESTID": generateLegacy(),
              "User-Agent": FIXED_DEVICE_CONFIG.ua,
              "Cookie": "kuaishou_api_st=" + this.kuaishouApiSt
            },
            "form": _0x39d28e,
            "timeout": 15000
          }, this.proxyUrl, "[" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告");
        if (!_0x343e98) return null;
        if (_0x343e98.errorMsg === "OK" && _0x343e98.feeds && _0x343e98.feeds[0] && _0x343e98.feeds[0].ad) {
          const _0x59989c = _0x343e98.feeds[0].caption || _0x343e98.feeds[0].ad?.["caption"] || "";
          if (_0x59989c) {
            console.log("✅ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 成功获取到广告信息：" + _0x59989c);
          }
          const _0x12253c = _0x343e98.feeds[0].exp_tag || "",
            _0x571c48 = _0x12253c.split("/")[1]?.["split"]("_")?.[0] || "",
            _0x550c2d = _0x343e98.feeds[0].ad?.["adDataV2"]?.["inspirePersonalize"];
          let _0x397b9a = 0,
            _0x1ee3ba = 0;
          const _0x3e34c5 = _0x343e98.feeds[0].ad?.["extData"] || "{}";
          try {
            const _0x1b6ed7 = JSON.parse(_0x3e34c5);
            _0x1ee3ba = _0x1b6ed7.awardCoin;
          } catch (_0x11c9cf) {
            _0x1ee3ba = 0;
          }
          if (_0x1ee3ba && _0x1ee3ba !== "" && _0x1ee3ba !== 0) _0x397b9a = _0x1ee3ba;else {
            if (_0x550c2d?.["neoValue"] && _0x550c2d.neoValue !== "" && _0x550c2d.neoValue !== 0) _0x397b9a = _0x550c2d.neoValue;else _0x550c2d?.["awardValue"] && _0x550c2d.awardValue !== "" && _0x550c2d.awardValue !== 0 && (_0x397b9a = _0x550c2d.awardValue);
          }
          const _0x120d27 = _0x343e98.feeds[0].ad?.["adDataV2"]?.["deepRewardedInfo"],
            _0x4d32cc = _0x120d27?.["adlessWithPopWindow"] === true,
            _0xc1afd = _0x4d32cc ? parseInt(_0x120d27?.["deepRewardedCoin"] || "0", 10) : 0;
          let _0x584e84 = 0,
            _0xed350e = "",
            _0x46ed94 = 1;
          const _0x91e4ff = _0x343e98.feeds[0].ad?.["adDataV2"]?.["inspireAdInfo"]?.["inspireAdBillTime"] || 0,
            _0x5e4da4 = _0x343e98.feeds[0].ad?.["adDataV2"]?.["inspireAdInfo"]?.["adExtInfo"] || "";
          try {
            const _0x44ae66 = JSON.parse(_0x343e98.feeds[0].ad?.["extData"] || "{}");
            _0x584e84 = _0x44ae66.inspireTaskId || 0;
            _0xed350e = _0x44ae66.inspireSessionId || "";
            _0x46ed94 = _0x44ae66.requestSceneType || 1;
          } catch (_0x27cda9) {}
          const _0x4c0634 = _0x343e98.feeds[0].ad?.["url"] || "",
            _0x33af09 = _0x343e98.feeds[0].ad?.["packageName"] || "",
            _0x1515a4 = _0x343e98.feeds[0].ad?.["appName"] || "",
            _0x35302b = _0x33af09 && _0x1515a4 && _0x1515a4.toLowerCase().includes(".apk");
          _0x59fbbd.taskType === 1 && (this.sessionStore[_0x3be9ab] = {
            "sessionId": _0xed350e,
            "startTime": Date.now(),
            "normalAdBillTime": _0x91e4ff
          });
          return {
            "cid": _0x343e98.feeds[0].ad.creativeId,
            "llsid": _0x571c48,
            "estimatedReward": _0x397b9a,
            "hasExtraTask": _0x4d32cc,
            "extraReward": _0xc1afd,
            "inspireTaskId": _0x584e84,
            "inspireSessionId": _0xed350e,
            "requestSceneType": _0x46ed94,
            "inspireAdBillTime": _0x91e4ff,
            "adExtInfo": _0x5e4da4,
            "adUrl": _0x4c0634,
            "packageName": _0x33af09,
            "appName": _0x1515a4,
            "isApkDownload": _0x35302b
          };
        }
        return null;
      }
    } catch (_0x2f3868) {
      console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告异常: " + _0x2f3868.message);
      return null;
    }
  }
  async ["generateSignature"](_0x403ee4, _0x11690a, _0x4a7df9) {
    try {
      const _0x23dc4f = Math.floor(_0x403ee4.inspireAdBillTime / 1000),
        _0x27047c = _0x4a7df9.taskType === 2;
      let _0x55da3b, _0x561684, _0x5be469;
      if (_0x27047c) {
        const _0x57741a = this.extraToNormalMap[_0x11690a],
          _0x231852 = this.sessionStore[_0x57741a];
        if (!_0x231852) return console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 未找到" + _0x57741a + "的会话信息"), null;
        _0x55da3b = _0x231852.sessionId;
        _0x561684 = _0x231852.startTime;
        _0x5be469 = _0x561684 + _0x231852.normalAdBillTime + _0x403ee4.inspireAdBillTime;
      } else {
        _0x55da3b = _0x403ee4.inspireSessionId;
        _0x561684 = Date.now() - _0x403ee4.inspireAdBillTime;
        _0x5be469 = _0x561684 + _0x403ee4.inspireAdBillTime;
      }
      const _0x425d7b = [{
          "creativeId": _0x403ee4.cid,
          "extInfo": "",
          "llsid": _0x403ee4.llsid,
          "adExtInfo": _0x403ee4.adExtInfo,
          "inflow": _0x27047c,
          "materialTime": _0x23dc4f,
          "watchAdTime": _0x23dc4f,
          "requestSceneType": _0x27047c ? _0x4a7df9.requestSceneType : _0x403ee4.requestSceneType,
          "taskType": _0x4a7df9.taskType,
          "watchExpId": "",
          "watchStage": 0
        }],
        _0x16f965 = JSON.stringify({
          "businessId": _0x4a7df9.businessId,
          "endTime": _0x5be469,
          "extParams": "",
          "mediaScene": "video",
          "neoInfos": _0x425d7b,
          "pageId": _0x4a7df9.pageId || 100011251,
          "posId": _0x4a7df9.posId,
          "reportType": 0,
          "sessionId": _0x55da3b,
          "startTime": _0x561684,
          "subPageId": _0x4a7df9.subPageId
        }),
        _0x4b9dcd = "bizStr=" + encodeURIComponent(_0x16f965) + "&cs=false&client_key=" + this.clientKey + "&kuaishou.api_st=" + this.kuaishouApiSt,
        _0x33c011 = this.queryParams + "&" + _0x4b9dcd,
        _0x47a845 = await this.requestSignService({
          "urlpath": this.taskReportPath,
          "reqdata": _0x33c011,
          "api_client_salt": this.salt
        }, "[" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 生成报告签名");
      if (!_0x47a845) return null;
      _0x47a845.kaw && _0x47a845.kas && (this.headers.kaw = _0x47a845.kaw, this.headers.kas = _0x47a845.kas);
      return {
        "sig": _0x47a845.sig,
        "nssig3": _0x47a845.nssig3,
        "xfalcon": _0x47a845.xfalcon,
        "nstokensig": _0x47a845.nstokensig,
        "post": _0x4b9dcd
      };
    } catch (_0xae072e) {
      console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 生成签名异常: " + _0xae072e.message);
      return null;
    }
  }
  async ["submitReport"](_0x2a86e0, _0x29b930, _0x4f8460, _0x4f69c1, _0x1f6ff1, _0x511e6e, _0x3d0b49) {
    try {
      const _0xdbcb86 = "https://api.e.kuaishou.com" + this.taskReportPath + "?" + (this.queryParams + "&sig=" + _0x2a86e0 + "&__NS_sig3=" + _0x29b930 + "&__NS_xfalcon=" + _0x4f8460 + "&__NStokensig=" + _0x4f69c1),
        {
          response: _0x33443d,
          body: _0x5788ba
        } = await sendRequest({
          "method": "POST",
          "url": _0xdbcb86,
          "headers": {
            "Host": "api.e.kuaishou.com",
            "Accept-Language": "zh-cn",
            "X-REQUESTID": generateLegacy(),
            "User-Agent": FIXED_DEVICE_CONFIG.ua,
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": "kuaishou_api_st=" + this.kuaishouApiSt
          },
          "body": _0x1f6ff1,
          "timeout": 15000
        }, this.proxyUrl, "[" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 提交任务");
      if (!_0x5788ba) return {
        "success": false,
        "reward": 0
      };
      if (_0x5788ba.result === 1 || _0x5788ba.result === 500) {
        const _0x37f89c = _0x5788ba.data?.["neoAmount"] || 0;
        this.totalReward += _0x37f89c;
        const _0x1bec74 = "💰 [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x3d0b49.name + "获得" + _0x37f89c + "金币奖励！累计获得" + this.totalReward + "金币";
        console.log(_0x1bec74);
        _0x511e6e.endsWith("s") && (this.extraAdExecutedCount++, console.log("📊 追加广告进度：" + this.extraAdExecutedCount + "/" + this.maxExtraAdCount + " 个"), this.extraAdExecutedCount >= this.maxExtraAdCount && (console.log("✅ 追加广告已达到" + this.maxExtraAdCount + "个上限，停止追加任务"), this.stopExtraTasks = true));
        if (_0x37f89c <= this.lowRewardThreshold) {
          {
            this.lowRewardStreak++;
            enableDidChange == 1 && (this.did = generateKuaishouDid());
            if (_0x37f89c <= 1) {
              {
                if (_0x511e6e.endsWith("s")) this.extraTaskKeys = this.extraTaskKeys.filter(_0x3fa10a => _0x3fa10a !== _0x511e6e), console.log("⚠️ 追加任务" + this.taskConfigs[_0x511e6e].name + "奖励过低，移除执行列表");else {
                  this.normalTaskKeys = this.normalTaskKeys.filter(_0x470a2e => _0x470a2e !== _0x511e6e);
                  console.log("⚠️ 主任务" + this.taskConfigs[_0x511e6e].name + "奖励过低，移除执行列表");
                }
                this.normalTaskKeys.length + this.extraTaskKeys.length <= 0 && (this.stopAllTasks = true);
              }
            }
            this.lowRewardStreak >= this.lowRewardLimit && (console.log("🏁 连续" + this.lowRewardLimit + "次低奖励，停止全部任务"), this.stopAllTasks = true, this.stopExtraTasks = true);
          }
        } else this.lowRewardStreak = 0;
        this.taskStats[_0x511e6e].success++;
        this.taskStats[_0x511e6e].totalReward += _0x37f89c;
        return {
          "success": true,
          "reward": _0x37f89c
        };
      }
      if ([20107, 20108, 1003, 415].includes(_0x5788ba.result)) {
        {
          console.log("⚠️ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x3d0b49.name + " 已达上限");
          this.taskLimitReached[_0x511e6e] = true;
          if (_0x511e6e.endsWith("s")) this.extraTaskKeys = this.extraTaskKeys.filter(_0x58a30a => _0x58a30a !== _0x511e6e);else {
            this.normalTaskKeys = this.normalTaskKeys.filter(_0x55930a => _0x55930a !== _0x511e6e);
          }
          this.taskStats[_0x511e6e].failed++;
          return {
            "success": false,
            "reward": 0
          };
        }
      }
      console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x3d0b49.name + " 奖励失败，result=" + _0x5788ba.result + " msg=" + (_0x5788ba.data || ""));
      this.taskStats[_0x511e6e].failed++;
      return {
        "success": false,
        "reward": 0
      };
    } catch (_0x3e0288) {
      console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 提交任务异常: " + _0x3e0288.message);
      this.taskStats[_0x511e6e].failed++;
      return {
        "success": false,
        "reward": 0
      };
    }
  }
  async ["visitAdUrl"](_0x4dff3f) {
    return {
      "success": false,
      "type": "none",
      "filePath": null
    };
  }
  async ["downloadApk"](_0x254caa, _0xcad96c, _0x4684d0) {
    return {
      "success": false,
      "type": "apk",
      "filePath": _0xcad96c
    };
  }
  async ["visitUrl"](_0x2e34e0) {
    return {
      "success": false,
      "type": "url",
      "filePath": null
    };
  }
  ["deleteApkFile"](_0x24b726) {
    try {
      _0x24b726 && fs.existsSync(_0x24b726) && (fs.unlinkSync(_0x24b726), console.log("🗑️ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 已清理APK文件"));
    } catch (_0x3310dc) {}
  }
  async ["getSign"](_0x4730de) {
    const _0x1048bd = this.signServiceUrl + "/encsign";
    let _0xf4a442, _0x294d99;
    for (let _0x5bb456 = 0; _0x5bb456 < 3; _0x5bb456++) {
      {
        try {
          ({
            response: _0xf4a442,
            body: _0x294d99
          } = await sendRequest({
            "method": "POST",
            "url": _0x1048bd,
            "body": JSON.stringify({
              "data": _0x4730de
            }),
            "timeout": 30000,
            "headers": {
              "Content-Type": "application/json"
            }
          }, this.proxyUrl, "getSign"));
        } catch (_0x3f85e7) {
          console.log("getSign 请求异常: " + _0x3f85e7.message);
        }
        if (_0x294d99 && _0x294d99.data && _0x294d99.data.encdata) break;
      }
    }
    if (_0x294d99 && _0x294d99.data && _0x294d99.data.encdata) return _0x294d99.data;
    console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " getSign失败，接口返回: " + JSON.stringify(_0x294d99));
    return null;
  }
  async ["requestSignService"](_0x5923a6, _0x34b6fa) {
    const _0x2a0436 = this.signServiceUrl + "/nssig";
    let _0x42d5dd, _0x9c0232;
    for (let _0x43a9d1 = 0; _0x43a9d1 < 3; _0x43a9d1++) {
      try {
        ({
          response: _0x42d5dd,
          body: _0x9c0232
        } = await sendRequest({
          "method": "POST",
          "url": _0x2a0436,
          "headers": {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0"
          },
          "body": JSON.stringify({
            "path": _0x5923a6.urlpath,
            "data": _0x5923a6.reqdata,
            "salt": _0x5923a6.api_client_salt
          }),
          "timeout": 30000
        }, this.proxyUrl, _0x34b6fa + "（签名服务）"));
        if (_0x9c0232 && _0x9c0232.data && _0x9c0232.data.sig) break;
      } catch (_0x26fb03) {
        console.log("requestSignService 请求异常: " + _0x26fb03.message);
      }
    }
    if (_0x9c0232 && _0x9c0232.data && _0x9c0232.data.sig) return {
      "sig": _0x9c0232.data.sig,
      "nssig3": _0x9c0232.data.nssig3,
      "xfalcon": _0x9c0232.data.xfalcon,
      "nstokensig": _0x9c0232.data.nstokensig,
      "kaw": _0x9c0232.data.kaw,
      "kas": _0x9c0232.data.kas
    };
    console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 签名失败，接口返回: " + JSON.stringify(_0x9c0232));
    return null;
  }
  async ["executeTask"](_0x4e742e) {
    const _0x499362 = this.taskConfigs[_0x4e742e];
    if (!_0x499362) return console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 未知任务: " + _0x4e742e), false;
    if (this.taskLimitReached[_0x4e742e]) return false;
    let _0x14deba = null;
    try {
      const _0x3dcb7a = await this.retryOperation(() => this.getAdInfo(_0x4e742e, _0x499362), "获取" + _0x499362.name + "信息", 3);
      if (!_0x3dcb7a) return this.taskStats[_0x4e742e].failed++, false;
      await simulatePreheat();
      await simulateAdWatch(_0x3dcb7a.estimatedReward);
      await simulateAdClick(_0x3dcb7a);
      const _0x2263cc = await this.retryOperation(() => this.generateSignature(_0x3dcb7a, _0x4e742e, _0x499362), "生成" + _0x499362.name + "签名", 3);
      if (!_0x2263cc) return this.taskStats[_0x4e742e].failed++, this.deleteApkFile(_0x14deba?.["filePath"]), false;
      const _0x27cb69 = await this.retryOperation(() => this.submitReport(_0x2263cc.sig, _0x2263cc.nssig3, _0x2263cc.xfalcon, _0x2263cc.nstokensig, _0x2263cc.post, _0x4e742e, _0x499362), "提交" + _0x499362.name + "报告", 3);
      this.deleteApkFile(_0x14deba?.["filePath"]);
      return _0x27cb69?.["success"] || false;
    } catch (_0x476b9a) {
      console.log("❌ [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 任务异常(" + _0x4e742e + "): " + _0x476b9a.message);
      this.taskStats[_0x4e742e].failed++;
      this.deleteApkFile(_0x14deba?.["filePath"]);
      return false;
    }
  }
  async ["executeAllTasksByPriority"]() {
    console.log("🚀 [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 开始执行主任务");
    for (const _0x4de29f of this.normalTaskKeys) {
      {
        if (this.stopAllTasks) break;
        if (!this.taskConfigs[_0x4de29f]) continue;
        console.log("🚀 开始主任务：" + this.taskConfigs[_0x4de29f].name);
        await this.executeTask(_0x4de29f);
      }
    }
    console.log("\n🚀 [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 开始执行追加任务，目标" + this.maxExtraAdCount + "个");
    while (!this.stopAllTasks && !this.stopExtraTasks && this.extraTaskKeys.length > 0) {
      const _0x1d71f1 = [...this.extraTaskKeys].sort(() => Math.random() - 0.5);
      for (const _0x132006 of _0x1d71f1) {
        {
          if (this.stopAllTasks || this.stopExtraTasks) break;
          if (this.taskLimitReached[_0x132006]) continue;
          console.log("🚀 开始追加任务：" + this.taskConfigs[_0x132006].name);
          await this.executeTask(_0x132006);
          const _0x3fd9aa = Math.floor(Math.random() * 30) + 20;
          console.log("⏳ 追加任务间隔等待" + _0x3fd9aa + "秒");
          await new Promise(_0x3969d4 => setTimeout(_0x3969d4, _0x3fd9aa * 1000));
        }
      }
      await this.checkCoinLimit();
    }
    console.log("\n🏁 [" + this.versionLabel + "-" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 所有任务执行完成");
    return true;
  }
}
function parseAccountConfig(_0x1eb677) {
  const _0x249393 = String(_0x1eb677 || "").trim().split("#");
  if (_0x249393.length < 2) return null;
  let _0x4bf9eb = "",
    _0x4f1f31 = "",
    _0x4a5933 = "",
    _0x404326 = null;
  if (_0x249393.length === 2) _0x4f1f31 = _0x249393[0], _0x4a5933 = _0x249393[1];else {
    if (_0x249393.length === 3) /socks5:\/\//i.test(_0x249393[2]) ? (_0x4f1f31 = _0x249393[0], _0x4a5933 = _0x249393[1], _0x404326 = _0x249393[2]) : (_0x4bf9eb = _0x249393[0], _0x4f1f31 = _0x249393[1], _0x4a5933 = _0x249393[2]);else _0x249393.length >= 4 && (_0x4bf9eb = _0x249393[0], _0x4f1f31 = _0x249393[1], _0x4a5933 = _0x249393.slice(2, _0x249393.length - 1).join("#"), _0x404326 = _0x249393[_0x249393.length - 1]);
  }
  if (_0x404326) {
    if (_0x404326.includes("|")) {
      {
        const _0x1652d0 = _0x404326.split("|");
        if (_0x1652d0.length >= 2) {
          const [_0x4110a7, _0x2b8bc7, _0x51fb6b, _0x5bfc0a] = _0x1652d0;
          _0x404326 = "socks5://" + _0x51fb6b + ":" + _0x5bfc0a + "@" + _0x4110a7 + ":" + _0x2b8bc7;
        } else _0x404326 = null, console.log("⚠️ 代理字段格式错误，忽略：" + _0x404326);
      }
    } else !/^socks5:\/\//i.test(_0x404326) && (console.log("⚠️ 代理字段不是 socks5:// URL，忽略：" + _0x404326), _0x404326 = null);
  }
  return {
    "remark": _0x4bf9eb || "",
    "salt": _0x4a5933,
    "cookie": _0x4f1f31,
    "proxyUrl": _0x404326
  };
}
function loadAccountsFromEnv() {
  const _0x26c6ab = getAccountConfigsFromEnv(),
    _0x59abb4 = [];
  for (const _0x2516ec of _0x26c6ab) {
    const _0x3a15fa = parseAccountConfig(_0x2516ec);
    if (_0x3a15fa) {
      _0x59abb4.push(_0x3a15fa);
    } else console.log("❌ 账号格式错误：" + _0x2516ec);
  }
  _0x59abb4.forEach((_0x31eada, _0x3fff22) => {
    _0x31eada.index = _0x3fff22 + 1;
  });
  return _0x59abb4;
}
async function concurrentExecute(_0xe16e9c, _0x1c9394, _0x53b7c2) {
  const _0xba9fa2 = new Array(_0xe16e9c.length);
  let _0x46f1b = 0;
  async function _0x5d9156() {
    while (true) {
      {
        const _0x342a70 = _0x46f1b++;
        if (_0x342a70 >= _0xe16e9c.length) return;
        const _0x123ee7 = _0xe16e9c[_0x342a70];
        try {
          _0xba9fa2[_0x342a70] = await _0x53b7c2(_0x123ee7, _0x342a70);
        } catch (_0x44d4f2) {
          console.log("❌ 并发执行异常（index=" + (_0x342a70 + 1) + "）：" + _0x44d4f2.message);
          _0xba9fa2[_0x342a70] = null;
        }
      }
    }
  }
  const _0x23800d = Array.from({
    "length": Math.min(_0x1c9394, _0xe16e9c.length)
  }, _0x5d9156);
  await Promise.all(_0x23800d);
  return _0xba9fa2;
}
async function processAccount(_0x3b40a4) {
  const _0x1477b3 = _0x3b40a4.cookie.match(/kpn=([^;]+)/),
    _0x57752a = _0x1477b3 ? _0x1477b3[1] : "KUAISHOU",
    _0x2d8c62 = _0x57752a === "KUAISHOU" ? "普通" : "极速",
    _0x3f4822 = await getNickname(_0x3b40a4.cookie, _0x3b40a4.proxyUrl, _0x3b40a4.index),
    _0x3f6bf5 = _0x3f4822?.["nickname"] || "账号" + _0x3b40a4.index,
    _0x5df70e = await getAccountBasicInfo(_0x3b40a4.cookie, _0x3b40a4.proxyUrl, _0x3b40a4.index);
  if (_0x5df70e || _0x3f4822) {
    const _0x86876e = _0x5df70e?.["totalCoin"] != null ? _0x5df70e.totalCoin : "未知",
      _0x257255 = _0x5df70e?.["allCash"] != null ? _0x5df70e.allCash : "未知",
      _0x22d9bc = _0x3f4822?.["totalCoin"] != null ? _0x3f4822.totalCoin : "未知",
      _0x3695a3 = _0x3f4822?.["totalCash"] != null ? _0x3f4822.totalCash : "未知";
    if (_0x3b40a4.proxyUrl) {
      {
        const _0x15efe9 = await testProxyConnectivity(_0x3b40a4.proxyUrl, "代理测试");
        if (_0x15efe9.ok) console.log("✅ [" + _0x2d8c62 + "-" + _0x3f6bf5 + "]" + (_0x3b40a4.remark ? "（" + _0x3b40a4.remark + "）" : "") + " 登录成功！💰 普通金币: " + _0x86876e + "，💸 余额: " + _0x257255 + "，（极速金币：" + _0x22d9bc + "，余额：" + _0x3695a3 + "）🌐 IP: " + _0x15efe9.ip);else {
          console.log("❌ [" + _0x2d8c62 + "-" + _0x3f6bf5 + "]" + (_0x3b40a4.remark ? "（" + _0x3b40a4.remark + "）" : "") + " 代理连接失败：" + _0x15efe9.msg);
        }
      }
    } else console.log("✅ [" + _0x2d8c62 + "-" + _0x3f6bf5 + "]" + (_0x3b40a4.remark ? "（" + _0x3b40a4.remark + "）" : "") + " 登录成功！💰 普通金币: " + _0x86876e + "，💸 余额: " + _0x257255 + "，（极速金币：" + _0x22d9bc + "，余额：" + _0x3695a3 + "）🌐 直连模式");
  } else console.log("❌ [" + _0x2d8c62 + "-" + _0x3f6bf5 + "]" + (_0x3b40a4.remark ? "（" + _0x3b40a4.remark + "）" : "") + " 基本信息获取失败，继续执行");
  let _0x160d08;
  if (_0x57752a === "KUAISHOU") {
    _0x160d08 = _0x5df70e;
  } else {
    _0x160d08 = {
      "nickname": _0x3f6bf5,
      "totalCoin": _0x3f4822?.["totalCoin"] ?? null,
      "allCash": _0x3f4822?.["totalCash"] ?? null
    };
  }
  const _0x224e8e = new KuaishouAdTask({
    ..._0x3b40a4,
    "nickname": _0x3f6bf5,
    "tasksToExecute": tasksToExecute
  });
  await _0x224e8e.checkCoinLimit();
  if (_0x224e8e.coinExceeded) {
    console.log("⚠️ [" + _0x224e8e.versionLabel + "-" + _0x224e8e.nickname + "]" + (_0x3b40a4.remark ? "（" + _0x3b40a4.remark + "）" : "") + " 初始金币已超过阈值，不执行任务");
    let _0xdb4422;
    if (_0x57752a === "KUAISHOU") _0xdb4422 = await getAccountBasicInfo(_0x3b40a4.cookie, _0x3b40a4.proxyUrl, _0x3b40a4.index);else {
      {
        const _0x411705 = await getNickname(_0x3b40a4.cookie, _0x3b40a4.proxyUrl, _0x3b40a4.index);
        _0xdb4422 = {
          "nickname": _0x411705?.["nickname"] || _0x3f6bf5,
          "totalCoin": _0x411705?.["totalCoin"] ?? null,
          "allCash": _0x411705?.["totalCash"] ?? null
        };
      }
    }
    const _0x222301 = _0x160d08?.["totalCoin"] || 0,
      _0x4c2ae5 = _0xdb4422?.["totalCoin"] || 0,
      _0x29260f = _0x4c2ae5 - _0x222301,
      _0x532495 = _0x160d08?.["allCash"] || 0,
      _0x3955f3 = _0xdb4422?.["allCash"] || 0,
      _0x394d8f = _0x3955f3 - _0x532495;
    return {
      "index": _0x3b40a4.index,
      "remark": _0x3b40a4.remark || "无备注",
      "nickname": _0x3f6bf5,
      "initialCoin": _0x222301,
      "finalCoin": _0x4c2ae5,
      "coinChange": _0x29260f,
      "initialCash": _0x532495,
      "finalCash": _0x3955f3,
      "cashChange": _0x394d8f,
      "stats": _0x224e8e.getTaskStats(),
      "coinLimitExceeded": true
    };
  }
  await _0x224e8e.executeAllTasksByPriority();
  let _0x2c26f0;
  if (_0x57752a === "KUAISHOU") _0x2c26f0 = await getAccountBasicInfo(_0x3b40a4.cookie, _0x3b40a4.proxyUrl, _0x3b40a4.index);else {
    {
      const _0x31d23c = await getNickname(_0x3b40a4.cookie, _0x3b40a4.proxyUrl, _0x3b40a4.index);
      _0x2c26f0 = {
        "nickname": _0x31d23c?.["nickname"] || _0x3f6bf5,
        "totalCoin": _0x31d23c?.["totalCoin"] ?? null,
        "allCash": _0x31d23c?.["totalCash"] ?? null
      };
    }
  }
  const _0x1e6031 = _0x160d08?.["totalCoin"] || 0,
    _0xba2d97 = _0x2c26f0?.["totalCoin"] || 0,
    _0x4fe31e = _0xba2d97 - _0x1e6031,
    _0x5ea9d2 = _0x160d08?.["allCash"] || 0,
    _0x29acbf = _0x2c26f0?.["allCash"] || 0,
    _0x57a3bd = _0x29acbf - _0x5ea9d2;
  _0x224e8e.printTaskStats();
  return {
    "index": _0x3b40a4.index,
    "remark": _0x3b40a4.remark || "无备注",
    "nickname": _0x3f6bf5,
    "initialCoin": _0x1e6031,
    "finalCoin": _0xba2d97,
    "coinChange": _0x4fe31e,
    "initialCash": _0x5ea9d2,
    "finalCash": _0x29acbf,
    "cashChange": _0x57a3bd,
    "stats": _0x224e8e.getTaskStats(),
    "coinLimitExceeded": _0x224e8e.coinExceeded
  };
}
function printAccountsSummary(_0x1b1181) {
  if (!_0x1b1181.length) {
    {
      console.log("\n📊 没有可显示的账号信息。");
      return;
    }
  }
  const _0x1996f3 = _0x1b1181.reduce((_0x476b53, _0x1e5e40) => _0x476b53 + (parseInt(_0x1e5e40.initialCoin) || 0), 0),
    _0x15759b = _0x1b1181.reduce((_0x48ca73, _0x22b170) => _0x48ca73 + (parseInt(_0x22b170.finalCoin) || 0), 0),
    _0x5d6e19 = _0x15759b - _0x1996f3,
    _0x42c219 = _0x1b1181.reduce((_0xb9c8db, _0x277cc8) => _0xb9c8db + (parseFloat(_0x277cc8.initialCash) || 0), 0),
    _0x5f3b1b = _0x1b1181.reduce((_0x5826bb, _0x5a4b52) => _0x5826bb + (parseFloat(_0x5a4b52.finalCash) || 0), 0),
    _0x7108c5 = _0x5f3b1b - _0x42c219;
  let _0x9165a1 = 0,
    _0x36ef3b = 0,
    _0x285529 = 0;
  _0x1b1181.forEach(_0x1e7ab6 => {
    if (_0x1e7ab6.stats) {
      Object.values(_0x1e7ab6.stats).forEach(_0x520b03 => {
        _0x9165a1 += _0x520b03.success + _0x520b03.failed;
        _0x36ef3b += _0x520b03.success;
        _0x285529 += _0x520b03.totalReward;
      });
    }
  });
  const _0x2c0ca0 = _0x9165a1 > 0 ? (_0x36ef3b / _0x9165a1 * 100).toFixed(1) : "0.0",
    _0x2013aa = _0x1b1181.filter(_0x55fa08 => _0x55fa08.coinLimitExceeded).length;
  console.log("\n=======");
  console.log("\n\n" + "=".repeat(80));
  console.log("|" + centerAlign("      快手养号任务执行结果汇总表      ", 78) + "|");
  console.log("=".repeat(80));
  console.log("|" + ("总账号数: " + _0x1b1181.length).padEnd(22) + ("超过金币阈值账号: " + _0x2013aa).padEnd(22) + ("总任务数: " + _0x9165a1).padEnd(22) + ("任务成功率: " + _0x2c0ca0 + "%").padEnd(10) + "|");
  console.log("|" + ("总金币变化: " + _0x5d6e19).padEnd(26) + ("总金币奖励: " + _0x285529).padEnd(26) + ("总余额变化: " + _0x7108c5.toFixed(2)).padEnd(24) + "|");
  console.log("-".repeat(80));
  const _0x41c771 = ["序号", "备注", "账号昵称", "初始金币", "最终金币", "金币变化", "初始余额", "最终余额", "余额变化"],
    _0x1e69e5 = [6, 16, 16, 12, 12, 12, 12, 12, 12];
  let _0x45dfc1 = "|";
  _0x41c771.forEach((_0x5a6bde, _0x44efa3) => {
    _0x45dfc1 += centerAlign(_0x5a6bde, _0x1e69e5[_0x44efa3]) + "|";
  });
  console.log(_0x45dfc1);
  let _0x322490 = "|";
  _0x1e69e5.forEach(_0x208c4c => {
    _0x322490 += "-".repeat(_0x208c4c) + "|";
  });
  console.log(_0x322490);
  _0x1b1181.forEach(_0x1d73da => {
    let _0x40a75c = "|";
    _0x40a75c += centerAlign(_0x1d73da.index, _0x1e69e5[0]) + "|";
    _0x40a75c += centerAlign(_0x1d73da.remark, _0x1e69e5[1]) + "|";
    const _0x2380fd = (_0x1d73da.nickname || "-") + (_0x1d73da.coinLimitExceeded ? " ⚠️" : "");
    _0x40a75c += centerAlign(_0x2380fd.substring(0, _0x1e69e5[2] - 2), _0x1e69e5[2]) + "|";
    _0x40a75c += centerAlign(_0x1d73da.initialCoin, _0x1e69e5[3]) + "|";
    _0x40a75c += centerAlign(_0x1d73da.finalCoin, _0x1e69e5[4]) + "|";
    const _0xf93fe6 = _0x1d73da.coinChange >= 0 ? "+" + _0x1d73da.coinChange : _0x1d73da.coinChange;
    _0x40a75c += centerAlign(_0xf93fe6, _0x1e69e5[5]) + "|";
    _0x40a75c += centerAlign(_0x1d73da.initialCash, _0x1e69e5[6]) + "|";
    _0x40a75c += centerAlign(_0x1d73da.finalCash, _0x1e69e5[7]) + "|";
    const _0x128949 = _0x1d73da.cashChange >= 0 ? "+" + _0x1d73da.cashChange.toFixed(2) : _0x1d73da.cashChange.toFixed(2);
    _0x40a75c += centerAlign(_0x128949, _0x1e69e5[8]) + "|";
    console.log(_0x40a75c);
  });
  console.log("=".repeat(80));
  console.log("|" + centerAlign("      任务执行完成，请查看详细结果      ", 78) + "|");
  console.log("=".repeat(80));
}
function generateLegacy() {
  const _0x14eb09 = Date.now(),
    _0x599304 = Math.floor(Math.random() * 100000),
    _0xd5f55c = String(_0x599304).padStart(5, "0");
  return "" + _0x14eb09 + _0xd5f55c;
}
function generateKuaishouDid() {
  try {
    const _0x316dbc = _0x49a9d6 => {
        const _0x560824 = "0123456789abcdef";
        let _0x4b7fd0 = "";
        for (let _0x166fcb = 0; _0x166fcb < _0x49a9d6; _0x166fcb++) {
          _0x4b7fd0 += _0x560824.charAt(Math.floor(Math.random() * _0x560824.length));
        }
        return _0x4b7fd0;
      },
      _0xd4edd3 = _0x316dbc(16);
    return "ANDROID_" + _0xd4edd3;
  } catch (_0x59f0ef) {
    console.log("❌ 生成did失败: " + _0x59f0ef.message);
    const _0x109014 = Date.now().toString(16).toUpperCase();
    return "ANDROID_" + _0x109014.substring(0, 16);
  }
}
async function main() {
  const _0x49177e = await checkScriptVersion();
  !_0x49177e && (console.log("🚫 版本验证失败，脚本终止执行"), process.exit(1));
  accountConfigs = getAccountConfigsFromEnv();
  accountCount = accountConfigs.length;
  tasksToExecute = getTasksToExecute();
  taskNameMap = {
    "food": "food（饭补）",
    "foods": "foods（饭补追加）",
    "box": "box（宝箱广告）",
    "boxs": "boxs（宝箱广告追加）",
    "look": "look（看广告得金币）",
    "looks": "looks（看广告得金币追加）",
    "content": "content（看内容广告得金币）",
    "contents": "contents（看内容广告得金币追加）"
  };
  const _0x2bd3a3 = 2,
    _0x41ab4c = 200,
    _0x39d991 = parseInt(process.env.MAX_CONCURRENCY, 10);
  maxConcurrency = isNaN(_0x39d991) ? _0x2bd3a3 : Math.min(Math.max(_0x39d991, 1), _0x41ab4c);
  console.log("📋 任务类型设置：" + tasksToExecute.map(_0x2750b => taskNameMap[_0x2750b] || _0x2750b).join(", "));
  console.log("🔄 主任务执行轮数：" + KSROUNDS + "轮");
  console.log("🎯 追加广告目标数量：" + MAX_EXTRA_AD_COUNT + "个");
  console.log("⚠️ 金币上限设置：" + KSCOIN_LIMIT);
  console.log("📋 并发数设置：" + maxConcurrency);
  console.log("✅ 成功加载 " + accountCount + " 个账号");
  console.log("=======");
  accountCount > _0x41ab4c && (console.log("❌ 错误: 检测到 " + accountCount + " 个账号配置，最多只允许" + _0x41ab4c + "个"), process.exit(1));
  const _0x313a30 = loadAccountsFromEnv();
  console.log("=======");
  console.log("📊 共找到 " + _0x313a30.length + " 个有效账号");
  if (!_0x313a30.length) process.exit(1);
  const _0x16c270 = [];
  await concurrentExecute(_0x313a30, maxConcurrency, async _0x1351b6 => {
    try {
      {
        const _0x402828 = await processAccount(_0x1351b6);
        _0x16c270.push({
          "index": _0x1351b6.index,
          "remark": _0x1351b6.remark || "无备注",
          "nickname": _0x402828?.["nickname"] || "账号" + _0x1351b6.index,
          "initialCoin": _0x402828?.["initialCoin"] || 0,
          "finalCoin": _0x402828?.["finalCoin"] || 0,
          "coinChange": _0x402828?.["coinChange"] || 0,
          "initialCash": _0x402828?.["initialCash"] || 0,
          "finalCash": _0x402828?.["finalCash"] || 0,
          "cashChange": _0x402828?.["cashChange"] || 0,
          "stats": _0x402828?.["stats"] || {},
          "coinLimitExceeded": _0x402828?.["coinLimitExceeded"] || false
        });
      }
    } catch (_0x3f79ce) {
      console.log("❌ [" + _0x1351b6.index + "]" + (_0x1351b6.remark ? "（" + _0x1351b6.remark + "）" : "") + " 执行异常：" + _0x3f79ce.message);
      _0x16c270.push({
        "index": _0x1351b6.index,
        "remark": _0x1351b6.remark || "无备注",
        "nickname": "账号" + _0x1351b6.index,
        "initialCoin": 0,
        "finalCoin": 0,
        "coinChange": 0,
        "initialCash": 0,
        "finalCash": 0,
        "cashChange": 0,
        "error": _0x3f79ce.message
      });
    }
  });
  _0x16c270.sort((_0x30e4d9, _0x49aae1) => _0x30e4d9.index - _0x49aae1.index);
  console.log("\n✅ 全部完成。");
  printAccountsSummary(_0x16c270);
}
main().catch(_0x46a8e5 => {
  console.log("❌ 脚本执行异常：", _0x46a8e5.message);
  process.exit(1);
});
