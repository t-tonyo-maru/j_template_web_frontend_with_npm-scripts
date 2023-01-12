// test module
import { getUserAgentByString, getUserAgentByData } from './getUA'

const testUserAgentStrings = {
  // ie: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
  firefox:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:68.0) Gecko/20100101 Firefox/68.0',
  chrome:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3864.0 Safari/537.36',
  safari:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15',
  edge: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36 Edg/94.0.992.31',
  ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
  android:
    'Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36'
}

describe('test: getUserAgentByString', () => {
  // it('ie', () => {
  //   expect(getUserAgentInfo(testUserAgentStrings.ie)).toBeTruthy();
  // });
  it('firefox', () => {
    expect(getUserAgentByString(testUserAgentStrings.firefox)).toBeTruthy()
  })
  it('chrome', () => {
    expect(getUserAgentByString(testUserAgentStrings.chrome)).toBeTruthy()
  })
  it('safari', () => {
    expect(getUserAgentByString(testUserAgentStrings.safari)).toBeTruthy()
  })
  it('edge', () => {
    expect(getUserAgentByString(testUserAgentStrings.edge)).toBeTruthy()
  })
  it('ios', () => {
    expect(getUserAgentByString(testUserAgentStrings.ios)).toBeTruthy()
  })
  it('android', () => {
    expect(getUserAgentByString(testUserAgentStrings.android)).toBeTruthy()
  })
})

const testUserAgentData = {
  chrome: {
    brands: [
      { brand: 'Chromium', version: '106' },
      { brand: 'Google Chrome', version: '106' },
      { brand: 'Not;A=Brand', version: '99' }
    ],
    mobile: false,
    platform: 'macOS'
  },
  edge: {
    brands: [
      { brand: 'Chromium', version: '106' },
      { brand: 'Microsoft Edge', version: '106' },
      { brand: 'Not;A=Brand', version: '99' }
    ],
    mobile: false,
    platform: 'macOS'
  },
  mobile: {
    brands: [
      { brand: 'Chromium', version: '106' },
      { brand: 'Google Chrome', version: '106' },
      { brand: 'Not;A=Brand', version: '99' }
    ],
    mobile: true,
    platform: 'macOS'
  }
}

describe('test: getUserAgentByData', () => {
  it('chrome', () => {
    expect(getUserAgentByData(testUserAgentData.chrome).isChrome).toBeTruthy()
  })
  it('edge', () => {
    expect(getUserAgentByData(testUserAgentData.edge).isEdge).toBeTruthy()
  })
  it('mobile', () => {
    expect(getUserAgentByData(testUserAgentData.mobile).isMobile).toBeTruthy()
  })
})
