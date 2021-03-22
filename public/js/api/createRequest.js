

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
   const xhr = new XMLHttpRequest();
   const method = options.method;
   const url = options.url;
   let response;
   let err;
   if (method === "GET") {
      let getBody = "";
      let i = 0;
      for (let key in options.data) {
         i++;
         getBody = getBody + `${key}:${options.data[key]}`
         if (i < Object.keys(options.data).length) {
            getBody = getBody + "&";
         }
      };
      try {
         xhr.open(method, `${url}?${get}`);
         xhr.responseType = (options.responseType || "json");
         xhr.onload = () => {
            if (xhr.status >= 400) {
               console.error(xhr.response);
            } else {
               response = xhr.response;
            };
         };
         xhr.onerror = () => console.log(xhr.response);
         xhr.send();
      } catch (e) {
         err = e;
         console.log(e);
      };

   } else {
      let formData = new FormData;
      for (let key in options.data) {
         formData.append(`${key}`, `${options.data[key]}`);
      };
      formData = JSON.stringify(formData);
      try {
         xhr.open(method, url);
         xhr.responseType = (options.responseType || "json")
         xhr.onload = () => {
            if (xhr.status >= 400) {
               console.error(xhr.response);
            } else {
               response = xhr.response;
            };
         };
         xhr.onerror = () => console.log(xhr.response);
         xhr.send(formData);
      } catch (e) {
         err = e;
         console.log(e);
      };
   };

   options.callback(err, response);


};

// createRequest({
//    url: 'http://localhost:8000',
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






// const createRequest = (options = {}) => {
//    let response = {};
//    let err;
//    if (options.method === "GET") {
//       const xhr = new XMLHttpRequest;
//       let get = "";
//       let i = 0;
//       for (let key in options.data) {
//          i++;
//          get = get + `${key}:${options.data[key]}`
//          if (i < Object.keys(options.data).length) {
//             get = get + "&";
//          }
//       };
//       try {
//          xhr.open('GET', `${options.url}?${get}`);
//          xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4) {
//                response = xhr.responseType;
//             }
//          };
//          xhr.send()
//       }
//       catch (e) {
//          err=e;
//console.log(e);
//       }
//    } else {
//       const xhr = new XMLHttpRequest;
//       let formData = new FormData;
//       for (let key in options.data) {
//          formData.append(`${key}`, `${options.data[key]}`);
//       };
//       try {
//          xhr.open(`${options.method}`, `${options.url}`);
//          xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4) {
//                response = xhr.responseType;
//             }
//          };
//          xhr.send(formData);
//       }
//       catch (e) {
//          err=e;
//console.log(e);
//       }

//    };
//    response.withCredentials = true;
//    options.callback(err, response);

// };



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