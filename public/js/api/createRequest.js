

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
   const xhr = new XMLHttpRequest();
   const formData = new FormData();
   xhr.withCredentials = true;

   if (options.method === "GET") {
      options.url += "?";
      for (let key in options.data) {
         options.url += `${key}=${options.data[key]}&`;
      }
   } else {
      for (let key in options.data) {
         formData.append(key, options.data[key]);
      }
   }

   try {
      xhr.open(options.method, options.url);
      xhr.responseType = (options.responseType || "json")
      xhr.onload = respCall;
      xhr.send(formData);
   } catch (err) {
      options.callback(err);
   }


   function respCall() {
      let err = null;
      let response = null;
      if (xhr.status >= 400) {
         err = xhr.response;
      } else {
         response = xhr.response;
      };
      options.callback(err, response);
   };

};
// const createRequest = (options = {}) => {
//    const xhr = new XMLHttpRequest();
//    const method = options.method;
//    const url = options.url;
//    if (method === "GET") {
//       let getBody = "";
//       let i = 0;
//       for (let key in options.data) {
//          i++;
//          getBody = getBody + `${key}:${options.data[key]}`
//          if (i < Object.keys(options.data).length) {
//             getBody = getBody + "&";
//          }
//       };
//       try {
//          xhr.open(method, `${url}?${getBody}`);
//          xhr.responseType = (options.responseType || "json");
//          xhr.onload = respCall;
//          xhr.onerror = () => console.log(xhr.response);
//          xhr.send();
//       } catch (e) {
//          console.log(e);
//       };

//    } else {
//       let formData = new FormData;
//       for (let key in options.data) {
//          formData.append(`${key}`, `${options.data[key]}`);
//       };
//       // formData = JSON.stringify(formData);
//       try {
//          xhr.open(method, url);
//          xhr.responseType = (options.responseType || "json")
//          xhr.onload = respCall;
//          xhr.onerror = () => console.log(xhr.response);
//          xhr.send(formData);
//       } catch (e) {
//          err = e;
//       };
//    };

// function respCall() {
//    let err = null;
//    let response = null;
//    if (xhr.status >= 400) {
//       err = xhr.response;
//    } else {
//       response = xhr.response;
//    };
//    options.callback(err, response);
// };

// };