class User {
  set = (key, value) => localStorage.setItem(key, value);
  get = (key) => this.getLocalStorage(key);

  isLoggedIn = () => this.get('isLoggedIn') === 'true';
  getLocalStorage = (key) => {
    const ret = localStorage.getItem(key);
    if (ret) {
      return ret;
    }
    return null;
  };

  login = async (email, password) => {
    // ログイン処理は別途実装が必要です。
    if (email === 'user' && password === 'user') {
      this.set('isLoggedIn', true);
      return true;
    } else {
      // return falseでもいいかと思います。
      throw new Error('メールアドレスかパスワードが違います');
    }
  };

  logout = async () => {
    if (this.isLoggedIn()) {
      this.set('isLoggedIn', false);
      // ログアウト処理
      //　他に必要な処理があるのならこちら
    }
  };
}

export default new User();
