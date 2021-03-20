/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
   let response = {};
   let err;
   if (options.method === "GET") {
      const xhr = new XMLHttpRequest;
      let get = "";
      let i = 0;
      for (let key in options.data) {
         i++;
         get = get + `${key}:${options.data[key]}`
         if (i < Object.keys(options.data).length) {
            get = get + "&";
         }
      };
      try {
         xhr.open('GET', `${options.url}?${get}`);
         xhr.send()
      }
      catch (e) {
         err = e;
      }
      xhr.onreadystatechange = function () {
         if (xhr.readyState == 4) {
            response = xhr.responseType;
         }
      };


   } else {
      const xhr = new XMLHttpRequest;
      let formData = new FormData;
      for (let key in options.data) {
         formData.append(`${key}`, `${options.data[key]}`);
      };
      try {
         xhr.open(`${options.method}`, `${options.url}`);
         xhr.send(formData);
      }
      catch (e) {
         err = e;
      }
      xhr.onreadystatechange = function () {
         if (xhr.readyState == 4) {
            response = xhr.responseType;
         }
      };
   };
   response.withCredentials = true;
   options.callback(err, response);

};

// createRequest({
//    url: 'https://example.com',
//    data: {
//       mail: 'ivan@biz.pro',
//       password: 'odinodin'
//    },
//    method: 'POST',
//    callback: (err, response) => {
//       /*
//         при успешном выполнении err = null, response содержит данные ответа
//       */
//       console.log(err); // null
//       console.log(response); // ответ
//    }
// });

// {
//    url: 'https://example.com', // адрес
//    headers: { // произвольные заголовки, могут отсутствовать
//      'Content-type': 'application/json' 
//    },
//    data: { // произвольные данные, могут отсутствовать
//      email: 'ivan@poselok.ru',
//      password: 'odinodin'
//    },
//    responseType: 'json', // формат, в котором необходимо выдать результат
//    method: 'GET', // метод запроса
//    /*
//      Функция, которая сработает после запроса.
//      Если в процессе запроса произойдёт ошибка, её объект
//      должен быть в параметре err.
//      Если в запросе есть данные, они должны быть переданы в response.
//    */
//    callback: (err, response) => {
//      console.log( 'Ошибка, если есть', err );
//      console.log( 'Данные, если нет ошибки', response );
//    }