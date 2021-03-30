/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */

  static url = "/account";
  //static get(id = '', callback) {
  static get(id = "", callback) {
    let innerData = {};
    innerData.url = `${this.url}/${id}`;
    innerData.responseType = 'json';
    innerData.callback = callback;
    innerData.method = 'GET';
    createRequest(innerData);
  }
}
