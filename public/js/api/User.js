/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */


  static url = "/user";

  static setCurrent(user) {
    localStorage["user"] = [JSON.stringify(user)];
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem(["user"]);
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage["user"]) {
      return JSON.parse(localStorage["user"])
    } else {
      return undefined
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: this.url + '/current',
      method: 'GET',
      responseType: 'json',
      callback: (err, response) => {

        if (response && response.user) {
          this.setCurrent(response.user);
        } else if (response && !response.success) {
          this.unsetCurrent();
          return {
            "success": false,
            "error": "Необходима авторизация"
          }
        }
        callback(err, response);
      }
    });
  }


  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.url + "/login",
      // url: `/user/login`,
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: this.url + "/register",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    createRequest({
      url: this.url + "/logout",
      method: "POST",
      responseType: "json",
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.unsetCurrent();
          return { "success": true }
        }
        // callback(err, response);
      },
    });
  }
}

