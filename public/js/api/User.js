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
    localStorage.setItem([user.user], [JSON.stringify(user)]);
    // localStorage[this.currentUser] = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    //localStorage.removeItem([this.currentUser]);


  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    // let currentObj = localStorage[this.currentUser];
    // if (currentObj) {
    //   currentObj = JSON.parse(currentObj);
    // } else {
    //   return undefined
    // };
    // return currentObj
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    // if (this.current()) {

    // } else {
    //   const errorObj = {
    //     "success": false,
    //     "error": "Необходима авторизация"
    //   };

    //   return errorObj
    // }


    // createRequest({
    //   url: this.URL + '/current',
    //   method: 'GET',
    //   responseType: 'json',
    //   callback: (err, response) => {
    //     if (response && response.user) {
    //       this.setCurrent(response.user);
    //     }
    //     callback(err, response);
    //   }
    // });




    //   {
    //     "success": true,
    //     "user": {
    //         "id": 2,
    //         "name": "Vlad",
    //         "email": "l@l.one",
    //         "created_at": "2019-03-06 18:46:41",
    //         "updated_at": "2019-03-06 18:46:41"
    //     }
    // }
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

  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {

  }
}

// const user = {
//   id: 12,
//   name: 'Vladal'
// };

// User.setCurrent(user);
// let current = User.current();

// console.log(current); // объект { id: 12, name: 'Vlad' }

// User.unsetCurrent();
// current = User.current();
// console.log(current);
