/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  constructor() {
    this.url = "/user";
    this.currentUser = "";
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */

  }

  static setCurrent(user) {
    this.currentUser = String(user.name);
    localStorage.setItem([this.currentUser], [JSON.stringify(user)]);
    // localStorage[this.currentUser] = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem([this.currentUser]);

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const corrent = localStorage[this.currentUser];
    return corrent

  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {

  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
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

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {

  }
}

const user = {
  id: 12,
  name: 'Vladal'
};

User.setCurrent(user);
const current = User.current();

console.log(current); // объект { id: 12, name: 'Vlad' }

User.unsetCurrent();

console.log(current);
